"use client";

import { DisplayCheckedList } from "@/components/displayCheckedList/DisplayCheckedList";
import { Camera } from "@/components/camera/Camera";

export async function LiveStream() {
  //   const isCapturingRef = useRef(false);
  const socketRef = useRef(
    // new WebSocket("wss://9e07-89-187-185-171.ngrok-free.app")
    new WebSocket("ws://localhost:3001")
  );

  useEffect(() => {
    const socket = socketRef.current;

    socket.addEventListener("open", () => {
      console.log(
        "WebSocket connection opened on the client side LiveStream.js"
      );
    });

    socket.addEventListener("message", (event) => {
      const aiResult = JSON.parse(event.data);
      console.log("Received AI result from server:", aiResult);

      // Assuming displayCheckedList is a function in your component
      //   displayCheckedList(aiResult);
    });

    socket.addEventListener("close", () => {
      console.log("WebSocket connection closed on the client side");
    });
  }, []); // Only run once when the component mounts

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
        let frames = [];

        // Capture frames
        frames = await captureFrames(frames);

        // Display frames
        displayFrames(frames);

        // Call startCaptureFrames to start capturing frames
        isCapturing = true;
        startCaptureFrames(socketRef);
      } catch (error) {
        console.error("Error starting capture:", error);
      }
    }

    // Add a "Stop Capturing" button
    async function stopCapture() {
      // Call stopCaptureFrames to stop capturing frames
      isCapturing = false;
    }
  } catch {
    console.error("Error Streaming:", error);
  }

  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-row">
        <button onClick={startCapture}>Starting Capturing</button>
        <button onClick={stopCapture}>Stop Capturing</button>
      </div>
      <DisplayCheckedList aiResult={aiResult} />
    </div>
  );
}
