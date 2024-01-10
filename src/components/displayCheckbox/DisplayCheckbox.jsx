// displayCheckbox.js
import { useEffect, useState } from "react";
import Camera from "./Camera";
import { displayCheckedList } from "./displayCheckedList";

// A helper function for safely parsing JSON
function safeJsonParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    console.error("JSON String causing the error:", jsonString);
    throw new Error("Invalid JSON format");
  }
}

const DisplayCheckbox = ({ apiResponse, onAddItem }) => {
  const [addedItems, setAddedItems] = useState([]);
  const [jsonData, setJsonData] = useState(null); // Added state for jsonData
  const isCapturingRef = useRef(false);

  const socketRef = useRef(
    new WebSocket("wss://rarbitarcookingapp.vercel.app")
  );
  useEffect(() => {
    const socket = socketRef.current;

    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    socket.addEventListener("message", (event) => {
      if (isCapturing) {
        const aiResult = JSON.parse(event.data);
        console.log("Received AI result during capturing frames:", aiResult);
        displayCheckedList(aiResult);
      } else {
        console.log("Received WebSocket message:", event.data);
      }
    });

    // Cleanup function
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    // Parse and set jsonData when apiResponse changes
    try {
      const jsonString = apiResponse.result.parts[0].text;
      const jsonData = safeJsonParse(jsonString);

      // Check if the expected structure exists
      if (
        !jsonData ||
        !jsonData.checklist ||
        !jsonData.checklist.objects ||
        !jsonData.checklist.actions
      ) {
        console.error("Error: Invalid JSON structure");
        alert("Error: Invalid JSON structure. Please try again.");
        return;
      }
      // Log the parsed JSON data
      console.log("Parsed JSON Data:", jsonData);

      setJsonData(jsonData);
    } catch (error) {
      console.error("Error parsing API response:", error);
      // Handle parsing error
    }
  }, [apiResponse]);

  const addNewItem = async (listId, inputId) => {
    try {
      const newItemInput = document.getElementById(inputId);
      const itemList = document.getElementById(listId);

      const newItem = newItemInput.value.toLowerCase();

      if (
        Object.keys(
          jsonData.checklist[listId === "objectList" ? "objects" : "actions"]
        ).some((item) => item.toLowerCase() === newItem)
      ) {
        alert("The item is already added!");
        return;
      }

      const newItemIndex =
        Object.keys(
          jsonData.checklist[listId === "objectList" ? "objects" : "actions"]
        ).length + 1;

      const newItemElement = document.createElement("li");
      newItemElement.innerHTML = `
        ${newItemIndex}. 
        <span>${newItemInput.value}</span>
        <input type="checkbox" checked ${
          jsonData.checklist[listId === "objectList" ? "objects" : "actions"][
            newItem
          ]
            ? "checked"
            : ""
        }/>
        <button onClick={() => removeNewItem(listId, newItem)}>Remove</button>
      `;

      itemList.appendChild(newItemElement);

      setAddedItems((prevItems) => [...prevItems, newItem]);

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
        onAddItem(addedItems);
      }
    } catch (error) {
      console.error("Error adding new items:", error);
      alert("Error adding new items. Please try again.");
    }
  };

  const removeNewItem = (listId, item) => {
    try {
      const itemList = document.getElementById(listId);

      const itemToRemove = Array.from(itemList.children).find(
        (li) =>
          li.querySelector("span") &&
          li.querySelector("span").textContent.toLowerCase() === item
      );

      if (itemToRemove) {
        itemList.removeChild(itemToRemove);

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

        setAddedItems((prevItems) =>
          prevItems.filter((addedItem) => addedItem !== item)
        );

        console.log("after removal:", jsonData);

        if (typeof onRemoveItem === "function") {
          onRemoveItem(item);
        }
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Error removing item. Please try again.");
    }
  };

  const resetChecklist = () => {
    try {
      addedItems.forEach((item) => {
        const listElement = document.getElementById(item.list);
        const listItem = listElement?.children[item.index];

        if (listItem) {
          listItem.remove();

          delete jsonData.checklist[
            item.list === "objectList" ? "objects" : "actions"
          ][item.item];

          console.log("after removal:", jsonData);

          if (onRemoveItem) {
            onRemoveItem(item);
          }
        }
      });

      setAddedItems([]);
    } catch (error) {
      console.error("Error resetting checklist:", error);
      alert("Error resetting checklist. Please try again.");
    }
  };

  const submitChecklist = async () => {
    try {
      const wsMessage = JSON.stringify({
        type: "ping",
        jsonData: jsonData, // Include the current state of jsonData
      });

      // Assuming you have a way to establish a WebSocket connection in Next.js
      // Example: const socket = new WebSocket('ws://example.com/socket');
      socket.send(wsMessage);

      const { startCaptureFrames, captureFrames, displayFrames, initCamera } =
        Camera;

      // Initialize the camera before capturing frames
      await initCamera();

      // Pause briefly to ensure the camera is initialized before capturing frames
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Initialize frames as an empty array
      let frames = [];

      // Capture frames
      frames = await captureFrames(frames);
      // Display frames
      displayFrames(frames);

      // Remove the submit button if it's still in the DOM
      const submitButton = document.getElementById("submitBtn");
      if (submitButton && submitButton.parentNode) {
        submitButton.parentNode.removeChild(submitButton);
      }

      // Add a "Start Capturing" button
      const startCaptureButton = document.createElement("button");
      startCaptureButton.textContent = "Start Capturing Frames";
      startCaptureButton.onclick = async () => {
        try {
          // Initialize the camera before capturing frames
          await initCamera();

          // Pause briefly to ensure the camera is initialized before capturing frames
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Initialize frames as an empty array
          let frames = [];

          // Capture frames
          frames = await captureFrames(frames);

          // Display frames
          displayFrames(frames);

          // Call startCaptureFrames to start capturing frames
          isCapturing = true;
          startCaptureFrames(socket);
        } catch (error) {
          console.error("Error starting capture:", error);
        }
      };

      resultContainer.appendChild(startCaptureButton);

      // Add a "Stop Capturing" button
      const stopCaptureButton = document.createElement("button");
      stopCaptureButton.textContent = "Stop Capturing Frames";
      stopCaptureButton.onclick = async () => {
        // Call stopCaptureFrames to stop capturing frames
        isCapturing = false;
      };

      resultContainer.appendChild(stopCaptureButton);
    } catch (error) {
      console.error("Error updating checklist:", error);
      // Handle the error, e.g., display an error message to the user
      document.getElementById("result-container").textContent =
        "Error updating checklist. Please try again.";
    }
  };

  return (
    <div>
      <h1>Checklist</h1>
      <div>
        <h2>Objects</h2>
        <ul className="item-list" id="objectList">
          {Object.keys(jsonData.checklist.objects).map((object, index) => (
            <li key={index + 1}>
              {index + 1}. <span>{object}</span>
              <input
                type="checkbox"
                defaultChecked={jsonData.checklist.objects[object]}
              />
              <button onClick={() => removeNewItem("objectList", object)}>
                Remove
              </button>
            </li>
          ))}
          <li>
            <input
              type="text"
              className="new-input"
              id="newObjectInput"
              placeholder="Add new object"
            />
            <button onClick={() => addNewItem("objectList", "newObjectInput")}>
              Add
            </button>
          </li>
        </ul>
      </div>
      <div>
        <h2>Actions</h2>
        <ul className="item-list" id="actionList">
          {Object.keys(jsonData.checklist.actions).map((action, index) => (
            <li key={index + 1}>
              {index + 1}. <span>{action}</span>
              <input
                type="checkbox"
                defaultChecked={jsonData.checklist.actions[action]}
              />
              <button onClick={() => removeNewItem("actionList", action)}>
                Remove
              </button>
            </li>
          ))}
          <li>
            <input
              type="text"
              className="new-input"
              id="newActionInput"
              placeholder="Add new action"
            />
            <button onClick={() => addNewItem("actionList", "newActionInput")}>
              Add
            </button>
          </li>
        </ul>
      </div>
      <button onClick={() => resetChecklist()}>Reset Checklist</button>
      <button id="submitBtn" onClick={() => submitChecklist()}>
        Submit Checklist
      </button>
    </div>
  );
};

export default DisplayCheckbox;
