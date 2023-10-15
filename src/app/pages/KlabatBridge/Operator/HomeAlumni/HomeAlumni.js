import React, { useState } from "react";
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
} from "@mui/material";

const HomeAlumni = () => {

//   const [modalOpen, setModalOpen] = useState(false);

//   const handleOpenModal = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   const modalContent = (
//     <Div>
//       {/* Your long content goes here */}
//       {/* ... */}
//       <Typography variant="body1" sx={{lineHeight: 2.5}}>
//                 Saya yang bertanda tangan di bawah ini, bermohon untuk dapat wisuda pada semester 1 2022/2023 dengan sisa SKS yang harus diambil
//                     <Chip label={"15"} variant={"outlined"} sx={{marginX: "5px", borderRadius: "5px"}}/>
//                 sks.
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Nama Sesuai Ijazah: Shyereal Saerang
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 No. Regis: S2200131
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Tanggal Lahir: 18 Agustus 2002
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Jenis Kelamin: Perempuan
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Nomor Induk Kependudukan (NIK): 1000200381384
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Nomor Induk Mahasiswa (NIM): 10202000131
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Email: shyereal@gmail.com
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Prodi: Informatika
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Minor/Konsentrasi: -
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 No. Telp: 0812239292832
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Nama Ibu Kandung: Regina Latun
//             </Typography>
//             <Typography variant="body1" sx={{lineHeight: 2.5}}>
//                 Saya yang bertanda tangan di bawah ini, bermohon untuk dapat wisuda pada semester 1 2022/2023 dengan sisa SKS yang harus diambil
//                     <Chip label={"15"} variant={"outlined"} sx={{marginX: "5px", borderRadius: "5px"}}/>
//                 sks.
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Nama Sesuai Ijazah: Shyereal Saerang
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 No. Regis: S2200131
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Tanggal Lahir: 18 Agustus 2002
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Jenis Kelamin: Perempuan
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Nomor Induk Kependudukan (NIK): 1000200381384
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Nomor Induk Mahasiswa (NIM): 10202000131
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Email: shyereal@gmail.com
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Prodi: Informatika
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Minor/Konsentrasi: -
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 No. Telp: 0812239292832
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Nama Ibu Kandung: Regina Latun
//             </Typography>
//             <Typography variant="body1" sx={{lineHeight: 2.5}}>
//                 Saya yang bertanda tangan di bawah ini, bermohon untuk dapat wisuda pada semester 1 2022/2023 dengan sisa SKS yang harus diambil
//                     <Chip label={"15"} variant={"outlined"} sx={{marginX: "5px", borderRadius: "5px"}}/>
//                 sks.
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Nama Sesuai Ijazah: Shyereal Saerang
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 No. Regis: S2200131
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Tanggal Lahir: 18 Agustus 2002
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Jenis Kelamin: Perempuan
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Nomor Induk Kependudukan (NIK): 1000200381384
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Nomor Induk Mahasiswa (NIM): 10202000131
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Email: shyereal@gmail.com
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Prodi: Informatika
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Minor/Konsentrasi: -
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 No. Telp: 0812239292832
//             </Typography>
//             <Typography id="modal-modal-description" sx={{mt: 2}}>
//                 Nama Ibu Kandung: Regina Latun
//             </Typography>

//     </Div>
//   );

  return (
    <Div>
      <Box sx={{
        backgroundColor:"#E8EBE8", 
        height: "70px", 
        display: 'flex',
        alignItems: 'center',
        borderRadius: "5px",
        paddingLeft: "25px",
      }}>
        <Typography sx={{
          fontSize: "16px", fontWeight: 500,
        }}>
          Silahkan mengisi form Tracer Study
        </Typography>
      </Box>

      {/* test scrollable dialog */}
      {/* <Button onClick={handleOpenModal}>Open Modal</Button>
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogContent style={{ maxHeight: '1200px', overflowY: 'auto' }}>
          {modalContent}
        </DialogContent>
      </Dialog> */}
    </Div>
    
  )
}

export default HomeAlumni