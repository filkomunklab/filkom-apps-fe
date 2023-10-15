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
  Grid,
} from "@mui/material";
import ActionButton from "app/shared/ActionButton";
import SearchGlobal from "app/shared/SearchGlobal";
import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import MarkunreadIcon from "@mui/icons-material/Markunread";

const listSort = ["namalengkap", "nim", "prodi"];

const DaftarAlumni = () => {
  const [sortBy, setSortBy] = useState(null);

  const TableItem = ({ index }) => (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>Shyereal </TableCell>
      <TableCell>105011810011</TableCell>
      <TableCell>Sistem Informasi</TableCell>
      <TableCell>Fakultas Ilmu Komputer</TableCell>
      <TableCell>2023</TableCell>
      <TableCell>Belum Bengisi kuesioner</TableCell>
      <TableCell>
        <Button>
          <CreateIcon />
        </Button>
        <Button>
          <MarkunreadIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
  return (
    <Div>
      <Div
        sx={{
          display: "flex",
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
          Daftar Alumni
        </Typography>
        <Div
          sx={{
            display: "flex",
            direction: "row",
            gap: 3,
            alignItems: "center",
          }}
        >
          <SearchGlobal sx={{ minWidth: { xs: 100, md: 300 } }} />
          <FormControl sx={{minWidth: 150}} size="small">
              <InputLabel id="demo-select-small">Sort by</InputLabel>
              <Select
                sx={{ borderRadius: "50px", minWidth: "150px"}}
                labelId="demo-select-small"
                id="demo-select-small"
                value={sortBy}
                label="Sort by"
                onChange={(event) => setSortBy(event.target.value)}
              >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={"Nama"}>Nama</MenuItem>
                <MenuItem value={"Fakultas"}>Fakultas</MenuItem>
                <MenuItem value={"Prodi"}>Prodi</MenuItem>
                <MenuItem value={"NIM"}>NIM</MenuItem>
                <MenuItem value={"Tahun Lulus"}>Tahun Lulus</MenuItem>
              </Select>
            </FormControl>
            <Button
                sx={{
                backgroundColor: "#006AF5",
                borderRadius: "24px",
                color: "white",
                whiteSpace: "nowrap",
                width: "100%",
                pr:3,
                pl:3,

                "&:hover": {
                    backgroundColor: "#006AF5",
                },
                }}
            >
                + Import Data
            </Button>
        </Div>
      </Div>
      <TableContainer sx={{ overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama Lengkap</TableCell>
              <TableCell>Nim</TableCell>
              <TableCell>Nama Prodi</TableCell>
              <TableCell>Fakultas</TableCell>
              <TableCell>Tahun Lulus</TableCell>
              <TableCell>Status</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(10)].map((item, index) => (
              <TableItem index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="flex-end" >
        <Grid item>
          {/* Content you want to position on the right side */}
          <Pagination count={10} color="primary" sx={{marginY:5}}/>
        </Grid>
      </Grid>
    </Div>
  );
};

export default DaftarAlumni;
