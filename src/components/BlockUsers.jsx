import React, { useState, useEffect } from "react";
import { Button, Alert } from "@mui/material";
import profile from "../assets/profile.png";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";

const BlockUsers = () => {
  let userData = useSelector((state) => state.loggedUser.loginUser);
  const db = getDatabase();
  let [blocklist, setBlocklist] = useState([]);
  useEffect(() => {
    const blockRef = ref(db, "block/");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().blockbyid == userData.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setBlocklist(arr);
    });
  }, []);

  let handleUnblock = (item) => {
    set(push(ref(db, "friends")), {
      whosendid: userData.uid,
      whosendname: userData.displayName,

      whoreceiveid: item.blockid,
      whoreceivename: item.blockname,
    }).then(() => {
      remove(ref(db, "block/" + item.id));
    });
  };

  return (
    <div className="box">
      <div className="title">
        <h3>Block Users</h3>
      </div>
      {blocklist.length > 0 ? (
        blocklist.map((item) => (
          <div className="list">
            <div className="img">
              <img src={profile} />
            </div>
            {item.blockbyid == userData.uid ? (
              <div className="details">
                <h4>{item.blockname}</h4>
                <p>Hi Guys, Wassup!</p>
              </div>
            ) : (
              <div className="details">
                <h4>{item.blockbyname}</h4>
                <p>Hi Guys, Wassup!</p>
              </div>
            )}

            <div className="button">
              <Button onClick={() => handleUnblock(item)} variant="contained">
                Unblock
              </Button>
            </div>
          </div>
        ))
      ) : (
        <Alert variant="outlined" severity="info">
          Block user unavailable!
        </Alert>
      )}
    </div>
  );
};

export default BlockUsers;
