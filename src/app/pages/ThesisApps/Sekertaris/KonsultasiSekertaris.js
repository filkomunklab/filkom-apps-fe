import Div from "@jumbo/shared/Div";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MenuSekertaris from "app/shared/MenuHorizontal/MenuSekertaris";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import React from "react";

const KonsultasiSekertaris = () => {
  const data = [
    {
      deskripsi: "Diskusi Tentang Judul",
      tanggal: "08/09/2023",
      tertera: "Andrew T.Liem",
    },
    {
      deskripsi: "Diskusi Tentang Metode",
      tanggal: "08/09/2023",
      tertera: "Andrew T.Liem",
    },
    {
      deskripsi: "Diskusi Tentang Penulisan",
      tanggal: "08/09/2023",
      tertera: "Andrew T.Liem",
    },
    {
      deskripsi: "Diskusi Tentang Perubahan",
      tanggal: "08/09/2023",
      tertera: "Andrew T.Liem",
    },
    {
      deskripsi: "Diskusi Tentang Latar Belakang",
      tanggal: "08/09/2023",
      tertera: "Andrew T.Liem",
    },
  ];

  return (
    <Div>
      <Div
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "24px",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
          Konsultasi
        </Typography>
      </Div>

      <Div
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        {/* Element 1 Start */}
        <Div
          sx={{
            display: "flex",
            width: "350px",
            padding: "5px",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Riwayatlog />
        </Div>
        {/* Element 1 End */}
        {/* Element 2 Start */}
        <Div
          sx={{
            direction: "row",
            display: "flex",
            width: "1050px",
            paddingBottom: "0px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
            borderRadius: "8px",
          }}
        >
          {/* Menu Horizontal Start */}
          <Div sx={{ width: "100%" }}>
            <MenuSekertaris />
          </Div>
          {/* Menu horizontal End */}

          <Div
            sx={{
              display: "flex",
              padding: "29px 42px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "1px solid #E0E0E0",
              background: "#FFF",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Div
              sx={{
                width: "100%",
                padding: "0 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "50px",
              }}
            >
              {/* Table Konsultasi Start*/}
              <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "25%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "25%" }}>Deskripsi</TableCell>
                      <TableCell sx={{ width: "25%" }}>Tanggal</TableCell>
                      <TableCell sx={{ width: "25%" }}>Tertera</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.deskripsi}</TableCell>
                        <TableCell>{item.tanggal}</TableCell>
                        <TableCell>{item.tertera}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Kelompok mahasiswa End */}
            </Div>
          </Div>
        </Div>
        {/* Element 2 End */}
      </Div>
    </Div>
  );
};

export default KonsultasiSekertaris;
