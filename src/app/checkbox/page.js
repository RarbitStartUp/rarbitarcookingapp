"use client";
// Import the necessary hooks from next/navigation
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DisplayCheckbox } from "@/components/displayCheckbox/DisplayCheckbox";

export default function Checkbox() {
  // Use the useSearchParams hook to get and update the query parameters
  const searchParams = useSearchParams();
  console.log("searchParams:", searchParams);

  // State to store AI response
  const [apiResponse, setApiResponse] = useState(null);
  const [dataReady, setDataReady] = useState(false);
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    try {
      // Parse the JSON data from the query parameter
      const checklistData = JSON.parse(searchParams.get("checklistData"));
      console.log("checklistData:", checklistData);

      // Set the AI response state
      //   setApiResponse(checklistData);
      setApiResponse((prevApiResponse) => {
        console.log("apiResponse prev1:", prevApiResponse);
        return checklistData;
      });

      setDataReady(true); // Set dataReady to true when data is ready
    } catch (error) {
      console.error("Error parsing checklistData:", error);
      // Set apiResponse to a default value or an empty object if parsing fails
      //   setApiResponse({ checklist: { objects: {}, actions: {} } });
      setApiResponse((prevApiResponse) => {
        console.log("apiResponse prev2:", prevApiResponse); // Log the previous state
        return { checklist: { objects: {}, actions: {} } };
      });
      setDataReady(true); // Set dataReady to true even if parsing fails
    }
  }, [searchParams]);

  // Use another useEffect to trigger the update of apiResponse
  useEffect(() => {
    console.log("apiResponse after useEffect():", apiResponse);
  }, [apiResponse, dataReady]);

  useEffect(() => {
    // Trigger a re-render when apiResponse is set
    if (apiResponse) {
      setForceRender(true);
    }
  }, [apiResponse]);

  if (!dataReady || apiResponse === null || apiResponse === undefined) {
    console.log("apiResponse before useEffect() :", apiResponse);
    return <div className="text-white font-bold">Loading...</div>; // or any other loading indicator
  }

  console.log("apiResponse before rendering DisplayCheckbox:", apiResponse);

  return (
    <div className="flex flex-col items-center">
      {forceRender && (
        <DisplayCheckbox
          apiResponse={apiResponse}
          onAddItem={""}
          onRemoveItem={""}
        />
      )}
    </div>
  );
}
