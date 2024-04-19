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
  Breadcrumbs,
  experimentalStyled as styled,
  TableContainer,
  Paper,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { handleAuthenticationError } from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const role = Boolean(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).role
  : [];

const StudentPerMajor = () => {
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

  const location = useLocation();
  const { major } = location.state ? location.state : "";

  //pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getDataStudent = async () => {
    try {
      const response = await jwtAuthAxios.get(`/student/major/${major}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      setResultData(
        response.data.data.filter((item) => item.status !== "GRADUATE")
      );
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.error("error: ");
        return;
      }
    }
  };

  useEffect(() => {
    getDataStudent();
    return () => controller.abort();
  }, [major]);

  useEffect(() => {
    setOriginalDataStudent(resultData);
  }, [resultData]);

  useEffect(() => {
    filterAndSetStudents();
  }, [search, filter, originalDataStudent]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const filterAndSetStudents = () => {
    const filteredData = originalDataStudent.filter((item) => {
      const nameMatches =
        item.firstName.toLowerCase().includes(search.toLowerCase()) ||
        item.lastName.toLowerCase().includes(search.toLowerCase());
      const nimMatches = item.nim.toLowerCase().includes(search.toLowerCase());
      const majorMatches = filter === "" || item.status === filter;

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
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>Faculty Student</StyledLink>
          <Typography color="text.primary">
            {major === "IF"
              ? "Informatics"
              : major === "SI"
              ? "Information System"
              : major === "TI"
              ? "Information Technology"
              : "-"}{" "}
            Students List
          </Typography>
        </Breadcrumbs>
      </div>
      <Grid paddingTop={3.5} container spacing={2}>
        <Grid
          paddingBottom={1}
          display={"flex"}
          alignItems={"flex-end"}
          item
          md={6}
        >
          <Typography variant="h2" fontWeight={500}>
            {major === "IF"
              ? "Informatics"
              : major === "SI"
              ? "Information System"
              : major === "TI"
              ? "Information Technology"
              : "-"}{" "}
            Students List
          </Typography>
        </Grid>
      </Grid>

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
        <TableContainer sx={{ maxHeight: 480 }} component={Paper}>
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

const TableHeading = ({}) => {
  const style = {
    textAlign: "center",
  };
  return (
    <TableRow>
      <TableCell sx={[style]}>No</TableCell>
      <TableCell sx={[style]}>NIM</TableCell>
      <TableCell sx={[style]}>Student Name</TableCell>
      <TableCell sx={[style]}>Program Studi</TableCell>
      <TableCell sx={[style]}>Tahun Masuk</TableCell>
      <TableCell sx={[style]}>Nilai</TableCell>
      <TableCell sx={[style]}>Sertifikat</TableCell>
      <TableCell sx={[style]}>Status</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index }) => {
  const navigate = useNavigate();
  const { nim, firstName, lastName, major, arrivalYear, status, id } = item;

  const handleButtonNavigate = (event) => {
    const { name } = event.currentTarget;
    switch (name) {
      case "profile":
        navigate(`${nim}`, {
          state: { studentNim: nim, studentId: id, major },
        });
        break;
      case "grade":
        navigate(`${nim}/grade`, {
          state: {
            studentNim: nim,
            firstName: firstName,
            lastName: lastName,
            major,
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
            major,
            studentId: id,
          },
        });
        break;
    }
  };

  const rowStyle = {
    "@media (max-width: 650px)": { fontSize: "11px" },
    textAlign: "center",
  };

  return (
    <TableRow>
      <TableCell sx={[rowStyle]}>{index + 1}</TableCell>
      <TableCell sx={[rowStyle]}>{nim}</TableCell>
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
      <TableCell sx={[rowStyle]}>
        {major === "IF"
          ? "Informatics"
          : major === "SI"
          ? "Information System"
          : major === "TI"
          ? "Information Technology"
          : "-"}
      </TableCell>
      <TableCell sx={[rowStyle]}>{arrivalYear}</TableCell>

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
      <TableCell sx={[rowStyle]}>
        <Chip
          label={status}
          variant="filled"
          color={status === "ACTIVE" ? "success" : "default"}
        />
      </TableCell>
    </TableRow>
  );
};

export default StudentPerMajor;
