import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ListRPS = () => {
  const { major } = useParams();
  console.log(major);

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
    { id: "dosen", label: "Dosen", minWidth: 150 },
    { id: "kodeMK", label: "Kode MK", minWidth: 150 },
    { id: "prodi", label: "Prodi", minWidth: 150 },
    { id: "semester", label: "Semester", minWidth: 150 },
    { id: "status", label: "Status", minWidth: 150 },
    { id: "action", label: "Action", minWidth: 150 },
  ];

  function createData(
    no,
    namaMataKuliah,
    dosen,
    kodeMK,
    prodi,
    semester,
    status
  ) {
    return {
      no,
      namaMataKuliah,
      dosen,
      kodeMK,
      prodi,
      semester,
      status,
    };
  }

  const rows = [
    createData(
      1,
      "Web Programming / Pemrograman Web",
      "Andrew Tanny Liem, SSi., MT., PhD",
      "IS3155",
      "Sistem Informasi",
      "5",
      "Available"
    ),
    createData(
      2,
      "Web Programming / Pemrograman Web",
      "Andrew Tanny Liem, SSi., MT., PhD",
      "IS3155",
      "Sistem Informasi",
      "5",
      "Available"
    ),
    createData(
      3,
      "Web Programming / Pemrograman Web",
      "Andrew Tanny Liem, SSi., MT., PhD",
      "IS3155",
      "Sistem Informasi",
      "5",
      "Unvailable"
    ),
    createData(
      4,
      "Web Programming / Pemrograman Web",
      "Andrew Tanny Liem, SSi., MT., PhD",
      "IS3155",
      "Sistem Informasi",
      "5",
      "Available"
    ),
    createData(
      5,
      "Web Programming / Pemrograman Web",
      "Andrew Tanny Liem, SSi., MT., PhD",
      "IS3155",
      "Sistem Informasi",
      "5",
      "Unvailable"
    ),
    createData(
      6,
      "Web Programming / Pemrograman Web",
      "Andrew Tanny Liem, SSi., MT., PhD",
      "IS3155",
      "Sistem Informasi",
      "5",
      "Available"
    ),
    createData(
      7,
      "Web Programming / Pemrograman Web",
      "Andrew Tanny Liem, SSi., MT., PhD",
      "IS3155",
      "Sistem Informasi",
      "5",
      "Available"
    ),
    // Add more rows as needed
  ];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="">
      <div className="flex flex-col mb-12">
        <h1 className="text-3xl font-semibold">
          RANCANGAN PEMBELAJARAN SEMESTER
        </h1>
        <h2 className="text-xl font-medium">PRODI {major} - KURIKULUM 2020</h2>
      </div>

      <div className="flex flex-row items-center justify-between mt-4 mb-6">
        <h1 className="text-3xl">Daftar Rancangan Pembelajaran Semester</h1>
        <div className="flex items-center">
          <div>
            <p className="text-lg font-medium ">
              Total RPS :{" "}
              <span className="font-extrabold text-blue-800">
                {rows.length} RPS
              </span>
            </p>
          </div>
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
                              <MenuItem onClick={handleMenuClose}>
                                View
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

export default ListRPS;
