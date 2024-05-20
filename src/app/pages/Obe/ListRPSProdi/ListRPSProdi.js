import { useState } from "react";
import { useParams } from "react-router-dom";
import { Chip, TablePagination } from "@mui/material";
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
import { getRpsList } from "app/api";
import { useQuery } from "@tanstack/react-query";
import { Actions } from "./Components";
import moment from "moment";
import { convertShortMajor, getColor } from "app/utils/appHelpers";

const ListRPSProdi = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const { major } = useParams();

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

  const rpsQuery = useQuery({
    queryKey: ["rps", { major }],
    queryFn: () => getRpsList({ major }),
  });

  return (
    <div className="">
      <div className="items-center mb-10">
        <h1 className="text-3xl font-semibold">
          RANCANGAN PEMBELAJARAN SEMESTER
        </h1>
        <h2 className="text-2xl font-semibold">
          PRODI {convertShortMajor(major)}
        </h2>
      </div>

      <div className="flex flex-row items-center justify-between mt-4 mb-6">
        <h1 className="text-3xl">Daftar Rancangan Pembelajaran Semester</h1>
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
                    Dosen
                  </TableCell>
                  <TableCell align="left" style={styles.theadCell}>
                    Kode MK
                  </TableCell>
                  <TableCell align="left" style={styles.theadCell}>
                    Prodi
                  </TableCell>
                  <TableCell align="left" style={styles.theadCell}>
                    Semester
                  </TableCell>
                  <TableCell align="left" style={styles.theadCell}>
                    Direvisi
                  </TableCell>
                  <TableCell align="left" style={styles.theadCell}>
                    Status
                  </TableCell>
                  <TableCell align="left" style={styles.theadCell}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rpsQuery.data?.map((row, index) => (
                  <TableRow hover key={row.id}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">
                      {`${row.Subject.indonesiaName} / ${row.Subject.englishName}`}
                    </TableCell>
                    <TableCell align="left">
                      {`${row.teacher.firstName} ${row.teacher.lastName}`}
                    </TableCell>
                    <TableCell align="left">{row.Subject.code}</TableCell>
                    <TableCell align="left">
                      {row.Subject.Curriculum_Subject.map((item) => {
                        return convertShortMajor(item.curriculum.major);
                      }).join(" | ")}
                    </TableCell>
                    <TableCell align="left">
                      {row.Subject.Curriculum_Subject.map((item) => {
                        return item.semester;
                      }).join(" | ")}
                    </TableCell>
                    <TableCell align="left">
                      {moment(row.updatedAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="left">
                      <Chip label={row.status} color={getColor(row.status)} />
                    </TableCell>
                    <TableCell>
                      <Actions row={row} major={major} />
                    </TableCell>
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
    backgroundColor: "#006AF5",
    color: "white",
    whiteSpace: "nowrap",
  },
};

export default ListRPSProdi;
