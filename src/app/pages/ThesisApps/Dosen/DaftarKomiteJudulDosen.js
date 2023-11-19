import React, { useState, useEffect } from "react";
import axios from "axios";
import Div from "@jumbo/shared/Div";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
// import SearchGlobal from "app/shared/SearchGlobal";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DaftarKomiteJudulDosen = () => {
  // State untuk melacak panel accordion yang terbuka
  const [expanded, setExpanded] = useState(false);

  // Fungsi untuk menangani perubahan pada state accordion yang terbuka
  const handleChange = (panel) => (event, isExpanded) => {
    // Mengatur state expanded berdasarkan apakah panel tersebut terbuka
    setExpanded(isExpanded ? panel : false);
  };

  const [daftarKomiteJudul, setDaftarKomiteJudul] = useState([]);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchDaftarKomiteJudulData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/group/committee-list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setDaftarKomiteJudul' dengan data dari respons
        setDaftarKomiteJudul(response.data.data);
        console.log("Request data daftar komite judul: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil daftar pengajuan:",
          error
        );
      }
    };
    fetchDaftarKomiteJudulData();
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
            Daftar Komite Judul
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
            {/* <SearchGlobal></SearchGlobal> */}
          </Div>
        </Div>
        {/* Header End */}
        {/* Semester and Table Mahasiswa Proposal Start */}

        {daftarKomiteJudul?.length > 0 ? (
          <Div
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "25px",
              width: "100%",
              height: "430px",
              overflowY: "auto",
              background: "#FFF",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            {daftarKomiteJudul?.map((semesterData, semesterIndex) => (
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
                        <TableRow>
                          <TableCell sx={{ width: "25px", fontSize: "13px" }}>
                            Nomor
                          </TableCell>
                          <TableCell sx={{ width: "200px", fontSize: "13px" }}>
                            Mahasiswa
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>Judul</TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Calon Advisor
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Calon Co-Advisor 1
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Calon Co-Advisor 2
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Konsultasi
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Status
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {semesterData.submissions.map(
                          (submission, submissionIndex) => (
                            <TableRow key={submissionIndex}>
                              <TableCell sx={{ fontSize: "13px" }}>
                                {submissionIndex + 1}
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                {submission.students.map((student) => (
                                  <div key={student.id}>{student.fullName}</div>
                                ))}
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                {submission.title}
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                {submission.proposed_advisor}
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                {submission.proposed_co_advisor1}
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                {submission.proposed_co_advisor2}
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                {submission.is_consultation ? (
                                  <Chip
                                    label={"Sudah"}
                                    sx={{
                                      background: "rgba(21, 131, 67, 0.10)",
                                      color: "#0A7637",
                                    }}
                                  />
                                ) : (
                                  <Chip label={"Belum"} />
                                )}
                              </TableCell>

                              <TableCell sx={{ fontSize: "13px" }}>
                                {submission.is_approve === "Waiting" ? (
                                  <Chip
                                    label={"Menunggu"}
                                    sx={{
                                      background: "rgba(255, 204, 0, 0.10)",
                                      color: "#985211",
                                    }}
                                  />
                                ) : submission.is_approve === "Approve" ? (
                                  <Chip
                                    label={"Diterima"}
                                    sx={{
                                      background: "rgba(21, 131, 67, 0.10)",
                                      color: "#0A7637",
                                    }}
                                  />
                                ) : submission.is_approve === "Rejected" ? (
                                  <Chip
                                    label={"Ditolak"}
                                    sx={{
                                      background: "rgba(226, 29, 18, 0.10)",
                                      color: "#CA150C",
                                    }}
                                  />
                                ) : (
                                  submission.is_approve
                                )}
                              </TableCell>
                              <TableCell>
                                <Typography
                                  component={Link}
                                  to={`/sistem-informasi-skripsi/daftar-komite-judul-dosen/pengajuan-judul/${submission.group_id}/DOSEN`}
                                  sx={{
                                    textDecoration: "none",
                                    color: "blue",
                                  }}
                                >
                                  Detail
                                </Typography>
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            ))}
          </Div>
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
              Belum ada pengajuan judul yang akan dikomitekan.
            </Typography>
          </Div>
        )}
        {/* Semester and Table Mahasiswa Proposal End */}
      </Div>
      {/* Table Master End */}
    </Div>
  );
};

export default DaftarKomiteJudulDosen;
