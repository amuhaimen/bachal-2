import React, { useEffect, useState } from "react";
import { Button, Alert } from "@mui/material";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

import profile from "../assets/profile.png";

const MyGroups = () => {
  const db = getDatabase();
  let userData = useSelector((state) => state.loggedUser.loginUser);
  let [grouplist, setGrouplist] = useState([]);

  useEffect(() => {
    const mygroupRef = ref(db, "groups/");
    onValue(mygroupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userData.uid === item.val().adminid) {
          arr.push(item.val());
        }
      });
      setGrouplist(arr);
    });
  }, []);
  return (
    <div className="box">
      <div className="title">
        <h3> My Groups</h3>
      </div>
      {grouplist.length > 0 ? (
        grouplist.map((item) => (
          <div className="list">
            <div className="img">
              <img src={profile} />
            </div>
            <div className="details">
              <h4>{item.groupname}</h4>
              <p>{item.grouptagline}</p>
            </div>
            <div className="button">
              <Button variant="contained">Info</Button>
            </div>
          </div>
        ))
      ) : (
        <Alert variant="outlined" severity="info">
          No Groups
        </Alert>
      )}
    </div>
  );
};

export default MyGroups;
