import React from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import profile from "../assets/profile.png";
import { RxHome } from "react-icons/rx";
import { AiOutlineMessage } from "react-icons/ai";
import { RiNotification2Fill } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { VscSignOut } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const location = useLocation();
  console.log(location.pathname);

  let userData = useSelector((state) => state.loggedUser.loginUser);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className="navbar">
            <div className="navcontainer">
              <img src={profile} />
              <h4 className="username">{userData.displayName}</h4>
              <ul>
                <li>
                  <Link
                    to="/bachal2"
                    className={
                      location.pathname == "/bachal2" ? "active" : "icon"
                    }
                  >
                    <RxHome />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bachal2/message"
                    className={
                      location.pathname == "/bachal2/message"
                        ? "active"
                        : "icon"
                    }
                  >
                    <AiOutlineMessage />
                  </Link>
                </li>
                <li>
                  <RiNotification2Fill className="icon" />
                </li>
                <li>
                  <FiSettings className="icon" />
                </li>
                <li>
                  <VscSignOut className="icon" />
                </li>
              </ul>
            </div>
          </div>
        </Grid>
        <Grid item xs={11}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default RootLayout;
