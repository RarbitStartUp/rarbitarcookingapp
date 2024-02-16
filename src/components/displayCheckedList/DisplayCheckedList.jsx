"use client";
import { useEffect, useState } from "react";
import styles from "./checkedList.module.css";

export function DisplayCheckedList({ aiResult }) {
  const [jsonData, setJsonData] = useState(aiResult);

  useEffect(() => {
    try {
      setJsonData((prevData) => {
        // Update the state based on previous state
        const newState = { ...prevData, ...aiResult };
        return newState;
      });
    } catch (error) {
      console.error("Error updating AI results:", error);
    }
  }, [aiResult]);

  const renderChecklistItems = (checklistItems, checkboxStates) => {
    return Object.keys(checklistItems).map((item, index) => (
      <li className={styles.options} key={index + 1}>
        {index + 1}. {item} -{" "}
        {checkboxStates[item] ? "✔" : null}
      </li>
    ));
  };

  return (
    <div>
      <h1 className={styles.checklist}>Checklist</h1>
      <div>
        <h2 className={styles.header}>Objects</h2>
        <ul>
          {renderChecklistItems(jsonData.checklist.objects, jsonData.checklist.objects)}
        </ul>
      </div>
      <div>
        <h2 className={styles.header}>Actions</h2>
        <ul>
          {renderChecklistItems(jsonData.checklist.actions, jsonData.checklist.actions)}
        </ul>
      </div>
    </div>
  );
}
