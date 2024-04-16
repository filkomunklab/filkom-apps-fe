import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Checkbox,
  Breadcrumbs,
  experimentalStyled as styled,
  Button,
  TablePagination,
  Backdrop,
  CircularProgress,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import Div from "@jumbo/shared/Div";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { handleAuthenticationError } from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const CountStudent = ({ selected, totalStudents }) => {
  return (
    <Typography sx={{ fontSize: { xs: "14px", md: "16px", xl: "16px" } }}>
      You have selected {selected.length} out of {totalStudents} students
    </Typography>
  );
};

const majorLabel = (major) => {
  switch (major) {
    case "IF":
      return "Informatics";
    case "SI":
      return "Information System";
    case "DKV":
      return "Information Technology";
    default:
      return "-";
  }
};

const EditStudent = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const location = useLocation();
  const { nik, classID, major } = location.state;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [studentOptions, setStudentOptions] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //search dan filter
  const [searchFilteredData, setSearchFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [originalDataStudent, setOriginalDataStudent] = useState([]);

  //handle error
  const handleError = (error) => {
    if (error.code === "ERR_CANCELED") {
      console.log("request canceled");
    } else if (error.response && error.response.status === 401) {
      handleAuthenticationError();
    } else {
      console.error("error: ");
    }
  };

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
      handleError(error);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await jwtAuthAxios.post(
        `/guidance-class/add-student/${classID}`,
        {
          studentList: selectedStudent.map((id) => ({
            studentId: id,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal,
        }
      );

      const { status } = response.data;
      setIsLoading(false);

      if (status === "OK") {
        navigate(
          `/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/${nik}`,
          { state: location.state }
        );
      }
    } catch (error) {
      setIsLoading(false);
      handleError(error);
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
  }, [search, filter, originalDataStudent]);

  useEffect(() => {}, [selectedStudent]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = studentOptions.map((item) => item.id);
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
      const majorMatches = filter === "" || item.major === filter;

      return (nameMatches || nimMatches) && majorMatches;
    });

    setSearchFilteredData(filteredData);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleFilter = (event) => {
    if (event.target.value === "All Major") {
      setFilter("");
    } else {
      setFilter(event.target.value);
    }
  };

  return (
    <Div>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
      <Div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/kaprodi/supervisor-information/">
            Supervisor Information
          </StyledLink>
          <StyledLink
            state={location.state}
            to={`/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/${nik}`}
          >
            Supervisor Profile
          </StyledLink>
          <Typography color="text.primary">Edit Student</Typography>
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
              List of Students Majoring in {majorLabel(major)}
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
            value={filter ? filter : "All Major"}
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
        <TableContainer
          sx={{
            maxHeight: 640,
          }}
          component={Paper}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ backgroundColor: "#e8ecf2" }}
                  padding="checkbox"
                >
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
                <TableCell
                  sx={{
                    backgroundColor: "#e8ecf2",
                    textAlign: "center",
                  }}
                >
                  No
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#e8ecf2",
                    textAlign: "center",
                  }}
                >
                  NIM
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#e8ecf2",
                    textAlign: "center",
                  }}
                >
                  Student Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#e8ecf2",
                    textAlign: "center",
                  }}
                >
                  Program Studi
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#e8ecf2",
                    textAlign: "center",
                  }}
                >
                  Tahun Masuk
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#e8ecf2",
                    textAlign: "center",
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchFilteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableItem
                    item={item}
                    index={index}
                    key={item.nim}
                    isSelected={selectedStudent.includes(item.id)}
                    handleClick={(i) =>
                      setSelectedStudent(
                        selectedStudent.includes(i.id)
                          ? selectedStudent.filter((id) => id !== i.id)
                          : [...selectedStudent, i.id]
                      )
                    }
                  />
                ))}
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
      <Grid display="flex" alignItems="center" paddingTop={2} gap={4}>
        <Grid item xs={12} md={4} xl={4}>
          <Div sx={{ alignItems: "center" }}>
            <CountStudent
              selected={selectedStudent}
              totalStudents={studentOptions.length}
            />
          </Div>
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
          <Button
            onClick={() => handleSubmit()}
            sx={{
              backgroundColor: "#006AF5",
              borderRadius: "24px",
              color: "white",
              whiteSpace: "nowrap",
              minWidth: "132px",
              fontSize: { xs: "10px", md: "12px", xl: "16px" },
              padding: "10px",
              alignItems: "center",

              "&:hover": {
                backgroundColor: "#025ED8",
              },
            }}
          >
            Save
          </Button>
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
      selected={isSelected}
    >
      <TableCell
        sx={{
          textAlign: "center",
        }}
        padding="checkbox"
      >
        <Checkbox checked={isSelected} />
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {index + 1}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {item.nim}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {item.lastName}, {item.firstName}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {majorLabel(item.major)}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        {item.arrivalYear}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "center",
        }}
      >
        <Chip
          label={item.status}
          variant="filled"
          color={item.status === "ACTIVE" ? "success" : "default"}
        />
      </TableCell>
    </TableRow>
  );
};

export default EditStudent;
