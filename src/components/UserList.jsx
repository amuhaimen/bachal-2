import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import profile from "../assets/profile.png";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const UserList = () => {
  let [userList, setUserList] = useState([]);
  let [friendRequest, setFriendRequest] = useState([]);
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const friendRqRef = ref(db, "friendrequest/");
    onValue(friendRqRef, (snapshot) => {
      let arr = [];
      // const data = snapshot.val();
      snapshot.forEach((item) => {
        arr.push(item.val().whoreceiveid + item.val().whosendid);
      });
      setFriendRequest(arr);
    });
  }, []);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      // const data = snapshot.val();
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setUserList(arr);
    });
    console.log(userList);
  }, []);

  let handleFriendRequest = (item) => {
    // console.log("k pathaiche", auth.currentUser.uid);
    // console.log("kake pathaiche", item.id);
    set(push(ref(db, "friendrequest/")), {
      whosendid: auth.currentUser.uid,
      whosendname: auth.currentUser.displayName,
      whoreceiveid: item.id,
      whoreceivename: item.username,
    }).then(() => {
      toast("friend request sent");
    });
  };

  return (
    <div className="box">
      <div className="title">
        <h3>User List</h3>
      </div>
      {userList.map((item) => (
        <div className="list">
          <div className="img">
            <img src={profile} />
          </div>
          <div className="details">
            <h4>{item.username}</h4>
            <p>{item.email}</p>
          </div>
          <div className="button">
            {friendRequest.includes(item.id + auth.currentUser.uid) ? (
              <Button variant="contained">panding</Button>
            ) : (
              <Button
                onClick={() => handleFriendRequest(item)}
                variant="contained"
              >
                Add
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
