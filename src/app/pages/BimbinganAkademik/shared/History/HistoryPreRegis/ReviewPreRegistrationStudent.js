import Div from "@jumbo/shared/Div";
import {
  Box,
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

const ReviewPreRegistrationStudent = () => {
  const [commentText, setCommentText] = useState("");
  let totalCredit = 0;

  const { state } = useLocation();
  const preregisDetails = state ? state.preregisDetails : {};
  const {
    id,
    studentName,
    supervisorName,
    submitDate,
    approveDate,
    status,
    listSubjectPreregis,
    comments,
  } = preregisDetails;

  // for (const data of listSubjectPreregis) {
  //   totalCredit += data.subject.credits;
  // }

  for (const data of listSubjectPreregis) {
    if (data.subject && typeof data.subject === "object") {
      totalCredit += data.subject.credits;
    } else {
      console.error("Invalid subject data:", data.subject);
    }
  }

  const role = Boolean(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user")).role
    : [];
  const getRole = () => {
    const filter = role.includes("KAPRODI")
      ? "kaprodi"
      : role.includes("DEKAN")
      ? "dekan"
      : "dosen-pembimbing";

    return filter;
  };
  return (
    <Div>
      <Breadcrumbs oaria-label="breadcrumb">
        <StyledLink to={`/bimbingan-akademik/${getRole()}/history`}>
          History
        </StyledLink>
        <Typography color="text.primary">Pre-registration</Typography>
      </Breadcrumbs>
      <Typography
        fontSize={"24px"}
        fontWeight="500"
        sx={{ marginBottom: 2, paddingTop: "20px" }}
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
                {status
                  ? status.charAt(0) + status.slice(1).toLowerCase()
                  : "-"}
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
      {comments !== null && comments.trim() !== "" && (
        <Grid item xs={12} md={11.5} xl={11.5} paddingTop={2}>
          <Box component="form" noValidate autoComplete="off">
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              Comment from Supervisor
            </Typography>
            <Paper
              elevation={0}
              variant="outlined"
              fullWidth
              sx={{ backgroundColor: "background.default" }}
            >
              <Typography variant="body1" sx={{ p: 2 }}>
                {comments}
              </Typography>
            </Paper>
          </Box>
        </Grid>
      )}
    </Div>
  );
};

export default ReviewPreRegistrationStudent;
