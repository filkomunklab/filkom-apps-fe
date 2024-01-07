import React, { useState, useEffect } from "react";
import Div from "@jumbo/shared/Div";
import MuiAlert from "@mui/material/Alert";
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
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  Dialog,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Snackbar,
  AlertTitle,
} from "@mui/material";
import {
  ExpandMore,
  People,
  Gavel,
  DateRange,
  Done,
  Restore,
  Close,
  Search,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

const DaftarPengajuanProposalDekan = () => {
  // ======================== STATE ===========================
  // mengatur loading page
  const [loading, setLoading] = useState(true);
  // console.log("loading", loading);

  // menyimpan hasil request daftar pengajuan proposal
  const [daftarPengajuanProposal, setDaftarPengajuanProposal] = useState({
    dashboard: {
      total_group: 0,
      not_defence: 0,
      has_defence: 0,
      pass: 0,
      repeat: 0,
      not_pass: 0,
    },
    semesterData: [],
  });

  // mengatur notif error
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // membuka / menutup semester yang dipilih (Accordion)
  const [expanded, setExpanded] = useState(false);

  // state Pencarian
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // ======================== FUNCTION ===========================
  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  // console.log("token", token);

  const navigate = useNavigate();

  const fetchDaftarPengajuanProposalData = async () => {
    jwtAuthAxios
      .get("/group/proposal-list-dekan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // menyimpan hasil request
        setDaftarPengajuanProposal(response.data.data);
        // console.log("Request get daftar proposal: ", response.data.data);
        // menonaktifkan loading page
        setLoading(false);
        // console.log("loading", loading);
      })
      .catch((error) => {
        if (
          error.response.data.data.error ===
          "You don't have permission to perform this action"
        ) {
          navigate(`/`);
        } else {
          setAlertSeverity("error");
          setAlertTitle("Terjadi Kesalahan!");
          setAlertMessage("Tidak dapat menampilkan data.");
          setOpenAlert(true);
          // console.error(
          //   "Terjadi kesalahan saat mengambil daftar pengajuan:",
          //   error
          // );
        }
      })
      .finally(() => {
        setLoading(false);
        // console.log("loading", loading);
      });
  };

  useEffect(() => {
    fetchDaftarPengajuanProposalData();
  }, [token]);

  // mengatur notif error
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // Fungsi untuk menangani perubahan pada state accordion yang terbuka
  const handleChange = (panel) => (event, isExpanded) => {
    // Mengatur state expanded berdasarkan apakah panel tersebut terbuka
    setExpanded(isExpanded ? panel : false);
  };

  // Fungsi untuk menangani pencarian
  const handleSearch = () => {
    const results = daftarPengajuanProposal.semesterData.flatMap(
      (semesterData) =>
        semesterData.proposals.filter((proposal) => {
          const studentNames = proposal.students.map((student) =>
            student.fullName.toLowerCase()
          );
          return (
            studentNames.some((name) =>
              name.includes(searchKeyword.toLowerCase())
            ) ||
            proposal.title.toLowerCase().includes(searchKeyword.toLowerCase())
          );
        })
    );

    setSearchResults(results);
    setSearchQuery(searchKeyword);
    setIsSearchModalOpen(true);
  };

  // Fungsi untuk menutup modal pencarian
  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  // Menampilkan ikon loading jika data masih dalam proses fetching
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Div>
      {/* Dashboard 1 Start */}
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
          <People sx={{ width: "35px", height: "35px", color: "#006AF5" }} />
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
              {daftarPengajuanProposal?.dashboard.total_group} Kelompok
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
          <DateRange sx={{ width: "35px", height: "35px", color: "#006AF5" }} />
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
              {daftarPengajuanProposal?.dashboard.not_defence} Kelompok
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
          <Gavel sx={{ width: "35px", height: "35px", color: "#006AF5" }} />
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
              {daftarPengajuanProposal?.dashboard.has_defence} Kelompok
            </Typography>
          </Div>
        </Div>
      </Div>
      {/* Dashboard 1 End */}
      {/* Dashboard 2 Start */}
      <Div
        sx={{
          display: "flex",
          width: "100%",
          padding: "10px 0px",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {/* Lulus */}
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
          <Done sx={{ width: "35px", height: "35px", color: "#006AF5" }} />
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
              Lulus
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanProposal?.dashboard.pass} Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Mengulang */}
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
          <Restore sx={{ width: "35px", height: "35px", color: "#006AF5" }} />
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
              Mengulang
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanProposal?.dashboard.repeat} Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Tidak Lulus */}
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
          <Close sx={{ width: "35px", height: "35px", color: "#006AF5" }} />
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
              Tidak Lulus
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              {daftarPengajuanProposal?.dashboard.not_pass} Kelompok
            </Typography>
          </Div>
        </Div>
      </Div>
      {/* Dashboard 1 End */}

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
            Daftar Bimbingan Proposal
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
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <Search />
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
                      <TableCell sx={{ fontSize: "13px" }}>Status</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchResults?.map((proposal, proposalIndex) => (
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
                          {proposal.is_pass === "Repeat" ? (
                            <Chip
                              label={"Mengulang"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : proposal.is_pass === "Pass" ? (
                            <Chip
                              label={"Lulus"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : proposal.is_pass === "Fail" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            <Chip label={"Belum"} />
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography
                            component={Link}
                            to={`/sistem-informasi-skripsi/daftar-pengajuan-proposal-dekan/beranda/${proposal.group_id}/DEKAN`}
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
        {/* Semester Start */}
        {daftarPengajuanProposal?.semesterData?.length > 0 ? (
          <Div
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "25px",
              width: "100%",
              height: "900px",
              overflowY: "auto",
              background: "#FFF",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            {daftarPengajuanProposal?.semesterData.map(
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
                    expandIcon={<ExpandMore />}
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
                            <TableCell
                              sx={{ width: "200px", fontSize: "13px" }}
                            >
                              Mahasiswa
                            </TableCell>
                            <TableCell sx={{ fontSize: "13px" }}>
                              Judul
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
                          {semesterData.proposals.map(
                            (proposal, proposalIndex) => (
                              <TableRow key={proposalIndex}>
                                <TableCell sx={{ fontSize: "13px" }}>
                                  {proposalIndex + 1}
                                </TableCell>
                                <TableCell sx={{ fontSize: "13px" }}>
                                  {proposal.students.map((student) => (
                                    <div key={student.id}>
                                      {student.fullName}
                                    </div>
                                  ))}
                                </TableCell>

                                <TableCell sx={{ fontSize: "13px" }}>
                                  {proposal.title}
                                </TableCell>
                                <TableCell sx={{ fontSize: "13px" }}>
                                  {proposal.is_pass === "Repeat" ? (
                                    <Chip
                                      label={"Mengulang"}
                                      sx={{
                                        background: "rgba(255, 204, 0, 0.10)",
                                        color: "#985211",
                                      }}
                                    />
                                  ) : proposal.is_pass === "Pass" ? (
                                    <Chip
                                      label={"Lulus"}
                                      sx={{
                                        background: "rgba(21, 131, 67, 0.10)",
                                        color: "#0A7637",
                                      }}
                                    />
                                  ) : proposal.is_pass === "Fail" ? (
                                    <Chip
                                      label={"Ditolak"}
                                      sx={{
                                        background: "rgba(226, 29, 18, 0.10)",
                                        color: "#CA150C",
                                      }}
                                    />
                                  ) : (
                                    <Chip label={"Belum"} />
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    component={Link}
                                    to={`/sistem-informasi-skripsi/daftar-pengajuan-proposal-dekan/beranda/${proposal.group_id}/DEKAN`}
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
              Belum ada pengajuan Proposal.
            </Typography>
          </Div>
        )}
        {/* Table Mahasiswa Proposal End */}
      </Div>
      {/* Table Master End */}

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenAlert(false)} severity={alertSeverity}>
          <AlertTitle>{alertTitle}</AlertTitle>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Div>
  );
};

export default DaftarPengajuanProposalDekan;
