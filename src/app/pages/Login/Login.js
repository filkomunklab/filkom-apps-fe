import {
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Div from "@jumbo/shared/Div";
import { ASSET_IMAGES } from "app/utils/constants/paths";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import { useNavigate } from "react-router-dom";
import authService from "app/services/Auth/auth.service";
import { Formik, Form } from "formik";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import JumboSelectField from "@jumbo/components/JumboFormik/JumboSelectField";
import { useMediaQuery } from "@mui/material";

import { FormAfterLoginStudent } from "./components";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import Swal from "sweetalert2";
import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    // overflow: "auto",
  },
  leftSide: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
    position: "relative",
  },
  circleContainer: {
    position: "absolute",
    right: "-23%",
    height: "100vh",
    width: "100%",
    borderTopLeftRadius: "100%",
    borderBottomLeftRadius: "100%",
    scale: "130%",
    overflow: "hidden",
    display: "flex",
    boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.75)",
  },
  "@media (maxWidth: 927px)": {
    pageContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    leftSide: {
      display: "none",
    },
  },
}));

const signInSchema = yup.object({
  username: yup.string("Enter your username").required("Username is required"),
  password: yup.string("Enter your password").required("Password is required"),
  loginAs: yup.string("Enter your password").required("Role is required"),
});

const Login = () => {
  const [openModal, setOpenModal] = useState(false);
  const [profileMahasiswa, setProfileMahasiswa] = useState([]);
  const [userLogin, setUserLogin] = useState("");
  const [tokenUser, setTokenUser] = useState("");
  const style = useStyles();
  const maxWidth515 = useMediaQuery("(maxWidth: 515px)");

  const { setAuthToken } = useJumboAuth();
  const navigate = useNavigate();

  const blueTheme = {
    confirmButtonColor: "#007BFF",
  };

  return (
    <Div className={style.pageContainer}>
      <CssBaseline />
      <Div
        sx={{
          width: "50%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Formik
          validateOnChange={true}
          validationSchema={signInSchema}
          initialValues={{
            username: "",
            password: "",
            loginAs: "",
          }}
          onSubmit={async (data, { setSubmitting }) => {
            setSubmitting(true);
            try {
              const { token, user } = await authService.signIn(data);

              console.log(token, user);
              if (user.role === "MAHASISWA") {
                const response = await jwtAuthAxios.get(
                  `student/biodata/check/${user.id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                console.log("ini response: ", response);
                if (response.data.data.biodataCheck) {
                  setAuthToken(token);

                  console.log("ini user loh: ", user);
                  localStorage.setItem("user", JSON.stringify(user));

                  navigate("/bimbingan-akademik/profile");
                } else {
                  const response = await jwtAuthAxios.get(
                    `student/${user.nim}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  const responseCurriculum = await jwtAuthAxios.get(
                    `curriculum/${response.data.data.curriculumId}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  const data = {
                    ...response.data.data,
                    curriculum: responseCurriculum.data.data,
                  };
                  console.log("ini data: ", data);
                  setProfileMahasiswa(data);
                  setUserLogin(user);
                  setOpenModal(true);
                }
              } else {
                setAuthToken(token);

                console.log("ini user loh: ", user);
                localStorage.setItem("user", JSON.stringify(user));

                navigate("/");
              }
            } catch (error) {
              console.log(error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Username atau password salah",
                ...blueTheme,
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form noValidate>
              <Stack
                sx={{
                  backgroundColor: "white",
                  width: maxWidth515 ? "275px" : "433px",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: maxWidth515 ? "40px" : "60px",
                    fontWeight: 700,
                    padding: maxWidth515 ? "15px 0 " : "5px 0",
                  }}
                >
                  Sign In
                </Typography>
                <Grid container direction={"column"} gap={2}>
                  <Grid item>
                    <JumboTextField
                      name="username"
                      variant="outlined"
                      label="Username"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <JumboTextField
                      name="password"
                      variant="outlined"
                      label="Password"
                      fullWidth
                      type="password"
                    />
                  </Grid>
                  <Grid item>
                    <JumboSelectField
                      name="loginAs"
                      label="Login as"
                      sx={{
                        width: maxWidth515 ? "275px" : "135px",
                      }}
                      options={[
                        { value: "", label: "None" },
                        { value: "admin", label: "Admin" },
                        { value: "student", label: "Student" },
                        { value: "employee", label: "Employee" },
                      ]}
                    />
                  </Grid>
                  <Grid container justifyContent={"space-between"}>
                    <Grid item>
                      <FormControlLabel
                        control={<Checkbox />}
                        label={"Remember Me"}
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: maxWidth515 ? "12px" : "15px",
                            marginLeft: maxWidth515 ? "-4px" : "0px",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        sx={{
                          fontSize: maxWidth515 ? "11px" : "14px",
                          textTransform: "capitalize",
                          paddingTop: maxWidth515 ? "11px" : "9px",
                          paddingRight: maxWidth515 ? "0" : "0",
                        }}
                        variant="text"
                      >
                        Forgot Password?
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <LoadingButton
                      loading={isSubmitting}
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        textTransform: "capitalize",
                        backgroundColor: "#006AF5",
                      }}
                    >
                      Sign In
                    </LoadingButton>
                  </Grid>
                  <Grid item alignSelf={"center"}>
                    <Button
                      sx={{
                        fontSize: maxWidth515 ? "12px" : "14px",
                        textTransform: "capitalize",
                      }}
                      variant="text"
                    >
                      Create an account
                    </Button>
                  </Grid>
                  <Grid item alignSelf={"center"}>
                    <a href="http://localhost:3000/">
                      <Button
                        sx={{ textTransform: "capitalize" }}
                        variant="text"
                      >
                        Daftar Judul Skripsi
                      </Button>
                    </a>
                  </Grid>
                </Grid>
              </Stack>
            </Form>
          )}
        </Formik>
      </Div>
      <Div className={style.leftSide}>
        <Div className={style.circleContainer}>
          <img
            src={`${ASSET_IMAGES}/img-auth-background.png`}
            style={{
              objectFit: "contain",
              objectPosition: "left",
              display: "flex",
              flex: 1,
            }}
          />
        </Div>
      </Div>
      <FormAfterLoginStudent
        openModal={openModal}
        setOpenModal={setOpenModal}
        profileMahasiswa={profileMahasiswa}
        userLogin={userLogin}
        tokenUser={tokenUser}
      />
    </Div>
  );
};

export default Login;
