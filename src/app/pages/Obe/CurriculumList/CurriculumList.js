import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Button, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function createData(
  kurikulum,
  totalMK,
  programStudi,
  tahunKurikulum,
  ketuaProgramStudi
) {
  return {
    kurikulum,
    totalMK,
    programStudi,
    tahunKurikulum,
    ketuaProgramStudi,
  };
}

const rows = [
  createData(
    "Kurikulum 2020",
    54,
    "Sistem Informasi",
    2020,
    "Stenly R. Pungus, MT, PhD"
  ),
  createData(
    "Kurikulum 2018",
    33,
    "Sistem Informasi",
    2019,
    "Stenly R. Pungus, MT, PhD"
  ),
  createData(
    "Kurikulum 2020",
    21,
    "Informatika",
    2020,
    "Green Mandias, SKom, MCs"
  ),
  createData(
    "Kurikulum 2018",
    59,
    "Informatika",
    2018,
    "Green Mandias, SKom, MCs"
  ),
  createData(
    "Kurikulum 2020",
    44,
    "Teknologi Informasi",
    2020,
    "Oktoverano H. Lengkong, SKom, MDs, MM"
  ),
  createData(
    "Kurikulum 2020",
    54,
    "Sistem Informasi",
    2020,
    "Stenly R. Pungus, MT, PhD"
  ),
  createData(
    "Kurikulum 2020",
    54,
    "Sistem Informasi",
    2020,
    "Stenly R. Pungus, MT, PhD"
  ),
];

const CurriculumList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { major } = useParams();
  console.log(major);
  console.log(open);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white w-[400px]  rounded-md">
            <div className="p-3">
              <h1 className="text-2xl font-bold">Buat Kurikulum</h1>
            </div>
            <hr />
            <div className="flex flex-col gap-3 p-3 py-6">
              <FormControl fullWidth>
                <InputLabel id="nama-kurikulum">Nama Kurikulum</InputLabel>
                <Select
                  labelId="nama-kurikulum"
                  id="nama-kurikulum"
                  label="Nama Kurikulum"
                >
                  <MenuItem value={10}>Kurikulum 2020</MenuItem>
                  <MenuItem value={20}>Kurikulum 2018</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="program-studi">Program Studi</InputLabel>
                <Select
                  labelId="program-studi"
                  id="program-studi"
                  label="Program Studi"
                >
                  <MenuItem value={10}>Sistem Informasi</MenuItem>
                  <MenuItem value={20}>Informatika</MenuItem>
                  <MenuItem value={20}>Teknologi Informasi</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="tahun-kurikulum">Tahun Kurikulum</InputLabel>
                <Select
                  labelId="tahun-kurikulum"
                  id="tahun-kurikulum"
                  label="Tahun Kurikulum"
                >
                  <MenuItem value={10}>2020</MenuItem>
                  <MenuItem value={20}>2018</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="ketua-program-studi">
                  Ketua Program Studi
                </InputLabel>
                <Select
                  labelId="ketua-program-studi"
                  id="ketua-program-studi"
                  label="Ketua Program Studi"
                >
                  <MenuItem value={10}>Green Mandias, SKom, MCs</MenuItem>
                  <MenuItem value={20}>Stenly R. Pungus, MT, PhD</MenuItem>
                  <MenuItem value={30}>
                    Oktoverano H. Lengkong, SKom, MDs, MM
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <hr />
            <div className="flex flex-row-reverse gap-3 p-3">
              <Button variant="contained">Simpan</Button>
              <Button
                variant="outlined"
                className="!border-gray-400"
                onClick={handleClose}
              >
                <span className="text-gray-400">Batal</span>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex justify-between mb-3">
        <div>
          <h1 className="text-2xl font-bold">
            LIST KURIKULUM FAKULTAS ILMU KOMPUTER
          </h1>
        </div>
        <div>
          <Button
            className="!rounded-full"
            variant="contained"
            size="large"
            color="primary"
            endIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Tambah Kurikulum
          </Button>
        </div>
      </div>
      <div className="flex justify-between mb-3">
        <div>
          <h1 className="text-2xl font-bold">List Kurikulum {major}</h1>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            className="*:!rounded-full"
            label="Cari Kurikulum"
            variant="outlined"
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </div>
      </div>
      <div className="mb-3">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                style={{ backgroundColor: "#006AF5", color: "white" }}
                className="*:!text-white"
              >
                <TableCell>No</TableCell>
                <TableCell>Kurikulum</TableCell>
                <TableCell>Total MK</TableCell>
                <TableCell>Program Studi</TableCell>
                <TableCell>Tahun Kurikulum</TableCell>
                <TableCell>Ketua Program Studi</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell>{row.kurikulum}</TableCell>
                  <TableCell>{row.totalMK}</TableCell>
                  <TableCell>{row.programStudi}</TableCell>
                  <TableCell>{row.tahunKurikulum}</TableCell>
                  <TableCell>{row.ketuaProgramStudi}</TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      className="*:!shadow-sm"
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleCloseMenu}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleCloseMenu}>
                        Lihat Mata Kuliah
                      </MenuItem>
                      <hr />
                      <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-gray-400">Showing 19 of 19</span>
        </div>
        <div className="flex gap-2">
          <div>
            <Button
              style={{ border: "2px solid" }}
              className="!rounded-full !p-0 !min-w-8 !min-h-8"
              variant="outlined"
              color="primary"
            >
              <ArrowBackIosNewIcon />
            </Button>
          </div>
          <div>
            <Button
              className="!rounded-full !p-0 !min-w-8 !min-h-8 font-bold"
              variant="contained"
              color="primary"
            >
              1
            </Button>
          </div>
          <div>
            <Button
              style={{ border: "2px solid" }}
              className="!rounded-full !p-0 !min-w-8 !min-h-8"
              variant="outlined"
              color="primary"
            >
              2
            </Button>
          </div>
          <div>
            <Button
              style={{ border: "2px solid" }}
              className="!rounded-full !p-0 !min-w-8 !min-h-8"
              variant="outlined"
              color="primary"
            >
              <ArrowForwardIosIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumList;
