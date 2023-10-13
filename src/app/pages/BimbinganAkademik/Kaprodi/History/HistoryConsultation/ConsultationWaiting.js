import React from "react";
import {
  Typography,
  Stack,
  Grid,
  Breadcrumbs,
  experimentalStyled as styled,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const ConsultationWaiting = () => {
  const handleClick = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/history">History</StyledLink>
          <Typography color="text.primary">Consultation</Typography>
        </Breadcrumbs>
      </div>
      <Typography
        sx={{ fontSize: "24px", fontWeight: 500, paddingTop: "20px" }}
      >
        Consultation
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ paddingTop: 3 }}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Student Name</Typography>
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
              <Typography>Supervisor Name</Typography>
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
              <Typography>Major</Typography>
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
              <Typography>Arrival Year</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                2020
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Topic of Discussion</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                Academic
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Consultation Receiver</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                Poluan, Jeremy Kenny, S.Kom, MBA
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Message</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                Syalom sir, mohon maaf mengganggu, saya ingin melakukan
                konsultasi terkait perkuliahan saya. Saya mengalami krisis dalam
                hal keuangan. orang tua saya di PHK dan saya rasa saya tidak
                busa melanjutkan perkuliahan saya. Saya ingin membicarakan hal
                ini secara langsung dengan sir, selaku dosen pembimbing saya.
                Apakah sir punya waktu luang? Terima kasih sebelumnya.
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
                color: "#FFCC00",
                marginLeft: 1,
              }}
            >
              Waiting
            </Typography>
          </Grid>

          <Paper elevation={0} variant="outlined" fullWidth>
            <Typography variant="body1" sx={{ p: 2 }}>
              Silakan menunggu balasan dari penerima konsultasi
            </Typography>
          </Paper>
        </Stack>
      </Grid>
    </div>
  );
};

export default ConsultationWaiting;
