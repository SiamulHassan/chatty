import React from "react";
// css
import "./style.css";
import { Button } from "@mui/material";
const MyGroup = () => {
  return (
    <>
      <div className="MyGroup_box">
        <h3 className="MyGroup_heading">My Group </h3>

        <div className="MyGroup_container">
          <div className="MyGroup_profile-part">
            <div className="MyGroup-profile">
              <picture>
                <img src="./images/avatar.png" alt="av" />
              </picture>
            </div>
            <div className="MyGroup-profile_name">
              <h4>Group Name</h4>
              <p className="admin_name">Admin:</p>
              <small>Group tag name</small>
            </div>
          </div>
          <Button
            type="button"
            className="group-btn group-btn
                group-btn--myGroup"
            variant="contained"
            sx={{ mr: 2 }}
            size="small"
          >
            Info
          </Button>
          <Button
            type="button"
            className="group-btn group-btn
                group-btn--myGroup"
            variant="contained"
            size="small"
          >
            Request
          </Button>
        </div>
        <div className="div"></div>
      </div>
    </>
  );
};

export default MyGroup;
