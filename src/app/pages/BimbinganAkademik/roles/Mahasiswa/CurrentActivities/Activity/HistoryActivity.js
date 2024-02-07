import React, { useState } from "react";
import {
  Typography,
  Stack,
  Grid,
  Breadcrumbs,
  experimentalStyled as styled,
  Paper,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const Activity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    // activityMember,
    // activityType,
    // createdAt,
    // description,
    // dueDate,
    // isAttendance,
    // title,
    activityDetails,
  } = location.state ? location.state : [];
  console.log("ini location", location);
  const [isAttendance, setisAttendance] = useState(true);
  const [isGradeSubmission, setIsGradeSubmission] = useState(false);

  const getActivity = async () => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer token_apa`,
      };

      const response = await axios.get(`${BASE_URL_API}/bla/bla/bla`, {
        headers,
      });

      const { status, message, data, code } = response.data;

      if (status === "OK") {
        //isi status atau code tergantung API
        //simpan dalam usestate contoh:
        //setActivity = data
        //tambahkan handle lain jika perlu (grade, attendance, dll)
      } else {
        //tambah handler jika respon lain, kalau tidak perlu hapus saja
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const formatDate = (date) => {
    const currentDate = new Date();
    const formattedDate = new Date(date);

    if (formattedDate.toDateString() === currentDate.toDateString()) {
      return "Today";
    } else if (
      formattedDate.toDateString() ===
      new Date(currentDate - 1 * 24 * 60 * 60 * 1000).toDateString()
    ) {
      return "Yesterday";
    } else {
      return formattedDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>Current Activities</StyledLink>
          <Typography color="text.primary">Activity</Typography>
        </Breadcrumbs>
      </div>
      <Typography
        sx={{
          fontSize: { xs: "20px", md: "24px" },
          fontWeight: 500,
          paddingTop: "20px",
        }}
      >
        Activity
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack spacing={2} sx={{ paddingTop: 3 }}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Title</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 1 }}>
                {activityDetails?.title}
              </Typography>
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Descriptions</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                {activityDetails?.description}
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Due Date</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                {formatDate(activityDetails?.dueDate)}
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Clock (optional)</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                {/* {new Date(activityDetails?.dueDate).getHours()}:
                {new Date(activityDetails?.dueDate).getMinutes()} */}
                {new Date(activityDetails?.dueDate).toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Form Attendance</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                {activityDetails?.isAttendance === true ? "Yes" : "No"}
              </Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default Activity;
