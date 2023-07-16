import React, { useState } from "react";
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

let initialValues = {
  email: "",
  password: "",
  loading: false,
  error: "",
  eye: false,
};

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let navigate = useNavigate();
  let [values, setValues] = useState(initialValues);
  const notify = () => toast("Successfully sign in");

  let handleValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  let handleSubmit = () => {
    let { email, password } = values;

    if (!email) {
      setValues({
        ...values,
        error: "Enter an email",
      });
      return;
    }
    if (!password) {
      setValues({
        ...values,
        error: "Enter password",
      });
      return;
    }

    setValues({
      ...values,
      loading: true,
    });

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setValues({
          ...values,
          email: "",
          password: "",
          loading: false,
        });
        notify();
        navigate("/bachal2");
        // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  let handleGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="regcontainer">
          <Headingreglog
            className="headerreglog"
            title="Login to your account!"
          />

          <img onClick={handleGoogle} src={google} className="google" />

          <div className="reginput">
            <TextField
              name="email"
              onChange={handleValues}
              value={values.email}
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
            />
          </div>
          {values.error.includes("email") && (
            <Alert
              style={{ marginBottom: "20px", width: "75%" }}
              severity="error"
            >
              {values.error}
            </Alert>
          )}

          <div className="reginput">
            <TextField
              name="password"
              onChange={handleValues}
              value={values.password}
              id="outlined-basic"
              label="Password"
              type={values.eye ? "text" : "password"}
              variant="outlined"
            />
          </div>
          <div
            onClick={() => setValues({ ...values, eye: !values.eye })}
            className="eye"
          >
            {values.eye ? <RiEyeFill /> : <RiEyeCloseFill />}
          </div>
          {values.error.includes("password") && (
            <Alert
              style={{ marginBottom: "20px", width: "75%" }}
              severity="error"
            >
              {values.error}
            </Alert>
          )}

          <Alert style={{ marginBottom: "20px", width: "75%" }} severity="info">
            Don't have an account{" "}
            <strong>
              <Link to="/">Sign Up</Link>
            </strong>{" "}
          </Alert>
          {values.loading ? (
            <LoadingButton loading variant="outlined">
              Submit
            </LoadingButton>
          ) : (
            <Button
              onClick={handleSubmit}
              className="loginbutton"
              variant="contained"
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
