let [formData, setFormData] = useState({
  email: "",
  name: "",
  password: "",
});
let [error, setError] = useState({
  email: "",
  name: "",
  password: "",
});

let handleClick = (e) => {
  setLoader(true);
  let expression =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (formData.email == "") {
    setLoader(false);
    setError({ ...error, email: "Email Required" });
  } else if (!expression.test(formData.email)) {
    setLoader(false);
    setError({ ...error, email: "valid email required" });
  } else if (formData.name == "") {
    setLoader(false);
    setError({ ...error, name: "Full Name Required" });
  } else if (formData.password == "") {
    setLoader(false);
    setError({ ...error, password: "Passwosrd Required" });
  } else {
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((user) => {
        sendEmailVerification(auth.currentUser).then(() => {
          console.log(user);
          //database e data pathanor jonno update profile proyojon hoy
          updateProfile(auth.currentUser, {
            displayName: formData.name,
            // photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(() => {
            set(ref(db, "users/" + user.user.uid), {
              displayName: user.user.displayName,
              email: user.user.email,
            }).then(() => {
              toast("Registration Successful, please check yousr email");
              setTimeout(() => {
                setLoader(false);
                navigate("/login");
              }, 2000);
            });
          });
        });
      })
      .catch((e) => {
        const errorCode = e.code;
        // const errorMessage = error.message;

        if (errorCode.includes("auth/email-already-in-use")) {
          setLoader(false);
          setError({ ...error, email: "Email Already Exists" });
        }
      });
  }
};

let handleForm = (e) => {
  let { name, value } = e.target;
  if (name == "password") {
    let capi = /[A-Z]/;
    let lower = /[a-z]/;
    let num = /[0-9]/;
    if (!capi.test(value)) {
      setError({ ...error, password: "one capital latter required" });
      return;
    }
    if (!lower.test(value)) {
      setError({ ...error, password: "one lower latter required" });
      return;
    }
    if (!num.test(value)) {
      setError({ ...error, password: "one number required" });
      return;
    }
    if (value.length < 8) {
      setError({ ...error, password: "password length at least 8" });
      return;
    }
    if (value === "") {
      setError("");
      return;
    }
    //PROBLEM:value remove korle error theke jay
  }

  setFormData({ ...formData, [name]: value });

  setError({ ...error, [name]: "" });
  //=============================
  //Or
  // if (e.target.name == "email") {
  //   setFormData({ ...formData, email: e.target.value });
  //   console.log(formData);
  // } else if (e.target.name == "name") {
  //   setFormData({ ...formData, name: e.target.value });
  //   console.log(formData);
  // } else {
  //   setFormData({ ...formData, password: e.target.value });
  //   console.log(formData);
  // }
  //Note:but uporer ta hocche nichertar shortcut version
};
