import Div from "@jumbo/shared/Div";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  experimentalStyled as styled,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 402,
  bgcolor: "white",
  borderRadius: 2,
  boxShadow: 24,
  overflow: "hidden",
};
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [commentText, setCommentText] = useState("");

  const { state } = useLocation();
  const preregisDetails = state ? state.preregisDetails : {};
  const {
    id,
    studentName,
    supervisorName,
    submitDate,
    status,
    listSubjectPreregis,
    curriculum,
    totalCredits,
  } = preregisDetails;

  const handleSubmitPreregis = async () => {
    setLoading(true);
    try {
      setIsModalVisible(!isModalVisible);
      const currentDate = new Date().toISOString();
      const bodyData = {
        status: isApprove ? "APPROVED" : "REJECTED",
        comments: commentText || null,
        approveDate: currentDate,
      };
      await jwtAuthAxios.patch(`/pre-regist/approval/${id}`, bodyData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      setLoading(false);
      const { role } = JSON.parse(localStorage.getItem("user"));
      let path = "";

      if (role.includes("DEKAN")) {
        path = "/bimbingan-akademik/dekan/review-activities/pre-registration";
      } else if (role.includes("KAPRODI")) {
        path = "/bimbingan-akademik/kaprodi/review-activities/pre-registration";
      } else {
        path =
          "/bimbingan-akademik/dosen-pembimbing/review-activities/pre-registration";
      }
      navigate(path);
    } catch (error) {
      setLoading(false);
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
        return;
      }
    }
  };

  const handleReject = () => {
    setIsReject(!isReject);
  };
  const handleApprove = () => {
    setIsApprove(!isApprove);
  };

  const renderRows = () => {
    const rows = [];
    let currentSemester = null;
    const subjects = curriculum ? curriculum.Subjects : [];

    subjects.forEach((value, index) => {
      if (value.semester !== currentSemester) {
        rows.push(
          <TableRow key={`semester-${value.semester}`}>
            <TableCell
              colSpan={6}
              sx={{
                lign: "left",
                fontWeight: 500,
                fontSize: "15px",
                color: "black",
              }}
            >
              {value.semester === 0
                ? "Pre-Requisite"
                : value.semester === 9
                ? "Elective"
                : `Semester ${value.semester}`}
            </TableCell>
          </TableRow>
        );
        currentSemester = value.semester;
      }

      rows.push(
        <TableRow key={value.id}>
          <TableCell>{value.code}</TableCell>
          <TableCell>{value.name}</TableCell>
          <TableCell>{value.credits}</TableCell>
          <TableCell>{value.type}</TableCell>
          <TableCell sx={{ width: "400px" }}>
            {value.prerequisite === null || value.prerequisite === ""
              ? "-"
              : value.prerequisite
                  .split(/(?<=\])\s-\s|\n/)
                  .map((prereq, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && (
                        <>
                          <br /> <br />
                        </>
                      )}
                      {prereq}
                    </React.Fragment>
                  ))}
          </TableCell>
        </TableRow>
      );
    });

    return rows;
  };

  const handleBreadcrumbsClick = () => {
    const { role } = JSON.parse(localStorage.getItem("user"));
    let path = "";

    if (role.includes("DEKAN")) {
      path = "/bimbingan-akademik/dekan/review-activities/pre-registration";
    } else if (role.includes("KAPRODI")) {
      path = "/bimbingan-akademik/kaprodi/review-activities/pre-registration";
    } else {
      path =
        "/bimbingan-akademik/dosen-pembimbing/review-activities/pre-registration";
    }
    return <StyledLink to={path}>Review Pre-registration</StyledLink>;
  };

  return (
    <Div>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(34, 34, 34, 0.7)",
            zIndex: 2003,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Breadcrumbs aria-label="breadcrumb" sx={{ paddingBottom: 1 }}>
        {handleBreadcrumbsClick()}
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
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
              <TableRow>
                <TableCell sx={{ width: "40px" }}>Number</TableCell>
                <TableCell sx={{ width: "40px" }}>Code</TableCell>
                <TableCell sx={{ width: "400px" }}>Subject Name</TableCell>
                <TableCell sx={{ width: "40px" }}>Credit(s)</TableCell>
                <TableCell sx={{ width: "40px" }}>Type </TableCell>
                <TableCell sx={{ width: "380px" }}>Prerequisite</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listSubjectPreregis
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ width: "40px" }}>{index + 1}</TableCell>
                    <TableCell sx={{ width: "40px" }}>
                      {data.subject?.code}
                    </TableCell>
                    <TableCell sx={{ width: "400px" }}>
                      {data.subject?.name}
                    </TableCell>
                    <TableCell sx={{ width: "40px" }}>
                      {data.subject?.credits}
                    </TableCell>
                    <TableCell sx={{ width: "200px" }}>
                      {data.subject?.type}
                    </TableCell>
                    <TableCell sx={{ width: "380px" }}>
                      {data.subject?.prerequisite}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Typography variant="h5" sx={{ my: 5 }}>
        Total Credits: {totalCredits} credits
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <Typography variant="h5">Comments</Typography>
        <TextField
          id="outlined-multiline-static"
          placeholder="Add comment here (Optional)"
          multiline
          fullWidth
          minRows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </Box>
      <Div
        sx={{
          mt: 3,
          mb: 6,
          display: "flex",
          justifyContent: "flex-end",
          columnGap: 2,
        }}
      >
        <Button
          variant="contained"
          color="error"
          sx={{ borderRadius: 50, textTransform: "capitalize", width: "152px" }}
          onClick={handleReject}
        >
          Reject
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: 50, textTransform: "capitalize", width: "152px" }}
          onClick={handleApprove}
        >
          Approve
        </Button>
        <Modal
          open={isReject}
          onClose={handleReject}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Div sx={{ py: 2, px: 3 }}>
              <Typography id="modal-modal-title" variant="h3" color={`#0A0A0A`}>
                Reject this course pre-registration?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please remember to leave comments for the student regarding the
                reasons of the rejection.
              </Typography>
            </Div>
            <Div
              sx={{
                display: "flex",
                columnGap: 2,
                justifyContent: "flex-end",
                bgcolor: "#F5F5F5",
                px: 2,
                py: 1,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#E0E0E0",
                  color: "#0A0A0A",
                  textTransform: "capitalize",
                }}
                onClick={() => setIsReject(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ textTransform: "capitalize" }}
                onClick={() => {
                  handleSubmitPreregis();
                  setIsReject(false);
                }}
              >
                Submit
              </Button>
            </Div>
          </Box>
        </Modal>
        <Modal
          open={isApprove}
          onClose={handleApprove}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Div sx={{ py: 2, px: 3 }}>
              <Typography id="modal-modal-title" variant="h3" color={`#0A0A0A`}>
                Approve this course pre-registration?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please note that approving this course pre-registration will
                store the data for statistical analysis before making it
                available.
              </Typography>
            </Div>
            <Div
              sx={{
                display: "flex",
                columnGap: 2,
                justifyContent: "flex-end",
                bgcolor: "#F5F5F5",
                px: 2,
                py: 1,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#E0E0E0",
                  color: "#0A0A0A",
                  textTransform: "capitalize",
                }}
                onClick={() => setIsApprove(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitPreregis}
                variant="contained"
                sx={{ textTransform: "capitalize" }}
              >
                Submit
              </Button>
            </Div>
          </Box>
        </Modal>
      </Div>
      <Typography
        sx={{ fontSize: "22px", fontWeight: 500, paddingBottom: "10px" }}
      >
        Curriculum {`${curriculum.major} - ${curriculum.year}`}
      </Typography>
      <Grid container pt={2}>
        <TableContainer sx={{ maxHeight: 530 }} component={Paper}>
          <Table>
            <TableHead
              sx={{
                position: "-webkit-sticky",
                position: "sticky",
                top: 0,
                backgroundColor: "rgb(245, 247, 250)",
              }}
            >
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Credit(s)</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Prerequisite</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderRows()}</TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Div>
  );
};

export default ReviewPreRegistrationStudent;
