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
import { BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

const CurrentActivities = () => {

  // const getActivities = async()=>{
  //   try{
  //     //content-type dan Authorization liat di dokumentasi API atau postman
  //     const headers = {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer token_apa`,
  //       };

  //   const response = await axios.get(`${BASE_URL_API}/bla/bla/bla`,{headers})

  //   const {status, message, code, data} = response.data
  //   if(status === 'OK'){ //isi status atau code tergantung API
  //     //simpan dalam usestate contoh:
  //     //setActivityList = data
  //     //tambahkan handle lain jika perlu
  //   }else{
  //     //handle jika respon lain, kalau tidak ada hapus saja
  //     console.log(response)
  //   }
  //   }catch(error){
  //     console.log(error)
  //   }
  // }

  return (
    <div>
      <Typography
        sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: 500 }}
      >
        Current Activities
      </Typography>
      <Typography
        sx={{
          paddingTop: "22px",
          paddingBottom: "32px",
          fontSize: { xs: "14px", md: "15px" },
          fontWeight: 400,
          color: "rgba(27, 43, 65, 0.69)",
          textAlign: "justify",
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
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "12px", md: "14px" },
                  "&:hover": {
                    textDecorationLine: ["none"],
                  },
                }}
              >
                Consultation - Adzana, Shaliha Gracia
              </Typography>
            }
            secondary={
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "rgba(27, 43, 65, 0.69)",
                  fontSize: { xs: "12px", md: "14px" },
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
          <Box
            sx={{
              marginLeft: { xs: "auto", md: 0 },
              width: { xs: "100%", md: "45%" },
              textAlign: "right",
            }}
          >
            <ListItemText
              secondary={
                <Typography
                  sx={{
                    fontSize: { xs: "10px", md: "14px" },
                    color: "rgba(27, 43, 65, 0.69)",
                  }}
                >
                  02:00 PM
                </Typography>
              }
            />
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
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "12px", md: "14px" },
                  "&:hover": {
                    textDecorationLine: ["none"],
                  },
                }}
              >
                Pengumpulan Kartu Rencana Studi Semester ganjil tahun 2022/2023
                Gelombang 1
              </Typography>
            }
            secondary={
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "rgba(27, 43, 65, 0.69)",
                  fontSize: { xs: "12px", md: "14px" },
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
          <Box
            sx={{
              marginLeft: { xs: "auto", md: 0 },
              width: { xs: "100%", md: "45%" },
              textAlign: "right",
            }}
          >
            <ListItemText
              secondary={
                <Typography
                  sx={{
                    fontSize: { xs: "10px", md: "14px" },
                    color: "rgba(27, 43, 65, 0.69)",
                  }}
                >
                  08:00 PM
                </Typography>
              }
            />
          </Box>
        </ListItem>
        <Divider component="li" />

        <ListItem component={Link} button to="view-activity">
          <ListItemText
            primary={
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "12px", md: "14px" },
                  "&:hover": {
                    textDecorationLine: ["none"],
                  },
                }}
              >
                Akan Diadakan Pertemuan pada 10 Februari 2024
              </Typography>
            }
            secondary={
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "rgba(27, 43, 65, 0.69)",
                  fontSize: { xs: "12px", md: "14px" },
                }}
              >
                Harap untuk memakai pakaian yang sesuai dengan standar UNKLAB,
                dan jangan lupa untuk membawa ID Card dan Tumblr. Mohon untuk
                datang tepat waktu karena pengambilan absen akan dilaksanakan di
                awal kegiatan. Terima Kasih.
              </Typography>
            }
          />
          <Box
            sx={{
              marginLeft: { xs: "auto", md: 0 },
              width: { xs: "100%", md: "45%" },
              textAlign: "right",
            }}
          >
            <ListItemText
              secondary={
                <Typography
                  sx={{
                    fontSize: { xs: "10px", md: "14px" },
                    color: "rgba(27, 43, 65, 0.69)",
                  }}
                >
                  06:00 AM
                </Typography>
              }
            />
          </Box>
        </ListItem>
        <Divider component="li" />
      </List>
    </div>
  );
};

export default CurrentActivities;
