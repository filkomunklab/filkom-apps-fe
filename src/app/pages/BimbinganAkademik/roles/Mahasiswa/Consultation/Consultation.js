import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import SuccessOrError from "app/pages/BimbinganAkademik/components/Modal/SuccessOrError";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

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

const Consultation = () => {
  const navigate = useNavigate();

  //inisialisasi get data
  const [supervisorData, setSupervisorData] = useState("");
  const [kaprodiData, setKaprodiData] = useState("");
  const [dekanData, setDekanData] = useState("");

  //inisialisasi
  const [topic, setTopic] = useState("");
  const [receiver, setReceiver] = useState("");
  const [description, setDescription] = useState("");
  const [showLabel, setShowLabel] = useState(true);
  const [showLabel2, setShowLabel2] = useState(true);
  const [loading, setLoading] = useState(false);
  const [informationStudent, setInformationStudent] = useState([]);

  //modal
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSuccessModal = () => setOpenSuccessModal(true);
  const handleCloseSuccessModal = () => setOpenSuccessModal(false);
  const handleOpenErrorModal = () => setOpenErrorModal(true);
  const handleCloseErrorModal = () => setOpenErrorModal(false);

  const handleSubmitFirstModal = async () => {
    try {
      //validasi
      if (!topic || !receiver || !description) {
        alert("Please fill in all required fields.");
        return;
      }
      const { id } = JSON.parse(localStorage.getItem("user"));
      const trimmedValue = description.trim();
      if (trimmedValue !== "") {
        handleCloseFirstModal();
        setLoading(true);
        const arrayReceiver = receiver.split("|");
        const receiverId = arrayReceiver[0];
        const receiver_name = arrayReceiver[1];
        //bodyRequest
        const consultationData = {
          topic,
          receiver_name,
          receiverId,
          student_arrival_year: informationStudent.arrivalYear,
          student_major: informationStudent.major,
          student_name: `${informationStudent.firstName} ${informationStudent.lastName}`,
          studentId: id,
          supervisor_name: `${supervisorData.teacher.firstName} ${supervisorData.teacher.lastName}`,
          description: trimmedValue,
        };
        try {
          const consultationResult = await jwtAuthAxios.post(
            `/academic-consultation`,
            consultationData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (consultationResult.data.status === "OK") {
            handleOpenSuccessModal();
            setTopic("");
            setReceiver("");
            setShowLabel(true);
            setShowLabel2(true);
            setDescription("");
            setLoading(false);
          }
        } catch (error) {
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
            handleOpenErrorModal();
            setLoading(false);
          }
        }
      } else {
        alert("Input tidak valid. Mohon masukkan pesan yang valid.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 401 &&
        error.response.status <= 403
      ) {
        console.log("You don't have permission to access this page");
        navigate(`/`);
        return;
      } else {
        console.log("ini error: ", error);
        return;
      }
    }
  };

  const getInformationStudent = async () => {
    try {
      const result = await jwtAuthAxios.get(
        `/student/${JSON.parse(localStorage.getItem("user")).nim}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (result.data.status === "OK") {
        const { guidanceClassId } = JSON.parse(localStorage.getItem("user"));
        const response1 = await jwtAuthAxios.get(
          `/guidance-class/${guidanceClassId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const response2 = await jwtAuthAxios.get(
          `/employee/head/${result.data.data.major}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response1.data.status === "OK") {
          const supervisorData = response1.data.data;
          setSupervisorData(supervisorData);
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
        }
        setInformationStudent(result.data.data);
      }
    } catch (error) {
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
      }
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
                {informationStudent?.lastName}, {informationStudent?.firstName}
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
                  ? `${supervisorData?.teacher?.lastName}, ${supervisorData?.teacher?.firstName}`
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
                {informationStudent?.major === "IF"
                  ? "Informatics"
                  : informationStudent?.major === "SI"
                  ? "Information System"
                  : informationStudent?.major === "DKV"
                  ? "Information Technology"
                  : informationStudent?.major}
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
                {informationStudent?.arrivalYear}
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
                (supervisorData?.teacher?.firstName ===
                  kaprodiData?.firstName &&
                  supervisorData?.teacher?.lastName ===
                    kaprodiData?.lastName) ||
                (supervisorData?.teacher?.firstName === dekanData?.firstName &&
                  supervisorData?.teacher?.lastName === dekanData?.lastName) ? (
                  ""
                ) : (
                  <MenuItem
                    value={`${supervisorData?.teacherId}|${supervisorData?.teacher?.lastName}, ${supervisorData?.teacher?.firstName}`}
                  >
                    Academic Supervisor
                  </MenuItem>
                )
              ) : (
                ""
              )}
              <MenuItem
                value={`${kaprodiData?.id}|${kaprodiData?.lastName}, ${kaprodiData?.firstName}`}
              >
                Head of Study Program
              </MenuItem>
              <MenuItem
                value={`${dekanData?.id}|${dekanData?.lastName}, ${dekanData?.firstName}`}
              >
                Faculty Dean
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
          </Box>
        </Grid>

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
              Submit Consultation?
            </Typography>
            <Typography
              id="modal-modal-description"
              style={{ marginTop: "16px", marginBottom: "15px" }}
            >
              Are you sure you want to submit this consultation? The
              consultation that have been submitted cannot be edited again.
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
        <SuccessOrError
          open={openSuccessModal}
          handleClose={handleCloseSuccessModal}
          title="Successful Submission!"
          description="You have successfully submitted your consultation request."
        />
        <SuccessOrError
          open={openErrorModal}
          handleClose={handleCloseErrorModal}
          title="Error Submission!"
          description="Error: Failed to create Consultation. Please try again."
        />
      </Grid>
    </div>
  );
};

export default Consultation;
