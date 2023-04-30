import React from "react";
// css
import "./style.css";
import { Button } from "@mui/material";
const BlockedUser = () => {
  return (
    <>
      <div className="blockUser_box">
        <h3 className="blockUser_heading">Blocked Users</h3>
        <div className="blockUser_box_container">
          <div className="blockUser_box_profile_part">
            <div className="blockUser_box_profile">
              <picture>
                <img src="./images/avatar.png" alt="av" />
              </picture>
            </div>
            <div className="blockUser_box_profile_name">
              <h4>blockeduser</h4>
            </div>
          </div>
          <div className="btn_part">
            <Button type="submit" className="group-btn" variant="contained">
              Unblock
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlockedUser;
