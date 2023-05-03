import React from "react";
// css
import "./style.css";
import { Button } from "@mui/material";
const GroupLists = () => {
  return (
    <>
      <div className="group_box">
        <h3 className="group_heading">Group Lists</h3>
        <div className="list_container">
          <div className="grouplist-profile_part">
            <div className="grouplist-profile">
              <picture>
                <img src="./images/avatar.png" alt="av" />
              </picture>
            </div>
            <div className="profile_name">
              <h4>Group Name</h4>
              <p className="admin_name">Admin:</p>
              <small>group tag name</small>
            </div>
          </div>
          <div className="btn_part">
            <Button type="button" className="group-btn" variant="contained">
              Join
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupLists;
