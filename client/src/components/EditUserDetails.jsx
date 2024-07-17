import React, { useContext, useState } from "react";
import homeContext from "../state/homeContext.js";
import Avatar from "react-avatar";
import { uploadFile } from "../helpers/UploadFile.js";
import axios from "axios";
import { updateUser } from "../apis/index.js";
import toast from "react-hot-toast";
import { setUserDetails } from "../reducers/userSlice.js";
import { useDispatch } from "react-redux";
const EditUserDetails = () => {
  const { user, setEditUser } = useContext(homeContext);

  const [updateUserData, setUpdateUserData] = useState({
    name: user?.name,
    profile_pic: user?.profile_pic,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setUpdateUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    const uploadPhotoUser = await uploadFile(file);
    console.log(uploadPhotoUser);
    setUpdateUserData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhotoUser?.url,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    updateUser(updateUserData)
      .then((obj) => {
        console.log(obj);
        toast.success(obj.message);

        if (obj.success) {
          dispatch(setUserDetails(obj.user));
          setEditUser(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10">
        <div className="bg-white p-4 rounded w-full max-w-sm">
          <h2 className="font-semibold">Profile Details:</h2>
          <p className="text-sm">Edit User Details</p>
          <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={updateUserData?.name}
                onChange={handleChange}
                className="w-full py-1 focus:outline-primary border-0.5 "
              />
            </div>
            <div>
              <div>Photo:</div>
              <div className="my-2 flex items-center gap-4">
                <Avatar
                  className="rounded-full object-cover cursor-pointer "
                  size="50"
                  name={user?.name}
                  src={updateUserData?.profile_pic}
                />
                <div className="font-semibold">
                  <label htmlFor="profile_pic" className="cursor-pointer">
                    {" "}
                    Change Photo:
                  </label>
                  <input
                    type="file"
                    className="hidden"
                    name="profile_pic"
                    id="profile_pic"
                    onChange={handleUpload}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 ml-auto mt-2">
              <button
                className="border border-primary py-2 px-4 text-white bg-primary rounded hover:bg-secondary"
                type="submit"
              >
                Save
              </button>
              <button
                onClick={() => setEditUser(false)}
                className="border border-primary py-2 px-4 rounded hover:bg-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUserDetails;
