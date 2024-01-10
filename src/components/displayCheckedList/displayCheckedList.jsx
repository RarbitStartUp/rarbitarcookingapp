import { useEffect, useState } from "react";

export function DisplayCheckedList({ aiResult }) {
  const [jsonData, setJsonData] = useState(aiResult);

  useEffect(() => {
    try {
      setJsonData(aiResult);
      updateCheckboxes(aiResult);
    } catch (error) {
      console.error("Error updating AI results:", error);
    }
  }, [aiResult]);

  const updateCheckboxes = (aiResult) => {
    try {
      // Update the UI based on real-time AI results
      Object.keys(aiResult.checklist.objects).forEach((object) => {
        const checkbox = document.querySelector(
          `input[data-object="${object}"]`
        );
        if (checkbox) {
          checkbox.checked = aiResult.checklist.objects[object];
        }
      });

      Object.keys(aiResult.checklist.actions).forEach((action) => {
        const checkbox = document.querySelector(
          `input[data-action="${action}"]`
        );
        if (checkbox) {
          checkbox.checked = aiResult.checklist.actions[action];
        }
      });
    } catch (parseError) {
      console.error("Error parsing AI results JSON:", parseError);
      // Handle the error, e.g., display an error message to the user
    }
  };

  return (
    <div>
      <h1>Checklist</h1>
      <div>
        <h2>Objects</h2>
        <ul>
          {Object.keys(jsonData.checklist.objects).map((object, index) => (
            <li key={index + 1}>
              {index + 1}. {object}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Actions</h2>
        <ul>
          {Object.keys(jsonData.checklist.actions).map((action, index) => (
            <li key={index + 1}>
              {index + 1}. {action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
