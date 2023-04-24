// importing useState
import React, { useState } from "react";
//icons
import { AiOutlineCloudUpload } from "react-icons/ai";
import { SlLogout } from "react-icons/sl";
// css
import "./style.css";
//components
import SidebarIcon from "./sidebarIcon";
import SidebarModal from "../Modal/Modal";
// firebase
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  // modal
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };
  // navigate
  const navigate = useNavigate();
  // firbase auth
  const auth = getAuth();
  // sign out
  const handleSingOut = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };
  return (
    <>
      <nav className="nav">
        <div className="profile_wrapper">
          <div className="profile" onClick={handleModalOpen}>
            <picture>
              {/* <img
                  src={user.photoURL || "./images/avatar.png"}
                  onError={(e) => {
                    e.target.src = "./images/avatar.png";
                  }}
                  alt=""
                /> */}
              <img src="./images/avatar.png" alt="profile_pic" />
            </picture>
            <div className="profile_overlay">
              <AiOutlineCloudUpload />
            </div>
          </div>
          <div className="displayName">
            <p>Siamul Hassan</p>
          </div>
        </div>
        <div className="menu">
          <SidebarIcon />
        </div>
        <div className="logout">
          <SlLogout onClick={handleSingOut} />
        </div>
      </nav>
      <SidebarModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Sidebar;
