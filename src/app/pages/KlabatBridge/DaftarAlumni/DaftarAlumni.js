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
          <SearchGlobal />
          <Select
            sx={{ borderRadius: "50px", minWidth: "150px" }}
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"namalengkap"}>Nama Lengkap</MenuItem>
            <MenuItem value={"nim"}>NIM</MenuItem>
            <MenuItem value={"prodi"}>Prodi</MenuItem>
          </Select>
          <Button
            sx={{
              backgroundColor: "#006AF5",
              borderRadius: "24px",
              color: "white",
              whiteSpace: "nowrap",
              width: "100%",

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
    </Div>
  );
};

export default DaftarAlumni;
