import Div from "@jumbo/shared/Div";
import {
  Button,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Popover,
  Backdrop,
  CircularProgress,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { MoreVert } from "@mui/icons-material";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const userRole = Boolean(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).role
  : [];

const SupervisorInformation = () => {
  const [role, setRole] = useState(userRole);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataSupervisor, setDataSupervisor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  //search dan filter
  const [searchFilteredData, setSearchFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [originalDataSupervisor, setOriginalDataSupervisor] = useState([]);

  const getDataSupervisor = async () => {
    try {
      const response = await jwtAuthAxios.get(`/guidance-class`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      setDataSupervisor(response.data.data);
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

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);

      const response = await jwtAuthAxios.get(`/guidance-class/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        signal,
      });
      console.log("hehe", response.status);
      getDataSupervisor();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
    getDataSupervisor();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setOriginalDataSupervisor(dataSupervisor);
  }, [dataSupervisor]);

  useEffect(() => {
    filterAndSetStudents();
  }, [search, filter, originalDataSupervisor]);
  console.log("ini isi originial", originalDataSupervisor);

  const filterAndSetStudents = () => {
    const filteredData = originalDataSupervisor.filter((item) => {
      const nameMatches =
        item.teacher.firstName.toLowerCase().includes(search.toLowerCase()) ||
        item.teacher.lastName.toLowerCase().includes(search.toLowerCase());
      const nidnMatches = item.teacher.nidn
        .toLowerCase()
        .includes(search.toLowerCase());
      const majorMatches = filter === "" || item.teacher.major === filter;

      return (nameMatches || nidnMatches) && majorMatches;
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Div>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
      <Div>
        <Typography variant="h1" sx={{ mb: 3, fontWeight: 500 }}>
          Supervisor Information
        </Typography>
        <Typography
          variant="h6"
          sx={{
            paddingBottom: "30px",
            fontSize: "15px",
            fontWeight: 400,
            color: "rgba(27, 43, 65, 0.69)",
            textAlign: "justify",
          }}
        >
          Currently, you are on the Academic Supervisor Information page, here
          you can easily see all information about academic supervisors in your
          department, along with their students.
        </Typography>
      </Div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9} md={10} xl={10}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "justify",
              "@media (maxWidth: 390px)": {
                fontSize: "16px",
                fontWeight: 500,
              },
            }}
          >
            List of Academic Supervisors
          </Typography>
        </Grid>
      </Grid>

      <Grid container paddingTop={3} paddingBottom={2} spacing={2}>
        <Grid item xs={12} sm={6} md={3.5}>
          <TextField
            size="small"
            placeholder="Search by Name or NIDN"
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

      <Grid xs={12} mt={3}>
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

        <TablePagination
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            "@media (maxWidth: 650px)": { justifyContent: "flex-start" },
          }}
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={searchFilteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Div>
  );
};

const TableHeading = () => {
  return (
    <TableRow>
      <TableCell sx={{ textAlign: "center" }}>No</TableCell>
      <TableCell sx={{ textAlign: "center" }}>NIDN</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Name</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Major</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Number of Student</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index, handleDelete }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorE1] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const { firstName, lastName, major, nidn, nik } = item.teacher;
  console.log("ini isi item.techer", item.teacher);

  const handleButtonNavigate = (_, name) => {
    switch (name) {
      case "profile":
        navigate(`advisor-profile/${nik}`, {
          state: { classID: item.id, nik: nik },
        });
        break;

      default:
        console.log("Path not found. isi name: ", name);
    }
  };

  const rowStyle = {
    "@media (maxWidth: 650px)": { fontSize: "11px" },
    textAlign: "center",
  };

  return (
    <TableRow>
      <TableCell sx={[rowStyle]}>{index + 1}</TableCell>
      <TableCell sx={[rowStyle]}>{nidn}</TableCell>
      <TableCell>
        <Typography
          onClick={(e) => handleButtonNavigate(e, "profile")}
          style={{
            textTransform: "capitalize",
            "@media (maxWidth: 650px)": { fontSize: "11px" },
            color: "#006AF5",
            textAlign: "center",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          {lastName}, {firstName}
        </Typography>
      </TableCell>
      <TableCell sx={[rowStyle]}>
        {major === "IF"
          ? "Informatics"
          : major === "SI"
          ? "Information System"
          : major === "DKV"
          ? "Information Technology"
          : "-"}
      </TableCell>
      <TableCell sx={[rowStyle]}>{item._count.GuidanceClassMember}</TableCell>
    </TableRow>
  );
};

export default SupervisorInformation;
