import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { uploadFile } from "../helpers/UploadFile.js";
import toast from "react-hot-toast";
import axios from "axios";
import { register } from "../apis/index.js";
const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const navigate = useNavigate();

  const [uploadPhoto, setUploadPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setUploadPhoto(file);
    const uploadPhotoUser = await uploadFile(file);
    console.log(uploadPhotoUser);
    setUserData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhotoUser?.url,
      };
    });
  };

  const handleClearPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
  };

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(userData);

    register(userData)
      .then((data) => {
        console.log(data);
        toast.success(data.message);
        if (data.success) navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.message || "network error");
      });

    // try {

    //   toast.success(data.message);

    //   if(data.success){

    //     navigate("/login");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast.error(error.response?.data?.message || "network error");
    // }
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full rounded max-w-md p-4 mx-auto">
        <h3>Welcome to Chat App</h3>

        <form className="grid gap-4 mt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your Name"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Enter your Password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="profile_pic">
              Photo:
              <div className="flex bg-slate-200 h-14 items-center justify-center border rounded hover:border-primary cursor-pointer ">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadPhoto?.name
                    ? uploadPhoto?.name
                    : "Upload Profile Photo"}
                </p>

                {uploadPhoto?.name && (
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={handleClearPhoto}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              onChange={handleUpload}
            />
          </div>

          <button
            className="bg-primary text-white font-bold leading-relaxed text-lg px-4 py-1 hover:bg-secondary"
            // disabled={!userData.profile_pic}
          >
            Register
          </button>
        </form>

        <p className="my-3 text-center">
          Alrady have an Account ?{" "}
          <Link className="hover:text-primary font-semibold" to={"/login"}>
            LOgin
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
