import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { getRpsListTeacher } from "app/api";
import useUser from "app/hooks/useUser";
import { convertShortMajor } from "app/utils/appHelpers";

const EvaluasiCPMK = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNavigation = (id) => {
    switch (pathname) {
      case "/obe/evaluasi-matakuliah":
        navigate(`/obe/evaluasi-matakuliah/${id}`);
        break;
      case "/obe/evaluasi-mahasiswa":
        navigate(`/obe/evaluasi-mahasiswa/${id}`);
        break;
      default:
        break;
    }
  };

  const rpsQuery = useQuery({
    queryKey: ["rps", { teacherId: user.id }],
    queryFn: () => getRpsListTeacher({ teacherId: user.id }),
  });

  return (
    <div className="">
      <div className="flex flex-col mb-10">
        <h1 className="text-3xl font-semibold">
          PENILAIAN EVALUASI CAPAIAN PEMBELAJARAN MATAKULIAH
        </h1>
      </div>

      <div className="bg-secondary rounded-lg p-5 flex flex-row mb-10">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="text-lg font-semibold w-40">Dosen</td>
              <td className="text-lg">{`: ${rpsQuery?.data?.metadata?.teacher?.firstName} ${rpsQuery?.data?.metadata?.teacher?.lastName}`}</td>
            </tr>
            <tr>
              <td className="text-lg font-semibold w-40">Total SKS</td>
              <td className="text-lg">{`: ${rpsQuery?.data?.metadata?.creditsTotal} SKS`}</td>
            </tr>
          </tbody>
        </table>

        <table className="w-full">
          <tbody>
            <tr>
              <td className="text-lg font-semibold w-40">Total Mahasiswa</td>
              <td className="text-lg">{`: ${rpsQuery?.data?.metadata?.studentsTotal} Mahasiswa`}</td>
            </tr>
            <tr>
              <td className="text-lg font-semibold w-40">Total Matkul</td>
              <td className="text-lg">{`: ${rpsQuery?.data?.metadata?.rpsTotal} Matakuliah`}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-row items-center justify-between mt-4 mb-6">
        <h1 className="text-3xl font-bold">
          Daftar Matakuliah{" "}
          <span className="text-2xl font-medium">
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
                  <TableCell align="left" style={styles.theadCell}>
                    No
                  </TableCell>
                  <TableCell align="left" style={styles.theadCell}>
                    Nama Mata Kuliah
                  </TableCell>
                  <TableCell align="left" style={styles.theadCell}>
                    Kode MK
                  </TableCell>
                  <TableCell align="left" style={styles.theadCell}>
                    Semester
                  </TableCell>
                  <TableCell align="left" style={styles.theadCell}>
                    Program Studi
                  </TableCell>
                  <TableCell align="left" style={styles.theadCell}>
                    Jumlah Siswa
                  </TableCell>
                  <TableCell align="left" style={styles.theadCell}>
                    Direvisi
                  </TableCell>
                  {/* <TableCell align="left" style={styles.theadCell}>
                    Action
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rpsQuery.data?.rps
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      hover
                      key={row.id}
                      onClick={() => handleNavigation(row.id)}
                      className="hover:bg-gray-200 cursor-pointer"
                    >
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{`${row.Subject.indonesiaName}`}</TableCell>
                      <TableCell align="left">{row.Subject.code}</TableCell>
                      <TableCell align="left">
                        {row.Subject.Curriculum_Subject.map(
                          (item) => item.semester
                        ).join(" | ")}
                      </TableCell>
                      <TableCell align="left">
                        {row.Subject.Curriculum_Subject.map((item) =>
                          convertShortMajor(item.curriculum.major)
                        ).join(" | ")}
                      </TableCell>
                      <TableCell align="left">
                        <div
                          className={`rounded-full text-center text-${
                            row._count.ClassStudent === 0 ? "red-800" : "black"
                          }`}
                        >
                          {row._count.ClassStudent}
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        {moment(row.updatedAt).format("DD/MM/YYYY")}
                      </TableCell>
                      {/* <TableCell align="left">
                        <Actions row={row} />
                      </TableCell> */}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rpsQuery.data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

const styles = {
  theadCell: {
    whiteSpace: "nowrap",
    backgroundColor: "#006AF5",
    color: "white",
  },
};

export default EvaluasiCPMK;
