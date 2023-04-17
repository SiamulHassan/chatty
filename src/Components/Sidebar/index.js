// importing useState
import React, { useState } from "react";
//icons
import { AiOutlineCloudUpload } from "react-icons/ai";
import { SlLogout } from "react-icons/sl";
// css
import "./style.css";
import SidebarIcon from "./sidebarIcon";
import SidebarModal from "../Modal/Modal";
const Sidebar = () => {
  // modal
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(true);
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
          <SlLogout />
        </div>
      </nav>
      <SidebarModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Sidebar;
