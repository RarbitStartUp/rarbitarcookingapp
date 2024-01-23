"use client"

import { createContext, useContext } from 'react';
import io from "socket.io-client"

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  // const socket = new WebSocket("ws://localhost:3001");
  const socket = io("https://rarbit.tech");

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
  };