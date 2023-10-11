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
} from "@mui/material";
import ActionButton from "app/shared/ActionButton";
import SearchGlobal from "app/shared/SearchGlobal";
import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import MarkunreadIcon from "@mui/icons-material/Markunread";

const listSort = ["namalengkap", "nim", "prodi"];

const DaftarCalonTamatan = () => {
  const [sortBy, setSortBy] = useState(null);

  // for dialog box
  const [open, setOpen] = React.useState(false);

  // Align content in the center
  const cellStyle = {
    textAlign: 'center', 
  };

  const TableItem = ({ index }) => (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>Shyereal Imanuelita Saerang</TableCell>
      <TableCell>105011810011</TableCell>
      <TableCell>Sistem Informasi</TableCell>
      <TableCell>Fakultas Ilmu Komputer</TableCell>
      <TableCell>2023</TableCell>
      <TableCell>Approved</TableCell>
    </TableRow>
  );

  

  return (
    <Div>
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
        <Div sx={{ 
          display: "flex",
          direction: "row",
          gap: 3,
          }}
        >
          <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
            Calon Tamatan
          </Typography>
          <FormControl sx={{minWidth: 150}} size="small">
          <InputLabel id="demo-select-small">Tahun</InputLabel>
          <Select
            sx={{ borderRadius: "50px", minWidth: "150px"}}
            labelId="demo-select-small"
            id="demo-select-small"
            value={sortBy}
            label="Tahun"
            onChange={(event) => setSortBy(event.target.value)}
          >
            <MenuItem value={"2017"}>2017</MenuItem>
            <MenuItem value={"2018"}>2018</MenuItem>
            <MenuItem value={"2019"}>2019</MenuItem>
            <MenuItem value={"2020"}>2020</MenuItem>
            <MenuItem value={"2021"}>2021</MenuItem>
          </Select>
          </FormControl>
        </Div>
        <Div
          sx={{
            // display: "flex",
            // direction: "row",
            // alignItems: "center",
            // justifyContent: "space-between",
          }}
        >
          <SearchGlobal sx={{ minWidth: { xs: 100, md: 300 } }} />
        </Div>
      </Div>
      <TableContainer sx={{ overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >No</TableCell>
              <TableCell>Nama Lengkap</TableCell>
              <TableCell>Nim</TableCell>
              <TableCell>Nama Prodi</TableCell>
              <TableCell>Fakultas</TableCell>
              <TableCell>Tahun Lulus</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(10)].map((item, index) => (
              <TableItem index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={10} color="primary" sx={{mt:3}}/>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="outlined" color="primary" style={{ marginRight: "10px" }}>
          Batal
        </Button>
        {/* alert dialog */}
        <Div >
          <Button variant="contained" onClick={() => setOpen(true)}>
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
      </Box>
    </Div>
  );
};

export default DaftarCalonTamatan;
