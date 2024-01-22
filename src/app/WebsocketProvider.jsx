"use client"

import { createContext, useContext } from 'react';
import io from "socket.io-client"

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  // const socket = new WebSocket("ws://localhost:8080");
  const socket = io("http://localhost:3002");

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
  };