import React, { useState } from "react";
import { Grid, TextField, Button, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import registrationimg from "../assets/registrationimg.png";
import Headingreglog from "../components/Headingreglog";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { toast } from "react-toastify";

const Registration = () => {
  let navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();

  let [show, setShow] = useState(false);
  let [values, setValues] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  let [error, setError] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  let handleValues = (e) => {
    let { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setError({ ...error, [name]: "" });
  };

  let handleSubmit = () => {
    console.log("hello");
    if (values.email == "") {
      setError({ ...error, email: "email Required" });
      console.log("email nai");
    } else if (values.fullName == "") {
      setError({ ...error, fullName: "fullName Required" });
      console.log("nam nai");
    } else if (values.password == "") {
      setError({ ...error, password: "password Required" });
      console.log("password nai");
    } else {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: values.fullName,
            photoURL: "https://i.ibb.co/rM8Vhxh/avatar2.png",
          }).then(() => {
            sendEmailVerification(auth.currentUser).then(() => {
              set(ref(db, "users/" + user.user.uid), {
                username: user.user.displayName,
                email: user.user.email,
                profile_picture: user.user.photoURL,
              }).then(() => {
                toast("Regitration successful ,please check your email");
                navigate("/login");
              });
            });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode.includes("auth/email-already-in-use")) {
            setError({ ...error, email: "Email Already Exists" });
          }
        });
    }
  };
  // let { email, fullName, password } = values;
  // if (!email) {
  //   setValues({
  //     ...values,
  //     error: "Enter an email",
  //   });
  //   return;
  // }
  // if (!fullName) {
  //   setValues({
  //     ...values,
  //     error: "Enter your fullName",
  //   });
  //   return;
  // }
  // if (!password) {
  //   setValues({
  //     ...values,
  //     error: "Enter password",
  //   });
  //   return;
  // }

  // setValues({
  //   ...values,
  //   loading: true,
  // });
  // createUserWithEmailAndPassword(auth, email, password).then((user) => {
  //   updateProfile(auth.currentUser, {
  //     displayName: values.fullName,
  //     photoURL: "https://i.ibb.co/rM8Vhxh/avatar2.png",
  //   }).then(() => {
  //     sendEmailVerification(auth.currentUser).then(() => {
  //       console.log("Email sent");
  //       console.log(user);
  //       set(ref(db, "users/" + user.user.uid), {
  //         username: user.user.displayName,
  //         email: user.user.email,
  //         profile_picture: user.user.photoURL,
  //       }).then(() => {});
  //     });
  //   });

  //   setValues({
  //     email: "",
  //     fullName: "",
  //     password: "",
  //     loading: false,
  //   });
  //   notify();
  //   navigate("/login");
  // });

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
          {error.email && (
            <Alert style={{ margin: "20px 0", width: "75%" }} severity="error">
              {error.email}
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
          {error.fullName && (
            <Alert style={{ margin: "20px 0", width: "75%" }} severity="error">
              {error.fullName}
            </Alert>
          )}

          <div className="reginput">
            <TextField
              onChange={handleValues}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type={show ? "text" : "password"}
              name="password"
              value={values.password}
            />
          </div>
          {error.password && (
            <Alert style={{ margin: "20px 0", width: "75%" }} severity="error">
              {error.password}
            </Alert>
          )}

          <div className="eye">
            {show ? (
              <RiEyeFill onClick={() => setShow(false)} />
            ) : (
              <RiEyeCloseFill onClick={() => setShow(true)} />
            )}
          </div>
          <Alert style={{ margin: "20px 0", width: "75%" }} severity="info">
            Already have an account
            <strong>
              <Link to="/login">Sign In</Link>
            </strong>
          </Alert>

          <LoadingButton loading variant="outlined">
            Submit
          </LoadingButton>

          <Button onClick={handleSubmit} variant="contained">
            Sign Up
          </Button>
        </div>
      </Grid>
      <Grid item xs={6}>
        <img className="regimg" src={registrationimg} />
      </Grid>
    </Grid>
  );
};

export default Registration;
