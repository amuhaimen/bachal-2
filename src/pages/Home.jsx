import React from "react";
import { Grid, TextField, Button, Alert } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
    <div>
      <Button onClick={handleLogut} variant="contained">
        Sign Out
      </Button>
    </div>
  );
};

export default Home;
