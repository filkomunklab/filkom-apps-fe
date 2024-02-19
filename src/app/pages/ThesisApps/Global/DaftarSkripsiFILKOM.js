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

const DaftarPengajuanProposalDekan = () => {
  const [daftarSkripsi, setDaftarSkripsi] = useState();

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDaftarSkripsiData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/group/skripsi-filkom",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setDaftarPengajuanProposal' dengan data dari respons
        setDaftarSkripsi(response.data.data);
        console.log("Request get daftar proposal: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil daftar pengajuan:",
          error
        );
      }
    };
    fetchDaftarSkripsiData();
  }, [token]);

  return (
    <Div>
      {/* Table Master Start */}
      <Div
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* Header Start */}
        <Div
          sx={{
            width: "100%",
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
            Daftar Judul Skripsi
          </Typography>
        </Div>
        {/* Header End */}
        {/* Semester Start */}
        {daftarSkripsi?.length > 0 ? (
          <>
            {daftarSkripsi?.map((skripsi, index) => (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: "25px", fontSize: "13px" }}>
                        Nomor
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Judul</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontSize: "13px" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        {skripsi.title}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ))}
          </>
        ) : (
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
            <Typography
              sx={{
                width: "100%",
                display: "flex",
                padding: "24px",
                alignItems: "center",
                gap: "10px",
                color: "#CA150C",
                background: "rgba(226, 29, 18, 0.50)",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Belum ada skripsi.
            </Typography>
          </Div>
        )}
        {/* Table Mahasiswa Proposal End */}
      </Div>
      {/* Table Master End */}
    </Div>
  );
};

export default DaftarPengajuanProposalDekan;
