import Div from "@jumbo/shared/Div";
import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  FormControl,
  InputLabel,
  Pagination,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Box,
  Modal,
  TextField,
  Chip,
  Grid,
  Paper,
  Divider, 
  FormControlLabel,
  Checkbox,
  ListSubheader,
} from "@mui/material";
import ActionButton from "app/shared/ActionButton";
import SearchGlobal from "app/shared/SearchGlobal";
import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import MarkunreadIcon from "@mui/icons-material/Markunread";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const rows = [
  { id: 1, name: 'Row 1', mk: 'Robotics', sks: '3', keterangan: 'Summer 2023' },
  { id: 2, name: 'Row 2', mk: 'Research Project 2', sks: '3', keterangan: 'Summer 2023' },
  { id: 3, name: 'Row 3', mk: 'Machine Learning', sks: '3', keterangan: 'Semester 1 2023/2024' },
  { id: 4, name: 'Row 4', mk: 'ITPM', sks: '3', keterangan: 'Semester 1 2023/2024' },
  { id: 5, name: 'Row 5', mk: 'DevOps', sks: '3', keterangan: 'Semester 1 2023/2024' },
  { id: 6, name: 'Row 6', mk: 'Internet of Things', sks: '3', keterangan: 'Semester 1 2023/2024' },
  // Add more rows as needed
];

