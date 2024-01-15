// Import necessary modules
import { uploadVideoGS } from "./your-upload-file"; // Replace with the correct path to your upload file
import { NextResponse } from "next/server";

export function Transfer(formData) {
  "use server";
  console.log("Transfer formData :", formData);
  return formData;
}

// Define the API endpoint handler
export default async function GET(request) {
  try {
    const formData = await Transfer();
    // You can extract any query parameters needed for the GET request
    const { inputLink } = await formData.get("inputLink");

    // Call the uploadVideoGS function with the provided inputLink
    const apiResponse = await uploadVideoGS(inputLink);

    // Send the API response as JSON
    // res.status(200).json({ apiResponse });
    return NextResponse.json({ apiResponse }, { status: 200 });
  } catch (error) {
    console.error("Error handling GET request:", error);
    // Handle errors and send an appropriate response
    res.status(500).json({ error: "Internal Server Error" });
  }
}
