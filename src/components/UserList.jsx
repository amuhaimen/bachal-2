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
  const auth = getAuth();
  const db = getDatabase();

  let loginUser = useSelector((state) => state.loggedUser.loginUser);

  let [userList, setUserList] = useState([]);
  let [freq, setFreq] = useState([]);
  let [friends, setFriends] = useState([]);
  let [blocklist, setBlocklist] = useState([]);

  useEffect(() => {
    const blockRef = ref(db, "block/");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().blockid + item.val().blockbyid);
        // console.log(item.val().receiverid + item.val().senderid);
      });
      setBlocklist(arr);
    });
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

  let handleFriendRequest = (item) => {
    // console.log("k pathaiche", auth.currentUser.uid);
    // console.log("kake pathaiche", item.id);
    set(ref(db, "friendrequest/" + item.id), {
      whosendid: auth.currentUser.uid,
      whosendname: auth.currentUser.displayName,
      whoreceiveid: item.id,
      whoreceivename: item.username,
    }).then(() => {
      console.log(item);
      toast("friend request sent");
    });
  };

  let handleCancel = (item) => {
    remove(ref(db, "friendrequest/" + item.id));
  };

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
            {blocklist.includes(item.id + loginUser.uid) ||
            blocklist.includes(loginUser.uid + item.id) ? (
              <Button variant="contained" disabled>
                Blocked
              </Button>
            ) : freq.includes(item.id + auth.currentUser.uid) ? (
              <Button onClick={() => handleCancel(item)} variant="contained">
                Cancel
              </Button>
            ) : freq.includes(auth.currentUser.uid + item.id) ? (
              <Button variant="contained" disabled>
                Pending
              </Button>
            ) : friends.includes(auth.currentUser.uid + item.id) ||
              friends.includes(item.id + auth.currentUser.uid) ? (
              <Button variant="contained" color="success" disabled>
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

// import React, { useEffect, useState } from "react";
// import profile from "../assets/profile.png";
// import { Button } from "@mui/material";
// import {
//   getDatabase,
//   ref,
//   onValue,
//   set,
//   push,
//   remove,
// } from "firebase/database";
// import { getAuth } from "firebase/auth";
// import { useSelector } from "react-redux";

// const UserList = () => {
//   const db = getDatabase();
//   const auth = getAuth();
//   let [userList, setUserList] = useState([]);
//   let [friendRequest, setFriendRequest] = useState([]);
//   let userData = useSelector((state) => state.loggedUser.loginUser);
//   let [friends, setFriends] = useState([]);
//   let [block, setBlock] = useState([]);

//   useEffect(() => {
//     const usersRef = ref(db, "friendrequest/");
//     onValue(usersRef, (snapshot) => {
//       let arr = [];
//       snapshot.forEach((item) => {
//         arr.push(item.val().whoreceiveid + item.val().whosendid);
//       });
//       setFriendRequest(arr);
//     });
//   }, []);

//   useEffect(() => {
//     const usersRef = ref(db, "friends/");
//     onValue(usersRef, (snapshot) => {
//       let arr = [];
//       snapshot.forEach((item) => {
//         arr.push(item.val().whoreceiveid + item.val().whosendid);
//       });
//       setFriends(arr);
//     });
//   }, []);

//   useEffect(() => {
//     const usersRef = ref(db, "block/");
//     onValue(usersRef, (snapshot) => {
//       let arr = [];
//       snapshot.forEach((item) => {
//         arr.push(item.val().blockedid + item.val().blockbyid);
//       });
//       setBlock(arr);
//     });
//   }, []);

//   useEffect(() => {
//     const usersRef = ref(db, "users/");
//     onValue(usersRef, (snapshot) => {
//       let arr = [];
//       // const data = snapshot.val();
//       snapshot.forEach((item) => {
//         if (userData.uid != item.key) {
//           arr.push({ ...item.val(), id: item.key });
//         }
//       });
//       setUserList(arr);
//     });
//   }, []);

//   let handleFriendRequest = (item) => {
// console.log("who send", auth.currentUser.uid);
// console.log("who send", item.id);
//   set(ref(db, "friendrequest/" + item.id), {
//     whosendid: auth.currentUser.uid,
//     whosendname: auth.currentUser.displayName,
//     whoreceiveid: item.id,
//     whoreceivename: item.username,
//   });
// };

// let handleCancel = (item) => {
//   console.log(item.id);
//   remove(ref(db, "friendrequest/" + item.id));
// };

// return (
//   <div className="groupBox">
//     <h3>User List</h3>

//     {userList.map((item) => (
//       <div className="list" key={item.id}>
//         <div className="img">
//           <img src={profile} className="pic" />
//         </div>
//         <div className="details">
//           <h4>{item.username}</h4>
//           <p>{item.email}</p>
//         </div>
//         <div className="button">
//           {friendRequest.includes(item.id + auth.currentUser.uid) ? (
//             <Button onClick={() => handleCancel(item)} variant="contained">
//               cancel
//             </Button>
//           ) : friendRequest.includes(auth.currentUser.uid + item.id) ? (
//             <Button
//               // onClick={() => handleFriendRequest(item)}
//               variant="contained"
//             >
//               Pending
//             </Button>
//           ) : friends.includes(auth.currentUser.uid + item.id) ||
//             friends.includes(item.id + auth.currentUser.uid) ? (
//             <Button
// onClick={() => handleFriendRequest(item)}
//                 variant="contained"
//                 color="success"
//               >
//                 Friends
//               </Button>
//             ) : block.includes(auth.currentUser.uid + item.id) ||
//               block.includes(item.id + auth.currentUser.uid) ? (
//               <Button
//                 // onClick={() => handleFriendRequest(item)}
//                 variant="contained"
//                 color="error"
//               >
//                 block
//               </Button>
//             ) : (
//               <Button
//                 onClick={() => handleFriendRequest(item)}
//                 variant="contained"
//               >
//                 +
//               </Button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserList;
