import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import profile from "../assets/profile.png";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UserList = () => {
  let [userList, setUserList] = useState([]);
  let [freq, setFreq] = useState([]);
  let [friends, setFriends] = useState([]);
  const auth = getAuth();
  const db = getDatabase();

  let loginUser = useSelector((state) => state.loggedUser.loginUser);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      // const data = snapshot.val();
      snapshot.forEach((item) => {
        if (loginUser.uid != item.key) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(arr);
    });
    console.log(userList);
  }, []);

  useEffect(() => {
    const userRef = ref(db, "friendrequest/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().whoreceiveid + item.val().whosendid);
        // console.log(item.val().receiverid + item.val().senderid);
      });
      setFreq(arr);
    });
  }, []);

  useEffect(() => {
    const userRef = ref(db, "friends/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().whoreceiveid + item.val().whosendid);
        // console.log(item.val().receiverid + item.val().senderid);
      });
      setFriends(arr);
    });
  }, []);

  let handleFriendRequest = (item) => {
    // console.log("k pathaiche", auth.currentUser.uid);
    // console.log("kake pathaiche", item.id);
    set(ref(db, "friendrequest/" + item.id), {
      whosendid: auth.currentUser.uid,
      whosendname: auth.currentUser.displayName,
      whosendemail: auth.currentUser.email,
      whoreceiveid: item.id,
      whoreceivename: item.username,
      whoreceiveemail: item.email,
    }).then(() => {
      toast("friend request sent");
    });
  };

  let handleCancel = (item) => {
    console.log("hello");
    remove(ref(db, "friendrequest/" + item.id));
  };

  // let handleFriendRequest = (item) => {
  //   set(push(ref(db, "friendrequest/")), {
  //     sendername: loginUser.displayName,
  //     senderid: loginUser.uid,
  //     senderemail: loginUser.email,
  //     receivername: item.username,
  //     receiverid: item.id,
  //     receiveremail: item.email,
  //   });
  //   console.log(item);
  // };

  return (
    <div className="box">
      <div className="title">
        <h3>User List</h3>
      </div>
      {userList.map((item, index) => (
        <div key={index} className="list">
          <div className="img">
            <img src={profile} />
          </div>
          <div className="details">
            <h4>{item.username}</h4>
            <p>{item.email}</p>
          </div>
          <div className="button">
            {freq.includes(item.id + auth.currentUser.uid) ? (
              <Button onClick={() => handleCancel(item)} variant="contained">
                Cancel
              </Button>
            ) : freq.includes(auth.currentUser.uid + item.id) ? (
              <Button variant="contained">Pending</Button>
            ) : friends.includes(auth.currentUser.uid + item.id) ||
              friends.includes(item.id + auth.currentUser.uid) ? (
              <Button variant="contained" color="success">
                Friends
              </Button>
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
