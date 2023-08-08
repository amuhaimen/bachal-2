import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Alert } from "@mui/material";
import login from "../assets/loginimg.png";
import google from "../assets/google.png";
import Headingreglog from "../components/Headingreglog";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userdata } from "../slices/user/userSlice";
let initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const auth = getAuth();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let [values, setValues] = useState(initialValues);
  let [error, setError] = useState({
    email: "",
    password: "",
    loader: false,
  });

  let handleValues = (e) => {
    let { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setError({ ...error, [name]: "" });
  };

  let handleClick = () => {
    setValues({ ...values, loader: true });
    let expression =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (values.email == "") {
      setValues({ ...values, loader: false });
      setError({ ...error, email: "Email Required" });
    } else if (!expression.test(values.email)) {
      setValues({ ...values, loader: false });
      setError({ ...error, email: "valid email required" });
    } else if (values.password == "") {
      setValues({ ...values, loader: false });
      setError({ ...error, password: "Password Required" });
    } else {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((user) => {
          if (!user.user.emailVerified) {
            setValues({ ...values, loader: false });
            setError({ ...error, email: "please verify your email" });
            toast("please varify your email first");
          } else {
            dispatch(userdata(user.user));
            localStorage.setItem("user", JSON.stringify(user.user));
            navigate("/bachal2");
            toast("successfully log in");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode.includes("auth/user-not-found")) {
            setValues({ ...values, loader: false });
            setError({ ...error, email: "User not found" });
          }
          if (errorCode.includes("auth/wrong-password")) {
            setValues({ ...values, loader: false });
            setError({ ...error, password: "Wrong Password" });
          }
        });
      //   if (!user.user.emailVerified) {
      //     toast("Please verify your email first");
      //   } else {
      //     dispatch(userdata(user.user));
      //     localStorage.setItem("user", JSON.stringify(user.user));
      //     navigate("/bachal2");
      //     toast("successfully signed in");
      //   }
      //   // console.log(user);
      // })
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="regcontainer">
          <Headingreglog
            className="headerreglog"
            title="Login to your account!"
          />

          <img src={google} className="google" />

          <div className="reginput">
            <TextField
              onChange={handleValues}
              name="email"
              value={values.email}
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
            />
            {error.email && (
              <Alert
                style={{ margin: "20px 0", width: "75%" }}
                severity="error"
              >
                {error.email}
              </Alert>
            )}
          </div>

          <div className="reginput">
            <TextField
              onChange={handleValues}
              name="password"
              value={values.password}
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
            {error.password && (
              <Alert
                style={{ margin: "20px 0", width: "75%" }}
                severity="error"
              >
                {error.password}
              </Alert>
            )}
          </div>
          <div className="eye"></div>

          <Alert style={{ marginBottom: "20px", width: "75%" }} severity="info">
            Don't have an account{" "}
            <strong>
              <Link to="/">Sign Up</Link>
            </strong>{" "}
          </Alert>
          {values.loader ? (
            <LoadingButton loading variant="outlined">
              Submit
            </LoadingButton>
          ) : (
            <Button
              className="loginbutton"
              variant="contained"
              onClick={handleClick}
            >
              Login to Continue
            </Button>
          )}

          <Alert
            style={{ margin: "20px 0", width: "75%" }}
            variant="filled"
            severity="error"
          >
            Forgot password?{" "}
            <strong>
              <Link to="/forgotpassword">Click Here</Link>
            </strong>
          </Alert>
        </div>
      </Grid>
      <Grid item xs={6}>
        <img className="regimg" src={login} />
      </Grid>
    </Grid>
  );
};

export default Login;

//Dew: wrong pass warning,worng user warning(class-49)
