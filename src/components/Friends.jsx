import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import profile from "../assets/profile.png";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

const Friends = () => {
  const db = getDatabase();
  let [friends, setFriends] = useState([]);
  let userData = useSelector((state) => state.loggedUser.loginUser);

  useEffect(() => {
    const friendsRef = ref(db, "friends/");
    onValue(friendsRef, (snapshot) => {
      let arr = [];

      snapshot.forEach((item) => {
        if (
          item.val().whosendid == userData.uid ||
          userData.uid == item.val().whoreceiveid
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriends(arr);
    });
  }, []);

  let handleUnfriend = (id) => {
    remove(ref(db, "friends/" + id));
  };

  return (
    <div className="box">
      <div className="title">
        <h3> Friends</h3>
      </div>

      {friends.length > 0 ? (
        friends.map((item) => (
          <div className="list">
            <div className="img">
              <img src={profile} />
            </div>
            <div className="details">
              {item.whoreceiveid == userData.uid ? (
                <>
                  <h4>{item.whosendname}</h4>
                  <p>{item.whosendemail}</p>
                </>
              ) : (
                <>
                  <h4>{item.whoreceivename}</h4>
                  <p>{item.whoreceiveemail}</p>
                </>
              )}
            </div>
            <div className="button">
              <Button
                onClick={() => handleUnfriend(item.id)}
                variant="outlined"
                color="secondary"
              >
                Unfriend
              </Button>
              <Button variant="contained" color="error">
                Block
              </Button>
            </div>
          </div>
        ))
      ) : (
        <Alert variant="outlined" severity="info">
          No Friends !
        </Alert>
      )}
    </div>
  );
};

export default Friends;

//H.W:dew---Block and block user show
