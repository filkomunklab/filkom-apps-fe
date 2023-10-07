import Div from '@jumbo/shared/Div'
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
  } from "@mui/material";
import React from 'react'
import SearchGlobal from 'app/shared/SearchGlobal';
import JumboDemoCard from '@jumbo/components/JumboDemoCard';

const rows = [
    { id: 1, name: 'Row 1', column2: 'Value 1', column3: 'Value 2', column4: 'Value 3' },
    { id: 2, name: 'Row 2', column2: 'Value 4', column3: 'Value 5', column4: 'Value 6' },
    { id: 1, name: 'Row 1', column2: 'Value 1', column3: 'Value 2', column4: 'Value 3' },
    { id: 2, name: 'Row 2', column2: 'Value 4', column3: 'Value 5', column4: 'Value 6' },
    { id: 1, name: 'Row 1', column2: 'Value 1', column3: 'Value 2', column4: 'Value 3' },
    { id: 2, name: 'Row 2', column2: 'Value 4', column3: 'Value 5', column4: 'Value 6' },
    // Add more rows as needed
  ];

const PengisianSPT = () => {
  return (
    <Box marginX={15} marginY={3} sx={{backgroundColor: 'white'}}>
        <Typography mb={5} sx={{ fontSize: "24px", fontWeight: 500, }}>
            Surat Permohonan Tamat
        </Typography>

        <Typography variant="body1" sx={{lineHeight: 2.5}}>
            Saya yang bertanda tangan di bawah ini, bermohon untuk dapat wisuda pada semester 1 2022/2023 dengan sisa SKS yang harus diambil
                <span style={{ display: 'inline-block', minWidth: '30px' }}>
                    <TextField
                    //   value={remainingSks}
                    //   onChange={handleSksChange}
                    type="number"
                    variant="outlined"
                    size="small"
                    placeholder='23'
                    sx={{ width: '70px', ml:"10px", marginRight:"10px" }}
                    
                    />
                </span>
            sks.
        </Typography>

        {/* input */}
        <Box mt={3}>
            <Grid container spacing={4}>
                <Grid item sm={12} md={6}>
                    <Typography variant="subtitle1">Nama sesuai ijazah</Typography>
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
                    <Typography variant="subtitle1">No. Regis</Typography>
                    <TextField
                    fullWidth
                    variant="outlined"
                    name="noRegis"
                    placeholder="12345678910"
                    //   value={identityData.kodePT}
                    //   onChange={handleIdentityChange}
                    />
                </Grid>
                <Grid item sm={12} md={6}>
                    <Typography variant="subtitle1">Tanggal Lahir</Typography>
                    <TextField
                    fullWidth
                    variant="outlined"
                    name="tglLahir"
                    placeholder="put the date picker here!!"
                    //   value={identityData.tahunLulus}
                    //   onChange={handleIdentityChange}
                    />
                </Grid>
                <Grid item sm={12} md={6}>
                <FormControl>
                    <Typography variant="subtitle1">Gender</Typography>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                        <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                    </RadioGroup>
                </FormControl>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Typography variant="subtitle1">Nomor Induk Kependudukan (NIK)</Typography>
                    <TextField
                    fullWidth
                    variant="outlined"
                    name="nik"
                    type='number'
                    placeholder="12345678910"
                    //   value={identityData.nim}
                    //   onChange={handleIdentityChange}
                    />
                </Grid>
                <Grid item sm={12} md={6}>
                    <Typography variant="subtitle1">Nomor Induk Mahasiswa</Typography>
                    <TextField
                    fullWidth
                    variant="outlined"
                    name="nim"
                    type='number'
                    placeholder="12345678910"
                    //   value={identityData.kodePT}
                    //   onChange={handleIdentityChange}
                    />
                </Grid>
                <Grid item sm={12} md={4}>
                    <Typography variant="subtitle1">Fakultas</Typography>
                    <TextField
                    fullWidth
                    variant="outlined"
                    name="fakultas"
                    placeholder="Fakultas Ilmu Komputer"
                    //   value={identityData.nim}
                    //   onChange={handleIdentityChange}
                    />
                </Grid>
                <Grid item sm={12} md={4}>
                    <Typography variant="subtitle1">Program Studi</Typography>
                    <TextField
                    fullWidth
                    variant="outlined"
                    name="prodi"
                    placeholder="Informatika"
                    //   value={identityData.nim}
                    //   onChange={handleIdentityChange}
                    />
                </Grid>
                <Grid item sm={12} md={4}>
                    <Typography variant="subtitle1">Minor/Konsentrasi</Typography>
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
                    <Typography variant="subtitle1">Nama Ibu Kandung</Typography>
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
                    <Typography variant="subtitle1">Phone Number</Typography>
                    <TextField
                    fullWidth
                    variant="outlined"
                    name="phoneNumber"
                    placeholder="12345678910"
                    //   value={identityData.nim}
                    //   onChange={handleIdentityChange}
                    />
                </Grid>
            </Grid>
        </Box>

        <Typography mt={5} sx={{ fontSize: "24px", fontWeight: 500, }}>
            Sisa mata kuliah yang harus diambil:
        </Typography>
       <Box m={2}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell>No.</TableCell>
                        <TableCell>Mata kuliah</TableCell>
                        <TableCell>SKS</TableCell>
                        <TableCell>Keterangan</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.column2}</TableCell>
                        <TableCell>{row.column3}</TableCell>
                        <TableCell>{row.column4}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
       </Box>
       <Typography variant="body1" sx={{lineHeight: 2.5}}>
            Total SKS yang diambil:
                <span style={{ display: 'inline-block', minWidth: '30px' }}>
                    <TextField
                    //   value={remainingSks}
                    //   onChange={handleSksChange}
                    type="number"
                    variant="outlined"
                    size="small"
                    placeholder='23'
                    sx={{ width: '70px', ml:"10px", marginRight:"10px" }}
                    />
                </span>
            sks.
        </Typography>
        <Div
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 2,
                    width: 245,
                    height: 130,
                marginTop:'30px',
                },
            }}
        >
            <Paper elevation={3}/>
        </Div>
        <Divider sx={{ marginTop: '25px' }} />
        <Grid container justifyContent="space-between" alignItems="center" style={{ padding: '20px' }}>
            <Grid item>
                <FormControlLabel control={<Checkbox/>} label="Saya telah mengisi data ini dengan benar dan tepat"/>
            </Grid>
            <Grid item>
                <Box display="flex" justifyContent="flex-end">
                    <Button variant="outlined" color="primary" style={{ marginRight: "10px" }}>
                        Batal
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </Grid>
        </Grid>
    </Box>
  )
}

export default PengisianSPT