"use server";
import { Storage } from "@google-cloud/storage";
import { checkboxAI } from "./checkboxAI.js";
import ytdl from "ytdl-core";
import DisplayCheckbox from "@/components/displayCheckbox/displayCheckbox.jsx";

export async function uploadVideoGS(formData) {
  const inputLink = formData.get("inputLink");
  const storage = new Storage();
  const bucketName = "users_uploads";

  try {
    // Validate the video link or perform any necessary checks

    // Generate a unique filename for the uploaded video
    const filename = `video_${Date.now()}.mp4`;

    // Download the YouTube video
    const videoStream = ytdl(inputLink, { filter: "audioandvideo" });
    const writeStream = storage
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
    const result = await checkboxAI(fileUri);

    console.log("upload Video result :", result);

    // You can return the file URI if needed
    // res.json({ result });
    return result;
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
