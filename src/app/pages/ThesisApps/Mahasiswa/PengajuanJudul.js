import React, { useState } from "react";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
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
  Paper,
} from "@mui/material";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import { pdfjs } from "react-pdf";
import AttachmentIcon from "@mui/icons-material/Attachment";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// View Document pengajuan judul
const PDFViewerPengajuanJudul = ({ pengajuanJudulFile }) => {
  const viewPDFPengajuanJudul = () => {
    // Buat URL objek untuk file PDF
    const pdfURL = URL.createObjectURL(pengajuanJudulFile);

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span onClick={viewPDFPengajuanJudul}>View</span>
    </div>
  );
};

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

  const [isEditing, setIsEditing] = useState(false);
  const [judul, setJudul] = useState(
    "Pengembangan Sistem Informasi Skripsi di Fakultas Ilmu Komputer Universitas Klabat"
  );
  // State untuk manajemen dialog konfirmasi perubahan judul
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [initialJudul, setInitialJudul] = useState(judul);

  const handleCancelAllEdits = () => {
    setJudul(initialJudul);
    setIsEditing(false);
    setSelectedOption(initialSelectedOption);
    setStatusVisible(true);
  };

  // Fungsi yang dipanggil ketika tombol "Ubah" ditekan
  const handleEditClick = () => {
    setIsEditing(true);
    setInitialSelectedOption(selectedOption);
    setStatusVisible(false); // Menyembunyikan status dan chip
    setInitialJudul(judul); // Simpan nilai awal judul
  };

  // Fungsi yang dipanggil ketika tombol "Batal" ditekan dalam mode edit
  const handleCancelEdit = () => {
    setJudul(initialJudul);
    setIsEditing(false);
    setSelectedOption(initialSelectedOption);
    setStatusVisible(true); // Menampilkan kembali status dan chip
    resetUploadedFile(); // Panggil fungsi resetUploadedFile
  };

  const resetUploadedFile = () => {
    setPengajuanJudulFile(null);
    setSelectedPengajuanJudulFileName("");
    setPengajuanJudulUploadedFiles([]);
    setIsPaymentUploaded(false);
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

  const [pengajuanJudulFile, setPengajuanJudulFile] = useState(null);
  const [selectedPengajuanJudulFileName, setSelectedPengajuanJudulFileName] =
    useState("");
  const [pengajuanJudulUploadedFiles, setPengajuanJudulUploadedFiles] =
    useState([]);
  // Tambahkan state untuk melacak apakah file pembayaran telah diunggah
  const [isPaymentUploaded, setIsPaymentUploaded] = useState(false);

  const onPengajuanJudulFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (pengajuanJudulUploadedFiles.length === 0) {
        setPengajuanJudulFile(file);
        setSelectedPengajuanJudulFileName(file.name);

        // Tambahkan data file baru ke state paymentUploadedFiles
        const newFileData = {
          name: file.name,
          date: new Date().toLocaleDateString(),
          size: file.size,
        };

        setPengajuanJudulUploadedFiles([newFileData]);
        // Set isPaymentUploaded menjadi true
        setIsPaymentUploaded(true);
      } else {
        // alert(
        //   "Anda sudah mengunggah satu file. Hapus file sebelumnya untuk mengunggah yang baru."
        // );
      }
    }
  };
  // Fungsi untuk menghapus file Pengajuan Judul
  const handleDeletePengajuanJudulFile = (index) => {
    if (index >= 0 && index < pengajuanJudulUploadedFiles.length && isEditing) {
      // Hapus file dari state
      const updatedFiles = [...pengajuanJudulUploadedFiles];
      updatedFiles.splice(index, 1);
      setPengajuanJudulUploadedFiles(updatedFiles);
      // Reset file yang dipilih
      setPengajuanJudulFile(null);
      setSelectedPengajuanJudulFileName("");
      // Juga set isPaymentUploaded menjadi false karena file dihapus
      setIsPaymentUploaded(false);
    }
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
          Pengajuan Judul
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
          <Div sx={{ width: "100%" }}>
            <MenuMahasiswa />
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
              {/* Upload Pengajuan Judul Start */}
              {isEditing && (
                <Div sx={{ display: "flex", marginBottom: "20px" }}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      textTransform: "none",
                      background: "#006AF5",
                      color: "white",
                      fontSize: "12px",
                      borderRadius: "6px",
                      width: "130px",
                      height: "30px",
                    }}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={onPengajuanJudulFileChange}
                      style={{ display: "none" }}
                    />
                    <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                    Unggah file
                  </Button>
                </Div>
              )}
              {/* UPload Pengajuan Judul End */}
              {/* Table Upload Pengajuan Judul Start*/}
              <TableContainer sx={{ marginBottom: "25px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "#F5F5F5" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "3%" }}
                      >
                        Nomor
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "45%" }}
                      >
                        Nama File
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "20%" }}
                      >
                        Tanggal
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "20%" }}
                      >
                        Ukuran
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          padding: "11px",
                          textAlign: "center",
                          width: "12%",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pengajuanJudulUploadedFiles.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {file.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {file.date}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {file.size} bytes
                        </TableCell>
                        <TableCell>
                          <Div sx={{ display: "flex" }}>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                color: "blue",
                                fontSize: "12px",
                              }}
                            >
                              {pengajuanJudulFile && (
                                <PDFViewerPengajuanJudul
                                  pengajuanJudulFile={pengajuanJudulFile}
                                />
                              )}
                            </span>
                            <Div
                              style={{
                                margin: "0 5px", // Margin di sekitar garis vertikal
                                color: "#E0E0E0",
                              }}
                            >
                              |
                            </Div>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: isEditing ? "pointer" : "default", // Nonaktifkan jika bukan mode edit
                                color: isEditing ? "red" : "#E0E0E0", // Ubah warna saat dalam mode edit
                                fontSize: "12px",
                              }}
                              onClick={() =>
                                handleDeletePengajuanJudulFile(index)
                              }
                            >
                              Delete
                            </span>
                          </Div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Upload Pengajuan Judul End*/}
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
                    <MenuItem value="">None</MenuItem>
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
                    <MenuItem value={"Marshal Tombeng,"}>
                      Marshal Tombeng,
                    </MenuItem>
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
                    <MenuItem value="">None</MenuItem>
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
                    <MenuItem value={"Marshal Tombeng,"}>
                      Marshal Tombeng,
                    </MenuItem>
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
                    <MenuItem value="">None</MenuItem>
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
                    <MenuItem value={"Marshal Tombeng,"}>
                      Marshal Tombeng,
                    </MenuItem>
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
