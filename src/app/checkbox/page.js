"use client";
// Import the necessary hooks from next/navigation
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DisplayCheckbox } from "@/components/displayCheckbox/DisplayCheckbox";

export default function Checkbox() {
    const searchParams = useSearchParams();
    // console.log("searchParams:", searchParams);
    const [apiResponse, setApiResponse] = useState(null);

    useEffect(() => {
        try {
    // Use the useSearchParams hook to get and update the query parameters
      // Parse the JSON data from the query parameter
      const checklistData = JSON.parse(decodeURIComponent(searchParams.get("checklistData")));
      console.log("checklistData:", checklistData);
    
     // State to store AI response
      setApiResponse(checklistData)
    } catch (error) {
      console.error("Error parsing checklistData:", error);
      setApiResponse({ checklist: { objects: {}, actions: {} } });
    }
  }, [searchParams]);

  if (apiResponse === null || apiResponse === undefined) {
    console.log("apiResponse before useEffect() :", apiResponse);
    return <div className="text-white font-bold">Loading...</div>; // or any other loading indicator
  };

  return (
    <div className="flex flex-col items-center">
        <DisplayCheckbox
          apiResponse={apiResponse}
          onAddItem={""}
          onRemoveItem={""}
        />
    </div>
  );
}
