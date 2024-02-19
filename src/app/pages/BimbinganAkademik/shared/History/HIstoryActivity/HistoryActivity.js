import React, { useEffect, useState } from "react";
import {
  Typography,
  Stack,
  Grid,
  Breadcrumbs,
  experimentalStyled as styled,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const ViewActivity = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const location = useLocation();
  console.log("loca", location);
  const { activityId } = location?.state || "-";
  const [activityDetail, setActivityDetail] = useState("");

  const getActivityDetail = async () => {
    try {
      const response = await jwtAuthAxios.get(
        `/activity/detail/${activityId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      console.log("res activity detail", response);

      const { status, data } = response.data;
      if (status === "OK") {
        setActivityDetail(data);
      } else {
        console.log("status result tidak ok", response);
      }
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (
        error.response &&
        error.response.status >= 401 &&
        error.response.status <= 403
      ) {
        console.log("You don't have permission to access this page");
        navigate(`/`);
        return;
      } else {
        console.log("ini error: ", error);
        return;
      }
    }
  };

  useEffect(() => {
    getActivityDetail();
    return () => controller.abort();
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>History</StyledLink>
          <Typography color="text.primary">Activity</Typography>
        </Breadcrumbs>
      </div>
      <Typography
        sx={{ fontSize: "24px", fontWeight: 500, paddingTop: "20px" }}
      >
        Activity
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack spacing={2} sx={{ paddingTop: 1 }}>
            <Grid paddingTop={2} sx={{ display: "flex", direction: "row" }}>
              <Typography>Title</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 1 }}>
                {activityDetail?.title}
              </Typography>
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Grid paddingTop={2} sx={{ display: "flex", direction: "row" }}>
              <Typography>Descriptions</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                {activityDetail?.description}
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Grid paddingTop={2} sx={{ display: "flex", direction: "row" }}>
              <Typography>Date</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                {new Date(activityDetail?.dueDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Grid paddingTop={2} sx={{ display: "flex", direction: "row" }}>
              <Typography>Clock (optional)</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                {new Date(activityDetail?.dueDate).toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Grid paddingTop={2} sx={{ display: "flex", direction: "row" }}>
              <Typography>Form Attendance</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                {activityDetail?.isAttendance === true ? "Yes" : "No"}
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        {activityDetail?.isAttendance === true && (
          <Grid container paddingLeft={2}>
            <Typography
              sx={{ fontSize: "24px", mt: 2, mb: 2, fontWeight: 400 }}
            >
              Attendance
            </Typography>
            <TableContainer
              sx={{
                maxHeight: 640,
              }}
              component={Paper}
            >
              <Table stickyHeader>
                <TableHead
                  size="small"
                  sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}
                >
                  <TableRow size="small">
                    <TableCell>Number</TableCell>
                    <TableCell>Student Name</TableCell>
                    <TableCell>NIM</TableCell>
                    <TableCell>Prodi</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activityDetail?.ActivityMember.map((student, index) => (
                    <TableRow key={student?.studentNim}>
                      <TableCell sx={{ width: "40px" }}>{index + 1}</TableCell>
                      <TableCell sx={{ width: "190px" }}>
                        {student?.studentNim}
                      </TableCell>
                      <TableCell sx={{ width: "80px" }}>
                        {student?.studentNim}
                      </TableCell>
                      <TableCell sx={{ width: "80px" }}>
                        {student?.studentNim}
                      </TableCell>
                      <TableCell sx={{ width: "80px" }}>
                        <Chip
                          label={
                            student?.presence === true
                              ? "Present"
                              : student?.presence === false
                              ? "Absent"
                              : "null"
                          }
                          variant="filled"
                          color={
                            student?.presence === true
                              ? "success"
                              : student?.presence === false
                              ? "error"
                              : "default"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default ViewActivity;
