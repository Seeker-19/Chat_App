import React, { useContext } from "react";
import homeContext from "../state/homeContext";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const UserSearchCard = () => {
  const { searchUser,onlineUsers } = useContext(homeContext);
  const { openSearch, setOpenSearch } = useContext(homeContext);

  const isUserOnline=(userId)=>onlineUsers.includes(userId);


  return (
    <>
      {searchUser.map((user, index) => (
        <div key={index}>
          <Link
            to={`/${user?._id}`}
            onClick={() => setOpenSearch(false)}
            className="flex gap-3 items-center p-4 border border-b-slate-300 border-transparent hover:border-primary rounded cursor-pointer"
          >
            <div className="relative">
              <Avatar
                className="rounded-full object-cover cursor-pointer"
                size="50"
                name={user?.name}
                style={{ backgroundColor: "#333" }}
                src={user?.profile_pic}
              />
              {isUserOnline(user?._id) && (
                <div className="absolute w-4 h-4 right-0 bottom-0 bg-green-500 rounded-full"></div>
              )}
            </div>
            <div>
              <p className="font-semibold text-ellipsis line-clamp-1 ">
                {user?.name}
              </p>
              <p className="text-sm text-ellipsis line-clamp-1">
                {user?.email}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default UserSearchCard;
