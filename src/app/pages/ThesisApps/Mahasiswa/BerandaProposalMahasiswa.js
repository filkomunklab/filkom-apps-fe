import React, { useState, useEffect } from "react";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
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

const BerandaProposalMahasiswa = ({
  value: groupId,
  status: advisorAndCoAdvisor,
}) => {
  const [details, setDetails] = useState([]);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchDetailsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/group/submission_details/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setDetails' dengan data dari respons
        setDetails(response.data.data);
        console.log("Request Get details: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil detail:", error);
      }
    };
    fetchDetailsData();
  }, [token, groupId]);

  const { role } = JSON.parse(localStorage.getItem("user"));
  // const role = ["ADVISOR", "DOSEN"];
  console.log(role);

  return (
    <Div sx={{ width: "100%" }}>
      {/* Element 2 Start */}

      <Typography
        sx={{
          width: "100%",
          display: "flex",
          padding: "24px",
          alignItems: "center",
          justifyContent: "center",
          color: "#192434",
          background: "rgba(26, 56, 96, 0.10)",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: 600,
          marginBottom: "25px",
          textTransform: "uppercase",
        }}
      >
        {details.title}
      </Typography>

      <Div
        sx={{
          width: "100%",
          padding: "0 25px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "50px",
        }}
      >
        {/* Table Kelompok Mahasiswa Start*/}
        <Typography
          sx={{
            padding: "14px 16px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "6px 6px 0 0",
            border: "1px",
          }}
        >
          Kelompok Mahasiswa
        </Typography>
        <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
          <Table>
            <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
              <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                <TableCell sx={{ width: "55%" }}>Nama Lengkap</TableCell>
                <TableCell sx={{ width: "20%" }}>NIM</TableCell>
                <TableCell sx={{ width: "20%" }}>Program Studi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details?.students?.map((student, studentIndex) => (
                <TableRow key={studentIndex}>
                  <TableCell>{studentIndex + 1}</TableCell>
                  <TableCell>{student.fullName}</TableCell>
                  <TableCell>{student.nim}</TableCell>
                  <TableCell>
                    {student.major === "IF"
                      ? "Informatika"
                      : student.major === "SI"
                      ? "Sistem Informasi"
                      : student.major}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Table Kelompok mahasiswa End */}

        {/* Table Pengajuan Proposal Start */}
        <Typography
          sx={{
            padding: "14px 16px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "6px 6px 0 0",
            border: "1px",
          }}
        >
          Status Pengajuan Proposal
        </Typography>
        <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
          <Table>
            <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
              <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                <TableCell sx={{ width: "31%", textAlign: "center" }}>
                  Advisor
                </TableCell>
                {advisorAndCoAdvisor?.coAdvisor1 && (
                  <TableCell sx={{ width: "31%", textAlign: "center" }}>
                    Co-Advisor 1
                  </TableCell>
                )}
                {advisorAndCoAdvisor?.coAdvisor2 && (
                  <TableCell sx={{ width: "31%", textAlign: "center" }}>
                    Co-Advisor 2
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {details?.proposal_status?.advisor_status === null ? (
                    <Chip label={"Belum"} />
                  ) : details?.proposal_status?.advisor_status === "Waiting" ? (
                    <Chip
                      label={"Menunggu"}
                      sx={{
                        background: "rgba(255, 204, 0, 0.10)",
                        color: "#985211",
                      }}
                    />
                  ) : details?.proposal_status?.advisor_status === "Approve" ? (
                    <Chip
                      label={"Diterima"}
                      sx={{
                        background: "rgba(21, 131, 67, 0.10)",
                        color: "#0A7637",
                      }}
                    />
                  ) : details?.proposal_status?.advisor_status ===
                    "Rejected" ? (
                    <Chip
                      label={"Ditolak"}
                      sx={{
                        background: "rgba(226, 29, 18, 0.10)",
                        color: "#CA150C",
                      }}
                    />
                  ) : (
                    details?.proposal_status?.advisor_status
                  )}
                </TableCell>
                {advisorAndCoAdvisor?.coAdvisor1 && (
                  <TableCell sx={{ textAlign: "center" }}>
                    {details?.proposal_status?.co_advisor1_status === null ? (
                      <Chip label={"Belum"} />
                    ) : details?.proposal_status?.co_advisor1_status ===
                      "Waiting" ? (
                      <Chip
                        label={"Menunggu"}
                        sx={{
                          background: "rgba(255, 204, 0, 0.10)",
                          color: "#985211",
                        }}
                      />
                    ) : details?.proposal_status?.co_advisor1_status ===
                      "Approve" ? (
                      <Chip
                        label={"Diterima"}
                        sx={{
                          background: "rgba(21, 131, 67, 0.10)",
                          color: "#0A7637",
                        }}
                      />
                    ) : details?.proposal_status?.co_advisor1_status ===
                      "Rejected" ? (
                      <Chip
                        label={"Ditolak"}
                        sx={{
                          background: "rgba(226, 29, 18, 0.10)",
                          color: "#CA150C",
                        }}
                      />
                    ) : (
                      details?.proposal_status?.co_advisor1_status
                    )}
                  </TableCell>
                )}
                {advisorAndCoAdvisor?.coAdvisor2 && (
                  <TableCell sx={{ textAlign: "center" }}>
                    {details?.proposal_status?.co_advisor2_status === null ? (
                      <Chip label={"Belum"} />
                    ) : details?.proposal_status?.co_advisor2_status ===
                      "Waiting" ? (
                      <Chip
                        label={"Menunggu"}
                        sx={{
                          background: "rgba(255, 204, 0, 0.10)",
                          color: "#985211",
                        }}
                      />
                    ) : details?.proposal_status?.co_advisor2_status ===
                      "Approve" ? (
                      <Chip
                        label={"Diterima"}
                        sx={{
                          background: "rgba(21, 131, 67, 0.10)",
                          color: "#0A7637",
                        }}
                      />
                    ) : details?.proposal_status?.co_advisor2_status ===
                      "Rejected" ? (
                      <Chip
                        label={"Ditolak"}
                        sx={{
                          background: "rgba(226, 29, 18, 0.10)",
                          color: "#CA150C",
                        }}
                      />
                    ) : (
                      details?.proposal_status?.co_advisor2_status
                    )}
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table Pengajuan Proposal End */}

        {/* Table Status Siap Maju Sidang Start*/}
        <Typography
          sx={{
            padding: "14px 16px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "6px 6px 0 0",
            border: "1px",
          }}
        >
          Status Siap Maju Sidang
        </Typography>
        <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
          <Table>
            <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
              <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                <TableCell sx={{ width: "5%", textAlign: "center" }}>
                  Nomor
                </TableCell>
                <TableCell sx={{ width: "31%", textAlign: "center" }}>
                  Dokumen Proposal
                </TableCell>
                <TableCell sx={{ width: "31%", textAlign: "center" }}>
                  Bukti Pembayaran
                </TableCell>
                <TableCell sx={{ width: "31%", textAlign: "center" }}>
                  Hasil Cek Plagiat
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {details?.ready_status?.proposalDocumentStatus === null ? (
                    <Chip label={"Belum"} />
                  ) : details?.ready_status?.proposalDocumentStatus ===
                    false ? (
                    <Chip label={"Belum"} />
                  ) : details?.ready_status?.proposalDocumentStatus === true ? (
                    <Chip
                      label={"Sudah"}
                      sx={{
                        background: "rgba(21, 131, 67, 0.10)",
                        color: "#0A7637",
                      }}
                    />
                  ) : (
                    details?.ready_status?.proposalDocumentStatus
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {details?.ready_status?.proposalPaymentStatus === null ? (
                    <Chip label={"Belum"} />
                  ) : details?.ready_status?.proposalPaymentStatus === false ? (
                    <Chip label={"Belum"} />
                  ) : details?.ready_status?.proposalPaymentStatus === true ? (
                    <Chip
                      label={"Sudah"}
                      sx={{
                        background: "rgba(21, 131, 67, 0.10)",
                        color: "#0A7637",
                      }}
                    />
                  ) : (
                    details?.ready_status?.proposalPaymentStatus
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {details?.ready_status?.proposalPlagiarismStatus === null ? (
                    <Chip label={"Belum"} />
                  ) : details?.ready_status?.proposalPlagiarismStatus ===
                    false ? (
                    <Chip label={"Belum"} />
                  ) : details?.ready_status?.proposalPlagiarismStatus ===
                    true ? (
                    <Chip
                      label={"Sudah"}
                      sx={{
                        background: "rgba(21, 131, 67, 0.10)",
                        color: "#0A7637",
                      }}
                    />
                  ) : (
                    details?.ready_status?.proposalPlagiarismStatus
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* Table Status Siap Maju Sidang End */}

        {/* Table Tim Panelis Start*/}
        <Typography
          sx={{
            padding: "14px 16px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "6px 6px 0 0",
            border: "1px",
          }}
        >
          Tim Panelis
        </Typography>
        <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
          <Table>
            <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
              <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                <TableCell sx={{ width: "31%", textAlign: "center" }}>
                  Ketua Panelis
                </TableCell>
                <TableCell sx={{ width: "31%", textAlign: "center" }}>
                  Anggota Panelis
                </TableCell>
                <TableCell sx={{ width: "31%", textAlign: "center" }}>
                  Advisor
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {details?.panelist_team?.panelist_chairman}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {details?.panelist_team?.panelist_member}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {details?.panelist_team?.advisor}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* Table Tim Panelis End*/}

        {/* Table Jadwal Sidang Proposal Start */}
        <Typography
          sx={{
            padding: "14px 16px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "6px 6px 0 0",
            border: "1px",
          }}
        >
          Jadwal Sidang Proposal
        </Typography>
        <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
          <Table>
            <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
              <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                <TableCell sx={{ width: "20%" }}>Nomor</TableCell>
                <TableCell sx={{ width: "20%" }}>Mulai</TableCell>
                <TableCell sx={{ width: "20%" }}>Selesai</TableCell>
                <TableCell sx={{ width: "20%" }}>Tanggal</TableCell>
                <TableCell sx={{ width: "20%" }}>Ruangan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>{details?.schedule?.start}</TableCell>
                <TableCell>{details?.schedule?.end}</TableCell>
                <TableCell>{details?.schedule?.date}</TableCell>
                <TableCell>{details?.schedule?.room}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* Table Jadwal Sidang Proposal End */}

        {/* Table Sidang Proposal Start */}
        <Typography
          sx={{
            padding: "14px 16px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "6px 6px 0 0",
            border: "1px",
          }}
        >
          Status Sidang Proposal
        </Typography>
        <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
          <Table>
            <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
              <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                <TableCell sx={{ width: "50%" }}>Nomor</TableCell>
                <TableCell sx={{ width: "50%" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                  {details?.defence_status?.status === null ? (
                    <Chip label={"Belum"} />
                  ) : details?.defence_status?.status === "Repeat" ? (
                    <Chip
                      label={"Mengulang"}
                      sx={{
                        background: "rgba(255, 204, 0, 0.10)",
                        color: "#985211",
                      }}
                    />
                  ) : details?.defence_status?.status === "Pass" ? (
                    <Chip
                      label={"Lulus"}
                      sx={{
                        background: "rgba(21, 131, 67, 0.10)",
                        color: "#0A7637",
                      }}
                    />
                  ) : details?.defence_status?.status === "Fail" ? (
                    <Chip
                      label={"Tidak Lulus"}
                      sx={{
                        background: "rgba(226, 29, 18, 0.10)",
                        color: "#CA150C",
                      }}
                    />
                  ) : (
                    details?.defence_status?.status
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* Table Sidang Proposal End */}

        {/* Table Revisi Proposal Start */}
        <Typography
          sx={{
            padding: "14px 16px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "6px 6px 0 0",
            border: "1px",
          }}
        >
          Status Revisi Proposal
        </Typography>
        <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
          <Table>
            <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
              <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                <TableCell sx={{ width: "5%", textAlign: "center" }}>
                  Nomor
                </TableCell>
                <TableCell sx={{ width: "31%", textAlign: "center" }}>
                  Ketua Panelis
                </TableCell>
                <TableCell sx={{ width: "31%", textAlign: "center" }}>
                  Anggota Panelis
                </TableCell>
                <TableCell sx={{ width: "31%", textAlign: "center" }}>
                  Advisor
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {details?.revisi_status?.chairman_status === "Belum" ? (
                    <Chip label={"Belum"} />
                  ) : details?.revisi_status?.chairman_status === "Waiting" ? (
                    <Chip
                      label={"Menunggu"}
                      sx={{
                        background: "rgba(255, 204, 0, 0.10)",
                        color: "#985211",
                      }}
                    />
                  ) : details?.revisi_status?.chairman_status === "Approve" ? (
                    <Chip
                      label={"Diterima"}
                      sx={{
                        background: "rgba(21, 131, 67, 0.10)",
                        color: "#0A7637",
                      }}
                    />
                  ) : details?.revisi_status?.chairman_status === "Rejected" ? (
                    <Chip
                      label={"Ditolak"}
                      sx={{
                        background: "rgba(226, 29, 18, 0.10)",
                        color: "#CA150C",
                      }}
                    />
                  ) : (
                    details?.revisi_status?.chairman_status
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {details?.revisi_status?.member_status === "Belum" ? (
                    <Chip label={"Belum"} />
                  ) : details?.revisi_status?.member_status === "Waiting" ? (
                    <Chip
                      label={"Menunggu"}
                      sx={{
                        background: "rgba(255, 204, 0, 0.10)",
                        color: "#985211",
                      }}
                    />
                  ) : details?.revisi_status?.member_status === "Approve" ? (
                    <Chip
                      label={"Diterima"}
                      sx={{
                        background: "rgba(21, 131, 67, 0.10)",
                        color: "#0A7637",
                      }}
                    />
                  ) : details?.revisi_status?.member_status === "Rejected" ? (
                    <Chip
                      label={"Ditolak"}
                      sx={{
                        background: "rgba(226, 29, 18, 0.10)",
                        color: "#CA150C",
                      }}
                    />
                  ) : (
                    details?.revisi_status?.member_status
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {details?.revisi_status?.advisor_status === "Belum" ? (
                    <Chip label={"Belum"} />
                  ) : details?.revisi_status?.advisor_status === "Waiting" ? (
                    <Chip
                      label={"Menunggu"}
                      sx={{
                        background: "rgba(255, 204, 0, 0.10)",
                        color: "#985211",
                      }}
                    />
                  ) : details?.revisi_status?.advisor_status === "Approve" ? (
                    <Chip
                      label={"Diterima"}
                      sx={{
                        background: "rgba(21, 131, 67, 0.10)",
                        color: "#0A7637",
                      }}
                    />
                  ) : details?.revisi_status?.advisor_status === "Rejected" ? (
                    <Chip
                      label={"Ditolak"}
                      sx={{
                        background: "rgba(226, 29, 18, 0.10)",
                        color: "#CA150C",
                      }}
                    />
                  ) : (
                    details?.revisi_status?.advisor_status
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* Table Revisi Proposal End */}
      </Div>
      {/* Element 2 End */}
    </Div>
  );
};

export default BerandaProposalMahasiswa;
