import React, { useState, useEffect } from "react";
import Div from "@jumbo/shared/Div";
import MuiAlert from "@mui/material/Alert";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  AccordionDetails,
  Paper,
  AccordionSummary,
  Accordion,
  CircularProgress,
  Snackbar,
  AlertTitle,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

const RiwayatSkripsiDekan = () => {
  // ======================== STATE ===========================
  // mengatur loading page
  const [loading, setLoading] = useState(true);
  // console.log("loading", loading);

  // menyimpan hasil request daftar riwayat
  const [daftarRiwayat, setDaftarRiwayat] = useState([]);

  // mengatur notif error
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // membuka / menutup semester yang dipilih (Accordion)
  const [expanded, setExpanded] = useState(false);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  // console.log("token", token);

  const navigate = useNavigate();

  const fetchDaftarRiwayat = async () => {
    jwtAuthAxios
      .get("/group/history-list-dekan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // menyimpan hasil request
        setDaftarRiwayat(response.data.data);
        // console.log("Request get daftar proposal: ", response.data.data);
        // menonaktifkan loading page
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
          //   "Terjadi kesalahan saat mengambil daftar pengujian proposal:",
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
    fetchDaftarRiwayat();
  }, [token]);

  // mengatur notif error
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // Fungsi untuk menangani perubahan pada state accordion yang terbuka
  const handleChangee = (panel) => (event, isExpanded) => {
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
    <Div
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        gap: "25px",
      }}
    >
      {/* Riwayat Penelitian */}
      <Div
        sx={{
          width: "100%",
          display: "flex",
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
          Daftar Riwayat Skripsi
        </Typography>
        <Div
          sx={{
            flexDirection: "row",
            display: "flex",
            padding: "12px 16px",
            alignItems: "center",
            gap: "16px",
            flexShrink: 0,
          }}
        >
          {/* <FormControl>
            <Select
              size="small"
              labelId="dropdown-label"
              id="dropdown"
              value={selectedValue}
              onChange={handleChange}
              sx={{
                height: "30px",
                width: "250px",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              }}
            >
              <MenuItem value="Kelas">Kelas</MenuItem>{" "}
              <MenuItem value="option1">Opsi 1</MenuItem>
              <MenuItem value="option2">Opsi 2</MenuItem>
              <MenuItem value="option3">Opsi 3</MenuItem>
            </Select>
          </FormControl> */}
        </Div>
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
          {/* <SearchGlobal /> */}
        </Div>
      </Div>
      {/* Riwayat Mahasiswa */}
      {daftarRiwayat?.length > 0 ? (
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
          {daftarRiwayat?.map((riwayat, semesterIndex) => (
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
                  {riwayat.semester}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ background: "#F5F5F5" }}>
                        <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                        <TableCell sx={{ width: "30%" }}>
                          Nama Lengkap Mahasiswa
                        </TableCell>
                        <TableCell sx={{ width: "45%" }}>Judul</TableCell>
                        <TableCell sx={{ width: "10%" }}>
                          Tanggal Diterima
                        </TableCell>
                        <TableCell sx={{ width: "10%" }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {riwayat.skripsis.map((skripsi, index) => (
                        <TableRow key={skripsi.group_id + index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {skripsi.students.map((student) => (
                              <div key={student.id}>{student.fullName}</div>
                            ))}
                          </TableCell>
                          <TableCell>{skripsi.title}</TableCell>
                          <TableCell>{skripsi.approve_date}</TableCell>
                          <TableCell>
                            <Link
                              to={`/sistem-informasi-skripsi/daftar-riwayat-skripsi-dekan/beranda/${skripsi.group_id}/DEKAN`}
                              style={{ textDecoration: "none", color: "blue" }}
                            >
                              Detail
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))}
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
            Belum ada riwayat.
          </Typography>
        </Div>
      )}

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

export default RiwayatSkripsiDekan;
