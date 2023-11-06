import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  experimentalStyled as styled,
} from "@mui/material";
import { Link } from "react-router-dom";
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(0, 0, 0, 1)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const RecentActivities = () => {
  return (
    <div>
      <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
        Current Activities
      </Typography>
      <Typography
        sx={{
          paddingTop: "22px",
          paddingBottom: "32px",
          fontSize: "15px",
          fontWeight: 400,
          color: "rgba(27, 43, 65, 0.69)",
        }}
      >
        Currently, you are on the Current Activities page. On this page, you can
        review the activities you've created, take attendance for students, and
        respond to ongoing consultations.
      </Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 2000,
          bgcolor: "background.paper",
          paddingTop: "0px",
          paddingBottom: "0px",
        }}
      >
        <Box
          sx={{
            height: "50px",
            backgroundColor: "rgba(235, 235, 235, 1)",
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
          }}
        >
          <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>
            Tuesday, Feb 2, 2024
          </Typography>
        </Box>

        <ListItem component={Link} button to="view-consultation">
          <ListItemText
            primary={
              <StyledLink to="view-consultation">
                Consultation - Adzana, Shaliha Gracia
              </StyledLink>
            }
            secondary={
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "rgba(27, 43, 65, 0.69)",
                }}
              >
                Syalom sir, mohon maaf mengganggu, saya ingin melakukan
                konsultasi terkait perkuliahan saya. Saya mengalami krisis dalam
                hal keuangan. orang tua saya di PHK dan saya rasa saya tidak
                bisa melanjutkan perkuliahan saya. Saya ingin membicarakan hal
                ini secara langsung dengan sir, selaku dosen pembimbing saya.
                Apakah sir punya waktu luang? Terima kasih sebelumnya.
              </Typography>
            }
          />
          <Box sx={{ marginLeft: "auto", width: "45%", textAlign: "right" }}>
            <ListItemText secondary="Feb 2 2024, 14:00" />
          </Box>
        </ListItem>

        <Divider component="li" variant="inset" />

        <Box
          sx={{
            height: "50px",
            backgroundColor: "rgba(235, 235, 235, 1)",
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
          }}
        >
          <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>
            Friday, Jan 29, 2024
          </Typography>
        </Box>
        <ListItem component={Link} button to="view-activity">
          <ListItemText
            primary={
              <StyledLink to="view-activity">
                Pengumpulan Kartu Rencana Studi Semester ganjil tahun 2022/2023
                Gelombang 1
              </StyledLink>
            }
            secondary={
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "rgba(27, 43, 65, 0.69)",
                }}
              >
                Diinfokan untuk semua mahasiswa yang akan mendaftar kuliah
                semester depan semester I 2023/2024 *wajib* untuk mengisi
                PreRegistration segera. Mohon memperhatikan tahun kurikulum anda
                agar dapat mengisi pada form yang benar. Perhatikan due-date
                yang ada. Note: Jika tidak mengisi, maka anda tidak bisa untuk
                kontrak mata kuliah di semester yang akan datang. Terima Kasih.{" "}
              </Typography>
            }
          />
          <Box sx={{ width: "45%", textAlign: "right", margin: 0, padding: 0 }}>
            <ListItemText secondary="Jan 29 2024, 12:01" />
          </Box>
        </ListItem>
        <Divider component="li" />

        <ListItem component={Link} button to="view-activity">
          <ListItemText
            primary={
              <StyledLink to="view-activity">
                Akan Diadakan Pertemuan pada 10 Februari 2024
              </StyledLink>
            }
            secondary={
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "rgba(27, 43, 65, 0.69)",
                }}
              >
                Harap untuk memakai pakaian yang sesuai dengan standar UNKLAB,
                dan jangan lupa untuk membawa ID Card dan Tumblr. Terima kasih.
              </Typography>
            }
          />
          <Box sx={{ marginLeft: "auto", width: "45%", textAlign: "right" }}>
            <ListItemText secondary="Jan 29 2024, 08:46" />
          </Box>
        </ListItem>
        <Divider component="li" />
      </List>
    </div>
  );
};

export default RecentActivities;
