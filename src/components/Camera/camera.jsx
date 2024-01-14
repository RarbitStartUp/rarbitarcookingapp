"use client";

import { useEffect, useRef, useState } from "react";

let video;
let isCapturing = false;

export function Camera() {
  const [frames, setFrames] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    video = document.createElement("video");
    video.id = "videoElement";

    const container = document.createElement("div");
    container.id = "camera-feed";
    document.body.appendChild(container);

    initCamera();

    return () => {
      // Cleanup code if needed
      stopCapture();
    };
  }, []);

  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      video.srcObject = stream;

      video.addEventListener("loadedmetadata", () => {
        console.log("Video metadata loaded");
        console.log("Initializing camera...");
      });
    } catch (error) {
      console.error("Error initializing camera:", error);
    }
  };

  const displayFrames = async () => {
    try {
      const container = document.getElementById("camera-feed");
      container.innerHTML = "";
      container.appendChild(video);

      for (const frame of frames) {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");
        context.putImageData(frame, 0, 0);

        container.appendChild(canvas);

        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error("Error displaying frames:", error);
    }
  };

  const captureFrames = async (captureInterval = 100) => {
    try {
      await new Promise((resolve) => {
        const checkDimensions = () => {
          if (video && video.videoWidth && video.videoHeight) {
            resolve();
          } else {
            requestAnimationFrame(checkDimensions);
          }
        };

        checkDimensions();
      });

      const { videoWidth, videoHeight } = video;

      const canvas = document.createElement("canvas");
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      const context = canvas.getContext("2d");

      return new Promise(async (resolve, reject) => {
        try {
          await video.play();
          resolve();
        } catch (error) {
          console.error("Error playing video:", error);
          reject(error);
        }

        const captureFrame = async () => {
          try {
            context.drawImage(video, 0, 0, videoWidth, videoHeight);

            const imageData = context.getImageData(
              0,
              0,
              videoWidth,
              videoHeight
            );

            setFrames((prevFrames) => [...prevFrames, imageData]);

            setTimeout(captureFrame, captureInterval);
          } catch (error) {
            console.error("Error capturing frame:", error);
            resolve();
          }
        };

        captureFrame();
      });
    } catch (error) {
      console.error("Error capturing frames:", error.message);
    }
  };

  const stopCapture = () => {
    isCapturing = false;
  };

  const startCaptureFrames = (socketRef) => {
    if (!socketRef.current) {
      socketRef.current = new WebSocket(
        "wss://9e07-89-187-185-171.ngrok-free.app"
      );

      socketRef.current.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
      });

      socketRef.current.addEventListener("message", (event) => {
        const aiResult = JSON.parse(event.data);
        console.log(
          "user submitted checklist in displayCheckedList.js :",
          aiResult
        );
      });
    }

    try {
      setFrames([]); // Clear any previous frames and display the live stream
      isCapturing = true;

      const captureAndCallback = async () => {
        if (isCapturing) {
          const capturedFrames = await captureFrames(1);

          displayFrames();

          if (
            socketRef.current &&
            socketRef.current.readyState === WebSocket.OPEN
          ) {
            socketRef.current.send(
              JSON.stringify({ type: "frames", frames: capturedFrames })
            );
          }

          setTimeout(captureAndCallback, 0);
        }
      };

      captureAndCallback();
    } catch (error) {
      console.error("Error starting capture:", error);
    }
  };
}
