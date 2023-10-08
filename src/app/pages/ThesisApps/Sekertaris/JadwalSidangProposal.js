import Div from "@jumbo/shared/Div";
import React, { useState } from "react";
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

const JadwalSidangProposal = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [ketuaPenelis, setKetuaPenelis] = useState(""); // State untuk ketua penelis
  const [anggotaPenelis, setAnggotaPenelis] = useState(""); // State untuk anggota penelis
  const [mulaiWaktu, setMulaiWaktu] = useState(""); // State untuk mulai waktu
  const [selesaiWaktu, setSelesaiWaktu] = useState(""); // State untuk selesai waktu
  const [mulaiTanggal, setMulaiTanggal] = useState(""); // State untuk mulai tanggal
  const [ruangan, setRuangan] = useState(""); // State untuk ruangan
  const [konfirmasiDialog, setKonfirmasiDialog] = useState(false); // State untuk dialog konfirmasi
  const [jadwal, setJadwal] = useState([]);

  const handleUpdateClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Daftar pengguna dengan nama dan ID
  const daftarPengguna = [
    { id: 10, nama: "Andrew T. Liem, MT, PhD" },
    { id: 20, nama: "Green Mandias, SKom, MCs" },
    { id: 30, nama: "Stenly R. Pungus, MT, PhD" },
    { id: 40, nama: "Debby E. Sondakh, MT, PhD" },
    { id: 50, nama: "Ir. Edson Y. Putra, MKom" },
    { id: 60, nama: "Green A. Sandag, SKom, MS" },
    { id: 70, nama: "Jacquline M. S. Waworundeng, ST, MT" },
    { id: 80, nama: "Jimmy H. Moedjahedy, SKom, MKom, MM" },
    { id: 90, nama: "Joe Y. Mambu, BSIT, MCIS" },
    { id: 100, nama: "Lidya C. Laoh, SKom, MMSi" },
    { id: 110, nama: "Marshal Tombeng," },
    { id: 120, nama: "Oktoverano H. Lengkong, SKom, MDs, MM" },
    { id: 130, nama: "Reymon Rotikan, SKom, MS, MM" },
    { id: 140, nama: "Reynoldus A. Sahulata, SKom, MM" },
    { id: 150, nama: "Rolly Lontaan, MKom" },
    { id: 160, nama: "Semmy W. Taju, SKom" },
    { id: 170, nama: "Senly I. Adam, SKom, MSc" },
  ];
  const getNamaPenggunaById = (userId) => {
    const pengguna = daftarPengguna.find((user) => user.id === userId);
    return pengguna ? pengguna.nama : "-";
  };

  const handlePerbarui = () => {
    // Buat objek jadwal baru
    const jadwalBaru = {
      judul:
        "SISTEM INFORMASI MANAJEMEN SKRIPSI DI FAKULTAS ILMU KOMPUTER UNIVERSITAS KLABAT",
      advisor: "Andrew T. Liem, MT, PhD",
      ketuaPenelis: getNamaPenggunaById(ketuaPenelis) || "-", // Menggunakan nama pengguna atau "-"
      anggotaPenelis: getNamaPenggunaById(anggotaPenelis) || "-", // Menggunakan nama pengguna atau "-"
      mulaiWaktu,
      selesaiWaktu,
      mulaiTanggal,
      ruangan,
    };

    // Tambahkan jadwal baru ke dalam array jadwal
    setJadwal([...jadwal, jadwalBaru]);

    // Setelah berhasil perbarui data, tampilkan dialog konfirmasi
    setKonfirmasiDialog(true);

    // Reset semua state input
    setKetuaPenelis("");
    setAnggotaPenelis("");
    setMulaiWaktu("");
    setSelesaiWaktu("");
    setMulaiTanggal("");
    setRuangan("");
  };

  const handleKonfirmasiDialogClose = () => {
    // Setelah menutup dialog konfirmasi, reset semua state
    setOpenDialog(false);
    setKetuaPenelis("");
    setAnggotaPenelis("");
    setMulaiWaktu("");
    setSelesaiWaktu("");
    setMulaiTanggal("");
    setRuangan("");
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
            Jadwal Sidang Proposal
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
            2023/2024-Genap (Proposal)
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
                <TableCell sx={{ fontSize: "13px" }}>Judul</TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Advisor</TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Ketua Penelis</TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Anggota Penelis</TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Mulai</TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Selesai</TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Tanggal</TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Ruangan</TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jadwal.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: "13px" }}>{index + 1}</TableCell>
                  <TableCell sx={{ fontSize: "13px" }}>{item.judul}</TableCell>
                  <TableCell>
                    <Typography>{item.advisor}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.ketuaPenelis}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.anggotaPenelis}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.mulaiWaktu || "-"}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.selesaiWaktu || "-"}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.mulaiTanggal || "-"}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.ruangan || "-"}</Typography>
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
                        View
                      </Typography>
                      <Div sx={{ margin: "2px" }}>|</Div>
                      <span
                        style={{
                          textDecoration: "none",
                          cursor: "pointer",
                          color: "blue",
                        }}
                        onClick={handleUpdateClick}
                      >
                        Update
                      </span>
                    </Div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Table Mahasiswa Proposal End */}
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
            PENGEMBANGAN SISTEM INFORMASI SKRIPSI DI FAKULTAS ILMU KOMPUTER
            UNIVERSITAS KLABAT
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
                    <TableCell sx={{ width: "25%" }}>Program Studi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Geovalga Fransiscus Lim</TableCell>
                    <TableCell>105021910051</TableCell>
                    <TableCell>Informatika</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>Frances Rully Yong</TableCell>
                    <TableCell>105021910051</TableCell>
                    <TableCell>Informatika</TableCell>
                  </TableRow>
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
                  value={ketuaPenelis}
                  onChange={(event) => setKetuaPenelis(event.target.value)}
                >
                  <MenuItem value={10}>Andrew T. Liem, MT, PhD</MenuItem>
                  <MenuItem value={20}>Green Mandias, SKom, MCs</MenuItem>
                  <MenuItem value={30}>Stenly R. Pungus, MT, PhD</MenuItem>
                  <MenuItem value={40}>Debby E. Sondakh, MT, PhD</MenuItem>
                  <MenuItem value={50}>Ir. Edson Y. Putra, MKom</MenuItem>
                  <MenuItem value={60}>Green A. Sandag, SKom, MS</MenuItem>
                  <MenuItem value={70}>
                    Jacquline M. S. Waworundeng, ST, MT
                  </MenuItem>
                  <MenuItem value={80}>
                    Jimmy H. Moedjahedy, SKom, MKom, MM
                  </MenuItem>
                  <MenuItem value={90}>Joe Y. Mambu, BSIT, MCIS</MenuItem>
                  <MenuItem value={100}>Lidya C. Laoh, SKom, MMSi</MenuItem>
                  <MenuItem value={110}>Marshal Tombeng,</MenuItem>
                  <MenuItem value={120}>
                    Oktoverano H. Lengkong, SKom, MDs, MM
                  </MenuItem>
                  <MenuItem value={130}>Reymon Rotikan, SKom, MS, MM</MenuItem>
                  <MenuItem value={140}>
                    Reynoldus A. Sahulata, SKom, MM
                  </MenuItem>
                  <MenuItem value={150}>Rolly Lontaan, MKom</MenuItem>
                  <MenuItem value={160}>Semmy W. Taju, SKom</MenuItem>
                  <MenuItem value={170}>Senly I. Adam, SKom, MSc</MenuItem>
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
                  value={anggotaPenelis}
                  onChange={(event) => setAnggotaPenelis(event.target.value)}
                >
                  <MenuItem value={10}>Andrew T. Liem, MT, PhD</MenuItem>
                  <MenuItem value={20}>Green Mandias, SKom, MCs</MenuItem>
                  <MenuItem value={30}>Stenly R. Pungus, MT, PhD</MenuItem>
                  <MenuItem value={40}>Debby E. Sondakh, MT, PhD</MenuItem>
                  <MenuItem value={50}>Ir. Edson Y. Putra, MKom</MenuItem>
                  <MenuItem value={60}>Green A. Sandag, SKom, MS</MenuItem>
                  <MenuItem value={70}>
                    Jacquline M. S. Waworundeng, ST, MT
                  </MenuItem>
                  <MenuItem value={80}>
                    Jimmy H. Moedjahedy, SKom, MKom, MM
                  </MenuItem>
                  <MenuItem value={90}>Joe Y. Mambu, BSIT, MCIS</MenuItem>
                  <MenuItem value={100}>Lidya C. Laoh, SKom, MMSi</MenuItem>
                  <MenuItem value={110}>Marshal Tombeng,</MenuItem>
                  <MenuItem value={120}>
                    Oktoverano H. Lengkong, SKom, MDs, MM
                  </MenuItem>
                  <MenuItem value={130}>Reymon Rotikan, SKom, MS, MM</MenuItem>
                  <MenuItem value={140}>
                    Reynoldus A. Sahulata, SKom, MM
                  </MenuItem>
                  <MenuItem value={150}>Rolly Lontaan, MKom</MenuItem>
                  <MenuItem value={160}>Semmy W. Taju, SKom</MenuItem>
                  <MenuItem value={170}>Senly I. Adam, SKom, MSc</MenuItem>
                </Select>
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
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                  value={mulaiTanggal}
                  onChange={(event) => setMulaiTanggal(event.target.value)}
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
            onClick={handleKonfirmasiDialogClose}
            sx={{ textTransform: "none" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Konfirmasi End */}
    </Div>
  );
};

export default JadwalSidangProposal;
