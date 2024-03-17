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
import React from "react";
import { Link, useLocation } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const ReviewPreRegistrationStudent = () => {
  let totalCredit = 0;

  const { state } = useLocation();
  const preregisDetails = state ? state.preregisDetails : {};
  const {
    studentName,
    supervisorName,
    submitDate,
    approveDate,
    status,
    listSubjectPreregis,
    comments,
  } = preregisDetails;

  for (const data of listSubjectPreregis) {
    totalCredit += data.subject.credits;
  }

  const handleBreadcrumbsClick = () => {
    let path = "/bimbingan-akademik/history";
    return <StyledLink to={path}>History</StyledLink>;
  };

  return (
    <Div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ paddingBottom: 2 }}>
        {handleBreadcrumbsClick()}
        <Typography color="text.primary">Certificate</Typography>
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
            <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
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
