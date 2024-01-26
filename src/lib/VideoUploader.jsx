"use server"
// Import necessary dependencies
import { uploadVideoGS } from "@/lib/uploadVideoGS";
import { redirect } from 'next/navigation';

// Define VideoUploader as a function
export async function VideoUploader(formData) {

  console.log("formData in upload function - Server Action :", formData);

  const apiResponse = await uploadVideoGS(formData);
  console.log("API response:", apiResponse);

  // Check if the apiResponse is valid
  if (apiResponse && apiResponse.role === "model" && apiResponse.parts) {
    // Parse the JSON data from the apiResponse
    const jsonString = apiResponse.parts[0].text;
    const jsonData = JSON.parse(jsonString);

   // Include the result in the redirect URL as a query parameter
   const redirectUrl = `/checkbox?checklistData=${encodeURIComponent(JSON.stringify(jsonData))}`;
   console.log("redirectUrl :", redirectUrl)

   // Redirect to the destination page with the result in the URL
   redirect(redirectUrl);

  } else {
    console.error("Invalid API response");
  }
}