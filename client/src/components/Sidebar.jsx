import React, { useContext, useEffect, useState } from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../apis/index.js";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserDetails, setRefresh } from "../reducers/userSlice";
import Avatar from "react-avatar";
import homeContext from "../state/homeContext.js";
import EditUserDetails from "./EditUserDetails.jsx";
import { GoArrowUpLeft } from "react-icons/go";
import SearchUser from "./SearchUser.jsx";
import socketContext from "../state/socketContext.js";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user,
    editUser,
    setEditUser,
    allUsers,
    setAllUsers,
    openSearch,
    setOpenSearch,
  } = useContext(homeContext);

  const { socket } = useContext(socketContext);

  useEffect(() => {
    if (socket) {
      socket.emit("sidebar", user?._id);

      socket.on("currentUserConversation", (data) => {
        console.log("conversation", data);

        const conversationUserData = data.map((conv, index) => {
          if (conv?.sender?._id === conv?.receiver?._id) {
            return {
              ...conv,
              userDetails: conv?.sender,
            };
          } else if (conv?.receiver?._id !== user?._id) {
            return {
              ...conv,
              userDetails: conv?.receiver,
            };
          } else {
            return {
              ...conv,
              userDetails: conv?.sender,
            };
          }
        });

        console.log(conversationUserData);
        setAllUsers(conversationUserData);
      });
    }
  }, [socket, user?._id]);

  const handleLogout = async () => {
    try {
      logout()
        .then((data) => {
          toast.success(data.message);
          dispatch(setUserDetails(null));
          dispatch(setRefresh());
          navigate("/login");
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="h-full w-full grid grid-cols-[60px,1fr]">
        <div className="bg-slate-200 w-16 h-full rounded-tr-lg rounded-br-lg py-4 px-2 flex flex-col justify-between">
          <div>
            <NavLink
              className={({ isActive }) =>
                `h-12 flex items-center justify-center cursor-pointer hover:bg-slate-400 rounded-full px-2 ${
                  isActive && "bg-slate-100"
                }`
              }
              title="chat"
            >
              <IoChatbubbleEllipsesSharp size={30} />
            </NavLink>
            <div className="h-12 flex items-center justify-center cursor-pointer hover:bg-slate-400 rounded-full px-2 mt-2">
              <FaUserPlus size={30} onClick={() => setOpenSearch(true)} />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div>
              <Avatar
                className="rounded-full object-cover cursor-pointer"
                size="50"
                name={user?.name}
                style={{ backgroundColor: "#333" }}
                src={user?.profile_pic}
                onClick={() => {
                  console.log("clicked");
                  setEditUser(true);
                }}
              />
            </div>
            <div className="h-12 flex items-center justify-center cursor-pointer hover:bg-slate-400 rounded-full px-2 mt-3">
              <FiLogOut size={30} onClick={handleLogout} />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="h-16 flex  ml-5 ">
            <h2 className="text-xl font-bold text-slate-800 ">Message</h2>
          </div>

          <div className=" h-[calc(100vh-65px)]   overflow-x-hidden overflow-y-auto scrollbar">
            {allUsers.length === 0 && (
              <div className="mt-12">
                <div className="flex justify-center items-center text-slate-500 my-4">
                  <GoArrowUpLeft size={50} />
                </div>
                <p className="text-lg text-center text-slate-400">
                  Explore users to start a conversation
                </p>
              </div>
            )}

            {allUsers.map((conv, index) => (
              <NavLink
                to={`/${conv?.userDetails?._id}`}
                key={conv?._id}
                className="flex items-center gap-2 px-4 py-3 border border-transparent hover:border-primary rounded hover:bg-slate-100 ml-2 mr-2 cursor-pointer"
              >
                <div>
                  <Avatar
                    className="rounded-full object-cover cursor-pointer"
                    size="40"
                    name={conv?.userDetails?.name}
                    style={{ backgroundColor: "#333" }}
                    src={conv?.userDetails?.profile_pic}
                  />
                </div>
                <div>
                  <h3 className="text-ellipsis text-lg line-clamp-1 font-semibold">
                    {conv?.userDetails?.name}
                  </h3>
                  <div className="text-slate-500 text-sm flex items-center gap-2 ">
                    <div>
                      {conv?.lastMsg?.imageUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaImage />
                          </span>
                          {!conv?.lastMsg?.text && <span>Image</span>}
                        </div>
                      )}
                      {conv?.lastMsg?.videoUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaVideo />
                          </span>
                          {!conv?.lastMsg?.text && <span>Video</span>}
                        </div>
                      )}
                    </div>
                    <p className=" text-slate-500">{conv?.lastMsg?.text}</p>
                  </div>
                </div>

                { Boolean(conv?.unseenMsg) && (
                  <p className="text-sm ml-auto bg-primary text-white font-semibold w-5 h-5 rounded-full flex justify-center ">
                    {conv?.unseenMsg}
                  </p>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {editUser && <EditUserDetails />}

        {openSearch && (
          <>
            <SearchUser />
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
