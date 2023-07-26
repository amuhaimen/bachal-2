import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import profile from "../assets/profile.png";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  push,
  set,
} from "firebase/database";
import Alert from "@mui/material/Alert";

const FriendRq = () => {
  const db = getDatabase();

  let loginUser = useSelector((state) => state.loggedUser.loginUser);

  let [freq, setFreq] = useState([]);

  useEffect(() => {
    const freqRef = ref(db, "friendrequest");
    onValue(freqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().whoreceiveid == loginUser.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFreq(arr);
    });
  }, []);

  let handleAccept = (item) => {
    console.log(item);
    set(push(ref(db, "friends/")), {
      ...item,
    }).then(() => {
      remove(ref(db, "friendrequest/" + item.id));
    });
  };

  let handleReject = (id) => {
    remove(ref(db, "friendrequest/" + id));
  };

  return (
    <div className="box">
      <div className="title">
        <h3> Friend Request</h3>
      </div>
      {freq.length > 0 ? (
        freq.map((item) => (
          <div className="list">
            <div className="img">
              <img src={profile} />
            </div>
            <div className="details">
              <h4>{item.whosendname}</h4>
              <p>{item.whosendemail}</p>
            </div>
            <div className="button">
              <Button onClick={() => handleAccept(item)} variant="contained">
                Accept
              </Button>
              <Button
                onClick={() => handleReject(item.id)}
                variant="contained"
                color="error"
              >
                Reject
              </Button>
            </div>
          </div>
        ))
      ) : (
        <Alert variant="outlined" severity="info">
          No Friend Request!
        </Alert>
      )}
    </div>
  );
};

export default FriendRq;
