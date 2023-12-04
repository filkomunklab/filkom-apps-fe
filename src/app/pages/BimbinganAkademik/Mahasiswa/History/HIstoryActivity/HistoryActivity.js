import React, { useState } from "react";
import {
  Typography,
  Stack,
  Grid,
  Breadcrumbs,
  experimentalStyled as styled,
  Paper,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const Activity = () => {
  const navigate = useNavigate();
  const [isPreRegistration, setIsPreRegistration] = useState(false);
  const [isGradeSubmission, setIsGradeSubmission] = useState(true);

  const getActivity = async () => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer token_apa`,
      };

      const response = await axios.get(`${BASE_URL_API}/bla/bla/bla`, {
        headers,
      });

      const { status, message, data, code } = response.data;

      if (status === "OK") {
        //isi status atau code tergantung API
        //simpan dalam usestate contoh:
        //setActivity = data
        //tambahkan handle lain jika perlu (grade, attendance, dll)
      } else {
        //tambah handler jika respon lain, kalau tidak perlu hapus saja
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>History</StyledLink>
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
                PENGUMPULAN KARTU RENCANA STUDI SEMESTER GANJIL TAHUN 2022/2023
                GELOMBANG 1
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
                Diinfokan untuk semua mahasiswa yang akan mendaftar kuliah
                semester depan semester I 2023/2024 WAJIB untuk mengisi
                PreRegistration segera. Mohon memperhatikan tahun kurikulum anda
                agar dapat mengisi pada form yang benar. Perhatikan due-date
                yang ada. <br />
                <br />
                Note: Jika tidak mengisi, maka anda tidak bisa untuk kontrak
                mata kuliah di semester yang akan datang. Terima Kasih.
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Due Date</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                Senin, 22 September 2023
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Clock (optional)</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                18:00
              </Typography>
            </Paper>
          </Stack>
        </Grid>
        <Grid container paddingTop={4} paddingLeft={2} gap={3}>
          {/* <Grid item xs={12} md={6} xl={4}> */}
          {isPreRegistration && (
            <FormGroup sx={{ paddingLeft: "9px" }}>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    size="small"
                    color="primary"
                    disabled
                  />
                }
                label="Add Pre-registration Page"
                sx={{ whiteSpace: "nowrap", gap: 2 }}
              />
            </FormGroup>
          )}
          {/* </Grid> */}
          {/* <Grid item xs={12} md={6} xl={4}> */}
          {isGradeSubmission && (
            <FormGroup sx={{ paddingLeft: "9px" }}>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    size="small"
                    color="primary"
                    disabled
                  />
                }
                label="Add Grade Submission Page"
                sx={{ whiteSpace: "nowrap", gap: 2 }}
              />
            </FormGroup>
          )}
          {/* </Grid> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Activity;
