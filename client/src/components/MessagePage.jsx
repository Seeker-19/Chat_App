import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import homeContext from "../state/homeContext";
import socketContext from "../state/socketContext.js";
import Avatar from "react-avatar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import { uploadFile } from "../helpers/UploadFile.js";
import { IoClose } from "react-icons/io5";
import { useRef } from "react";
import Loading from "./Loading.jsx";
import wallpaper from "../assets/wallapaper.jpeg";
import { IoSendSharp } from "react-icons/io5";
import moment from "moment";

const MessagePage = () => {
  const { userId } = useParams();

  const { socket } = useContext(socketContext);

  //console.log(userId);
  const { user } = useContext(homeContext);

  const [dataUser, setDataUser] = useState({});
  const [load, setLoad] = useState(false);
  const currentMessage = useRef();

  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.emit("we are on message page", userId);

      socket.on("message send", (data) => {
        console.log("user details send", data);
        setDataUser(data);
      });

      socket.on("message", (data) => {
        console.log("real message", data);
        setAllMessages(data);
      });

      socket.emit("seen", userId);
    }
  }, [socket, userId]);

  const [openImageUpload, setOpenImageUpload] = useState(false);

  const [allMessages, setAllMessages] = useState([]);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setLoad(true);

    console.log(file);
    const uploadImage = await uploadFile(file);
    console.log(uploadImage);

    setLoad(false);
    setOpenImageUpload(false);

    setMessage((prev) => {
      return {
        ...prev,
        imageUrl: uploadImage?.url,
      };
    });
  };

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];

    setLoad(true);
    console.log(file);

    const uploadVideo = await uploadFile(file);
    console.log(uploadVideo);

    setLoad(false);
    setOpenImageUpload(false);

    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: uploadVideo?.url,
      };
    });
  };

  const handleClearUpload = () => {
    setMessage((prev) => {
      return {
        ...prev,
        imageUrl: "",
      };
    });

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };
  const handleClearUploadVideo = () => {
    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: "",
      };
    });

    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;

    setMessage((prev) => {
      return {
        ...prev,
        text: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submituserid", user?._id);

    if (message?.text || message?.videoUrl || message?.imageUrl) {
      if (socket) {
        socket.emit("new message", {
          sender: user?._id,
          receiver: userId,
          message: message,
          msgByUserId: user?._id,
        });

        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: "",
        });
      }
    }
  };

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [allMessages]);

  //console.log("userIds", userId, allMessages);

  return (
    <div
      style={{ backgroundImage: `url(${wallpaper})` }}
      className="bg-no-repeat bg-cover"
    >
      <header className="h-16 sticky bg-white flex items-center justify-between py-2 px-3">
        <div className="flex items-center gap-2">
          <Link to={"/"} className="lg:hidden">
            <FaAngleLeft size={25} />
          </Link>
          <div>
            <Avatar
              className="rounded-full object-cover cursor-pointer"
              size="50"
              name={dataUser?.userDetails?.name}
              style={{ backgroundColor: "#333" }}
              src={dataUser?.userDetails?.profile_pic}
            />
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              {dataUser?.userDetails?.name}
            </h3>
            <p className="-my-1">
              {dataUser?.online ? (
                <span className="text-red-600"> online </span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>
        <section>
          {" "}
          <BsThreeDotsVertical />
        </section>
      </header>

      <section className="h-[calc(100vh-130px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-300 bg-opacity-30">
        <div className="flex flex-col gap-2 py-2 px-2" ref={currentMessage}>
          {allMessages?.map((msg, index) => (
            <div
              key={index}
              className={`bg-white p-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-wd-md ${
                user._id === msg?.msgByUserId ? "ml-auto bg-blue-100" : ""
              }`}
            >
              <div className="w-full">
                {msg?.imageUrl && (
                  <img
                    src={msg?.imageUrl}
                    className="w-full h-full object-scale-down"
                  />
                )}
                {msg?.videoUrl && (
                  <video
                    src={msg?.videoUrl}
                    className="w-full h-full object-scale-down"
                    controls
                  />
                )}
              </div>

              <p className="px-2">{msg?.text}</p>
              <p className="text-xs w-fit ml-auto">
                {moment(msg?.createdAt).format("hh:mm")}
              </p>
            </div>
          ))}
        </div>

        {message?.imageUrl && (
          <div className="h-full w-full sticky bottom-0 flex items-center justify-center bg-slate-600 bg-opacity-40 rounded overflow-hidden">
            <div
              className="absolute top-0 right-0 w-fit p-2 hover:text-blue-700 cursor-pointer"
              onClick={handleClearUpload}
            >
              <IoClose size={30} />
            </div>

            <div className="bg-white p-3">
              <img
                src={message?.imageUrl}
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
                alt="image"
              />
            </div>
          </div>
        )}

        {message?.videoUrl && (
          <div className="h-full w-full sticky bottom-0 flex items-center justify-center bg-slate-600 bg-opacity-40 rounded overflow-hidden">
            <div
              className="absolute top-0 right-0 w-fit p-2 hover:text-blue-700 cursor-pointer"
              onClick={handleClearUploadVideo}
            >
              <IoClose size={30} />
            </div>

            <div className="bg-white p-3">
              <video
                src={message?.videoUrl}
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
                controls
                autoPlay
                muted
              />
            </div>
          </div>
        )}

        {load && (
          <div className="w-full sticky bottom-0 h-full flex items-center justify-center">
            <Loading />
          </div>
        )}
      </section>

      <section className="h-16 bg-white flex items-center px-4 gap-3">
        <div className="relative">
          <button
            onClick={() => setOpenImageUpload((prev) => !prev)}
            className="flex justify-center items-center rounded-full h-11 w-11 hover:bg-primary hover:text-white cursor-pointer"
          >
            <FaPlus size={20} />
          </button>

          {openImageUpload && (
            <div className="bg-white shadow rounded absolute bottom-14 w-36 p-4 ml-3">
              <form>
                <div>
                  <label
                    htmlFor="uploadImage"
                    className="flex gap-2 items-center p-2 px-3 hover:bg-slate-200 cursor-pointer"
                  >
                    <div className="text-primary">
                      {" "}
                      <FaImage size={20} />
                    </div>
                    <p>Image</p>
                  </label>
                  <input
                    type="file"
                    id="uploadImage"
                    name="uploadImage"
                    ref={imageInputRef}
                    onChange={handleUploadImage}
                    className="hidden"
                    accept="image/*"
                  />
                </div>

                <div>
                  <label
                    htmlFor="uploadVideo"
                    className="flex gap-2 items-center p-2 px-3 hover:bg-slate-200 cursor-pointer"
                  >
                    <div className="text-purple-600">
                      {" "}
                      <FaVideo size={20} />
                    </div>
                    <p>Video</p>
                  </label>

                  <input
                    type="file"
                    id="uploadVideo"
                    name="uploadVideo"
                    onChange={handleUploadVideo}
                    accept="video/*"
                    className="hidden"
                    ref={videoInputRef}
                  />
                </div>
              </form>
            </div>
          )}
        </div>

        <form className="h-full w-full flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            name="messagetext"
            placeholder="Type your messgae..."
            className="px-4 py-1 w-full h-full outline-none"
            value={message?.text}
            onChange={handleTextChange}
          />
          <button type="submit" className="text-primary hover:text-secondary">
            <IoSendSharp size={25} />
          </button>
        </form>
      </section>
    </div>
  );
};

export default MessagePage;
