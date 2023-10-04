import React, { useState } from "react";
import { Link } from "react-router-dom";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextareaAutosize,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const PengajuanJudul = () => {
  // State untuk input select
  const [selectedOption, setSelectedOption] = useState("");

  // menyembunyikan status
  const [isStatusVisible, setStatusVisible] = useState(true);

  const [initialSelectedOption, setInitialSelectedOption] = useState("");

  const [advisor, setAdvisor] = useState(""); // State untuk advisor
  const [coAdvisor1, setCoAdvisor1] = useState(""); // State untuk co-advisor 1
  const [coAdvisor2, setCoAdvisor2] = useState(""); // State untuk co-advisor 2

  // State untuk option yang dipilih pada dialog

  // State untuk mengelola berbagai data termasuk judul, latar belakang, dll.
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [judul, setJudul] = useState(
    "Pengembangan Sistem Informasi Skripsi di Fakultas Ilmu Komputer Universitas Klabat"
  );
  const [latarBelakang, setLatarBelakang] = useState("tuliskan kalimat disini");
  const [rumusanMasalah, setRumusanMasalah] = useState(
    "tuliskan kalimat disini"
  );
  const [tujuan, setTujuan] = useState("tuliskan kalimat disini");
  const [manfaat, setManfaat] = useState("tuliskan kalimat disini ");
  const [cakupan, setCakupan] = useState("tuliskan kalimat disini");
  const [batasan, setBatasan] = useState("tuliskan kalimat disini");

  // State untuk manajemen dialog konfirmasi perubahan judul
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [initialJudul, setInitialJudul] = useState(judul);
  const [initialLatarBelakang, setInitialLatarBelakang] =
    useState(latarBelakang);
  const [initialRumusanMasalah, setInitialRumusanMasalah] =
    useState(rumusanMasalah);
  const [initialTujuan, setInitialTujuan] = useState(tujuan);
  const [initialManfaat, setInitialManfaat] = useState(manfaat);
  const [initialCakupan, setInitialCakupan] = useState(cakupan);
  const [initialBatasan, setInitialBatasan] = useState(batasan);

  const handleCancelAllEdits = () => {
    setJudul(initialJudul);
    setLatarBelakang(initialLatarBelakang);
    setRumusanMasalah(initialRumusanMasalah);
    setTujuan(initialTujuan);
    setManfaat(initialManfaat);
    setCakupan(initialCakupan);
    setBatasan(initialBatasan);
    setIsEditing(false);
    setSelectedOption(initialSelectedOption);
    setStatusVisible(true);
  };

  const open = Boolean(anchorEl);

  // Fungsi yang dipanggil ketika tombol "Ubah" ditekan
  const handleEditClick = () => {
    setIsEditing(true);
    setInitialSelectedOption(selectedOption);
    setStatusVisible(false); // Menyembunyikan status dan chip
    setInitialJudul(judul); // Simpan nilai awal judul
    setInitialLatarBelakang(latarBelakang); // Simpan nilai awal latar belakang
    setInitialTujuan(tujuan); // Simpan nilai awal tujuan
    setInitialManfaat(manfaat); // Simpan nilai awal manfaat
    setInitialCakupan(cakupan); // Simpan nilai awal cakupan
    setInitialBatasan(batasan); // Simpan nilai awal batasan
  };

  // Fungsi yang dipanggil ketika tombol "Batal" ditekan dalam mode edit
  const handleCancelEdit = () => {
    setJudul(initialJudul);
    setLatarBelakang(initialLatarBelakang); // Kembalikan nilai awal latar belakang
    setIsEditing(false);
    setSelectedOption(initialSelectedOption);
    setStatusVisible(true); // Menampilkan kembali status dan chip
  };

  // Fungsi yang dipanggil ketika tombol "Simpan" ditekan
  const handleSaveClick = () => {
    openConfirmationDialog();
    setStatusVisible(true); // Menampilkan kembali status dan chip
  };

  // Fungsi yang dipanggil ketika isi judul berubah
  const handleJudulChange = (event) => {
    setJudul(event.target.value);
  };

  // Fungsi untuk membuka dialog konfirmasi
  const openConfirmationDialog = () => {
    setIsConfirmationOpen(true);
  };

  // Fungsi untuk menutup dialog konfirmasi
  const closeConfirmationDialog = () => {
    setIsConfirmationOpen(false);
  };

  // Fungsi yang dipanggil ketika isi latar belakang berubah
  const handleLatarBelakangChange = (event) => {
    setLatarBelakang(event.target.value);
  };

  // Fungsi yang dipanggil ketika isi rumusan masalah berubah
  const handleRumusanMasalahChange = (event) => {
    setRumusanMasalah(event.target.value);
  };

  // Fungsi yang dipanggil ketika isi tujuan berubah
  const handleTujuanChange = (event) => {
    setTujuan(event.target.value);
  };

  // Fungsi yang dipanggil ketika isi manfaat berubah
  const handleManfaatChange = (event) => {
    setManfaat(event.target.value);
  };

  // Fungsi yang dipanggil ketika isi cakupan berubah
  const handleCakupanChange = (event) => {
    setCakupan(event.target.value);
  };

  // Fungsi yang dipanggil ketika isi batasan berubah
  const handleBatasanChange = (event) => {
    setBatasan(event.target.value);
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
          Beranda
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
            {/* Co-Advisor 1*/}
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
            {/* Co-Advisor 2*/}
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
                    Pengajuan Judul
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
                    disabled
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
                  disabled
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
                  disabled
                  anchorEl={anchorEl}
                  open={open}
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
                  disabled
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
                  Pengajuan Skripsi
                </Button>
                <Menu
                  disabled
                  anchorEl={anchorEl}
                  open={open}
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
                    Upload Skripsi
                  </MenuItem>
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Upload Revisi Skripsi
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
            <Div sx={{ marginBottom: "25px" }}>
              {isStatusVisible && (
                <>
                  <Typography>Status</Typography>
                  <Chip
                    label="Menunggu"
                    sx={{
                      background: "rgba(255, 204, 0, 0.10)",
                      color: "#985211",
                      height: "25px",
                    }}
                  />
                </>
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
              {/* Judul Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography>Judul</Typography>
                {isEditing ? (
                  <TextareaAutosize
                    value={judul}
                    onChange={handleJudulChange}
                    rowsMin={3}
                    style={{
                      width: "100%",
                      resize: "vertical",
                      whiteSpace: "pre-line",
                    }}
                  />
                ) : (
                  <Typography sx={{ whiteSpace: "pre-line" }}>
                    {judul}
                  </Typography>
                )}
              </Div>
              {/* Judul End */}
              {/* Latar Belakang Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography>Latar Belakang Masalah</Typography>
                {isEditing ? (
                  <TextareaAutosize
                    value={latarBelakang}
                    onChange={handleLatarBelakangChange}
                    rowsMin={3}
                    style={{
                      width: "100%",
                      resize: "vertical",
                      whiteSpace: "pre-line",
                    }}
                  />
                ) : (
                  <Typography sx={{ whiteSpace: "pre-line" }}>
                    {latarBelakang}
                  </Typography>
                )}
              </Div>
              {/* Latar Belakang End */}
              {/* Rumusan Masalah Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography>Rumusan Masalah</Typography>
                {isEditing ? (
                  <TextareaAutosize
                    value={rumusanMasalah}
                    onChange={handleRumusanMasalahChange}
                    rowsMin={3}
                    style={{
                      width: "100%",
                      resize: "vertical",
                      whiteSpace: "pre-line",
                    }}
                  />
                ) : (
                  <Typography sx={{ whiteSpace: "pre-line" }}>
                    {rumusanMasalah}
                  </Typography>
                )}
              </Div>
              {/* Rumusan Masalah End */}
              {/* Tujuan Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography>Tujuan</Typography>
                {isEditing ? (
                  <TextareaAutosize
                    value={tujuan}
                    onChange={handleTujuanChange}
                    rowsMin={3}
                    style={{
                      width: "100%",
                      resize: "vertical",
                      whiteSpace: "pre-line",
                    }}
                  />
                ) : (
                  <Typography sx={{ whiteSpace: "pre-line" }}>
                    {tujuan}
                  </Typography>
                )}
              </Div>
              {/* Tujuan End */}
              {/* Manfaat Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography>Manfaat</Typography>
                {isEditing ? (
                  <TextareaAutosize
                    value={manfaat}
                    onChange={handleManfaatChange}
                    rowsMin={3}
                    style={{
                      width: "100%",
                      resize: "vertical",
                      whiteSpace: "pre-line",
                    }}
                  />
                ) : (
                  <Typography sx={{ whiteSpace: "pre-line" }}>
                    {manfaat}
                  </Typography>
                )}
              </Div>
              {/* Manfaat End*/}
              {/* Cakupan Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography>Cakupan</Typography>
                {isEditing ? (
                  <TextareaAutosize
                    value={cakupan}
                    onChange={handleCakupanChange}
                    rowsMin={3}
                    style={{
                      width: "100%",
                      resize: "vertical",
                      whiteSpace: "pre-line",
                    }}
                  />
                ) : (
                  <Typography sx={{ whiteSpace: "pre-line" }}>
                    {cakupan}
                  </Typography>
                )}
              </Div>
              {/* Cakupan End */}
              {/* Batasan Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography>Batasan</Typography>
                {isEditing ? (
                  <TextareaAutosize
                    value={batasan}
                    onChange={handleBatasanChange}
                    rowsMin={3}
                    style={{
                      width: "100%",
                      resize: "vertical",
                      whiteSpace: "pre-line",
                    }}
                  />
                ) : (
                  <Typography sx={{ whiteSpace: "pre-line" }}>
                    {batasan}
                  </Typography>
                )}
              </Div>
              {/* Batasan End */}

              {/* Select Dosen Pembimbing Start */}
              <Div sx={{ display: "flex", marginBottom: "25px" }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Advisor</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={advisor}
                    label="Advisor"
                    onChange={(e) => setAdvisor(e.target.value)}
                    disabled={!isEditing}
                    sx={{
                      width: "230px",
                      overflow: "hidden",
                      textOverflow: "ellipsis", // Opsi ini akan memotong teks yang terlalu panjang
                    }}
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

                <FormControl fullWidth size="small" sx={{ margin: "0 25px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Co-Advisor 1
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={coAdvisor1}
                    label="Co-Advisor"
                    onChange={(e) => setCoAdvisor1(e.target.value)}
                    disabled={!isEditing}
                    sx={{
                      width: "230px",
                      overflow: "hidden",
                      textOverflow: "ellipsis", // Opsi ini akan memotong teks yang terlalu panjang
                    }}
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

                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Co-Advisor 2
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={coAdvisor2}
                    label="Co-Advisor"
                    onChange={(e) => setCoAdvisor2(e.target.value)}
                    disabled={!isEditing}
                    sx={{
                      width: "230px",
                      overflow: "hidden",
                      textOverflow: "ellipsis", // Opsi ini akan memotong teks yang terlalu panjang
                    }}
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
                <RadioGroup
                  aria-label="konsultasi"
                  name="konsultasi"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value="ya"
                    control={<Radio disabled={!isEditing} />}
                    label="Ya"
                  />
                  <FormControlLabel
                    value="tidak"
                    control={<Radio disabled={!isEditing} />}
                    label="Tidak"
                  />
                </RadioGroup>
              </Div>
              {/* Radio Button End*/}

              <Div
                sx={{
                  display: "flex",
                  padding: "12px 24px 12px 0px",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  background: "#F5F5F5",
                }}
              >
                {isEditing ? (
                  <Div>
                    <Button
                      onClick={handleSaveClick}
                      sx={{
                        padding: "3px",
                        background: "#006AF5",
                        color: "#FFFF",
                        fontSize: "12px",
                        textTransform: "none",
                        "&:hover": {
                          color: "#005FDB",
                        },
                      }}
                    >
                      Perbarui
                    </Button>
                  </Div>
                ) : (
                  <Button
                    onClick={handleEditClick}
                    sx={{
                      padding: "3px",
                      background: "#006AF5",
                      color: "#FFFF",
                      fontSize: "12px",
                      textTransform: "none",
                      "&:hover": {
                        color: "#005FDB",
                      },
                    }}
                  >
                    Ubah
                  </Button>
                )}
              </Div>
            </Div>
          </Div>
        </Div>
        {/* Element 2 End */}
      </Div>

      {/* Konfirmasi Dialog */}
      <Dialog
        open={isConfirmationOpen}
        onClose={closeConfirmationDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: "20px", fontWeight: "500" }}>
          Perbarui Pengajuan Judul
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin memperbarui pengajuan judul?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ background: "#F5F5F5" }}>
          <Button
            onClick={() => {
              closeConfirmationDialog();
              handleCancelEdit();
              handleCancelAllEdits();
            }}
            sx={{
              textTransform: "none",
              borderRadius: "6px",
              border: "#E0E0E0",
              background: "#FFFF",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
              color: "black",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              closeConfirmationDialog();
              setIsEditing(false);
              setInitialJudul(judul);
              // Simpan perubahan ke server jika diperlukan
            }}
            color="primary"
            sx={{
              textTransform: "none",
              borderRadius: "6px",
              background: "#006AF5",
              color: "#ffff",
              "&:hover": {
                color: "#006AF5",
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Konfirmasi Dialog */}
    </Div>
  );
};

export default PengajuanJudul;
