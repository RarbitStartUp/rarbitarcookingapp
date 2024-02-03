// api.js
import { VertexAI } from "@google-cloud/vertexai";
import { GoogleAuth } from 'google-auth-library';
import logger from "../../logger"

export async function checkboxAI(fileUri) {
  try {
    // const credential = JSON.parse(
    //   Buffer.from(process.env.GOOGLE_SERVICE_KEY.replace(/"/g, ""), "base64").toString().replace(/\n/g,"")
    // )
    // // Use the default authentication provided by google-auth-library
    // const auth = new GoogleAuth({
    //   credentials : credential,
    //   // keyFilename: "google_service_key.json", // Load the key file from the environment variable
    //   scopes: ['https://www.googleapis.com/auth/cloud-platform'], 
    // });
    // logger.info("auth:", auth);
    // const authClient = await auth.getClient();
    // logger.info("authClient:", authClient);
    
    // async function getCredentials(authClient) {
    //   // Fetch the credentials using the auth client
    //   return new Promise((resolve, reject) => {
    //     authClient.getAccessToken().then(
    //       (response) => {
    //         // Extract the access token from the response
    //         const accessToken = response.token;
    //         // Create a simple object with the access token
    //         const credentials = { access_token: accessToken };
    //         resolve(credentials);
    //       },
    //       (error) => {
    //         reject(error);
    //       }
    //     );
    //   });
    // }
    
    // // Get the credentials from the auth client
    // const credentials = await getCredentials(authClient);
    // logger.info("credentials:", credentials);
    
    const project = "arcookingapp";
    const location = "us-central1"; 
    // const googleAuthOptions = new GoogleAuth({
    // // const googleAuthOptions = new GoogleAuth({
    //   credentials : credential,
    //   // keyFilename: "google_service_key.json", // Load the key file from the environment variable
    //   scopes: [
    //     'https://www.googleapis.com/auth/cloud-platform',
    //     'https://www.googleapis.com/auth/aiplatform',
    //     'https://www.googleapis.com/auth/aiplatform.jobs',
    //   ]
    //   });
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
      project, 
      location,
      // googleAuthOptions,
      // GoogleAuth
    });

    console.log("vertex_ai :",vertex_ai)
    
    const generativeVisionModel = vertex_ai.preview.getGenerativeModel({
      model: "gemini-pro-vision",
    });
    
    const prompt = `
    You are an action detection AI, 
    detect the objects and actions with contextual objects ( e.g. cutting an apple ),
    reply in the following JSON format as text,
    in the language of English
    
    JSON format :
    {
      checklist: {
        objects:{
            "objects" : true | false
        },
        actions:{
            "actions" : true | false
        }
      },
    }
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

    logger.info("Aggregated Response:", aggregatedResponse);

    if (
      !aggregatedResponse.candidates ||
      aggregatedResponse.candidates.length === 0
    ) {
      throw new Error("Invalid or empty candidates in the response.");
    }

    const content = aggregatedResponse.candidates[0].content;

    logger.info("Aggregated Response Content:", content);

    if (!content) {
      throw new Error("Invalid content in the response.");
    }

    return content;
  } catch (error) {
    logger.error("Error in checkbox function:", error);
    throw error; // rethrow the error to handle it in the calling function
  }
}
