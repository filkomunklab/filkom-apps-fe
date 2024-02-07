import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Stack,
  Grid,
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
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";

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
  boxShadow: 24,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
};

const Consultation = () => {
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState([]);
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
    id,
  } = consultationDetails;

  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSecondModal = () => setOpenSecondModal(true);
  const handleCloseSecondModal = () => setOpenSecondModal(false);

  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleIconClick = () => {
    handleSubmit();
  };

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue !== "") {
      postMessage(trimmedValue);
      setInputValue("");
    } else {
      alert("Input tidak valid. Mohon masukkan pesan yang valid.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseSecondModal();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleOpenSecondModal]);

  useEffect(() => {
    getCurrentStatus();
    getMessage();
  }, [messages]);

  const getCurrentStatus = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_API}/academic-consultation/detail/${id}`
      );
      setStatus(response.data.data.status);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getMessage = async () => {
    try {
      const response = await axios.get(`${BASE_URL_API}/message/${id}`);
      setMessages(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const postMessage = async (content) => {
    try {
      const response = await axios.post(`${BASE_URL_API}/message`, {
        academic_consultation_id: id,
        content,
        sender_name: `${JSON.parse(localStorage.getItem("user")).name}`,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmitFirstModal = async () => {
    try {
      handleCloseFirstModal();
      await axios.patch(
        `${BASE_URL_API}/academic-consultation/${id}/status/complete`
      );
      handleOpenSecondModal();
    } catch (error) {
      console.error("ini error complete status:", error);
    }
  };
  const handleBreadcrumbsClick = () => {
    const { role } = JSON.parse(localStorage.getItem("user"));
    let path = "";

    if (role.includes("DEKAN")) {
      path = "/bimbingan-akademik/dekan/review-activities/consultation/";
    } else if (role.includes("KAPRODI")) {
      path = "/bimbingan-akademik/kaprodi/review-activities/consultation/";
    } else {
      path =
        "/bimbingan-akademik/dosen-pembimbing/review-activities/consultation/";
    }
    return <StyledLink to={path}>Student Consultation</StyledLink>;
  };

  return (
    <Div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ paddingBottom: 2 }}>
        {handleBreadcrumbsClick()}
        <Typography color="text.primary">View Consultation</Typography>
      </Breadcrumbs>
      <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
        Consultation
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ paddingTop: 3 }}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Student Name</Typography>
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
              <Typography>Supervisor Name</Typography>
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
              <Typography>student_major</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined">
              <Typography variant="body1" sx={{ p: 2 }}>
                {studentMajor === "IF"
                  ? "Informatics"
                  : studentMajor === "SI"
                  ? "Information System"
                  : studentMajor === "DKV"
                  ? "Information Technology"
                  : studentMajor}
              </Typography>
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Arrival Year</Typography>
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
              <Typography>Topic of Discussion</Typography>
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
              <Typography>Consultation Receiver</Typography>
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
              <Typography> Description</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined">
              <Typography
                variant="body1"
                sx={{
                  p: 2,
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                }}
              >
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
                    : status === "OnProcess"
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
                {messages &&
                  messages.map((value) => (
                    <Paper
                      elevation={0}
                      variant="outlined"
                      sx={{
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                        borderColor:
                          value.sender_name === studentName
                            ? "#000000"
                            : "#005FDB",
                        padding: "12px",
                        borderRadius: "4px",
                        backgroundColor: "#FFFFFF",
                        color: "#000000",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                          }}
                        >
                          {value.sender_name}
                        </Typography>
                        <Typography variant="caption">
                          {format(
                            new Date(value.createdAt),
                            "dd/MM/yyyy HH:mm"
                          )}
                        </Typography>
                      </div>
                      <Typography variant="body1">{value.content}</Typography>
                    </Paper>
                  ))}

                {status !== "Complete" && (
                  <>
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
                    <Grid
                      container
                      spacing={1}
                      sx={{ paddingTop: "20px" }}
                      justifyContent="flex-end"
                    >
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
                            </Grid>
                          </Grid>
                        </div>
                      </Modal>
                    </Grid>
                  </>
                )}

                {status === "Complete" && (
                  <Typography
                    sx={{
                      color: "darkgray",
                      textAlign: "center",
                    }}
                  >
                    Your session has ended.
                  </Typography>
                )}
              </div>
            </Stack>
          </Grid>
        </Stack>
      </Grid>
    </Div>
  );
};

export default Consultation;
