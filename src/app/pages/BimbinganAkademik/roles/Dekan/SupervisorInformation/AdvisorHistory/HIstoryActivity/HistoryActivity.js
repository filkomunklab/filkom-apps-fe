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
import { handleAuthenticationError } from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

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

      const { status, data } = response.data;
      if (status === "OK") {
        setActivityDetail(data);
      }
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.error("error: ");
        return;
      }
    }
  };

  useEffect(() => {
    getActivityDetail();
    return () => controller.abort();
  }, []);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledLink
          onClick={() =>
            navigate("/bimbingan-akademik/dekan/supervisor-information/")
          }
        >
          Supervisor Information
        </StyledLink>
        <StyledLink onClick={() => navigate(-1)}>History</StyledLink>
        <Typography color="text.primary">Activity</Typography>
      </Breadcrumbs>
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
              sx={{ fontSize: "24px", mt: 4, mb: 3, fontWeight: 400 }}
            >
              Attendance
            </Typography>
            <TableContainer
              sx={{
                maxHeight: 640,
              }}
              component={Paper}
            >
              <Table>
                <TableHead>
                  <TableRow size="small">
                    <TableCell sx={{ backgroundColor: "#dfe4eb" }}>
                      Number
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#dfe4eb" }}>
                      Student Name
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#dfe4eb" }}>
                      NIM
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#dfe4eb" }}>
                      Prodi
                    </TableCell>
                    <TableCell sx={{ backgroundColor: "#dfe4eb" }}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activityDetail?.ActivityMember.map((student, index) => (
                    <TableRow key={student.student?.nim}>
                      <TableCell sx={{ width: "40px" }}>{index + 1}</TableCell>
                      <TableCell sx={{ width: "190px" }}>
                        {student.student?.lastName},{" "}
                        {student.student?.firstName}
                      </TableCell>
                      <TableCell sx={{ width: "80px" }}>
                        {student.student?.nim}
                      </TableCell>
                      <TableCell sx={{ width: "80px" }}>
                        {student.student?.major === "IF"
                          ? "Informatika"
                          : student.student?.major === "SI"
                          ? "Sistem Informasi"
                          : student.student?.major === "TI"
                          ? "Teknologi Informasi"
                          : student.student?.major}
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
