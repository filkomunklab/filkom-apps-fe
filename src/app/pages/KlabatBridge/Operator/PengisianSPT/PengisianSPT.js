import Div from "@jumbo/shared/Div";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  MenuItem,
  Button,
  Grid,
  Typography,
  Box,
  InputLabel,
  Paper,
  Stack,
  Form,
  Checkbox,
  FormGroup,
  InputAdornment,
  Divider,
  List,
  ListItem,
  ListItemText,
  Select,
  FormLabel,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
  TableCell,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { makeStyles } from "@mui/styles";
import ClearIcon from "@mui/icons-material/Clear";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";

const rows = [
  { id: 1, name: "Row 1", mk: "Robotics", sks: "3", keterangan: "Summer 2023" },
  {
    id: 2,
    name: "Row 2",
    mk: "Research Project 2",
    sks: "3",
    keterangan: "Summer 2023",
  },
  {
    id: 3,
    name: "Row 3",
    mk: "Machine Learning",
    sks: "3",
    keterangan: "Semester 1 2023/2024",
  },
  {
    id: 4,
    name: "Row 4",
    mk: "ITPM",
    sks: "3",
    keterangan: "Semester 1 2023/2024",
  },
  {
    id: 5,
    name: "Row 5",
    mk: "DevOps",
    sks: "3",
    keterangan: "Semester 1 2023/2024",
  },
  {
    id: 6,
    name: "Row 6",
    mk: "Internet of Things",
    sks: "3",
    keterangan: "Semester 1 2023/2024",
  },
  // Add more rows as needed
];

const faculties = [
  "ASMIK",
  "Fakultas Ekonomi dan Bisnis",
  "Fakultas Filsafat",
  "Fakultas Ilmu Komputer",
  "Fakultas Keguruan dan Ilmu Pendidikan",
  "Fakultas Keperawatan",
  "Fakultas Pertanian",
];

const majorsByFaculty = {
  ASMIK: ["Sekretaris"],
  "Fakultas Ekonomi dan Bisnis": ["Akuntansi", "Management"],
  "Fakultas Filsafat": ["Ilmu Filsafat"],
  "Fakultas Ilmu Komputer": [
    "Animasi dan Desain",
    "Informatika",
    "Sistem Informasi",
  ],
  "Fakultas Keguruan dan Ilmu Pendidikan": [
    "Pendidikan Agama",
    "Pendidikan Bahasa Inggris",
    "Pendidkan Ekonomi",
    "Pendidkan Luar Sekolah",
  ],
  "Fakultas Keperawatan": ["Ilmu Keperawatan"],
  "Fakultas Pertanian": ["Agroteknologi"],
};

