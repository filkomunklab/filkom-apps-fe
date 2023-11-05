import React, { useState, useEffect } from "react";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import DraftsIcon from "@mui/icons-material/Drafts";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  Chip,
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
import DateRangeIcon from "@mui/icons-material/DateRange";
import GavelIcon from "@mui/icons-material/Gavel";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { DownloadDone, Mail } from "@mui/icons-material";

const DaftarPengajuanJudulDekan = () => {
  const [daftarPengajuanJudul, setDaftarPengajuanJudul] = useState({
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
    const fetchDaftarPengajuanJudulData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/group/submission-list-dekan",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setDaftarPengajuanJudul' dengan data dari respons
        setDaftarPengajuanJudul(response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil daftar pengajuan:",
          error
        );
      }
    };
    fetchDaftarPengajuanJudulData();
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
              {daftarPengajuanJudul.dashboard.total_group} Kelompok
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
          <Mail sx={{ width: "35px", height: "35px", color: "#006AF5" }} />
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
              Belum Mengajukan Judul
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanJudul.dashboard.not_submitted} Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Sudah Mengajukan judul */}
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
          <DraftsIcon
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
              Sudah Mengajukan Judul
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanJudul.dashboard.has_submitted} Kelompok
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
              Judul Yang di Terima
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanJudul.dashboard.approved} Judul
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
          <ClearIcon sx={{ width: "35px", height: "35px", color: "#006AF5" }} />
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
              Judul Yang di Tolak
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanJudul.dashboard.rejected} Judul
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
            Daftar Pengajuan Judul
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
        {/* Semester and Table Mahasiswa Proposal Start */}
        {daftarPengajuanJudul.semesterData.map(
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
              {/* Table Mahasiswa Proposal Start */}
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
                      <TableCell sx={{ fontSize: "13px" }}>Status</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Action</TableCell>
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
                              <Chip
                                label={"Belum"}
                                sx={{
                                  background: "rgba(226, 29, 18, 0.10)",
                                  color: "#CA150C",
                                }}
                              />
                            )}
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            {submission.is_approve === "Waiting" ? (
                              <Chip
                                label={"Mengunggu"}
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
            </div>
          )
        )}
        {/* Table Mahasiswa Proposal End */}
      </Div>
      {/* Table Master End */}
    </Div>
  );
};

export default DaftarPengajuanJudulDekan;
