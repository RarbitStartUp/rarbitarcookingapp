"use client";
// camera.jsx
import * as tf from '@tensorflow/tfjs';
import { useEffect, useRef, useState } from 'react';

export async function initCamera(videoRef) {
  try {
    if (typeof window !== 'undefined' && navigator.mediaDevices) {
    const video = videoRef.current;
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.addEventListener('loadedmetadata', () => {
      console.log('Video metadata loaded');
    });

    await new Promise((resolve) => {
      video.addEventListener(
        'loadeddata',
        () => {
          console.log('Video data loaded');
          console.log('Initializing camera...');
          resolve();
        },
        { once: true }
      );
    });

    await tf.ready();
  }} catch (error) {
    console.error('Error initializing camera:', error);
  }
}

export async function startCapture(socket, isCapturingRef, framesRef, videoRef) {
  try {
    isCapturingRef.current = true;
    console.log('Capturing started');

    let video;

    const captureFrame = async () => {
      try {
        const { videoWidth, videoHeight } = video;

        const canvas = document.createElement('canvas');
        canvas.width = videoWidth;
        canvas.height = videoHeight;

        const context = canvas.getContext('2d');

        await video.play();

        context.drawImage(video, 0, 0, videoWidth, videoHeight);

        const imageData = context.getImageData(0, 0, videoWidth, videoHeight);

        console.log('Captured frame dimensions:', videoWidth, videoHeight);

        const tensorData = tf.browser.fromPixels(canvas);
        console.log('Tensor data:', tensorData);

        const tensorResized = tf.image.resizeBilinear(tensorData, [224, 224]);
        const tensorExpanded = tensorResized.expandDims(0);

        const tensorArray = tensorExpanded.arraySync();
        console.log('Sent, tensorArray:', tensorArray);

        console.log("Sent, tensorArray:", tensorArray);
        if (socket.readyState === WebSocket.OPEN) {
          // if (socket.connected) {
          socket.send(JSON.stringify({ type: 'frames', frames: tensorArray }));
          // socket.emit('frames', { frames: tensorArray });
          console.log('Sent frames to the server.');
        } else {
          console.warn('WebSocket not open. Frames not sent.');
        }
        
      } catch (error) {
        console.error('Error capturing frame:', error);
      }
    };

    const captureAndCallback = async () => {
      while (isCapturingRef.current) {
        // Wait for a short delay before capturing the next frame
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed (e.g., 1000 milliseconds for 1 frame per second)
        await new Promise((resolve) => {
          const checkDimensions = () => {
            video = videoRef.current;
            if (video && video.videoWidth && video.videoHeight) {
              resolve();
            } else {
              requestAnimationFrame(checkDimensions);
            }
          };

          checkDimensions();
        });

        await captureFrame();
      }
    };

    await captureAndCallback();

    // capture a frame every 3 seconds (1000 milliseconds) continuously until you clear the interval
    await new Promise(resolve => setInterval(resolve, 1000));
  } catch (error) {
    console.error('Error starting capture:', error);
  }
}

export function stopCapture(socket,isCapturingRef, framesRef) {
  return new Promise((resolve) => {
    isCapturingRef.current = false;

    // Send the flag to stop retrying via WebSocket
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'stopRetryFrames' }));
        console.log('Sent stopRetryFrames message to the server.');
    } else {
        console.warn('WebSocket not open. Stop retry frames message not sent.');
    }

    resolve();

    framesRef.current = [];
  });
}
