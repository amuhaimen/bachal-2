import React from "react";
import { Grid, TextField, Button, Alert } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GroupList from "../components/GroupList";
import FriendRq from "../components/FriendRq";
import Friends from "../components/Friends";
import MyGroups from "../components/MyGroups";
import UserList from "../components/UserList";
import BlockUsers from "../components/BlockUsers";

const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let handleLogut = () => {
    // console.log("hello");
    signOut(auth)
      .then(() => {
        console.log("signout done");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
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
    // <div>
    //   <Button onClick={handleLogut} variant="contained">
    //     Sign Out
    //   </Button>
    // </div>
  );
};

export default Home;
