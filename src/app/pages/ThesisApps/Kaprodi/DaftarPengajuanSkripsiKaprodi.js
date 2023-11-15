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
import SearchGlobal from "app/shared/SearchGlobal";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DaftarPengajuanSkripsiKaprodi = () => {
  // State untuk melacak panel accordion yang terbuka
  const [expanded, setExpanded] = useState(false);

  // Fungsi untuk menangani perubahan pada state accordion yang terbuka
  const handleChange = (panel) => (event, isExpanded) => {
    // Mengatur state expanded berdasarkan apakah panel tersebut terbuka
    setExpanded(isExpanded ? panel : false);
  };

  const [daftarPengajuanSkripsi, setDaftarPengajuanSkripsi] = useState({
    dashboard: {
      total_group: 0,
      not_defence: 0,
      has_defence: 0,
      pass: 0,
      repeat: 0,
      not_pass: 0,
    },
    semesterData: [],
  });

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchDaftarPengajuanSkripsiData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/group/skripsi-list-kaprodi",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setDaftarPengajuanSkripsi' dengan data dari respons
        setDaftarPengajuanSkripsi(response.data.data);
        console.log("Request get daftar skripsi: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil daftar pengajuan:",
          error
        );
      }
    };
    fetchDaftarPengajuanSkripsiData();
  }, [token]);

  return (
    <Div>
      {/* Dashboard 1 Start */}
      <Div
        sx={{
          display: "flex",
          width: "100%",
          padding: "10px 0px",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {/* Jumlah bimbingan */}
        <Div
          sx={{
            display: "flex",
            width: "100%",
            padding: "10px",
            alignItems: "center",
            gap: "20px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "10px",
            textItem: "center",
          }}
        >
          <PeopleIcon
            sx={{ width: "35px", height: "35px", color: "#006AF5" }}
          />
          <Div>
            <Typography
              sx={{
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
                color: "rgba(28, 48, 74, 0.52)",
              }}
            >
              Jumlah Kelompok
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanSkripsi.dashboard.total_group} Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Belum Maju Sidang */}
        <Div
          sx={{
            display: "flex",
            width: "100%",
            padding: "10px",
            alignItems: "center",
            gap: "20px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "10px",
            textItem: "center",
          }}
        >
          <EditIcon sx={{ width: "35px", height: "35px", color: "#006AF5" }} />
          <Div>
            <Typography
              sx={{
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
                color: "rgba(28, 48, 74, 0.52)",
              }}
            >
              Belum Maju Sidang
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanSkripsi.dashboard.not_defence} Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Sudah Maju Sidang */}
        <Div
          sx={{
            display: "flex",
            width: "100%",
            padding: "10px",
            alignItems: "center",
            gap: "20px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "10px",
            textItem: "center",
          }}
        >
          <ArrowUpwardIcon
            sx={{ width: "35px", height: "35px", color: "#006AF5" }}
          />
          <Div>
            <Typography
              sx={{
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
                color: "rgba(28, 48, 74, 0.52)",
              }}
            >
              Sudah Maju Sidang
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanSkripsi.dashboard.has_defence} Kelompok
            </Typography>
          </Div>
        </Div>
      </Div>
      {/* Dashboard 1 End */}
      {/* Dashboard 2 Start */}
      <Div
        sx={{
          display: "flex",
          width: "100%",
          padding: "10px 0px",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {/* Lulus */}
        <Div
          sx={{
            display: "flex",
            width: "100%",
            padding: "10px",
            alignItems: "center",
            gap: "20px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "10px",
            textItem: "center",
          }}
        >
          <PeopleIcon
            sx={{ width: "35px", height: "35px", color: "#006AF5" }}
          />
          <Div>
            <Typography
              sx={{
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
                color: "rgba(28, 48, 74, 0.52)",
              }}
            >
              Lulus
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanSkripsi.dashboard.pass} Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Mengulang */}
        <Div
          sx={{
            display: "flex",
            width: "100%",
            padding: "10px",
            alignItems: "center",
            gap: "20px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "10px",
            textItem: "center",
          }}
        >
          <EditIcon sx={{ width: "35px", height: "35px", color: "#006AF5" }} />
          <Div>
            <Typography
              sx={{
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
                color: "rgba(28, 48, 74, 0.52)",
              }}
            >
              Mengulang
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanSkripsi.dashboard.repeat} Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Tidak Lulus */}
        <Div
          sx={{
            display: "flex",
            width: "100%",
            padding: "10px",
            alignItems: "center",
            gap: "20px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "10px",
            textItem: "center",
          }}
        >
          <ArrowUpwardIcon
            sx={{ width: "35px", height: "35px", color: "#006AF5" }}
          />
          <Div>
            <Typography
              sx={{
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
                color: "rgba(28, 48, 74, 0.52)",
              }}
            >
              Tidak Lulus
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanSkripsi.dashboard.not_pass} Kelompok
            </Typography>
          </Div>
        </Div>
      </Div>
      {/* Dashboard 1 End */}

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
            Daftar Bimbingan Skripsi
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
        <Div
          sx={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "25px",
            width: "100%",
            height: "460px",
            overflowY: "auto",
            background: "#FFF",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          {daftarPengajuanSkripsi.semesterData.map(
            (semesterData, semesterIndex) => (
              <Accordion
                key={semesterIndex}
                expanded={expanded === `panel${semesterIndex}`} // Memeriksa apakah accordion ini terbuka
                onChange={handleChange(`panel${semesterIndex}`)} // Menangani perubahan state accordion
                sx={{
                  margin: "5px",
                  width: "97%",
                  padding: "1px",
                  background: "rgba(26, 56, 96, 0.10)",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${semesterIndex}bh-content`}
                  id={`panel${semesterIndex}bh-header`}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      width: "33%",
                      flexShrink: 0,
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    {semesterData.semester}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ background: "#F5F5F5" }}>
                          <TableCell sx={{ width: "25px", fontSize: "13px" }}>
                            Nomor
                          </TableCell>
                          <TableCell sx={{ width: "200px", fontSize: "13px" }}>
                            Mahasiswa
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>Judul</TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Status
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {semesterData.skripsis.map((skripsi, skripsiIndex) => (
                          <TableRow key={skripsiIndex}>
                            <TableCell sx={{ fontSize: "13px" }}>
                              {skripsiIndex + 1}
                            </TableCell>
                            <TableCell sx={{ fontSize: "13px" }}>
                              {skripsi.students.map((student) => (
                                <div key={student.id}>{student.fullName}</div>
                              ))}
                            </TableCell>

                            <TableCell sx={{ fontSize: "13px" }}>
                              {skripsi.title}
                            </TableCell>
                            <TableCell sx={{ fontSize: "13px" }}>
                              {skripsi.is_pass === null ? (
                                <Chip label={"Belum"} />
                              ) : skripsi.is_pass === "Repeat" ? (
                                <Chip
                                  label={"Mengulang"}
                                  sx={{
                                    background: "rgba(255, 204, 0, 0.10)",
                                    color: "#985211",
                                  }}
                                />
                              ) : skripsi.is_pass === "Pass" ? (
                                <Chip
                                  label={"Lulus"}
                                  sx={{
                                    background: "rgba(21, 131, 67, 0.10)",
                                    color: "#0A7637",
                                  }}
                                />
                              ) : skripsi.is_pass === "Fail" ? (
                                <Chip
                                  label={"Ditolak"}
                                  sx={{
                                    background: "rgba(226, 29, 18, 0.10)",
                                    color: "#CA150C",
                                  }}
                                />
                              ) : (
                                skripsi.is_pass
                              )}
                            </TableCell>
                            <TableCell>
                              <Typography
                                component={Link}
                                to="/halaman-berikutnya"
                                sx={{
                                  textDecoration: "none",
                                  color: "blue",
                                }}
                              >
                                Detail
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            )
          )}
        </Div>
        {/* Table Mahasiswa Skripsi End */}
      </Div>
      {/* Table Master End */}
    </Div>
  );
};

export default DaftarPengajuanSkripsiKaprodi;
