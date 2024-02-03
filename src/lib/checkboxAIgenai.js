import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
console.log("genAI:", genAI);

export const runtime = 'edge';

export async function checkboxAI(fileUri) {
  try {
    const generativeModel = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

    const prompt = `
      You are an action detection AI, 
      detect the objects and actions with contextual objects (e.g. cutting an apple),
      reply in the following JSON format as text, in the language of English

      JSON format:
      {
        checklist: {
          objects: {
            "objects": true | false
          },
          actions: {
            "actions": true | false
          }
        }
      }
    `;

    // const filePart = {
    //     file_data: {
    //       file_uri: fileUri,
    //       mime_type: "video/mp4",
    //     },
    //   };
   
      const request = {
        contents: [
            { role: "user", 
              parts: [
                { text : prompt, 
                  fileData :{
                    mimeType: "video/mp4",
                    fileUri: fileUri,
                  },
                }]
            }],
      };

      console.log(request);

    const streamingResp = await generativeModel.generateContentStream(request);
    const aggregatedResponse = await streamingResp.response;

    console.log("Aggregated Response:", aggregatedResponse);

    if (!aggregatedResponse.candidates || aggregatedResponse.candidates.length === 0) {
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
