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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { MoreVert } from "@mui/icons-material";

const userRole = Boolean(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).role
  : [];

const SupervisorInformation = () => {
  const [role, setRole] = useState(userRole);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataSupervisor, setDataSupervisor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const getDataSupervisor = async () => {
    try {
      const response = await axios.get(`${BASE_URL_API}/guidance-class`, {
        signal,
      });
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
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else {
        console.log("Error fetching data: ", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${BASE_URL_API}//guidance-class/${id}`
      );
      console.log("hehe", response.status);
      getDataSupervisor();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else {
        console.log("Error fetching data: ", error);
      }
    }
  };

  useEffect(() => {
    getDataSupervisor();
    return () => controller.abort();
  }, [searchValue]);

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
        {/* <Grid item xs={12} sm={8} md={4} xl={3.5}>
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
        </Grid> */}
        {role.includes("KAPRODI") && (
          <Grid item xs={2} sm={2} md={2} xl={2}>
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
        )}
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
                    <TableItem
                      item={item}
                      index={index}
                      key={index}
                      handleDelete={() => handleDelete(item.id)}
                    />
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
      <TableCell sx={{ ...style, width: "140px" }}>Action</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index, handleDelete }) => {
  const navigate = useNavigate();
  const [isActionVisible, setIsActionVisible] = useState(false);
  const [anchorEl, setAnchorE1] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const { firstName, lastName, major, nidn, nik } = item.teacher;
  console.log("ini isi item.techer", item.teacher);
  const role = JSON.parse(localStorage.getItem("user")).role;
  console.log("test role", role);

  const getRole = () => {
    const filter = role.includes("KAPRODI")
      ? "kaprodi"
      : role.includes("DEKAN")
      ? "dekan"
      : "undefined";
    return filter;
  };
  console.log("ini get role", getRole);
  const handleButtonNavigate = (_, name) => {
    switch (name) {
      case "profile":
        navigate(
          `/bimbingan-akademik/${getRole()}/supervisor-information/advisor-profile/${nik}`,
          { state: { classID: item.id, nik: nik } }
        );
        break;
      case "history":
        navigate(
          `/bimbingan-akademik/${getRole()}/supervisor-information/advisor-history/${nik}`,
          { state: { classID: item.id, nik: nik, major: major, id: id } }
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
      <TableCell sx={[rowStyle]}>{nidn}</TableCell>
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
      <TableCell sx={[rowStyle]}>{item._count.GuidanceClassMember}</TableCell>
      <TableCell>
        <MoreVert
          aria-describedby={id}
          onClick={(e) => setAnchorE1(e.currentTarget)}
        />
        <Popover
          id={id}
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorE1(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Button onClick={() => handleDelete()} sx={{ color: "#CA150C" }}>
            Delete
          </Button>
        </Popover>
      </TableCell>
    </TableRow>
  );
};

export default SupervisorInformation;
