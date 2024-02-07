"use client";
// displayCheckbox.js
import { useRef,useEffect, useState } from "react";
import { useWebSocket } from '@/app/WebsocketProvider';
import { useRouter } from "next/navigation";
import styles from "./checkbox.module.css";

// A helper function for safely parsing JSON
function safeJsonParse(data) {
  try {
    // If data is already an object, return it directly
    if (typeof data === "object" && data !== null) {
      return data;
    }

    // Otherwise, parse the JSON string
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    console.error("Data causing the error:", data);
    throw new Error("Invalid JSON format");
  }
}

export function DisplayCheckbox({ apiResponse, onAddItem, onRemoveItem }) {
  console.log("apiResponse in displayCheckbox1.jsx:", apiResponse);

  const [jsonData, setJsonData] = useState(null); // Added state for jsonData
  const [initialJsonData, setInitialJsonData] = useState(null);
  const [step, setStep] = useState(1);
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(null);

  const [objectItems, setObjectItems] = useState([]);
  const [actionItems, setActionItems] = useState([]);
  const router = useRouter();

  // const socketRef = useRef(new WebSocket("ws://localhost:3001"));
  const socket = useWebSocket();
  console.log("socket:", socket);
  console.log("isWebSocketOpen:", isWebSocketOpen);
  console.log("WebSocket readyState:", socket.readyState);
  
  useEffect(() => {
  if (socket && socket instanceof WebSocket) {
    socket.addEventListener("error", (error) => {
      console.error("WebSocket error in displayCheckbox :", error);
    });

    socket.addEventListener("open", () => {
      setIsWebSocketOpen(true);
      console.log(
        "WebSocket connection opened successfully in displayCheckbox"
      );
    });

    socket.addEventListener("close", () => {
      setIsWebSocketOpen(false);
      console.log("WebSocket connection closed in displayCheckbox");
    });
  } else {
    console.error("Invalid WebSocket instance");
  }
  }, [socket]);

  useEffect(() => {
    // Parse and set jsonData when apiResponse changes
    try {
      // const jsonString = apiResponse.result.parts[0].text;
      // const parsedData = safeJsonParse(jsonString);

      if (!apiResponse || apiResponse.length === 0) {
        console.error("Error: Invalid API response structure");
        alert("Error: Invalid API response structure. Please try again.");
        return;
      }

      console.log("apiResponse in displayCheckbox2.jsx:", apiResponse);
      const parsedData = safeJsonParse(apiResponse);
      console.log("parsedData:",parsedData);

      if (!parsedData) {
        console.error("Error: Invalid JSON structure");
        alert("Error: Invalid JSON structure. Please try again.");
        return;
      }

      // Check if the expected structure exists
      if (
        !parsedData ||
        !parsedData[0].timestamp ||
        !parsedData[0].checklist ||
        !parsedData[0].checklist.objects ||
        !parsedData[0].checklist.actions
      ) {
        console.error("Error: Invalid JSON structure");
        alert("Error: Invalid JSON structure. Please try again.");
        return;
      }
      // Log the parsed JSON data
      console.log("Parsed JSON Data:", parsedData);
     // Store the parsedData in the initialJsonData state variable
     setInitialJsonData(parsedData);
      // setJsonData(parsedData);
      setJsonData(
        (prevData) => {
          if (!parsedData) {
            console.error("Error: Invalid JSON structure");
            alert("Error: Invalid JSON structure. Please try again.");
            return prevData; // Return previous data if parsing fails
          }
          // Check if the expected structure exists
          if (
            !parsedData ||
            !parsedData[0].timestamp ||
            !parsedData[0].checklist ||
            !parsedData[0].checklist.objects ||
            !parsedData[0].checklist.actions
          ) {
            console.error("Error: Invalid JSON structure");
            alert("Error: Invalid JSON structure. Please try again.");
            return prevData; // Return previous data if structure is missing
          }
          // Log the parsed JSON data
          console.log("Parsed JSON Data:", parsedData);
          return parsedData; // Return the updated data
        },
        [apiResponse]
      ); // Add apiResponse as a dependency

    
    } catch (error) {
      console.error("Error parsing API response:", error);
      // Handle parsing error
    }
  }, [apiResponse]);

  useEffect(() => {
    if (jsonData) {
        let allObjects = [];
        let allActions = [];

        jsonData.forEach((stepData) => {
            const objects = Object.keys(stepData.checklist.objects);
            const actions = Object.keys(stepData.checklist.actions);
            allObjects = [...allObjects, ...objects];
            allActions = [...allActions, ...actions];
        });

        setObjectItems(allObjects);
        setActionItems(allActions);
    }
}, [jsonData]);


  if (jsonData === null) {
    return <div className="text-white font-bold"> jsonData = null, Loading...</div>; // or any other loading indicator
  }

  const addNewItem = async (listId, inputId) => {
    try {
        const newItemInput = document.getElementById(inputId);
        const newItem = newItemInput.value.toLowerCase();

        if (!newItem) {
            alert("Please enter a valid item.");
            return;
        }

        // Clear the input value after adding the new item
        newItemInput.value = "";

        setJsonData((prevData) => {
            const newData = prevData.map((stepData) => ({
                ...stepData,
                checklist: {
                    ...stepData.checklist,
                    [listId === "objectList" ? "objects" : "actions"]: {
                        ...stepData.checklist[listId === "objectList" ? "objects" : "actions"],
                        [newItem]: true,
                    },
                },
            }));
            return newData;
        });

        if (onAddItem) {
            setObjectItems((prevItems) => [...prevItems, newItem]);
        }
    } catch (error) {
        console.error("Error adding new items:", error);
        alert("Error adding new items. Please try again.");
    }
};

const removeNewItem = (listId, item) => {
  try {
      // Update the state to remove the item from objectItems and actionItems
      setObjectItems(prevObjectItems =>
          prevObjectItems.filter(obj => obj !== item)
      );
      setActionItems(prevActionItems =>
          prevActionItems.filter(act => act !== item)
      );

      // Update the jsonData state to reflect the removal
      setJsonData(prevData => {
          const newData = prevData.map(stepData => {
              const updatedChecklist = {
                  ...stepData.checklist,
                  [listId === "objectList" ? "objects" : "actions"]: {
                      ...stepData.checklist[listId === "objectList" ? "objects" : "actions"],
                  },
              };
              delete updatedChecklist[listId === "objectList" ? "objects" : "actions"][item];
              
              return {
                  ...stepData,
                  checklist: updatedChecklist,
              };
          });

          return newData;
      });
  } catch (error) {
      console.error("Error removing item:", error);
      alert("Error removing item. Please try again.");
  }
};

const resetChecklist = () => {
  try {
    // Reset jsonData to its original state
    setJsonData(initialJsonData);

    // Reset objectItems and actionItems
    let allObjects = [];
    let allActions = [];

    initialJsonData.forEach((stepData) => {
      const objects = Object.keys(stepData.checklist.objects);
      const actions = Object.keys(stepData.checklist.actions);
      allObjects = [...allObjects, ...objects];
      allActions = [...allActions, ...actions];
    });

    setObjectItems(allObjects);
    setActionItems(allActions);
  } catch (error) {
    console.error("Error resetting checklist:", error);
    alert("Error resetting checklist. Please try again.");
  }
};

  // Function to submit jsonData to WebSocket
  const submitDataToWebSocket = () => {
    try {
      // Check if WebSocket connection is open
      if (socket.readyState === WebSocket.OPEN) {
        // if (socket.connected) {
        // Convert jsonData to a JSON string
        // const jsonString = JSON.stringify(jsonData);

        // Send the JSON string to the WebSocket server
        // socket.send(jsonString);
        socket.send(JSON.stringify({ type: "jsonData", jsonData }));
        // socket.emit('jsonData', jsonData);

        // Log success message
        console.log("Data submitted to WebSocket:", jsonData);

        router.push("/livestream");
      } else {
        // Log an error if WebSocket connection is not open
        console.error("WebSocket connection not open. Unable to submit data.");
        alert("Error: WebSocket connection not open. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data to WebSocket:", error);
      alert("Error submitting data to WebSocket. Please try again.");
    }
  };

  
  return (
    <div>
    {Array.isArray(jsonData) && jsonData.map((timestampData, index) => {
      const currentStep = step + index; // Calculate the current step value
      return (
        <div key={index}>
          <h1 className={styles.checklist}>Step {currentStep}: </h1>
          <h2 className={styles.timestamp}> {timestampData.timestamp}</h2>
          <div>
            <h2 className={styles.header}>Objects</h2>
            <ul className="mt-1" id="objectList">
              {Object.keys(timestampData.checklist.objects).map((object, objIndex) => (
                <li key={objIndex + 1} className="flex items-center space-x-2">
                  <span className={styles.options}>{objIndex + 1}.</span>{" "}
                  <span className={styles.options}>{object}</span>
                  <input
                    type="checkbox"
                    defaultChecked={timestampData.checklist.objects[object]}
                  />
                  <button
                    className={styles.removeButton}
                    onClick={() => removeNewItem("objectList", object)}
                  ></button>
                </li>
              ))}
              <li>
                <div className="flex items-center space-x-2 mt-1">
                  <input
                    type="text"
                    className="mb-2 p-1 shadow-inner border text-center rounded w-full sm:w-auto sm:p-2 focus:outline-none focus:ring-5 focus:ring-slate-500"
                    id="newObjectInput"
                    placeholder="Add new object"
                  />
                  <button
                    className={styles.addButton}
                    onClick={() => addNewItem("objectList", "newObjectInput")}
                  ></button>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h2 className={styles.header}>Actions</h2>
            <ul className="mt-1" id="actionList">
              {Object.keys(timestampData.checklist.actions).map((action, actIndex) => (
                <li key={actIndex + 1} className="flex items-center space-x-2">
                  <span className={styles.options}>{actIndex + 1}.</span>{" "}
                  <span className={styles.options}>{action}</span>
                  <input
                    type="checkbox"
                    defaultChecked={timestampData.checklist.actions[action]}
                  />
                  <button
                    className={styles.removeButton}
                    onClick={() => removeNewItem("actionList", action)}
                  ></button>
                </li>
              ))}
              <li>
                <div className="flex items-center space-x-2 mt-1">
                  <input
                    type="text"
                    className="mb-2 p-1 shadow-inner border text-center rounded w-full sm:w-auto sm:p-2 focus:outline-none focus:ring-5 focus:ring-slate-500"
                    id="newActionInput"
                    placeholder="Add new action"
                  />
                  <button
                    className={styles.addButton}
                    onClick={() => addNewItem("actionList", "newActionInput")}
                  ></button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      );
              })}
      <div className="flex space-x-2">
        <button className={styles.largeButton} onClick={resetChecklist}>
          Reset
        </button>
        <button
          className={styles.largeButton}
          id="submitBtn"
          onClick={submitDataToWebSocket}
        >
          Submit
        </button>
      </div>
    </div>
  );  
}
