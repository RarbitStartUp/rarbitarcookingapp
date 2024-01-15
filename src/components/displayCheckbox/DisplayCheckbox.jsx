"use client";
// displayCheckbox.js
import { useEffect, useState } from "react";
// import { SubmitChecklist } from "@/components/submitChecklist/SubmitChecklist";
import styles from "./checkbox.module.css";
import { Simplify } from "@/components/simplify/Simplify";

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

  const [objectItems, setObjectItems] = useState([]);
  const [actionItems, setActionItems] = useState([]);

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
    return <div>Loading...</div>; // or any other loading indicator
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
      const updatedItems =
        listId === "objectList"
          ? objectItems.filter((obj) => obj !== item)
          : actionItems.filter((act) => act !== item);

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
        const listItem = listElement
          ?.querySelector(`span:contains('${object}')`)
          .closest("li");

        if (listItem) {
          listItem.remove();

          delete jsonData.checklist.objects[object];
        }
      });

      actionItems.forEach((action) => {
        const listElement = document.getElementById("actionList");
        const listItem = listElement
          ?.querySelector(`span:contains('${action}')`)
          .closest("li");

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

  return (
    <div>
      <h1 className={styles.checklist}>Checklist</h1>
      <div>
        <h2 className={styles.header}>Objects</h2>
        <ul className="item-list" id="objectList">
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
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="mb-2 p-2 shadow-inner border text-center rounded w-full sm:w-auto sm:p-2 focus:outline-none focus:ring-5 focus:ring-slate-500"
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
        <ul className="item-list" id="actionList">
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
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="mb-2 p-2 shadow-inner border text-center rounded w-full sm:w-auto sm:p-2 focus:outline-none focus:ring-5 focus:ring-slate-500"
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
      <div className="flex justify-between">
        <button className={styles.largeButton} onClick={() => resetChecklist()}>
          Reset
        </button>
        <button
          className={styles.largeButton}
          id="submitBtn"
          // onClick={SubmitChecklist}
          onClick={() => Simplify()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
