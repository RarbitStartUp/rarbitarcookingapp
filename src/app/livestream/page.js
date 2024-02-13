"use client"
// livestream.jsx
import { useRef, useEffect, useState } from 'react';
import { useWebSocket } from '../WebsocketProvider';
import { DisplayCheckedList } from '@/components/displayCheckedList/DisplayCheckedList';
import { initCamera, startCapture, stopCapture } from '@/components/camera/Camera';
import styles from './livestream.module.css';

export default function Livestream() {
  const [aiResult, setAiResult] = useState(null);
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [isWebSocketOpen, setIsWebSocketOpen] = useState(null);
  const isCapturingRef = useRef(false);
  const framesRef = useRef([]);
  const videoRef = useRef();
  const socket = useWebSocket()
  console.log("socket:",socket);
  
  useEffect(() => {
    const init = async () => {
      try {
        await initCamera(videoRef);
        setIsCameraInitialized(true);
        framesRef.current = [];
      } catch (error) {
        console.error('Error Streaming:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    init();
  }, []); // Empty dependency array ensures this effect runs only once, after mounting  
  
  useEffect(() => {
    socket.addEventListener('error', (error) => {
      console.error('WebSocket error in livestream page:', error);
    });
    
    socket.addEventListener('open', () => {
      setIsWebSocketOpen((prev) => {
        if (prev !== true) {
          console.log("isWebSocketOpen:", true);
        }
        return true;
      });
      init();
      console.log('WebSocket connection opened successfully in livestream page');
    });

    socket.addEventListener('message', (event) => {
      try {
        const aiResult = JSON.parse(event.data);
        console.log('Received parsed aiResult on client side ws :', aiResult);
        setAiResult(aiResult);
      } catch (error) {
        console.log('Received WebSocket message:', event.data);
        console.error('Error processing WebSocket message:', error);
      }
    });

    socket.addEventListener('close', () => {
      setIsWebSocketOpen((prev) => {
        if (prev !== false) {
          console.log("isWebSocketOpen:", false);
        }
        return false;
      });
      console.log('WebSocket connection closed in livestream page');
    });
  }, [socket]);

  function handleStartCapture() {
    // if (isCameraInitialized && socket && isWebSocketOpen) {
    if (isCameraInitialized && socket ) {
      startCapture(socket, isCapturingRef, framesRef, videoRef);
    } else {
      if (!isCameraInitialized) {
        console.warn('Cannot start capturing. Camera not initialized.');
      } else if (!socket) {
        console.warn('WebSocket is not initialized.');
      }
    }
  }
      // if (!socket) {
      //   console.warn('WebSocket is not initialized.');
      // } else if (!isWebSocketOpen) {
      //   console.warn('WebSocket connection is not open.');
      // }

  async function handleStopCapture() {
    await stopCapture(isCapturingRef, framesRef);
  }

  return (
    <div className="flex flex-col items-center">
      <div id="camera-feed">
        <video ref={videoRef} id="videoElement" autoPlay muted />
      </div>
      <div className="flex flex-row">
        <div className="flex space-x-2">
          <button
            className={styles.button}
            onClick={handleStartCapture}
            // disabled={!isCameraInitialized || isLoading || !(socket && isWebSocketOpen)}
            disabled={!isCameraInitialized || isLoading || !socket }
          >
            {isLoading ? 'Initializing...' : 'Start Capturing'}
          </button>
          <button
            className={styles.button}
            onClick={handleStopCapture}
            // disabled={!isCameraInitialized || isLoading || !(socket && isWebSocketOpen)}
            disabled={!isCameraInitialized || isLoading || !socket}
          >
            {isLoading ? 'Initializing...' : 'Stop Capturing'}
          </button>
        </div>
      </div>
      <div className="pt-5 mt-5" />    
      { aiResult && <DisplayCheckedList aiResult={aiResult} />}
    </div>
  );
}
