// api.js
import { VertexAI } from "@google-cloud/vertexai";
// import { GoogleAuth } from 'google-auth-library';
import { Storage } from '@google-cloud/storage';
import {getGCPCredentials} from "./getGCPCredentials"
import path from 'path'; // Import the 'path' module

export async function checkboxAI(fileUri) {
  try {
    // const credentials = getGCPCredentials();
    // console.log("credentials:", credentials);
    // const credential = JSON.parse(
    //   Buffer.from(process.env.GOOGLE_SERVICE_KEY.replace(/"/g, ""), "base64").toString().replace(/\n/g,"")
    // )
    // console.log("credential:", credential);
    
    // const googleAuth = new GoogleAuth({
    //   credentials : credentials,
    //   // keyFilename: "google_service_key.json", // Load the key file from the environment variable
    //   scopes: [
    //   'https://www.googleapis.com/auth/cloud-platform',
    //   'https://www.googleapis.com/auth/aiplatform',
    //   'https://www.googleapis.com/auth/aiplatform.jobs',
    // ], 
    //   });
      
    // const auth = {
    //     client_email: credentials.credentials.client_email,
    //     private_key: credentials.credentials.private_key,
    //   };
    
    // console.log("auth:",auth);

    const vertex_ai = new VertexAI({ 
      project: "arcookingapp", 
      // project: credentials.projectId, 
      location: "us-central1",
      // apiEndpoint : "us-central1-aiplatform.googleapis.com/v1/projects/arcookingapp/locations/us-central1/publishers/google/models/gemini-pro-vision:streamGenerateContent",
      apiEndpoint : "us-central1-aiplatform.googleapis.com",
      // apiEndpoint : "iamcredentials.googleapis.com",
      // googleAuthOptions: {
      //   googleAuth: googleAuth, // Use the existing GoogleAuth instance
      // },
      // googleAuth: googleAuth, // Also, pass it here if needed
      // googleAuthOptions: auth,
      googleAuthOptions:getGCPCredentials(),
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

const bucketName = "users_uploads";
const storageClient = new Storage(getGCPCredentials());


const chunkSize = 250 * 1024;  // Set your desired chunk size in bytes
// Get a reference to the bucket
const bucket = storageClient.bucket(bucketName);
const fileName = path.basename(fileUri);
// Get a reference to the file
const file = bucket.file(fileName);

// Read the file
const fileContents = await file.download();

// Now you can work with the file contents
const fileBuffer = fileContents[0];
// Split the file into chunks
// const chunks = [];
// for (let i = 0; i < fileBuffer.length; i += chunkSize) {
//   const chunk = fileBuffer.slice(i, i + chunkSize);
//   chunks.push(chunk);
// }

// Split the file into chunks
const chunks = [];
for (let i = 0; i < fileBuffer.length; i += chunkSize) {
  const start = i;
  const end = Math.min(i + chunkSize, fileBuffer.length);
  const chunk = fileBuffer.subarray(start, end);
  chunks.push(chunk);
}

// Prepare the first request with the first chunk
const firstChunk = chunks.shift();
const firstFilePart = {
  file_data: {
    file_content: firstChunk.toString('base64'),
    mime_type: "video/mp4",
  },
};

    const textPart = { text: prompt };
    const firstRequest = {
      contents: [{ role: "user", parts: [textPart, firstFilePart] }],
    };
    const streamingResp = await generativeVisionModel.generateContentStream(
      firstRequest
    );

// Continue sending requests for the remaining chunks
for (const chunk of chunks) {
  const filePart = {
    file_data: {
      file_content: chunk.toString('base64'),
      mime_type: "video/mp4",
    },
  };
  const request = {
    contents: [{ role: "user", parts: [textPart, filePart] }],
  };
  await streamingResp.write(request);
}

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
