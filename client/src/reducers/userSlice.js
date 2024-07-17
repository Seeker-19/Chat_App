import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userRed",
  initialState: {
    user: null,
    onlineUser: [],
    token: null,
    refresh: false,
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },

    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },

    setRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { setUserDetails, setOnlineUser, setRefresh } = userSlice.actions;

export default userSlice.reducer;
