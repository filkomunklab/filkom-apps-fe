import { useState } from "react";
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
import { convertShortMajor } from "app/utils/appHelpers";
import { useQuery } from "@tanstack/react-query";
import getCurriculum from "app/api/getCurriculum";
import { CircularProgress } from "@mui/material";
import NotfoundAnimation from "app/shared/NotfoundAnimation";

const EvaluasiCPL = () => {
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

  const columns = [
    { id: "no", label: "No", minWidth: 50 },
    { id: "programStudi", label: "Program Studi", minWidth: 150 },
    { id: "tahunKurikulum", label: "Tahun Kurikulum", minWidth: 120 },
    { id: "totalMK", label: "Total MK", minWidth: 100 },
    { id: "ketuaProgramStudi", label: "Ketua Program Studi", minWidth: 150 },
  ];

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const curriculumQuery = useQuery({
    queryKey: ["curriculum", { major }],
    queryFn: () => getCurriculum(major),
  });

  if (curriculumQuery.status === "pending" && !curriculumQuery.data) {
    return <CircularProgress color="info" />;
  }

  return (
    <div className="">
      <div className="flex flex-row items-center justify-between mb-12">
        <h1 className="text-3xl font-medium">
          LIST KURIKULUM FAKULTAS ILMU KOMPUTER
        </h1>
      </div>

      <div className="flex flex-row items-center justify-between mt-4 mb-6">
        <h1 className="text-3xl">List Kurikulum {convertShortMajor(major)}</h1>
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

      {curriculumQuery.data ? (
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
                  {curriculumQuery.data?.map((row, index) => (
                    <TableRow
                      hover
                      component={Link}
                      to={`/obe/evaluasi-cpl/list/${major}/${row.id}`}
                      key={row.id}
                    >
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">
                        {convertShortMajor(row.major)}
                      </TableCell>
                      <TableCell align="left">{row.year}</TableCell>
                      <TableCell align="left">
                        {row._count.Curriculum_Subject}
                      </TableCell>
                      <TableCell align="left">{`${row.headOfProgramStudy.firstName} ${row.headOfProgramStudy.lastName}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={curriculumQuery.data?.length}
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
      ) : (
        <NotfoundAnimation />
      )}
    </div>
  );
};

export default EvaluasiCPL;
