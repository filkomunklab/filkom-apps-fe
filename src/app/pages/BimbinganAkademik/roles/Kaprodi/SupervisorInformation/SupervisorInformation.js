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
  TextField,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import { useNavigate, Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const SupervisorInformation = () => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataSupervisor, setDataSupervisor] = useState([]);
  const source = axios.CancelToken.source();
  const navigate = useNavigate();

  const getDataSupervisor = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get(
        `${BASE_URL_API}/supervisor/has-student`,
        {
          cancelToken: source.token,
        }
      );
      const { status, data } = response.data;
      const searchData = data.filter((item) => {
        const fullName =
          `${item.lastName}`.toLowerCase() && `${item.firstName}`.toLowerCase();
        const nameIDN = `${item.nidn}`.toLowerCase();
        const includesSearch =
          nameIDN.includes(searchValue.toLowerCase()) ||
          fullName.includes(searchValue.toLowerCase());
        return includesSearch;
      });
      if (status === "OK") {
        console.log("ini isi supervisor: ", response.data.data);
        setDataSupervisor(searchData);
      } else {
        console.log("ini data response: ", response);
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getDataSupervisor();
    return () => {
      source.cancel("request dibatalkan");
    };
  }, [searchValue]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Div>
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
        <Grid item md={5.5} xl={6.5}>
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
        <Grid item xs={12} sm={8} md={4} xl={3.5}>
          <TextField
            // label="Search by Name and NIDN"
            placeholder="Search by Name and NIDN"
            variant="outlined"
            size="small"
            sx={{
              width: "100%",
              height: "100%",
            }}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton edge="end">
                  <SearchIcon />
                </IconButton>
              ),
              style: { borderRadius: "25px" },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Button
            sx={{
              backgroundColor: "#006AF5",
              borderRadius: "24px",
              color: "white",
              width: "100%",
              minWidth: "132px",
              fontSize: "12px",
              height: "95%",
              "&:hover": {
                backgroundColor: "#025ED8",
              },
            }}
            onClick={() => {
              navigate(
                "/bimbingan-akademik/kaprodi/supervisor-information/add-supervisor"
              );
            }}
          >
            <AddIcon sx={{ fontSize: "14px" }} />
            Add Dosen
          </Button>
        </Grid>
      </Grid>
      <Grid xs={12} mt={3}>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableHeading />
            </TableHead>
            <TableBody>
              {dataSupervisor &&
                dataSupervisor
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableItem item={item} index={index} key={index} />
                  ))}
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
          count={dataSupervisor.length}
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
  const style = {
    fontWeight: 400,
    "@media (maxWidth: 650px)": { fontSize: "13px" },
  };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
      <TableCell sx={{ ...style, width: "80px" }}>No</TableCell>
      <TableCell sx={{ ...style, width: "120px" }}>NIDN</TableCell>
      <TableCell sx={{ ...style, width: "240px" }}>Name</TableCell>
      <TableCell sx={{ ...style, width: "140px" }}>Faculty</TableCell>
      <TableCell sx={{ ...style, width: "120px" }}>History</TableCell>
      <TableCell sx={{ ...style, width: "140px" }}>Number of Student</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index }) => {
  const navigate = useNavigate();
  const handleButtonNavigate = (event, name) => {
    switch (name) {
      case "profile":
        navigate(
          `/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/${item.nik}`,
          { state: { nik: item.nik } }
        );
        break;
      case "history":
        navigate(
          `/bimbingan-akademik/kaprodi/supervisor-information/advisor-history/${item.nik}`,
          { state: item.nik }
        );
        break;

      default:
        console.log("Path not found. isi name: ", name);
    }
  };

  const rowStyle = {
    "@media (maxWidth: 650px)": { fontSize: "11px" },
  };
  return (
    <TableRow>
      <TableCell sx={[rowStyle]}>{index + 1}</TableCell>
      <TableCell sx={[rowStyle]}>{item.nidn}</TableCell>
      <TableCell>
        <Typography
          onClick={(e) => handleButtonNavigate(e, "profile")}
          style={{
            textTransform: "capitalize",
            "@media (maxWidth: 650px)": { fontSize: "11px" },
            color: "#006AF5",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          {item.lastName}, {item.firstName}
        </Typography>
      </TableCell>
      <TableCell sx={[rowStyle]}>
        {item.major === "IF"
          ? "Informatics"
          : item.major === "SI"
          ? "Information System"
          : item.major === "DKV"
          ? "Information Technology"
          : "-"}
      </TableCell>
      <TableCell>
        <Typography
          onClick={(e) => handleButtonNavigate(e, "history")}
          style={{
            "@media (maxWidth: 650px)": { fontSize: "11px" },
            textTransform: "capitalize",
            paddingX: 0,
            color: "#006AF5",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          View History
        </Typography>
      </TableCell>
      <TableCell sx={[rowStyle]}>{item.numberOfStudent}</TableCell>
    </TableRow>
  );
};

export default SupervisorInformation;
