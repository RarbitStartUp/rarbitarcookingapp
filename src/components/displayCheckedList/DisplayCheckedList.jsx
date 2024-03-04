"use client";
import { useEffect, useState } from "react";
import styles from "./checkedList.module.css";

export function DisplayCheckedList({ fullChecklistString }) {
  let stepIndex= 1;
  const [jsonData, setJsonData] = useState(fullChecklistString);

  useEffect(() => {
    try {
      setJsonData((prevData) => {
        // Update the state based on previous state
        const newState = { ...prevData, ...fullChecklistString };
        console.log("newState:", newState);
        return newState;
      });
    } catch (error) {
      console.error("Error updating AI results:", error);
    }
  }, [fullChecklistString]);

  const renderChecklistItems = (checklistItems, checkboxStates) => {
    return Object.keys(checklistItems).map((item, index) => (
      <li className={styles.options} key={index + 1}>
        {index + 1}. {item} -{" "}
        {checkboxStates[item] ? "✔" : null}
      </li>
    ));
  };

 console.log("jsonData after setting:", jsonData);

  return (
    <div>
      <h1 className={styles.checklist}>Current Step - Step {jsonData.current?.stepIndex + 1}</h1>
      <h3 className={styles.checklist}>Timestamp : {jsonData.current?.timestamp}</h3>
      <div>
        <h2 className={styles.header}>Objects</h2>
        <ul>
          {renderChecklistItems(jsonData.current?.checklist.objects, jsonData.current?.checklist.objects)}
        </ul>
      </div>
      <div>
        <h2 className={styles.header}>Actions</h2>
        <ul>
          {renderChecklistItems(jsonData.current?.checklist.actions, jsonData.current?.checklist.actions)}
        </ul>
      </div>
        {Object.keys(jsonData.current?.checklist.objects).every(key => jsonData.current.checklist.objects[key]) &&
          Object.keys(jsonData.current?.checklist.actions).every(key => jsonData.current.checklist.actions[key]) &&
          Object.keys(jsonData.next?.checklist.objects).length === 0 &&
          Object.keys(jsonData.next?.checklist.actions).length === 0 && (
            <h1 className={styles.checklist}>You have finished all steps!</h1>
          )}
          {Object.keys(jsonData.next?.checklist.objects).length === 0 &&
            Object.keys(jsonData.next?.checklist.actions).length === 0 && (
              <h1 className={styles.checklist}>No more steps ahead</h1>
            )}
      <h1 className={styles.checklist}>Next Step - Step
        {Object.keys(jsonData.next?.checklist.objects).length === 0 &&
        Object.keys(jsonData.next?.checklist.actions).length === 0 ? (
          " --"
        ) : (
          jsonData.current?.stepIndex + 2
        )}
      </h1>
      <h2 className={styles.options}>Waiting to be detected next...</h2>
      <h3 className={styles.checklist}>
        Timestamp : {Object.keys(jsonData.next?.timestamp).length > 0 ? jsonData.next?.timestamp : '--'}
      </h3>
      <div>
      <h2 className={styles.header}>Objects</h2>
        <ul>
          {Object.keys(jsonData.next?.checklist.objects).length > 0 ? (
            Object.keys(jsonData.next?.checklist.objects).map((object, index) => (
              <li className={styles.options} key={index + 1}>{index + 1}. {object}</li>
            ))
          ) : (<li className={styles.options}>--</li>)}
        </ul>
      <h2 className={styles.header}>Actions</h2>
        <ul>
          {Object.keys(jsonData.next?.checklist.actions).length > 0 ? (
            Object.keys(jsonData.next?.checklist.actions).map((action, index) => (
              <li className={styles.options} key={index + 1}>{index + 1}. {action}</li>
            ))
          ) : (<li className={styles.options}>--</li>)}
        </ul>
      </div>
    </div>
  );
}
