import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Card,
  CardHeader,
  CardContent,
  TableContainer,
  Paper,
  TextField,
  InputAdornment,
  MenuItem,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const role = Boolean(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).role
  : [];

const StudentInformationFaculty = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  //search, filter, dan sort
  const [searchFilteredData, setSearchFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [combinedFilter, setCombinedFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [resultData, setResultData] = useState([]);
  const [originalDataStudent, setOriginalDataStudent] = useState([]);

  //pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataStudent, setDataStudent] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDataStudent = async () => {
    try {
      const result = await jwtAuthAxios.get(`/Student`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      setResultData(result.data.data);
      setDataStudent(
        result.data.data.filter((item) => item.status !== "GRADUATE")
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
        return;
      }
    }
  };

  useEffect(() => {
    getDataStudent();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setOriginalDataStudent(resultData);
  }, [resultData]);

  useEffect(() => {
    filterAndSetStudents();
  }, [search, combinedFilter, originalDataStudent, sortOrder]);

  const filterAndSetStudents = () => {
    const filteredData = originalDataStudent.filter((item) => {
      const nameMatches =
        item.firstName.toLowerCase().includes(search.toLowerCase()) ||
        item.lastName.toLowerCase().includes(search.toLowerCase());
      const nimMatches = item.nim.toLowerCase().includes(search.toLowerCase());
      const combinedMatches =
        combinedFilter === "" ||
        item.status === combinedFilter ||
        item.major === combinedFilter;

      return (nameMatches || nimMatches) && combinedMatches;
    });
    // .sort((a, b) => {
    //   // Sort by entrance year
    //   const entranceYearA = a.arrivalYear;
    //   const entranceYearB = b.arrivalYear;

    //   if (sortOrder === "asc") {
    //     return entranceYearA - entranceYearB;
    //   } else {
    //     return entranceYearB - entranceYearA;
    //   }
    // });

    // .sort((a, b) => {
    //   // Sort alphabetically by last name
    //   const lastNameA = a.lastName.toLowerCase();
    //   const lastNameB = b.lastName.toLowerCase();
    //   if (lastNameA < lastNameB) return -1;
    //   if (lastNameA > lastNameB) return 1;
    //   return 0;
    // });

    const sortedData = sortData(filteredData);
    setSearchFilteredData(sortedData);

    setSearchFilteredData(filteredData);
  };

  const handleSortClick = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const sortData = (data) => {
    // Sort the data based on NIM
    return data.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.nim.localeCompare(b.nim);
      } else {
        return b.nim.localeCompare(a.nim);
      }
    });
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleFilter = (event) => {
    if (event.target.value === "Nonactive Filter") {
      setCombinedFilter("");
    } else {
      setCombinedFilter(event.target.value);
    }
  };

  return (
    <Div>
      <Div>
        <Typography variant="h1" sx={{ mb: 3, fontWeight: 500 }}>
          Student Information
        </Typography>
        <Typography
          variant="h6"
          sx={{
            paddingBottom: "25px",
            fontSize: "15px",
            fontWeight: 400,
            color: "rgba(27, 43, 65, 0.69)",
            textAlign: "justify",
          }}
        >
          Currently, you are on the Student Information page, where you can
          easily view all information about your mentored students, including
          the number, status, and other detailed and comprehensive information.
        </Typography>
      </Div>
      <Grid container spacing={2} sx={{ paddingBottom: 3 }}>
        <Grid item sm={12} md={4} lg={4} xs={12}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#E5F0FF",
              },
            }}
            onClick={() =>
              navigate(`informatics`, {
                state: { major: "IF" },
              })
            }
          >
            <Grid container>
              <Grid item>
                <CardHeader title="Informatics Student " />
                <CardContent sx={{ position: "relative", paddingY: 0 }}>
                  <Typography variant="h3" color="#006AF5" fontSize="20px">
                    {dataStudent
                      .filter((student) => student.major === "IF")
                      .reduce((total) => total + 1, 0)}{" "}
                    People
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item sm={12} md={4} lg={4} xs={12}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#E5F0FF",
              },
            }}
            onClick={() =>
              navigate(`information-system`, {
                state: { major: "SI" },
              })
            }
          >
            <Grid container>
              <Grid item>
                <CardHeader title="Information System Student" />
                <CardContent sx={{ position: "relative", paddingY: 0 }}>
                  <Typography variant="h3" color="#006AF5" fontSize="20px">
                    {dataStudent
                      .filter((student) => student.major === "SI")
                      .reduce((total) => total + 1, 0)}{" "}
                    People
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item sm={12} md={4} lg={4} xs={12}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#E5F0FF",
              },
            }}
            onClick={() =>
              navigate(`information-technology`, {
                state: { major: "DKV" },
              })
            }
          >
            <Grid container>
              <Grid item>
                <CardHeader title="Information Technology Student " />
                <CardContent sx={{ position: "relative", paddingY: 0 }}>
                  <Typography variant="h3" color="#006AF5" fontSize="20px">
                    {dataStudent
                      .filter((student) => student.major === "DKV")
                      .reduce((total) => total + 1, 0)}{" "}
                    People
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Grid item pt={1} xs={12} pb={2}>
        <Typography
          variant="h2"
          sx={{
            "@media (max-width: 390px)": {
              fontSize: "16px",
              fontWeight: 500,
            },
          }}
        >
          Computer Science Faculty Students List
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
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
            // value={search}
            // onChange={handleSearch}
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
            value={combinedFilter ? combinedFilter : "Nonactive Filter"}
            onChange={handleFilter}
          >
            <MenuItem key={"Nonactive Filter"} value={"Nonactive Filter"}>
              Nonactive Filter
            </MenuItem>
            <Typography
              sx={{
                fontWeight: "600",
                paddingLeft: "12px",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Status
            </Typography>
            <MenuItem key={"ACTIVE"} value={"ACTIVE"}>
              Active
            </MenuItem>
            <MenuItem key={"INACTIVE"} value={"INACTIVE"}>
              Inactive
            </MenuItem>{" "}
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

        <Grid item xs={4}>
          <IconButton
            onClick={handleSortClick}
            sx={{
              borderColor: "#d3d5d8fa",
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "30px",
              width: "45px",
              color: "#1C304A85",
              "&:hover": {
                borderColor: "black",
                backgroundColor: "transparent",
              },
              height: "38px",
            }}
          >
            <SwapVertIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid sx={{ marginTop: "30px" }} item xs={12}>
        <TableContainer component={Paper}>
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
              <TableHeading />
            </TableHead>
            <TableBody>
              {searchFilteredData && searchFilteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8}>No data available</TableCell>
                </TableRow>
              ) : (
                searchFilteredData
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map((item, index) => (
                    <TableItem
                      item={item}
                      index={index + page * rowsPerPage}
                      key={index}
                    />
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <TablePagination
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            "@media (max-width: 650px)": { justifyContent: "flex-start" },
          }}
          rowsPerPageOptions={[10, 25, 50, 100]}
          component={"div"}
          count={searchFilteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Div>
  );
};

const getRole = () => {
  const filter = role.includes("KAPRODI")
    ? "kaprodi"
    : role.includes("DEKAN")
    ? "dekan"
    : role.includes("OPERATOR_FAKULTAS")
    ? "sekretaris"
    : "dosen-pembimbing";

  return filter;
};

const TableHeading = ({ index }) => {
  return (
    <TableRow>
      <TableCell sx={{ textAlign: "center" }}>No</TableCell>
      <TableCell sx={{ textAlign: "center" }}>NIM</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Student Name</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Major</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Arrival Year</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Grade</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Certificate</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index }) => {
  const navigate = useNavigate();
  const { nim, firstName, lastName, major, arrivalYear, status } = item;

  const handleButtonNavigate = (event) => {
    const { name } = event.currentTarget;

    switch (name) {
      case "profile":
        navigate(`${nim}`, { state: { studentNim: nim } });
        break;
      case "grade":
        navigate(`${nim}/grade`, {
          state: {
            studentNim: nim,
            firstName: firstName,
            lastName: lastName,
          },
        });
        break;
      case "certificate":
        navigate(`${nim}/certificate`, {
          state: {
            studentNim: nim,
            firstName: firstName,
            lastName: lastName,
          },
        });
        break;

      default:
        console.log("Path not found");
    }
  };

  const rowStyle = {
    "@media (max-width: 650px)": { fontSize: "11px" },
  };

  return (
    <TableRow>
      <TableCell sx={[rowStyle, { textAlign: "center" }]}>
        {index + 1}
      </TableCell>
      <TableCell sx={[rowStyle, { textAlign: "center" }]}>{nim}</TableCell>
      <TableCell>
        <Button
          name="profile"
          sx={{
            "@media (max-width: 650px)": { fontSize: "11px" },
            width: "100%",
            textTransform: "capitalize",
          }}
          onClick={handleButtonNavigate}
        >
          {lastName}, {firstName}
        </Button>
      </TableCell>
      <TableCell sx={[rowStyle, { textAlign: "center" }]}>
        {major === "IF"
          ? "Informatics"
          : major === "SI"
          ? "Information System"
          : major === "DKV"
          ? "Information Technology"
          : "-"}
      </TableCell>
      <TableCell sx={[rowStyle, { textAlign: "center" }]}>
        {arrivalYear}
      </TableCell>
      <TableCell>
        <Button
          name="grade"
          onClick={handleButtonNavigate}
          sx={{
            "@media (max-width: 650px)": { fontSize: "11px" },
            width: "100%",
            textTransform: "capitalize",
          }}
        >
          View Grades
        </Button>
      </TableCell>
      <TableCell>
        <Button
          name="certificate"
          onClick={handleButtonNavigate}
          sx={{
            "@media (max-width: 650px)": { fontSize: "11px" },
            width: "100%",
            textTransform: "capitalize",
          }}
        >
          View Certificates
        </Button>
      </TableCell>
      <TableCell sx={[rowStyle, { textAlign: "center" }]}>
        <Chip
          label={status}
          variant="filled"
          color={status === "ACTIVE" ? "success" : "default"}
        />
      </TableCell>
    </TableRow>
  );
};

export default StudentInformationFaculty;
