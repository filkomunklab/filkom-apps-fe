import React, { useEffect, useState } from "react";
import Div from "@jumbo/shared/Div";
import { Typography, Paper, Grid } from "@mui/material";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { useNavigate } from "react-router-dom";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const Profile = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const [dataProfile, setDataProfile] = useState([]);

  const getProfile = async () => {
    try {
      const { id } = JSON.parse(localStorage.getItem("user"));
      const result = await jwtAuthAxios.get(`/employee/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      console.log("ini isi result.data", result.data.data);
      setDataProfile(result.data.data);
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error.response && error.response.status === 403) {
        handlePermissionError();
        setTimeout(() => {
          navigate(-1);
        }, 2000);
        return;
      } else if (error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.log("ini error: ", error);
      }
    }
  };

  useEffect(() => {
    getProfile();
    return () => controller.abort();
  }, []);

  return (
    <Div>
      <Paper elevation={1} sx={{ mb: 5 }}>
        <Typography
          variant="h5"
          sx={{
            backgroundColor: "#1A38601A",
            fontWeight: 500,
            padding: "16px",
          }}
        >
          Student Council Information
        </Typography>
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Full Name</Typography>
            <Typography variant="h6" sx={textSyle}>
              {dataProfile?.lastName
                ? `${dataProfile.lastName}, ${dataProfile.firstName}`
                : "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">NIDN</Typography>
            <Typography variant="h6" sx={textSyle}>
              {dataProfile?.nidn || "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Email</Typography>
            <Typography variant="h6" sx={textSyle}>
              {dataProfile?.email || "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Phone</Typography>
            <Typography variant="h6" sx={textSyle}>
              {dataProfile?.phoneNum || "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Address</Typography>
            <Typography variant="h6" sx={textSyle}>
              {dataProfile?.Address || "-"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Div>
  );
};

const textSyle = {
  borderWidth: 1,
  borderColor: "#00000029",
  borderStyle: "solid",
  paddingX: "24px",
  paddingY: "16px",
  borderRadius: "8px",
};

export default Profile;
