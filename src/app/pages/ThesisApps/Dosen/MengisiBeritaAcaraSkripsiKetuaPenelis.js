import Div from "@jumbo/shared/Div";
import React, { useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  DialogContentText,
  TextareaAutosize,
} from "@mui/material";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import MenuPenguji from "app/shared/MenuHorizontal/MenuPenguji";

const MengisiBeritaAcaraSkripsiKetuaPenelis = () => {
  // State untuk mengontrol tampilan popup
  const [openScoreDialog, setOpenScoreDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewedChanges, setViewedChanges] = useState("");
  const [status, setStatus] = useState(""); // State untuk menyimpan status
  const [isRevisionEnabled, setIsRevisionEnabled] = useState(true);
  const [isScoreEnabled, setIsScoreEnabled] = useState(true);
  const [isSignInEnabled, setIsSignInEnabled] = useState(true);
  const [openSignInConfirmationDialog, setOpenSignInConfirmationDialog] =
    useState(false);
  const [isSubmitButtonVisible, setIsSubmitButtonVisible] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false); // State untuk mengecek apakah sudah disubmit
  const [nilai, setNilai] = useState("");
  const [perubahan, setPerubahan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [errorMessageKesimpulan, setErrorMessageKesimpulan] = useState();
  const [errorMessagePenilaian, setErrorMessagePenilaian] = useState();

  const handleSubmit = () => {
    // Setelah disubmit, radio button akan diganti dengan teks
    setIsSubmitted(true);
  };
  const handleOpenSignInConfirmationDialog = () => {
    setOpenSignInConfirmationDialog(true);
  };

  const handleCloseSignInConfirmationDialog = () => {
    setOpenSignInConfirmationDialog(false);
  };

  const { role } = JSON.parse(localStorage.getItem("user"));
  // const role = ["KETUA_PANELIS", "DOSEN"];
  console.log(role);

  const handleStatusChange = (event) => {
    setStatus(event.target.value); // Mengubah status saat radio button berubah
  };

  const handleNilaiChange = (event) => {
    setNilai(event.target.value); // Mengubah nilai saat radio button berubah
  };

  const handlePerubahanChange = (event) => {
    setPerubahan(event.target.value); // Mengubah jenis perubahan saat radio button berubah
  };

  const handleDeskripsiChange = (event) => {
    setDeskripsi(event.target.value); // Ubah nama state saat radio button berubah
  };

  const [
    openConfirmationBeritaAcaraDialog,
    setOpenConfirmationBeritaAcaraDialog,
  ] = useState(false);

  const handleOpenConfirmationBeritaAcaraDialog = () => {
    if (!status || !perubahan || !nilai || !deskripsi) {
      // Tampilkan pesan kesalahan jika salah satu opsi belum diisi
      setErrorMessageKesimpulan("Harap isi semua opsi sebelum submit.");
      return;
    }
    setOpenConfirmationBeritaAcaraDialog(true);
  };

  const handleCloseConfirmationBeritaAcaraDialog = () => {
    setOpenConfirmationBeritaAcaraDialog(false);
  };

  // const history = useHistory();

  // Fungsi yang akan dijalankan ketika pengguna mengklik tombol "Ya" di dialog konfirmasi
  const handleSubmitData = () => {
    // Setelah tindakan selesai, tutup dialog konfirmasi
    handleCloseConfirmationBeritaAcaraDialog();
  };

  const handleConfirmClick = () => {
    setIsSubmitButtonVisible(false);
  };

  const [ketuaPenelisStatusBeritaAcara, setKetuaPenelisStatusBeritaAcara] =
    useState("Belum");
  const [KetuaPenelisStatusPerubahan, setKetuaPenelisStatusPerubahan] =
    useState("Belum");

  const [isSigned, setIsSigned] = useState(false);
  const [isSudmit, setIsSudmited] = useState(false);

  const handleSignClick = () => {
    // Logika untuk mengubah status
    if (!isSigned) {
      setKetuaPenelisStatusBeritaAcara("Sudah");
      setIsSigned(true);
    }
  };

  const handleSudmitClick = () => {
    // Logika untuk mengubah status
    if (!isSudmit) {
      setKetuaPenelisStatusPerubahan("Sudah");
      setIsSudmited(true);
    }
  };

  const handleOpenViewDialog = (changes) => {
    setViewedChanges(changes);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  const handleOpenConfirmationDialog = () => {
    setOpenConfirmationDialog(true);
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    handleCloseRevisionDialog();
  };

  const handleOpenConfirmDialog = () => {
    // Memeriksa apakah salah satu opsi tidak terpilih
    if (
      selectedValues.value1 === "" ||
      selectedValues.value2 === "" ||
      selectedValues.value3 === "" ||
      selectedValues.value4 === ""
    ) {
      setErrorMessagePenilaian(
        "Anda harus memilih semua opsi sebelum mengirim penilaian."
      );
      return;
    }
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  // Fungsi untuk menutup dialog konfirmasi dan melakukan tindakan saat Simpan diklik
  const handleSave = () => {
    // Simpan nilai ke database atau tempat penyimpanan lainnya di sini

    // Set nilai scoreSubmitted menjadi true untuk menampilkan nilai di tabel
    setScoreSubmitted(true);

    // Setelah melakukan tindakan yang sesuai, tutup dialog konfirmasi
    handleCloseDialog();
    handleCloseConfirmDialog();
  };

  const handleCancle = () => {
    handleCloseDialog();
    handleCloseConfirmDialog();
  };

  // Fungsi untuk membuka popup
  const handleOpenDialog = () => {
    setOpenScoreDialog(true);
  };

  // Fungsi untuk menutup popup
  const handleCloseDialog = () => {
    // Tutup dialog
    setOpenScoreDialog(false);
  };

  // program fungsi penilian start
  const [selectedValues, setSelectedValues] = useState({
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
    value7: "",
    value8: "",
    value9: "",
    value10: "",
    value11: "",
    value12: "",
  });

  const [scoreSubmitted, setScoreSubmitted] = useState(false); // Tambahkan state untuk melacak apakah nilai sudah dikirim

  const calculateTotal = () => {
    const values = Object.values(selectedValues);
    const totalValue = values.reduce((acc, curr) => {
      if (curr) {
        return acc + parseInt(curr, 10);
      }
      return acc;
    }, 0);
    const result = totalValue / 4;
    return result;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedValues({
      ...selectedValues,
      [name]: value,
    });
  };

  const total = calculateTotal();
  // program fungsi penilaian end

  const [openRevisionDialog, setOpenRevisionDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [revisionText, setRevisionText] = useState(""); // State untuk menyimpan teks revisi

  const handleOpenRevisionDialog = () => {
    setOpenRevisionDialog(true);
  };

  const handleCloseRevisionDialog = () => {
    setOpenRevisionDialog(false);
  };

  const handleRevisionSubmit = () => {
    // Simpan teks revisi yang diisi oleh pengguna
    setViewedChanges(revisionText);

    // Setelah tindakan selesai, tutup dialog revisi
    handleCloseRevisionDialog();
    handleCloseConfirmationDialog();
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
          Berita Acara Skripsi
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
          <Riwayatlog />
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
          <Div sx={{ width: "100%" }}>
            <MenuPenguji />
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
                fontWeight: 600,
              }}
            >
              PENGEMBANGAN SISTEM INFORMASI SKRIPSI DI FAKULTAS ILMU KOMPUTER
              UNIVERSITAS KLABAT
            </Typography>
            {/* Table Penilaian Start */}

            <TableContainer sx={{ marginBottom: "50px" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignSelf: "stretch",
                  background: "rgba(26, 56, 96, 0.10)",
                }}
              >
                Penilaian
              </Typography>
              <Table>
                <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                  <TableRow sx={{ color: "rgba(25, 36, 52, 0.94)" }}>
                    <TableCell sx={{ width: "25%" }}>Nomor</TableCell>
                    <TableCell sx={{ width: "25%" }}>Mahasiswa</TableCell>
                    <TableCell sx={{ width: "25%" }}>Ketua Penelis</TableCell>
                    <TableCell sx={{ width: "25%" }}>Anggota Penelis</TableCell>
                    <TableCell sx={{ width: "25%" }}>Advisor</TableCell>
                    <TableCell sx={{ width: "25%" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Frances Rully Yong</TableCell>
                    <TableCell>{scoreSubmitted ? total : "-"}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <span
                        style={{
                          textDecoration: "none",
                          cursor: isScoreEnabled ? "pointer" : "not-allowed", // Mengubah tampilan kursor
                          color: isScoreEnabled ? "blue" : "gray", // Mengubah warna
                        }}
                        onClick={() => {
                          if (isScoreEnabled) {
                            handleOpenDialog();
                          }
                        }}
                      >
                        Score
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {/* Table Penilaian End */}

            {/* Table Perubahan Start */}
            <TableContainer sx={{ marginBottom: "50px" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignSelf: "stretch",
                  background: "rgba(26, 56, 96, 0.10)",
                }}
              >
                Perubahan
              </Typography>
              <Table>
                <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                  <TableRow sx={{ color: "rgba(25, 36, 52, 0.94)" }}>
                    <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                    <TableCell sx={{ width: "25%" }}>Ketua Penelis</TableCell>
                    <TableCell sx={{ width: "25%" }}>Anggota Penelis</TableCell>
                    <TableCell sx={{ width: "25%" }}>Advisor</TableCell>
                    <TableCell sx={{ width: "25%" }}>Co-Advisor</TableCell>
                    <TableCell sx={{ width: "25%" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <Chip
                        label={KetuaPenelisStatusPerubahan}
                        size="small"
                        sx={{
                          background: isSudmit
                            ? "rgba(21, 131, 67, 0.10)"
                            : "rgba(26, 56, 96, 0.10)",
                          color: isSudmit ? "#0A7637" : undefined,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip label="Belum" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label="Belum" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label="Belum" size="small" />
                    </TableCell>
                    <TableCell sx={{ display: "flex" }}>
                      <span
                        style={{
                          textDecoration: "none",
                          cursor: "pointer",
                          color: "blue",
                        }}
                        onClick={() => handleOpenViewDialog(viewedChanges)}
                      >
                        View
                      </span>
                      <Div sx={{ margin: "2px", color: "#E0E0E0" }}>|</Div>
                      <span
                        style={{
                          textDecoration: "none",
                          cursor: isRevisionEnabled ? "pointer" : "not-allowed", // Mengubah tampilan kursor
                          color: isRevisionEnabled ? "blue" : "gray", // Mengubah warna
                        }}
                        onClick={() => {
                          if (isRevisionEnabled) {
                            handleOpenRevisionDialog();
                          }
                        }}
                      >
                        Revision
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {/* Table Perubahan End */}

            {/* Table Berita Acara Start */}
            <TableContainer sx={{ marginBottom: "50px" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignSelf: "stretch",
                  background: "rgba(26, 56, 96, 0.10)",
                }}
              >
                Berita Acara
              </Typography>
              <Table>
                <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                  <TableRow sx={{ color: "rgba(25, 36, 52, 0.94)" }}>
                    <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                    <TableCell sx={{ width: "12%" }}>Dekan Fakultas</TableCell>
                    <TableCell sx={{ width: "12%" }}>Ketua Penelis</TableCell>
                    <TableCell sx={{ width: "12%" }}>Anggota Penelis</TableCell>
                    <TableCell sx={{ width: "12%" }}>Advisor</TableCell>
                    <TableCell sx={{ width: "12%" }}>Co-Advisor</TableCell>
                    <TableCell sx={{ width: "5%" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <Chip label="Belum" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={ketuaPenelisStatusBeritaAcara}
                        size="small"
                        sx={{
                          background: isSigned
                            ? "rgba(21, 131, 67, 0.10)"
                            : "rgba(26, 56, 96, 0.10)",
                          color: isSigned ? "#0A7637" : undefined,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip label="Belum" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label="Belum" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label="Sudah"
                        size="small"
                        sx={{
                          background: "rgba(21, 131, 67, 0.10)",
                          color: "#0A7637",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <span
                        style={{
                          textDecoration: "none",
                          cursor: isSignInEnabled ? "pointer" : "not-allowed",
                          color: isSignInEnabled ? "blue" : "gray",
                        }}
                        onClick={() => {
                          if (isSignInEnabled) {
                            handleOpenSignInConfirmationDialog("");
                          }
                        }}
                      >
                        Sign
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {/* Table Berita Acara End */}
            {/* Radio Button Penilaian Akhir Start */}

            {/* Kesimpulan dari Pengujian Ketua penelis start */}
            {/* <Div hidden={role.includes("KETUA_PANELIS") ? false : true}> */}
            <Div
              sx={{
                display: "flex",
                padding: "0px 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
              }}
            >
              <Typography variant="subtitle2">
                Kesimpulan Ujian Skripsi
              </Typography>
              {isSubmitted ? (
                <Div>
                  <Typography variant="body1">{status}</Typography>
                </Div>
              ) : (
                <Div>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="status"
                      name="status"
                      value={status}
                      onChange={handleStatusChange}
                    >
                      <FormControlLabel
                        value="Diterima"
                        control={<Radio />}
                        label="Diterima"
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      <FormControlLabel
                        value="Ditolak"
                        control={<Radio />}
                        label="Ditolak"
                        onChange={(e) => setStatus(e.target.value)}
                      />
                    </RadioGroup>
                  </FormControl>
                </Div>
              )}
            </Div>

            <Div
              sx={{
                display: "flex",
                padding: "0px 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
              }}
            >
              {isSubmitted ? (
                <Div>
                  <Typography variant="subtitle2">Perubahan</Typography>
                  <Typography variant="body1">{perubahan}</Typography>
                </Div>
              ) : (
                <Div>
                  <Div>
                    <Typography variant="subtitle2">Perubahan</Typography>
                    <Div>
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          aria-label="perubahan"
                          name="perubahan"
                          value={perubahan}
                          onChange={(e) => setPerubahan(e.target.value)}
                        >
                          <FormControlLabel
                            value="Major"
                            control={<Radio />}
                            label="Major"
                          />
                          <FormControlLabel
                            value="Minor"
                            control={<Radio />}
                            label="Minor"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Div>
                  </Div>
                </Div>
              )}
            </Div>
            <Div
              sx={{
                display: "flex",
                padding: "0px 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
              }}
            >
              {isSubmitted ? (
                <Div>
                  <Typography variant="subtitle2">
                    Nilai Kesimpulan Ujian Skripsi
                  </Typography>
                  <Typography variant="body1">{nilai}</Typography>
                </Div>
              ) : (
                <Div>
                  <Div>
                    <Typography variant="subtitle2">
                      Nilai Kesimpulan Ujian Skripsi
                    </Typography>
                    <Div>
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          aria-label="nilai"
                          name="nilai"
                          value={nilai}
                          onChange={(e) => setNilai(e.target.value)}
                        >
                          <FormControlLabel
                            value="A"
                            control={<Radio />}
                            label="A"
                          />
                          <FormControlLabel
                            value="A-"
                            control={<Radio />}
                            label="A-"
                          />
                          <FormControlLabel
                            value="B+"
                            control={<Radio />}
                            label="B+"
                          />
                          <FormControlLabel
                            value="B"
                            control={<Radio />}
                            label="B"
                          />
                          <FormControlLabel
                            value="B-"
                            control={<Radio />}
                            label="B-"
                          />
                          <FormControlLabel
                            value="C+"
                            control={<Radio />}
                            label="C+"
                          />
                          <FormControlLabel
                            value="C"
                            control={<Radio />}
                            label="C"
                          />
                          <FormControlLabel
                            value="C-"
                            control={<Radio />}
                            label="C-"
                          />
                          <FormControlLabel
                            value="D+"
                            control={<Radio />}
                            label="D+"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Div>
                  </Div>
                </Div>
              )}
            </Div>
            <Div
              sx={{
                display: "flex",
                padding: "0px 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
              }}
            >
              {isSubmitted ? (
                <Div>
                  <Typography variant="subtitle2">Deskripsi</Typography>
                  <Typography variant="body1">{deskripsi}</Typography>
                </Div>
              ) : (
                <Div>
                  <Div>
                    <Typography variant="subtitle2">Deskripsi</Typography>
                    <Div>
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          aria-label="deskripsi"
                          name="deskripsi"
                          value={deskripsi}
                          onChange={(e) => setDeskripsi(e.target.value)}
                        >
                          <FormControlLabel
                            value="Lulus"
                            control={<Radio />}
                            label="Lulus"
                          />
                          <FormControlLabel
                            value="Tidak Lulus"
                            control={<Radio />}
                            label="Tidak Lulus"
                          />
                          <FormControlLabel
                            value="Mengulang"
                            control={<Radio />}
                            label="Mengulang"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Div>
                  </Div>
                  <Typography style={{ color: "red" }}>
                    {errorMessageKesimpulan}
                  </Typography>
                </Div>
              )}
            </Div>

            {/* Radio Button Penilaian Akhir End */}
            {isSubmitButtonVisible && (
              <Div
                sx={{
                  display: "flex",
                  width: "100%",
                  height: "59.43px",
                  padding: "12px 24px 12px 0px",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "12px",
                  background: "#F5F5F5",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  color="primary"
                  onClick={handleOpenConfirmationBeritaAcaraDialog}
                >
                  Submit
                </Button>
              </Div>
            )}
            {/* </Div> */}
            {/* Kesimpulan dari Pengujian Ketua penelis start */}
          </Div>
        </Div>
        {/* Element 2 End */}
      </Div>

      {/* Dialog Penilaian Start */}
      <Dialog
        open={openScoreDialog}
        onClose={() => handleCloseDialog(true)} // Memanggil handleCloseDialog dengan argumen true ketika dialog ditutup
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle
          sx={{
            padding: "14px 16px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "6px 6px 0 0",
            border: "1px",
            textAlign: "center",
          }}
        >
          PENILAIAN
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "15px",
            alignSelf: "stretch",
          }}
        >
          <Div
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              alignSelf: "stretch",
            }}
          >
            <Typography sx={{ width: "100px" }}>Judul Skripsi</Typography>
            <Typography>:</Typography>
            <Typography>
              Pengembangan SIstem Informasi Skripsi di Fakultas Ilmu Komputer
              Universitas Klabat
            </Typography>
          </Div>
          <Div
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              alignSelf: "stretch",
            }}
          >
            <Typography sx={{ width: "100px" }}>Mahasiswa</Typography>
            <Typography>:</Typography>
            <Typography>Frances Rully Yong</Typography>
          </Div>
          <Div
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              alignSelf: "stretch",
            }}
          >
            <Typography sx={{ width: "100px" }}>NIM</Typography>
            <Typography>:</Typography>
            <Typography>10502194103421</Typography>
          </Div>
          <Div
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              alignSelf: "stretch",
            }}
          >
            <Typography sx={{ width: "100px" }}>Program Studi</Typography>
            <Typography>:</Typography>
            <Typography>Informatika</Typography>
          </Div>
          {/* nilai */}
          <TableHead sx={{ background: "#F5F5F5", width: "100%" }}>
            <TableRow>
              <TableCell sx={{ width: "5%" }}>No</TableCell>
              <TableCell sx={{ width: "35%" }}>Kriteria</TableCell>
              <TableCell sx={{ width: "60%" }}>Range Nilai</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: "100%" }}>
            {/* Table Row Start*/}
            <TableRow>
              <TableCell sx={{ width: "5%" }}>1</TableCell>
              <TableCell sx={{ width: "35%" }}>Penguasaan Materi</TableCell>
              <TableCell sx={{ width: "60%" }}>
                <Div
                  sx={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center", // Menengahkan vertikal
                    justifyContent: "center", // Menengahkan horizontal
                    alignSelf: "stretch",
                  }}
                >
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value1 === "9"}
                    onChange={handleChange}
                    value="9"
                    name="value1"
                    inputProps={{ "aria-label": "9" }}
                  />
                  9
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value1 === "8"}
                    onChange={handleChange}
                    value="8"
                    name="value1"
                    inputProps={{ "aria-label": "8" }}
                  />
                  8
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value1 === "7"}
                    onChange={handleChange}
                    value="7"
                    name="value1"
                    inputProps={{ "aria-label": "7" }}
                  />
                  7
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value1 === "6"}
                    onChange={handleChange}
                    value="6"
                    name="value1"
                    inputProps={{ "aria-label": "6" }}
                  />
                  6
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value1 === "5"}
                    onChange={handleChange}
                    value="5"
                    name="value1"
                    inputProps={{ "aria-label": "5" }}
                  />
                  5
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value1 === "4"}
                    onChange={handleChange}
                    value="4"
                    name="value1"
                    inputProps={{ "aria-label": "4" }}
                  />
                  4
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value1 === "3"}
                    onChange={handleChange}
                    value="3"
                    name="value1"
                    inputProps={{ "aria-label": "3" }}
                  />
                  3
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value1 === "2"}
                    onChange={handleChange}
                    value="2"
                    name="value1"
                    inputProps={{ "aria-label": "2" }}
                  />
                  2
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value1 === "1"}
                    onChange={handleChange}
                    value="1"
                    name="value1"
                    inputProps={{ "aria-label": "1" }}
                  />
                  1
                </Div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "5%" }}>2</TableCell>
              <TableCell sx={{ width: "35%" }}>
                Konten (Aplikasi dan Materi)
              </TableCell>
              <TableCell
                sx={{
                  width: "60%",
                }}
              >
                <Div
                  sx={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center", // Menengahkan vertikal
                    justifyContent: "center", // Menengahkan horizontal
                    alignSelf: "stretch",
                  }}
                >
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value2 === "9"}
                    onChange={handleChange}
                    value="9"
                    name="value2"
                    inputProps={{ "aria-label": "9" }}
                  />
                  9
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value2 === "8"}
                    onChange={handleChange}
                    value="8"
                    name="value2"
                    inputProps={{ "aria-label": "8" }}
                  />
                  8
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value2 === "7"}
                    onChange={handleChange}
                    value="7"
                    name="value2"
                    inputProps={{ "aria-label": "7" }}
                  />
                  7
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value2 === "6"}
                    onChange={handleChange}
                    value="6"
                    name="value2"
                    inputProps={{ "aria-label": "6" }}
                  />
                  6
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value2 === "5"}
                    onChange={handleChange}
                    value="5"
                    name="value2"
                    inputProps={{ "aria-label": "5" }}
                  />
                  5
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value2 === "4"}
                    onChange={handleChange}
                    value="4"
                    name="value2"
                    inputProps={{ "aria-label": "4" }}
                  />
                  4
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value2 === "3"}
                    onChange={handleChange}
                    value="3"
                    name="value2"
                    inputProps={{ "aria-label": "3" }}
                  />
                  3
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value2 === "2"}
                    onChange={handleChange}
                    value="2"
                    name="value2"
                    inputProps={{ "aria-label": "2" }}
                  />
                  2
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value2 === "1"}
                    onChange={handleChange}
                    value="1"
                    name="value2"
                    inputProps={{ "aria-label": "1" }}
                  />
                  1
                </Div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "5%" }}>3</TableCell>
              <TableCell sx={{ width: "20%" }}>Presentasi</TableCell>
              <TableCell sx={{ width: "60%" }}>
                <Div
                  sx={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center", // Menengahkan vertikal
                    justifyContent: "center", // Menengahkan horizontal
                    alignSelf: "stretch",
                  }}
                >
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value3 === "9"}
                    onChange={handleChange}
                    value="9"
                    name="value3"
                    inputProps={{ "aria-label": "9" }}
                  />
                  9
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value3 === "8"}
                    onChange={handleChange}
                    value="8"
                    name="value3"
                    inputProps={{ "aria-label": "8" }}
                  />
                  8
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value3 === "7"}
                    onChange={handleChange}
                    value="7"
                    name="value3"
                    inputProps={{ "aria-label": "7" }}
                  />
                  7
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value3 === "6"}
                    onChange={handleChange}
                    value="6"
                    name="value3"
                    inputProps={{ "aria-label": "6" }}
                  />
                  6
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value3 === "5"}
                    onChange={handleChange}
                    value="5"
                    name="value3"
                    inputProps={{ "aria-label": "5" }}
                  />
                  5
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value3 === "4"}
                    onChange={handleChange}
                    value="4"
                    name="value3"
                    inputProps={{ "aria-label": "4" }}
                  />
                  4
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value3 === "3"}
                    onChange={handleChange}
                    value="3"
                    name="value3"
                    inputProps={{ "aria-label": "3" }}
                  />
                  3
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value3 === "2"}
                    onChange={handleChange}
                    value="2"
                    name="value3"
                    inputProps={{ "aria-label": "2" }}
                  />
                  2
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value3 === "1"}
                    onChange={handleChange}
                    value="1"
                    name="value3"
                    inputProps={{ "aria-label": "1" }}
                  />
                  1
                </Div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "5%" }}>4</TableCell>
              <TableCell sx={{ width: "35%" }}>
                Mempertahankan Pendapat
              </TableCell>
              <TableCell sx={{ width: "60%" }}>
                <Div
                  sx={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center", // Menengahkan vertikal
                    justifyContent: "center", // Menengahkan horizontal
                    alignSelf: "stretch",
                  }}
                >
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value4 === "9"}
                    onChange={handleChange}
                    value="9"
                    name="value4"
                    inputProps={{ "aria-label": "9" }}
                  />
                  9
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value4 === "8"}
                    onChange={handleChange}
                    value="8"
                    name="value4"
                    inputProps={{ "aria-label": "8" }}
                  />
                  8
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value4 === "7"}
                    onChange={handleChange}
                    value="7"
                    name="value4"
                    inputProps={{ "aria-label": "7" }}
                  />
                  7
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value4 === "6"}
                    onChange={handleChange}
                    value="6"
                    name="value4"
                    inputProps={{ "aria-label": "6" }}
                  />
                  6
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value4 === "5"}
                    onChange={handleChange}
                    value="5"
                    name="value4"
                    inputProps={{ "aria-label": "5" }}
                  />
                  5
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value4 === "4"}
                    onChange={handleChange}
                    value="4"
                    name="value4"
                    inputProps={{ "aria-label": "4" }}
                  />
                  4
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value4 === "3"}
                    onChange={handleChange}
                    value="3"
                    name="value4"
                    inputProps={{ "aria-label": "3" }}
                  />
                  3
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value4 === "2"}
                    onChange={handleChange}
                    value="2"
                    name="value4"
                    inputProps={{ "aria-label": "2" }}
                  />
                  2
                  <Radio
                    sx={{ margin: "4px" }}
                    checked={selectedValues.value4 === "1"}
                    onChange={handleChange}
                    value="1"
                    name="value4"
                    inputProps={{ "aria-label": "1" }}
                  />
                  1
                </Div>
              </TableCell>
            </TableRow>
            {/* Table Row End*/}
          </TableBody>
          {/* Jumlah nilai */}

          <Div
            sx={{
              display: "flex",
              alignItems: "center", // Menengahkan vertikal
              justifyContent: "center", // Menengahkan horizontal
              alignSelf: "stretch",
            }}
          >
            <Typography style={{ color: "red" }}>
              {errorMessagePenilaian}
            </Typography>
          </Div>
          <Div
            sx={{
              display: "flex",
              alignItems: "center", // Menengahkan vertikal
              justifyContent: "center", // Menengahkan horizontal
              alignSelf: "stretch",
            }}
          >
            <Typography>Jumlah Nilai = {total}</Typography>
          </Div>
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
            onClick={handleOpenConfirmDialog}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Penilaian End */}

      {/* Dialog konfirmasi  Penilaian Start*/}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Penilaian</DialogTitle>
        <DialogContent>
          <Typography>Apakah Anda yakin ingin memberikan nilai?</Typography>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCancle}
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
            onClick={() => {
              setIsScoreEnabled(false); // Menonaktifkan elemen "Score"
              handleSave();
            }}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialong Konfirmasi Penilaian End */}

      {/* Dialog Perubahan Start */}
      <Dialog
        open={openRevisionDialog}
        onClose={handleCloseRevisionDialog}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle
          sx={{
            padding: "14px 16px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "6px 6px 0 0",
            border: "1px",
            textAlign: "center",
          }}
        >
          PERUBAHAN
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "15px",
            alignSelf: "stretch",
          }}
        >
          <Div
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              alignSelf: "stretch",
            }}
          >
            <Typography sx={{ width: "100px" }}>Judul Skripsi</Typography>
            <Typography>:</Typography>
            <Typography>
              Pengembangan SIstem Informasi Skripsi di Fakultas Ilmu Komputer
              Universitas Klabat
            </Typography>
          </Div>
          <TableContainer>
            <Table>
              <TableHead sx={{ background: "#F5F5F5", width: "100%" }}>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Nama Lengkap</TableCell>
                  <TableCell>Nim</TableCell>
                  <TableCell>Program Studi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Geovalga Fransiscus Lim</TableCell>
                  <TableCell>103450342123</TableCell>
                  <TableCell>Informatika</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>Frances Rully Yong</TableCell>
                  <TableCell>103450342123</TableCell>
                  <TableCell>Informatika</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <DialogContentText sx={{ width: "100%", margin: "auto" }}>
            Perubahan
          </DialogContentText>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Enter Perubahan"
            style={{
              width: "100%",
              height: 108,
              marginBottom: "25px",
              display: "block",
              resize: "vertical",
            }}
            value={revisionText} // Set the value of the textarea to revisionText
            onChange={(e) => setRevisionText(e.target.value)} // Update revisionText when input changes
          />
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCloseRevisionDialog}
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
            onClick={handleOpenConfirmationDialog}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Perubahan End*/}

      {/* Dialong Konfirmasi Perubahan Start*/}
      <Dialog
        open={openConfirmationDialog}
        onClose={handleCloseRevisionDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Perubahan</DialogTitle>
        <DialogContent>
          <Typography>Apakah Anda yakin ingin memberikan perubahan?</Typography>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCloseConfirmationDialog}
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
            onClick={() => {
              handleRevisionSubmit();
              handleSudmitClick();
              setIsRevisionEnabled(false);
            }}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialong Konfirmasi Perubahan End */}

      {/* Melihat Perubahan Start */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle
          sx={{
            padding: "10px 12px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "6px 6px 0 0",
            border: "1px",
            textAlign: "center",
          }}
        >
          PERUBAHAN
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "15px",
            alignSelf: "stretch",
          }}
        >
          <Div
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              alignSelf: "stretch",
            }}
          >
            <Typography sx={{ width: "100px" }}>Judul Skripsi</Typography>
            <Typography>:</Typography>
            <Typography>
              Pengembangan Sistem Informasi Skripsi di Fakultas Ilmu Komputer
              Universitas Klabat
            </Typography>
          </Div>

          <Div
            sx={{
              display: "flex",
              padding: "0px 50px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "25px",
              alignSelf: "stretch",
            }}
          >
            <Div
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Ketua Penelis
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  border: "2px solid #F5F5F5",
                }}
              >
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {viewedChanges}
                </Typography>
              </Div>
            </Div>
            <Div
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Anggota Penelis
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                <Typography sx={{ whiteSpace: "pre-line" }}>-</Typography>
              </Div>
            </Div>
            <Div
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
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
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                <Typography sx={{ whiteSpace: "pre-line" }}>-</Typography>
              </Div>
            </Div>
            <Div
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Co-Advisor
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                <Typography sx={{ whiteSpace: "pre-line" }}>-</Typography>
              </Div>
            </Div>
          </Div>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCloseViewDialog}
            sx={{
              background: "white",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              textTransform: "none",
              color: "black",
            }}
          >
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
      {/* Melihat Perubahan End */}

      {/* Konfirmasi Sidang Skripsi Start*/}
      <Dialog
        open={openConfirmationBeritaAcaraDialog}
        onClose={handleCloseConfirmationBeritaAcaraDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle variant="subtitle2">Sidang Skripsi</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menyetujui hasil sidang ini?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCloseConfirmationBeritaAcaraDialog}
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
            onClick={() => {
              handleSubmitData();
              handleSubmit();
              handleConfirmClick();
            }}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Setuju
          </Button>
        </DialogActions>
      </Dialog>
      {/* konfrimasi Sidang Skripsi End */}
      <Dialog
        open={openSignInConfirmationDialog}
        onClose={handleCloseSignInConfirmationDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Berita Acara</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menyetujui berita acara?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCloseSignInConfirmationDialog}
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
            onClick={() => {
              handleSignClick();
              handleCloseSignInConfirmationDialog();
              setIsSignInEnabled();
            }}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Div>
  );
};

export default MengisiBeritaAcaraSkripsiKetuaPenelis;
