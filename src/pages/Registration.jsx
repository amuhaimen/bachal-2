import React, { useState } from "react";
import { Grid, TextField, Button, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import registrationimg from "../assets/registrationimg.png";
import Headingreglog from "../components/Headingreglog";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";

let initialValues = {
  email: "",
  fullName: "",
  password: "",
  loading: false,
  error: "",
  eye: false,
};

const Registration = () => {
  let navigate = useNavigate();
  let [values, setValues] = useState(initialValues);
  const auth = getAuth();

  let handleValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    // console.log(values);
  };

  let handleSubmit = () => {
    let { email, fullName, password } = values;
    if (!email) {
      setValues({
        ...values,
        error: "Enter an email",
      });
      return;
    }
    if (!fullName) {
      setValues({
        ...values,
        error: "Enter your fullName",
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
    createUserWithEmailAndPassword(auth, email, password).then((u) => {
      console.log(u);
      sendEmailVerification(auth.currentUser).then(() => {
        console.log("Email sent");
      });
      setValues({
        email: "",
        fullName: "",
        password: "",
        loading: false,
      });
      navigate("/login");
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="regcontainer">
          <Headingreglog
            className="headerreglog"
            title="Get started with easily register"
          />
          <p className="regpara">Free register and you can enjoy it</p>
          <div className="reginput">
            <TextField
              onChange={handleValues}
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              name="email"
              value={values.email}
            />
          </div>
          {values.error.includes("email") && (
            <Alert style={{ margin: "20px 0", width: "75%" }} severity="error">
              {values.error}
            </Alert>
          )}
          <div className="reginput">
            <TextField
              onChange={handleValues}
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              name="fullName"
              value={values.fullName}
            />
          </div>
          {values.error.includes("fullName") && (
            <Alert style={{ margin: "20px 0", width: "75%" }} severity="error">
              {values.error}
            </Alert>
          )}
          <div className="reginput">
            <TextField
              onChange={handleValues}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type={values.eye ? "text" : "password"}
              name="password"
              value={values.password}
            />
          </div>
          {values.error.includes("password") && (
            <Alert style={{ margin: "20px 0", width: "75%" }} severity="error">
              {values.error}
            </Alert>
          )}
          <div
            onClick={() => setValues({ ...values, eye: !values.eye })}
            className="eye"
          >
            {values.eye ? <RiEyeFill /> : <RiEyeCloseFill />}
          </div>
          <Alert style={{ margin: "20px 0", width: "75%" }} severity="info">
            Already have an account
            <strong>
              <Link to="/login">Sign In</Link>
            </strong>
          </Alert>
          {values.loading ? (
            <LoadingButton loading variant="outlined">
              Submit
            </LoadingButton>
          ) : (
            <Button onClick={handleSubmit} variant="contained">
              Sign Up
            </Button>
          )}
        </div>
      </Grid>
      <Grid item xs={6}>
        <img className="regimg" src={registrationimg} />
      </Grid>
    </Grid>
  );
};

export default Registration;
