"use server";
import { Storage } from "@google-cloud/storage";
import { checkboxAI } from "./checkboxAI";
import ytdl from "ytdl-core";
// import { getGCPCredentials } from "./getGCPCredentials";
import { getGoogleServiceAccountKey } from "./getGoogleServiceAccountKey"

export async function uploadVideoGS(formData) {
  try {
    console.log("formData in uploadVideoGS:", formData);

    const inputLink = formData.get("inputLink");
    const bucketName = "users_uploads";
    // const credentials = getGCPCredentials();
    // console.log("credentials:", credentials);
    const secret = await getGoogleServiceAccountKey();
    console.log("secret:", secret);

    // Parse the secret JSON string
    const { client_email, private_key } = JSON.parse(secret);

    // Create a credentials object
    const credentials = {
       client_email,
       private_key,
    };
    console.log("credentials:", credentials)

    // const storageClient = new Storage(getGCPCredentials());
    // const storageClient = new Storage(credentials);
    const storageClient = new Storage({
      projectId: "arcookingapp",
      credentials: credentials
     });
    console.log("storageClient:", storageClient);

    let totalFileSize = 0; // Initialize fileSize to zero
    let totalBytesTransferred = 0;

    const filename = `video_${Date.now()}.mp4`;
    const file = storageClient.bucket(bucketName).file(filename);
    console.log("Uploading file:", filename);

    const writeStream = file.createWriteStream();

    const videoStream = ytdl(inputLink, { filter: "audioandvideo" });

    videoStream.on("progress", (_, totalBytes, totalBytesExpected) => {
      totalBytesTransferred = totalBytes;
      totalFileSize = totalBytesExpected;

      const progress = (totalBytesTransferred / totalFileSize) * 100;
      console.log("Progress:", progress.toFixed(2) + "%");

      // Pass progress to the API endpoint
      // sendProgressToEndpoint(progress);
    });

    videoStream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", () => {
        // clearInterval(progressEmitter);
        console.log("Upload complete");
        resolve();
      });
      writeStream.on("error", (error) => {
        // clearInterval(progressEmitter);
        console.error("Error uploading file:", error);
        reject(error);
      });
    });

    const fileUri = `gs://${bucketName}/${filename}`;
    console.log("File uploaded to:", fileUri);

    const apiResponse = await checkboxAI(fileUri);
    console.log("Checkbox AI response:", apiResponse);

    return apiResponse;
  } catch (error) {
    console.error("Error uploading video:", error);
  }
}

// async function sendProgressToEndpoint(progress) {
//   try {
//     const response = await fetch('api/progress', {
//       headers:{
//         Accept: 'application/json',
//         method: 'POST',
//         // body: JSON.stringify({ progress }),
//         body: progress.toString()
//       }
//     });
//     if (!response.ok) {
//       throw new Error('Failed to send progress to the API endpoint');
//     }
//   } catch (error) {
//     console.error('Error sending progress to endpoint:', error);
//   }
// }
// async function sendProgressToEndpoint(progress) {
//   try {
//     const response = await fetch('http://localhost:3000/api/progress', {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ progress }),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to send progress to the API endpoint');
//     }
//   } catch (error) {
//     console.error('Error sending progress to endpoint:', error);
//   }
// }