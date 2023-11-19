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

const DaftarBimbinganProposalAdvisor = () => {
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
              Jumlah bimbingan
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarBimbinganProposal.dashboard.total_group} Kelompok
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
              Belum Mengajukan Proposal
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarBimbinganProposal.dashboard.not_submitted} Kelompok
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
              Sudah Mengajukan Proposal
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarBimbinganProposal.dashboard.has_submitted} Kelompok
            </Typography>
          </Div>
        </Div>
        {/* proposal yang Di Tolak */}
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
          <ArrowDownwardIcon
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
              Proposal Yang Di Tolak
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarBimbinganProposal.dashboard.rejected} Proposal
            </Typography>
          </Div>
        </Div>
        {/* Proposal yang diterima */}
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
          <StarBorderIcon
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
              Proposal Yang Diterima
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarBimbinganProposal.dashboard.approved} Proposal
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
            Daftar Bimbingan Proposal Advisor
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
          {daftarBimbinganProposal?.semesterData?.map(
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
                            Disetujui Advisor
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Disetujui Co-Advisor 1
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Disetujui Co-Advisor 2
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
                                {proposal.approve_by_advisor === null ? (
                                  <Chip label={"Belum"} />
                                ) : proposal.approve_by_advisor ===
                                  "Waiting" ? (
                                  <Chip
                                    label={"Mengunggu"}
                                    sx={{
                                      background: "rgba(255, 204, 0, 0.10)",
                                      color: "#985211",
                                    }}
                                  />
                                ) : proposal.approve_by_advisor ===
                                  "Approve" ? (
                                  <Chip
                                    label={"Diterima"}
                                    sx={{
                                      background: "rgba(21, 131, 67, 0.10)",
                                      color: "#0A7637",
                                    }}
                                  />
                                ) : proposal.approve_by_advisor ===
                                  "Rejected" ? (
                                  <Chip
                                    label={"Ditolak"}
                                    sx={{
                                      background: "rgba(226, 29, 18, 0.10)",
                                      color: "#CA150C",
                                    }}
                                  />
                                ) : (
                                  proposal.approve_by_advisor
                                )}
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                {proposal.approve_by_co_advisor1 === null ? (
                                  <Chip label={"Belum"} />
                                ) : proposal.approve_by_co_advisor1 ===
                                  "Waiting" ? (
                                  <Chip
                                    label={"Mengunggu"}
                                    sx={{
                                      background: "rgba(255, 204, 0, 0.10)",
                                      color: "#985211",
                                    }}
                                  />
                                ) : proposal.approve_by_co_advisor1 ===
                                  "Approve" ? (
                                  <Chip
                                    label={"Diterima"}
                                    sx={{
                                      background: "rgba(21, 131, 67, 0.10)",
                                      color: "#0A7637",
                                    }}
                                  />
                                ) : proposal.approve_by_co_advisor1 ===
                                  "Rejected" ? (
                                  <Chip
                                    label={"Ditolak"}
                                    sx={{
                                      background: "rgba(226, 29, 18, 0.10)",
                                      color: "#CA150C",
                                    }}
                                  />
                                ) : (
                                  proposal.approve_by_co_advisor1
                                )}
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                {proposal.approve_by_co_advisor2 === null ? (
                                  <Chip label={"Belum"} />
                                ) : proposal.approve_by_co_advisor2 ===
                                  "Waiting" ? (
                                  <Chip
                                    label={"Mengunggu"}
                                    sx={{
                                      background: "rgba(255, 204, 0, 0.10)",
                                      color: "#985211",
                                    }}
                                  />
                                ) : proposal.approve_by_co_advisor2 ===
                                  "Approve" ? (
                                  <Chip
                                    label={"Diterima"}
                                    sx={{
                                      background: "rgba(21, 131, 67, 0.10)",
                                      color: "#0A7637",
                                    }}
                                  />
                                ) : proposal.approve_by_co_advisor2 ===
                                  "Rejected" ? (
                                  <Chip
                                    label={"Ditolak"}
                                    sx={{
                                      background: "rgba(226, 29, 18, 0.10)",
                                      color: "#CA150C",
                                    }}
                                  />
                                ) : (
                                  proposal.approve_by_co_advisor2
                                )}
                              </TableCell>
                              <TableCell>
                                <Typography
                                  component={Link}
                                  to={`/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/beranda/${proposal.group_id}/ADVISOR`}
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

        {/* {daftarBimbinganProposal.semesterData.map(
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
        {/* Table Mahasiswa Proposal Start 
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
                        Disetujui Advisor
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        Disetujui Co-Advisor 1
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        Disetujui Co-Advisor 2
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
                          {proposal.approve_by_advisor === null ? (
                            <Chip label={"Belum"} />
                          ) : proposal.approve_by_advisor === "Waiting" ? (
                            <Chip
                              label={"Mengunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : proposal.approve_by_advisor === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : proposal.approve_by_advisor === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            proposal.approve_by_advisor
                          )}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {proposal.approve_by_co_advisor1 === null ? (
                            <Chip label={"Belum"} />
                          ) : proposal.approve_by_co_advisor1 === "Waiting" ? (
                            <Chip
                              label={"Mengunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : proposal.approve_by_co_advisor1 === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : proposal.approve_by_co_advisor1 === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            proposal.approve_by_co_advisor1
                          )}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {proposal.approve_by_co_advisor2 === null ? (
                            <Chip label={"Belum"} />
                          ) : proposal.approve_by_co_advisor2 === "Waiting" ? (
                            <Chip
                              label={"Mengunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : proposal.approve_by_co_advisor2 === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : proposal.approve_by_co_advisor2 === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            proposal.approve_by_co_advisor2
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography
                            component={Link}
                            to={`/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/beranda/${proposal.group_id}/ADVISOR`}
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
            </div>
          )
        )} */}
        {/* Table Mahasiswa Proposal End */}
      </Div>
      {/* Table Master End */}
    </Div>
  );
};

export default DaftarBimbinganProposalAdvisor;
