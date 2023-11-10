import React, { useState, useEffect } from "react";
import Div from "@jumbo/shared/Div";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
<<<<<<< HEAD:src/app/pages/ThesisApps/Mahasiswa/BerandaPengajuanJudul.js
import React from "react";
=======
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
>>>>>>> 81f2205cec0482e82e52c71638cff83632d4e9e5:src/app/pages/ThesisApps/Mahasiswa/Beranda.js

const BerandaPengajuanJudul = () => {
  const pengajuanJudul = [
    {
      title:
        "PENGEMBANGAN SISTEM INFORMASI SKRIPSI DI FAKULTAS ILMU KOMPUTER UNIVERSITAS KLABAT",
    },
  ];

  const dataKelompokMahasiswa = [
    {
      namaLengkap: "Geovalga Fransiscus Lim",
      nim: "105021910051",
      programStudi: "Informatika",
    },
    {
      namaLengkap: "Frances Rully Yong",
      nim: "105021910051",
      programStudi: "Informatika",
    },
  ];

  const dataStatusRevisiJudul = [
    {
      dosenSkripsi: "Waiting",
    },
  ];

  const { role } = JSON.parse(localStorage.getItem("user"));
  // const role = ["ADVISOR", "DOSEN"];
  console.log(role);
  return (
    <Div sx={{ width: "100%" }}>
      {/* Element 2 Start */}
      <Div
        sx={{
          direction: "row",
          display: "flex",
          paddingBottom: "0px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
          borderRadius: "8px",
        }}
      >
        {pengajuanJudul.map((judul) => (
          <Typography
            sx={{
              width: "100%",
              display: "flex",
              padding: "24px",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              color: "#192434",
              background: "rgba(26, 56, 96, 0.10)",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600, // Membuat teks lebih tebal (nilai 600)
            }}
          >
            {judul.title}
          </Typography>
        ))}
        {/* Table Start*/}

        <Div
          sx={{
            width: "100%",
            padding: "0 25px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "50px",
          }}
        >
          {/* Table Kelompok Mahasiswa Start*/}
          <Typography
            sx={{
              padding: "14px 16px",
              background: "rgba(26, 56, 96, 0.10)",
              borderRadius: "6px 6px 0 0",
              border: "1px",
            }}
          >
            Kelompok Mahasiswa
          </Typography>
          <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
            <Table>
              <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                  <TableCell sx={{ width: "25%" }}>Nomor</TableCell>
                  <TableCell sx={{ width: "25%" }}>Nama Lengkap</TableCell>
                  <TableCell sx={{ width: "25%" }}>NIM</TableCell>
                  <TableCell sx={{ width: "25%" }}>Program Studi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataKelompokMahasiswa.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.namaLengkap}</TableCell>
                    <TableCell>{data.nim}</TableCell>
                    <TableCell>{data.programStudi}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Table Kelompok mahasiswa End */}

          {/* Table Pengajuan Proposal Start */}
          <Typography
            sx={{
              padding: "14px 16px",
              background: "rgba(26, 56, 96, 0.10)",
              borderRadius: "6px 6px 0 0",
              border: "1px",
            }}
          >
            Status Pengajuan Judul
          </Typography>
          <TableContainer
            sx={{ marginBottom: "50px", width: "100%" }}
            component={Paper}
          >
            <Table>
              <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                  <TableCell sx={{ width: "50%" }}>Nomor</TableCell>
                  <TableCell sx={{ width: "50%" }}>Dosen Skripsi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataStatusRevisiJudul.map((statusPersetujuan, index) => (
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                      {statusPersetujuan.dosenSkripsi === "Waiting" ? (
                        <Chip
                          label={"Menunggu"}
                          sx={{
                            background: "rgba(255, 204, 0, 0.10)",
                            color: "#985211",
                          }}
                        />
                      ) : statusPersetujuan.dosenSkripsi === "Approve" ? (
                        <Chip
                          label={"Diterima"}
                          sx={{
                            background: "rgba(21, 131, 67, 0.10)",
                            color: "#0A7637",
                          }}
                        />
                      ) : statusPersetujuan.dosenSkripsi === "Rejected" ? (
                        <Chip
                          label={"Ditolak"}
                          sx={{
                            background: "rgba(226, 29, 18, 0.10)",
                            color: "#CA150C",
                          }}
                        />
                      ) : (
                        statusPersetujuan.dosenSkripsi
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Table Pengajuan Proposal End */}
        </Div>
      </Div>

      {/* Element 2 End */}
    </Div>
  );
};

export default BerandaPengajuanJudul;
