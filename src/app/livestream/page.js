"use client";

import { DisplayCheckedList } from "@/components/displayCheckedList/DisplayCheckedList";
import { Camera } from "@/components/camera/Camera";

// Import necessary dependencies and components

export async function LiveStream() {
  const isCapturingRef = useRef(false);
  const socketRef = useRef(new WebSocket("ws://localhost:3001"));

  useEffect(() => {
    const socket = socketRef.current;

    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    socket.addEventListener("message", (event) => {
      if (isCapturingRef.current) {
        const aiResult = JSON.parse(event.data);
        console.log("Received AI result during capturing frames:", aiResult);
        return aiResult;
      } else {
        console.log("Received WebSocket message:", event.data);
      }
    });
  }, []);

  try {
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

    async function startCapture() {
      try {
        // Initialize the camera before capturing frames
        await initCamera();

        // Pause briefly to ensure the camera is initialized before capturing frames
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Initialize frames as an empty array
        frames = await captureFrames([]);

        // Display frames
        displayFrames(frames);

        // Call startCaptureFrames to start capturing frames
        isCapturingRef.current = true;
        startCaptureFrames(socketRef);
      } catch (error) {
        console.error("Error starting capture:", error);
      }
    }

    // Add a "Stop Capturing" button
    async function stopCapture() {
      // Call stopCaptureFrames to stop capturing frames
      isCapturingRef.current = false;
    }
  } catch (error) {
    console.error("Error Streaming:", error);
  }

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
