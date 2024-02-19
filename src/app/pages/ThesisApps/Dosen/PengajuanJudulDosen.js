import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";

// View Document pengajuan judul
const PDFViewerPengajuanJudul = ({ pengajuanJudulFile }) => {
  const viewPDFPengajuanJudul = () => {
    // Buat URL objek untuk file PDF
    const pdfURL = URL.createObjectURL(pengajuanJudulFile);

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span onClick={viewPDFPengajuanJudul}>Lihat</span>
    </div>
  );
};

const PengajuanJudul = () => {
  // state - simpan request pengajuan judul
  const [pengajuanJudul, setPengajuanJudul] = useState();
  const [daftarDosen, setDaftarDosen] = useState();

  const [submissionId, setSubmissionId] = useState(null);

  const groupId = useParams().groupId;
  console.log("group id: ", groupId);

  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchPengajuanJudulData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/submission/${submissionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPengajuanJudul(response.data.data);
        console.log("Request Get pengajuan judul: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil pengajuan judul:",
          error
        );
      }
    };
    const fetchDaftarDosenData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/group/dosen-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setDaftarDosen(response.data.data);
        console.log("Request Get daftar dosen: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil daftar dosen:", error);
      }
    };
    fetchPengajuanJudulData();
    fetchDaftarDosenData();
  }, [token, submissionId]);
  return (
    <Div>
      <Div
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "24px",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
          Pengajuan Judul
        </Typography>
      </Div>

      <Div
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        {/* Element 1 Start */}
        <Div
          sx={{
            display: "none",
            width: "350px",
            padding: "5px",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Riwayatlog
            value={groupId}
            riwayatData={(data) => {
              if (data) {
                setSubmissionId(data.submission_id);
              }
            }}
          />
        </Div>
        {/* Element 1 End */}
        {/* Element 2 Start */}
        <Div
          sx={{
            direction: "row",
            display: "flex",
            width: "1050px",
            paddingBottom: "0px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
            borderRadius: "8px",
          }}
        >
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
            <Div sx={{ marginBottom: "25px" }}>
              <Typography>Status</Typography>
              {pengajuanJudul?.is_approve === "Waiting" ? (
                <Chip
                  label="Menunggu"
                  sx={{
                    background: "rgba(255, 204, 0, 0.10)",
                    color: "#985211",
                    height: "25px",
                  }}
                />
              ) : pengajuanJudul?.is_approve === "Approve" ? (
                <Chip
                  label={"Diterima"}
                  sx={{
                    background: "rgba(21, 131, 67, 0.10)",
                    color: "#0A7637",
                  }}
                />
              ) : pengajuanJudul?.is_approve === "Rejected" ? (
                <Chip
                  label={"Ditolak"}
                  sx={{
                    background: "rgba(226, 29, 18, 0.10)",
                    color: "#CA150C",
                  }}
                />
              ) : (
                pengajuanJudul?.is_approve
              )}
            </Div>
            {/* Table Start*/}
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
              <TableContainer sx={{ marginBottom: "50px" }}>
                <Table>
                  <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "25%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "25%" }}>Nama Lengkap</TableCell>
                      <TableCell sx={{ width: "25%" }}>NIM</TableCell>
                      <TableCell sx={{ width: "25%" }}>Program Studi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pengajuanJudul?.students?.map((student, studentIndex) => (
                      <TableRow>
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
              {/* Judul Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {pengajuanJudul?.title}
                </Typography>
              </Div>
              {/* Judul End */}
              {/* Table Upload Pengajuan Judul Start*/}
              <TableContainer sx={{ marginBottom: "25px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "#F5F5F5" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "45%" }}
                      >
                        Nama File
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "45%" }}
                      >
                        Tanggal Unggah
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "20%" }}
                      >
                        Ukuran
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          padding: "11px",
                          textAlign: "center",
                          width: "12%",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {pengajuanJudul?.file_name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {pengajuanJudul?.upload_date}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {pengajuanJudul?.file_size} bytes
                      </TableCell>
                      <TableCell>
                        <Div sx={{ display: "flex" }}>
                          <span
                            style={{
                              textDecoration: "none",
                              cursor: "pointer",
                              color: "blue",
                              fontSize: "12px",
                            }}
                          >
                            <PDFViewerPengajuanJudul
                              pengajuanJudulFile={pengajuanJudul}
                            />
                          </span>
                        </Div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Upload Pengajuan Judul End*/}
              {/* Select Dosen Pembimbing Start */}
              <Div
                sx={{
                  display: "flex",
                  height: "62px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "15px",
                  alignSelf: "stretch",
                  marginBottom: "20px",
                }}
              >
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "40px",
                  }}
                >
                  <Div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "15px",
                    }}
                  >
                    <Typography>Calon Advisor</Typography>
                    <Typography>
                      {
                        (
                          daftarDosen?.find(
                            (dosen) =>
                              dosen.id === pengajuanJudul?.proposed_advisor_id
                          ) || {}
                        ).name
                      }
                    </Typography>
                  </Div>
                  {pengajuanJudul?.proposed_co_advisor1_id !== null && (
                    <Div
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "15px",
                      }}
                    >
                      <Typography>Calon Co-Advisor 1</Typography>
                      <Typography>
                        {
                          (
                            daftarDosen?.find(
                              (dosen) =>
                                dosen.id ===
                                pengajuanJudul?.proposed_co_advisor1_id
                            ) || {}
                          ).name
                        }
                      </Typography>
                    </Div>
                  )}
                  {pengajuanJudul?.proposed_co_advisor2_id !== null && (
                    <Div
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "15px",
                      }}
                    >
                      <Typography>Calon Co-Advisor 2</Typography>
                      <Typography>
                        {
                          (
                            daftarDosen?.find(
                              (dosen) =>
                                dosen.id ===
                                pengajuanJudul?.proposed_co_advisor2_id
                            ) || {}
                          ).name
                        }
                      </Typography>
                    </Div>
                  )}
                </Div>
              </Div>
              {/* Select Dosen Pembimbing End */}

              {/* Radio Button Start */}
              <Div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="subtitle2" gutterBottom component="div">
                  Apakah Anda sudah melakukan konsultasi dengan Advisor sebelum
                  mengajukan judul?
                </Typography>
                <Typography>Ya</Typography>
              </Div>
              {/* Radio Button End*/}
            </Div>
          </Div>
        </Div>
        {/* Element 2 End */}
      </Div>
    </Div>
  );
};

export default PengajuanJudul;
