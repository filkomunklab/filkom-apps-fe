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
} from "@mui/material";
import { Link } from "react-router-dom";
import Div from "@jumbo/shared/Div";

function DaftarMahasiswa() {
  const [judulPengajuan, setJudulPengajuan] = useState([]);
  const [judulPengajuanBaru, setJudulPengajuanBaru] = useState(""); // State untuk judul yang dimasukkan
  const [selectedOptions, setSelectedOptions] = useState([""]);
  const [inputCount, setInputCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [options] = useState(["Option 1", "Option 2", "Option 3"]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [Advisor, setAdvisor] = useState(10);
  const [CoAdvisor1, setCoAdvisor1] = useState(10);
  const [CoAdvisor2, setCoAdvisor2] = useState(10);
  const [judulError, setJudulError] = useState(""); // State untuk pesan error judul

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setJudulError(""); // Bersihkan pesan error ketika dialog ditutup
  };

  const handleSubmit = () => {
    if (!judulPengajuanBaru) {
      // Jika judul kosong, tampilkan pesan error
      setJudulError("Judul harus diisi");
    } else {
      // Tutup dialog
      setOpen(false);

      // Buka popup konfirmasi
      setIsConfirmDialogOpen(true);
    }
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
                    to="./BerandaMahasiswa.js"
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
            <Div>
              <DialogContentText sx={{ width: "100%", margin: "auto" }}>
                Latar Belakang
              </DialogContentText>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Enter Latar Belakang"
                style={{
                  width: "100%",
                  height: 108,
                  marginBottom: "25px",
                  display: "block",
                  resize: "vertical",
                }}
              />
            </Div>

            <Div>
              <DialogContentText sx={{ width: "100%", margin: "auto" }}>
                Rumusan Masalah
              </DialogContentText>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Enter Rumusan Masalah"
                style={{
                  width: "100%",
                  height: 108,
                  marginBottom: "25px",
                  display: "block",
                  resize: "vertical",
                }}
              />
            </Div>

            <Div>
              <DialogContentText sx={{ width: "100%", margin: "auto" }}>
                Tujuan Penelitian
              </DialogContentText>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Enter Tujuan"
                style={{
                  width: "100%",
                  height: 108,
                  marginBottom: "25px",
                  display: "block",
                  resize: "vertical",
                }}
              />
            </Div>

            <Div>
              <DialogContentText sx={{ width: "100%", margin: "auto" }}>
                Manfaat Penelitian
              </DialogContentText>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Enter Manfaat"
                style={{
                  width: "100%",
                  height: 108,
                  marginBottom: "25px",
                  display: "block",
                  resize: "vertical",
                }}
              />
            </Div>

            <Div>
              <DialogContentText sx={{ width: "100%", margin: "auto" }}>
                Cakupan Penelitian
              </DialogContentText>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Enter Cakupan"
                style={{
                  width: "100%",
                  height: 108,
                  marginBottom: "25px",
                  display: "block",
                  resize: "vertical",
                }}
              />
            </Div>

            <Div>
              <DialogContentText sx={{ width: "100%", margin: "auto" }}>
                Batasan Penelitian
              </DialogContentText>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Enter Batasan"
                style={{
                  width: "100%",
                  height: 108,
                  marginBottom: "25px",
                  display: "block",
                  resize: "vertical",
                }}
              />
            </Div>
            {/* TextArea End */}
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

export default DaftarMahasiswa;
