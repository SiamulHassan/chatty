import React from "react";
// css
import "./style.css";
import Search from "../Search";
import { Button } from "@mui/material";
const UserList = () => {
  // handle cancle
  const handleCancel = () => {};
  // handle request
  const handleRequest = () => {};
  return (
    <>
      <div className="userlist_box">
        <h3 className="userlist_heading">User List</h3>
        <Search />
        <div className="UserList_container">
          <div className="UserList-profile_part">
            <div className="UserList-profile">
              <picture>
                <img src="./images/avatar.png" alt="avatar" />
              </picture>
            </div>
            <div className="UserList-profile_name">
              <h4>userName</h4>
            </div>
          </div>
          <div className="btn_part">
            {/* <Button
              type="submit"
              className="group-btn"
              variant="contained"
              onClick={handleCancel}
            >
              Cancel Request
            </Button> */}

            <Button
              type="submit"
              className="group-btn"
              variant="contained"
              onClick={() => handleRequest}
            >
              Sent Request
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
