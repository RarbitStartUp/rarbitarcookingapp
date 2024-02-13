"use client"

// WebsocketProvider.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const WebSocketContext = createContext();

const getWebSocketURL = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment) {
    return "ws://localhost:3001";
  }

  if (typeof window !== 'undefined') {
    const isLocalhost = window.location.hostname === 'localhost';
    if (isLocalhost) {
      return "ws://locallost:3001";
    }

    if (window.location.hostname === 'rarbit.com') {
      return "wss://rarbit.tech";
    }
  }
};

export const WebSocketProvider = ({ children }) => {
  const socketUrl = getWebSocketURL();
  console.log("socketUrl :", socketUrl);
  
  // Use state to manage the WebSocket instance and its connection status
  const [socket, setSocket] = useState(null);
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  
  useEffect(() => {
    const socket = new WebSocket(socketUrl);
    
    socket.addEventListener('open', () => {
      console.log("WebSocket connection opened successfully");
      setIsWebSocketOpen(true);
      // Add a small delay to ensure WebSocket is connected before logging
      setTimeout(() => {
        console.log("Is WebSocket connected:", socket instanceof WebSocket);
      }, 100);
    });
    
    socket.addEventListener('close', () => {
      console.log("WebSocket connection closed");
      setIsWebSocketOpen(false);
    });
    
    setSocket(socket);
    
    // Clean up the WebSocket instance and event listeners when the component is unmounted
    return () => {
      socket.close();
    };
  }, [socketUrl]);
  
  // console.log("Is WebSocket connected:", socket instanceof WebSocket);
  
  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
