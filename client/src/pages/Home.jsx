import React, { useContext, useEffect, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import homeContext from "../state/homeContext.js";
import axios from "axios";
import { getUserDetail, logout } from "../apis/index.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails, setOnlineUser } from "../reducers/userSlice.js";
import Sidebar from "../components/Sidebar.jsx";
import logo from "../assets/logo.png";
import socketContext from "../state/socketContext.js";

const Home = () => {
  //const location = useLocation();
  //console.log(location);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();
  const refresh = useSelector((state) => state.userRed.refresh);

  const { user } = useContext(homeContext);

  const { socket } = useContext(socketContext);

  useEffect(() => {
    getUserDetail()
      .then((obj) => {
        console.log(obj);
        dispatch(setUserDetails(obj?.user));
      })
      .catch((error) => {
        console.log(error);
        navigate("/login");
      });
  }, []);

  /*Socket Connection here*/

  useEffect(() => {
   // console.log(socket);

    socket?.on("onlineUsers", (data) => {
      console.log("Received onlineUsers data:", data);
      dispatch(setOnlineUser(data));
    });

    //
  }, [socket, refresh]);

  //console.log(location);

  const basePath = location.pathname === "/";
  return (
    <div className="grid lg:grid-cols-[300px,1fr]  h-screen max-h-screen">
      {/* <Avatar
        width={70}

        height={70}
        name={location?.state?.name}
        imageUrl={location?.state?.profile_pic}
      /> */}

      <section className={`bg-white ${!basePath && "hidden"} lg:block `}>
        <Sidebar />
      </section>

      <section className={`${basePath && "hidden"}`}>
        <Outlet />
        {/* <FiLogOut onClick={handleLogout} /> */}
      </section>

      <div
        className={` ${
          !basePath
            ? "hidden"
            : "lg:flex hidden flex-col items-center justify-center"
        }`}
      >
        <div>
          <img src={logo} width={350} alt="logo" />
        </div>
        <p className="text-lg mt-2 text-slate-400">
          Select user to send Messages
        </p>
      </div>
    </div>
  );
};

export default Home;
