import React, { useState } from "react";
// importing css
import "./style.css";
//importing css toastify
import "react-toastify/dist/ReactToastify.css";
// mui imports
import { Button, Container, Grid, TextField } from "@mui/material";
//formik imports
import { useFormik } from "formik";
//react spinners
import { PulseLoader } from "react-spinners";
//react router dom
import { Link, useNavigate } from "react-router-dom";
//importing icons
import { TfiEye } from "react-icons/tfi";
import { FaRegEyeSlash } from "react-icons/fa";
// validation
import { signUp } from "../../Validation";
// authentication
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
//database
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
const Registration = () => {
  // firebase database and authentication
  const auth = getAuth();
  const db = getDatabase();
  //navigate>useNavigate
  const navigate = useNavigate();
  // showing eye on password field
  const [showEye, setShowEye] = useState("password");
  // handle eye
  const handleEye = () => {
    showEye === "password" ? setShowEye("text") : setShowEye("password");
  };
  // pulse loading
  const [isLoading, setIsLoading] = useState(false);
  // formik starts
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: signUp,
    onSubmit() {
      setIsLoading(true);
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      ).then(({ user }) => {
        // update display name
        updateProfile(auth.currentUser, {
          displayName: formik.values.fullName,
        }).then(() => {
          setIsLoading(false);
          sendEmailVerification(auth.currentUser)
            .then(() => {
              set(ref(db, "users/" + user.uid), {
                username: user.displayName,
                email: user.email,
              });
            })
            .then(() => {
              toast.success("😴 check you mail and verify!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                progress: undefined,
                theme: "colored",
              });
              setIsLoading(false);
              formik.resetForm();
              setTimeout(() => {
                navigate("/login");
              }, 1500);
            });
        });
      });
    },
  });
  //auth/email-already-in-use
  return (
    <>
      <Container fixed>
        <ToastContainer />
        <Grid className="form_center" container spacing={6}>
          <Grid item xs={6}>
            <div className="forms">
              <div className="reg-header">
                <h2>Get started with easily register</h2>
                <p>Free register and you can enjoy it</p>
              </div>
              <div className="form-inputs">
                <form onSubmit={formik.handleSubmit}>
                  {formik.errors.fullName && formik.touched.fullName ? (
                    <TextField
                      error
                      label={formik.errors.fullName}
                      className="inputs-design"
                      variant="outlined"
                      type="text"
                      name="fullName"
                      value={formik.values.fullName}
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
                  ) : (
                    <TextField
                      className="inputs-design"
                      label="Full Name"
                      variant="outlined"
                      type="text"
                      name="fullName"
                      value={formik.values.fullName}
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
                  )}
                  {formik.errors.email && formik.touched.email ? (
                    <TextField
                      error
                      className="inputs-design"
                      label={formik.errors.email}
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
                  ) : (
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
                  )}
                  <div className="password">
                    {formik.errors.password && formik.touched.password ? (
                      <TextField
                        error
                        className="inputs-design"
                        label={formik.errors.password}
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
                    ) : (
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
                    )}
                    <div className="eye-closed" onClick={handleEye}>
                      {showEye === "password" ? <FaRegEyeSlash /> : <TfiEye />}
                    </div>
                  </div>

                  {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword ? (
                    <TextField
                      error
                      className="inputs-design"
                      label={formik.errors.confirmPassword}
                      variant="outlined"
                      type="password"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
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
                  ) : (
                    <TextField
                      className="inputs-design"
                      label="Confirm password"
                      variant="outlined"
                      type="password"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
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
                  )}

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
                      Sign Up
                    </Button>
                  )}
                </form>
                <div className="links">
                  <p>
                    Already have an account ? <Link to="/login">Sign In</Link>{" "}
                  </p>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="signup-img">
              <picture>
                {/* public folder e image folder rakhle public ullekh korte hoy na */}
                <img src="./images/reg-png.png" alt="registration-png" />
              </picture>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Registration;
