import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Stack,
  Grid,
  Box,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import CircularProgress from "@mui/material/CircularProgress";

const requiredStyle = {
  color: "red",
  marginLeft: "4px",
};

function RTypography({ children, sx }) {
  return (
    <Typography variant="body1" sx={sx}>
      {children}
      <span style={requiredStyle}>*</span>
    </Typography>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
};

const style2 = {
  position: "fixed",
  top: "15%",
  right: "2%",
  width: 400,
  boxShadow: 24,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
};

const Consultation = () => {
  const [supervisorData, setSupervisorData] = useState("");
  const [kaprodiData, setKaprodiData] = useState("");
  const [dekanData, setDekanData] = useState("");

  const [topic, setTopic] = useState("");
  const [receiver, setReceiver] = useState("");
  const [description, setDescription] = useState("");

  const [showLabel, setShowLabel] = useState(true);
  const [showLabel2, setShowLabel2] = useState(true);

  const [openFirstModal, setOpenFirstModal] = React.useState(false);
  const [openSecondModal, setOpenSecondModal] = React.useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleOpenErrorModal = () => setOpenErrorModal(true);
  const handleCloseErrorModal = () => setOpenErrorModal(false);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSecondModal = () => setOpenSecondModal(true);
  const handleCloseSecondModal = () => {
    if (isMounted) {
      setOpenSecondModal(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseSecondModal();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleOpenSecondModal]);

  const handleSubmitFirstModal = async () => {
    if (!topic || !receiver || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    const trimmedValue = description.trim();

    if (trimmedValue !== "") {
      handleCloseFirstModal();
      setLoading(true);

      const arrayReceiver = receiver.split("|");
      const receiver_nik = arrayReceiver[0];
      const receiver_name = arrayReceiver[1];

      const consultationData = {
        topic,
        receiver_name,
        receiver_nik,
        student_arrival_year: informationStudent.arrival_Year,
        student_major: informationStudent.major,
        student_name: `${informationStudent.firstName} ${informationStudent.lastName}`,
        student_nim: informationStudent.nim,
        supervisor_name: `${supervisorData.firstName} ${supervisorData.lastName}`,
        description: trimmedValue,
      };
      // console.log("consultationData: ", consultationData);

      try {
        const consultationResult = await axios.post(
          `${BASE_URL_API}/academic-consultation`,
          consultationData
        );
        // console.log("ini yang nanti di post: ", consultationResult);

        if (consultationResult.data.status === "OK") {
          handleOpenSecondModal();
          setTopic("");
          setReceiver("");
          setShowLabel(true);
          setShowLabel2(true);
          setDescription("");

          setLoading(false);
        }
      } catch (error) {
        console.log("ini error: ", error.consultationResult);
        console.error("Error response:", error);
        handleOpenErrorModal();
        setLoading(false);
      }
    } else {
      alert("Input tidak valid. Mohon masukkan pesan yang valid.");
    }
  };

  const [informationStudent, setInformationStudent] = useState([]);

  const getInformationStudent = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL_API}/student/${
          JSON.parse(localStorage.getItem("user")).nim
        }`
      );
      // console.log("ini data by nim", result);

      if (result.data.status === "OK") {
        const response1 = await axios.get(
          `${BASE_URL_API}/employee/profile/${result.data.data.employeeNik}` //employeeId itu nik dosen
        );
        // console.log("ini response1.data", response1.data);
        const response2 = await axios.get(
          `${BASE_URL_API}/employee/head/${result.data.data.major}`
        );
        // console.log("ini response2.data:", response2.data);

        if (response1.data.status === "OK") {
          const supervisorData = response1.data.data;
          setSupervisorData(supervisorData);
        } else {
          console.log(response1);
        }

        if (response2.data.status === "OK") {
          const kaprodiData = response2.data.data.find(
            (item) => item.role === "kaprodi"
          );
          setKaprodiData(kaprodiData);
          const dekanData = response2.data.data.find(
            (item) => item.role === "dekan"
          );
          setDekanData(dekanData);
        } else {
          console.log(response2);
        }
        setInformationStudent(result.data.data);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Error response:", error.response);
    }
  };

  useEffect(() => {
    getInformationStudent();
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
      <Typography
        sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: 500 }}
      >
        Consultation
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ paddingTop: 3 }}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <RTypography>Student Name</RTypography>
            </Grid>

            <Paper elevation={0} variant="outlined">
              <Typography variant="body1" sx={{ p: 2 }}>
                {informationStudent.lastName}, {informationStudent.firstName}
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ paddingTop: 3 }}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <RTypography>Supervisor Name</RTypography>
            </Grid>

            <Paper elevation={0} variant="outlined">
              <Typography variant="body1" sx={{ p: 2 }}>
                {supervisorData
                  ? `${supervisorData.lastName}, ${supervisorData.firstName}`
                  : "-"}
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <RTypography>Major</RTypography>
            </Grid>

            <Paper elevation={0} variant="outlined">
              <Typography variant="body1" sx={{ p: 2 }}>
                {informationStudent.major === "IF"
                  ? "Informatics"
                  : informationStudent.major === "SI"
                  ? "Information System"
                  : informationStudent.major === "DKV"
                  ? "Information Technology"
                  : informationStudent.major}
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <RTypography>Arrival Year</RTypography>
            </Grid>

            <Paper elevation={0} variant="outlined">
              <Typography variant="body1" sx={{ p: 2 }}>
                {informationStudent.arrival_Year}
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ paddingBottom: 3 }}>
            <RTypography>Topic of Discussion</RTypography>
            <TextField
              sx={{ width: "100%", backgroundColor: "white" }}
              id="outlined-select-topic"
              select
              label={showLabel ? "Select Topic" : ""}
              value={topic}
              onChange={(event) => {
                setTopic(event.target.value);
                setShowLabel(false);
              }}
              InputLabelProps={{
                shrink: false,
              }}
            >
              <MenuItem value="academic">Academic</MenuItem>
              <MenuItem value="non-academic">Non-academic</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </TextField>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ paddingBottom: 3 }}>
            <RTypography>Consultation receiver</RTypography>
            <TextField
              sx={{ width: "100%", backgroundColor: "white" }}
              id="outlined-select-receiver"
              select
              label={showLabel2 ? "Select Receiver" : ""}
              value={receiver}
              onChange={(event) => {
                setReceiver(event.target.value);
                setShowLabel2(false);
              }}
              InputLabelProps={{
                shrink: false,
              }}
            >
              {supervisorData ? (
                (supervisorData.firstName === kaprodiData.firstName &&
                  supervisorData.lastName === kaprodiData.lastName) ||
                (supervisorData.firstName === dekanData.firstName &&
                  supervisorData.lastName === dekanData.lastName) ? (
                  ""
                ) : (
                  <MenuItem
                    value={`${supervisorData.nik}|${supervisorData.lastName}, ${supervisorData.firstName}`}
                  >
                    {`${supervisorData.lastName}, ${supervisorData.firstName}`}
                  </MenuItem>
                )
              ) : (
                ""
              )}
              {/* <MenuItem value="dospem">
                {supervisorData
                  ? `${supervisorData.lastName}, ${supervisorData.firstName}`
                  : "-"}
              </MenuItem> */}
              <MenuItem
                value={`${kaprodiData.nik}|${kaprodiData.lastName}, ${kaprodiData.firstName}`}
              >
                {kaprodiData.lastName}, {kaprodiData.firstName}
              </MenuItem>
              <MenuItem
                value={`${dekanData.nik}|${dekanData.lastName}, ${dekanData.firstName}`}
              >
                {dekanData.lastName}, {dekanData.firstName}
              </MenuItem>
            </TextField>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={2}>
            <RTypography>Description</RTypography>
            <TextField
              sx={{ backgroundColor: "white" }}
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter message ..."
              fullWidth
              multiline
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/bimbingan-akademik/consultation/"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
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
                Submit
              </Button>
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
                    Confirm request?
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    style={{ marginTop: "16px", marginBottom: "20px" }}
                  >
                    Are you sure you want to submit this request? Forms that
                    have been submitted cannot be edited again.
                  </Typography>

                  <Grid container spacing={1} justifyContent="flex-end">
                    <Grid item>
                      <Button
                        onClick={handleCloseFirstModal}
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "5px",
                          boxShadow: 4,
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
                          boxShadow: 4,
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
              <Modal
                open={openSecondModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div style={style2}>
                  <IconButton
                    edge="end"
                    color="#D9D9D9"
                    onClick={handleCloseSecondModal}
                    aria-label="close"
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "20px",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    component="h2"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    Successfull Request!
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    style={{ marginTop: "16px", marginBottom: "20px" }}
                  >
                    You have successfully made a consultation request.
                  </Typography>
                </div>
              </Modal>
              <Modal
                open={openErrorModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div style={style2}>
                  <IconButton
                    edge="end"
                    color="#D9D9D9"
                    onClick={handleCloseErrorModal}
                    aria-label="close"
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "20px",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    component="h2"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    Error Submission!
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    style={{ marginTop: "16px", marginBottom: "20px" }}
                  >
                    Error: Failed to create Consultation. Please try again.
                  </Typography>
                </div>
              </Modal>
            </Box>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Consultation;
