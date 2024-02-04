// api.js
import { VertexAI } from "@google-cloud/vertexai";
import { GoogleAuth } from 'google-auth-library';

export async function checkboxAI(fileUri) {
  try {
    const credential = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_KEY.replace(/"/g, ""), "base64").toString().replace(/\n/g,"")
    )
    console.log("credential:", credential);
    
    const googleAuth = new GoogleAuth({
      credentials : credential,
      // keyFilename: "google_service_key.json", // Load the key file from the environment variable
      scopes: [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/aiplatform',
      'https://www.googleapis.com/auth/aiplatform.jobs',
    ], 
      });
      
    const vertex_ai = new VertexAI({ 
      project:"arcookingapp", 
      location: "us-central1",
      // apiEndpoint : "https://us-central1-aiplatform.googleapis.com/v1/projects/arcookingapp/locations/us-central1/publishers/google/models/gemini-pro-vision:streamGenerateContent",
      apiEndpoint : "us-central1-aiplatform.googleapis.com",
      // apiEndpoint : "https://iamcredentials.googleapis.com",
      // googleAuthOptions: {
      //   googleAuth: googleAuth, // Use the existing GoogleAuth instance
      // },
      googleAuth: googleAuth, // Also, pass it here if needed
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
