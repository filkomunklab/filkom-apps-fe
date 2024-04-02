import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const EvaluasiRPS = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedKodeMK, setSelectedKodeMK] = useState(null);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    border: `1px solid #1C304A`,
    borderRadius: 99,
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(0),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(6)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const columns = [
    { id: "no", label: "No", minWidth: 50 },
    { id: "namaMataKuliah", label: "Nama Mata Kuliah", minWidth: 150 },
    { id: "kodeMK", label: "Kode MK", minWidth: 150 },
    { id: "semester", label: "Semester", minWidth: 150 },
    { id: "prodi", label: "Program Studi", minWidth: 150 },
    { id: "jumlahSiwwa", label: "Jumlah Siswa", minWidth: 150 },
    { id: "status", label: "Status", minWidth: 150 },
    { id: "action", label: "Action", minWidth: 150 },
  ];

  function createData(
    no,
    namaMataKuliah,
    kodeMK,
    semester,
    prodi,
    jumlahSiwwa,
    status
  ) {
    return {
      no,
      namaMataKuliah,
      kodeMK,
      semester,
      prodi,
      jumlahSiwwa,
      status,
    };
  }

  const rows = [
    createData(
      1,
      "Pemrograman Berbasis Objek",
      "TIK101",
      "5",
      "Teknik Informatika",
      40,
      "Available"
    ),
    createData(
      2,
      "Pemrograman Berbasis Web",
      "TIK102",
      "5",
      "Teknik Informatika",
      40,
      "Available"
    ),
    createData(
      3,
      "Pemrograman Berbasis Mobile",
      "TIK103",
      "5",
      "Teknik Informatika",
      40,
      "Available"
    ),
    createData(
      4,
      "Pemrograman Berbasis Desktop",
      "TIK104",
      "5",
      "Teknik Informatika",
      40,
      "Available"
    ),
    createData(
      5,
      "Pemrograman Berbasis Cloud",
      "TIK105",
      "5",
      "Teknik Informatika",
      40,
      "Available"
    ),
    createData(
      6,
      "Pemrograman Berbasis AI",
      "TIK106",
      "5",
      "Teknik Informatika",
      40,
      "Available"
    ),
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedKodeMK(event.currentTarget.getAttribute("data-kodemk"));
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedKodeMK(null);
  };

  const handleViewReport = () => {
    const currentPath = window.location.pathname;
    const newPath = `${currentPath}/reportCPMK/${selectedKodeMK}`;
    window.location.href = newPath;
  };

  return (
    <div className="">
      <div className="grid grid-cols-12 mb-10">
        <div className="col-span-9">
          <h1 className="text-lg font-semibold">
            PENILAIAN EVALUASI CAPAIAN PEMBELAJARAN MATAKULIAH
          </h1>
        </div>
        <div className="col-span-3 text-end">
          <Link to={"/obe/list-rps/create"}>
            <Button
              variant="contained"
              color="primary"
              className="!rounded-xl"
              size="large"
              endIcon={<AddIcon />}
            >
              Buat RPS
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-secondary rounded-lg p-5 flex flex-row mb-10">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="text-lg font-semibold w-40">Dosen</td>
              <td className="text-lg">: Andrew Tanny Liem, SSi., MT., PhD</td>
            </tr>
            <tr>
              <td className="text-lg font-semibold w-40">Total SKS</td>
              <td className="text-lg">: 18 SKS</td>
            </tr>
          </tbody>
        </table>

        <table className="w-full">
          <tbody>
            <tr>
              <td className="text-lg font-semibold w-40">Total Mahasiswa</td>
              <td className="text-lg">: 157 Mahasiswa</td>
            </tr>
            <tr>
              <td className="text-lg font-semibold w-40">Total Matkul</td>
              <td className="text-lg">: 6 Matakuliah</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-row items-center justify-between mt-4 mb-6">
        <h1 className="text-3xl font-medium">
          Daftar Matakuliah{" "}
          <span className="text-2xl font-normal">
            (Rancangan Pembelajaran Semester)
          </span>
        </h1>
        <div className="flex items-center">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </div>
      </div>

      <div className="w-full">
        <Paper sx={{ minWidth: "600px", overflow: "hidden" }}>
          <TableContainer sx={{ Height: "100vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="left"
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "#006AF5",
                        color: "white",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow hover key={row.no}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align="left">
                        {column.id === "status" ? (
                          <div
                            className={`${
                              row.status === "Available"
                                ? "bg-green-500 bg-opacity-30"
                                : "bg-red-500 bg-opacity-30"
                            } rounded-full text-center text-${
                              row.status === "Available" ? "green" : "red"
                            }-800`}
                          >
                            {row[column.id]}
                          </div>
                        ) : column.id === "action" ? (
                          <div>
                            <IconButton
                              aria-label="Action"
                              size="small"
                              onClick={handleMenuClick}
                              data-kodemk={row.kodeMK}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              className="*:!shadow-sm"
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleMenuClose}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              <MenuItem onClick={handleViewReport}>
                                View Report CPMK
                              </MenuItem>
                              <MenuItem onClick={handleMenuClose}>
                                Edit
                              </MenuItem>
                              <MenuItem onClick={handleMenuClose}>
                                Delete
                              </MenuItem>
                            </Menu>
                          </div>
                        ) : (
                          row[column.id]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
            labelDisplayedRows={({ from, to, count }) =>
              `Showing ${from} of ${count}`
            }
            labelRowsPerPage=""
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          />
        </Paper>
      </div>
    </div>
  );
};

export default EvaluasiRPS;
