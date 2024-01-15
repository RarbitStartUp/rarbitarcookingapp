"use client";

import { useRef, useEffect, useState } from "react";
import { DisplayCheckedList } from "@/components/displayCheckedList/DisplayCheckedList";
import { Camera } from "@/components/camera/Camera";

export function SubmitChecklist() {
  const [aiResult, setAiResult] = useState(null);
  const isCapturingRef = useRef(false);
  const socketRef = useRef(
    // new WebSocket("wss://9e07-89-187-185-171.ngrok-free.app")
    new WebSocket("ws://localhost:3001")
  );

  useEffect(() => {
    const socket = socketRef.current;

    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    socket.addEventListener("open", () => {
      console.log("WebSocket connection opened successfully");
    });

    socket.addEventListener("message", (event) => {
      if (isCapturingRef.current) {
        const aiResult = JSON.parse(event.data);
        console.log("Received AI result during capturing frames:", aiResult);
        setAiResult(aiResult); // Update state with aiResult
      } else {
        console.log("Received WebSocket message:", event.data);
      }
    });
  }, []);

  useEffect(() => {
    // This effect runs once after the initial render
    const fetchData = async () => {
      try {
        // Initialize the camera before capturing frames
        await Camera.initCamera();

        // Pause briefly to ensure the camera is initialized before capturing frames
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Initialize frames as an empty array
        let frames = [];

        // Capture frames
        frames = await Camera.captureFrames(frames);

        // Display frames
        Camera.displayFrames(frames);

        setAiResult(frames); // Update state with aiResult
      } catch (error) {
        console.error("Error Streaming:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Add a "Start Capturing" button
  const startCapture = async () => {
    try {
      // Initialize the camera before capturing frames
      await Camera.initCamera();

      // Pause briefly to ensure the camera is initialized before capturing frames
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Initialize frames as an empty array
      let frames = await Camera.captureFrames([]);

      // Display frames
      Camera.displayFrames(frames);

      // Call startCaptureFrames to start capturing frames
      isCapturingRef.current = true;
      Camera.startCaptureFrames(socketRef);
    } catch (error) {
      console.error("Error starting capture:", error);
    }
  };

  // Add a "Stop Capturing" button
  const stopCapture = () => {
    // Call stopCaptureFrames to stop capturing frames
    isCapturingRef.current = false;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row">
        <button onClick={startCapture}>Start Capturing</button>
        <button onClick={stopCapture}>Stop Capturing</button>
      </div>
      {/* DisplayCheckedList component */}
      <DisplayCheckedList aiResult={aiResult} />
    </div>
  );
}
