import React, { useEffect } from "react";
import { Grid, TextField, Button, Alert } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GroupList from "../components/GroupList";
import FriendRq from "../components/FriendRq";
import Friends from "../components/Friends";
import MyGroups from "../components/MyGroups";
import UserList from "../components/UserList";
import BlockUsers from "../components/BlockUsers";
import { useSelector } from "react-redux";

const Home = () => {
  let loginUser = useSelector((state) => state.loggedUser.loginUser);

  useEffect(() => {
    if (loginUser == null) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <GroupList />
          <FriendRq />
        </Grid>
        <Grid item xs={4}>
          <Friends />
          <MyGroups />
        </Grid>
        <Grid item xs={4}>
          <UserList />
          <BlockUsers />
        </Grid>
      </Grid>

      {/* <Button onClick={handleLogut} variant="contained">
        Sign Out
      </Button> */}
    </>
  );
};

export default Home;
