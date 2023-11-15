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
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { format } from "date-fns";
import { makeStyles } from "@mui/styles";
import ClearIcon from "@mui/icons-material/Clear";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import axios from "axios";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

// const rows = [
//     { id: 1, name: 'Row 1', mk: 'Robotics', sks: '3', keterangan: 'Summer 2023' },
//     { id: 2, name: 'Row 2', mk: 'Research Project 2', sks: '3', keterangan: 'Summer 2023' },
//     { id: 3, name: 'Row 3', mk: 'Machine Learning', sks: '3', keterangan: 'Semester 1 2023/2024' },
//     { id: 4, name: 'Row 4', mk: 'ITPM', sks: '3', keterangan: 'Semester 1 2023/2024' },
//     { id: 5, name: 'Row 5', mk: 'DevOps', sks: '3', keterangan: 'Semester 1 2023/2024' },
//     { id: 6, name: 'Row 6', mk: 'Internet of Things', sks: '3', keterangan: 'Semester 1 2023/2024' },
//     // Add more rows as needed
//   ];

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
  // input SPT
  const [dataSPT, setDataSPT] = useState({
    // sisaSKS: "",
    nama: "",
    noRegis: "",
    // tglLahir: "",
    gender: "",
    nik: "",
    nim: "",
    fakultas: "",
    prodi: "",
    minor: "",
    ibuKandung: "",
    noTelp: "",
    email: "",
    rencanaTamat: "",
  });

  // const [data, setData] = useState([]);

  // const getData = async () => {
  //     await axios.post("http://localhost:2000/api/v1/spt/", {
  //         full_name: dataSPT.nama,
  //         reg_num: dataSPT.noRegis,
  //         date_of_birth: selectedDate,
  //         faculty: dataSPT.fakultas,
  //         gender: dataSPT.gender,
  //         major: dataSPT.prodi,
  //         nim: dataSPT.nim,
  //         phone_num: dataSPT.noTelp,
  //         nik: dataSPT.nik,
  //         birth_mother: dataSPT.ibuKandung,
  //         graduate_plan: dataSPT.rencanaTamat,
  //         minor: dataSPT.minor,
  //         remaining_credits: dataSPT.sisaSKS,
  //         remaining_classes: JSON.stringify(rows),
  //         // email: dataSPT.email,

  //         // approval_fac: dataSPT.approval_fac,
  //         // approval_reg: dataSPT.approval_reg,

  //     }).then((res) => {

  //     console.log(res.data.data);
  //     // setData(res.data.data);
  //     });
  // };

  // React.useEffect(() => {
  //     getData();
  // }, []);

  // handle onchange
  const handleDataSPT = (event) => {
    setDataSPT({
      ...dataSPT,
      [event.target.name]: event.target.value,
    });
  };

  // table
  const [rows, setRows] = useState([
    // initial data for rows, you can initialize it as per your requirements
    { subject: "", sks: "", keterangan: "" },
    { subject: "", sks: "", keterangan: "" },
    { subject: "", sks: "", keterangan: "" },
    { subject: "", sks: "", keterangan: "" },
    { subject: "", sks: "", keterangan: "" },
    { subject: "", sks: "", keterangan: "" },
    { subject: "", sks: "", keterangan: "" },
    { subject: "", sks: "", keterangan: "" },
  ]);

  const [totalSKS, setTotalSKS] = useState("");

  const handleInputChange = (e, id, column) => {
    const updatedRows = rows.map((row, index) => {
      if (index === id) {
        return { ...row, [column]: e.target.value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  // sum of total sks
  useEffect(() => {
    // Calculate the sum of column 3 whenever rows change
    const sum = rows.reduce((acc, row) => acc + parseFloat(row.sks || 0), 0);
    setTotalSKS(sum.toString());
  }, [rows]);

  // cek input data
  // useEffect(() => {
  //   console.log(dataSPT);
  // }, [dataSPT]);

  // const [data, setData] = useState(rows);

  // const handleInputChange = (e, id, columnName) => {
  //     const updatedData = data.map((row) => {
  //     if (row.id === id) {
  //         return { ...row, [columnName]: e.target.value };
  //     }
  //     return row;
  //     });
  //     setData(updatedData);
  // };

  // const [selectedFaculty, setSelectedFaculty] = useState('');
  // const [selectedMajor, setSelectedMajor] = useState('');

  // const handleFacultyChange = (event) => {
  //     setSelectedFaculty(event.target.value);
  //     // Reset selected major when faculty changes
  //     setSelectedMajor('');
  // };

  // const handleMajorChange = (event) => {
  //     setSelectedMajor(event.target.value);
  // };

  // alert dialog
  const [open, setOpen] = React.useState(false);

  // date picker
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (date) => {
    // const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
    const formattedDate = date ? format(date, "dd-MM-yyyy") : "";
    setSelectedDate(formattedDate);
  };


  // PDF FILE UPLOAD & CONVERT TO BASE64 STRING
  const [pdfFile, setPdfFile] = useState("");
  const [pdfBase64, setPdfBase64] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "application/pdf" && file.size <= 10485760) {
      // Read the file content and convert it to base64
      const reader = new FileReader();

      reader.onloadend = () => {
        setPdfFile(file);
        setPdfBase64(reader.result.split(',')[1]); // Extract base64 string
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid PDF file (max. 10MB).");
    }
  };

  // pdf upload
  // const [pdfFile, setPdfFile] = useState(null);

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file && file.type === "application/pdf" && file.size <= 10485760) {
  //     setPdfFile(file);
  //   } else {
  //     alert("Please select a valid PDF file (max. 10MB).");
  //   }
  // };

  // const handleLinkClick = () => {
  //   // Handle link click event if needed
  // };

  const handleDeletePdf = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setPdfFile(null);
  };

  // submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalized = {
      full_name: dataSPT.nama,
      reg_num: dataSPT.noRegis,
      date_of_birth: selectedDate,
      faculty: dataSPT.fakultas,
      gender: dataSPT.gender,
      major: dataSPT.prodi,
      nim: dataSPT.nim,
      phone_num: dataSPT.noTelp,
      nik: dataSPT.nik,
      birth_mother: dataSPT.ibuKandung,
      graduate_plan: dataSPT.rencanaTamat,
      minor: dataSPT.minor,
      personal_email: dataSPT.email,
      remaining_credits: totalSKS,
      remaining_classes: JSON.stringify(rows),
      certificateFile: {
        filename: pdfFile.name,
        buffer: pdfBase64,
      },
      studentId: dataSPT.nim,
    };
    console.log(normalized);
    try {
      console.log("trigger")
      const res = await jwtAuthAxios.post("/spt", normalized);
      console.log("success");
    } catch (e) {
      console.log(e);
      console.log('error')
    }
  };

  // see the remaining classes input
  console.log(rows);

  return (
    <Box>
      <Typography mb={2} sx={{ fontSize: "24px", fontWeight: 500 }}>
        Surat Permohonan Tamat
      </Typography>

      <Box
        p={5}
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          boxShadow: 2,
        }}
      >
        <Typography variant="body1" sx={{ lineHeight: 2.5, fontSize: "15px" }}>
          Saya yang bertanda tangan di bawah ini, bermohon untuk dapat wisuda
          pada
          <span style={{ display: "inline-block", minWidth: "50px" }}>
            <TextField
              // type="number"
              variant="outlined"
              size="small"
              placeholder="semester 1 2022/2023"
              sx={{ width: "180px", ml: "10px", marginRight: "10px" }}
              name="rencanaTamat"
              value={dataSPT.rencanaTamat}
              onChange={handleDataSPT}
            />
          </span>
          dengan sisa SKS yang harus diambil
          <span style={{ display: "inline-block", minWidth: "30px" }}>
            <TextField
              type="number"
              variant="outlined"
              size="small"
              placeholder="23"
              sx={{ width: "60px", ml: "10px", marginRight: "10px" }}
              name="sisaSKS"
              value={totalSKS}
              onChange={handleDataSPT}
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
                placeholder="Aurelea Saerang"
                name="nama"
                value={dataSPT.nama}
                onChange={handleDataSPT}
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
                value={dataSPT.noRegis}
                onChange={handleDataSPT}
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
                <RadioGroup
                  row
                  // name="row-radio-buttons-group"
                  name="gender"
                  placeholder="1234567890"
                  value={dataSPT.gender}
                  onChange={handleDataSPT}
                >
                  <FormControlLabel
                    value="FEMALE"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="MALE"
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
                value={dataSPT.nik}
                onChange={handleDataSPT}
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
                type="text"
                placeholder="12345678910"
                value={dataSPT.nim}
                onChange={handleDataSPT}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" mb={1}>
                Fakultas
              </Typography>
              <Select
                fullWidth
                variant="outlined"
                name="fakultas"
                value={dataSPT.fakultas}
                onChange={handleDataSPT}
              >
                <MenuItem value="" disabled>
                  Select Faculty
                </MenuItem>
                {faculties.map((fakultas) => (
                  <MenuItem key={fakultas} value={fakultas}>
                    {fakultas}
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
                name="prodi"
                value={dataSPT.prodi}
                onChange={handleDataSPT}
              >
                <MenuItem value="" disabled>
                  Select Major
                </MenuItem>
                {majorsByFaculty[dataSPT.fakultas]?.map((prodi) => (
                  <MenuItem key={prodi} value={prodi}>
                    {prodi}
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
                value={dataSPT.minor}
                onChange={handleDataSPT}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1" mb={1}>
                Nama Ibu Kandung
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="ibuKandung"
                placeholder="Ariana Grande"
                value={dataSPT.ibuKandung}
                onChange={handleDataSPT}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1" mb={1}>
                Phone Number
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="noTelp"
                placeholder="12345678910"
                type="number"
                value={dataSPT.noTelp}
                onChange={handleDataSPT}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1" mb={1}>
                Email
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="email"
                placeholder="serealsajow18@gmail.com"
                type="gmail"
                value={dataSPT.email}
                onChange={handleDataSPT}
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
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <TextField
                        value={row.subject}
                        onChange={(e) => handleInputChange(e, index, "subject")}
                        fullWidth
                        variant="standard"
                        sx={{
                          "& .MuiInputBase-root": { borderBottom: "none" },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.sks}
                        onChange={(e) => handleInputChange(e, index, "sks")}
                        fullWidth
                        variant="standard"
                        sx={{
                          "& .MuiInputBase-root": { borderBottom: "none" },
                        }}
                        type="number"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.keterangan}
                        onChange={(e) =>
                          handleInputChange(e, index, "keterangan")
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
            {/* <TextField
                                //   value={remainingSks}
                                //   onChange={handleSksChange}
                                type="number"
                                variant="outlined"
                                size="small"
                                placeholder='23'
                                sx={{ width: '70px', ml:"10px", marginRight:"10px" }}
                                /> */}
            <TextField
              value={totalSKS}
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: "70px", ml: "10px", marginRight: "10px" }}
              onChange={handleDataSPT}
            />
          </span>
          sks.
        </Typography>

        {/* UPLOAD PDF */}
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
                marginTop: "10px", 
                marginBottom: "0", 
                paddingBottom: "0", 
              }}
            >
              <a
                href={URL.createObjectURL(pdfFile)}
                target="_blank"
                rel="noopener noreferrer"
                // value={dataSPT.pdf}
                // onClick={handleLinkClick}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "blue",
                  margin: "0", 
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
        </Div>

        {/* Display the base64 string */}
        {/* <Div>
          <p>Base64 String:</p>
          <pre>{pdfBase64}</pre>
        </Div> */}


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
              {/* <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: "10px" }}
              >
                Batal
              </Button> */}
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
                    <Button
                      onClick={(e) => {
                        setOpen(false);
                        handleSubmit(e);
                      }}
                      autoFocus
                    >
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
