import React from "react";
// css
import "./style.css";
import { Button } from "@mui/material";
const Friends = () => {
  return (
    <>
      <div className="friend-block_box">
        <h3 className="friend-block_heading">Friends</h3>
        <div className="friend-block_container">
          <div className="friend-block-profile_part">
            <div className="friend-block-profile">
              <picture>
                <img src="./images/avatar.png" alt="avatar" />
              </picture>
            </div>
            <div className="friend-block-profile_name">
              <h4>name</h4>
            </div>
          </div>
          <div className="btn_part">
            <div>
              <Button type="button" className="group-btn" variant="contained">
                Block
              </Button>
            </div>
            <div>
              <Button
                type="button"
                className="btn--unfriend"
                variant="contained"
              >
                Unfriend
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
