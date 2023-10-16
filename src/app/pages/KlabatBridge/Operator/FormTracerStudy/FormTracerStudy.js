import React, { useState } from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";

const FormTracerSTudy = () => {
  const [checked, setChecked] = React.useState(false);

  //for date pickers
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const [identityData, setIdentityData] = useState({
    nim: "",
    kodePT: "",
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
    f5a1: "",
    f5a2: "",
    f1101: "",
    f1102: "", //delete later
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
    f401: "",
    f402: "",
    f403: "",
    f404: "",
    f405: "",
    f406: "",
    f407: "",
    f408: "",
    f409: "",
    f410: "",
    f411: "",
    f412: "",
    f413: "",
    f414: "",
    f415: "",
    f416: "",
    f6: "",
    f7: "",
    f7a: "",
    f1001: "",
    f1002: "",
    f1601: "",
    f1602: "",
    f1603: "",
    f1604: "",
    f1605: "",
    f1606: "",
    f1607: "",
    f1608: "",
    f1609: "",
    f1610: "",
    f1611: "",
    f1612: "",
    f1613: "",
    f1614: "",
  });

  //no. 3
  const provinces = ["Province 1", "Province 2", "Province 3"];
  const citiesByProvince = {
    "Province 1": ["City A", "City B", "City C"],
    "Province 2": ["City X", "City Y", "City Z"],
    "Province 3": ["City P", "City Q", "City R"],
  };

  const handleIdentityChange = (event) => {
    setIdentityData({
      ...identityData,
      [event.target.name]: event.target.value,
    });
  };

  const handleQuestionnaireChange = (event) => {
    setQuestionnaireData({
      ...questionnaireData,
      [event.target.name]: event.target.value,

    // const { name, value } = event.target;
    // setQuestionnaireData({
    //   ...questionnaireData,
    //   [name]: value,
    // });


      //for checkbox
      //[event.target.name]: event.target.checked,

      // checkbox with textfield
        // if (name === 'f415' && checked) {
        //     setQuestionnaireData({
        //         ...questionnaireData,
        //         questionnaireData.f415: checked,
        //         [name]: value
        //     });
        // } else {
        //     setQuestionnaireData({
        //         ...state,
        //         questionnaireData.f415: checked,
        //         [name]: checked ? value : false,
        //         questionnaireData.f416: ''
        //     });
        // }
    });
  };

  const handleCheckbox = (event) => {
    setQuestionnaireData({
      ...questionnaireData,
      [event.target.name]: event.target.checked,
    })
  }
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Handle form submission logic here
  //   console.log("Identity Data:", identityData);
  //   console.log("Questionnaire Data:", questionnaireData);
  //   // You can send the form data to an API, perform validation, etc.

  // };


  return (
    <Div>
      <Box p={8} sx={{
        backgroundColor: 'white',
        borderRadius: 5,
        boxShadow: 3,
      }} >
        {/* Identity Details */}
        {/* <Typography variant="h1" style={{marginBottom:"2em", fontWeight: 500}}>Formulir Tracer Study</Typography> */}
        <Typography mb={5} sx={{ fontSize: "24px", fontWeight: 500, }}>
          Formulir Tracer Study
        </Typography>
        <Typography mb={3} variant="h2">Identitas Diri</Typography>
        <Grid container spacing={4}>
          <Grid item sm={12} md={6}>
            <Typography variant="subtitle1">Nomor Induk Mahasiswa (NIM)</Typography>
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
            <Typography variant="subtitle1">Kode PT</Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="kodePT"
              placeholder="12345678910"
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
            <Typography variant="subtitle1">Kode Prodi</Typography>
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
              placeholder="Stenly Adam"
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
              placeholder="stenlyadam@gmail.com"
              value={identityData.email}
              onChange={handleIdentityChange}
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <Typography variant="subtitle1">Nomor Induk Kependudukan (NIK)</Typography>
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
        <Typography variant="h2" style={{ marginBottom: "16px", marginTop: "75px" }}>
          Questionnaire
        </Typography>
        <Grid container spacing={4}>
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
                <FormControlLabel value="1" control={<Radio />} label="Bekerja (full time / part time)" />
                <FormControlLabel value="2" control={<Radio />} label="Belum memungkinkan bekerja" />
                <FormControlLabel value="3" control={<Radio />} label="Wiraswasta" />
                <FormControlLabel value="4" control={<Radio />} label="Melanjutkan Pendidikan" />
                <FormControlLabel value="5" control={<Radio />} label="Tidak kerja tetapi sedang mencari kerja" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <Typography variant="subtitle1">
                2. Apakah Anda telah mendapatkan pekerjaan &lt;= 6 bulan / termasuk bekerja sebelum lulus?
              </Typography>
              <RadioGroup
                row
                name="f504"
                value={questionnaireData.f504}
                onChange={handleQuestionnaireChange}
              >
                <FormControlLabel value="1" control={<Radio />} label="Ya" />
                <FormControlLabel value="2" control={<Radio />} label="Tidak" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item md={6}>
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
          <Grid item md={6}>
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
          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{marginBottom:'14px'}}>
              3. Di mana lokasi tempat Anda bekerja
            </Typography>
            <Grid container spacing={4} >
              <Grid item xs={12} md={6} >
                <Typography variant="subtitle3">
                  Provinsi
                </Typography>
                <Select
                  fullWidth
                  variant="outlined"
                  name="province"
                  value={questionnaireData.province}
                  onChange={handleQuestionnaireChange}
                >
                  <MenuItem value="">Select Province</MenuItem>
                  {provinces.map((province) => (
                    <MenuItem key={province} value={province}>
                      {province}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle3">
                  Kabupaten/Kota
                </Typography>
                <Select
                  fullWidth
                  variant="outlined"
                  name="city"
                  value={questionnaireData.city}
                  onChange={handleQuestionnaireChange}
                >
                  <MenuItem value="">Select City</MenuItem>
                  {citiesByProvince[questionnaireData.province]?.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Grid>
          
          {/* FIX: CONNECT TEXTFIELD TO RADIO OPTION */}
          <Grid item container xs={12} spacing={4}>
            <Grid item md={12}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1">
                  4. Apa jenis perusahaan/intansi/institusi tempat anda bekerja sekarang?
                </Typography>
                <RadioGroup
                  name="f1101"
                  value={questionnaireData.f1101}
                  onChange={handleQuestionnaireChange}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Instansi pemerintah" />
                  <FormControlLabel value="6" control={<Radio />} label="BUMN/BUMD" />
                  <FormControlLabel value="7" control={<Radio />} label="Institusi/Organisasi Multilateral" />
                  <FormControlLabel value="2" control={<Radio />} label="Organisasi non-profit/Lembaga Swadaya Masyarakat" />
                  <FormControlLabel value="3" control={<Radio />} label="Perusahaan swasta" />
                  <FormControlLabel value="4" control={<Radio />} label="Wiraswasta/perusahaan sendiri" />
                  <FormControlLabel value="5" control={<Radio />} label="Lainnya, tuliskan" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <TextField 
                fullWidth 
                id="outlined-basic" 
                placeholder="lainnya" 
                variant="outlined"
              />

              {/* fix: hubungin ke radio button */}
              {/* {questionnaireData.f1101 === '5' && (
                <TextField
                  fullwidth
                  label="Text Field"
                  variant="outlined"
                  name="f1102"
                  value={questionnaireData.f1102}
                  onChange={handleQuestionnaireChange}
                />
              )} */}
            </Grid>
          </Grid>

          <Grid item container xs={12} spacing={4}>
            <Grid item xs={12} md={6}>
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

          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
              6. Bila berwiraswasta, apa posisi/jabatan Anda saat ini? (Apabila 1 Menjawab [3] wiraswasta)
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Silahkan Pilih</InputLabel>
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

          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
              7. Apa tingkat tempat kerja Anda?
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Silahkan Pilih</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={questionnaireData.f5d}
                      label="Silahkan Pilih"
                      name="f5d"
                      onChange={handleQuestionnaireChange}
                    >
                      <MenuItem value={1}>Lokal/Wilayah/Wiraswasta/tidak berbadan hukum</MenuItem>
                      <MenuItem value={2}>Nasional/Wiraswasta berbadan hukum</MenuItem>
                      <MenuItem value={3}>Mulitnasional/Internasional</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
              
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
              8. Pertanyaan studi lanjut
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography mb={1}>Sumber biaya</Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Silahkan Pilih</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Silahkan Pilih"
                    name="f18a"
                    value={questionnaireData.f18a}
                    onChange={handleQuestionnaireChange}
                  >
                    <MenuItem value={1}>Biaya Sendiri</MenuItem>
                    <MenuItem value={2}>Beasiswa</MenuItem>
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
                    sx={{ width: '100%' }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>

          {/* FIX: CONNECT TEXTFIELD TO RADIO OPTION */}
          <Grid item container xs={12} spacing={4}>
            <Grid item md={12}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1">
                  9. Sebutkan sumberdana dalam pembiayaan kuliah? * (bukan ketika Studi Lanjut)
                </Typography>
                <RadioGroup
                  name="f1201"
                  value={questionnaireData.f1201}
                  onChange={handleQuestionnaireChange}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Biaya Sendiri/Keluarga" />
                  <FormControlLabel value="2" control={<Radio />} label="Beasiswa ADIK" />
                  <FormControlLabel value="3" control={<Radio />} label="Beasiswa BIDIKMISI" />
                  <FormControlLabel value="4" control={<Radio />} label="Beasiswa PPA" />
                  <FormControlLabel value="5" control={<Radio />} label="Beasiswa AFIRMASI" />
                  <FormControlLabel value="6" control={<Radio />} label="Beasiswa Perusahaan/Swasta" />
                  <FormControlLabel value="7" control={<Radio />} label="Lainnya, tuliskan" />
                </RadioGroup>
                <Grid item md={6}>
              <TextField 
                fullWidth 
                id="outlined-basic" 
                label="lainnya" 
                variant="outlined"
                name="f1202"
                value={questionnaireData.f1202}
                onChange={handleQuestionnaireChange}
              />
              {/* fix: hubungin ke radio button */}
              {/* {questionnaireData.f1201 === '7' && (
              )} */} 
            </Grid>
              </FormControl>
            </Grid>
            
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              {/* <FormLabel component="legend">Answer the first question</FormLabel> */}
              <Typography variant="subtitle1">
                10. Seberapa erat hubungan bidang studi dengan pekerjaan Anda? *
              </Typography>
              <RadioGroup
                // aria-label="answer"
                name="f14"
                value={questionnaireData.f14}
                onChange={handleQuestionnaireChange}
              >
                <FormControlLabel value="1" control={<Radio />} label="Sangat Erat" />
                <FormControlLabel value="2" control={<Radio />} label="Erat" />
                <FormControlLabel value="3" control={<Radio />} label="Cukup Erat" />
                <FormControlLabel value="4" control={<Radio />} label="Kurang Erat" />
                <FormControlLabel value="5" control={<Radio />} label="Tidak Sama Sekali" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              {/* <FormLabel component="legend">Answer the first question</FormLabel> */}
              <Typography variant="subtitle1">
                11. Tingkat pendidikan apa yang paling tepat/sesuai untuk pekerjaan anda saat ini? *
              </Typography>
              <RadioGroup
                // aria-label="answer"
                name="f15"
                value={questionnaireData.f15}
                onChange={handleQuestionnaireChange}
              >
                <FormControlLabel value="1" control={<Radio />} label="Setingkat Lebih Tinggi" />
                <FormControlLabel value="2" control={<Radio />} label="Setingkat yang Sama" />
                <FormControlLabel value="3" control={<Radio />} label="Setingkat Lebih Rendah" />
                <FormControlLabel value="4" control={<Radio />} label="Tidak Perlu Pendidikan Tinggi" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* no. 12 skip dulu */}
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              12. Pada saat lulus, pada tingkat mana kompetensi di bawah ini anda : kuasai? (A) Pada
              saat ini, pada tingkat mana kompetensi di bawah ini diperlukan dalam pekerjaan? (B)*
            </Typography>
            <TableContainer sx={{marginY: 2}}>
              <Table 
                aria-label="simple table" 
                //sx={{ border: "1px solid #ddd" }} 
              >
                <TableHead>
                  <TableRow 
                    //sx={{backgroundColor: "#f5f5f5"}}
                  >
                    <TableCell style={{ width: '400px' }}>A</TableCell>
                    <TableCell style={{ width: '200px' }}></TableCell>
                    <TableCell style={{ width: '400px' }}>B</TableCell>
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
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', // Ensure the Box takes full height of the TableCell
                        }}
                      >
                        {/* Your component here */}
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                //value={questionnaireData.f1761}
                                //onChange={handleQuestionnaireChange}
                            >
                                <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                                <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                                <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                                <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                                <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                            </RadioGroup>
                        </FormControl>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', 
                          textAlign: 'center', // Center align text inside TableCell
                        }}
                      >
                        Etika
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', 
                        }}
                      >
                        {/* Your component here */}
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            //value={questionnaireData.f1761}
                            //onChange={handleQuestionnaireChange}
                          >
                            <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                            <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                            <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                            <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                            <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
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
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', // Ensure the Box takes full height of the TableCell
                        }}
                      >
                        {/* Your component here */}
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                //value={questionnaireData.f1761}
                                //onChange={handleQuestionnaireChange}
                            >
                                <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                                <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                                <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                                <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                                <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                            </RadioGroup>
                        </FormControl>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', 
                          textAlign: 'center', // Center align text inside TableCell
                        }}
                      >
                        Keahlian berdasarkan bidang ilmu
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', 
                        }}
                      >
                        {/* Your component here */}
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            //value={questionnaireData.f1761}
                            //onChange={handleQuestionnaireChange}
                          >
                            <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                            <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                            <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                            <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                            <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
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
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', // Ensure the Box takes full height of the TableCell
                        }}
                      >
                        {/* Your component here */}
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                //value={questionnaireData.f1761}
                                //onChange={handleQuestionnaireChange}
                            >
                                <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                                <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                                <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                                <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                                <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                            </RadioGroup>
                        </FormControl>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', 
                          textAlign: 'center', // Center align text inside TableCell
                        }}
                      >
                        Bahasa Inggris
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', 
                        }}
                      >
                        {/* Your component here */}
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            //value={questionnaireData.f1761}
                            //onChange={handleQuestionnaireChange}
                          >
                            <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                            <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                            <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                            <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                            <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
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
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', // Ensure the Box takes full height of the TableCell
                        }}
                      >
                        {/* Your component here */}
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                //value={questionnaireData.f1761}
                                //onChange={handleQuestionnaireChange}
                            >
                                <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                                <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                                <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                                <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                                <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                            </RadioGroup>
                        </FormControl>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', 
                          textAlign: 'center', // Center align text inside TableCell
                        }}
                      >
                        Penggunaan Teknologi Informasi
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', 
                        }}
                      >
                        {/* Your component here */}
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            //value={questionnaireData.f1761}
                            //onChange={handleQuestionnaireChange}
                          >
                            <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                            <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                            <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                            <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                            <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
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
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', // Ensure the Box takes full height of the TableCell
                        }}
                      >
                        {/* Your component here */}
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                //value={questionnaireData.f1761}
                                //onChange={handleQuestionnaireChange}
                            >
                                <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                                <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                                <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                                <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                                <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                            </RadioGroup>
                        </FormControl>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', 
                          textAlign: 'center', // Center align text inside TableCell
                        }}
                      >
                        Komunikasi
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', 
                        }}
                      >
                        {/* Your component here */}
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            //value={questionnaireData.f1761}
                            //onChange={handleQuestionnaireChange}
                          >
                            <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                            <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                            <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                            <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                            <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
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
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', // Ensure the Box takes full height of the TableCell
                        }}
                      >
                        {/* Your component here */}
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                //value={questionnaireData.f1761}
                                //onChange={handleQuestionnaireChange}
                            >
                                <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                                <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                                <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                                <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                                <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                            </RadioGroup>
                        </FormControl>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', 
                          textAlign: 'center', // Center align text inside TableCell
                        }}
                      >
                        Kerja sama tim
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', 
                        }}
                      >
                        {/* Your component here */}
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            //value={questionnaireData.f1761}
                            //onChange={handleQuestionnaireChange}
                          >
                            <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                            <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                            <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                            <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                            <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
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
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', // Ensure the Box takes full height of the TableCell
                        }}
                      >
                        {/* Your component here */}
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                //value={questionnaireData.f1761}
                                //onChange={handleQuestionnaireChange}
                            >
                                <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                                <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                                <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                                <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                                <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                            </RadioGroup>
                        </FormControl>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', 
                          textAlign: 'center', // Center align text inside TableCell
                        }}
                      >
                        Pengembangan
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%', 
                        }}
                      >
                        {/* Your component here */}
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            //value={questionnaireData.f1761}
                            //onChange={handleQuestionnaireChange}
                          >
                            <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                            <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                            <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                            <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                            <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                          </RadioGroup>
                        </FormControl>
                      </Box>
                  </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              {/* <FormLabel component="legend">Answer the first question</FormLabel> */}
              <Typography variant="subtitle1" style={{marginBottom:"14px"}} >
                13. Menurut anda seberapa besar penekanan pada metode pembelajaran dibawah ini
                dilaksanakan di program studi anda?
              </Typography>
              <Grid container xs={12} spacing={2}> 
                <Grid item xs={6} md={6}>
                <Typography variant="subtitle1">
                  Perkuliahan
                </Typography>
                  <RadioGroup
                    // aria-label="answer"
                    name="f21"
                    value={questionnaireData.f21}
                    onChange={handleQuestionnaireChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Sangat Besar" />
                    <FormControlLabel value="2" control={<Radio />} label="Besar" />
                    <FormControlLabel value="3" control={<Radio />} label="Cukup Besar" />
                    <FormControlLabel value="4" control={<Radio />} label="Kurang Besar" />
                    <FormControlLabel value="5" control={<Radio />} label="Tidak Sama Sekali" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography variant="subtitle1">
                    Demonstrasi
                  </Typography>
                  <RadioGroup
                    // aria-label="answer"
                    name="f22"
                    value={questionnaireData.f22}
                    onChange={handleQuestionnaireChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Sangat Besar" />
                    <FormControlLabel value="2" control={<Radio />} label="Besar" />
                    <FormControlLabel value="3" control={<Radio />} label="Cukup Besar" />
                    <FormControlLabel value="4" control={<Radio />} label="Kurang Besar" />
                    <FormControlLabel value="5" control={<Radio />} label="Tidak Sama Sekali" />
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
                    <FormControlLabel value="1" control={<Radio />} label="Sangat Besar" />
                    <FormControlLabel value="2" control={<Radio />} label="Besar" />
                    <FormControlLabel value="3" control={<Radio />} label="Cukup Besar" />
                    <FormControlLabel value="4" control={<Radio />} label="Kurang Besar" />
                    <FormControlLabel value="5" control={<Radio />} label="Tidak Sama Sekali" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography variant="subtitle1">
                    Magang
                  </Typography>
                  <RadioGroup
                    // aria-label="answer"
                    name="f24"
                    value={questionnaireData.f24}
                    onChange={handleQuestionnaireChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Sangat Besar" />
                    <FormControlLabel value="2" control={<Radio />} label="Besar" />
                    <FormControlLabel value="3" control={<Radio />} label="Cukup Besar" />
                    <FormControlLabel value="4" control={<Radio />} label="Kurang Besar" />
                    <FormControlLabel value="5" control={<Radio />} label="Tidak Sama Sekali" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography variant="subtitle1">
                    Praktikum
                  </Typography>
                  <RadioGroup
                    // aria-label="answer"
                    name="f25"
                    value={questionnaireData.f25}
                    onChange={handleQuestionnaireChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Sangat Besar" />
                    <FormControlLabel value="2" control={<Radio />} label="Besar" />
                    <FormControlLabel value="3" control={<Radio />} label="Cukup Besar" />
                    <FormControlLabel value="4" control={<Radio />} label="Kurang Besar" />
                    <FormControlLabel value="5" control={<Radio />} label="Tidak Sama Sekali" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography variant="subtitle1">
                    Kerja Lapangan
                  </Typography>
                  <RadioGroup
                    // aria-label="answer"
                    name="f26"
                    value={questionnaireData.f26}
                    onChange={handleQuestionnaireChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Sangat Besar" />
                    <FormControlLabel value="2" control={<Radio />} label="Besar" />
                    <FormControlLabel value="3" control={<Radio />} label="Cukup Besar" />
                    <FormControlLabel value="4" control={<Radio />} label="Kurang Besar" />
                    <FormControlLabel value="5" control={<Radio />} label="Tidak Sama Sekali" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography variant="subtitle1">
                   Diskusi
                  </Typography>
                  <RadioGroup
                    // aria-label="answer"
                    name="f27"
                    value={questionnaireData.f27}
                    onChange={handleQuestionnaireChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Sangat Besar" />
                    <FormControlLabel value="2" control={<Radio />} label="Besar" />
                    <FormControlLabel value="3" control={<Radio />} label="Cukup Besar" />
                    <FormControlLabel value="4" control={<Radio />} label="Kurang Besar" />
                    <FormControlLabel value="5" control={<Radio />} label="Tidak Sama Sekali" />
                  </RadioGroup>
                </Grid>
              </Grid>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              {/* <FormLabel component="legend">Answer the first question</FormLabel> */}
              <Typography variant="subtitle1">
                14. Kapan anda mulai mencari pekerjaan? Mohon pekerjaan sambilan tidak dimasukkan
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
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <span>Kira-kira</span>
                      <TextField
                        placeholder="Custom Textfield"
                        type="number"
                        size="small"
                        variant="outlined"
                        name="f302"
                        value={questionnaireData.f302}
                        onChange={handleQuestionnaireChange}
                        style={{ marginLeft: '10px', marginRight: '10px' }} // Adjust spacing between label and TextField
                      />
                      <span>bulan sebelum lulus</span>
                    </div>
                  }
                  style={{ marginBottom: '10px' }} // Adjust spacing between radio options
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label={
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <span>Kira-kira</span>
                      <TextField
                        placeholder="Custom Textfield"
                        type="number"
                        size="small"
                        variant="outlined"
                        name="f303"
                        value={questionnaireData.f303}
                        onChange={handleQuestionnaireChange}
                        style={{ marginLeft: '10px', marginRight: '10px' }} // Adjust spacing between label and TextField
                      />
                      <span>bulan sesudah lulus</span>
                    </div>
                  }
                  style={{ marginBottom: '10px' }} // Adjust spacing between radio options
                />
                <FormControlLabel value="3" control={<Radio />} label="Saya tidak mencari kerja" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl component="fieldset" variant="standard">
              <Typography variant="subtitle1" style={{marginBottom:"14px"}} >
                15. Bagaimana anda mencari pekerjaan tersebut? 
                Jawaban bisa lebih dari satu.
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f401} onChange={handleCheckbox} name="f401"/>
                  }
                  label="Melalui iklan di koran/majalah, brosur"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f402} onChange={handleCheckbox} name="f402"/>
                  }
                  label="Melamar ke perusahaan tanpa mengetahui lowongan yang ada"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f403} onChange={handleCheckbox} name="f403"/>
                  }
                  label="Pergi ke bursa/pameran kerja"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f404} onChange={handleCheckbox} name="f404"/>
                  }
                  label="Mencari lewat internet/iklan online/milis"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f405} onChange={handleCheckbox} name="f405"/>
                  }
                  label="Dihubungi oleh perusahaan"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f406} onChange={handleCheckbox} name="f406"/>
                  }
                  label="Menghubungi Kemenakertrans"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f407} onChange={handleCheckbox} name="f407"/>
                  }
                  label="Menghubungi agen tenaga kerja komersial/swasta"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f408} onChange={handleCheckbox} name="f408"/>
                  }
                  label="Memeroleh informasi dari pusat/kantor pengembangan karir fakultas/universitas"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f409} onChange={handleCheckbox} name="f409"/>
                  }
                  label="Menghubungi kantor kemahasiswaan/hubungan alumni"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f410} onChange={handleCheckbox} name="f410"/>
                  }
                  label="Membangun jejaring (network) sejak masih kuliah"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f411} onChange={handleCheckbox} name="f411"/>
                  }
                  label="Melalui relasi (misalnya dosen, orang tua, saudara, teman, dll.)"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f412} onChange={handleCheckbox} name="f412"/>
                  }
                  label="Membangun bisnis sendiri"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f413} onChange={handleCheckbox} name="f413"/>
                  }
                  label="Melalui penempatan kerja atau magang"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f414} onChange={handleCheckbox} name="f414"/>
                  }
                  label="Bekerja di tempat yang sama dengan tempat kerja semasa kuliah"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f415} onChange={handleCheckbox} name="f415"/>
                  }
                  label="Lainnya"
                />

                <TextField 
                  fullWidth 
                  id="outlined-basic" 
                  label="lainnya" 
                  variant="outlined"
                  name="f4016"
                  value={questionnaireData.f4016}
                  onChange={handleQuestionnaireChange}
                />

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

          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{marginBottom:"14px"}}>
              16. Berapa perusahaan/instansi/institusi yang sudah anda lamar (lewat surat atau e-mail) sebelum anda memeroleh pekerjaan pertama? 
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

          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{marginBottom:"14px"}}>
              17. Berapa banyak perusahaan/instansi/institusi yang merespons lamaran anda?
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

          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{marginBottom:"14px"}}>
              18. Berapa banyak perusahaan/instansi/institusi yang mengundang anda untuk wawancara?
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
          
           {/* FIX: CONNECT TEXTFIELD TO RADIO OPTION */}
           <Grid item xs={12} spacing={4}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1">
                  19. Apakah anda aktif mencari pekerjaan dalam 4 minggu terakhir? Pilihlah satu jawaban.
                </Typography>
                <RadioGroup
                  name="f1001"
                  value={questionnaireData.f1001}
                  onChange={handleQuestionnaireChange}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Tidak" />
                  <FormControlLabel value="2" control={<Radio />} label="Tidak, tapi saya sedang menunggu hasil lamaran kerja" />
                  <FormControlLabel value="3" control={<Radio />} label="Ya, saya akan mulai bekerja dalam 2 minggu ke depan" />
                  <FormControlLabel value="4" control={<Radio />} label="Ya, tapi saya belum pasti akan bekerja dalam 2 minggu ke depan" />
                  <FormControlLabel value="5" control={<Radio />} label="lainnya" />
                </RadioGroup>
                <Box xs={{width: "50ch"}}  >
                  <TextField
                    id="outlined-basic" 
                    label="lainnya..." 
                    variant="outlined"
                    name="f1002"
                    value={questionnaireData.f1002}
                    onChange={handleQuestionnaireChange}
                  />
                </Box>
              </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset" variant="standard">
              <Typography variant="subtitle1" style={{marginBottom:"14px"}} >
                20. Jika menurut anda pekerjaan anda saat ini tidak sesuai dengan : pendidikan anda, mengapa anda mengambilnya? Jawaban bisa lebih dari satu.
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f1601} onChange={handleCheckbox} name="f1601"/>
                  }
                  label="Pertanyaan tidak sesuai; pekerjaan saya sekarang sudah sesuai dengan pendidikan saya."
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f1602} onChange={handleCheckbox} name="f1602"/>
                  }
                  label="Saya belum mendapatkan pekerjaan yang lebih sesuai."
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f1603} onChange={handleCheckbox} name="f1603"/>
                  }
                  label="Di pekerjaan ini saya memeroleh prospek karir yang baik. "
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f1604} onChange={handleCheckbox} name="f1604"/>
                  }
                  label="Saya lebih suka bekerja di area pekerjaan yang tidak ada hubungannya dengan pendidikan saya."
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f1605} onChange={handleCheckbox} name="f1605"/>
                  }
                  label="Saya dipromosikan ke posisi yang kurang berhubungan dengan pendidikan saya dibanding posisi sebelumnya."
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f1606} onChange={handleCheckbox} name="f1606"/>
                  }
                  label="Saya dapat memeroleh pendapatan yang lebih tinggi di pekerjaan ini. "
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f1607} onChange={handleCheckbox} name="f1607"/>
                  }
                  label="Pekerjaan saya saat ini lebih aman/terjamin/secure"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f1608} onChange={handleCheckbox} name="f1608"/>
                  }
                  label="Pekerjaan saya saat ini lebih menarik"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f1609} onChange={handleCheckbox} name="f1609"/>
                  }
                  label="Pekerjaan saya saat ini lebih memungkinkan saya mengambil pekerjaan tambahan/jadwal yang fleksibel, dll."
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f1610} onChange={handleCheckbox} name="f1610"/>
                  }
                  label="Pekerjaan saya saat ini lokasinya lebih dekat dari rumah saya."
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f1611} onChange={handleCheckbox} name="f1611"/>
                  }
                  label="Pekerjaan saya saat ini dapat lebih menjamin kebutuhan keluarga saya."
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f1612} onChange={handleCheckbox} name="f1612"/>
                  }
                  label="Pada awal meniti karir ini, saya harus menerima pekerjaan yang tidak berhubungan dengan pendidikan saya"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={questionnaireData.f1613} onChange={handleCheckbox} name="f1613"/>
                  }
                  label="lainnya"
                />
                <Grid item md={6} style={{marginTop:"10px"}}>
                <TextField 
                  fullWidth 
                  id="outlined-basic" 
                  label="lainnya" 
                  variant="outlined"
                  name="f1614"
                  value={questionnaireData.f1614}
                  onChange={handleQuestionnaireChange}
                />
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
          <Button variant="outlined" color="primary" style={{ marginRight: "10px" }}>
            Batal
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Kirim
          </Button>
        </Box>
      </Box>
    </Div>
  );
};

export default FormTracerSTudy;


