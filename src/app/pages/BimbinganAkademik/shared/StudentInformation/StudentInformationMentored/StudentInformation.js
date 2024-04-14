import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { useNavigate } from "react-router-dom";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const StudentInformationMentored = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  //search dan filter
  const [searchFilteredData, setSearchFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [resultData, setResultData] = useState([]);
  const [originalDataStudent, setOriginalDataStudent] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDataStudent = async () => {
    const { guidanceClassId } = JSON.parse(localStorage.getItem("user"));
    try {
      const result = await jwtAuthAxios.get(
        `/guidance-class/${guidanceClassId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      const { status, data } = result.data;

      if (status === "OK") {
        setResultData(data.GuidanceClassMember);
      }
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
  }, [search, filter, originalDataStudent]);

  const filterAndSetStudents = () => {
    const filteredData = originalDataStudent.filter((item) => {
      const nameMatches =
        (item.student.firstName &&
          item.student.firstName
            .toLowerCase()
            .includes(search.toLowerCase())) ||
        (item.student.lastName &&
          item.student.lastName.toLowerCase().includes(search.toLowerCase()));
      const nimMatches =
        item.student.nim &&
        item.student.nim.toLowerCase().includes(search.toLowerCase());
      const majorMatches =
        filter === "" ||
        (item.student.status && item.student.status === filter);
      return (nameMatches || nimMatches) && majorMatches;
    });

    setSearchFilteredData(filteredData);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleFilter = (event) => {
    if (event.target.value === "All Status") {
      setFilter("");
    } else {
      setFilter(event.target.value);
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
      <Grid container spacing={2}>
        <Grid display={"flex"} alignItems={"flex-end"} item md={6}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "justify",
              "@media (max-width: 390px)": {
                fontSize: "16px",
                fontWeight: 500,
              },
            }}
          >
            List of mentored students
          </Typography>
        </Grid>
      </Grid>

      <Grid container paddingTop={2} paddingBottom={3.5} spacing={2}>
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
            value={filter ? filter : "All Status"}
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
              Status
            </Typography>
            <MenuItem key={"All Status"} value={"All Status"}>
              All Status
            </MenuItem>
            <MenuItem key={"ACTIVE"} value={"ACTIVE"}>
              Active
            </MenuItem>
            <MenuItem key={"INACTIVE"} value={"INACTIVE"}>
              Inactive
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid container>
        <TableContainer sx={{ maxHeight: 540 }} component={Paper}>
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
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableItem item={item} index={index} key={index} />
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
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
          count={searchFilteredData.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Div>
  );
};

const TableHeading = ({}) => {
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
  const { firstName, lastName, major, arrivalYear, nim, status, id } =
    item.student;

  const handleButtonNavigate = (event) => {
    const { name } = event.currentTarget;

    switch (name) {
      case "profile":
        navigate(`${nim}`, {
          state: { studentNim: nim, studentId: id },
        });
        break;
      case "grade":
        navigate(`${nim}/grade`, {
          state: {
            studentNim: nim,
            firstName: firstName,
            lastName: lastName,
            studentId: id,
          },
        });
        break;
      case "certificate":
        navigate(`${nim}/certificate`, {
          state: {
            studentNim: nim,
            firstName: firstName,
            lastName: lastName,
            studentId: id,
          },
        });
        break;
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
            textTransform: "capitalize",
            width: "100%",
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

export default StudentInformationMentored;
