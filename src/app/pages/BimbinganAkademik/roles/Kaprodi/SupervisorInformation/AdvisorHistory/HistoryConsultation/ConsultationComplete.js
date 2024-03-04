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
import { Link, useLocation, useNavigate } from "react-router-dom";
import Div from "@jumbo/shared/Div";
import { format } from "date-fns";
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

const Consultation = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    getCurrentStatus();
    getMessage();
  }, [messages]);

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

  const getCurrentStatus = async () => {
    try {
      const response = await jwtAuthAxios.get(
        `/academic-consultation/detail/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );
      setStatus(response.data.data.status);
    } catch (error) {
      handleError(error);
    }
  };

  const getMessage = async () => {
    try {
      const response = await jwtAuthAxios.get(`/message/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      setMessages(response.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ paddingBottom: 2 }}>
        <StyledLink
          onClick={() =>
            navigate("/bimbingan-akademik/kaprodi/supervisor-information/")
          }
        >
          Supervisor Information
        </StyledLink>
        <StyledLink onClick={() => navigate(-1)}>History</StyledLink>
        <Typography color="text.primary">Consultation</Typography>
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
                  ? "Informatika"
                  : studentMajor === "SI"
                  ? "Sistem Informasi"
                  : studentMajor === "DKV"
                  ? "Teknologi Informasi"
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
