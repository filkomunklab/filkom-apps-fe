import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Breadcrumbs,
  experimentalStyled as styled,
  Stack,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const HistoryGrade = () => {
  const { state } = useLocation();
  const gradeDetails = state ? state.gradeDetails : {};
  const {
    studentName,
    supervisorName,
    submitedDate,
    status,
    semester,
    grades,
    comments,
    approveDate,
  } = gradeDetails;
  console.log("ini grade detail", gradeDetails);

  const handleBreadcrumbsClick = () => {
    let path = "/bimbingan-akademik/current-activities";
    return <StyledLink to={path}>Current Activities</StyledLink>;
  };

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ paddingBottom: 2 }}>
        {handleBreadcrumbsClick()}
        <Typography color="text.primary">Grade</Typography>
      </Breadcrumbs>
      <Typography
        sx={{
          fontSize: { xs: "20px", md: "24px" },
          fontWeight: 500,
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        Student Grades
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4} md={3} xl={2}>
              <Typography variant="h5">Student Name</Typography>
            </Grid>
            <Grid item xs={1} xl={"auto"}>
              <Typography variant="h5">:</Typography>
            </Grid>
            <Grid item xs={7} paddingLeft={1}>
              <Typography variant="h5">{studentName}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4} md={3} xl={2}>
              <Typography variant="h5">Supervisor Name</Typography>
            </Grid>
            <Grid item xs={1} xl={"auto"}>
              <Typography variant="h5">:</Typography>
            </Grid>
            <Grid item xs={7} paddingLeft={1}>
              <Typography variant="h5">{supervisorName}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4} md={3} xl={2}>
              <Typography variant="h5">Semester</Typography>
            </Grid>
            <Grid item xs={1} xl={"auto"}>
              <Typography variant="h5">:</Typography>
            </Grid>
            <Grid item xs={7} paddingLeft={1}>
              <Typography variant="h5">{semester}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4} md={3} xl={2}>
              <Typography variant="h5">Submission Date</Typography>
            </Grid>
            <Grid item xs={1} xl={"auto"}>
              <Typography variant="h5">:</Typography>
            </Grid>
            <Grid item xs={7} paddingLeft={1}>
              <Typography variant="h5">
                {new Date(submitedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  day: "numeric",
                  month: "long",
                })}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4} md={3} xl={2}>
              <Typography variant="h5">Approval Date</Typography>
            </Grid>
            <Grid item xs={1} xl={"auto"}>
              <Typography variant="h5">:</Typography>
            </Grid>
            <Grid item xs={7} paddingLeft={1}>
              <Typography variant="h5">
                {new Date(approveDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  day: "numeric",
                  month: "long",
                })}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4} md={3} xl={2}>
              <Typography variant="h5">Status</Typography>
            </Grid>
            <Grid item xs={1} xl={"auto"}>
              <Typography variant="h5">:</Typography>
            </Grid>
            <Grid item xs={7} paddingLeft={1}>
              <Typography
                variant="h5"
                sx={{
                  color:
                    status === "REJECTED"
                      ? "red"
                      : status === "APPROVED"
                      ? "blue"
                      : "#005FDB",
                }}
              >
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} paddingTop={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1A38601A" }}>
                <TableCell>No</TableCell>
                <TableCell>Subject Name</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Lecturer</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grades.map((data, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ width: "40px" }}>{index + 1}</TableCell>
                  <TableCell sx={{ width: "40px" }}>
                    {data.subjectName}
                  </TableCell>
                  <TableCell sx={{ width: "40px" }}>{data.grades}</TableCell>
                  <TableCell sx={{ width: "40px" }}>{data.lecturer}</TableCell>
                  <TableCell sx={{ width: "40px" }}>
                    {data.description || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {comments !== null && comments.trim() !== "" && (
        <Grid item xs={12} md={11.5} xl={11.5} paddingTop={4}>
          <Box component="form" noValidate autoComplete="off">
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              Comment from Supervisor
            </Typography>
            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                {comments}
              </Typography>
            </Paper>
          </Box>
        </Grid>
      )}
    </div>
  );
};

export default HistoryGrade;
