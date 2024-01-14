import React, { useEffect, useState } from "react";
import Div from "@jumbo/shared/Div";
import { Typography, Paper, Grid } from "@mui/material";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";

const Profile = () => {
  const [dataProfile, setDataProfile] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { id } = JSON.parse(localStorage.getItem("user"));
      const result = await axios.get(`${BASE_URL_API}/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("ini isi result.data", result.data.data);
      setDataProfile(result.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

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
              {`${dataProfile?.lastName}, ${dataProfile?.firstName}`}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">NIDN</Typography>
            <Typography variant="h6" sx={textSyle}>
              {dataProfile?.nidn}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Email</Typography>
            <Typography variant="h6" sx={textSyle}>
              {dataProfile?.email}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Phone</Typography>
            <Typography variant="h6" sx={textSyle}>
              {dataProfile?.phoneNum}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Address</Typography>
            <Typography variant="h6" sx={textSyle}>
              {dataProfile?.Address}
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
