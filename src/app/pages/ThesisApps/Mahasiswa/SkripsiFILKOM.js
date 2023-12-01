import React, { useState, useEffect } from "react";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import PeopleIcon from "@mui/icons-material/People";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import EditIcon from "@mui/icons-material/Edit";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SearchGlobal from "app/shared/SearchGlobal";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SkripsiFakultasIlmuKomputer = () => {
  // stete - menyimpan hasil request
  const [daftarSkripsi, setDaftarSkripsi] = useState();

  // State untuk melacak panel accordion yang terbuka
  const [expanded, setExpanded] = useState(false);

  // Fungsi untuk menangani perubahan pada state accordion yang terbuka
  const handleChange = (panel) => (event, isExpanded) => {
    // Mengatur state expanded berdasarkan apakah panel tersebut terbuka
    setExpanded(isExpanded ? panel : false);
  };

  // // fungsi untuk mendapatkan token JWT
  // const token = localStorage.getItem("token");
  // console.log("token", token);

  useEffect(() => {
    const fetchDaftarSkripsiData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/group/skripsi-filkom"
        );
        setDaftarSkripsi(response.data.data);
        console.log(
          "Request get daftar complete skripsi: ",
          response.data.data
        );
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil daftar complete skripsi:",
          error
        );
      }
    };
    fetchDaftarSkripsiData();
  }, []);

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
        {daftarSkripsi?.length > 0 ? (
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
                {daftarSkripsi?.map((skripsi, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontSize: "16px" }}>{index + 1}</TableCell>
                    <TableCell sx={{ fontSize: "16px" }}>
                      {skripsi.title}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
              Belum ada skripsi yang selesai.
            </Typography>
          </Div>
        )}
        {/* Table Mahasiswa Proposal End */}
      </Div>
      {/* Table Master End */}
    </Div>
  );
};

export default SkripsiFakultasIlmuKomputer;
