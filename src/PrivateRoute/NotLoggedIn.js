// redux useSelector
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export const NotLoggedIn = () => {
  const currentUser = useSelector((users) => users.logIn.login);
  return currentUser ? <Navigate to="/" /> : <Outlet />;
};
