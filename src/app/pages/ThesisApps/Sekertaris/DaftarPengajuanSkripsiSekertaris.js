import Div from "@jumbo/shared/Div";
import React, { useEffect, useState } from "react";
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
import SearchGlobal from "app/shared/SearchGlobal";
import { Link } from "react-router-dom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import DaftarPengajuanProposalSekertaris from "./DaftarPengajuanProposalSekertaris";

const DaftarPengajuanSkripsiSekertaris = () => {
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
      ready: 0,
      not_ready: 0,
      have_schedule: 0,
      not_schedule: 0,
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
          "http://localhost:2000/api/v1/group/skripsi-list-sekretaris",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Memperoleh data dari respons
        const data = response.data.data;

        // Membalik urutan data
        const reversedData = {
          dashboard: data.dashboard,
          semesterData: data.semesterData.reverse(),
        };

        // Atur state 'setDaftarPengajuanSekertaris' dengan data dari respons
        setDaftarPengajuanSkripsi(response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil daftar bimbingan skripsi:",
          error
        );
      }
    };
    fetchDaftarPengajuanSkripsiData();
  }, [token]);

  // const TableItem = ({ index }) => {
  //   return (
  //     <TableRow key={index}>
  //       <TableCell sx={{ fontSize: "13px" }}>{index + 1}</TableCell>
  //       <TableCell sx={{ fontSize: "13px" }}>Geovalga Fransiscus Lim</TableCell>
  //       <TableCell sx={{ fontSize: "13px" }}>
  //         SISTEM INFORMASI MANAJEMEN SKRIPSI DI FAKULTAS ILMU KOMPUTER
  //         UNIVERSITAS KLABAT
  //       </TableCell>
  //       <TableCell>
  //         <Chip label={"Belum"} />
  //       </TableCell>
  //       <TableCell>
  //         <Chip label={"Belum"} />
  //       </TableCell>
  //       <TableCell>
  //         <Chip label={"Belum"} />
  //       </TableCell>
  //       <TableCell>
  //         <Typography
  //           component={Link}
  //           to="/sistem-informasi-skripsi/daftar-pengajuan-skripsi/beranda"
  //           sx={{
  //             textDecoration: "none",
  //             color: "blue",
  //           }}
  //         >
  //           Detail
  //         </Typography>
  //       </TableCell>
  //     </TableRow>
  //   );
  // };

  return (
    <Div>
      {/* Dashboard Start 1 */}
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
        {/* Belum Mengajukan Skripsi */}
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
              Siap Sidang
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanSkripsi.dashboard.ready} Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Sudah Mengajukan Skripsi */}
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
              Belum Siap Sidang
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanSkripsi.dashboard.not_ready} Kelompok
            </Typography>
          </Div>
        </Div>
      </Div>
      {/* Dashboard End 1*/}
      {/* Dashboard Start 2*/}
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
          <EventAvailableIcon
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
              Sudah Ada Jadwal
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanSkripsi.dashboard.have_schedule} Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Belum Mengajukan Skripsi */}
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
          <EventBusyIcon
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
              Belum Ada Jadwal
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanSkripsi.dashboard.not_schedule} Kelompok
            </Typography>
          </Div>
        </Div>
      </Div>
      {/* Dasboard 2 End */}

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
            Daftar Pengajuan Skripsi
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

        {/* Semester End */}
        {/* Table Mahasiswa Skripsi Start */}
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
                      marginTop: "6px",
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
                            Dokumen Proposal
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Pembayaran
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Cek Plagiat
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
                              {skripsi.skripsi_status === false ? (
                                <Chip label={"Belum"} />
                              ) : skripsi.skripsi_status === true ? (
                                <Chip
                                  label={"Sudah"}
                                  sx={{
                                    background: "rgba(21, 131, 67, 0.10)",
                                    color: "#0A7637",
                                  }}
                                />
                              ) : (
                                skripsi.skripsi_status
                              )}
                            </TableCell>
                            <TableCell sx={{ fontSize: "13px" }}>
                              {skripsi.paymant_status === false ? (
                                <Chip label={"Belum"} />
                              ) : skripsi.paymant_status === true ? (
                                <Chip
                                  label={"Sudah"}
                                  sx={{
                                    background: "rgba(21, 131, 67, 0.10)",
                                    color: "#0A7637",
                                  }}
                                />
                              ) : (
                                skripsi.paymant_status
                              )}
                            </TableCell>
                            <TableCell sx={{ fontSize: "13px" }}>
                              {skripsi.plagiarism === false ? (
                                <Chip label={"Belum"} />
                              ) : skripsi.plagiarism === true ? (
                                <Chip
                                  label={"Sudah"}
                                  sx={{
                                    background: "rgba(21, 131, 67, 0.10)",
                                    color: "#0A7637",
                                  }}
                                />
                              ) : (
                                skripsi.plagiarism
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

        {/* <TableContainer>
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
                <TableCell sx={{ fontSize: "13px" }}>Dokumen Skripsi</TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Pembayaran</TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Cek Plagiat</TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(10)].map((item, index) => (
                <TableItem index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
        {/* Table Mahasiswa Skripsi End */}
      </Div>
      {/* Table Master End */}
    </Div>
  );
};

export default DaftarPengajuanSkripsiSekertaris;
