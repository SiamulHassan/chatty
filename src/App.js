// importing pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
// react router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        {/* <Route element={<LoggedInUser />}>
          <Route element={<MenuBar />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Route>
        </Route> */}
        {/* <Route element={<NotLoggedIn />}>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPass />} />
        </Route> */}
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
