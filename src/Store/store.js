import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Slice/loginSlice";
const store = configureStore({
  reducer: {
    logIn: loginReducer,
  },
});

export default store;
