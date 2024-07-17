import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { uploadFile } from "../helpers/UploadFile.js";
import toast from "react-hot-toast";
import axios from "axios";
import { LuUserCircle2 } from "react-icons/lu";
import { login } from "../apis/index.js";
import { useDispatch } from "react-redux";
import { setUserDetails, setRefresh } from "../reducers/userSlice.js";
import homeContext from "../state/homeContext.js";
const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useContext(homeContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(userData);

    login(userData)
      .then((data) => {
        console.log(data);

        toast.success(data.message);
        // dispatch(setUserDetails(data?.user));
        dispatch(setRefresh());
        if (data.success) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.message || "network error");
      });
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user]);

  return (
    <div className="mt-5">
      <div className="bg-white w-full rounded max-w-md p-4 mx-auto">
        <div className="mx-auto w-fit mb-2">
          <LuUserCircle2 size={80} />
        </div>
        <h3>Welcome to Chat App</h3>

        <form className="grid gap-4 mt-2" onSubmit={handleSubmit}>
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
              type="password"
              id="password"
              name="password"
              placeholder="Enter your Password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="bg-primary text-white font-bold leading-relaxed text-lg px-4 py-1 hover:bg-secondary"
            // disabled={!userData.profile_pic}
          >
            Login
          </button>
        </form>

        <p className="my-3 text-center font-bold">
          <Link className="hover:text-primary font-semibold" to={"/register"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
