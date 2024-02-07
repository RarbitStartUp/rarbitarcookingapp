// api.js
import { VertexAI } from "@google-cloud/vertexai";
import { GoogleAuth } from 'google-auth-library';
import {getGCPCredentials} from "./getGCPCredentials"

export async function checkboxAI(fileUri) {
  try {
    console.log("getGCPCredentials in AI:",getGCPCredentials);
    // const credentials = getGCPCredentials();
    // console.log("credentials:", credentials);
    // console.log("credentials:", credentials.credentials);
    // const credential = JSON.parse(
    //   Buffer.from(process.env.GCP_SERVICE_KEY.replace(/"/g, ""), "base64").toString().replace(/\n/g,"")
    // )
    // console.log("credential:", credential);
    
    // const googleAuth = new GoogleAuth({
    //   credentials : credential,
    //   // keyFilename: "google_service_key.json", // Load the key file from the environment variable
    //   scopes: [
    //   'https://www.googleapis.com/auth/cloud-platform',
    //   'https://www.googleapis.com/auth/aiplatform',
    //   'https://www.googleapis.com/auth/aiplatform.jobs',
    // ], 
    //   });

    const vertex_ai = new VertexAI({ 
      project: "arcookingapp", 
      location: "us-central1",
      // apiEndpoint : "us-central1-aiplatform.googleapis.com/v1/projects/arcookingapp/locations/us-central1/publishers/google/models/gemini-pro-vision:streamGenerateContent",
      apiEndpoint : "us-central1-aiplatform.googleapis.com",
      // googleAuthOptions: {
      //   googleAuth: googleAuth, // Use the existing GoogleAuth instance
      // },
      googleAuthOptions: {
        googleAuth: getGCPCredentials, // Use the existing GoogleAuth instance
      },
      // googleAuth: googleAuth, // Also, pass it here if needed
      // googleAuthOptions: googleAuth,
      // googleAuth:getGCPCredentials(),
    });

    console.log("vertex_ai :",vertex_ai)
    
    const generativeVisionModel = vertex_ai.preview.getGenerativeModel({
      model: "gemini-pro-vision",
    });
    
    const prompt = `
    You are an action detection AI, 
    detect the objects and actions in the video,
    and give me the timestamp of each step,
    reply in the following JSON format as text,
    in the language of English
    
    JSON format :
    [
      {
        "timestamp": "00:00:01",
        "checklist": {
          "objects": {
            "apple": true
          },
          "actions": {
            "wash the apple in the bowl": true,
            "slice the apple": true
          }
        }
      },
      // Additional timestamps if needed
    ]    
    `;


 // Assuming fileUri is the path to the video file

// const bucketName = "users_uploads";
// const storageClient = new Storage(getGCPCredentials());


// const chunkSize = 250 * 1024;  // Set your desired chunk size in bytes
// // Get a reference to the bucket
// const bucket = storageClient.bucket(bucketName);
// const fileName = path.basename(fileUri);
// console.log("filename:",fileName);
// // Get a reference to the file
// const file = bucket.file(fileName);
// console.log("Downloading file from:", file);

// // Read the file
// const fileContents = await file.download();
// console.log("File downloaded successfully.");
// console.log("fileContents:", fileContents);

// // Now you can work with the file contents
// const fileBuffer = fileContents[0];
// console.log("fileBuffer:",fileBuffer);
// // Split the file into chunks
// // const chunks = [];
// // for (let i = 0; i < fileBuffer.length; i += chunkSize) {
// //   const chunk = fileBuffer.slice(i, i + chunkSize);
// //   chunks.push(chunk);
// // }

// // Split the file into chunks
// const chunks = [];
// for (let i = 0; i < fileBuffer.length; i += chunkSize) {
//   const start = i;
//   const end = Math.min(i + chunkSize, fileBuffer.length);
//   const chunk = fileBuffer.subarray(start, end);
//   chunks.push(chunk);
// }
// console.log("chunks:",chunks);

// // Prepare the first request with the first chunk
// const firstChunk = chunks.shift();
// console.log("firstChunk:",firstChunk);

// const firstFilePart = {
//   inline_data: {
//     data: firstChunk.toString('base64'),
//     mime_type: "video/mp4",
//   },
// };
// console.log("firstFilePart:",firstFilePart);

const filePart = {
  file_data: {
    file_uri: fileUri,
    mime_type: "video/mp4",
  },
};

    const textPart = { text: prompt };
    const request = {
      contents: [{ role: "user", parts: [textPart, filePart] }],
    };
    const streamingResp = await generativeVisionModel.generateContentStream(
      request
    );
    console.log("streamingResp:",streamingResp);

// Continue sending requests for the remaining chunks
// for (const chunk of chunks) {
//   const filePart = {
//     inline_data: {
//       data: chunk.toString('base64'),
//       mime_type: "video/mp4",
//     },
//   };
//   const request = {
//     contents: [{ role: "user", parts: [textPart, filePart] }],
//   };
//   await streamingResp.write(JSON.stringify(request));
// }

    const aggregatedResponse = await streamingResp.response;

    console.log("Aggregated Response:", aggregatedResponse);

    if (
      !aggregatedResponse.candidates ||
      aggregatedResponse.candidates.length === 0
    ) {
      throw new Error("Invalid or empty candidates in the response.");
    }

    const content = aggregatedResponse.candidates[0].content;

    console.log("Aggregated Response Content:", content);

    if (!content) {
      throw new Error("Invalid content in the response.");
    }

    return content;
  } catch (error) {
    console.error("Error in checkbox function:", error);
    throw error; // rethrow the error to handle it in the calling function
  }
}
