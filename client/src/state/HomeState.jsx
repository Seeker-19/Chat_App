import { useDispatch, useSelector } from "react-redux";
import homeContext from "./homeContext.js";

import { Children, useState } from "react";

const HomeState = ({ children }) => {
  const user = useSelector((state) => state.userRed?.user);

  const onlineUsers = useSelector((state) => state?.userRed?.onlineUser);

  const dispatch = useDispatch();
  const [editUser, setEditUser] = useState(false);

  const [allUsers, setAllUsers] = useState([]);

  const [searchUser, setSearchUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <homeContext.Provider
      value={{
        user,
        editUser,
        setEditUser,
        allUsers,
        setAllUsers,
        searchUser,
        setSearchUser,
        isLoading,
        setIsLoading,
        openSearch,
        setOpenSearch,
        onlineUsers,
      }}
    >
      {children}
    </homeContext.Provider>
  );
};

export default HomeState;
