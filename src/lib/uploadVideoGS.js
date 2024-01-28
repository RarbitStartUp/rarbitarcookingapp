"use server";
import { Storage } from "@google-cloud/storage";
import {getGCPCredentials } from "./getGCPCredentials"
import { checkboxAI } from "./checkboxAI";
import ytdl from "ytdl-core";

export async function uploadVideoGS(formData) {
  console.log("formData in uploadVideoGS:", formData);
  const inputLink = formData.get("inputLink");
  // const key = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  // const storage = new Storage();
  const storageClient = new Storage(getGCPCredentials());
  // const storage = new Storage({ credentials: key });
  const bucketName = "users_uploads";

  // const file = storageClient.bucket(bucketName).file(fileName);

  // await file.save(JSON.stringify({
  //   foo: 'bar',
  // }), {
  //   contentType: 'application/json',
  // });

  try {
    // Validate the video link or perform any necessary checks

    // Generate a unique filename for the uploaded video
    const filename = `video_${Date.now()}.mp4`;

    // Download the YouTube video
    const videoStream = ytdl(inputLink, { filter: "audioandvideo" });
    // const writeStream = storage
    const writeStream = storageClient
      .bucket(bucketName)
      .file(filename)
      .createWriteStream();

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
