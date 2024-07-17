import React, { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Loading from "./Loading";
import homeContext from "../state/homeContext.js";
import { searchUserFunc } from "../apis";
import toast from "react-hot-toast";
import UserSearchCard from "./userSearchCard.jsx";
import { IoClose } from "react-icons/io5";
const SearchUser = () => {
  const {
    searchUser,
    setSearchUser,
    isLoading,
    setIsLoading,
    setOpenSearch,
  } = useContext(homeContext);

  const [search, setSearch] = useState("");

  const handleSearchUser = (search) => {
    setIsLoading(true);
    searchUserFunc(search)
      .then((obj) => {
        setSearchUser(obj?.users);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    handleSearchUser(search);
    console.log(searchUser);
  }, [search]);

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-slate-700 bg-opacity-40 p-3 z-10">
      <div className="mx-auto w-full max-w-lg mt-10">
        <div className="bg-white h-14 rounded overflow-hidden flex">
          <input
            type="text"
            placeholder="Search user by name, email..."
            className="w-full outline-none py-1 h-full px-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="h-14 w-14 flex justify-center items-center">
            <IoSearch size={20} />
          </div>
        </div>

        <div className="bg-white w-full rounded mt-2 p-4">
          {searchUser.length === 0 && !isLoading && (
            <>
              <p className="text-center text-slate-500">No user Found</p>
            </>
          )}
          {isLoading && (
            <>
              <Loading />
            </>
          )}
          {searchUser.length !== 0 && !isLoading && <UserSearchCard />}
        </div>
      </div>
      <div
        className="fixed top-0 right-0 hover:text-white cursor-pointer"
        onClick={()=>setOpenSearch(false)}
      >
        <IoClose size={40} />
      </div>
    </div>
  );
};

export default SearchUser;
