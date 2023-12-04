import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Grid,
  Breadcrumbs,
  experimentalStyled as styled,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";
import { format } from "date-fns";
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const ConsultationComplete = () => {
  const navigate = useNavigate();
  const currentDate = format(new Date(), "dd/MM/yyyy HH:mm");

  const getConsultation = async() =>{
    try{
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer token_apa`,
      }

      const response = await axios(`${BASE_URL_API}/bla/bla/bla`,{headers})

      const {status, message, data, code} = response.data;

      if(status === 'OK'){ //isi status atau code tergantung API
        //simpan dalam usestate contoh:
        //setConsultation = data
        //tambahkan handle lain jika perlu
      }else{
        //tambah handler jika respon lain, kalau tidak perlu hapus saja
        console.log(response)
      }
    }catch(error){
      console.log(error)
    }
  }

  const handleClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>History</StyledLink>
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
        <Grid item xs={12}>
          <Stack spacing={2} sx={{ paddingTop: 4 }}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Status:
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "#005FDB",
                  marginLeft: 1,
                }}
              >
                Complete
              </Typography>
            </Grid>

            <Paper
              elevation={0}
              variant="outlined"
              fullWidth
              sx={{ borderColor: "#005FDB" }}
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
                    padding: "8px",
                    fontWeight: 600,
                  }}
                >
                  Poluan, Jeremy Kenny
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    padding: "8px",
                  }}
                >
                  {currentDate}
                </Typography>
              </div>

              <Typography variant="body1" sx={{ padding: "8px" }}>
                Saya sedang tidak berada di daerah kampus. Lagi healing di
                Jerman. Nanti kita atur pertemuan lagi.
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              variant="outlined"
              fullWidth
              sx={{ borderColor: "#192434" }}
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
                    padding: "8px",
                    fontWeight: 600,
                  }}
                >
                  Siregar, Marchelino Feraldy
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    padding: "8px",
                  }}
                >
                  {currentDate}
                </Typography>
              </div>

              <Typography variant="body1" sx={{ padding: "8px" }}>
                Baik sir. Terima kasih.
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              variant="outlined"
              fullWidth
              sx={{ borderColor: "#192434" }}
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
                    padding: "8px",
                    fontWeight: 600,
                  }}
                >
                  Siregar, Marchelino Feraldy
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    padding: "8px",
                  }}
                >
                  {currentDate}
                </Typography>
              </div>

              <Typography variant="body1" sx={{ padding: "8px" }}>
                Maaf sebelumnya, kira-kira bisa hari apa ya sir saya buka konsul
                lagi dengan sir?
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              variant="outlined"
              fullWidth
              sx={{ borderColor: "#005FDB" }}
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
                    padding: "8px",
                    fontWeight: 600,
                  }}
                >
                  Poluan, Jeremy Kenny
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    padding: "8px",
                  }}
                >
                  {currentDate}
                </Typography>
              </div>

              <Typography variant="body1" sx={{ padding: "8px" }}>
                Nanti hari Kamis saya kabari lagi.
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              variant="outlined"
              fullWidth
              sx={{ borderColor: "#192434" }}
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
                    padding: "8px",
                    fontWeight: 600,
                  }}
                >
                  Siregar, Marchelino Feraldy
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    padding: "8px",
                  }}
                >
                  {currentDate}
                </Typography>
              </div>

              <Typography variant="body1" sx={{ padding: "8px" }}>
                Oh Iya baik sir. Terima kasih.
              </Typography>
            </Paper>
            <Typography
              sx={{
                color: "darkgray",
                textAlign: "center",
              }}
            >
              Your session has ended.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default ConsultationComplete;
