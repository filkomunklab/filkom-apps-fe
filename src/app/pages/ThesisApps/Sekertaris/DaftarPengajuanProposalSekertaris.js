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
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DaftarPengajuanProposalSekertaris = () => {
  // State untuk melacak panel accordion yang terbuka
  const [expanded, setExpanded] = useState(false);

  // Fungsi untuk menangani perubahan pada state accordion yang terbuka
  const handleChange = (panel) => (event, isExpanded) => {
    // Mengatur state expanded berdasarkan apakah panel tersebut terbuka
    setExpanded(isExpanded ? panel : false);
  };
  const [daftarPengajuanProposal, setDaftarPengajuanProposal] = useState({
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
    const fetchDaftarPengajuanProposalData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/group/proposal-list-sekretaris",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setDaftarPengajuanProposal' dengan data dari respons
        setDaftarPengajuanProposal(response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil daftar bimbingan proposal:",
          error
        );
      }
    };
    fetchDaftarPengajuanProposalData();
  }, [token]);

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
              {daftarPengajuanProposal.dashboard.total_group} Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Belum Mengajukan Proposal */}
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
              {daftarPengajuanProposal.dashboard.ready} Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Sudah Mengajukan Proposal */}
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
              {daftarPengajuanProposal.dashboard.not_ready} Kelompok
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
              {daftarPengajuanProposal.dashboard.have_schedule} Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Belum Mengajukan Proposal */}
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
              {daftarPengajuanProposal.dashboard.not_schedule} Kelompok
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
            Daftar Pengajuan Proposal
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
          {daftarPengajuanProposal.semesterData.map(
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
                        {semesterData.proposals.map(
                          (proposal, proposalIndex) => (
                            <TableRow key={proposalIndex}>
                              <TableCell sx={{ fontSize: "13px" }}>
                                {proposalIndex + 1}
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                {proposal.students.map((student) => (
                                  <div key={student.id}>{student.fullName}</div>
                                ))}
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                {proposal.title}
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                {proposal.proposal_status === false ? (
                                  <Chip label={"Belum"} />
                                ) : proposal.proposal_status === true ? (
                                  <Chip
                                    label={"Sudah"}
                                    sx={{
                                      background: "rgba(21, 131, 67, 0.10)",
                                      color: "#0A7637",
                                    }}
                                  />
                                ) : (
                                  proposal.proposal_status
                                )}
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                {proposal.paymant_status === false ? (
                                  <Chip label={"Belum"} />
                                ) : proposal.paymant_status === true ? (
                                  <Chip
                                    label={"Sudah"}
                                    sx={{
                                      background: "rgba(21, 131, 67, 0.10)",
                                      color: "#0A7637",
                                    }}
                                  />
                                ) : (
                                  proposal.paymant_status
                                )}
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                {proposal.plagiarism === false ? (
                                  <Chip label={"Belum"} />
                                ) : proposal.plagiarism === true ? (
                                  <Chip
                                    label={"Sudah"}
                                    sx={{
                                      background: "rgba(21, 131, 67, 0.10)",
                                      color: "#0A7637",
                                    }}
                                  />
                                ) : (
                                  proposal.plagiarism
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
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            )
          )}
        </Div>

        {/* {daftarPengajuanProposal.semesterData.map(
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
        {/* Table Mahasiswa Proposal Start *
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
                      <TableCell sx={{ fontSize: "13px" }}>
                        Dokumen Proposal
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        Pembayaran
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        Cek Plagiat
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {semesterData.proposals.map((proposal, proposalIndex) => (
                      <TableRow key={proposalIndex}>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {proposalIndex + 1}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {proposal.students.map((student) => (
                            <div key={student.id}>{student.fullName}</div>
                          ))}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {proposal.title}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {proposal.proposal_status === false ? (
                            <Chip label={"Belum"} />
                          ) : proposal.proposal_status === true ? (
                            <Chip
                              label={"Sudah"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : (
                            proposal.proposal_status
                          )}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {proposal.paymant_status === false ? (
                            <Chip label={"Belum"} />
                          ) : proposal.paymant_status === true ? (
                            <Chip
                              label={"Sudah"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : (
                            proposal.paymant_status
                          )}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {proposal.plagiarism === false ? (
                            <Chip label={"Belum"} />
                          ) : proposal.plagiarism === true ? (
                            <Chip
                              label={"Sudah"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : (
                            proposal.plagiarism
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
              {/* Table Mahasiswa Proposal End *
            </div>
          )
        )} */}
      </Div>
      {/* Table Master End */}
    </Div>
  );
};

export default DaftarPengajuanProposalSekertaris;
