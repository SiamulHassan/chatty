import React from "react";
// importing icons
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
const SidebarIcon = () => {
  return (
    <>
      <div className="icons">
        <div className="sidebar_icons">
          <AiOutlineHome />
        </div>

        <div className="sidebar_icons">
          <AiOutlineMessage />
        </div>

        <div className="sidebar_icons">
          <IoMdNotificationsOutline />
        </div>

        <div className="sidebar_icons">
          <AiOutlineSetting />
        </div>
      </div>
    </>
  );
};

export default SidebarIcon;
