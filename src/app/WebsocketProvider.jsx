"use client"

import { createContext, useContext } from 'react';
import io from "socket.io-client"

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  // const socket = new WebSocket("ws://localhost:3001");
  const socket = io("https://rarbit.tech",
    {
      reconnection: true,
      reconnectionAttempts: Infinity, // Try to reconnect indefinitely
      reconnectionDelay: 1000, // in milliseconds
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5,
      autoConnect: true, // Enable auto-connect on initialization
  });

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
  };