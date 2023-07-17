import React from "react";
import { Button } from "@mui/material";
import profile from "../assets/profile.png";

const Friends = () => {
  return (
    <div className="box">
      <div className="title">
        <h3> Friends</h3>
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
          <Button variant="contained">Block</Button>
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
          <Button variant="contained">Block</Button>
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
          <Button variant="contained">Block</Button>
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
          <Button variant="contained">Block</Button>
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
          <Button variant="contained">Block</Button>
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
          <Button variant="contained">Block</Button>
        </div>
      </div>
    </div>
  );
};

export default Friends;
