import React, { useState } from "react";
import { Link } from "react-router-dom";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  DialogActions,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const PengajuanJudulDosenSkripsi = () => {
  const handleTolakClick = () => {
    // Di sini Anda bisa menambahkan logika untuk menolak pengajuan
    // Setelah pengajuan ditolak, update status menjadi "Ditolak"
    setStatus("Ditolak");
  };

  const handleTerimaClick = () => {
    // Di sini Anda bisa menambahkan logika untuk menerima pengajuan
    // Setelah pengajuan diterima, update status menjadi "Diterima"
    setStatus("Diterima");
  };

  const [status, setStatus] = useState("Menunggu"); // Tambahkan state untuk status

  const handleAdvisorChange = (e) => {
    setAdvisor(e.target.value);
  };

  const handleCoAdvisor1Change = (e) => {
    setCoAdvisor1(e.target.value);
  };

  const handleCoAdvisor2Change = (e) => {
    setCoAdvisor2(e.target.value);
  };

  // menyembunyikan status
  const [isStatusVisible] = useState(true);

  // State untuk mengelola berbagai data termasuk judul, latar belakang, dll.
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [judul] = useState(
    "Pengembangan Sistem Informasi Skripsi di Fakultas Ilmu Komputer Universitas Klabat"
  );

  const [latarBelakang] = useState(
    "Perkembangan teknologi informasi semakin mengguncangkan dunia dengan pesatnya. Seiring dengan adanya inovasi terbaru, teknologi informasi telah mempengaruhi banyak aspek kehidupan manusia, khususnya dalam bidang informasi. Sebagai contoh, perguruan tinggi negeri dan swasta saat ini semakin gencar untuk mengembangkan sistem referensi repository, khususnya untuk skripsi alumni guna meningkatkan kemajuan universitas. Tidak hanya itu, teknologi informasi juga telah mengubah dunia bisnis tradisional dengan munculnya komputasi awan dan pertumbuhan platform bisnis digital seluler berbasis smartphone dan tablet. Inovasi ini memberikan peluang bagi pengusaha dan perusahaan tradisional untuk menciptakan produk dan layanan baru, mengembangkan model bisnis baru, dan mengubah perilaku bisnis sehari-hari. Oleh karena itu, teknologi informasi menjadi fondasi bisnis di abad ke-21 karena banyak bisnis atau perusahaan dapat beroperasi dan berkembang dengan adanya sistem informasi yang mumpuni. Sebagaimana disebutkan dalam UU No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik, teknologi informasi adalah teknik untuk mengumpulkan, menyiapkan, menyimpan, memproses, mengumumkan, menganalisis, dan/atau menyebarkan informasi."
  );

  const [rumusanMasalah] = useState(
    "Berdasarkan latar belakang masalah penelitian, maka dibuatsuatu rumusan masalah dalam penelitian ini, yaitu bagaimana mengembangkan sistem informasi manajemen skripsi berbasis web-application untuk penyerahan skripsi yang sudah selesai dinilai dan disimpan di repository?"
  );

  const [tujuan] = useState(
    "Tujuan dari penelitian ini adalah untuk mengembangkan dan mengimplementasikan sistem informasi managemen skripsi untuk penyerahan skripsi dan penyimpanan skripsi yang terintegrasi yang memudahkan mahasiswa untuk mencari referensi judul skripsi yang sesuai dengan minat dan keahlian mereka serta membantu dosen pembimbing dalam memberikan saran dan rekomendasi judul skripsi melalui sistem ini sehingga judul atau topik penelitian yang diajukan tidak sama dengan penelitian yang sudah ada."
  );

  const [manfaat] = useState(
    "1.	Mahasiswa dan dosen pembimbing Fakultas Ilmu Komputer dapat mencari referensi judul skripsi lebih mudah dan cepat sehingga dapat menghindari duplikasi penelitian yang sudah dilakukan sebelumnya. 2.	Meningkatkan efisiensi dalam penyerahan skripsi dan penyimpanan dengan sistem yang terintegrasi sehingga mahasiswa tidak perlu melakukan permohonan akses ke Fakultas Ilmu Komputer untuk mengakses skripsi yang sudah disetujui atau diuji dan lulus.3.	Dengan adanya sistem terintegrasi, kesalahan dalam penyimpanan skripsi dapat dihindari. "
  );

  const [cakupan] = useState(
    "1.	Sistem hanya mencakup manajemen skripsi Fakultas Ilmu Komputer Universitas Klabat 2.	Sistem hanya menerima penyerahan skripsi yang sudah diuji dan lulus oleh dosen penguji dan menyimpannya. 3.	Sistem menyediakan pencarian skripsi beserta teks lengkap di repository. Pencarian skripsi dibuka untuk umum tetapi teks lengkap hanya dapat diakses oleh mahasiswa dan dosen Universitas Klabat."
  );

  const [batasan] = useState(
    "1)	Sistem hanya dibangun untuk digunakan Fakultas Ilmu Komputer Universitas Klabat.2)	Sistem hanya mengelola lembar pengesahan dan skripsi yang sudah diuji di Fakultas Ilmu Komputer Universitas Klabat.3)	Sistem hanya menerima penyerahan skripsi dalam format file tertentu seperti PDF atau Microsoft Word dengan batasan ukuran file sebesar 50MB.4)	Sistem tidak menyimpan data pribadi lengkap  penulis atau mahasiswa.5)	Sistem hanya memberikan akses lihat dan unduh teks lengkap skripsi kepada dosen dan mahasiswa Universitas Klabat.6)	Sistem tidak dapat menampilkan skripsi yang paling sering dicari atau paling tren.7)	Sistem tidak menyediakan fitur notifikasi persetujuan penyerahan skripsi 8)	Sistem ini berbasis web-application."
  );

  const [openDialog, setOpenDialog] = useState(false);

  // State untuk mengelola pilihan advisor dan co-advisor
  const [advisor, setAdvisor] = useState("");
  const [coAdvisor1, setCoAdvisor1] = useState("");
  const [coAdvisor2, setCoAdvisor2] = useState("");

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    // Di sini Anda dapat melakukan apa pun yang diperlukan untuk menyimpan perubahan advisor dan co-advisor.
    // Anda bisa menggunakan nilai dari state advisor, coAdvisor1, dan coAdvisor2 untuk melakukan penyimpanan.

    // Setelah Anda menyimpan perubahan, Anda bisa menutup dialog.
    handleClose();
  };

  const open = Boolean(anchorEl);

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
              <Typography variant="subtitle2">Status</Typography>
              <Chip
                label={status} // Gunakan nilai status yang diperbarui
                sx={{
                  background:
                    status === "Menunggu"
                      ? "rgba(255, 204, 0, 0.10)"
                      : status === "Ditolak"
                      ? "red"
                      : "green",
                  color: status === "Menunggu" ? "#985211" : "white",
                  height: "25px",
                }}
              />
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
                variant="subtitle2"
                sx={{
                  padding: "14px 16px",
                  background: "rgba(26, 56, 96, 0.10)",
                  borderRadius: "6px 6px 0 0",
                  border: "1px",
                }}
              >
                Kelompok Mahasiswa
              </Typography>
              <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
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
                <Typography variant="subtitle2">Judul</Typography>
                <Typography sx={{ whiteSpace: "pre-line" }}>{judul}</Typography>
              </Div>
              {/* Judul End */}
              {/* Latar Belakang Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography variant="subtitle2">
                  Latar Belakang Masalah
                </Typography>
                <Typography
                  style={{
                    width: "100%",
                    whiteSpace: "pre-line",
                  }}
                >
                  {latarBelakang}
                </Typography>
              </Div>
              {/* Latar Belakang End */}
              {/* Rumusan Masalah Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography variant="subtitle2">Rumusan Masalah</Typography>
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {rumusanMasalah}
                </Typography>
              </Div>
              {/* Rumusan Masalah End */}
              {/* Tujuan Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography variant="subtitle2">Tujuan</Typography>
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {tujuan}
                </Typography>
              </Div>
              {/* Tujuan End */}
              {/* Manfaat Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography variant="subtitle2">Manfaat</Typography>
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {manfaat}
                </Typography>
              </Div>
              {/* Manfaat End*/}
              {/* Cakupan Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography variant="subtitle2">Cakupan</Typography>

                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {cakupan}
                </Typography>
              </Div>
              {/* Cakupan End */}
              {/* Batasan Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography variant="subtitle2">Batasan</Typography>
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {batasan}
                </Typography>
              </Div>
              {/* Batasan End */}

              {/* Select Dosen Pembimbing Start */}
              <Div
                sx={{
                  display: "flex",
                  height: "62px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "15px",
                  alignSelf: "stretch",
                  marginBottom: "20px",
                }}
              >
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "40px",
                  }}
                >
                  <Div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "15px",
                    }}
                  >
                    {/* Menampilkan Advisor */}
                    <Typography variant="subtitle2">Advisor</Typography>
                    <Typography>{advisor}</Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "15px",
                    }}
                  >
                    {/* Menampilkan Co-advisor 1 */}
                    <Typography variant="subtitle2">Co-Advisor 1</Typography>
                    <Typography>{coAdvisor1}</Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "15px",
                    }}
                  >
                    {/* Menampilkan co-advisor 2 */}
                    <Typography variant="subtitle2">Co-Advisor 2</Typography>
                    <Typography>{coAdvisor2}</Typography>
                  </Div>
                </Div>
              </Div>
              {/* Select Dosen Pembimbing End */}

              {/* Button Ganti Dosen Pembimbing Start */}
              <Button
                size="small"
                variant="contained"
                color="primary"
                sx={{ textTransform: "none", marginBottom: "25px" }}
                onClick={handleClickOpen}
              >
                <BorderColorIcon fontSize="small" />
                Ganti Advisor dan Co-Advisor
              </Button>
              {/* Button GAnti Dosen Pembimbing End */}

              {/* Radio Button Start */}
              <Div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography component="div">
                  Apakah Anda sudah melakukan konsultasi dengan Advisor sebelum
                  mengajukan judul?
                </Typography>
                <Typography>Ya</Typography>
              </Div>
            </Div>
            <Div
              sx={{
                display: "flex",
                padding: "12px 24px 12px 0px",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "12px",
                alignSelf: "stretch",
                background: "#F5F5F5",
              }}
            >
              <Button
                size="small"
                variant="contained"
                sx={{ textTransform: "none" }}
                color="error"
                onClick={handleTolakClick} // Menggunakan fungsi handleTolakClick saat tombol Tolak diklik
              >
                Tolak
              </Button>
              <Button
                size="small"
                variant="contained"
                sx={{ textTransform: "none" }}
                color="primary"
                onClick={handleTerimaClick} // Menggunakan fungsi handleTerimaClick saat tombol Terima diklik
              >
                Terima
              </Button>
            </Div>
          </Div>
        </Div>
        {/* Element 2 End */}
        {/* Dialog Select Dosen Pembimbing Start */}
        <Dialog
          open={openDialog}
          onClose={handleClose}
          fullWidth
          width="lg"
          sx={{ margin: "25px", gap: "2" }}
        >
          <DialogTitle
            sx={{
              background: "#F5F5F5",
              textAlign: "center",
            }}
          >
            Ganti Advisor dan Co-Advisor
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ margin: "25px 0 25px 0" }}>
              <InputLabel>Advisor</InputLabel>
              <Select
                label="Advisor"
                value={advisor}
                onChange={handleAdvisorChange}
              >
                <MenuItem value={"Andrew T. Liem, MT, PhD"}>
                  Andrew T. Liem, MT, PhD
                </MenuItem>
                <MenuItem value={"Green Mandias, SKom, MCs"}>
                  Green Mandias, SKom, MCs
                </MenuItem>
                <MenuItem value={"Stenly R. Pungus, MT, PhD"}>
                  Stenly R. Pungus, MT, PhD
                </MenuItem>
                <MenuItem value={"Debby E. Sondakh, MT, PhD"}>
                  Debby E. Sondakh, MT, PhD
                </MenuItem>
                <MenuItem value={"Ir. Edson Y. Putra, MKom"}>
                  Ir. Edson Y. Putra, MKom
                </MenuItem>
                <MenuItem value={"Green A. Sandag, SKom, MS"}>
                  Green A. Sandag, SKom, MS
                </MenuItem>
                <MenuItem value={"Jacquline M. S. Waworundeng, ST, MT"}>
                  Jacquline M. S. Waworundeng, ST, MT
                </MenuItem>
                <MenuItem value={"Jimmy H. Moedjahedy, SKom, MKom, MM"}>
                  Jimmy H. Moedjahedy, SKom, MKom, MM
                </MenuItem>
                <MenuItem value={"Joe Y. Mambu, BSIT, MCIS"}>
                  Joe Y. Mambu, BSIT, MCIS
                </MenuItem>
                <MenuItem value={"Lidya C. Laoh, SKom, MMSi"}>
                  Lidya C. Laoh, SKom, MMSi
                </MenuItem>
                <MenuItem value={"Marshal Tombeng,"}>Marshal Tombeng,</MenuItem>
                <MenuItem value={"Oktoverano H. Lengkong, SKom, MDs, MM"}>
                  Oktoverano H. Lengkong, SKom, MDs, MM
                </MenuItem>
                <MenuItem value={"Reymon Rotikan, SKom, MS, MM"}>
                  Reymon Rotikan, SKom, MS, MM
                </MenuItem>
                <MenuItem value={"Reynoldus A. Sahulata, SKom, MM"}>
                  Reynoldus A. Sahulata, SKom, MM
                </MenuItem>
                <MenuItem value={"Rolly Lontaan, MKom"}>
                  Rolly Lontaan, MKom
                </MenuItem>
                <MenuItem value={"Semmy W. Taju, SKom"}>
                  Semmy W. Taju, SKom
                </MenuItem>
                <MenuItem value={"Senly I. Adam, SKom, MSc"}>
                  Senly I. Adam, SKom, MSc
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: "25px" }}>
              <InputLabel>Co-Advisor 1</InputLabel>
              <Select
                label="Co-Advisor 1"
                value={coAdvisor1}
                onChange={handleCoAdvisor1Change}
              >
                <MenuItem value={"Andrew T. Liem, MT, PhD"}>
                  Andrew T. Liem, MT, PhD
                </MenuItem>
                <MenuItem value={"Green Mandias, SKom, MCs"}>
                  Green Mandias, SKom, MCs
                </MenuItem>
                <MenuItem value={"Stenly R. Pungus, MT, PhD"}>
                  Stenly R. Pungus, MT, PhD
                </MenuItem>
                <MenuItem value={"Debby E. Sondakh, MT, PhD"}>
                  Debby E. Sondakh, MT, PhD
                </MenuItem>
                <MenuItem value={"Ir. Edson Y. Putra, MKom"}>
                  Ir. Edson Y. Putra, MKom
                </MenuItem>
                <MenuItem value={"Green A. Sandag, SKom, MS"}>
                  Green A. Sandag, SKom, MS
                </MenuItem>
                <MenuItem value={"Jacquline M. S. Waworundeng, ST, MT"}>
                  Jacquline M. S. Waworundeng, ST, MT
                </MenuItem>
                <MenuItem value={"Jimmy H. Moedjahedy, SKom, MKom, MM"}>
                  Jimmy H. Moedjahedy, SKom, MKom, MM
                </MenuItem>
                <MenuItem value={"Joe Y. Mambu, BSIT, MCIS"}>
                  Joe Y. Mambu, BSIT, MCIS
                </MenuItem>
                <MenuItem value={"Lidya C. Laoh, SKom, MMSi"}>
                  Lidya C. Laoh, SKom, MMSi
                </MenuItem>
                <MenuItem value={"Marshal Tombeng,"}>Marshal Tombeng,</MenuItem>
                <MenuItem value={"Oktoverano H. Lengkong, SKom, MDs, MM"}>
                  Oktoverano H. Lengkong, SKom, MDs, MM
                </MenuItem>
                <MenuItem value={"Reymon Rotikan, SKom, MS, MM"}>
                  Reymon Rotikan, SKom, MS, MM
                </MenuItem>
                <MenuItem value={"Reynoldus A. Sahulata, SKom, MM"}>
                  Reynoldus A. Sahulata, SKom, MM
                </MenuItem>
                <MenuItem value={"Rolly Lontaan, MKom"}>
                  Rolly Lontaan, MKom
                </MenuItem>
                <MenuItem value={"Semmy W. Taju, SKom"}>
                  Semmy W. Taju, SKom
                </MenuItem>
                <MenuItem value={"Senly I. Adam, SKom, MSc"}>
                  Senly I. Adam, SKom, MSc
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Co-Advisor 2</InputLabel>
              <Select
                label="Co-Advisor 2"
                value={coAdvisor2}
                onChange={handleCoAdvisor2Change}
              >
                <MenuItem value={"Andrew T. Liem, MT, PhD"}>
                  Andrew T. Liem, MT, PhD
                </MenuItem>
                <MenuItem value={"Green Mandias, SKom, MCs"}>
                  Green Mandias, SKom, MCs
                </MenuItem>
                <MenuItem value={"Stenly R. Pungus, MT, PhD"}>
                  Stenly R. Pungus, MT, PhD
                </MenuItem>
                <MenuItem value={"Debby E. Sondakh, MT, PhD"}>
                  Debby E. Sondakh, MT, PhD
                </MenuItem>
                <MenuItem value={"Ir. Edson Y. Putra, MKom"}>
                  Ir. Edson Y. Putra, MKom
                </MenuItem>
                <MenuItem value={"Green A. Sandag, SKom, MS"}>
                  Green A. Sandag, SKom, MS
                </MenuItem>
                <MenuItem value={"Jacquline M. S. Waworundeng, ST, MT"}>
                  Jacquline M. S. Waworundeng, ST, MT
                </MenuItem>
                <MenuItem value={"Jimmy H. Moedjahedy, SKom, MKom, MM"}>
                  Jimmy H. Moedjahedy, SKom, MKom, MM
                </MenuItem>
                <MenuItem value={"Joe Y. Mambu, BSIT, MCIS"}>
                  Joe Y. Mambu, BSIT, MCIS
                </MenuItem>
                <MenuItem value={"Lidya C. Laoh, SKom, MMSi"}>
                  Lidya C. Laoh, SKom, MMSi
                </MenuItem>
                <MenuItem value={"Marshal Tombeng,"}>Marshal Tombeng,</MenuItem>
                <MenuItem value={"Oktoverano H. Lengkong, SKom, MDs, MM"}>
                  Oktoverano H. Lengkong, SKom, MDs, MM
                </MenuItem>
                <MenuItem value={"Reymon Rotikan, SKom, MS, MM"}>
                  Reymon Rotikan, SKom, MS, MM
                </MenuItem>
                <MenuItem value={"Reynoldus A. Sahulata, SKom, MM"}>
                  Reynoldus A. Sahulata, SKom, MM
                </MenuItem>
                <MenuItem value={"Rolly Lontaan, MKom"}>
                  Rolly Lontaan, MKom
                </MenuItem>
                <MenuItem value={"Semmy W. Taju, SKom"}>
                  Semmy W. Taju, SKom
                </MenuItem>
                <MenuItem value={"Senly I. Adam, SKom, MSc"}>
                  Senly I. Adam, SKom, MSc
                </MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ background: "#F5F5F5" }}>
            <Button
              onClick={handleClose}
              color="primary"
              sx={{
                background: "white",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                textTransform: "none",
                color: "black",
              }}
            >
              Batal
            </Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              Simpan
            </Button>
          </DialogActions>
        </Dialog>
        {/* Dialog Select Dosen Pembimbing Start */}
      </Div>
    </Div>
  );
};

export default PengajuanJudulDosenSkripsi;
