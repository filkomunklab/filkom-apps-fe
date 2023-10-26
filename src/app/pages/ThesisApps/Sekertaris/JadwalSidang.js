import Div from "@jumbo/shared/Div";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Menu,
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
import React, { useState } from "react";
import { Link } from "react-router-dom";
const JadwalSidang = () => {
  // jadwal Sidang
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [Ruangan, setRuangan] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setSelectedStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setSelectedEndTime(event.target.value);
  };

  const handleRuanganChange = (event) => {
    setRuangan(event.target.value);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = () => {
    handleDialogClose();
  };

  // menu horizontal
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const open2 = Boolean(anchorE2);

  //   select tim dosen
  const [KetuaPenelis, setKetuaPenelis] = useState("");
  const [AnggotaPenelis, setAnggotaPenelis] = useState("");

  const handleKetuaPenelis = (e) => {
    setKetuaPenelis(e.target.value);
  };

  const handleAnggotaPenelis = (e) => {
    setAnggotaPenelis(e.target.value);
  };

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
          Jadwal Sidang
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
            display: "flex",
            width: "350px",
            padding: "5px",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Riwayat Log Start */}
          <Div
            sx={{
              width: "320px",
              height: "500px",
              borderRadius: "6px",
              border: "1px solid rgba(26, 56, 96, 0.10)",
              background: "#FFF",
            }}
          >
            Riwayat Log
          </Div>
          {/* Riwayat Log End */}

          {/* Dosen Pembimbing Start */}
          <Div
            sx={{
              display: "flex",
              width: "320px",
              flexDirection: "column",
              alignItems: "flex-start",
              borderRadius: "6px",
              border: "1px solid rgba(26, 56, 96, 0.10)",
              background: "#FFF",
            }}
          >
            {/* Advisor */}
            <Div
              sx={{
                display: "flex",
                width: "480px",
                alignItems: "flex-start",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  width: "150px",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: 2,
                  flexShrink: "0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Advisor
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "flex-start",
                  gap: 2,
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                -
              </Div>
            </Div>
            {/* Ketua Penelis*/}
            <Div
              sx={{
                display: "flex",
                width: "480px",
                alignItems: "flex-start",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  width: "150px",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: 2,
                  flexShrink: "0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Co-Advisor 1
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "flex-start",
                  gap: 2,
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                -
              </Div>
            </Div>
            {/* Anggota Penelis*/}
            <Div
              sx={{
                display: "flex",
                width: "480px",
                alignItems: "flex-start",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  width: "150px",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: 2,
                  flexShrink: "0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Co-Advisor 2
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "flex-start",
                  gap: 2,
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                -
              </Div>
            </Div>
          </Div>
          {/* Dosen Pembimbing End */}
        </Div>
        {/* Element 1 End */}

        {/* Element 2 Start */}
        <Div
          sx={{
            display: "flex",
            width: "1050px",
            paddingBottom: "0px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
            borderRadius: "8px",
          }}
        >
          {/* Menu Horizontal Start */}
          <Div
            sx={{
              display: "flex",
              // padding: "5px 16px",
              width: "100%",
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "1px solid #E0E0E0",
              background: "#FFF",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
              flexDirection: "column",
            }}
          >
            <Div sx={{ width: "100%", display: "flex" }}>
              <Div sx={{ margin: "auto" }}>
                <Link to="#">
                  <Button
                    sx={{
                      fontSize: "13px",
                      padding: "6px 16px",
                      fontWeight: 500,
                      color: "#192434",
                      textTransform: "none",
                      "&:hover": {
                        color: "#006AF5",
                      },
                    }}
                  >
                    Beranda
                  </Button>
                </Link>
              </Div>
              <Div
                sx={{
                  width: "1px",
                  transform: "90px",
                  alignSelf: "stretch",
                  background: "rgba(26, 56, 96, 0.10)",
                }}
              ></Div>
              <Div sx={{ margin: "auto" }}>
                <Link to="#">
                  <Button
                    sx={{
                      // width: "150px",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#192434",
                      textTransform: "none",
                      "&:hover": {
                        color: "#006AF5",
                      },
                    }}
                  >
                    Jadwal Sidang
                  </Button>
                </Link>
              </Div>
              <Div
                sx={{
                  width: "1px",
                  transform: "90px",
                  alignSelf: "stretch",
                  background: "rgba(26, 56, 96, 0.10)",
                }}
              ></Div>
              <Div sx={{ margin: "auto" }}>
                <Link to="#">
                  <Button
                    sx={{
                      // width: "130px",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#192434",
                      textTransform: "none",
                      "&:hover": {
                        color: "#006AF5",
                      },
                    }}
                  >
                    Konsultasi
                  </Button>
                </Link>
              </Div>
              <Div
                sx={{
                  width: "1px",
                  transform: "90px",
                  alignSelf: "stretch",
                  background: "rgba(26, 56, 96, 0.10)",
                }}
              ></Div>
              <Div sx={{ margin: "auto" }}>
                <Button
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Pengajuan Proposal
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open1}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Upload Proposal
                  </MenuItem>
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Berita Acara
                  </MenuItem>
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Upload Revisi Proposal
                  </MenuItem>
                </Menu>
              </Div>
              <Div
                sx={{
                  width: "1px",
                  transform: "90px",
                  alignSelf: "stretch",
                  background: "rgba(26, 56, 96, 0.10)",
                }}
              ></Div>
              {/* Menu Pengajuan Skripsi */}
              <Div>
                <Button
                  onClick={(event) => setAnchorE2(event.currentTarget)}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Pengajuan Skripsi
                </Button>
                <Menu
                  anchorEl={anchorE2}
                  open={open2}
                  onClose={() => setAnchorE2(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Skripsi
                  </MenuItem>
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Berita Acara Skripsi
                  </MenuItem>
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Revisi Skripsi
                  </MenuItem>
                </Menu>
              </Div>
            </Div>
          </Div>
          {/* Menu horizontal End */}

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
                color: "#192434",
                background: "rgba(26, 56, 96, 0.10)",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600, // Membuat teks lebih tebal (nilai 600)
              }}
            >
              PENGEMBANGAN SISTEM INFORMASI SKRIPSI DI FAKULTAS ILMU KOMPUTER
              UNIVERSITAS KLABAT
            </Typography>

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
              {/* Table Kelompok mahasiswa End */}

              {/* Table Pengajuan Proposal Start */}
              <Typography
                sx={{
                  padding: "14px 16px",
                  background: "rgba(26, 56, 96, 0.10)",
                  borderRadius: "6px 6px 0 0",
                  border: "1px",
                  marginBottom: "25px",
                }}
              >
                Menentukan Tim Penelis
              </Typography>

              {/* Select Tim Penguji Start*/}
              <Div sx={{ display: "flex", marginBottom: "25px" }}>
                {/* ketua Penelis */}
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Ketua Penelis
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={KetuaPenelis}
                    label="Ketua Penelis"
                    onChange={handleKetuaPenelis}
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
                    <MenuItem value={130}>
                      Reymon Rotikan, SKom, MS, MM
                    </MenuItem>
                    <MenuItem value={140}>
                      Reynoldus A. Sahulata, SKom, MM
                    </MenuItem>
                    <MenuItem value={150}>Rolly Lontaan, MKom</MenuItem>
                    <MenuItem value={160}>Semmy W. Taju, SKom</MenuItem>
                    <MenuItem value={170}>Senly I. Adam, SKom, MSc</MenuItem>
                  </Select>
                </FormControl>
                <Div sx={{ margin: "10px" }} />
                {/* Anggota Penelis */}
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Anggota Penelis
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={AnggotaPenelis}
                    label="Anggota Penelis"
                    onChange={handleAnggotaPenelis}
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
                    <MenuItem value={130}>
                      Reymon Rotikan, SKom, MS, MM
                    </MenuItem>
                    <MenuItem value={140}>
                      Reynoldus A. Sahulata, SKom, MM
                    </MenuItem>
                    <MenuItem value={150}>Rolly Lontaan, MKom</MenuItem>
                    <MenuItem value={160}>Semmy W. Taju, SKom</MenuItem>
                    <MenuItem value={170}>Senly I. Adam, SKom, MSc</MenuItem>
                  </Select>
                </FormControl>
              </Div>
              {/* Select Tim Penguji End */}

              {/* Table Status Siap Maju Sidang Start*/}
              <Typography
                sx={{
                  padding: "14px 16px",
                  background: "rgba(26, 56, 96, 0.10)",
                  borderRadius: "6px 6px 0 0",
                  border: "1px",
                }}
              >
                Menyusun Jadwal Sidang
              </Typography>
              <Container sx={{ marginTop: "25px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      id="start-time"
                      label="Mulai Waktu"
                      type="time"
                      fullWidth
                      value={selectedStartTime}
                      onChange={handleStartTimeChange}
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
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="end-time"
                      label="Selesai Waktu"
                      type="time"
                      fullWidth
                      value={selectedEndTime}
                      onChange={handleEndTimeChange}
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
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="start-date"
                      label="Mulai Tanggal"
                      type="date"
                      fullWidth
                      value={selectedDate}
                      onChange={handleDateChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="room-name"
                      label="Ruangan"
                      fullWidth
                      value={Ruangan}
                      onChange={handleRuanganChange}
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                  <DialogTitle>Konfirmasi</DialogTitle>
                  <DialogContent>
                    Apakah Anda yakin ingin membuat jadwal dengan informasi
                    berikut?
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleDialogClose}
                      color="primary"
                      sx={{
                        background: "white",
                        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                        textTransform: "none",
                      }}
                    >
                      Batal
                    </Button>
                    <Button
                      onClick={handleConfirm}
                      color="primary"
                      variant="contained"
                      sx={{ textTransform: "none" }}
                    >
                      Buat Jadwal
                    </Button>
                  </DialogActions>
                </Dialog>
              </Container>

              <Div
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "12px",
                  alignSelf: "stretch",
                  padding: "14px 16px",
                  background: "rgba(26, 56, 96, 0.10)",
                  border: "1px",
                  borderRadius: "6px 6px 0 0",
                  marginTop: "25px",
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleDialogOpen}
                  sx={{ textTransform: "none" }}
                >
                  Buat Jadwal
                </Button>
              </Div>
            </Div>
          </Div>
        </Div>
        {/* Element 2 End */}
      </Div>
    </Div>
  );
};

export default JadwalSidang;
