import Div from "@jumbo/shared/Div";
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
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
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import AttachmentIcon from "@mui/icons-material/Attachment";

const keywords = [
  "informatika",
  "repository",
  "manajemen",
  "pengembangan",
  // Tambahkan kata kunci lain di sini
];

const MetaDataRepository = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [penulisCount, setPenulisCount] = useState(1); // Awalnya satu input select
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const handleTambahPenulis = () => {
    if (penulisCount < 5) {
      setPenulisCount(penulisCount + 1);
    }
  };

  const handleKeywordChange = (event, newValue) => {
    setSelectedKeywords(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmSubmit = () => {
    // Lakukan pengiriman data di sini
    // Kemudian tutup dialog konfirmasi
    setOpenDialog(false);
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
          Metadata Repository
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
              Penulis
            </Typography>
            {/* Input select Nama penulis Start*/}
            <Div
              sx={{
                width: "100%",
                padding: "0 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "25px",
              }}
            >
              {Array.from({ length: penulisCount }).map((_, index) => (
                <div key={index}>
                  <FormControl style={{ m: 1, width: "100%" }} size="small">
                    <InputLabel id={`penulis-select-${index}`}>
                      Nama Penulis
                    </InputLabel>
                    <Select
                      labelId={`penulis-select-${index}`}
                      id={`penulis-select-${index}`}
                      label={`Nama Penulis ${index + 1}`}
                      fullWidth
                      style={{ marginBottom: "25px", width: "100%" }}
                    >
                      <MenuItem>Option 1</MenuItem>
                      <MenuItem>Option 2</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              ))}
              {penulisCount < 5 && ( // Tampilkan tombol hanya jika jumlah penulis kurang dari 5
                <Button
                  onClick={handleTambahPenulis}
                  style={{ fontSize: "12px", marginBottom: "25px" }}
                >
                  <AddIcon fontSize="small" />
                  Tambah Penulis
                </Button>
              )}
            </Div>
            {/* Input select Nama Penulis End */}
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
              Pembimbing
            </Typography>
            {/* Input Select Dosen Pembimbing Start */}
            <Div
              sx={{
                width: "100%",
                padding: "0 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "25px",
              }}
            >
              {/* Dosen Pembimbing Advisor */}
              <FormControl style={{ m: 1, width: "100%" }} size="small">
                <InputLabel id="Advisor">Advisor</InputLabel>
                <Select
                  labelId="Advisor"
                  id="Advisor"
                  label="Advisor"
                  fullWidth
                  style={{ marginBottom: "25px", width: "100%" }}
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
              {/* Dosen Pembimbing Co-Advisor 1 */}
              <FormControl style={{ m: 1, width: "100%" }} size="small">
                <InputLabel id="Co-Advisor1">Co-Advisor 1</InputLabel>
                <Select
                  labelId="Co-Advisor1"
                  id="Co-Advisor1"
                  label="Co-Advisor 1"
                  fullWidth
                  style={{ marginBottom: "25px", width: "100%" }}
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
              {/* Dosen Pembimbing Co-Advisor 2 */}
              <FormControl style={{ m: 1, width: "100%" }} size="small">
                <InputLabel id="Co-Advisor2">Co-Advisor 2</InputLabel>
                <Select
                  labelId="Co-Advisor2"
                  id="Co-Advisor2"
                  label="Co-Advisor 2"
                  fullWidth
                  style={{ marginBottom: "25px", width: "100%" }}
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
            {/* Input Select Dosen Pembimbing End */}
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
              Penelis
            </Typography>
            {/* Input Select Dosen Penelis Start */}
            <Div
              sx={{
                width: "100%",
                padding: "0 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "25px",
              }}
            >
              {/* Dosen Ketua Penelis */}
              <FormControl style={{ m: 1, width: "100%" }} size="small">
                <InputLabel id="KetuaPenelis">Ketua Penelis</InputLabel>
                <Select
                  labelId="KetuaPenelis"
                  id="KetuaPenelis"
                  label="Ketua Penelis"
                  fullWidth
                  style={{ marginBottom: "25px", width: "100%" }}
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
              {/* Dosen Penelis Anggota Penelis */}
              <FormControl style={{ m: 1, width: "100%" }} size="small">
                <InputLabel id="AnggotaPenelis">Anggota Penelis</InputLabel>
                <Select
                  labelId="AnggotaPenelis"
                  id="AnggotaPenelis"
                  label="Anggota Penelis"
                  fullWidth
                  style={{ marginBottom: "25px", width: "100%" }}
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
              {/* Dosen Penelis Advisor */}
              <FormControl style={{ m: 1, width: "100%" }} size="small">
                <InputLabel id="Advisor">Advisor</InputLabel>
                <Select
                  labelId="Advisor"
                  id="Advisor"
                  label="Advisor"
                  fullWidth
                  style={{ marginBottom: "25px", width: "100%" }}
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
            {/* Input Select Dosen Penelis End */}
            {/* Judul */}
            <Div sx={{ width: "100%" }}>
              <DialogContentText sx={{ width: "100%", margin: "auto" }}>
                Judul
              </DialogContentText>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Judul Penelitian"
                style={{
                  width: "100%",
                  display: "block",
                  resize: "vertical",
                }}
              />
            </Div>
            {/* kata kunci */}
            <Div sx={{ width: "100%" }}>
              <Autocomplete
                size="small"
                multiple
                id="keywords"
                options={keywords}
                freeSolo
                value={selectedKeywords}
                onChange={handleKeywordChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="kata kunci"
                    variant="outlined"
                    placeholder="Contoh: informatika, repository, manajemen"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      size="small"
                      label={option.toLowerCase()}
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />
            </Div>

            {/* Abstrak */}
            <Div sx={{ width: "100%" }}>
              <DialogContentText sx={{ width: "100%", margin: "auto" }}>
                Abstrak
              </DialogContentText>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Masukan Abstrak"
                style={{
                  width: "100%",
                  display: "block",
                  resize: "vertical",
                }}
              />
            </Div>
            <Div sx={{ width: "100%" }}>
              <DialogContentText sx={{ width: "100%", margin: "auto" }}>
                Referensi
              </DialogContentText>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Masukan Refrensi"
                style={{
                  width: "100%",
                  display: "block",
                  resize: "vertical",
                }}
              />
            </Div>
            <Div
              sx={{
                display: "flex",
                padding: "12px 24px 12px 0px",
                justifyContent: "flex-end",
                alignItems: "center",
                background: "#F5F5F5",
                width: "100%",
              }}
            >
              <Button
                size="small"
                variant="contained"
                sx={{ textTransform: "none" }}
                color="primary"
                onClick={handleOpenDialog}
              >
                Submit
              </Button>
            </Div>
          </Div>
          {/* Element 2 End */}
          {/* Dialog konfirmasi */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
                Submit Metadata
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Apakah Anda yakin semua data sudah benar?
              </DialogContentText>
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
                onClick={handleConfirmSubmit}
                variant="contained"
                sx={{ textTransform: "none" }}
                color="primary"
              >
                Ya
              </Button>
            </DialogActions>
          </Dialog>
        </Div>
      </Div>
    </Div>
  );
};

export default MetaDataRepository;
