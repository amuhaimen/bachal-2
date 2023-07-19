import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loginUser: null,
  },
  reducers: {
    userdata: (state, action) => {
      state.loginUser = action.payload;
    },
  },
});

export const { userdata } = userSlice.actions;

export default userSlice.reducer;
