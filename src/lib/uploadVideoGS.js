"use server";
import { Storage } from "@google-cloud/storage";
import { checkboxAI } from "./checkboxAI";
import ytdl from "ytdl-core";

export async function uploadVideoGS(formData) {
  console.log("formData in uploadVideoGS:", formData);
  const inputLink = formData.get("inputLink");
  // const storage = new Storage();
  // const storageClient = new Storage(getGCPCredentials());
  const projectId = "arcookngapp";
  const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY.replace(/"/g, ""), "base64").toString().replace(/\n/g,"")
)
  const storageClient = new Storage({
    projectId,
    credentials: {
      client_email: credential.client_email,
      private_key: credential.private_key,
    },
  });
  // console.log("storageClient:", storageClient);
  const bucketName = "users_uploads";

  try {
    // Generate a unique filename for the uploaded video
    const filename = `video_${Date.now()}.mp4`;
    // storageClient changes to storage if locally
    const file = storageClient.bucket(bucketName).file(filename);
    const writeStream = file.createWriteStream();

    // Download the YouTube video
    const videoStream = ytdl(inputLink, { filter: "audioandvideo" });

    // Pipe the video stream to the write stream
    videoStream.pipe(writeStream);

    // Wait for the video to be uploaded
    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    }).catch((error) => {
      console.error("Error waiting for video upload:", error);
      // Handle the error, e.g., display an error message to the user
    });

    // Construct the file URI for the uploaded video
    const fileUri = `gs://${bucketName}/${filename}`;

    console.log("successfully uploaded");
    console.log("fileUri :", fileUri);
    // Call checkbox function with the fileUri
    const apiResponse = await checkboxAI(fileUri);

    console.log("upload Video apiResponse :", apiResponse);

    // You can return the file URI if needed
    // res.json({ apiResponse });
    return apiResponse;
  } catch (error) {
    console.error("Error uploading video:", error);
  }
}
