import { useEffect, useState } from "react";

export function DisplayCheckedList({ aiResult }) {
  const [jsonData, setJsonData] = useState(aiResult);
  const [checkboxStates, setCheckboxStates] = useState({
    objects: {},
    actions: {},
  });

  useEffect(() => {
    try {
      setJsonData((prevData) => {
        // Update the state based on previous state
        const newState = { ...prevData, ...aiResult };
        updateCheckboxes(newState);
        return newState;
      });
    } catch (error) {
      console.error("Error updating AI results:", error);
    }
  }, [aiResult]);

  const updateCheckboxes = (updatedData) => {
    try {
      // Update the UI based on real-time AI results
      const updatedCheckboxStates = { ...checkboxStates };

      Object.keys(updatedData.checklist.objects).forEach((object) => {
        // Update checkbox state using React state
        updatedCheckboxStates.objects[object] =
          updatedData.checklist.objects[object];
      });

      Object.keys(updatedData.checklist.actions).forEach((action) => {
        // Update checkbox state using React state
        updatedCheckboxStates.actions[action] =
          updatedData.checklist.actions[action];
      });

      // Set the updated state to trigger re-render
      setCheckboxStates(updatedCheckboxStates);
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
              {index + 1}. {object} -{" "}
              <input
                type="checkbox"
                checked={checkboxStates.objects[object]}
                // Add an onChange handler to update the state when the checkbox is clicked
                onChange={(e) => {
                  const updatedCheckboxStates = { ...checkboxStates };
                  updatedCheckboxStates.objects[object] = e.target.checked;
                  setCheckboxStates(updatedCheckboxStates);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Actions</h2>
        <ul>
          {Object.keys(jsonData.checklist.actions).map((action, index) => (
            <li key={index + 1}>
              {index + 1}. {action} -{" "}
              <input
                type="checkbox"
                checked={checkboxStates.actions[action]}
                // Add an onChange handler to update the state when the checkbox is clicked
                onChange={(e) => {
                  const updatedCheckboxStates = { ...checkboxStates };
                  updatedCheckboxStates.actions[action] = e.target.checked;
                  setCheckboxStates(updatedCheckboxStates);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