const DaftarCalonTamatan = () => {
  // sort by year
  const [sortBy, setSortBy] = useState(null);

  // dialog box to send data calon tamatan to operator
  const [open, setOpen] = React.useState(false);

  // dialog box to accept student's SPT
  const [terimaSPT, setTerimaSPT] = React.useState(false);

  // open modal box to see form SPT of student
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  // modal content to see student's SPT 
  const viewDetailSPT = (
    <Div>
      <Typography id="modal-modal-title" mb={2} sx={{ fontSize: "24px", fontWeight: 500, }}>
          Surat Permohonan Tamat
      </Typography>
      <Box sx={{paddingX: 5}}>
        <Typography variant="body1" sx={{lineHeight: 2.5}}>
            Saya yang bertanda tangan di bawah ini, bermohon untuk dapat wisuda pada semester 1 2022/2023 dengan sisa SKS yang harus diambil
                <Chip label={"15"} variant={"outlined"} sx={{marginX: "5px", borderRadius: "5px"}}/>
            sks.
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            Nama Sesuai Ijazah: Shyereal Saerang
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            No. Regis: S2200131
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            Tanggal Lahir: 18 Agustus 2002
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            Jenis Kelamin: Perempuan
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            Nomor Induk Kependudukan (NIK): 1000200381384
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            Nomor Induk Mahasiswa (NIM): 10202000131
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            Email: shyereal@gmail.com
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            Prodi: Informatika
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            Minor/Konsentrasi: -
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            No. Telp: 0812239292832
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
            Nama Ibu Kandung: Regina Latun
        </Typography>


        {/* table */}
        <Typography mt={5} sx={{ fontSize: "24px", fontWeight: 500, }}>
            Sisa mata kuliah yang harus diambil:
        </Typography>
        <Box sx={{marginY:2}}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                      <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell sx={{ width: '10px' }}>No.</TableCell>
                          <TableCell sx={{ width: '300px' }}>Mata kuliah</TableCell>
                          <TableCell sx={{ width: '200px' }}>SKS</TableCell>
                          <TableCell sx={{ width: '400px' }}>Keterangan</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                      <TableRow key={row.id}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.mk}</TableCell>
                          <TableCell>{row.sks}</TableCell>
                          <TableCell>{row.keterangan}</TableCell>
                      </TableRow>
                      ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

        <Div sx={{
            display: "flex",
            direction: "row",
            justifyContent: "space-between",
            marginTop:'30px',
        }}>
          {/* upload pdf sertifikat */}
          <Div
            sx={{
                // display: 'flex',
                // flexWrap: 'wrap',
                '& > :not(style)': {
                    width: 245,
                    height: 130,
                    backgroundColor:'red',
                },
            }}
          >
            <Paper elevation={3}/>
          </Div>

          {/* total sks */}
          <Typography variant="body1" sx={{lineHeight: 2.5}}>
            Total SKS yang diambil: 15 sks.
          </Typography>
        </Div>
        
        <Divider sx={{ marginY: 3 }} />
        
        <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" color="primary" onClick={() => setModalOpen(false)} style={{ marginRight: "10px" }}>
              Tolak
            </Button>
            <Div >
                <Button variant="contained" onClick={() => setTerimaSPT(true)}>
                  Terima
                </Button>
                <Dialog
                    open={terimaSPT}
                    onClose={() => {
                      setTerimaSPT(false);
                      setModalOpen(false);
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Berhasil!"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Data berhasil ditambahkan
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                        onClick={() => {
                          setTerimaSPT(false);
                          setModalOpen(false);
                        }} 
                        autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Div>
        </Box>

      </Box>
    </Div>
  );

  // table data (temporary)
  const TableItem = ({ index }) => (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Button 
          variant="text" 
          color="primary"
          onClick={handleOpenModal}
          sx={{
            color:'black',
            '&:hover': {
            color: '#4C5EFF', // Change background color on hover
            },
          }}>
          Shyereal Imanuelita Saerang
        </Button>
      </TableCell>
      <TableCell>105011810011</TableCell>
      <TableCell>Fakultas Ilmu Komputer</TableCell>
      <TableCell>Sistem Informasi</TableCell>
      <TableCell>Semester I 2023/2024</TableCell>
      <TableCell>Waiting</TableCell>
      <TableCell>Waiting</TableCell>
    </TableRow>
  );

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
 
    // sisa total sks
    const sisaSKS = 15;
  

  return (
    <Box
      // p={8}
      // sx={{
      //     backgroundColor: 'white',
      //     borderRadius: 5,
      //     boxShadow: 3,
      // }}
    >
      <Div
        sx={{
          display: "flex",
          direction: "row",
          justifyContent: "space-between",
          gap: 3,
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
          Calon Tamatan
        </Typography>
        <FormControl sx={{minWidth: 200}} size="small">
          <InputLabel htmlFor="grouped-select">Filter</InputLabel>
          <Select 
            defaultValue="" 
            id="grouped-select" 
            label="Filter"
            sx={{borderRadius: 10, maxHeight: '50px'}}
            // value={filter}
            // onChange={handleChange}
          >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <ListSubheader sx={{color: "#192739F0"}}>Status by Faculty</ListSubheader>
            <MenuItem value={"f-Approved"}>Approved</MenuItem>
            <MenuItem value={"f-Waiting"}>Waiting</MenuItem>
            <MenuItem value={"f-Rejected"}>Rejected</MenuItem>
            <ListSubheader sx={{color: "#192739F0"}}>Status by Registar</ListSubheader>
            <MenuItem value={"r-Approved"}>Approved</MenuItem>
            <MenuItem value={"r-Waiting"}>Waiting</MenuItem>
            <MenuItem value={"r-Rejected"}>Rejected</MenuItem>
            <ListSubheader sx={{color: "#192739F0"}}>Rencana Tamat</ListSubheader>
            <MenuItem value={"Semester I 2023/2024"}>Semester I 2023/2024</MenuItem>
            <MenuItem value={"Semester II 2023/2024"}>Semester II 2023/2024</MenuItem>
          </Select>
        </FormControl>
      </Div>

      <TableContainer component={Paper} sx={{ overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5'}}>
              <TableCell >No</TableCell>
              <TableCell>Nama Lengkap</TableCell>
              <TableCell>Nim</TableCell>
              <TableCell>Fakultas</TableCell>
              <TableCell>Program Studi</TableCell>
              <TableCell>Rencana Tamat</TableCell>
              <TableCell>Approved by Faculty</TableCell>
              <TableCell>Approved by Registar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(10)].map((item, index) => (
              <TableItem index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* modal box */}
      {/* <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ maxHeight: '800px', overflowY: 'auto' }}
      >
        {viewDetailSPT}
      </Modal> */}
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="lg" fullWidth>
        <DialogContent style={{ maxHeight: '1200px', overflowY: 'auto' }}>
          {viewDetailSPT}
        </DialogContent>
      </Dialog>

      {/* below the table Data Calon Tamatan */}
      <Grid container justifyContent="flex-end" >
        <Grid item>
          {/* Content you want to position on the right side */}
          <Pagination count={10} color="primary" sx={{marginY:5}}/>
        </Grid>
      </Grid>

      {/* <Box display="flex" justifyContent="flex-end">
        <Button variant="outlined" color="primary" style={{ marginRight: "10px" }}>
          Batal
        </Button>
        
        <Div >
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Kirim
          </Button>
          <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
                {"Kirim Data SPT?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Data ini akan dikirim ke fakultas dan operator
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Batal</Button>
                <Button onClick={() => setOpen(false)} autoFocus>
                    Kirim
                </Button>
            </DialogActions>
          </Dialog>
        </Div>
      </Box> */}
    </Box>
  );
};

export default DaftarCalonTamatan;
