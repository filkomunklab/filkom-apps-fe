import React, { useEffect, useState } from "react";
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
  Snackbar,
  AlertTitle,
  CircularProgress,
} from "@mui/material";
import {
  People,
  EventAvailable,
  EventBusy,
  ExpandMore,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

const DaftarPengajuanSkripsiSekertaris = () => {
  // ======================== STATE ===========================
  // mengatur loading page
  const [loading, setLoading] = useState(true);
  // console.log("loading", loading);

  // menyimpan hasil request daftar pengajuan skripsi
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

  // mengatur notif error
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // membuka / menutup semester yang dipilih (Accordion)
  const [expanded, setExpanded] = useState(false);

  // ======================== FUNCTION ===========================
  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  // console.log("token", token);

  const navigate = useNavigate();

  const fetchDaftarPengajuanSkripsiData = async () => {
    jwtAuthAxios
      .get("/group/skripsi-list-sekretaris", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // menyimpan hasil request
        setDaftarPengajuanSkripsi(response.data.data);
        // console.log(
        //   "Hasil request daftar pengajuan skripsi: ",
        //   response.data.data
        // );
        setLoading(false);
        // console.log("loading", loading);
      })
      .catch((error) => {
        // redirect ke home
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
          //   "Terjadi kesalahan saat mengambil daftar bimbingan skripsi:",
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
    fetchDaftarPengajuanSkripsiData();
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
              {daftarPengajuanSkripsi?.dashboard.total_group} Kelompok
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
              {daftarPengajuanSkripsi?.dashboard.ready} Kelompok
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
              {daftarPengajuanSkripsi?.dashboard.not_ready} Kelompok
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
          <EventAvailable
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
              {daftarPengajuanSkripsi?.dashboard.have_schedule} Kelompok
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
          <EventBusy sx={{ width: "35px", height: "35px", color: "#006AF5" }} />
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
              {daftarPengajuanSkripsi?.dashboard.not_schedule} Kelompok
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
                        Dokumen Skripsi
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
                    {searchResults.map((skripsi, skripsiIndex) => (
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
                            to={`/sistem-informasi-skripsi/daftar-pengajuan-skripsi/beranda/${skripsi.group_id}/OPERATOR_FILKOM`}
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
        {daftarPengajuanSkripsi?.semesterData?.length > 0 ? (
          <>
            {/* Semester Start */}
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
              {daftarPengajuanSkripsi?.semesterData.map(
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
                      expandIcon={<ExpandMore />}
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
                              <TableCell
                                sx={{ width: "25px", fontSize: "13px" }}
                              >
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
                                Dokumen Skripsi
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
                            {semesterData.skripsis.map(
                              (skripsi, skripsiIndex) => (
                                <TableRow key={skripsiIndex}>
                                  <TableCell sx={{ fontSize: "13px" }}>
                                    {skripsiIndex + 1}
                                  </TableCell>
                                  <TableCell sx={{ fontSize: "13px" }}>
                                    {skripsi.students.map((student) => (
                                      <div key={student.id}>
                                        {student.fullName}
                                      </div>
                                    ))}
                                  </TableCell>
                                  <TableCell sx={{ fontSize: "13px" }}>
                                    {skripsi.title}
                                  </TableCell>
                                  <TableCell sx={{ fontSize: "13px" }}>
                                    {skripsi.skripsi_status === true ? (
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
                                    {skripsi.paymant_status === true ? (
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
                                    {skripsi.plagiarism === true ? (
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
                                    <Typography
                                      component={Link}
                                      to={`/sistem-informasi-skripsi/daftar-pengajuan-skripsi/beranda/${skripsi.group_id}/OPERATOR_FILKOM`}
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
            {/* Table Mahasiswa Skripsi End */}
            {/* Semester End */}
          </>
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
              Belum ada mahasiswa yang mengajukan
            </Typography>
          </Div>
        )}
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

export default DaftarPengajuanSkripsiSekertaris;
