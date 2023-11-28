import React, { useState, useEffect } from "react";
import axios from "axios";
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

const BerandaPengajuanJudul = ({ value: groupId }) => {
  const [details, setDetails] = useState([]);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchDetailsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/group/submission_details/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setDetails' dengan data dari respons
        setDetails(response.data.data);
        console.log("Request Get details: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil detail:", error);
      }
    };
    fetchDetailsData();
  }, [token, groupId]);

  //   const { role } = JSON.parse(localStorage.getItem("user"));
  //   const role = ["ADVISOR", "DOSEN"];
  //   console.log(role);
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
          {details.title}
        </Typography>
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
                  <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                  <TableCell sx={{ width: "55%" }}>Nama Lengkap</TableCell>
                  <TableCell sx={{ width: "20%" }}>NIM</TableCell>
                  <TableCell sx={{ width: "20%" }}>Program Studi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {details?.students?.map((student, studentIndex) => (
                  <TableRow key={studentIndex}>
                    <TableCell>{studentIndex + 1}</TableCell>
                    <TableCell>{student.fullName}</TableCell>
                    <TableCell>{student.nim}</TableCell>
                    <TableCell>
                      {student.major === "IF"
                        ? "Informatika"
                        : student.major === "SI"
                        ? "Sistem Informasi"
                        : student.major}
                    </TableCell>
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
                  <TableCell sx={{ width: "50%", textAlign: "center" }}>
                    Dosen Skripsi
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>
                    {details?.submission_status?.status === "Waiting" ? (
                      <Chip
                        label={"Menunggu"}
                        sx={{
                          background: "rgba(255, 204, 0, 0.10)",
                          color: "#985211",
                        }}
                      />
                    ) : details?.submission_status?.status === "Approve" ? (
                      <Chip
                        label={"Diterima"}
                        sx={{
                          background: "rgba(21, 131, 67, 0.10)",
                          color: "#0A7637",
                        }}
                      />
                    ) : details?.submission_status?.status === "Rejected" ? (
                      <Chip
                        label={"Ditolak"}
                        sx={{
                          background: "rgba(226, 29, 18, 0.10)",
                          color: "#CA150C",
                        }}
                      />
                    ) : (
                      details?.submission_status?.status
                    )}
                  </TableCell>
                </TableRow>
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
