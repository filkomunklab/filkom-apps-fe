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

const JadwalSidangProposal = () => {
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

  // Tambahkan state untuk menyimpan informasi jadwal yang bertabrakan
  const [conflictingSchedule, setConflictingSchedule] = useState(null);

  // Fungsi untuk memeriksa konflik jadwal
  const checkScheduleConflict = () => {
    const newSchedule = {
      start_defence: mulaiWaktu || null,
      end_defence: selesaiWaktu || null,
      defence_date: mulaiTanggal || null,
      defence_room: ruangan || null,
    };

    // Loop melalui jadwal yang sudah ada untuk memeriksa konflik
    for (const scheduleData of daftarJadwal) {
      for (const jadwal of scheduleData.schedules) {
        const existingSchedule = {
          start_defence: jadwal.start_defence || null,
          end_defence: jadwal.end_defence || null,
          defence_date: jadwal.defence_date || null,
          defence_room: jadwal.defence_room || null,
        };

        // Lakukan pembandingan untuk menentukan apakah terdapat konflik
        if (
          newSchedule.start_defence &&
          newSchedule.end_defence &&
          newSchedule.defence_date &&
          newSchedule.defence_room &&
          existingSchedule.start_defence &&
          existingSchedule.end_defence &&
          existingSchedule.defence_date &&
          existingSchedule.defence_room &&
          newSchedule.defence_date === existingSchedule.defence_date &&
          newSchedule.defence_room === existingSchedule.defence_room &&
          ((newSchedule.start_defence >= existingSchedule.start_defence &&
            newSchedule.start_defence < existingSchedule.end_defence) ||
            (newSchedule.end_defence > existingSchedule.start_defence &&
              newSchedule.end_defence <= existingSchedule.end_defence) ||
            (newSchedule.start_defence <= existingSchedule.start_defence &&
              newSchedule.end_defence >= existingSchedule.end_defence))
        ) {
          // Jika terdapat konflik, set state conflictingSchedule
          setConflictingSchedule({
            existingSchedule,
            conflictingProposal: jadwal.title,
            conflictingAdvisor: jadwal.advisor_name,
          });
          return true;
        }
      }
    }

    // Jika tidak ada konflik
    return false;
  };

  const handlePerbarui = () => {
    let hasError = false;
    const newErrorMessages = {};

    // Periksa konflik jadwal
    if (!hasError && checkScheduleConflict()) {
      setKonfirmasiDialog(true);
      return;
    }

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

    // Validasi jika Ketua Panelis dan Anggota Panelis sama
    if (selectedKetuaPenelis === selectedAnggotaPenelis) {
      newErrorMessages.selectedKetuaPenelis =
        "Ketua Panelis dan Anggota Panelis tidak boleh sama";
      newErrorMessages.selectedAnggotaPenelis =
        "Ketua Panelis dan Anggota Panelis tidak boleh sama";
      hasError = true;
    }

    // Validasi jika Ketua Panelis dan Advisor sama
    if (selectedKetuaPenelis === selectedAdvisor) {
      newErrorMessages.selectedKetuaPenelis =
        "Ketua Panelis tidak boleh sama dengan Advisor";
      newErrorMessages.selectedAdvisor =
        "Ketua Panelis tidak boleh sama dengan Advisor";
      hasError = true;
    }

    // Validasi jika Anggota Panelis dan Advisor sama
    if (selectedAnggotaPenelis === selectedAdvisor) {
      newErrorMessages.selectedAnggotaPenelis =
        "Anggota Panelis tidak boleh sama dengan Advisor";
      newErrorMessages.selectedAdvisor =
        "Anggota Panelis tidak boleh sama dengan Advisor";
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
            Daftar Jadwal Sidang Proposal
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
                          <TableCell sx={{ fontSize: "13px" }}>Judul</TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Advisor
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Ketua Panelis
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Anggota Panelis
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>Mulai</TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Selesai
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Tanggal
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            Ruangan
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
                            <TableCell sx={{ fontSize: "13px" }}>
                              {jadwal.title}
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
                              <Typography>{jadwal.start_defence}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{jadwal.end_defence}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{jadwal.defence_date}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{jadwal.defence_room}</Typography>
                            </TableCell>

                            <TableCell>
                              <Div sx={{ display: "flex" }}>
                                <Typography
                                  component={Link}
                                  to={`/sistem-informasi-skripsi/daftar-jadwal-sidang-proposal/beranda/${jadwal.group_id}/OPERATOR_FILKOM`}
                                  sx={{
                                    textDecoration: "none",
                                    color: "blue",
                                  }}
                                >
                                  Detail
                                </Typography>
                                <Div sx={{ margin: "2px" }}>|</Div>
                                <span
                                  style={{
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    color: "blue",
                                  }}
                                  onClick={() => {
                                    handleUpdateClick(scheduleIndex, index);
                                    setSelectedProposalId(jadwal.proposal_id);
                                    setSelectedAdvisor(jadwal.advisor_name);
                                    setSelectedKetuaPenelis(
                                      jadwal.panelist_chairman_id
                                    );
                                    setSelectedAnggotaPenelis(
                                      jadwal.panelist_member_id
                                    );
                                    setMulaiWaktu(jadwal.start_defence);
                                    setSelesaiWaktu(jadwal.end_defence);
                                    setMulaiTanggal(jadwal.defence_date);
                                    setRuangan(jadwal.defence_room);
                                    console.log(
                                      `Selected proposal id: ${jadwal.proposal_id}\n
                                  Selected Advisor: ${jadwal.advisor_name}\n
                                  Selected Chairman: ${jadwal.panelist_chairman_id}\n
                                  Selected Member: ${jadwal.panelist_member_id}\n
                                  Selected Start: ${jadwal.start_defence}\n
                                  Selected End: ${jadwal.end_defence}\n
                                  Date: ${jadwal.defence_date}\n
                                  Room: ${jadwal.defence_room}`
                                    );
                                  }}
                                >
                                  Perbarui
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

        {/* {daftarJadwal &&
          daftarJadwal.map((scheduleData, scheduleIndex) => (
            <div key={scheduleIndex} style={{ width: "100%" }}>
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
                  {scheduleData.semester}
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
                      <TableCell sx={{ fontSize: "13px" }}>Judul</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Advisor</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        Ketua Panelis
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        Anggota Panelis
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Mulai</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Selesai</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Tanggal</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Ruangan</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scheduleData.schedules.map((jadwal, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {jadwal.title}
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
                          <Typography>{jadwal.panelist_member_name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{jadwal.start_defence}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{jadwal.end_defence}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{jadwal.defence_date}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{jadwal.defence_room}</Typography>
                        </TableCell>
                        <TableCell>
                          <Div sx={{ display: "flex" }}>
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
                            <Div sx={{ margin: "2px" }}>|</Div>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                color: "blue",
                              }}
                              onClick={() => {
                                handleUpdateClick(scheduleIndex, index);
                                setSelectedProposalId(jadwal.proposal_id);
                                setSelectedAdvisor(jadwal.advisor_name);
                                setSelectedKetuaPenelis(
                                  jadwal.panelist_chairman_id
                                );
                                setSelectedAnggotaPenelis(
                                  jadwal.panelist_member_id
                                );
                                setMulaiWaktu(jadwal.start_defence);
                                setSelesaiWaktu(jadwal.end_defence);
                                setMulaiTanggal(jadwal.defence_date);
                                setRuangan(jadwal.defence_room);
                                console.log(
                                  `Selected proposal id: ${jadwal.proposal_id}\n
                                  Selected Advisor: ${jadwal.advisor_name}\n
                                  Selected Chairman: ${jadwal.panelist_chairman_id}\n
                                  Selected Member: ${jadwal.panelist_member_id}\n
                                  Selected Start: ${jadwal.start_defence}\n
                                  Selected End: ${jadwal.end_defence}\n
                                  Date: ${jadwal.defence_date}\n
                                  Room: ${jadwal.defence_room}`
                                );
                              }}
                            >
                              Perbarui
                            </span>
                          </Div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Mahasiswa Proposal End *
            </div>
          ))} */}
      </Div>
      {/* Table Master End */}
      {/* popup pembuatan Jadwal start */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px",
            background: "rgba(26, 56, 96, 0.10)",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            MEMPERBARUI JADWAL
          </Typography>
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "25px",
            alignSelf: "stretch",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              padding: "24px",
              alignItems: "center",
              gap: "10px",
              alignSelf: "stretch",
              background: "rgba(26, 56, 96, 0.10)",
              borderRadius: "6px",
            }}
          >
            {daftarJadwal[semesterIndex] &&
              daftarJadwal[semesterIndex].schedules[jadwalIndex] &&
              daftarJadwal[semesterIndex].schedules[jadwalIndex].title}
          </Typography>

          {/* Table Kelompok Mahasiswa Start*/}
          <Div sx={{ width: "100%" }}>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {daftarJadwal[semesterIndex] &&
                    daftarJadwal[semesterIndex].schedules[jadwalIndex] &&
                    daftarJadwal[semesterIndex].schedules[
                      jadwalIndex
                    ].students.map((student, studentIndex) => (
                      <TableRow key={studentIndex}>
                        <TableCell>{studentIndex + 1}</TableCell>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell>{student.nim}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Div>

          <Typography
            sx={{
              display: "flex",
              padding: "24px",
              alignItems: "center",
              gap: "10px",
              alignSelf: "stretch",
              background: "rgba(26, 56, 96, 0.10)",
              borderRadius: "6px",
            }}
          >
            Tim Penelis
          </Typography>
          {/* Select Tim Penguji Start*/}
          <Div
            sx={{
              display: "flex",
              padding: "0px 25px",
              flexDirection: "column",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            <Div
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "25px",
                alignSelf: "stretch",
              }}
            >
              {/* Ketua Panelis */}
              <FormControl fullWidth size="small">
                <InputLabel id="ketua-penelis-label">Ketua Panelis</InputLabel>
                <Select
                  labelId="ketua-penelis-label"
                  id="ketua-penelis"
                  label="Ketua Panelis"
                  value={selectedKetuaPenelis}
                  onChange={(event) =>
                    setSelectedKetuaPenelis(event.target.value)
                  }
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    getContentAnchorEl: null,
                    style: {
                      maxHeight: "200px", // Sesuaikan dengan tinggi yang diinginkan
                    },
                  }}
                  error={!!errorMessages.selectedKetuaPenelis}
                >
                  {daftarDosen
                    ?.filter(
                      (dosen) =>
                        dosen.id !== selectedKetuaPenelis &&
                        dosen.id !== selectedAnggotaPenelis &&
                        dosen.name !== selectedAdvisor
                    )
                    ?.map((dosen) => (
                      <MenuItem key={dosen.id} value={dosen.id}>
                        {dosen.name}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText error={!!errorMessages.selectedKetuaPenelis}>
                  {errorMessages.selectedKetuaPenelis}
                </FormHelperText>
              </FormControl>

              {/* Anggota Penelis */}
              <FormControl fullWidth size="small">
                <InputLabel id="anggota-penelis-label">
                  Anggota Penelis
                </InputLabel>
                <Select
                  labelId="anggota-penelis-label"
                  id="anggota-penelis"
                  label="Anggota Penelis"
                  value={selectedAnggotaPenelis}
                  onChange={(event) =>
                    setSelectedAnggotaPenelis(event.target.value)
                  }
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    getContentAnchorEl: null,
                    style: {
                      maxHeight: "200px", // Sesuaikan dengan tinggi yang diinginkan
                    },
                  }}
                  error={!!errorMessages.selectedAnggotaPenelis}
                >
                  {daftarDosen
                    ?.filter(
                      (dosen) =>
                        dosen.id !== selectedKetuaPenelis &&
                        dosen.id !== selectedAnggotaPenelis &&
                        dosen.name !== selectedAdvisor
                    )
                    ?.map((dosen) => (
                      <MenuItem key={dosen.id} value={dosen.id}>
                        {dosen.name}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText error={!!errorMessages.selectedAnggotaPenelis}>
                  {errorMessages.selectedAnggotaPenelis}
                </FormHelperText>
              </FormControl>

              {/* Advisor */}
              <FormControl fullWidth size="small">
                <TextField
                  id="advisor"
                  label="Advisor"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size="small"
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                  value={selectedAdvisor}
                  onChange={(event) => setSelectedAdvisor(event.target.value)}
                  error={!!errorMessages.selectedAdvisor}
                />
                <FormHelperText error={!!errorMessages.selectedAdvisor}>
                  {errorMessages.selectedAdvisor}
                </FormHelperText>
              </FormControl>
            </Div>
          </Div>
          {/* Select Tim Penguji End */}
          <Typography
            sx={{
              display: "flex",
              padding: "24px",
              alignItems: "center",
              gap: "10px",
              alignSelf: "stretch",
              background: "rgba(26, 56, 96, 0.10)",
              borderRadius: "6px",
            }}
          >
            Jadwal Sidang
          </Typography>
          <Container sx={{ marginTop: "10px" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="start-time"
                  label="Mulai Waktu"
                  type="time"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                  inputProps={{
                    step: 300, // 5 minute intervals
                  }}
                  value={mulaiWaktu}
                  onChange={(event) => setMulaiWaktu(event.target.value)}
                  placeholder="08.00"
                  error={!!errorMessages.mulaiWaktu}
                  helperText={errorMessages.mulaiWaktu}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="end-time"
                  label="Selesai Waktu"
                  type="time"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                  inputProps={{
                    step: 300, // 5 minute intervals
                  }}
                  value={selesaiWaktu}
                  onChange={(event) => setSelesaiWaktu(event.target.value)}
                  placeholder="13.00"
                  error={!!errorMessages.selesaiWaktu}
                  helperText={errorMessages.selesaiWaktu}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="start-date"
                  label="Mulai Tanggal"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size="small"
                  InputProps={{
                    inputProps: {
                      min: "1900-01-01",
                      max: formatDate(new Date()), // Set the max date to today
                    },
                    style: {
                      marginRight: 0, // You can adjust the marginRight value to fit your needs
                    },
                  }}
                  value={mulaiTanggal}
                  onChange={(event) => setMulaiTanggal(event.target.value)}
                  placeholder="dd/mm/yyyy"
                  error={!!errorMessages.mulaiTanggal}
                  helperText={errorMessages.mulaiTanggal}
                />
              </Grid>
              {/* Ruangan */}
              <Grid item xs={6}>
                <TextField
                  id="room-name"
                  label="Ruangan"
                  fullWidth
                  size="small"
                  value={ruangan}
                  onChange={(event) => setRuangan(event.target.value)}
                  error={!!errorMessages.ruangan}
                  helperText={errorMessages.ruangan}
                />
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              background: "white",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              textTransform: "none",
              color: "black",
            }}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePerbarui}
            sx={{ textTransform: "none" }}
          >
            Perbarui
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Konfirmasi */}
      <Dialog
        open={konfirmasiDialog}
        onClose={handleKonfirmasiDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "24px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            Perbarui Jadwal
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Apakah Anda yakin ingin perbarui jadwal?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleKonfirmasiDialogClose}
            sx={{
              background: "white",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              textTransform: "none",
              color: "black",
            }}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePerbaruiJadwal}
            sx={{ textTransform: "none" }}
          >
            Perbarui
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Konfirmasi End */}

      <Dialog
        open={konfirmasiDialog && conflictingSchedule}
        onClose={handleKonfirmasiDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Konfirmasi Jadwal Bertabrakan</DialogTitle>
        <DialogContent>
          <Typography>
            Jadwal yang Anda buat akan bertabrakan dengan jadwal berikut:
          </Typography>
          <Typography>
            Judul: {conflictingSchedule?.conflictingProposal}
          </Typography>
          <Typography>
            Advisor: {conflictingSchedule?.conflictingAdvisor}
          </Typography>
          {/* Tambahkan informasi jadwal bertabrakan lainnya sesuai kebutuhan */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleKonfirmasiDialogClose}>Batal</Button>
          <Button onClick={handlePerbaruiJadwal} color="primary">
            Lanjutkan
          </Button>
        </DialogActions>
      </Dialog>
    </Div>
  );
};

export default JadwalSidangProposal;
