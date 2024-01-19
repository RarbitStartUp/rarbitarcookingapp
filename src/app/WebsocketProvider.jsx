"use client"

import { createContext, useContext } from 'react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const socket = new WebSocket("ws://localhost:3001");

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
  };