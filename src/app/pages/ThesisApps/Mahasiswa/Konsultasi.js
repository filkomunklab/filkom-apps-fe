import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import MenuDosenSkripsi from "app/shared/MenuHorizontal/MenuDosenSkripsi";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";

const Konsultasi = () => {
  // state - simpan request konsultasi
  const [konsultasi, setKonsultasi] = useState();
  // state - simpan progress dari riwayat
  const [progress, setProgress] = useState(null);

  const groupId = useParams().groupId;
  // console.log("group id: ", groupId);

  const role = useParams().role;
  // console.log(role);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchKonsultasiData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/consultation/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setKonsultasi(response.data.data);
        console.log("Request Get konsultasi: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil daftar dosen:", error);
      }
    };
    fetchKonsultasiData();
  }, [token, groupId]);

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
          <Riwayatlog
            value={groupId}
            riwayatData={(data) => {
              if (data) {
                setProgress(data.progress);
              }
            }}
          />
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
          {/* MAHASISWA */}
          <Div
            hidden={role.includes("MAHASISWA") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuMahasiswa dataGroupId={groupId} dataProgress={progress} />
          </Div>
          {/* DOSEN SKRIPSI */}
          <Div
            hidden={role.includes("DOSEN_MK") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuDosenSkripsi dataGroupId={groupId} dataProgress={progress} />
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
                    {konsultasi?.constultation?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.dosen}</TableCell>
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

export default Konsultasi;
