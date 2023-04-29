import React from "react";
//import css
import "./style.css";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const RootLayout = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Sidebar />
        </Grid>
        <Grid item xs={11}>
          {/* out let means ei component(RootLayout) er outlet */}
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default RootLayout;
