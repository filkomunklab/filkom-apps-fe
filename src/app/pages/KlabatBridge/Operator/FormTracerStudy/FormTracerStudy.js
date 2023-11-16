import React, { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
  FormLabel,
  TableCell,
  TableBody,
  TableRow,
  Table,
  TableContainer,
  TableHead,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { Link, useNavigate} from "react-router-dom";

const FormTracerStudy = () => {
  const navigate = useNavigate();
  //checkbox
  const [isChecked, setIsChecked] = useState(false);
  // const handleCheckboxChange = () => {
  //   setIsChecked((prevChecked) => !prevChecked);
  // };

  //for date pickers
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date || "");
  };

  const [identityData, setIdentityData] = useState({
    nim: "",
    kodePT: "161002",
    tahunLulus: "",
    kodeProdi: "",
    fullName: "",
    noTelp: "",
    email: "",
    nik: "",
    npwp: "",
  });

  const [questionnaireData, setQuestionnaireData] = useState({
    f8: "",
    f504: "",
    f502: "",
    f505: "",
    f506: "",
    f5a1: "",
    f5a2: "",
    f1101: "",
    f1102: "",
    f5b: "",
    f5c: "",
    f5d: "",
    f18a: "",
    f18b: "",
    f18c: "",
    f18d: "",
    f1201: "",
    f1202: "",
    f14: "",
    f15: "",
    f1761: "",
    f1762: "",
    f1763: "",
    f1764: "",
    f1765: "",
    f1766: "",
    f1767: "",
    f1768: "",
    f1769: "",
    f1770: "",
    f1771: "",
    f1772: "",
    f1773: "",
    f1774: "",
    f21: "",
    f22: "",
    f23: "",
    f24: "",
    f25: "",
    f26: "",
    f27: "",
    f301: "",
    f302: "",
    f303: "",
    f401: "0",
    f402: "0",
    f403: "0",
    f404: "0",
    f405: "0",
    f406: "0",
    f407: "0",
    f408: "0",
    f409: "0",
    f410: "0",
    f411: "0",
    f412: "0",
    f413: "0",
    f414: "0",
    f415: "0",
    f416: "",
    f6: "",
    f7: "",
    f7a: "",
    f1001: "",
    f1002: "",
    f1601: "0",
    f1602: "0",
    f1603: "0",
    f1604: "0",
    f1605: "0",
    f1606: "0",
    f1607: "0",
    f1608: "0",
    f1609: "0",
    f1610: "0",
    f1611: "0",
    f1612: "0",
    f1613: "0",
    f1614: "",
  });

  // no. 1
  // const [question1Response, setQuestion1Response] = useState('');

  //no. 3
  const provinces = [
    "Aceh",
    "Sumatera Utara",
    "Sumatera Selatan",
    "Sumatera Barat",
    "Bengkulu",
    "Riau",
    "Kepulauan Riau",
    "Jambi",
    "Lampung",
    "Bangka Belitung",
    "Kalimantan Barat",
    "Kalimantan Timur",
    "Kalimantan Selatan",
    "Kalimat Tengah",
    "Kalimantan Utara",
    "Banten",
    "DKI Jakarta",
    "Jawa Barat",
    "Jawa Tengah",
    "Daerah Istimewa Yogyakarta",
    "Jawa Timur",
    "Bali",
    "Nusa Tenggara Timur",
    "Nusa Tenggara Barat",
    "Gorontalo",
    "Sulawesi Barat",
    "Sulawesi Tengah",
    "Sulawesi Utara",
    "Sulawesi Tenggara",
    "Sulawesi Selatan",
    "Maluku Utara",
    "Maluku",
    "Papua Barat",
    "Papua",
    "Papua Selatan",
    "Papua Tengah",
    "Papua Pegunungan",
    "Papua Barat Daya",
  ];

  const citiesByProvince = {
    Aceh: ["Banda Aceh", "Langsa", "Lhokseumawe", "Sabang", "Subulussalam"],
    "Sumatera Utara": [
      "Binjai",
      "Gunungsitoli",
      "Medan",
      "Padangsidimpuan",
      "Pematangsiantar",
      "Sibolga",
      "Tanjungbalai",
      "Tebing Tinggi",
    ],
    "Sumatera Selatan": [
      "Lubuklinggau",
      "Pagar Alam",
      "Palembang",
      "Prabumulih",
    ],
    "Sumatera Barat": [
      "Bukittinggi",
      "Padang",
      "Padang Panjang",
      "Pariaman",
      "Payakumbuh",
      "Sawahlunto",
      "Solok",
    ],
    Bengkulu: ["Bengkulu"],
    Riau: ["Dumai", "Pekanbaru"],
    "Kepulauan Riau": ["Batam", "Tanjungpinang"],
    Jambi: ["Sungai Penuh", "Jambi"],
    Lampung: ["Bandar Lampung", "Metro"],
    "Bangka Belitung": ["Pangkalpinang"],
    "Kalimantan Barat": ["Pontianak", "Singkawang"],
    "Kalimantan Timur": ["Balikpapan", "Bontang", "Samarinda", "Nusantara"],
    "Kalimantan Selatan": ["Banjarbaru", "Banjarmasin"],
    "Kalimat Tengah": ["Palangka Raya"],
    "Kalimantan Utara": ["Tarakan"],
    Banten: ["Cilegon", "Serang", "Tangerang Selatan", "Tangerang"],
    "DKI Jakarta": [
      "Kota Administrasi Jakarta Barat",
      "Kota Administrasi Jakarta Pusat",
      "Kota Administrasi Jakarta Selatan",
      "Kota Administrasi Jakarta Timur",
      "Kota Administrasi Jakarta Utara",
    ],
    "Jawa Barat": [
      "Bandung",
      "Bekasi",
      "Bogor",
      "Cimahi",
      "Cirebon",
      "Depok",
      "Sukabumi",
      "Tasikmalaya",
      "Banjar",
    ],
    "Jawa Tengah": [
      "Magelang",
      "Pekalongan",
      "Salatiga",
      "	Semarang",
      "Surakarta",
      "Tegal",
    ],
    "Daerah Istimewa Yogyakarta": ["Yogyakarta"],
    "Jawa Timur": [
      "Batu",
      "Blitar",
      "Kediri",
      "Madiun",
      "Malang",
      "	Mojokerto",
      "Pasuruan",
      "Probolinggo",
      "Surabaya",
    ],
    Bali: ["Denpasar"],
    "Nusa Tenggara Timur": ["Kupang"],
    "Nusa Tenggara Barat": ["Bima", "Mataram"],
    Gorontalo: ["Gorontalo"],
    "Sulawesi Barat": [
      "Kabupaten Majene",
      "	Kabupaten Mamasa",
      "Kabupaten Mamuju",
      "Kabupaten Mamuju Tengah",
      "	Kabupaten Pasangkayu",
      "Kabupaten Polewali Mandar",
    ],
    "Sulawesi Tengah": ["Palu"],
    "Sulawesi Utara": ["Bitung", "Kotamobagu", "Manado", "Tomohon"],
    "Sulawesi Tenggara": ["	Baubau", "Kendari"],
    "Sulawesi Selatan": ["Makassar", "Palopo", "Parepare"],
    "Maluku Utara": ["Ternate", "Tidore Kepulauan"],
    Maluku: ["Ambon", "Tual"],
    "Papua Barat": [""],
    Papua: ["Jayapura"],
    "Papua Selatan": [
      "Kabupaten Asmat",
      "Kabupaten Boven Digoel",
      "	Kabupaten Mappi",
      "Kabupaten Merauke",
    ],
    "Papua Tengah": [
      "Kabupaten Deiyai",
      "Kabupaten Dogiyai",
      "Kabupaten Intan Jaya",
      "Kabupaten Mimika",
      "	Kabupaten Nabire",
      "Kabupaten Paniai",
      "Kabupaten Puncak",
      "	Kabupaten Puncak Jaya",
    ],
    "Papua Pegunungan": [
      "Kabupaten Jayawijaya",
      "Kabupaten Lanny Jaya",
      "Kabupaten Mamberamo Tengah",
      "Kabupaten Nduga",
      "	Kabupaten Pegunungan Bintang",
      "Kabupaten Tolikara",
      "Kabupaten Yalimo",
      "Kabupaten Yahukimo",
    ],
    "Papua Barat Daya": ["Sorong"],
  };

  const handleIdentityChange = (event) => {
    setIdentityData({
      ...identityData,
      [event.target.name]: event.target.value,
    });
  };

  // const handleQuestionnaireChange = (event) => {
  //   setQuestionnaireData({
  //     ...questionnaireData,
  //     [event.target.name]: event.target.value,
  //   });

  // };

  // Error statement
  const [error, setError] = useState("");

  const handleCheckboxChange = (name) => (event) => {
    const newValue = event.target.checked ? "1" : "0";
    setQuestionnaireData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleQuestionnaireChange = (event) => {
    const { name, value } = event.target;

    // Update the state for the changed field
    setQuestionnaireData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // no.4 -- Reset the text field value if the user selects an option other than '5'
    if (name === "f1101" && value !== "5") {
      // Set f1102 to an empty string to clear the text field value
      setQuestionnaireData((prevData) => ({
        ...prevData,
        f1102: "",
      }));
    }

    // no.9 -- Reset the text field value if the user selects an option other than '5'
    if (name === "f1201" && value !== "7") {
      // Set f1202 to an empty string to clear the text field value
      setQuestionnaireData((prevData) => ({
        ...prevData,
        f1202: "",
      }));
    }

    // no.14 -- Reset the text field value if the user selects an option other than '5'
    if (name === "f301" && value !== "1") {
      // Set f1202 to an empty string to clear the text field value
      setQuestionnaireData((prevData) => ({
        ...prevData,
        f302: "",
      }));
    }

    if (name === "f301" && value !== "2") {
      // Set f1202 to an empty string to clear the text field value
      setQuestionnaireData((prevData) => ({
        ...prevData,
        f303: "",
      }));
    }

    //no. 19
    if (name === "f1001" && value !== "5") {
      // Set f1202 to an empty string to clear the text field value
      setQuestionnaireData((prevData) => ({
        ...prevData,
        f1002: "",
      }));
    }

    // no. 15 -- checkbox
    if (name === "f415" && value === "0") {
      // Set f1202 to an empty string to clear the text field value
      setQuestionnaireData((prevData) => ({
        ...prevData,
        f4016: "",
      }));
    }
  };

  // // cek input data
  // useEffect(() => {
  // console.log(questionnaireData)
  //  }, [questionnaireData])

  // checkbox
  // const handleCheckbox = (event) => {
  //   setQuestionnaireData({
  //     ...questionnaireData,
  //     [event.target.name]: event.target.checked,
  //   })
  // }

  const handleCheckbox = (event) => {
    const { checked } = event.target;
    const newValue = checked ? "1" : "0";
    setQuestionnaireData((prevData) => ({
      ...prevData,
      f401: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/klabat-bridge/home-alumni", { 
      state: { 
        buttonColor: '#B1FFA5', 
        formSubmitted: true,
        buttonText: 'Anda telah mengisi form Tracer Study',
      } 
    });

    const normalized = {
      kdptimsmh: identityData.kodePT,
      kdpstmsmh: identityData.kodeProdi,
      nimhsmsmh: identityData.nim,
      nmmhsmsmh: identityData.fullName,
      telpomsmh: identityData.noTelp,
      emailmsmh: identityData.email,
      tahun_lulus: identityData.tahunLulus,
      nik: identityData.nik,
      npwp: identityData.npwp,
      f8: questionnaireData.f8,
      f504: questionnaireData.f504,
      f502: questionnaireData.f502,
      f505: questionnaireData.f505,
      f506: questionnaireData.f506,
      f5a1: questionnaireData.f5a1,
      f5a2: questionnaireData.f5a2,
      f1101: questionnaireData.f1101,
      f1102: questionnaireData.f1102,
      f5b: questionnaireData.f5b,
      f5c: questionnaireData.f5c,
      f5d: questionnaireData.f5d,
      f18a: questionnaireData.f18a,
      f18b: questionnaireData.f18b,
      f18c: questionnaireData.f18c,
      f18d: selectedDate,
      f1201: questionnaireData.f1201,
      f1202: questionnaireData.f1202,
      f14: questionnaireData.f14,
      f15: questionnaireData.f15,
      f1761: questionnaireData.f1761,
      f1762: questionnaireData.f1762,
      f1763: questionnaireData.f1763,
      f1764: questionnaireData.f1764,
      f1765: questionnaireData.f1765,
      f1766: questionnaireData.f1766,
      f1767: questionnaireData.f1767,
      f1768: questionnaireData.f1768,
      f1769: questionnaireData.f1769,
      f1770: questionnaireData.f1770,
      f1771: questionnaireData.f1771,
      f1772: questionnaireData.f1772,
      f1773: questionnaireData.f1773,
      f1774: questionnaireData.f1774,
      f21: questionnaireData.f21,
      f22: questionnaireData.f22,
      f23: questionnaireData.f23,
      f24: questionnaireData.f24,
      f25: questionnaireData.f25,
      f26: questionnaireData.f26,
      f27: questionnaireData.f27,
      f301: questionnaireData.f301,
      f302: questionnaireData.f302,
      f303: questionnaireData.f303,
      f401: questionnaireData.f401,
      f402: questionnaireData.f402,
      f403: questionnaireData.f403,
      f404: questionnaireData.f404,
      f405: questionnaireData.f405,
      f406: questionnaireData.f406,
      f407: questionnaireData.f407,
      f408: questionnaireData.f408,
      f409: questionnaireData.f409,
      f410: questionnaireData.f410,
      f411: questionnaireData.f411,
      f412: questionnaireData.f412,
      f413: questionnaireData.f413,
      f414: questionnaireData.f414,
      f415: questionnaireData.f415,
      f416: questionnaireData.f416,
      f6: questionnaireData.f6,
      f7: questionnaireData.f7,
      f7a: questionnaireData.f7a,
      f1001: questionnaireData.f1001,
      f1002: questionnaireData.f1002,
      f1601: questionnaireData.f1601,
      f1602: questionnaireData.f1602,
      f1603: questionnaireData.f1603,
      f1604: questionnaireData.f1604,
      f1605: questionnaireData.f1605,
      f1606: questionnaireData.f1606,
      f1607: questionnaireData.f1607,
      f1608: questionnaireData.f1608,
      f1609: questionnaireData.f1609,
      f1610: questionnaireData.f1610,
      f1611: questionnaireData.f1611,
      f1612: questionnaireData.f1612,
      f1613: questionnaireData.f1613,
      f1614: questionnaireData.f1614,
      studentId: identityData.nim,
    };
    console.log(normalized);
    try {
      const res = await jwtAuthAxios.post("/tracer-study/", normalized);
      console.log("success", res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  // send button (after filling the form)
  const [open, setOpen] = React.useState(false);

  return (
    <Div>
      <Box>
        <Typography mb={2} sx={{ fontSize: "24px", fontWeight: 500 }}>
          Tracer Study Form
        </Typography>
        <Box
          p={5}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            boxShadow: 2,
          }}
        >
          {/* Identity Details */}
          <Typography mb={3} variant="h2">
            Identitas Diri
          </Typography>
          <Grid container spacing={4}>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1">
                Nomor Induk Mahasiswa (NIM)
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                name="nim"
                placeholder="12345678910"
                value={identityData.nim}
                onChange={handleIdentityChange}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1">Kode Perguruan Tinggi</Typography>
              <TextField
                fullWidth
                disabled
                variant="outlined"
                name="kodePT"
                placeholder="UNKLAB: 161002"
                value={identityData.kodePT}
                onChange={handleIdentityChange}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1">Tahun Lulus</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                name="tahunLulus"
                placeholder="2020"
                value={identityData.tahunLulus}
                onChange={handleIdentityChange}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1">Kode Program Studi</Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="kodeProdi"
                placeholder="12345678910"
                value={identityData.kodeProdi}
                onChange={handleIdentityChange}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1">Full Name</Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="fullName"
                placeholder="Angel Triany Pangkey"
                value={identityData.fullName}
                onChange={handleIdentityChange}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1">Nomor Telepon</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                name="noTelp"
                placeholder="+6281712394395"
                value={identityData.noTelp}
                onChange={handleIdentityChange}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1">Alamat Email</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="email"
                name="email"
                placeholder="angelpangkey@gmail.com"
                value={identityData.email}
                onChange={handleIdentityChange}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1">
                Nomor Induk Kependudukan (NIK)
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                name="nik"
                placeholder="12345678910"
                value={identityData.nik}
                onChange={handleIdentityChange}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle1">NPWP</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                name="npwp"
                placeholder="12345678910"
                value={identityData.npwp}
                onChange={handleIdentityChange}
              />
            </Grid>
          </Grid>

          {/* Questionnaire */}
          <Typography
            variant="h2"
            style={{ marginBottom: "16px", marginTop: "75px" }}
          >
            Questionnaire
          </Typography>
          <Grid container spacing={4}>
            {/* no.1 */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1">
                  1. Jelaskan status Anda saat ini?
                </Typography>
                <RadioGroup
                  name="f8"
                  value={questionnaireData.f8}
                  onChange={handleQuestionnaireChange}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Bekerja (full time / part time)"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Belum memungkinkan bekerja"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Wiraswasta"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="Melanjutkan Pendidikan"
                  />
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label="Tidak kerja tetapi sedang mencari kerja"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* no.2 */}
            <Grid
              item
              xs={12}
              hidden={
                questionnaireData.f8 === "4" ||
                questionnaireData.f8 === "2" ||
                questionnaireData.f8 === "5"
                  ? true
                  : false
              }
            >
              <FormControl component="fieldset">
                <Typography variant="subtitle1">
                  2. Apakah Anda telah mendapatkan pekerjaan &lt;= 6 bulan /
                  termasuk bekerja sebelum lulus?
                </Typography>
                <RadioGroup
                  row
                  name="f504"
                  value={questionnaireData.f504}
                  onChange={handleQuestionnaireChange}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Ya" />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Tidak"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid
              item
              md={6}
              hidden={
                questionnaireData.f8 === "4" ||
                questionnaireData.f8 === "2" ||
                questionnaireData.f8 === "5" 
                  ? true
                  : false
              }
            >
              <Typography variant="subtitle3">
                Dalam berapa bulan Anda mendapatkan pekerjaan?
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="f502"
                type="number"
                value={questionnaireData.f502}
                onChange={handleQuestionnaireChange}
              />
            </Grid>
            <Grid
              item
              md={6}
              hidden={
                questionnaireData.f8 === "4" ||
                questionnaireData.f8 === "2" ||
                questionnaireData.f8 === "5" 
                  ? true
                  : false
              }
            >
              <Typography variant="subtitle3">
                Berapa rata-rata pendapatan Anda per bulan (take home pay)?
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="f505"
                type="number"
                value={questionnaireData.f505}
                onChange={handleQuestionnaireChange}
              />
            </Grid>
            {/* no.3 */}
            <Grid
              item
              xs={12}
              hidden={
                questionnaireData.f8 === "4" ||
                questionnaireData.f8 === "2" ||
                questionnaireData.f8 === "5"
                  ? true
                  : false
              }
            >
              <Typography variant="subtitle1" style={{ marginBottom: "14px" }}>
                3. Di mana lokasi tempat Anda bekerja
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle3">Provinsi</Typography>
                  <Select
                    fullWidth
                    variant="outlined"
                    name="f5a1"
                    value={questionnaireData.f5a1}
                    onChange={handleQuestionnaireChange}
                  >
                    <MenuItem value="" disabled>
                      Select Province
                    </MenuItem>
                    {provinces.map((f5a1) => (
                      <MenuItem key={f5a1} value={f5a1}>
                        {f5a1}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle3">Kabupaten/Kota</Typography>
                  <Select
                    fullWidth
                    variant="outlined"
                    name="f5a2"
                    value={questionnaireData.f5a2}
                    onChange={handleQuestionnaireChange}
                  >
                    <MenuItem value="">Select City</MenuItem>
                    {citiesByProvince[questionnaireData.f5a1]?.map((f5a2) => (
                      <MenuItem key={f5a2} value={f5a2}>
                        {f5a2}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>

            {/* no.4 */}
            <Grid item container xs={12} spacing={4}>
              {/* FIX: CONNECT TEXTFIELD TO RADIO OPTION */}
              <Grid
                item
                md={12}
                hidden={
                  questionnaireData.f8 === "4" ||
                  questionnaireData.f8 === "2" ||
                  questionnaireData.f8 === "5"
                    ? true
                    : false
                }
              >
                <FormControl component="fieldset">
                  <Typography variant="subtitle1">
                    4. Apa jenis perusahaan/intansi/institusi tempat anda
                    bekerja sekarang?
                  </Typography>
                  <RadioGroup
                    name="f1101"
                    value={questionnaireData.f1101}
                    onChange={handleQuestionnaireChange}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Instansi pemerintah"
                    />
                    <FormControlLabel
                      value="6"
                      control={<Radio />}
                      label="BUMN/BUMD"
                    />
                    <FormControlLabel
                      value="7"
                      control={<Radio />}
                      label="Institusi/Organisasi Multilateral"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="Organisasi non-profit/Lembaga Swadaya Masyarakat"
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label="Perusahaan swasta"
                    />
                    <FormControlLabel
                      value="4"
                      control={<Radio />}
                      label="Wiraswasta/perusahaan sendiri"
                    />
                    <FormControlLabel
                      value="5"
                      control={<Radio />}
                      label="Lainnya, tuliskan"
                    />
                  </RadioGroup>

                  <Grid item md={6}>
                    {/* fix: hubungin ke radio button */}
                    {questionnaireData.f1101 === "5" && (
                      <TextField
                        fullwidth
                        // label="Text Field"
                        variant="outlined"
                        placeholder="lainnya"
                        name="f1102"
                        value={questionnaireData.f1102}
                        onChange={handleQuestionnaireChange}
                      />
                    )}
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>

            {/* no.5 */}
            <Grid item container xs={12} spacing={4}>
              <Grid
                item
                xs={12}
                md={6}
                hidden={
                  questionnaireData.f8 === "4" ||
                  questionnaireData.f8 === "2" ||
                  questionnaireData.f8 === "5"
                    ? true
                    : false
                }
              >
                <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
                  5. Apa nama perusahaan/kantor tempat Anda bekerja?
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="PT Tekno Klabat"
                  name="f5b"
                  value={questionnaireData.f5b}
                  onChange={handleQuestionnaireChange}
                />
              </Grid>
            </Grid>

            {/* no.6 */}
            <Grid
              item
              xs={12}
              hidden={
                questionnaireData.f8 === "1" ||
                questionnaireData.f8 === "4" ||
                questionnaireData.f8 === "2" ||
                questionnaireData.f8 === "5"
                  ? true
                  : false
              }
            >
              <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
                6. Bila berwiraswasta, apa posisi/jabatan Anda saat ini?
                (Apabila 1 Menjawab [3] wiraswasta)
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Silahkan Pilih
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={questionnaireData.f5c}
                      label="Silahkan Pilih"
                      name="f5c"
                      onChange={handleQuestionnaireChange}
                    >
                      <MenuItem value={1}>Founder</MenuItem>
                      <MenuItem value={2}>Co-Founder</MenuItem>
                      <MenuItem value={3}>Staff</MenuItem>
                      <MenuItem value={4}>Freelance/Kerja Lepas</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* no.7 */}
            <Grid
              item
              xs={12}
              hidden={
                questionnaireData.f8 === "4" ||
                questionnaireData.f8 === "2" ||
                questionnaireData.f8 === "5"
                  ? true
                  : false
              }
            >
              <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
                7. Apa tingkat tempat kerja Anda?
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Silahkan Pilih
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={questionnaireData.f5d}
                      label="Silahkan Pilih"
                      name="f5d"
                      onChange={handleQuestionnaireChange}
                    >
                      <MenuItem
                        value={"Lokal/Wilayah/Wiraswasta/tidak berbadan hukum"}
                      >
                        Lokal/Wilayah/Wiraswasta/tidak berbadan hukum
                      </MenuItem>
                      <MenuItem value={"Nasional/Wiraswasta berbadan hukum"}>
                        Nasional/Wiraswasta berbadan hukum
                      </MenuItem>
                      <MenuItem value={"Mulitnasional/Internasional"}>
                        Mulitnasional/Internasional
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* no.8 */}
            <Grid
              item
              xs={12}
              hidden={
                questionnaireData.f8 === "1" ||
                questionnaireData.f8 === "3" ||
                questionnaireData.f8 === "2" ||
                questionnaireData.f8 === "5"
                  ? true
                  : false
              }
            >
              <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
                8. Pertanyaan studi lanjut
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography mb={1}>Sumber biaya</Typography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Silahkan Pilih
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Silahkan Pilih"
                      name="f18a"
                      value={questionnaireData.f18a}
                      onChange={handleQuestionnaireChange}
                    >
                      <MenuItem value={"Biaya Sendiri"}>Biaya Sendiri</MenuItem>
                      <MenuItem value={"Beasiswa"}>Beasiswa</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography mb={1}>Perguruan Tinggi</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="f18b"
                    placeholder="Universitas Klabat"
                    value={questionnaireData.f18b}
                    onChange={handleQuestionnaireChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography mb={1}>Program Studi</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="f18c"
                    placeholder="Informatika"
                    value={questionnaireData.f18c}
                    onChange={handleQuestionnaireChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography mb={1}>Tanggal Masuk</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Select Date"
                      format="dd/MM/yyyy"
                      value={selectedDate}
                      // onChange={(event, newValue) => setValue(newValue)}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} />}
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>

            {/* no.9 */}
            <Grid item container xs={12} spacing={4}>
              <Grid
                item
                md={12}
                hidden={
                  questionnaireData.f8 === "4" ||
                  questionnaireData.f8 === "2" ||
                  questionnaireData.f8 === "5"
                    ? true
                    : false
                }
              >
                <FormControl component="fieldset">
                  <Typography variant="subtitle1">
                    9. Sebutkan sumberdana dalam pembiayaan kuliah? * (bukan
                    ketika Studi Lanjut)
                  </Typography>
                  <RadioGroup
                    name="f1201"
                    value={questionnaireData.f1201}
                    onChange={handleQuestionnaireChange}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Biaya Sendiri/Keluarga"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="Beasiswa ADIK"
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label="Beasiswa BIDIKMISI"
                    />
                    <FormControlLabel
                      value="4"
                      control={<Radio />}
                      label="Beasiswa PPA"
                    />
                    <FormControlLabel
                      value="5"
                      control={<Radio />}
                      label="Beasiswa AFIRMASI"
                    />
                    <FormControlLabel
                      value="6"
                      control={<Radio />}
                      label="Beasiswa Perusahaan/Swasta"
                    />
                    <FormControlLabel
                      value="7"
                      control={<Radio />}
                      label="Lainnya, tuliskan"
                    />
                  </RadioGroup>
                  <Grid item md={6}>
                    {questionnaireData.f1201 === "7" && (
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="lainnya"
                        variant="outlined"
                        name="f1202"
                        value={questionnaireData.f1202}
                        onChange={handleQuestionnaireChange}
                      />
                    )}
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>

            {/* no.10 */}
            <Grid
              item
              xs={12}
              hidden={
                questionnaireData.f8 === "4" ||
                questionnaireData.f8 === "2" ||
                questionnaireData.f8 === "5"
                  ? true
                  : false
              }
            >
              <FormControl component="fieldset">
                {/* <FormLabel component="legend">Answer the first question</FormLabel> */}
                <Typography variant="subtitle1">
                  10. Seberapa erat hubungan bidang studi dengan pekerjaan Anda?
                  *
                </Typography>
                <RadioGroup
                  // aria-label="answer"
                  name="f14"
                  value={questionnaireData.f14}
                  onChange={handleQuestionnaireChange}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Sangat Erat"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Erat"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Cukup Erat"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="Kurang Erat"
                  />
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label="Tidak Sama Sekali"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* no.11 */}
            <Grid
              item
              xs={12}
              hidden={
                questionnaireData.f8 === "4" ||
                questionnaireData.f8 === "2" ||
                questionnaireData.f8 === "5"
                  ? true
                  : false
              }
            >
              <FormControl component="fieldset">
                {/* <FormLabel component="legend">Answer the first question</FormLabel> */}
                <Typography variant="subtitle1">
                  11. Tingkat pendidikan apa yang paling tepat/sesuai untuk
                  pekerjaan anda saat ini? *
                </Typography>
                <RadioGroup
                  // aria-label="answer"
                  name="f15"
                  value={questionnaireData.f15}
                  onChange={handleQuestionnaireChange}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Setingkat Lebih Tinggi"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Setingkat yang Sama"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Setingkat Lebih Rendah"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="Tidak Perlu Pendidikan Tinggi"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* no.12 */}
            <Grid
              item
              xs={12}
              hidden={
                questionnaireData.f8 === "2" || questionnaireData.f8 === "5"
                  ? true
                  : false
              }
            >
              <Typography variant="subtitle1">
                12. Pada saat lulus, pada tingkat mana kompetensi di bawah ini
                anda : kuasai? (A) Pada saat ini, pada tingkat mana kompetensi
                di bawah ini diperlukan dalam pekerjaan? (B)*
              </Typography>
              <TableContainer sx={{ marginY: 2 }}>
                <Table
                  aria-label="simple table"
                  //sx={{ border: "1px solid #ddd" }}
                >
                  <TableHead>
                    <TableRow
                    //sx={{backgroundColor: "#f5f5f5"}}
                    >
                      <TableCell style={{ width: "450px" }}>A</TableCell>
                      <TableCell style={{ width: "100px" }}></TableCell>
                      <TableCell style={{ width: "450px" }}>B</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Grid container justifyContent="space-between">
                          <Grid item>
                            <Typography>Sangat Rendah</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>Sangat Tinggi</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <Grid container justifyContent="space-between">
                          <Grid item>
                            <Typography>Sangat Rendah</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>Sangat Tinggi</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* 1st row */}
                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%", // Ensure the Box takes full height of the TableCell
                          }}
                        >
                          {/* Your component here */}
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="f1761"
                              value={questionnaireData.f1761}
                              onChange={handleQuestionnaireChange}
                            >
                              <FormControlLabel
                                value="1"
                                control={<Radio size="small" />}
                                label="1"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio size="small" />}
                                label="2"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio size="small" />}
                                label="3"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio size="small" />}
                                label="4"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio size="small" />}
                                label="5"
                                labelPlacement="bottom"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            textAlign: "center", // Center align text inside TableCell
                          }}
                        >
                          Etika
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          {/* Your component here */}
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="f1762"
                              value={questionnaireData.f1762}
                              onChange={handleQuestionnaireChange}
                            >
                              <FormControlLabel
                                value="1"
                                control={<Radio size="small" />}
                                label="1"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio size="small" />}
                                label="2"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio size="small" />}
                                label="3"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio size="small" />}
                                label="4"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio size="small" />}
                                label="5"
                                labelPlacement="bottom"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </TableCell>
                    </TableRow>
                    {/* 2nd row */}
                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%", // Ensure the Box takes full height of the TableCell
                          }}
                        >
                          {/* Your component here */}
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="f1763"
                              value={questionnaireData.f1763}
                              onChange={handleQuestionnaireChange}
                            >
                              <FormControlLabel
                                value="1"
                                control={<Radio size="small" />}
                                label="1"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio size="small" />}
                                label="2"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio size="small" />}
                                label="3"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio size="small" />}
                                label="4"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio size="small" />}
                                label="5"
                                labelPlacement="bottom"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            textAlign: "center", // Center align text inside TableCell
                          }}
                        >
                          Keahlian berdasarkan bidang ilmu
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          {/* Your component here */}
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="f1764"
                              value={questionnaireData.f1764}
                              onChange={handleQuestionnaireChange}
                            >
                              <FormControlLabel
                                value="1"
                                control={<Radio size="small" />}
                                label="1"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio size="small" />}
                                label="2"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio size="small" />}
                                label="3"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio size="small" />}
                                label="4"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio size="small" />}
                                label="5"
                                labelPlacement="bottom"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </TableCell>
                    </TableRow>
                    {/* 3rd row */}
                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%", // Ensure the Box takes full height of the TableCell
                          }}
                        >
                          {/* Your component here */}
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="f1765"
                              value={questionnaireData.f1765}
                              onChange={handleQuestionnaireChange}
                            >
                              <FormControlLabel
                                value="1"
                                control={<Radio size="small" />}
                                label="1"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio size="small" />}
                                label="2"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio size="small" />}
                                label="3"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio size="small" />}
                                label="4"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio size="small" />}
                                label="5"
                                labelPlacement="bottom"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            textAlign: "center", // Center align text inside TableCell
                          }}
                        >
                          Bahasa Inggris
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          {/* Your component here */}
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="f1766"
                              value={questionnaireData.f1766}
                              onChange={handleQuestionnaireChange}
                            >
                              <FormControlLabel
                                value="1"
                                control={<Radio size="small" />}
                                label="1"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio size="small" />}
                                label="2"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio size="small" />}
                                label="3"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio size="small" />}
                                label="4"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio size="small" />}
                                label="5"
                                labelPlacement="bottom"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </TableCell>
                    </TableRow>
                    {/* 4th row */}
                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%", // Ensure the Box takes full height of the TableCell
                          }}
                        >
                          {/* Your component here */}
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="f1767"
                              value={questionnaireData.f1767}
                              onChange={handleQuestionnaireChange}
                            >
                              <FormControlLabel
                                value="1"
                                control={<Radio size="small" />}
                                label="1"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio size="small" />}
                                label="2"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio size="small" />}
                                label="3"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio size="small" />}
                                label="4"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio size="small" />}
                                label="5"
                                labelPlacement="bottom"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            textAlign: "center", // Center align text inside TableCell
                          }}
                        >
                          Penggunaan Teknologi Informasi
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          {/* Your component here */}
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="f1768"
                              value={questionnaireData.f1768}
                              onChange={handleQuestionnaireChange}
                            >
                              <FormControlLabel
                                value="1"
                                control={<Radio size="small" />}
                                label="1"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio size="small" />}
                                label="2"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio size="small" />}
                                label="3"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio size="small" />}
                                label="4"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio size="small" />}
                                label="5"
                                labelPlacement="bottom"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </TableCell>
                    </TableRow>
                    {/* 5th row */}
                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%", // Ensure the Box takes full height of the TableCell
                          }}
                        >
                          {/* Your component here */}
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="f1769"
                              value={questionnaireData.f1769}
                              onChange={handleQuestionnaireChange}
                            >
                              <FormControlLabel
                                value="1"
                                control={<Radio size="small" />}
                                label="1"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio size="small" />}
                                label="2"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio size="small" />}
                                label="3"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio size="small" />}
                                label="4"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio size="small" />}
                                label="5"
                                labelPlacement="bottom"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            textAlign: "center", // Center align text inside TableCell
                          }}
                        >
                          Komunikasi
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          {/* Your component here */}
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="f1770"
                              value={questionnaireData.f1770}
                              onChange={handleQuestionnaireChange}
                            >
                              <FormControlLabel
                                value="1"
                                control={<Radio size="small" />}
                                label="1"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio size="small" />}
                                label="2"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio size="small" />}
                                label="3"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio size="small" />}
                                label="4"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio size="small" />}
                                label="5"
                                labelPlacement="bottom"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </TableCell>
                    </TableRow>
                    {/* 6th row */}
                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%", // Ensure the Box takes full height of the TableCell
                          }}
                        >
                          {/* Your component here */}
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="f1771"
                              value={questionnaireData.f1771}
                              onChange={handleQuestionnaireChange}
                            >
                              <FormControlLabel
                                value="1"
                                control={<Radio size="small" />}
                                label="1"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio size="small" />}
                                label="2"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio size="small" />}
                                label="3"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio size="small" />}
                                label="4"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio size="small" />}
                                label="5"
                                labelPlacement="bottom"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            textAlign: "center", // Center align text inside TableCell
                          }}
                        >
                          Kerja sama tim
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          {/* Your component here */}
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="f1772"
                              value={questionnaireData.f1772}
                              onChange={handleQuestionnaireChange}
                            >
                              <FormControlLabel
                                value="1"
                                control={<Radio size="small" />}
                                label="1"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio size="small" />}
                                label="2"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio size="small" />}
                                label="3"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio size="small" />}
                                label="4"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio size="small" />}
                                label="5"
                                labelPlacement="bottom"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </TableCell>
                    </TableRow>
                    {/* 7th row */}
                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%", // Ensure the Box takes full height of the TableCell
                          }}
                        >
                          {/* Your component here */}
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="f1773"
                              value={questionnaireData.f1773}
                              onChange={handleQuestionnaireChange}
                            >
                              <FormControlLabel
                                value="1"
                                control={<Radio size="small" />}
                                label="1"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio size="small" />}
                                label="2"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio size="small" />}
                                label="3"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio size="small" />}
                                label="4"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio size="small" />}
                                label="5"
                                labelPlacement="bottom"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            textAlign: "center", // Center align text inside TableCell
                          }}
                        >
                          Pengembangan
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          {/* Your component here */}
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="f1774"
                              value={questionnaireData.f1774}
                              onChange={handleQuestionnaireChange}
                            >
                              <FormControlLabel
                                value="1"
                                control={<Radio size="small" />}
                                label="1"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio size="small" />}
                                label="2"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio size="small" />}
                                label="3"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio size="small" />}
                                label="4"
                                labelPlacement="bottom"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio size="small" />}
                                label="5"
                                labelPlacement="bottom"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* no.13 */}
            <Grid
              item
              xs={12}
              hidden={
                questionnaireData.f8 === "2" || questionnaireData.f8 === "5"
                  ? true
                  : false
              }
            >
              <FormControl component="fieldset">
                {/* <FormLabel component="legend">Answer the first question</FormLabel> */}
                <Typography
                  variant="subtitle1"
                  style={{ marginBottom: "14px" }}
                >
                  13. Menurut anda seberapa besar penekanan pada metode
                  pembelajaran dibawah ini dilaksanakan di program studi anda?
                </Typography>
                <Grid container xs={12} spacing={2}>
                  <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1">Perkuliahan</Typography>
                    <RadioGroup
                      // aria-label="answer"
                      name="f21"
                      value={questionnaireData.f21}
                      onChange={handleQuestionnaireChange}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Sangat Besar"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Besar"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="Cukup Besar"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="Kurang Besar"
                      />
                      <FormControlLabel
                        value="5"
                        control={<Radio />}
                        label="Tidak Sama Sekali"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1">Demonstrasi</Typography>
                    <RadioGroup
                      // aria-label="answer"
                      name="f22"
                      value={questionnaireData.f22}
                      onChange={handleQuestionnaireChange}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Sangat Besar"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Besar"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="Cukup Besar"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="Kurang Besar"
                      />
                      <FormControlLabel
                        value="5"
                        control={<Radio />}
                        label="Tidak Sama Sekali"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1">
                      Partisipasi dalam proyek riset
                    </Typography>
                    <RadioGroup
                      // aria-label="answer"
                      name="f23"
                      value={questionnaireData.f23}
                      onChange={handleQuestionnaireChange}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Sangat Besar"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Besar"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="Cukup Besar"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="Kurang Besar"
                      />
                      <FormControlLabel
                        value="5"
                        control={<Radio />}
                        label="Tidak Sama Sekali"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1">Magang</Typography>
                    <RadioGroup
                      // aria-label="answer"
                      name="f24"
                      value={questionnaireData.f24}
                      onChange={handleQuestionnaireChange}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Sangat Besar"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Besar"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="Cukup Besar"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="Kurang Besar"
                      />
                      <FormControlLabel
                        value="5"
                        control={<Radio />}
                        label="Tidak Sama Sekali"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1">Praktikum</Typography>
                    <RadioGroup
                      // aria-label="answer"
                      name="f25"
                      value={questionnaireData.f25}
                      onChange={handleQuestionnaireChange}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Sangat Besar"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Besar"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="Cukup Besar"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="Kurang Besar"
                      />
                      <FormControlLabel
                        value="5"
                        control={<Radio />}
                        label="Tidak Sama Sekali"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1">Kerja Lapangan</Typography>
                    <RadioGroup
                      // aria-label="answer"
                      name="f26"
                      value={questionnaireData.f26}
                      onChange={handleQuestionnaireChange}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Sangat Besar"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Besar"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="Cukup Besar"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="Kurang Besar"
                      />
                      <FormControlLabel
                        value="5"
                        control={<Radio />}
                        label="Tidak Sama Sekali"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1">Diskusi</Typography>
                    <RadioGroup
                      // aria-label="answer"
                      name="f27"
                      value={questionnaireData.f27}
                      onChange={handleQuestionnaireChange}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Sangat Besar"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Besar"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="Cukup Besar"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="Kurang Besar"
                      />
                      <FormControlLabel
                        value="5"
                        control={<Radio />}
                        label="Tidak Sama Sekali"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>

            {/* no.14 */}
            <Grid
              item
              xs={12}
              hidden={
                questionnaireData.f8 === "4" ||
                questionnaireData.f8 === "2" ||
                questionnaireData.f8 === "5"
                  ? true
                  : false
              }
            >
              <FormControl component="fieldset">
                {/* <FormLabel component="legend">Answer the first question</FormLabel> */}
                <Typography variant="subtitle1">
                  14. Kapan anda mulai mencari pekerjaan? Mohon pekerjaan
                  sambilan tidak dimasukkan
                </Typography>
                <RadioGroup
                  // aria-label="answer"
                  name="f301"
                  value={questionnaireData.f301}
                  onChange={handleQuestionnaireChange}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span>Kira-kira</span>
                        <TextField
                          placeholder="Custom Textfield"
                          type="number"
                          size="small"
                          variant="outlined"
                          name="f302"
                          value={questionnaireData.f302}
                          onChange={handleQuestionnaireChange}
                          style={{ marginLeft: "10px", marginRight: "10px" }} // Adjust spacing between label and TextField
                        />
                        <span>bulan sebelum lulus</span>
                      </div>
                    }
                    style={{ marginBottom: "10px" }} // Adjust spacing between radio options
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span>Kira-kira</span>
                        <TextField
                          placeholder="Custom Textfield"
                          type="number"
                          size="small"
                          variant="outlined"
                          name="f303"
                          value={questionnaireData.f303}
                          onChange={handleQuestionnaireChange}
                          style={{ marginLeft: "10px", marginRight: "10px" }} // Adjust spacing between label and TextField
                        />
                        <span>bulan sesudah lulus</span>
                      </div>
                    }
                    style={{ marginBottom: "10px" }} // Adjust spacing between radio options
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Saya tidak mencari kerja"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* no.15 */}
            <Grid
              item
              hidden={
                questionnaireData.f8 === "4" ||
                questionnaireData.f8 === "2" ||
                questionnaireData.f8 === "5"
                  ? true
                  : false
              }
            >
              <FormControl component="fieldset" variant="standard">
                <Typography
                  variant="subtitle1"
                  style={{ marginBottom: "14px" }}
                >
                  15. Bagaimana anda mencari pekerjaan tersebut? Jawaban bisa
                  lebih dari satu.
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f401 === "1"}
                        onChange={handleCheckboxChange("f401")}
                      />
                    }
                    label="Melalui iklan di koran/majalah, brosur"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f402 === "1"}
                        onChange={handleCheckboxChange("f402")}
                      />
                    }
                    label="Melamar ke perusahaan tanpa mengetahui lowongan yang ada"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f403 === "1"}
                        onChange={handleCheckboxChange("f403")}
                      />
                    }
                    label="Pergi ke bursa/pameran kerja"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f404 === "1"}
                        onChange={handleCheckboxChange("f404")}
                      />
                    }
                    label="Mencari lewat internet/iklan online/milis"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f405 === "1"}
                        onChange={handleCheckboxChange("f405")}
                      />
                    }
                    label="Dihubungi oleh perusahaan"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f406 === "1"}
                        onChange={handleCheckboxChange("f406")}
                      />
                    }
                    label="Menghubungi Kemenakertrans"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f407 === "1"}
                        onChange={handleCheckboxChange("f407")}
                      />
                    }
                    label="Menghubungi agen tenaga kerja komersial/swasta"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f408 === "1"}
                        onChange={handleCheckboxChange("f408")}
                      />
                    }
                    label="Memeroleh informasi dari pusat/kantor pengembangan karir fakultas/universitas"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f409 === "1"}
                        onChange={handleCheckboxChange("f409")}
                      />
                    }
                    label="Menghubungi kantor kemahasiswaan/hubungan alumni"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f410 === "1"}
                        onChange={handleCheckboxChange("f410")}
                      />
                    }
                    label="Membangun jejaring (network) sejak masih kuliah"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f411 === "1"}
                        onChange={handleCheckboxChange("f411")}
                      />
                    }
                    label="Melalui relasi (misalnya dosen, orang tua, saudara, teman, dll.)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f412 === "1"}
                        onChange={handleCheckboxChange("f412")}
                      />
                    }
                    label="Membangun bisnis sendiri"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f413 === "1"}
                        onChange={handleCheckboxChange("f413")}
                      />
                    }
                    label="Melalui penempatan kerja atau magang"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f414 === "1"}
                        onChange={handleCheckboxChange("f414")}
                      />
                    }
                    label="Bekerja di tempat yang sama dengan tempat kerja semasa kuliah"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f415 === "1"}
                        onChange={handleCheckboxChange("f415")}
                        name="f415"
                      />
                    }
                    label="Lainnya"
                  />

                  {questionnaireData.f415 === "1" && (
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="lainnya"
                      variant="outlined"
                      name="f4016"
                      value={questionnaireData.f4016}
                      onChange={handleQuestionnaireChange}
                    />
                  )}
                </FormGroup>
              </FormControl>
            </Grid>

            {/* no.16 */}
            <Grid
              item
              xs={12}
              hidden={
                questionnaireData.f8 === "4" ||
                questionnaireData.f8 === "2" ||
                questionnaireData.f8 === "5"
                  ? true
                  : false
              }
            >
              <Typography variant="subtitle1" style={{ marginBottom: "14px" }}>
                16. Berapa perusahaan/instansi/institusi yang sudah anda lamar
                (lewat surat atau e-mail) sebelum anda memeroleh pekerjaan
                pertama?
              </Typography>
              <Box display="flex" alignItems="center">
                <TextField
                  label=""
                  type="number"
                  name="f6"
                  variant="outlined"
                  value={questionnaireData.f6}
                  onChange={handleQuestionnaireChange}
                />
                <InputAdornment position="end">
                  <span>perusahaan/instansi/institusi</span>
                </InputAdornment>
              </Box>
            </Grid>

            {/* no.17 */}
            <Grid
              item
              xs={12}
              hidden={
                questionnaireData.f8 === "4" ||
                questionnaireData.f8 === "2" ||
                questionnaireData.f8 === "5"
                  ? true
                  : false
              }
            >
              <Typography variant="subtitle1" style={{ marginBottom: "14px" }}>
                17. Berapa banyak perusahaan/instansi/institusi yang merespons
                lamaran anda?
              </Typography>
              <Box display="flex" alignItems="center">
                <TextField
                  label=""
                  type="number"
                  name="f7"
                  variant="outlined"
                  value={questionnaireData.f7}
                  onChange={handleQuestionnaireChange}
                />
                <InputAdornment position="end">
                  <span>perusahaan/instansi/institusi</span>
                </InputAdornment>
              </Box>
            </Grid>

            {/* no.18 */}
            <Grid
              item
              xs={12}
              hidden={
                questionnaireData.f8 === "4" ||
                questionnaireData.f8 === "2" ||
                questionnaireData.f8 === "5"
                  ? true
                  : false
              }
            >
              <Typography variant="subtitle1" style={{ marginBottom: "14px" }}>
                18. Berapa banyak perusahaan/instansi/institusi yang mengundang
                anda untuk wawancara?
              </Typography>
              <Box display="flex" alignItems="center">
                <TextField
                  label=""
                  type="number"
                  name="f7a"
                  variant="outlined"
                  value={questionnaireData.f7a}
                  onChange={handleQuestionnaireChange}
                />
                <InputAdornment position="end">
                  <span>perusahaan/instansi/institusi</span>
                </InputAdornment>
              </Box>
            </Grid>

            {/* no.19 */}
            <Grid
              item
              xs={12}
              spacing={4}
              hidden={
                questionnaireData.f8 === "4" ||
                questionnaireData.f8 === "2" ||
                questionnaireData.f8 === "5"
                  ? true
                  : false
              }
            >
              {/* FIX: CONNECT TEXTFIELD TO RADIO OPTION */}
              <FormControl component="fieldset">
                <Typography variant="subtitle1">
                  19. Apakah anda aktif mencari pekerjaan dalam 4 minggu
                  terakhir? Pilihlah satu jawaban.
                </Typography>
                <RadioGroup
                  name="f1001"
                  value={questionnaireData.f1001}
                  onChange={handleQuestionnaireChange}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Tidak"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Tidak, tapi saya sedang menunggu hasil lamaran kerja"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Ya, saya akan mulai bekerja dalam 2 minggu ke depan"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="Ya, tapi saya belum pasti akan bekerja dalam 2 minggu ke depan"
                  />
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label="lainnya"
                  />
                </RadioGroup>
                <Box xs={{ width: "50ch" }}>
                  {questionnaireData.f1001 === "5" && (
                    <TextField
                      id="outlined-basic"
                      label="lainnya..."
                      variant="outlined"
                      name="f1002"
                      value={questionnaireData.f1002}
                      onChange={handleQuestionnaireChange}
                    />
                  )}
                </Box>
              </FormControl>
            </Grid>

            {/* no.20 */}
            <Grid
              item
              xs={12}
              hidden={
                questionnaireData.f8 === "4" ||
                questionnaireData.f8 === "2" ||
                questionnaireData.f8 === "5"
                  ? true
                  : false
              }
            >
              <FormControl component="fieldset" variant="standard">
                <Typography
                  variant="subtitle1"
                  style={{ marginBottom: "14px" }}
                >
                  20. Jika menurut anda pekerjaan anda saat ini tidak sesuai
                  dengan : pendidikan anda, mengapa anda mengambilnya? Jawaban
                  bisa lebih dari satu.
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f1601 === "1"}
                        onChange={handleCheckboxChange("f1601")}
                      />
                    }
                    label="Pertanyaan tidak sesuai; pekerjaan saya sekarang sudah sesuai dengan pendidikan saya."
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f1602 === "1"}
                        onChange={handleCheckboxChange("f1602")}
                      />
                    }
                    label="Saya belum mendapatkan pekerjaan yang lebih sesuai."
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f1603 === "1"}
                        onChange={handleCheckboxChange("f1603")}
                      />
                    }
                    label="Di pekerjaan ini saya memeroleh prospek karir yang baik. "
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f1604 === "1"}
                        onChange={handleCheckboxChange("f1604")}
                      />
                    }
                    label="Saya lebih suka bekerja di area pekerjaan yang tidak ada hubungannya dengan pendidikan saya."
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f1605 === "1"}
                        onChange={handleCheckboxChange("f1605")}
                      />
                    }
                    label="Saya dipromosikan ke posisi yang kurang berhubungan dengan pendidikan saya dibanding posisi sebelumnya."
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f1606 === "1"}
                        onChange={handleCheckboxChange("f1606")}
                      />
                    }
                    label="Saya dapat memeroleh pendapatan yang lebih tinggi di pekerjaan ini. "
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f1607 === "1"}
                        onChange={handleCheckboxChange("f1607")}
                      />
                    }
                    label="Pekerjaan saya saat ini lebih aman/terjamin/secure"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f1608 === "1"}
                        onChange={handleCheckboxChange("f1608")}
                      />
                    }
                    label="Pekerjaan saya saat ini lebih menarik"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f1609 === "1"}
                        onChange={handleCheckboxChange("f1609")}
                      />
                    }
                    label="Pekerjaan saya saat ini lebih memungkinkan saya mengambil pekerjaan tambahan/jadwal yang fleksibel, dll."
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f1610 === "1"}
                        onChange={handleCheckboxChange("f1610")}
                      />
                    }
                    label="Pekerjaan saya saat ini lokasinya lebih dekat dari rumah saya."
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f1611 === "1"}
                        onChange={handleCheckboxChange("f1611")}
                      />
                    }
                    label="Pekerjaan saya saat ini dapat lebih menjamin kebutuhan keluarga saya."
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f1612 === "1"}
                        onChange={handleCheckboxChange("f1612")}
                      />
                    }
                    label="Pada awal meniti karir ini, saya harus menerima pekerjaan yang tidak berhubungan dengan pendidikan saya"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f1613 === "1"}
                        onChange={handleCheckboxChange("f1613")}
                      />
                    }
                    label="lainnya"
                  />
                  <Grid item md={6} style={{ marginTop: "10px" }}>
                    {questionnaireData.f1613 === "1" && (
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="lainnya"
                        variant="outlined"
                        name="f1614"
                        value={questionnaireData.f1614}
                        onChange={handleQuestionnaireChange}
                      />
                    )}
                  </Grid>
                  {/* FIX: check the fill in checkbox */}
                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        checked={questionnaireData.f415}
                        onChange={(e) => handleQuestionnaireChange({ target: { name: 'f415', checked: e.target.checked, value: questionnaireData.f416 } })}
                        name="f415"
                      />
                    }
                    label="lainnya"
                  />
                  {questionnaireData.f415 && (
                    <TextField
                      label="Other Option"
                      variant="outlined"
                      value={questionnaireData.f416}
                      onChange={(e) => handleQuestionnaireChange({ target: { name: 'f415', checked: true, value: e.target.value } })}
                      style={{ marginTop: '10px' }}
                    />
                  )} */}
                </FormGroup>
              </FormControl>
            </Grid>

            {/* Questionnaire above!!! */}
          </Grid>

          {/* Submit and Cancel Buttons */}
          <Box mt={8} display="flex" justifyContent="flex-end">
            {/* <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              Batal
            </Button> */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Submit
            </Button>

            {/* dialog box to send to send the tracer study form */}
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Submit data Tracer Study?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Data yang telah di-submit tidak akan bisa diubah kembali.
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
          </Box>
        </Box>
      </Box>
    </Div>
  );
};

export default FormTracerStudy;
