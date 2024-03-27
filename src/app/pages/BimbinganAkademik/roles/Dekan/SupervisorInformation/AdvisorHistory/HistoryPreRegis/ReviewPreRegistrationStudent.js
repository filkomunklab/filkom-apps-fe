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
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const ReviewPreRegistrationStudent = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  //handle error
  const handleError = (error) => {
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
  };

  const [detail, setDetail] = useState({
    ListOfRequest: [],
  });
  const location = useLocation();
  const { nik, id } = location.state ? location.state : "";

  const getPreregis = async () => {
    try {
      const preregisDetailsResult = await jwtAuthAxios.get(
        `/pre-regist/details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal,
        }
      );
      setDetail(preregisDetailsResult.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getPreregis();
    return () => controller.abort();
  }, []);

  let totalCredit = 0;
  for (const data of detail?.ListOfRequest) {
    totalCredit += data.subject.credits;
  }

  return (
    <Div>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledLink onClick={() => navigate(-2)}>
          Supervisor Information
        </StyledLink>
        <StyledLink onClick={() => navigate(-1)}>History</StyledLink>
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
              <Typography variant="h5">
                {detail?.Student?.lastName}, {detail?.Student?.firstName}
              </Typography>
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
              <Typography variant="h5">
                {detail?.Employee?.lastName}, {detail?.Employee?.firstName}
              </Typography>
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
                {new Date(detail?.submitDate).toLocaleDateString("en-US", {
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
                {new Date(detail?.approveDate).toLocaleDateString("en-US", {
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
                    detail?.status === "REJECTED"
                      ? "red"
                      : detail?.status === "APPROVED"
                      ? "blue"
                      : "#005FDB",
                }}
              >
                {detail?.status
                  ? detail?.status.charAt(0) +
                    detail?.status.slice(1).toLowerCase()
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
              {detail?.ListOfRequest.map((data, index) => (
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
      {detail?.comments !== null && detail?.comments?.trim() !== "" && (
        <Grid item xs={12} md={11.5} xl={11.5} paddingTop={1}>
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
                {detail?.comments}
              </Typography>
            </Paper>
          </Box>
        </Grid>
      )}
    </Div>
  );
};

export default ReviewPreRegistrationStudent;
