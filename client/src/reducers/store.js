import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    userRed: userReducer,
  },
});

export default store;
