import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Grid,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  experimentalStyled as styled,
  Paper,
  Checkbox,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import SuccessOrError from "app/pages/BimbinganAkademik/components/Modal/SuccessOrError";
import { handleAuthenticationError } from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
  maxWidth: "90%",
  "@media (max-width: 768px)": {
    maxWidth: "80%",
  },
  "@media (max-width: 480px)": {
    maxWidth: "80%",
  },
};

const ViewActivity = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { activityId } = location?.state || "-";
  const [activityDetail, setActivityDetail] = useState("");
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  //modal
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenErrorModal = () => setOpenErrorModal(true);
  const handleCloseErrorModal = () => setOpenErrorModal(false);

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
        handleOpenErrorModal();
        setLoading(false);
        return;
      }
    }
  };

  const handleSubmitFirstModal = async () => {
    handleCloseFirstModal();
    setLoading(true);
    try {
      const response = await jwtAuthAxios.patch(
        `/activity/take-attendance/${activityId}`,
        { members: selectedStudents },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );
      if (response.data.status === "OK") {
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.error("error: ");
        handleOpenErrorModal();
        setLoading(false);
        return;
      }
    }
  };

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll);
    setSelectedStudents(
      selectedAll
        ? []
        : activityDetail.ActivityMember.map((student) => student.studentId)
    );
  };

  const handleSelectStudent = (studentId) => {
    const updatedSelectedStudents = selectedStudents.includes(studentId)
      ? selectedStudents.filter((id) => id !== studentId)
      : [...selectedStudents, studentId];

    setSelectedAll(
      updatedSelectedStudents.length === activityDetail?.ActivityMember?.length
    );
    setSelectedStudents(updatedSelectedStudents);
  };

  const handleClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    getActivityDetail();
    return () => controller.abort();
  }, []);

  return (
    <div>
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
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>Current Activities</StyledLink>
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
          <Stack spacing={2} sx={{ paddingTop: 3 }}>
            <Grid sx={{ display: "flex", direction: "row" }}>
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
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Descriptions</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                {activityDetail?.description}
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
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

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Clock</Typography>
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
      </Grid>
      {activityDetail?.isAttendance === true && (
        <div>
          <Typography sx={{ fontSize: "24px", mt: 4, mb: 3, fontWeight: 400 }}>
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
                  {activityDetail?.ActivityMember[0]?.presence ? null : (
                    <TableCell
                      sx={{
                        backgroundColor: "rgba(26, 56, 96, 0.1)",
                      }}
                    >
                      <Checkbox
                        checked={selectedAll}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                  )}
                  <TableCell
                    sx={{
                      backgroundColor: "rgba(26, 56, 96, 0.1)",
                      width: "30px",
                    }}
                  >
                    Number
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "rgba(26, 56, 96, 0.1)",
                    }}
                  >
                    Student Name
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "rgba(26, 56, 96, 0.1)",
                    }}
                  >
                    NIM
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "rgba(26, 56, 96, 0.1)",
                    }}
                  >
                    Prodi
                  </TableCell>
                  {activityDetail?.ActivityMember[0]?.presence ? (
                    <TableCell
                      sx={{
                        backgroundColor: "rgba(26, 56, 96, 0.1)",
                      }}
                    >
                      Status
                    </TableCell>
                  ) : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {activityDetail.ActivityMember?.map((student, index) => (
                  <TableRow key={`${index}-${student.studentId}`}>
                    {student.presence === null ? (
                      <TableCell sx={{ width: "40px" }}>
                        <Checkbox
                          checked={selectedStudents.includes(student.studentId)}
                          onChange={() =>
                            handleSelectStudent(student.studentId)
                          }
                        />
                      </TableCell>
                    ) : null}
                    <TableCell sx={{ width: "30px" }}>{index + 1}</TableCell>
                    <TableCell>
                      {student.student.lastName}, {student.student.firstName}
                    </TableCell>
                    <TableCell>{student.student.nim}</TableCell>
                    <TableCell>
                      {student.student.major === "IF"
                        ? "Informatika"
                        : student.student.major === "SI"
                        ? "Sistem Informasi"
                        : student.student.major === "TI"
                        ? "Teknologi Informasi"
                        : student.student.major}
                    </TableCell>
                    {student.presence !== null && (
                      <TableCell sx={{ width: "80px" }}>
                        <Chip
                          label={
                            student.presence === true
                              ? "Present"
                              : student.presence === false
                              ? "Absent"
                              : "null"
                          }
                          variant="filled"
                          color={
                            student.presence === true
                              ? "success"
                              : student.presence === false
                              ? "error"
                              : "default"
                          }
                        />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid
            sx={{
              padding: 2,
              paddingTop: "30px",
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "60px",
            }}
          >
            {activityDetail?.ActivityMember[0]?.presence ? null : (
              <Button
                onClick={handleOpenFirstModal}
                sx={{
                  backgroundColor: "#006AF5",
                  borderRadius: "24px",
                  color: "white",
                  whiteSpace: "nowrap",
                  minWidth: "132px",
                  fontSize: "12px",
                  padding: "10px",
                  gap: "6px",

                  "&:hover": {
                    backgroundColor: "#025ED8",
                  },
                }}
              >
                Submit Attendance
              </Button>
            )}
          </Grid>
        </div>
      )}

      <Modal
        open={openFirstModal}
        onClose={handleCloseFirstModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
            }}
          >
            Submit the Attendance?
          </Typography>
          <Typography
            id="modal-modal-description"
            style={{ marginTop: "16px", marginBottom: "20px" }}
          >
            Are you sure you want to submit this? Forms that have been submitted
            cannot be edited again.
          </Typography>

          <Grid container spacing={1} justifyContent="flex-end">
            <Grid item>
              <Button
                onClick={handleCloseFirstModal}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  color: "black",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "lightgrey",
                  },
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleSubmitFirstModal}
                sx={{
                  backgroundColor: "#006AF5",
                  borderRadius: "5px",
                  color: "white",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#025ED8",
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
      <SuccessOrError
        open={openErrorModal}
        handleClose={handleCloseErrorModal}
        title="Error Submission!"
        description="Error: Failed to enter the student attendance form. Please try again."
      />
    </div>
  );
};

export default ViewActivity;