const PengisianSPT = () => {
  // table
  const [data, setData] = useState(rows);

  const handleInputChange = (e, id, columnName) => {
    const updatedData = data.map((row) => {
      if (row.id === id) {
        return { ...row, [columnName]: e.target.value };
      }
      return row;
    });
    setData(updatedData);
  };

  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");

  const handleFacultyChange = (event) => {
    setSelectedFaculty(event.target.value);
    // Reset selected major when faculty changes
    setSelectedMajor("");
  };

  const handleMajorChange = (event) => {
    setSelectedMajor(event.target.value);
  };

  // alert dialog
  const [open, setOpen] = React.useState(false);

  // date picker
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // pdf upload
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf" && file.size <= 10485760) {
      setPdfFile(file);
    } else {
      alert("Please select a valid PDF file (max. 10MB).");
    }
  };

  const handleLinkClick = () => {
    // Handle link click event if needed
  };

  const handleDeletePdf = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setPdfFile(null);
  };

  return (
    <Box>
      <Typography mb={2} sx={{ fontSize: "24px", fontWeight: 500 }}>
        Surat Permohonan Tamat
      </Typography>
      <Box
        p={8}
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          boxShadow: 2,
        }}
      >
        <Typography variant="body1" sx={{ lineHeight: 2.5 }}>
          Saya yang bertanda tangan di bawah ini, bermohon untuk dapat wisuda
          pada semester 1 2022/2023 dengan sisa SKS yang harus diambil
          <span style={{ display: "inline-block", minWidth: "30px" }}>
            <TextField
              //   value={remainingSks}
              //   onChange={handleSksChange}
              type="number"
              variant="outlined"
              size="small"
              placeholder="23"
              sx={{ width: "70px", ml: "10px", marginRight: "10px" }}
            />
          </span>
          sks.
        </Typography>

        {/* input */}
        <Box mt={3}>
          <Grid container spacing={4}>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1" mb={1}>
                Nama sesuai ijazah
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="namaLengkap"
                placeholder="Aurelea Saerang"

                //   value={identityData.nim}
                //   onChange={handleIdentityChange}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1" mb={1}>
                No. Regis
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="noRegis"
                placeholder="1234567890"
                //   value={identityData.kodePT}
                //   onChange={handleIdentityChange}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1" mb={1}>
                Tanggal Lahir
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Select Date"
                  format="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item sm={12} md={6}>
              <FormControl>
                <Typography variant="subtitle1" mb={1}>
                  Gender
                </Typography>
                <RadioGroup row name="row-radio-buttons-group">
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1" mb={1}>
                Nomor Induk Kependudukan (NIK)
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="nik"
                type="number"
                placeholder="12345678910"
                //   value={identityData.nim}
                //   onChange={handleIdentityChange}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1" mb={1}>
                Nomor Induk Mahasiswa
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="nim"
                type="number"
                placeholder="12345678910"
                //   value={identityData.kodePT}
                //   onChange={handleIdentityChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" mb={1}>
                Fakultas
              </Typography>
              <Select
                fullWidth
                variant="outlined"
                name="faculty"
                value={selectedFaculty}
                onChange={handleFacultyChange}
              >
                <MenuItem value="" disabled>
                  Select Faculty
                </MenuItem>
                {faculties.map((faculty) => (
                  <MenuItem key={faculty} value={faculty}>
                    {faculty}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" mb={1}>
                Program Studi
              </Typography>
              <Select
                fullWidth
                variant="outlined"
                name="major"
                value={selectedMajor}
                onChange={handleMajorChange}
              >
                <MenuItem value="" disabled>
                  Select Major
                </MenuItem>
                {majorsByFaculty[selectedFaculty]?.map((major) => (
                  <MenuItem key={major} value={major}>
                    {major}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item sm={12} md={4}>
              <Typography variant="subtitle1" mb={1}>
                Minor/Konsentrasi
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="minor"
                placeholder="Web Developer"
                //   value={identityData.nim}
                //   onChange={handleIdentityChange}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1" mb={1}>
                Nama Ibu Kandung
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="namaLengkap"
                placeholder="Ariana Grande"
                //   value={identityData.nim}
                //   onChange={handleIdentityChange}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1" mb={1}>
                Phone Number
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="phoneNumber"
                placeholder="12345678910"
                type="number"
                //   value={identityData.nim}
                //   onChange={handleIdentityChange}
              />
            </Grid>
          </Grid>
        </Box>

        <Typography mt={5} sx={{ fontSize: "24px", fontWeight: 500 }}>
          Sisa mata kuliah yang harus diambil:
        </Typography>
        <Box sx={{ marginY: 2 }}>
          <TableContainer>
            <Table sx={{ border: "1px solid #ddd" }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ width: "10px" }}>No.</TableCell>
                  <TableCell sx={{ width: "300px" }}>Mata kuliah</TableCell>
                  <TableCell sx={{ width: "50px" }}>SKS</TableCell>
                  <TableCell sx={{ width: "400px" }}>Keterangan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <TextField
                        value={row.column2}
                        onChange={(e) =>
                          handleInputChange(e, row.id, "column2")
                        }
                        fullWidth
                        variant="standard"
                        sx={{
                          "& .MuiInputBase-root": { borderBottom: "none" },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.column3}
                        onChange={(e) =>
                          handleInputChange(e, row.id, "column3")
                        }
                        fullWidth
                        variant="standard"
                        sx={{
                          "& .MuiInputBase-root": { borderBottom: "none" },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.column4}
                        onChange={(e) =>
                          handleInputChange(e, row.id, "column4")
                        }
                        fullWidth
                        variant="standard"
                        sx={{
                          "& .MuiInputBase-root": { borderBottom: "none" },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Typography variant="body1" sx={{ lineHeight: 2.5 }}>
          Total SKS yang diambil:
          <span style={{ display: "inline-block", minWidth: "30px" }}>
            <TextField
              //   value={remainingSks}
              //   onChange={handleSksChange}
              type="number"
              variant="outlined"
              size="small"
              placeholder="23"
              sx={{ width: "70px", ml: "10px", marginRight: "10px" }}
            />
          </span>
          sks.
        </Typography>
        <Div
          sx={{
            // display: 'flex',
            // flexWrap: 'wrap',
            marginY: 2,

            "& > :not(style)": {
              width: 245,
              height: 130,
              //marginTop:'30px',
            },
          }}
        >
          <label htmlFor="pdf-upload-input">
            <Input
              accept=".pdf"
              type="file"
              id="pdf-upload-input"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            <Button
              variant="outlined"
              component="span"
              style={{
                width: "200px",
                height: "100px", // Adjust the height to accommodate the content
                display: "flex",
                flexDirection: "column", // Arrange items vertically
                alignItems: "center", // Center items horizontally
                justifyContent: "center", // Center items vertically
                padding: "5px", // Add padding to the button
                color: "#1C1B20",
                backgroundColor: "#F8F9FD",
                border: "1px solid #DCDCDC",
                "& .MuiSvgIcon-root": {
                  fontSize: 48, // Adjust the icon size
                },
                "&:hover": {
                  backgroundColor: "#7F91D9",
                  color: "white",
                },
              }}
            >
              <BackupOutlinedIcon sx={{ color: "#6B696B" }} /> {/* Icon */}
              <Typography
                variant="subtitle1"
                sx={{ fontSize: "12px", textTransform: "none" }}
              >
                Upload PDF File Sertifikasi
              </Typography>{" "}
              {/* Text and line breaks */}
              <Typography
                variant="subtitle1"
                sx={{ fontSize: "10px", textTransform: "none" }}
              >
                Max 10MB
              </Typography>{" "}
              {/* Text and line breaks */}
            </Button>
          </label>

          {pdfFile && (
            <Div
              sx={{
                position: "relative",
                fontSize: "15px",
                whiteSpace: "nowrap",
                marginTop: "10px", // Remove top margin
                marginBottom: "0", // Remove bottom margin
                paddingBottom: "0", // Remove bottom padding
              }}
            >
              <a
                href={URL.createObjectURL(pdfFile)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "blue",
                  margin: "0", // Remove margin
                  padding: "0", // Remove padding
                }}
              >
                <span style={{ marginRight: "10px" }}>{pdfFile.name}</span>
                <IconButton
                  sx={{
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  onClick={handleDeletePdf}
                  color="error"
                  aria-label="Delete PDF"
                >
                  <ClearIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </a>
            </Div>
          )}
          {/* <Paper elevation={3}/> */}
        </Div>
        <Divider sx={{ marginY: 3 }} />
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <FormControlLabel
              control={<Checkbox />}
              label="Saya telah mengisi data ini dengan benar dan tepat"
            />
          </Grid>
          <Grid item>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: "10px" }}
              >
                Batal
              </Button>
              {/* alert dialog */}
              <Div>
                <Button variant="contained" onClick={() => setOpen(true)}>
                  Submit
                </Button>

                <Dialog
                  open={open}
                  onClose={() => setOpen(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Submit data SPT?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Data yang telah di-submit tidak akan bisa diubah kembali
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => setOpen(false)} autoFocus>
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </Div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PengisianSPT;
