import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "../Slice/loginSlice";
const store = configureStore({
  reducer: loginReducer,
});

export default store;
