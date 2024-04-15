import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import { useQuery } from "@tanstack/react-query";
import { getRpsList } from "app/api";
import { convertShortMajor } from "app/utils/appHelpers";

const ListRPS = () => {
  const { major, curriculumId } = useParams();

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
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const rpsQuery = useQuery({
    queryFn: () => getRpsList({ curriculumId }),
  });

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
                {rpsQuery.data?.length} RPS
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
                {rpsQuery.data?.map((row, index) => (
                  <TableRow
                    component={Link}
                    to={`/obe/evaluasi-cpl/list/${major}/${curriculumId}/${row.id}`}
                    hover
                    key={row.id}
                  >
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">
                      {`${row.Subject.indonesiaName} ${row.Subject.englishName}`}
                    </TableCell>
                    <TableCell align="left">
                      {`${row.teacher.firstName} ${row.teacher.lastName}`}
                    </TableCell>
                    <TableCell align="left">{row.Subject.code}</TableCell>
                    <TableCell align="left">
                      {row.Subject.Curriculum_Subject.map((item) =>
                        convertShortMajor(item.curriculum.major)
                      ).join(" | ")}
                    </TableCell>
                    <TableCell align="left">
                      {row.Subject.Curriculum_Subject.map(
                        (item) => item.semester
                      ).join(" | ")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={rpsQuery.data?.length}
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
