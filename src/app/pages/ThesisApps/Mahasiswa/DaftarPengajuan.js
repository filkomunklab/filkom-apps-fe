import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  TextareaAutosize,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import Div from "@jumbo/shared/Div";
import { pdfjs } from "react-pdf";

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

function DaftarPengajuan() {
  const [judulPengajuan, setJudulPengajuan] = useState([]);
  const [judulPengajuanBaru, setJudulPengajuanBaru] = useState(""); // State untuk judul yang dimasukkan
  const [selectedOptions, setSelectedOptions] = useState([""]);
  const [inputCount, setInputCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [options] = useState(["Option 1", "Option 2", "Option 3"]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [Advisor, setAdvisor] = useState("");
  const [CoAdvisor1, setCoAdvisor1] = useState("");
  const [CoAdvisor2, setCoAdvisor2] = useState("");
  const [judulError, setJudulError] = useState(""); // State untuk pesan error judul

  const [pengajuanJudulFile, setPengajuanJudulFile] = useState(null);
  const [selectedPengajuanJudulFileName, setSelectedPengajuanJudulFileName] =
    useState("");
  const [pengajuanJudulUploadedFiles, setPengajuanJudulUploadedFiles] =
    useState([]);
  // Tambahkan state untuk melacak apakah file pembayaran telah diunggah
  const [isPengajuanJudulUploaded, setIsPaymentUploaded] = useState(false);

  // state select kelas
  const [kelas, setKelas] = React.useState("");
  const [optionsKelas] = useState([
    "proposal semester ganjil 2023/2024 - stenly adam",
    "skripsi semester ganjil 2023/2024 - green mandias",
    "padat semester ganjil 2023/2024 - green mandias",
  ]);
  const handleKelasChange = (event) => {
    setKelas(event.target.value);
  };

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
    const updatedFiles = [...pengajuanJudulUploadedFiles];
    updatedFiles.splice(index, 1);
    setPengajuanJudulUploadedFiles(updatedFiles);
    setPengajuanJudulFile(null);
    setSelectedPengajuanJudulFileName("");
  };

  const handleSelectChange = (e, index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = e.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  const handleAddSelect = () => {
    if (inputCount < 5) {
      setInputCount(inputCount + 1);
      setSelectedOptions([...selectedOptions, ""]);
    }
  };

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setJudulError(""); // Bersihkan pesan error ketika dialog ditutup
  };

  const handleSubmit = async () => {
    if (!judulPengajuanBaru) {
      // Jika judul kosong, tampilkan pesan error
      setJudulError("Judul harus diisi");
    } else {
      // Tutup dialog
      setOpen(false);

      // Buka popup konfirmasi
      setIsConfirmDialogOpen(true);
    }

    // const payload = {
    //   nama_parnter: selectedOption,
    //   judul: judulPengajuan,
    // };
    // const res = await Fetch("/list-mahasiswa");
    // console.log("res", res);
  };

  const handleCloseConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };

  const handleConfirmSubmit = () => {
    // Lakukan sesuatu saat pengguna mengkonfirmasi
    // ...

    // Tambahkan judul baru ke dalam state judulPengajuan
    setJudulPengajuan([...judulPengajuan, judulPengajuanBaru]);

    // Tutup popup konfirmasi
    setIsConfirmDialogOpen(false);

    // Reset judulPengajuanBaru setelah judul berhasil diajukan
    setJudulPengajuanBaru("");

    // Reset status isPaymentUploaded menjadi false
    setIsPaymentUploaded(false);

    // Reset file pembayaran dan nama file
    setPengajuanJudulFile(null);
    setSelectedPengajuanJudulFileName("");

    // Bersihkan daftar file pembayaran yang telah diunggah
    setPengajuanJudulUploadedFiles([]);
  };

  const handleAdvisorChange = (e) => {
    setAdvisor(e.target.value);
  };

  const handleCoAdvisorChange1 = (e) => {
    setCoAdvisor1(e.target.value);
  };

  const handleCoAdvisorChange2 = (e) => {
    setCoAdvisor2(e.target.value);
  };

  return (
    <Div>
      <Div>
        <Div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "24px",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Typography style={{ fontSize: "24px", fontWeight: "600px" }}>
            Daftar Pengajuan
          </Typography>
          <Div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 3,
              alignItems: "center",
            }}
          >
            <Button
              style={{
                borderRadius: "60px",
                padding: "12px 16px",
                alignItems: "center",
                background: "#006AF5",
                color: "#ffff",
                "&:hover": {
                  color: "#006AF5",
                },
              }}
              onClick={handleClickOpen}
            >
              <AddIcon />
              Ajukan Judul
            </Button>
          </Div>
        </Div>
      </Div>

      <TableContainer>
        <Table>
          <TableHead style={{ background: "rgba(26, 56, 96, 0.10)" }}>
            <TableRow>
              <TableCell style={{ width: "60px", margin: "0 100px" }}>
                No
              </TableCell>
              <TableCell style={{ width: "800px", margin: "0 100px" }}>
                Judul
              </TableCell>
              <TableCell style={{ width: "200px", margin: "0 100px" }}>
                Status
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {judulPengajuan.map((judul, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{judul}</TableCell>
                <TableCell>
                  <Chip label={"Belum"} />
                </TableCell>
                <TableCell>
                  <Link
                    href="#"
                    to="/sistem-informasi-skripsi/daftar-pengajuan/beranda"
                    style={{
                      textDecoration: "none",
                      color: "blue",
                      fontSize: "12px",
                    }}
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
        <DialogTitle
          style={{
            background: "rgba(26, 56, 96, 0.10)",
            width: "full",
            height: "75px",
            marginBottom: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Mengajukan Judul
        </DialogTitle>
        <DialogContent>
          <DialogTitle
            style={{
              background: "rgba(26, 56, 96, 0.10)",
              width: "100%",
              height: "75px",
              marginBottom: "25px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              borderRadius: "6px",
            }}
          >
            Kelas
          </DialogTitle>
          {/* select kelas */}
          <Div sx={{ marginBottom: "25px" }}>
            <FormControl sx={{ m: 1, minWidth: "98%" }} size="small">
              <InputLabel id="demo-select-kelas-small-label">Kelas</InputLabel>
              <Select
                labelId="demo-select-kelas-small-label"
                id="demo-select-kelas-small"
                value={kelas}
                label="Kelas"
                onChange={handleKelasChange}
              >
                {optionsKelas.map((optKelas) => (
                  <MenuItem value={optKelas}>{optKelas}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Div>

          <DialogTitle
            style={{
              background: "rgba(26, 56, 96, 0.10)",
              width: "100%",
              height: "75px",
              marginBottom: "25px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              borderRadius: "6px",
            }}
          >
            Buat Kelompok
          </DialogTitle>
          {selectedOptions.map((option, index) => (
            <Div key={index}>
              <FormControl style={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">
                  Nama Partner {index + 1}
                </InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Nama Partner 1"
                  fullWidth
                  value={option}
                  onChange={(e) => handleSelectChange(e, index)}
                  style={{ marginBottom: "25px", width: "400px" }}
                >
                  {options.map((opt, optIndex) => (
                    <MenuItem key={optIndex} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Div>
          ))}
          {inputCount < 5 && (
            <Button
              style={{ fontSize: "14px", marginBottom: "25px" }}
              onClick={handleAddSelect}
            >
              <AddIcon fontSize="small" />
              Tambah Partner
            </Button>
          )}

          <Div>
            {/*TextArea Start */}
            <Div>
              <DialogContentText style={{ width: "100%", margin: "auto" }}>
                Judul
              </DialogContentText>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Enter Judul"
                style={{
                  width: "100%",
                  height: 108,
                  marginBottom: "25px",
                  display: "block",
                  resize: "vertical",
                  borderColor: judulError ? "red" : "", // Tambahkan border merah jika ada error
                }}
                value={judulPengajuanBaru}
                onChange={(e) => {
                  setJudulPengajuanBaru(e.target.value);
                  setJudulError(""); // Bersihkan pesan error saat pengguna mengubah judul
                }}
              />
              {judulError && <p style={{ color: "red" }}>{judulError}</p>}
            </Div>
            {/* TextArea End */}

            {/* Upload Pengajuan Judul Start */}
            <Div sx={{ display: "flex", marginBottom: "20px" }}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  textTransform: "none",
                  background: "#006AF5",
                  color: "white",
                  fontSize: "10px",
                  borderRadius: "6px 0 0 6px",
                  padding: "6px 12px",
                  width: "80px",
                  height: "30px",
                }}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={onPengajuanJudulFileChange}
                  style={{ display: "none" }}
                />
                Pilih File
              </Button>
              <input
                style={{
                  height: "30px",
                  border: "1px solid #ccc",
                  width: "350px",
                  borderRadius: "0 6px 6px 0",
                  fontSize: "10px",
                }}
                type="text"
                id="pengajuanJudulFilename"
                autoComplete="off"
                disabled
                readOnly
                value={selectedPengajuanJudulFileName || "No file uploaded"}
              />
            </Div>
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
                              cursor: "pointer",
                              color: "red",
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
                <InputLabel id="demo-select-small"></InputLabel>
                <InputLabel id="demo-simple-select-label">Advisor</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Advisor}
                  label="Advisor"
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
              <FormControl fullWidth sx={{ margin: "0 25px" }} size="small">
                <InputLabel id="demo-simple-select-label">
                  Co-Advisor 1
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={CoAdvisor1}
                  label="Co-Advisor 1"
                  onChange={handleCoAdvisorChange1}
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
                  value={CoAdvisor2}
                  label="Co-Advisor 2"
                  onChange={handleCoAdvisorChange2}
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
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <FormControlLabel value="ya" control={<Radio />} label="Ya" />
                <FormControlLabel
                  value="tidak"
                  control={<Radio />}
                  label="Tidak"
                />
              </RadioGroup>
            </Div>
            {/* Radio Button End*/}
          </Div>
        </DialogContent>

        <DialogActions style={{ background: "#F5F5F5" }}>
          <Button
            onClick={handleClose}
            style={{
              borderRadius: "6px",
              border: "##E0E0E0",
              background: "#FFFF",
              color: "black",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            style={{
              background: "#006AF5",
              color: "#ffff",
              "&:hover": {
                color: "#006AF5",
              },
            }}
          >
            Ajukan
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isConfirmDialogOpen}
        onClose={handleCloseConfirmDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle style={{ fontSize: "20px", fontWeight: "500" }}>
          Mengajukan Judul
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin mengajukan judul ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ background: "#F5F5F5" }}>
          <Button
            onClick={handleCloseConfirmDialog}
            style={{
              borderRadius: "6px",
              border: "#E0E0E0",
              background: "#FFFF",
              color: "black",
              textTransform: "none",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={handleConfirmSubmit}
            color="primary"
            style={{
              background: "#006AF5",
              color: "#ffff",
              textTransform: "none",
              "&:hover": {
                color: "#006AF5",
              },
            }}
          >
            Kirim
          </Button>
        </DialogActions>
      </Dialog>
    </Div>
  );
}

export default DaftarPengajuan;
