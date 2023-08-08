import React, { useEffect, useState } from "react";
import {
  Button,
  Alert,
  Box,
  Typography,
  Modal,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItem,
  List,
} from "@mui/material";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useSelector } from "react-redux";
import profile from "../assets/profile.png";
import { toast } from "react-toastify";

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

const MyGroups = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const db = getDatabase();
  let userData = useSelector((state) => state.loggedUser.loginUser);
  let [grouplist, setGrouplist] = useState([]);
  let [groupReqList, setGroupReqList] = useState([]);

  const handleOpen = (group) => {
    const groupRef = ref(db, "grouprequest");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(group);
        if (
          userData.uid == item.val().adminid &&
          item.val().groupid == group.groupid
        ) {
          arr.push({ ...item.val(), groupreqid: item.key });
        }
      });
      setGroupReqList(arr);
    });

    setOpen(true);
  };

  useEffect(() => {
    const mygroupRef = ref(db, "groups/");
    onValue(mygroupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), groupid: item.key });
      });
      setGrouplist(arr);
    });
  }, []);

  let handleRemove = (item) => {
    remove(ref(db, "grouprequest/" + item.groupreqid)).then(() => {
      toast("member request removed");
    });
  };

  return (
    <div className="box">
      <div className="title">
        <h3> My Groups</h3>
      </div>
      {grouplist.length > 0 ? (
        grouplist.map(
          (item) =>
            userData.uid == item.adminid && (
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
                  <Button onClick={() => handleOpen(item)} variant="contained">
                    Request
                  </Button>
                  <Button variant="contained">Member</Button>
                </div>
              </div>
            )
        )
      ) : (
        <Alert variant="outlined" severity="info">
          No Groups
        </Alert>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Group Request List
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {groupReqList.length > 0 ? (
                groupReqList.map((item) => (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.username}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {item.username}
                            </Typography>
                            {" —  wants to join your group"}
                          </React.Fragment>
                        }
                      />
                      <Button variant="contained" color="success">
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleRemove(item)}
                        variant="contained"
                        color="error"
                      >
                        Remove
                      </Button>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                ))
              ) : (
                <Alert variant="outlined" severity="info">
                  No Members!
                </Alert>
              )}
            </List>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default MyGroups;
