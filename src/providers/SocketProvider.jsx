import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";
import { SERVER_URL } from "../helper/constants";

const SocketContext = createContext(null);

export const useSocket = () => {
  console.log(SERVER_URL);
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const socket = useMemo(() => io(SERVER_URL), []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
