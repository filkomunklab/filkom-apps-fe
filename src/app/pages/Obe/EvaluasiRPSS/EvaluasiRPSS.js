import { useState } from "react";
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
import { Button, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRpsListTeacher } from "app/api";
import useUser from "app/hooks/useUser";
import { Actions } from "./Components";
import { convertShortMajor, getColor } from "app/utils/appHelpers";

const EvaluasiRPS = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
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

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const rpsQuery = useQuery({
    queryKey: ["rps", { teacherId: user.id }],
    queryFn: () => getRpsListTeacher({ teacherId: user.id }),
  });

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
                  <TableCell align="left" style={styles.thead}>
                    No
                  </TableCell>
                  <TableCell align="left" style={styles.thead}>
                    Kode MK
                  </TableCell>
                  <TableCell align="left" style={styles.thead}>
                    Semester
                  </TableCell>
                  <TableCell align="left" style={styles.thead}>
                    Program Studi
                  </TableCell>
                  <TableCell align="left" style={styles.thead}>
                    Jumlah Siswa
                  </TableCell>
                  <TableCell align="left" style={styles.thead}>
                    Status
                  </TableCell>
                  <TableCell align="left" style={styles.thead}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rpsQuery?.data?.rps?.map((row, index) => (
                  <TableRow hover key={row.id}>
                    <TableCell align="left">{index + 1}</TableCell>
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
                      {row._count.ClassStudent}
                    </TableCell>
                    <TableCell align="left">
                      <Chip label={row.status} color={getColor(row.status)} />
                    </TableCell>
                    <TableCell align="left">
                      <Actions item={row} user={user} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={rpsQuery?.data?.rps.length}
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

const styles = {
  thead: {
    backgroundColor: "#006AF5",
    color: "white",
  },
};

export default EvaluasiRPS;
