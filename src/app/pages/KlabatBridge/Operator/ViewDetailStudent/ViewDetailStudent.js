import React from "react";
import { Typography, Box, Paper, Divider } from "@mui/material";
import Div from "@jumbo/shared/Div";

const ViewDetailStudent = () => {
  return (
    <Box
    // p={8}
    // sx={{
    //     backgroundColor: 'white',
    //     borderRadius: 5,
    //     boxShadow: 3,
    //     height: '100%',
    // }}
    >
      <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
        View Detail
      </Typography>
      {/* coba coba */}
      <Div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            height: "400px",
            padding: 2,
            "@media (min-width:0px)": {
              // xs
              width: "70%", // 100% width on extra-small screens
            },
            "@media (min-width:600px)": {
              // sm
              width: "50%", // 80% width on small screens
            },
            "@media (min-width:960px)": {
              // md
              width: "30%", // 50% width on medium screens
            },
          }}
        >
          {/* Content */}
          <Box
            sx={{
              width: "100%",
              height: "70%",
              backgroundColor: "#F3F3F3",
            }}
          >
            {/* Content inside the Box (div) */}
          </Box>
          <Divider sx={{ marginY: 2 }} />
          <Box
            sx={{
              width: "100%",
              height: "20%",
              //backgroundColor: 'lightgreen',
            }}
          >
            {/* Content inside the Box (div) */}
            <Typography>Nama: Shyereal Imanuelita Saerang</Typography>
            <Typography>NIM: 105022318098</Typography>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            height: "400px",
            padding: 3,
            paddingX: 9,
            "@media (min-width:0px)": {
              // xs
              width: "100%", // 100% width on extra-small screens
            },
            "@media (min-width:600px)": {
              // sm
              width: "100%", // 80% width on small screens
            },
            "@media (min-width:960px)": {
              // md
              width: "60%", // 50% width on medium screens
            },
          }}
        >
          {/* Content */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              // backgroundColor: 'lightblue',
              gap: 2,
            }}
          >
            {/* Content inside the Box (div) */}
            <Typography sx={{ fontSize: "20px", fontWeight: 450, mb: 3 }}>
              Identitas Diri
            </Typography>
            <Typography sx={{ mb: 1 }}>Nama Lengkap: </Typography>
            <Typography sx={{ mb: 1 }}>Tempat/Tanggal Lahir: </Typography>
            <Typography sx={{ mb: 1 }}>Gender: </Typography>
            <Typography sx={{ mb: 1 }}>Fakultas: </Typography>
            <Typography sx={{ mb: 1 }}>Prodi: </Typography>
            <Typography sx={{ mb: 1 }}>
              Nomor Induk Mahasiswa (NIM):{" "}
            </Typography>
          </Box>
        </Paper>
      </Div>
    </Box>
  );
};

export default ViewDetailStudent;
