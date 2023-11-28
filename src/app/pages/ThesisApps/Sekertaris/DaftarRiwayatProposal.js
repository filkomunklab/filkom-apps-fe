import React, { useState, useEffect } from "react";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
} from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import { Link } from "react-router-dom";
import "core-js/stable";
import "regenerator-runtime/runtime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DaftarRiwayatProposal = () => {
  // State untuk melacak panel accordion yang terbuka
  const [expanded, setExpanded] = useState(false);

  // Fungsi untuk menangani perubahan pada state accordion yang terbuka
  const handleChange = (panel) => (event, isExpanded) => {
    // Mengatur state expanded berdasarkan apakah panel tersebut terbuka
    setExpanded(isExpanded ? panel : false);
  };

  // state - daftar jadwal
  const [daftarJadwal, setDaftarJadwal] = useState([]);
  // state - daftar dosen
  const [daftarDosen, setDaftarDosen] = useState([]);
  // state - menyimpan data yang dipilih
  const [jadwalIndex, setJadwalIndex] = useState();
  const [semesterIndex, setSemesterIndex] = useState();
  const [selectedProposalId, setSelectedProposalId] = useState();
  const [selectedAdvisor, setSelectedAdvisor] = useState();
  const [selectedKetuaPenelis, setSelectedKetuaPenelis] = useState(""); // State untuk ketua penelis
  const [selectedAnggotaPenelis, setSelectedAnggotaPenelis] = useState(""); // State untuk anggota penelis
  const [mulaiWaktu, setMulaiWaktu] = useState(""); // State untuk mulai waktu
  const [selesaiWaktu, setSelesaiWaktu] = useState(""); // State untuk selesai waktu
  const [mulaiTanggal, setMulaiTanggal] = useState(""); // State untuk mulai tanggal
  const [ruangan, setRuangan] = useState(""); // State untuk ruangan
  // state lainnya
  const [openDialog, setOpenDialog] = useState(false);
  const [konfirmasiDialog, setKonfirmasiDialog] = useState(false); // State untuk dialog konfirmasi
  // const [jadwal, setJadwal] = useState([]);

  // fungsi untuk mendapatkan data token JWT
  const token = localStorage.getItem("token");
  // console.log("token", token);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Intl.DateTimeFormat("id-ID", options).format(date);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchDaftarJadwalProposal = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/proposal/schedule",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setDaftarJadwal' dengan data dari respons
        setDaftarJadwal(response.data.data);
        console.log("Request Daftar Jadwal Proposal", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil daftar jadwal:", error);
      }
    };
    const fetchDaftarDosen = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/group/dosen-list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setDaftarDosen' dengan data dari respons
        setDaftarDosen(response.data.data);
        console.log("Request Daftar Dosen", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil daftar jadwal:", error);
      }
    };
    fetchDaftarJadwalProposal(); // Panggil fungsi fetchData saat komponen dimuat
    fetchDaftarDosen();
  }, [token]);

  const handleUpdateClick = (scheduleIndex, jadwalIndex) => {
    setOpenDialog(true);

    // Set jadwalIndex dan semesterIndex sesuai dengan yang dipilih
    setJadwalIndex(jadwalIndex);
    setSemesterIndex(scheduleIndex);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProposalId("");
    setSelectedAdvisor("");
    setSelectedKetuaPenelis("");
    setSelectedAnggotaPenelis("");
    setMulaiWaktu("");
    setSelesaiWaktu("");
    setMulaiTanggal("");
    setRuangan("");
  };

  const [errorMessages, setErrorMessages] = useState({
    mulaiWaktu: "",
    selesaiWaktu: "",
    mulaiTanggal: "",
    selectedKetuaPenelis: "",
    selectedAnggotaPenelis: "",
    ruangan: "",
    selectedAdvisor: "",
  });

  const handlePerbarui = () => {
    let hasError = false;
    const newErrorMessages = {};

    // Validasi input waktu
    if (!mulaiWaktu) {
      newErrorMessages.mulaiWaktu = "Mulai Waktu harus diisi";
      hasError = true;
    }

    if (!selesaiWaktu) {
      newErrorMessages.selesaiWaktu = "Selesai Waktu harus diisi";
      hasError = true;
    }

    // Validasi input tanggal
    if (!mulaiTanggal) {
      newErrorMessages.mulaiTanggal = "Mulai Tanggal harus diisi";
      hasError = true;
    }

    // Validasi ketua panelis
    if (!selectedKetuaPenelis) {
      newErrorMessages.selectedKetuaPenelis = "Ketua panelis harus dipilih";
      hasError = true;
    }

    // Validasi anggota panelis
    if (!selectedAnggotaPenelis) {
      newErrorMessages.selectedAnggotaPenelis = "Anggota panelis harus dipilih";
      hasError = true;
    }

    // Validasi input ruangan
    if (!ruangan) {
      newErrorMessages.ruangan = "Ruangan harus diisi";
      hasError = true;
    }

    // Validasi jika Ketua Panelis dan Anggota Panelis sama (jika keduanya sudah dipilih)
    if (
      selectedKetuaPenelis &&
      selectedAnggotaPenelis &&
      selectedKetuaPenelis === selectedAnggotaPenelis
    ) {
      newErrorMessages.selectedKetuaPenelis =
        "Ketua Panelis dan Anggota Panelis tidak boleh sama";
      newErrorMessages.selectedAnggotaPenelis =
        "Ketua Panelis dan Anggota Panelis tidak boleh sama";
      hasError = true;
    }

    if (hasError) {
      setErrorMessages(newErrorMessages);
      // Tampilkan pesan kesalahan
    } else {
      setKonfirmasiDialog(true);
    }
  };

  const handlePerbaruiJadwal = () => {
    // Buat objek jadwal baru
    const jadwalBaru = {
      panelist_chairman_id: selectedKetuaPenelis || null,
      panelist_member_id: selectedAnggotaPenelis || null,
      start_defence: mulaiWaktu || null,
      end_defence: selesaiWaktu || null,
      defence_room: ruangan || null,
      defence_date: mulaiTanggal || null,
    };
    console.log("proposal_id: ", selectedProposalId);
    axios
      .put(
        `http://localhost:2000/api/v1/proposal/schedule/${selectedProposalId}`,
        jadwalBaru,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Berhasil memperbarui jadwal:", response.data);
        // Setelah berhasil perbarui data, tampilkan dialog konfirmasi
        // setKonfirmasiDialog(true);
        handleKonfirmasiDialogClose();
        setOpenDialog(false);

        // Reset semua state input
        setSelectedProposalId("");
        setSelectedAdvisor("");
        setSelectedKetuaPenelis("");
        setSelectedAnggotaPenelis("");
        setMulaiWaktu("");
        setSelesaiWaktu("");
        setMulaiTanggal("");
        setRuangan("");

        // request data
        const fetchDaftarJadwalProposal = async () => {
          try {
            const response = await axios.get(
              "http://localhost:2000/api/v1/proposal/schedule",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            // Atur state 'setDaftarJadwal' dengan data dari respons
            setDaftarJadwal(response.data.data);
            console.log("Request Daftar Jadwal Proposal", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil daftar jadwal:",
              error
            );
          }
        };
        const fetchDaftarDosen = async () => {
          try {
            const response = await axios.get(
              "http://localhost:2000/api/v1/group/dosen-list",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            // Atur state 'setDaftarDosen' dengan data dari respons
            setDaftarDosen(response.data.data);
            console.log("Request Daftar Dosen", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil daftar jadwal:",
              error
            );
          }
        };
        fetchDaftarJadwalProposal(); // Panggil fungsi fetchData saat komponen dimuat
        fetchDaftarDosen();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  };

  const handleKonfirmasiDialogClose = () => {
    // Setelah menutup dialog konfirmasi, reset semua state
    setKonfirmasiDialog(false);
  };

  return (
    <Div>
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
            Daftar Riwayat Proposal
          </Typography>
          <Div
            sx={{
              flexDirection: "row",
              display: "flex",
              width: "441px",
              padding: "12px 16px",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "16px",
              flexShrink: 0,
            }}
          >
            {/* <SearchGlobal></SearchGlobal> */}
            <Button
              color="primary"
              variant="contained"
              sx={{
                borderRadius: "50px",
                textTransform: "none",
              }}
            >
              <Typography sx={{ fontSize: "14px", padding: "4px" }}>
                Print Berita Acara
              </Typography>
            </Button>
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
          {daftarJadwal &&
            daftarJadwal.map((scheduleData, scheduleIndex) => (
              <Accordion
                key={scheduleIndex}
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
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${semesterIndex}bh-content`}
                  id={`panel${semesterIndex}bh-header`}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      marginTop: "6px",
                    }}
                  >
                    {scheduleData.semester}
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
                          <TableCell sx={{ fontSize: "13px" }}>
                            Advisor
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Ketua Panelis
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Anggota Panelis
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Tanggal
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {scheduleData.schedules.map((jadwal, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ fontSize: "13px" }}>
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <Typography>{jadwal.advisor_name}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>
                                {jadwal.panelist_chairman_name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>
                                {jadwal.panelist_member_name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{jadwal.defence_date}</Typography>
                            </TableCell>
                            <TableCell>
                              <Div sx={{ display: "flex" }}>
                                <span
                                  style={{
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    color: "blue",
                                  }}
                                >
                                  Print
                                </span>
                              </Div>
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
      </Div>
    </Div>
  );
};

export default DaftarRiwayatProposal;
