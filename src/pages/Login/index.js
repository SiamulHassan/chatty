import React from "react";
// importing css
import "./style.css";
//importing tostify
import { toast, ToastContainer } from "react-toastify";
//importing material
import { Button, Container, Grid, TextField } from "@mui/material";
// importing formik
import { useFormik } from "formik";
//importing icons
import { FaRegEyeSlash } from "react-icons/fa";
import { TfiEye } from "react-icons/tfi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
// importing router dom things
import { Link, useNavigate } from "react-router-dom";
//importing pulse loader
import { PulseLoader } from "react-spinners";
//importing react states
import { useState } from "react";
//importing firebase auth
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
// facebook login
import { FacebookAuthProvider } from "firebase/auth";

const Login = () => {
  const [showEye, setShowEye] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const handleEye = () => {
    showEye === "password" ? setShowEye("text") : setShowEye("password");
  };
  // form initial values
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    // validationSchema: signIn,
    onSubmit() {
      setIsLoading(true);
      signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(({ user }) => {
          if (user.emailVerified) {
            // dispatch user info
            // set user info to local storage
            // navigate
            navigate("/");
          } else {
            toast.error("🙄 Please verify to proceed!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          if (error.code.includes("auth/wrong-password")) {
            toast.error("😫 wrong password!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setIsLoading(false);
          } else if (error.code.includes("auth/user-not-found")) {
            toast.error("😐 such gmail does not exists!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setIsLoading(false);
          }
        });
    },
  });
  // handle google login
  const provider = new GoogleAuthProvider();
  const handleGoogle = () => {
    signInWithPopup(auth, provider).then(({ user }) => {
      // dispatch
      // local storage
      //set to firebase data base
      //nevigate
    });
  };
  // handle facebook login
  const handleFacebook = () => {};
  return (
    <>
      <Container fixed>
        <ToastContainer />
        <Grid className="form_center" container spacing={10}>
          <Grid item xs={6}>
            <div className="signup-img">
              <picture>
                {/* public folder e image folder rakhle public ullekh korte hoy na */}
                <img src="./images/login.png" alt="login-png" />
              </picture>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="forms">
              <div className="login-header">
                <div className="avatar">
                  <picture>
                    <img src="../images/avatar.png" alt="" />
                  </picture>
                </div>
                <h2>Login to your account</h2>
                <div className="auto_log">
                  <div className="google" onClick={handleGoogle}>
                    <div className="logo_part">
                      <FcGoogle className="gogle_iocn" />
                    </div>
                    <div className="text_part">
                      <p className="gogle_text">Login with Google</p>
                    </div>
                  </div>
                  <div className="google facebook" onClick={handleFacebook}>
                    <div className="logo_part">
                      <FaFacebookF className="gogle_iocn fb_icon" />
                    </div>
                    <div className="text_part">
                      <p className="gogle_text">Login with Google</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-inputs">
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    className="inputs-design"
                    label="Email"
                    variant="outlined"
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                          borderColor: "#11175d",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#11175d",
                      },
                    }}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <p className="form-error">{formik.errors.email}</p>
                  ) : null}
                  <div className="password">
                    <TextField
                      className="inputs-design"
                      label="Password"
                      variant="outlined"
                      type={showEye}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused": {
                          "& > fieldset": {
                            borderColor: "#11175d",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#11175d",
                        },
                      }}
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <p className="form-error">{formik.errors.password}</p>
                    ) : null}
                    <div className="eye-closed" onClick={handleEye}>
                      {showEye === "password" ? <FaRegEyeSlash /> : <TfiEye />}
                    </div>
                  </div>

                  {isLoading ? (
                    <Button
                      disabled
                      type="submit"
                      className="form-btn"
                      variant="contained"
                    >
                      <PulseLoader color="#fff" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="form-btn"
                      variant="contained"
                    >
                      Sign In
                    </Button>
                  )}
                </form>
                <div className="links">
                  <Link className="forgotPassword" to="/forgotPassword">
                    Forgot password ??
                  </Link>
                  <p>
                    Didn't have an account ?
                    <Link to="/registration">Sign Up</Link>
                  </p>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
