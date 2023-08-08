import { React, useState, useEffect } from "react";
import { Button, Box, Typography, Modal, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "firebase/database";
import { toast } from "react-toastify";
import profile from "../assets/profile.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

let groupData = {
  groupname: "",
  grouptagline: "",
};

const GroupList = () => {
  const db = getDatabase();
  let userData = useSelector((state) => state.loggedUser.loginUser);
  let [grouplist, setGrouplist] = useState([]);
  let [groupMemberList, setGroupMemberList] = useState([]);
  const [groupInfo, setGroupInfo] = useState(groupData);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handleChange = (e) => {
    setGroupInfo({
      ...groupInfo,
      [e.target.name]: e.target.value,
    });
  };

  let handleSubmit = () => {
    set(push(ref(db, "groups/")), {
      groupname: groupInfo.groupname,
      grouptagline: groupInfo.grouptagline,
      adminid: userData.uid,
      adminname: userData.displayName,
    }).then(() => {
      setOpen(false);
      toast(`${groupInfo.groupname} successfully created`);
    });
  };

  useEffect(() => {
    const mygroupRef = ref(db, "groups/");
    onValue(mygroupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userData.uid !== item.val().adminid) {
          arr.push({ ...item.val(), groupid: item.key });
        }
      });
      setGrouplist(arr);
    });
  }, []);

  useEffect(() => {
    const mygroupRef = ref(db, "grouprequest/");
    onValue(mygroupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().userid === userData.uid) {
          arr.push(item.val().groupid);
        }
      });
      setGroupMemberList(arr);
    });
  }, []);

  let handleGroupJoin = (item) => {
    console.log(item);
    set(push(ref(db, "grouprequest/")), {
      adminid: item.adminid,
      adminname: item.adminname,
      groupid: item.groupid,
      groupname: item.groupname,
      userid: userData.uid,
      username: userData.displayName,
    });
  };

  const handleCancel = (item) => {
    console.log(item);
    //remove deu......&*&*&*&*&*(&**&*&(&**&*&*&*&*&*&*&*&))
  };

  return (
    <div className="box">
      <div className="title">
        <h3>Group List</h3>
        <Button onClick={handleOpen} variant="contained">
          Create Group
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Creat your Group
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                onChange={handleChange}
                name="groupname"
                id="outlined-basic"
                label="Group Name"
                variant="outlined"
                margin="dense"
              />
              <br />
              <TextField
                onChange={handleChange}
                name="grouptagline"
                id="outlined-basic"
                label="Group Tagline"
                variant="outlined"
                margin="dense"
              />
              <br />
              <Button onClick={handleSubmit} variant="contained" margin="dense">
                Confirm
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
      {grouplist.map((item) => (
        <div className="list">
          <div className="img">
            <img src={profile} />
          </div>
          <div className="details">
            <p style={{ fontSize: "10px" }}>{item.adminname}</p>
            <h4>{item.groupname}</h4>
            <p>{item.grouptagline}</p>
          </div>
          <div className="button">
            {groupMemberList.indexOf(item.groupid) != -1 ? (
              <>
                <Button disabled variant="contained">
                  Pending
                </Button>
                <Button onClick={() => handleCancel(item)} variant="contained">
                  cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => handleGroupJoin(item)} variant="contained">
                Join
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
