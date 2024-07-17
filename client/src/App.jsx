import React, { useContext, useEffect } from "react";
import Index from "./routes/index.jsx";
import HomeState from "./state/HomeState.jsx";
import { validateJWTToken } from "./apis/index.js";
import { useDispatch } from "react-redux";
import { setRefresh, setUserDetails } from "./reducers/userSlice.js";
import { useNavigate } from "react-router-dom";
import { Socket } from "./state/Socket.jsx";
import homeContext from "./state/homeContext.js";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const userVerifyData = await validateJWTToken();

        console.log("user verify", userVerifyData);
        dispatch(setUserDetails(userVerifyData?.user));
        dispatch(setRefresh());
      } catch (error) {
        console.log(error);
      }
    };

    verifyToken();
  }, []);
  return (
    <>
      <Socket>
        <HomeState>
          <Index />
        </HomeState>
      </Socket>
    </>
  );
};

export default App;
