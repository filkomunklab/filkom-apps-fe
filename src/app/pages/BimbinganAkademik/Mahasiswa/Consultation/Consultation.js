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
  const [topic, setTopic] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [showLabel, setShowLabel] = useState(true);
  const [showLabel2, setShowLabel2] = useState(true);

  const [openFirstModal, setOpenFirstModal] = React.useState(false);
  const [openSecondModal, setOpenSecondModal] = React.useState(false);

  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSecondModal = () => setOpenSecondModal(true);
  const handleCloseSecondModal = () => setOpenSecondModal(false);

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

    setTopic("");
    setReceiver("");
    setShowLabel(true);
    setShowLabel2(true);
    setMessage("");

    handleOpenSecondModal();
  };

  return (
    <div>
      <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
        Consultation
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ paddingTop: 3 }}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <RTypography>Student Name</RTypography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                Siregar, Marchelino Feraldy
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ paddingTop: 3 }}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <RTypography>Supervisor Name</RTypography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                Poluan, Jeremy Kenny, S.Kom, MBA
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <RTypography>Major</RTypography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                Informatics
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <RTypography>Arrival Year</RTypography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                2020
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
              <MenuItem value="dospem">
                Dosen Pembimbing (Di isi Otomatis)
              </MenuItem>
              <MenuItem value="kaprodi">
                Kepala Program Study (Di isi Otomatis)
              </MenuItem>
              <MenuItem value="dekan">Dekan (Di isi Otomatis)</MenuItem>
            </TextField>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={2}>
            <Typography>Message</Typography>
            <TextField
              sx={{ backgroundColor: "white" }}
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter message ..."
              fullWidth
              multiline
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
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
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/bimbingan-akademik/consultation/"
              >
                <Button
                  sx={{
                    backgroundColor: "darkgrey",
                    borderRadius: "24px",
                    color: "black",
                    whiteSpace: "nowrap",
                    minWidth: "132px",
                    fontSize: "12px",
                    padding: "10px",
                    marginRight: "24px",

                    "&:hover": {
                      backgroundColor: "grey",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Link>

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
            </Box>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Consultation;
