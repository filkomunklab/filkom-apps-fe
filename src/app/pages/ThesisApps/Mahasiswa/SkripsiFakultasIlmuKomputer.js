import React, { useState, useEffect } from "react";
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
import SearchGlobal from "app/shared/SearchGlobal";

const SkripsiFakultasIlmuKomputer = () => {
  // State untuk melacak panel accordion yang terbuka
  const [expanded, setExpanded] = useState(false);

  // Fungsi untuk menangani perubahan pada state accordion yang terbuka
  const handleChange = (panel) => (event, isExpanded) => {
    // Mengatur state expanded berdasarkan apakah panel tersebut terbuka
    setExpanded(isExpanded ? panel : false);
  };

  const [daftarBimbinganProposal, setDaftarBimbinganProposal] = useState({
    dashboard: {
      total_group: 0,
      not_submitted: 0,
      has_submitted: 0,
      approved: 0,
      rejected: 0,
    },
    semesterData: [],
  });

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchDaftarBimbinganProposalData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/group/proposal-list-advisor",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setDaftarBimbinganProposal' dengan data dari respons
        setDaftarBimbinganProposal(response.data.data);
        console.log("Request get daftar proposal: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil daftar bimbingan proposal:",
          error
        );
      }
    };
    fetchDaftarBimbinganProposalData();
  }, [token]);

  return (
    <Div
      sx={{
        margin: "auto", // Center the content horizontally
        width: "98%",
      }}
    >
      {/* Table Master Start */}
      <Div
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          margin: "auto",
          width: "100%",
        }}
      >
        {/* Header Start */}
        <Div
          sx={{
            width: "98%",
            display: "flex",
            padding: "24px",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: "1 0 0",
              alignSelf: "stretch",
              width: "100%",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "32px",
            }}
          >
            Skripsi Fakultas Ilmu Komputer
          </Typography>
          <Div
            sx={{
              flexDirection: "row",
              display: "flex",
              width: "441px",
              padding: "12px 16px",
              alignItems: "center",
              gap: "16px",
              flexShrink: 0,
            }}
          >
            <SearchGlobal></SearchGlobal>
          </Div>
        </Div>
        {/* Header End */}
        {/* Semester Start */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#F5F5F5" }}>
                <TableCell sx={{ width: "25px", fontSize: "16px" }}>
                  Nomor
                </TableCell>
                <TableCell sx={{ fontSize: "16px" }}>Judul</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(proposal, proposalIndex) => (
                <TableRow key={proposalIndex}>
                  <TableCell sx={{ fontSize: "16px" }}>
                    {proposalIndex + 1}
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px" }}>
                    {proposal.students.map((student) => (
                      <div key={student.id}>{student.fullName}</div>
                    ))}
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px" }}>
                    {proposal.title}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Table Mahasiswa Proposal End */}
      </Div>
      {/* Table Master End */}
    </Div>
  );
};

export default SkripsiFakultasIlmuKomputer;
