import React from "react";
// importing css
import "./style.css";
// mui
import { Grid } from "@mui/material";
//compontents
import GroupLists from "../../Components/GroupLists";
import FriendRequest from "../../Components/FriendRequest";
import Friends from "../../Components/Friends";
import MyGroup from "../../Components/MyGroup";
import UserList from "../../Components/UserList";
import BlockedUser from "../../Components/BlockedUser";
const Home = () => {
  return (
    <>
      <Grid container className="group_items">
        <Grid item xs={4} className="group_items-modify">
          <GroupLists />
          <FriendRequest />
        </Grid>
        <Grid item xs={4} className="group_items-modify">
          <Friends />
          <MyGroup />
        </Grid>
        <Grid item xs={4} className="group_items-modify">
          <UserList />
          <BlockedUser />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
