import {
  Typography,
  Box,
  Breadcrumbs,
  experimentalStyled as styled,
  Button,
  Modal,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Div from "@jumbo/shared/Div";
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

const GradeStudent = () => {
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
  const gradeDetails = state ? state.gradeDetails : {};
  const {
    id,
    studentName,
    supervisorName,
    submitedDate,
    status,
    semester,
    grades,
  } = gradeDetails;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmitGrade = async () => {
    setLoading(true);
    try {
      setIsModalVisible(!isModalVisible);
      const bodyData = {
        status: isApprove ? "APPROVED" : "REJECTED",
        comments: commentText || null,
      };
      await jwtAuthAxios.put(`/transaction/grades/approval/${id}`, bodyData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      setLoading(false);
      let path = "/bimbingan-akademik/kaprodi/review-activities/grade";
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

  const handleBreadcrumbsClick = () => {
    let path = "/bimbingan-akademik/kaprodi/review-activities/grade";
    return <StyledLink to={path}>Review Grades</StyledLink>;
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
      <Breadcrumbs aria-label="breadcrumb" sx={{ paddingBottom: 2 }}>
        {handleBreadcrumbsClick()}
        <Typography color="text.primary">Grade</Typography>
      </Breadcrumbs>
      <Typography
        fontSize={"24px"}
        fontWeight="500"
        sx={{ marginBottom: 2, paddingTop: "20px" }}
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
      <Box component="form" noValidate autoComplete="off" sx={{ marginTop: 5 }}>
        <Typography variant="h6">Comments</Typography>
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
                Reject this grade submission?
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
                  handleSubmitGrade();
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
                Approve this submission grade?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please note that approving this grades will store the data for
                statistical analysis before making it available.
              </Typography>
            </Div>
            <Div
              sx={{
                display: "flex",
                columnGap: 2,
                justifyContent: "flex-end",
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
                onClick={handleSubmitGrade}
                variant="contained"
                sx={{ textTransform: "capitalize" }}
              >
                Submit
              </Button>
            </Div>
          </Box>
        </Modal>
      </Div>
    </Div>
  );
};

export default GradeStudent;
