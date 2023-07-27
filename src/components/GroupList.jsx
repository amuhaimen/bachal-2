import { React, useState } from "react";
import { Button, Box, Typography, Modal, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { getDatabase, ref, set, push } from "firebase/database";
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
      <div className="list">
        <div className="img">
          <img src={profile} />
        </div>
        <div className="details">
          <h4>Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        <div className="button">
          <Button variant="contained">Join</Button>
        </div>
      </div>
      <div className="list">
        <div className="img">
          <img src={profile} />
        </div>
        <div className="details">
          <h4>Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        <div className="button">
          <Button variant="contained">Join</Button>
        </div>
      </div>
      <div className="list">
        <div className="img">
          <img src={profile} />
        </div>
        <div className="details">
          <h4>Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        <div className="button">
          <Button variant="contained">Join</Button>
        </div>
      </div>
      <div className="list">
        <div className="img">
          <img src={profile} />
        </div>
        <div className="details">
          <h4>Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        <div className="button">
          <Button variant="contained">Join</Button>
        </div>
      </div>
      <div className="list">
        <div className="img">
          <img src={profile} />
        </div>
        <div className="details">
          <h4>Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        <div className="button">
          <Button variant="contained">Join</Button>
        </div>
      </div>
      <div className="list">
        <div className="img">
          <img src={profile} />
        </div>
        <div className="details">
          <h4>Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        <div className="button">
          <Button variant="contained">Join</Button>
        </div>
      </div>
      <div className="list">
        <div className="img">
          <img src={profile} />
        </div>
        <div className="details">
          <h4>Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        <div className="button">
          <Button variant="contained">Join</Button>
        </div>
      </div>
      <div className="list">
        <div className="img">
          <img src={profile} />
        </div>
        <div className="details">
          <h4>Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        <div className="button">
          <Button variant="contained">Join</Button>
        </div>
      </div>
      <div className="list">
        <div className="img">
          <img src={profile} />
        </div>
        <div className="details">
          <h4>Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        <div className="button">
          <Button variant="contained">Join</Button>
        </div>
      </div>
    </div>
  );
};

export default GroupList;
