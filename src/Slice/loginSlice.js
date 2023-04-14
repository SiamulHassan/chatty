import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: localStorage.getItem("chattyUsers")
    ? JSON.parse(localStorage.getItem("chattyUsers"))
    : null,
};
export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      state.login = action.payload;
    },
  },
});
export const { loginReducer } = loginSlice.actions;
export default loginSlice.reducer;
