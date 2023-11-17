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
import SearchGlobal from "app/shared/SearchGlobal";
import { Link } from "react-router-dom";
import DateRangeIcon from "@mui/icons-material/DateRange";
import GavelIcon from "@mui/icons-material/Gavel";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DaftarPengujianSkripsiKetuaPenelis = () => {
  // State untuk melacak panel accordion yang terbuka
  const [expanded, setExpanded] = useState(false);

  // Fungsi untuk menangani perubahan pada state accordion yang terbuka
  const handleChangee = (panel) => (event, isExpanded) => {
    // Mengatur state expanded berdasarkan apakah panel tersebut terbuka
    setExpanded(isExpanded ? panel : false);
  };

  const [daftarPengujianSkripsi, setDaftarPengujianSkripsi] = useState({
    dashboard: {
      total_group: 0,
      not_defence: 0,
      has_defence: 0,
      has_revision: 0,
      not_revision: 0,
    },
    semesterData: [],
  });

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchDaftarPengujianSkripsiData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/group/skripsi-list-chairman",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setDaftarPengujianSkripsi' dengan data dari respons
        setDaftarPengujianSkripsi(response.data.data);
        console.log("Request get daftar skripsi: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil daftar pengujian skripsi:",
          error
        );
      }
    };
    fetchDaftarPengujianSkripsiData();
  }, [token]);

  return (
    <Div>
      {/* Dashboard Start */}
      <Div
        sx={{
          display: "flex",
          width: "100%",
          padding: "10px 0px",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {/* Kelompok Yang Diuji */}
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
              Kelompok Yang Diuji
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengujianSkripsi.dashboard.total_group} Kelompok
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
          <DateRangeIcon
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
              {daftarPengujianSkripsi.dashboard.not_defence} Kelompok
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
          <GavelIcon sx={{ width: "35px", height: "35px", color: "#006AF5" }} />
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
              {daftarPengujianSkripsi.dashboard.has_defence} Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Belum Selesai Revisi*/}
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
          <DownloadDoneIcon
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
              Sudah Selesai Revisi
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengujianSkripsi.dashboard.has_revision} Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Skripsi yang diterima */}
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
          <BorderColorIcon
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
              Belum Selesai Revisi
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengujianSkripsi.dashboard.not_revision} Kelompok
            </Typography>
          </Div>
        </Div>
      </Div>
      {/* Dashboard End */}

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
            Daftar Pengujian Skripsi Ketua Panelis
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
          {daftarPengujianSkripsi.semesterData.map(
            (semesterData, semesterIndex) => (
              <Accordion
                key={semesterIndex}
                expanded={expanded === `panel${semesterIndex}`} // Memeriksa apakah accordion ini terbuka
                onChange={handleChangee(`panel${semesterIndex}`)} // Menangani perubahan state accordion
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
                            Sidang
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Revisi Ketua Penelis
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Revisi Anggota Penelis
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Revisi Advisor
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
                              {skripsi.defence_status === null ? (
                                <Chip label={"Belum"} />
                              ) : skripsi.defence_status === "Repeat" ? (
                                <Chip
                                  label={"Mengulang"}
                                  sx={{
                                    background: "rgba(255, 204, 0, 0.10)",
                                    color: "#985211",
                                  }}
                                />
                              ) : skripsi.defence_status === "Pass" ? (
                                <Chip
                                  label={"Lulus"}
                                  sx={{
                                    background: "rgba(21, 131, 67, 0.10)",
                                    color: "#0A7637",
                                  }}
                                />
                              ) : skripsi.defence_status === "Fail" ? (
                                <Chip
                                  label={"Tidak Lulus"}
                                  sx={{
                                    background: "rgba(226, 29, 18, 0.10)",
                                    color: "#CA150C",
                                  }}
                                />
                              ) : (
                                skripsi.defence_status
                              )}
                            </TableCell>
                            <TableCell sx={{ fontSize: "13px" }}>
                              {skripsi.approve_chairman === null ? (
                                <Chip label={"Belum"} />
                              ) : skripsi.approve_chairman === "Waiting" ? (
                                <Chip
                                  label={"Mengunggu"}
                                  sx={{
                                    background: "rgba(255, 204, 0, 0.10)",
                                    color: "#985211",
                                  }}
                                />
                              ) : skripsi.approve_chairman === "Approve" ? (
                                <Chip
                                  label={"Diterima"}
                                  sx={{
                                    background: "rgba(21, 131, 67, 0.10)",
                                    color: "#0A7637",
                                  }}
                                />
                              ) : skripsi.approve_chairman === "Rejected" ? (
                                <Chip
                                  label={"Ditolak"}
                                  sx={{
                                    background: "rgba(226, 29, 18, 0.10)",
                                    color: "#CA150C",
                                  }}
                                />
                              ) : (
                                skripsi.approve_chairman
                              )}
                            </TableCell>
                            <TableCell sx={{ fontSize: "13px" }}>
                              {skripsi.approve_member === null ? (
                                <Chip label={"Belum"} />
                              ) : skripsi.approve_member === "Waiting" ? (
                                <Chip
                                  label={"Mengunggu"}
                                  sx={{
                                    background: "rgba(255, 204, 0, 0.10)",
                                    color: "#985211",
                                  }}
                                />
                              ) : skripsi.approve_member === "Approve" ? (
                                <Chip
                                  label={"Diterima"}
                                  sx={{
                                    background: "rgba(21, 131, 67, 0.10)",
                                    color: "#0A7637",
                                  }}
                                />
                              ) : skripsi.approve_member === "Rejected" ? (
                                <Chip
                                  label={"Ditolak"}
                                  sx={{
                                    background: "rgba(226, 29, 18, 0.10)",
                                    color: "#CA150C",
                                  }}
                                />
                              ) : (
                                skripsi.approve_member
                              )}
                            </TableCell>
                            <TableCell sx={{ fontSize: "13px" }}>
                              {skripsi.approve_advisor === null ? (
                                <Chip label={"Belum"} />
                              ) : skripsi.approve_advisor === "Waiting" ? (
                                <Chip
                                  label={"Mengunggu"}
                                  sx={{
                                    background: "rgba(255, 204, 0, 0.10)",
                                    color: "#985211",
                                  }}
                                />
                              ) : skripsi.approve_advisor === "Approve" ? (
                                <Chip
                                  label={"Diterima"}
                                  sx={{
                                    background: "rgba(21, 131, 67, 0.10)",
                                    color: "#0A7637",
                                  }}
                                />
                              ) : skripsi.approve_advisor === "Rejected" ? (
                                <Chip
                                  label={"Ditolak"}
                                  sx={{
                                    background: "rgba(226, 29, 18, 0.10)",
                                    color: "#CA150C",
                                  }}
                                />
                              ) : (
                                skripsi.approve_advisor
                              )}
                            </TableCell>
                            <TableCell>
                              <Typography
                                component={Link}
                                to={`/sistem-informasi-skripsi/daftar-pengujian-skripsi-ketua/beranda/${skripsi.group_id}/KETUA_PANELIS`}
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

        {daftarPengujianSkripsi.semesterData.map(
          (semesterData, semesterIndex) => (
            <div key={semesterIndex} style={{ width: "100%" }}>
              <Div
                sx={{
                  display: "flex",
                  width: "100%",
                  padding: "24px",
                  alignItems: "center",
                  gap: "10px",
                  borderRadius: "6px",
                  background: "rgba(26, 56, 96, 0.10)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "24px",
                    color: "#192434",
                  }}
                >
                  {semesterData.semester}
                </Typography>
              </Div>
              {/* Semester End */}
              {/* Table Mahasiswa Skripsi Start */}
              <TableContainer>
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
                      <TableCell sx={{ fontSize: "13px" }}>Sidang</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        Revisi Ketua Penelis
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        Revisi Anggota Penelis
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        Revisi Advisor
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Action</TableCell>
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
                          {skripsi.defence_status === null ? (
                            <Chip label={"Belum"} />
                          ) : skripsi.defence_status === "Repeat" ? (
                            <Chip
                              label={"Mengulang"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : skripsi.defence_status === "Pass" ? (
                            <Chip
                              label={"Lulus"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : skripsi.defence_status === "Fail" ? (
                            <Chip
                              label={"Tidak Lulus"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            skripsi.defence_status
                          )}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {skripsi.approve_chairman === null ? (
                            <Chip label={"Belum"} />
                          ) : skripsi.approve_chairman === "Waiting" ? (
                            <Chip
                              label={"Mengunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : skripsi.approve_chairman === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : skripsi.approve_chairman === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            skripsi.approve_chairman
                          )}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {skripsi.approve_member === null ? (
                            <Chip label={"Belum"} />
                          ) : skripsi.approve_member === "Waiting" ? (
                            <Chip
                              label={"Mengunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : skripsi.approve_member === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : skripsi.approve_member === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            skripsi.approve_member
                          )}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {skripsi.approve_advisor === null ? (
                            <Chip label={"Belum"} />
                          ) : skripsi.approve_advisor === "Waiting" ? (
                            <Chip
                              label={"Mengunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : skripsi.approve_advisor === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : skripsi.approve_advisor === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            skripsi.approve_advisor
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography
                            component={Link}
                            to={`/sistem-informasi-skripsi/daftar-pengujian-skripsi-ketua/beranda/${skripsi.group_id}/KETUA_PANELIS`}
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
              {/* Table Mahasiswa Skripsi End */}
            </div>
          )
        )}
      </Div>
      {/* Table Master End */}
    </Div>
  );
};

export default DaftarPengujianSkripsiKetuaPenelis;
