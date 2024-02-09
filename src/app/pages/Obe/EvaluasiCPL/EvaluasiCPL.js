import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/Add";
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

const EvaluasiCPL = () => {
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
    { id: "kurikulum", label: "Kurikulum", minWidth: 150 },
    { id: "totalMK", label: "Total MK", minWidth: 100 },
    { id: "programStudi", label: "Program Studi", minWidth: 150 },
    { id: "tahunKurikulum", label: "Tahun Kurikulum", minWidth: 120 },
    { id: "ketuaProgramStudi", label: "Ketua Program Studi", minWidth: 150 },
    { id: "action", label: "Action", minWidth: 50 },
  ];

  function createData(
    no,
    kurikulum,
    totalMK,
    programStudi,
    tahunKurikulum,
    ketuaProgramStudi
  ) {
    return {
      no,
      kurikulum,
      totalMK,
      programStudi,
      tahunKurikulum,
      ketuaProgramStudi,
    };
  }

  const rows = [
    createData(
      1,
      "KURIKULUM 2020",
      54,
      "Sistem Informasi",
      2020,
      "Stenly R. Pungus, MT, PhD"
    ),
    createData(
      2,
      "KURIKULUM 2018",
      27,
      "Sistem Informasi",
      2018,
      "Stenly R. Pungus, MT, PhD"
    ),
    createData(
      3,
      "KURIKULUM 2020",
      21,
      "Informatika",
      2020,
      "Green Mandias, SKom, MCs"
    ),
    createData(
      4,
      "KURIKULUM 2018",
      59,
      "Informatika",
      2018,
      "Green Mandias, SKom, MCs"
    ),
    createData(
      5,
      "KURIKULUM 2020",
      44,
      "Teknologi Informasi",
      2020,
      "Oktoverano H. Lengkong, SKom, MDs, MM"
    ),
    createData(
      6,
      "KURIKULUM 2020",
      54,
      "Sistem Informasi",
      2020,
      "Stenly R. Pungus, MT, PhD"
    ),
    createData(
      7,
      "KURIKULUM 2020",
      54,
      "Sistem Informasi",
      2020,
      "Stenly R. Pungus, MT, PhD"
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

  const handleMenuView = () => {
    const currentPath = window.location.pathname;
    window.location.href = `${currentPath}/list-rps`;
  };

  return (
    <div className="">
      <div className="flex flex-row items-center justify-between mb-12">
        <h1 className="text-3xl font-semibold">
          LIST KURIKULUM FAKULTAS ILMU KOMPUTER
        </h1>
      </div>

      <div className="flex flex-row items-center justify-between mt-4 mb-6">
        <h1 className="text-3xl">List Kurikulum PRODI</h1>
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
                        {column.id === "action" ? (
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
                              <MenuItem onClick={handleMenuView}>View</MenuItem>
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

export default EvaluasiCPL;
