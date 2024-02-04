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
      console.log("apiResponse in displayCheckbox2.jsx:", apiResponse);
      const parsedData = safeJsonParse(apiResponse);

      if (!parsedData) {
        console.error("Error: Invalid JSON structure");
        alert("Error: Invalid JSON structure. Please try again.");
        return;
      }

      // Check if the expected structure exists
      if (
        !parsedData ||
        !parsedData.checklist ||
        !parsedData.checklist.objects ||
        !parsedData.checklist.actions
      ) {
        console.error("Error: Invalid JSON structure");
        alert("Error: Invalid JSON structure. Please try again.");
        return;
      }
      // Log the parsed JSON data
      console.log("Parsed JSON Data:", parsedData);

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
            !parsedData.checklist ||
            !parsedData.checklist.objects ||
            !parsedData.checklist.actions
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

      setJsonData((prevData) => ({
        ...prevData,
        checklist: {
          ...prevData.checklist,
          [listId === "objectList" ? "objects" : "actions"]: {
            ...prevData.checklist[
              listId === "objectList" ? "objects" : "actions"
            ],
            [newItem]: true,
          },
        },
      }));

      if (onAddItem) {
        if (listId === "objectList") {
          setObjectItems((prevItems) => [...prevItems, newItem]);
        } else {
          setActionItems((prevItems) => [...prevItems, newItem]);
        }
      }
    } catch (error) {
      console.error("Error adding new items:", error);
      alert("Error adding new items. Please try again.");
    }
  };

  const removeNewItem = (listId, item) => {
    try {
      console.log("Removing item:", item);

      const updatedItems =
        listId === "objectList"
          ? objectItems.filter((obj) => obj !== item)
          : actionItems.filter((act) => act !== item);

      console.log("Updated items:", updatedItems);

      setJsonData((prevData) => ({
        ...prevData,
        checklist: {
          ...prevData.checklist,
          [listId === "objectList" ? "objects" : "actions"]: {
            ...prevData.checklist[
              listId === "objectList" ? "objects" : "actions"
            ],
            [item]: undefined,
          },
        },
      }));

      if (onRemoveItem) {
        if (listId === "objectList") {
          setObjectItems(updatedItems);
        } else {
          setActionItems(updatedItems);
        }
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Error removing item. Please try again.");
    }
  };

  const resetChecklist = () => {
    try {
      objectItems.forEach((object) => {
        const listElement = document.getElementById("objectList");
        const listItem = Array.from(listElement.children).find((li) =>
          li.textContent.includes(object)
        );

        if (listItem) {
          listItem.remove();

          delete jsonData.checklist.objects[object];
        }
      });

      actionItems.forEach((action) => {
        const listElement = document.getElementById("actionList");
        const listItem = Array.from(listElement.children).find((li) =>
          li.textContent.includes(action)
        );

        if (listItem) {
          listItem.remove();

          delete jsonData.checklist.actions[action];
        }
      });

      console.log("after removal:", jsonData);

      if (onRemoveItem) {
        onRemoveItem(); // Pass any necessary arguments to onRemoveItem
      }

      setObjectItems([]);
      setActionItems([]);
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
     {timestamps.map((timestampData, index) => (
       <div key={index}>
         <h1 className={styles.checklist}>Checklist for Timestamp: {timestampData.timestamp}</h1>
      <div>
        <h2 className={styles.header}>Objects</h2>
        <ul className="mt-1" id="objectList">
          {Object.keys(jsonData.checklist.objects).map((object, index) => (
            <li key={index + 1} className="flex items-center space-x-2">
              <span className={styles.options}>{index + 1}.</span>{" "}
              <span className={styles.options}>{object}</span>
              <input
                type="checkbox"
                defaultChecked={jsonData.checklist.objects[object]}
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
          {Object.keys(jsonData.checklist.actions).map((action, index) => (
            <li key={index + 1} className="flex items-center space-x-2">
              <span className={styles.options}>{index + 1}.</span>{" "}
              <span className={styles.options}>{action}</span>
              <input
                type="checkbox"
                defaultChecked={jsonData.checklist.actions[action]}
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
      ))}
  </div>
  );
}
