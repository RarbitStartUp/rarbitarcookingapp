"use client"

import { createContext, useContext } from 'react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const socket = new WebSocket("wss://rarbit.tech");
  // const socket = new WebSocket("ws://0.0.0.0:3001");

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
  };