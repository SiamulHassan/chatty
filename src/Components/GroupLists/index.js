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
          <div className="profile_part">
            <div className="profile">
              <picture>
                <img src="./images/avatar.png" alt="av" />
              </picture>
            </div>
          </div>
          <div className="btn_part">
            <Button type="button" className="group-btn" variant="contained">
              {/* akhane cancel o koro + join hole joined*/}
              Join
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupLists;
