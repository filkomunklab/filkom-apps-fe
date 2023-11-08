import React, { useState, useEffect } from "react";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import PeopleIcon from "@mui/icons-material/People";
import {
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
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
} from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import { Link } from "react-router-dom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";

const JadwalSidangSkripsi = () => {
  // state - daftar jadwal
  const [daftarJadwal, setDaftarJadwal] = useState([]);
  // state - daftar dosen
  const [daftarDosen, setDaftarDosen] = useState([]);
  // state - menyimpan data yang dipilih
  const [jadwalIndex, setJadwalIndex] = useState();
  const [semesterIndex, setSemesterIndex] = useState();
  const [selectedSkripsiId, setSelectedSkripsiId] = useState();
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

  useEffect(() => {
    const fetchDaftarJadwalSkripsi = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/skripsi/schedule",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setDaftarJadwal' dengan data dari respons
        setDaftarJadwal(response.data.data);
        console.log("Request Daftar Jadwal Skripsi", response.data.data);
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
    fetchDaftarJadwalSkripsi(); // Panggil fungsi fetchData saat komponen dimuat
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
    setSelectedSkripsiId("");
    setSelectedAdvisor("");
    setSelectedKetuaPenelis("");
    setSelectedAnggotaPenelis("");
    setMulaiWaktu("");
    setSelesaiWaktu("");
    setMulaiTanggal("");
    setRuangan("");
  };

  const handlePerbarui = (selectedSkripsiId) => {
    // Buat objek jadwal baru
    const jadwalBaru = {
      panelist_chairman_id: selectedKetuaPenelis || null,
      panelist_member_id: selectedAnggotaPenelis || null,
      start_defence: mulaiWaktu || null,
      end_defence: selesaiWaktu || null,
      defence_room: ruangan || null,
      defence_date: mulaiTanggal || null,
    };
    console.log("skripsi_id: ", selectedSkripsiId);
    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/schedule/${selectedSkripsiId}`,
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
        setSelectedSkripsiId("");
        setSelectedAdvisor("");
        setSelectedKetuaPenelis("");
        setSelectedAnggotaPenelis("");
        setMulaiWaktu("");
        setSelesaiWaktu("");
        setMulaiTanggal("");
        setRuangan("");
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
            Daftar Jadwal Sidang Skripsi
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
        {/* Semester Start */}
        {daftarJadwal &&
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
              {/* Table Mahasiswa Skripsi Start */}
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
                        Ketua Penelis
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        Anggota Penelis
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
                                setSelectedSkripsiId(jadwal.skripsi_id);
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
                                  `Selected Skripsi id: ${jadwal.skripsi_id}\n
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
              {/* Table Mahasiswa Skripsi End */}
            </div>
          ))}
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
              {/* ketua Penelis */}
              <FormControl fullWidth size="small">
                <InputLabel id="ketua-penelis-label">Ketua Penelis</InputLabel>
                <Select
                  labelId="ketua-penelis-label"
                  id="ketua-penelis"
                  label="Ketua Penelis"
                  value={selectedKetuaPenelis}
                  onChange={(event) =>
                    setSelectedKetuaPenelis(event.target.value)
                  }
                >
                  {daftarDosen.map((dosen) => (
                    <MenuItem key={dosen.id} value={dosen.id}>
                      {dosen.name}
                    </MenuItem>
                  ))}
                </Select>
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
                >
                  {daftarDosen.map((dosen) => (
                    <MenuItem key={dosen.id} value={dosen.id}>
                      {dosen.name}
                    </MenuItem>
                  ))}
                </Select>
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
                />
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
                  type="text"
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
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="end-time"
                  label="Selesai Waktu"
                  type="text"
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
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="start-date"
                  label="Mulai Tanggal"
                  type="text"
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
                  value={mulaiTanggal}
                  onChange={(event) => setMulaiTanggal(event.target.value)}
                  placeholder="dd/mm/yyyy"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="room-name"
                  label="Ruangan"
                  fullWidth
                  size="small"
                  value={ruangan}
                  onChange={(event) => setRuangan(event.target.value)}
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
            onClick={() => setKonfirmasiDialog(true)}
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
            onClick={() => handlePerbarui(selectedSkripsiId)}
            sx={{ textTransform: "none" }}
          >
            Perbarui
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Konfirmasi End */}
    </Div>
  );
};

export default JadwalSidangSkripsi;
