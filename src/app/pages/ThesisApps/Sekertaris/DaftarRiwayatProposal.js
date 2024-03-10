import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Chip,
} from "@mui/material";
import "core-js/stable";
import "regenerator-runtime/runtime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PrintBeritaAcaraProposal from "./PrintBeritaAcaraProposal";
import { useReactToPrint } from "react-to-print";
import { BASE_URL_API } from "@jumbo/config/env";

const DaftarRiwayatProposal = () => {
  // State untuk melacak panel accordion yang terbuka
  const [expanded, setExpanded] = useState(false);

  // Fungsi untuk menangani perubahan pada state accordion yang terbuka
  const handleChange = (panel) => (event, isExpanded) => {
    // Mengatur state expanded berdasarkan apakah panel tersebut terbuka
    setExpanded(isExpanded ? panel : false);
  };

  // state - daftar jadwal
  const [daftarJadwal, setDaftarJadwal] = useState([]);
  // state - daftar dosen
  const [daftarDosen, setDaftarDosen] = useState([]);
  // state - menyimpan data yang dipilih
  const [semesterIndex, setSemesterIndex] = useState();

  // fungsi untuk mendapatkan data token JWT
  const token = localStorage.getItem("token");
  // console.log("token", token);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const fetchDaftarJadwalProposal = async () => {
      try {
        const response = await axios.get(`${BASE_URL_API}/proposal/schedule`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Atur state 'setDaftarJadwal' dengan data dari respons
        setDaftarJadwal(response.data.data);
        console.log("Request Daftar Jadwal Proposal", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil daftar jadwal:", error);
      }
    };
    const fetchDaftarDosen = async () => {
      try {
        const response = await axios.get(`${BASE_URL_API}/group/dosen-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Atur state 'setDaftarDosen' dengan data dari respons
        setDaftarDosen(response.data.data);
        console.log("Request Daftar Dosen", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil daftar jadwal:", error);
      }
    };
    fetchDaftarJadwalProposal(); // Panggil fungsi fetchData saat komponen dimuat
    fetchDaftarDosen();
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
            Daftar Riwayat Proposal
          </Typography>
          <Div
            sx={{
              flexDirection: "row",
              display: "flex",
              width: "441px",
              padding: "12px 16px",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "16px",
              flexShrink: 0,
            }}
          >
            {/* <SearchGlobal></SearchGlobal> */}
            <Button
              color="primary"
              variant="contained"
              sx={{
                borderRadius: "50px",
                textTransform: "none",
              }}
            >
              <Typography sx={{ fontSize: "14px", padding: "4px" }}>
                Print Berita Acara
              </Typography>
            </Button>
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
          {daftarJadwal &&
            daftarJadwal.map((scheduleData, scheduleIndex) => (
              <Accordion
                key={scheduleIndex}
                expanded={expanded === `panel${semesterIndex}`} // Memeriksa apakah accordion ini terbuka
                onChange={handleChange(`panel${semesterIndex}`)} // Menangani perubahan state accordion
                sx={{
                  width: "100%",
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
                      fontSize: "16px",
                      fontWeight: 500,
                      marginTop: "6px",
                    }}
                  >
                    {scheduleData.semester}
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
                          <TableCell sx={{ fontSize: "13px" }}>
                            Advisor
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Ketua Panelis
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Anggota Panelis
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Tanggal
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
                        {scheduleData.schedules.map((jadwal, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ fontSize: "13px" }}>
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <Typography>{jadwal.advisor_name}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>
                                {jadwal.panelist_chairman_name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>
                                {jadwal.panelist_member_name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{jadwal.defence_date}</Typography>
                            </TableCell>
                            {/* harus di ubah statusnya*/}
                            <TableCell>
                              {jadwal ? (
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
                            <TableCell>
                              <Div sx={{ display: "flex" }}>
                                <span
                                  style={{
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    color: "blue",
                                  }}
                                  onClick={() => {
                                    console.log("trigger");
                                    handlePrint();
                                  }}
                                >
                                  Print
                                </span>
                              </Div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            ))}
        </Div>
        <PrintBeritaAcaraProposal ref={componentRef} />
      </Div>
    </Div>
  );
};

export default DaftarRiwayatProposal;
