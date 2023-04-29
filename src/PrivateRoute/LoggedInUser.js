// redux useSelector
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

export const LoggedInUser = () => {
  const currentUser = useSelector((users) => users.logIn.login);
  return currentUser ? <Outlet /> : <Login />;
};
