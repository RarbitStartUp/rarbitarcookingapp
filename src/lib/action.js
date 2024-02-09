"use server"
// Import necessary dependencies
import { uploadVideoGS } from "@/lib/uploadVideoGS";
import { redirect } from 'next/navigation';

// Define VideoUploader as a function
export async function upload(formData) {

  console.log("formData in upload function - Server Action :", formData);

  const apiResponse = await uploadVideoGS(formData);
  console.log("API response:", apiResponse);

  // Check if the apiResponse is valid
  if (apiResponse && apiResponse.role === "model" && apiResponse.parts) {
    // Parse the JSON data from the apiResponse
    const jsonString = apiResponse.parts[0].text.replace(/[\x00-\x1F\x7F-\x9F]/g, '').trim(); // Trim leading and trailing spaces, use a regular expression to replace any non-printable characters with an empty string before parsing the JSON.;
    console.log("JSON String:", jsonString);
    // Remove trailing commas from the JSON string
    const jsonStringWithoutTrailingCommas = jsonString.replace(/,\s*([\]}])/g, '$1');
    console.log("jsonStringWithoutTrailingCommas :", jsonStringWithoutTrailingCommas);
    // Parse the modified JSON string
    const jsonData = JSON.parse(jsonStringWithoutTrailingCommas);
    console.log("jsonData :", jsonData);

   // Include the result in the redirect URL as a query parameter
   const redirectUrl = `/checkbox?checklistData=${encodeURIComponent(JSON.stringify(jsonData))}`;
   console.log("redirectUrl :", redirectUrl)

   // Redirect to the destination page with the result in the URL
   redirect(redirectUrl);

  } else {
    console.error("Invalid API response");
  }
}