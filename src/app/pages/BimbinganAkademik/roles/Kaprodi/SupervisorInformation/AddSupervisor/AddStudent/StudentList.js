import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Chip,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  TableRow,
  TableCell,
  TableContainer,
  Checkbox,
  Breadcrumbs,
  experimentalStyled as styled,
  Button,
  Paper,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import Div from "@jumbo/shared/Div";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const CountStudent = ({ selected, totalStudents }) => {
  return (
    <Typography sx={{ fontSize: "16px" }}>
      You have selected {selected.length} out of {totalStudents} students
    </Typography>
  );
};

const StudentList = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const location = useLocation();
  const { students, supervisor, major } = location.state;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentFilter, setCurrentFilter] = useState("All Major");
  const [studentOptions, setStudentOptions] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(
    students?.map((data) => data.nim) || []
  );

  //search dan filter
  const [searchFilteredData, setSearchFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [originalDataStudent, setOriginalDataStudent] = useState([]);

  const getStudent = async () => {
    try {
      const response = await jwtAuthAxios.get(
        `/guidance-class/get-all-unassigned-student/list`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );
      setStudentOptions(
        response.data.data.filter((item) => item.status !== "GRADUATE")
      );
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error.response && error.response.status === 403) {
        handlePermissionError();
        setTimeout(() => {
          navigate(-1);
        }, 2000);
        return;
      } else if (error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.log("ini error: ", error);
      }
    }
  };

  useEffect(() => {
    getStudent();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setOriginalDataStudent(studentOptions);
  }, [studentOptions]);

  useEffect(() => {
    filterAndSetStudents();
  }, [search, currentFilter, originalDataStudent]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = searchFilteredData.map((item) => item.nim);
      setSelectedStudent(newSelected);
    } else {
      setSelectedStudent([]);
    }
  };

  const filterAndSetStudents = () => {
    const filteredData = originalDataStudent.filter((item) => {
      const nameMatches =
        item.firstName.toLowerCase().includes(search.toLowerCase()) ||
        item.lastName.toLowerCase().includes(search.toLowerCase());
      const nimMatches = item.nim.toLowerCase().includes(search.toLowerCase());
      const majorMatches =
        currentFilter === "All Major" || item.major === currentFilter;
      return (nameMatches || nimMatches) && majorMatches;
    });
    setSearchFilteredData(filteredData);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleFilter = (event) => {
    setCurrentFilter(event.target.value);
  };

  return (
    <Div>
      <Div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/kaprodi/supervisor-information/">
            Supervisor Information
          </StyledLink>
          <StyledLink
            state={{ supervisor: supervisor }}
            to="/bimbingan-akademik/kaprodi/supervisor-information/add-supervisor"
          >
            Add Supervisor
          </StyledLink>
          <Typography color="text.primary">Student List</Typography>
        </Breadcrumbs>
      </Div>
      <Div sx={{ paddingTop: 4, paddingBottom: 2 }}>
        <Grid
          container
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item md={6}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              List of Students
            </Typography>
          </Grid>
        </Grid>
      </Div>
      <Grid container paddingTop={1} paddingBottom={3.5} spacing={2}>
        <Grid item xs={12} sm={6} md={3.5}>
          <TextField
            size="small"
            placeholder="Search by Name or NIM"
            variant="outlined"
            id="search-field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#1C304A85" }} />
                </InputAdornment>
              ),
              style: {
                borderRadius: "65px",
              },
            }}
            sx={{
              width: "100%",
              marginBottom: { xs: 2, md: 0 },
            }}
            value={search}
            onChange={handleSearch}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            size="small"
            fullWidth
            id="outlined-select-currency"
            select
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ zIndex: -2 }}>
                  <FilterListIcon sx={{ color: "#1C304A85" }} />
                  <Typography sx={{ marginLeft: "16px", color: "#1C304A85" }}>
                    Filter:
                  </Typography>
                </InputAdornment>
              ),
              style: {
                borderRadius: "65px",
                borderColor: "#E0E0E0",
              },
            }}
            sx={{
              m: 0,
              borderRadius: "65px",
              width: "100%",
              borderColor: "#E0E0E0",
            }}
            value={currentFilter}
            onChange={handleFilter}
          >
            <Typography
              sx={{
                fontWeight: "600",
                paddingLeft: "12px",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Major
            </Typography>
            <MenuItem key={"All Major"} value={"All Major"}>
              All Major
            </MenuItem>
            <MenuItem key={"IF"} value={"IF"}>
              Informatics
            </MenuItem>
            <MenuItem key={"SI"} value={"SI"}>
              Information System
            </MenuItem>
            <MenuItem key={"DKV"} value={"DKV"}>
              Information Technology
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableContainer sx={{ maxHeight: 640 }} component={Paper}>
          <Table>
            <TableHead
              sx={{
                position: "-webkit-sticky",
                position: "sticky",
                top: 0,
                backgroundColor: "#e8ecf2",
                zIndex: 1,
              }}
            >
              <TableRow>
                <TableCell sx={{ textAlign: "center" }} padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedStudent.length > 0 &&
                      selectedStudent.length < studentOptions.length
                    }
                    checked={
                      selectedStudent.length > 0 &&
                      selectedStudent.length === studentOptions.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>No</TableCell>
                <TableCell sx={{ textAlign: "center" }}>NIM</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Student Name</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Major</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Arrival Year</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchFilteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8}>No data available</TableCell>
                </TableRow>
              ) : (
                searchFilteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableItem
                      item={item}
                      index={index}
                      key={item.nim}
                      isSelected={selectedStudent.includes(item.nim)}
                      handleClick={(i) =>
                        setSelectedStudent(
                          selectedStudent.includes(i.nim)
                            ? selectedStudent.filter((nim) => nim !== i.nim)
                            : [...selectedStudent, i.nim]
                        )
                      }
                    />
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={searchFilteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
          }}
        />
      </Grid>
      <Grid display="flex" alignItems="center" gap={4}>
        <Grid item md={4}>
          <Div sx={{ alignItems: "center" }}>
            <CountStudent
              selected={selectedStudent}
              totalStudents={studentOptions.length}
            />
          </Div>
        </Grid>
        <Grid item md={4}>
          <Link
            state={{
              students: studentOptions.filter((student) =>
                selectedStudent.includes(student.nim)
              ),
              supervisor: supervisor,
            }}
            to={`/bimbingan-akademik/kaprodi/supervisor-information/add-supervisor`}
          >
            <Button
              sx={{
                backgroundColor: "#006AF5",
                borderRadius: "24px",
                color: "white",
                whiteSpace: "nowrap",
                minWidth: "132px",
                fontSize: "12px",
                padding: "10px",
                alignItems: "center",

                "&:hover": {
                  backgroundColor: "#025ED8",
                },
              }}
            >
              Save
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Div>
  );
};

const TableItem = ({ item, index, isSelected, handleClick }) => {
  return (
    <TableRow
      onClick={() => handleClick(item)}
      role="checkbox"
      aria-checked={isSelected}
    >
      <TableCell sx={{ textAlign: "center" }} padding="checkbox">
        <Checkbox checked={isSelected} />
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{item.nim}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        {item.lastName}, {item.firstName}
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        {item.major === "IF"
          ? "Informatics"
          : item.major === "SI"
          ? "Information System"
          : item.major === "DKV"
          ? "Information Technology"
          : "-"}
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>{item.arrivalYear}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        <Chip
          label={item.status}
          variant="filled"
          color={item.status === "ACTIVE" ? "success" : "default"}
        />
      </TableCell>
    </TableRow>
  );
};

export default StudentList;
