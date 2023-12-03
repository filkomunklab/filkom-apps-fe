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
  Breadcrumbs,
  experimentalStyled as styled,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Div from "@jumbo/shared/Div";
import SendIcon from "@mui/icons-material/Send";
import { format } from "date-fns";
import { to } from "react-spring";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

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
  const [status, setStatus] = useState("Waiting");

  const [openFirstModal, setOpenFirstModal] = React.useState(false);
  const [openSecondModal, setOpenSecondModal] = React.useState(false);

  const { state } = useLocation();
  const consultationDetails = state ? state.consultationDetails : {};
  const {
    studentName,
    supervisorName,
    studentMajor,
    studentArrivalYear,
    topic,
    receiverName,
    description,
  } = consultationDetails;

  console.log("ini", consultationDetails);

  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSecondModal = () => setOpenSecondModal(true);
  const handleCloseSecondModal = () => setOpenSecondModal(false);

  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleIconClick = () => {
    handleSubmit();
  };
  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      setSubmittedValue(inputValue);
      setInputValue("");
      setStatus("On-Process");
    }
  };
  const currentDate = format(new Date(), "dd/MM/yyyy HH:mm");

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseSecondModal();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleOpenSecondModal]);

  const handleSubmitFirstModal = () => {
    handleCloseFirstModal();
    setStatus("Complete");
    handleOpenSecondModal();
  };

  return (
    <Div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ paddingBottom: 2 }}>
        <StyledLink to="/bimbingan-akademik/dekan/review-activities/consultation/">
          Student Consultation
        </StyledLink>
        <Typography color="text.primary">View Consultation</Typography>
      </Breadcrumbs>
      <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
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
                {studentName}
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
                {supervisorName}
              </Typography>
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <RTypography>student_major</RTypography>
            </Grid>

            <Paper elevation={0} variant="outlined">
              <Typography variant="body1" sx={{ p: 2 }}>
                {studentMajor}
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
                {studentArrivalYear}
              </Typography>
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <RTypography>Topic of Discussion</RTypography>
            </Grid>

            <Paper elevation={0} variant="outlined">
              <Typography variant="body1" sx={{ p: 2 }}>
                {topic}
              </Typography>
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <RTypography>Consultation Receiver</RTypography>
            </Grid>

            <Paper elevation={0} variant="outlined">
              <Typography variant="body1" sx={{ p: 2 }}>
                {receiverName}
              </Typography>
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <RTypography> Description</RTypography>
            </Grid>

            <Paper elevation={0} variant="outlined">
              <Typography variant="body1" sx={{ p: 2 }}>
                {description}
              </Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} sx={{ paddingTop: 6 }}>
          <Grid sx={{ display: "flex", direction: "row" }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Status:
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color:
                  status === "Waiting"
                    ? "#FFCC00"
                    : status === "On-Process"
                    ? "#0A7637"
                    : status === "Complete"
                    ? "blue"
                    : "#005FDB",
                marginLeft: 1,
              }}
            >
              {status}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} sx={{ paddingBottom: 3 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {submittedValue && (
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{
                      borderColor: "#005FDB",
                      padding: "12px",
                      borderRadius: "4px",
                      backgroundColor: "#FFFFFF",
                      color: "#000000",
                    }}
                  >
                    <Typography variant="body1">{submittedValue}</Typography>
                  </Paper>
                )}

                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Enter Message..."
                  fullWidth
                  multiline
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleIconClick}>
                        <SendIcon style={{ color: "#9E9E9E" }} />
                      </IconButton>
                    ),
                  }}
                  onKeyPress={handleKeyPress}
                />
                <Grid container spacing={1} justifyContent="flex-end">
                  <Button
                    onClick={handleOpenFirstModal}
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
                    End Conversation
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
                        End Session?
                      </Typography>
                      <Typography
                        id="modal-modal-description"
                        style={{ marginTop: "16px", marginBottom: "20px" }}
                      >
                        Are you sure you want to end the Conversation?
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
                          {/* <Link
                            style={{ textDecoration: "none", color: "white" }}
                            to="/bimbingan-akademik/consultation/"
                          > */}
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
                            Yes
                          </Button>
                          {/* </Link> */}
                        </Grid>
                      </Grid>
                    </div>
                  </Modal>
                </Grid>
              </div>
            </Stack>
          </Grid>
        </Stack>
      </Grid>
    </Div>
  );
};

export default Consultation;
