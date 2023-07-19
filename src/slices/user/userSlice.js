import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loginUser: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
  reducers: {
    userdata: (state, action) => {
      state.loginUser = action.payload;
    },
  },
});

export const { userdata } = userSlice.actions;

export default userSlice.reducer;
