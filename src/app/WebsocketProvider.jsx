"use client"

import { createContext, useContext } from 'react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const socket = new WebSocket("wss://6be9-89-187-185-185.ngrok-free.app");

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
  };