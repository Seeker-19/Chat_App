import { useContext, useEffect, useState } from "react";
import socketContext from "./socketContext.js";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import homeContext from "./homeContext.js";
export const Socket = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const token = useSelector((state) => state.userRed.token);
  const refresh = useSelector((state) => state.userRed.refresh);

  const user = useSelector((state) => state.userRed.user);

  // const newSocket = useMemo(
  //   () =>
  //     io("http://localhost:5000", {
  //       withCredentials: true,
  //     }),
  //   []
  // );
  //const { user } = useContext(homeContext);

  useEffect(() => {
    // Create a new socket instance

    // Set up event listeners or any other configurations for the socket if needed

    const newSocket = io("http://localhost:5000", {
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log("Connected to the server", newSocket.id);

      setTimeout(() => {
        console.log("Connected:", newSocket.connected);
        console.log(newSocket);
      }, 1000);

      //console.log(newSocket);
    });

    

    // newSocket.on("disconnect", () => {
    //   console.log("Disconnected from the server", newSocket.id);
    // });

    // Save the socket instance to state
    setSocket(newSocket);

    // Clean up the connection on unmount
    return () => {
      newSocket.disconnect();
      console.log("disconneced",newSocket);
      setSocket(null);
    };
  }, [refresh]);
  //console.log(newSocket);
  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};
