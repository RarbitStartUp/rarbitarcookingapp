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
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const isCapturingRef = useRef(false);
  const framesRef = useRef([]);
  const videoRef = useRef();
  const socket = useWebSocket();

  useEffect(() => {
    socket.addEventListener('error', (error) => {
      console.error('WebSocket error in livestream page:', error);
    });

    socket.addEventListener('open', () => {
      setIsWebSocketOpen(true);
      console.log('WebSocket connection opened successfully in livestream page');
    });

    socket.addEventListener('message', (event) => {
      try {
        const aiResult = JSON.parse(event.data);
        console.log('Received AI result during capturing frames:', aiResult);
        setAiResult(aiResult);
      } catch (error) {
        console.log('Received WebSocket message:', event.data);
        console.error('Error processing WebSocket message:', error);
      }
    });

    socket.addEventListener('close', () => {
      setIsWebSocketOpen(false);
      console.log('WebSocket connection closed in livestream page');
    });
  }, [socket]);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  function handleStartCapture() {
    if (isCameraInitialized) {
      startCapture(socket, isCapturingRef, framesRef, videoRef);
    } else {
      console.warn('Cannot start capturing. Camera not initialized.');
    }
  }

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
            // disabled={!isCameraInitialized || isLoading || !isWebSocketOpen}
            disabled={!isCameraInitialized || isLoading}
          >
            {isLoading ? 'Initializing...' : 'Start Capturing'}
          </button>
          <button
            className={styles.button}
            onClick={handleStopCapture}
            // disabled={!isCameraInitialized || isLoading || !isWebSocketOpen}
            disabled={!isCameraInitialized || isLoading }
          >
            {isLoading ? 'Initializing...' : 'Stop Capturing'}
          </button>
        </div>
      </div>
      {aiResult && <DisplayCheckedList aiResult={aiResult} />}
    </div>
  );
}
