import {
  Breadcrumbs,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  experimentalStyled as styled,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const PreRegistrationWaiting = () => {
  const { state } = useLocation();
  const preregisDetails = state ? state.preregisDetails : {};
  const {
    studentName,
    supervisorName,
    submitDate,
    status,
    listSubjectPreregis,
  } = preregisDetails;

  let totalCredit = 0;
  for (const data of listSubjectPreregis) {
    totalCredit += data.subject.credits;
  }

  const handleBreadcrumbsClick = () => {
    let path = "/bimbingan-akademik/current-activities";
    return <StyledLink to={path}>Current Activities</StyledLink>;
  };

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ paddingBottom: 1 }}>
        {handleBreadcrumbsClick()}
        <Typography color="text.primary">Pre-registration</Typography>
      </Breadcrumbs>
      <Typography
        sx={{
          fontSize: { xs: "20px", md: "24px" },
          fontWeight: 500,
          marginBottom: 2,
          paddingTop: "20px",
        }}
      >
        Courses Pre-registration
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
              <Typography variant="h5">Submission Date</Typography>
            </Grid>
            <Grid item xs={1} xl={"auto"}>
              <Typography variant="h5">:</Typography>
            </Grid>
            <Grid item xs={7} paddingLeft={1}>
              <Typography variant="h5">
                {new Date(submitDate).toLocaleDateString("en-US", {
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
              <Typography variant="h5" sx={{ color: "#FFCC00" }}>
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} paddingTop={4}>
        <TableContainer
          sx={{
            maxHeight: 640,
          }}
          component={Paper}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#e8ecf2",
                    width: "40px",
                    textAlign: "center",
                  }}
                >
                  Number
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#e8ecf2",
                    width: "40px",
                    textAlign: "center",
                  }}
                >
                  Code
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#e8ecf2",
                    width: "400px",
                    textAlign: "center",
                  }}
                >
                  Subject Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#e8ecf2",
                    width: "40px",
                    textAlign: "center",
                  }}
                >
                  Credit(s)
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#e8ecf2",
                    width: "40px",
                    textAlign: "center",
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#e8ecf2",
                    width: "380px",
                    textAlign: "center",
                  }}
                >
                  Prerequisite
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listSubjectPreregis.map((data, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: "center", width: "40px" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", width: "40px" }}>
                    {data.subject.code}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", width: "400px" }}>
                    {data.subject.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", width: "40px" }}>
                    {data.subject.credits}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", width: "200px" }}>
                    {data.subject.type}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", width: "380px" }}>
                    {data.subject.prerequisite
                      ? data.subject.prerequisite
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Typography variant="h5" sx={{ my: 5 }}>
        Total Credits: {totalCredit} credits
      </Typography>
    </div>
  );
};

export default PreRegistrationWaiting;
