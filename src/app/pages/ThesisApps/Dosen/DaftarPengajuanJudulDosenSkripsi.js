import React, { useState, useEffect } from "react";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import PeopleIcon from "@mui/icons-material/People";
import DraftsIcon from "@mui/icons-material/Drafts";
import ClearIcon from "@mui/icons-material/Clear";
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
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { Mail } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { BASE_URL_API } from "@jumbo/config/env";

const DaftarPengajuanJudulDosenSkripsi = () => {
  // State untuk melacak panel accordion yang terbuka
  const [expanded, setExpanded] = useState(false);

  // state Pencarian
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Fungsi untuk menangani perubahan pada state accordion yang terbuka
  const handleChangee = (panel) => (event, isExpanded) => {
    // Mengatur state expanded berdasarkan apakah panel tersebut terbuka
    setExpanded(isExpanded ? panel : false);
  };

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

  // Fungsi untuk menangani pencarian
  const handleSearch = () => {
    // Lakukan pencarian di sini, misalnya menggunakan filter
    const results = daftarPengajuanJudul.semesterData
      .flatMap((semesterData) => semesterData.submissions)
      .filter((submission) =>
        submission.students.some(
          (student) =>
            student.fullName
              .toLowerCase()
              .includes(searchKeyword.toLowerCase()) ||
            submission.title.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      );

    setSearchResults(results);
    setSearchQuery(searchKeyword);
    setIsSearchModalOpen(true);
  };

  // Fungsi untuk menutup modal pencarian
  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  useEffect(() => {
    const fetchDaftarPengajuanJudulData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL_API}/group/submission-list-mk`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Atur state 'setDaftarPengajuanJudul' dengan data dari respons
        setDaftarPengajuanJudul(response.data.data);
        console.log("Request get daftar judul: ", response.data.data);
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
              {daftarPengajuanJudul?.dashboard.total_group} Kelompok
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
              {daftarPengajuanJudul?.dashboard.not_submitted} Kelompok
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
              {daftarPengajuanJudul?.dashboard.has_submitted} Kelompok
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
              {daftarPengajuanJudul?.dashboard.approved} Judul
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
              {daftarPengajuanJudul?.dashboard.rejected} Judul
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
            {/* input search */}
            <TextField
              id="search-input"
              variant="outlined"
              placeholder="Cari Nama Mahasiswa atau Judul"
              size="small"
              sx={{
                borderRadius: 25,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 25,
                },
              }}
              fullWidth
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Div>
          {/* popup Pencarian */}
          <Dialog
            open={isSearchModalOpen}
            onClose={handleCloseSearchModal}
            fullWidth
            maxWidth="xl"
          >
            <DialogTitle sx={{ textAlign: "center" }}>
              <Typography variant="h2" gutterBottom>
                Hasil Pencarian
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography sx={{ marginBottom: "20px" }}>
                Pencarian Anda : {searchQuery}
              </Typography>
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
                    {searchResults.map((submission, submissionIndex) => (
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
                          {submission.proposed_co_advisor1 !== null
                            ? submission.proposed_co_advisor1
                            : "-"}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {submission.proposed_co_advisor2 !== null
                            ? submission.proposed_co_advisor2
                            : "-"}
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
                            to={`/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/beranda/${submission.group_id}/DOSEN_MK`}
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
            </DialogContent>
            <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
              <Button
                onClick={handleCloseSearchModal}
                color="primary"
                sx={{
                  background: "white",
                  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                  textTransform: "none",
                  color: "black",
                }}
              >
                Kembali
              </Button>
            </DialogActions>
          </Dialog>
        </Div>
        {/* Header End */}
        {/* Semester and Table Mahasiswa Proposal Start */}
        {daftarPengajuanJudul?.semesterData?.length > 0 ? (
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
            {daftarPengajuanJudul?.semesterData?.map(
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
                      {semesterData?.semester}
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
                            <TableCell
                              sx={{ width: "200px", fontSize: "13px" }}
                            >
                              Mahasiswa
                            </TableCell>
                            <TableCell sx={{ fontSize: "13px" }}>
                              Judul
                            </TableCell>
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
                          {semesterData?.submissions.map(
                            (submission, submissionIndex) => (
                              <TableRow key={submissionIndex}>
                                <TableCell sx={{ fontSize: "13px" }}>
                                  {submissionIndex + 1}
                                </TableCell>
                                <TableCell sx={{ fontSize: "13px" }}>
                                  {submission.students.map((student) => (
                                    <div key={student.id}>
                                      {student.fullName}
                                    </div>
                                  ))}
                                </TableCell>

                                <TableCell sx={{ fontSize: "13px" }}>
                                  {submission.title}
                                </TableCell>
                                <TableCell sx={{ fontSize: "13px" }}>
                                  {submission.proposed_advisor}
                                </TableCell>
                                <TableCell sx={{ fontSize: "13px" }}>
                                  {submission.proposed_co_advisor1 !== null
                                    ? submission.proposed_co_advisor1
                                    : "-"}
                                </TableCell>
                                <TableCell sx={{ fontSize: "13px" }}>
                                  {submission.proposed_co_advisor2 !== null
                                    ? submission.proposed_co_advisor2
                                    : "-"}
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
                                    to={`/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/beranda/${submission.group_id}/DOSEN_MK`}
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
              Belum ada mahasiswa yang mengajukan judul.
            </Typography>
          </Div>
        )}
      </Div>
      {/* Table Master End */}
    </Div>
  );
};

export default DaftarPengajuanJudulDosenSkripsi;
