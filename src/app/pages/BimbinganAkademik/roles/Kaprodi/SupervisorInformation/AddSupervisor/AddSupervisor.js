import React, { useEffect, useState } from "react";
import {
  Typography,
  Breadcrumbs,
  experimentalStyled as styled,
  Grid,
  Paper,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  MenuItem,
  Chip,
  TableContainer,
  Select,
  TablePagination,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { width } from "@mui/system";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const data = Array.from(Array(15).keys()).map((item, index) => ({
  nim: `105022010000`,
  name: `Yuhu, Christopher Darell`,
  prodi: `Informatika`,
  year: `2021`,
  status: `Active`,
}));

const AddSupervisor = () => {
  const location = useLocation();
  const { students, supervisor } = location.state || [];
  const navigate = useNavigate();
  const [SupervisorOptions, setSupervisorOptions] = useState([]);
  const [supervisorNik, setSupervisorNik] = useState("");
  const [selectedSupervisor, setSelectedSupervisor] = useState(
    supervisor || undefined
  );
  const [showLabel, setShowLabel] = useState(!selectedSupervisor);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const controller = new AbortController();
  const signal = controller.signal;

  const getSupervisor = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get(
        `${BASE_URL_API}/guidance-class/get-all-unassigned-teacher/list`,
        { signal }
      );

      const { status, data } = response.data;

      if (status === "OK") {
        setSupervisorOptions(data);
        console.log("ini data", data);
      } else {
        console.log("ini response :", response);
      }
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else {
        console.log(error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        // `${BASE_URL_API}/supervisor/${supervisor.nik}/student`,
        `${BASE_URL_API}/guidance-class/create-new/${supervisor.nik}`,
        {
          studentList: students.map((item) => ({
            studentNim: item.nim,
          })),
        },
        { signal }
      );
      const { status } = response.data;
      console.log("wkwkwk", response);
      setIsLoading(false);
      if (status === "OK") {
        navigate(`/bimbingan-akademik/kaprodi/supervisor-information`);
      } else {
        console.log(response);
      }
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getSupervisor();
    console.log("ini location :", location.state);
    return () => controller.abort();
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/kaprodi/supervisor-information/">
            Supervisor Information
          </StyledLink>
          <Typography color="text.primary">Add Supervisor</Typography>
        </Breadcrumbs>
      </div>
      <Typography
        fontSize={"24px"}
        fontWeight="500"
        sx={{ marginBottom: 3, paddingTop: "20px" }}
      >
        Add Supervisor
      </Typography>
      <Paper elevation={1} sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            backgroundColor: "#1A38601A",
            fontWeight: 500,
            padding: "16px",
          }}
        >
          Academic Advisor Information
        </Typography>
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Full Name</Typography>
            <Stack>
              <TextField
                size="small"
                id="outlined-select-major"
                select
                label={showLabel && "Select"}
                onChange={(e) => {
                  setSupervisorNik(e.target.value);
                  setSelectedSupervisor(
                    SupervisorOptions.find(
                      (supervisor) => supervisor.nik === e.target.value
                    )
                  );
                  setShowLabel(false);
                  console.log("ini e", e.target.value);
                }}
                value={
                  supervisorNik ||
                  (SupervisorOptions?.length && supervisor?.nik) ||
                  ""
                }
                InputLabelProps={{
                  shrink: false,
                }}
              >
                {SupervisorOptions?.sort((a, b) =>
                  a.lastName.localeCompare(b.lastName)
                ).map((item) => (
                  <MenuItem value={item.nik || ""} key={item.id}>
                    {item.lastName}, {item.firstName}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">NIDN</Typography>
            <Paper variant="outlined" sx={{ padding: 1 }}>
              {selectedSupervisor?.nidn || "-"}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Email</Typography>
            <Paper variant="outlined" sx={{ padding: 1 }}>
              {selectedSupervisor?.email || "-"}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Phone</Typography>
            <Paper variant="outlined" sx={{ padding: 1 }}>
              {selectedSupervisor?.phoneNum || "-"}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Major</Typography>
            <Paper variant="outlined" sx={{ padding: 1 }}>
              {selectedSupervisor?.major === "IF"
                ? "Informatics"
                : selectedSupervisor?.major === "SI"
                ? "Information System"
                : selectedSupervisor?.major === "DKV"
                ? "Information Technology"
                : "-"}
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Address</Typography>
            <Paper variant="outlined" sx={{ padding: 1 }}>
              {selectedSupervisor?.Address || "-"}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        <Grid item md={9}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              margin: "12px",
            }}
          >
            List of Academic Supervisors
          </Typography>
        </Grid>
        <Grid
          item
          md={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            state={{
              supervisor: selectedSupervisor,
              students: students,
            }}
            style={{ textDecoration: "none", color: "white" }}
            // to={`${
            //   selectedSupervisor?.major === "IF"
            //     ? "informatics"
            //     : selectedSupervisor?.major === "SI"
            //     ? "information-system"
            //     : selectedSupervisor?.major === "DKV"
            //     ? "information-technology"
            //     : undefined
            // }`}
            to="student-list"
          >
            <Button
              sx={{
                backgroundColor: selectedSupervisor ? "#006AF5" : "gray",
                borderRadius: "24px",
                color: "white",
                whiteSpace: "nowrap",
                minWidth: "132px",
                fontSize: "12px",
                padding: "10px",
                gap: "6px",
                cursor: selectedSupervisor ? "pointer" : "not-allowed",

                "&:hover": {
                  backgroundColor: selectedSupervisor ? "#025ED8" : "gray",
                },
              }}
              onClick={selectedSupervisor ? null : handleClick}
            >
              <AddIcon sx={{ fontSize: "14px" }} />
              Add Student
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12}>
          <TableContainer sx={{ maxHeight: 640 }} component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableHeading />
              </TableHead>
              <TableBody>
                {students
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableItem item={item} index={index} key={item.nim} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={students?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(+event.target.value);
              setPage(0);
            }}
          />
        </Grid>
      </Grid>
      <Grid>
        <Button
          sx={{
            backgroundColor: "#006AF5",
            borderRadius: "24px",
            color: "white",
            whiteSpace: "nowrap",
            minWidth: "132px",
            fontSize: "12px",
            padding: "10px",
            margin: "20px",

            "&:hover": {
              backgroundColor: "#025ED8",
            },
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        {/* </Link> */}
      </Grid>
    </div>
  );
};

const TableHeading = () => {
  const style = { fontWeight: 400 };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
      <TableCell sx={[style]}>No</TableCell>
      <TableCell sx={[style]}>NIM</TableCell>
      <TableCell sx={[style]}>Student Name</TableCell>
      <TableCell sx={[style]}>Program Studi</TableCell>
      <TableCell sx={[style]}>Tahun Masuk</TableCell>
      <TableCell sx={[style]}>Status</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index }) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{item.nim}</TableCell>
      <TableCell>
        {item.lastName}, {item.firstName}
      </TableCell>
      <TableCell>
        {item.major === "IF"
          ? "Informatics"
          : item.major === "SI"
          ? "Information System"
          : item.major === "DKV"
          ? "Information Technology"
          : "-"}
      </TableCell>
      <TableCell>{item.arrival_Year}</TableCell>

      <TableCell>
        <Chip label={item.status} variant="filled" color={"success"} />
      </TableCell>
    </TableRow>
  );
};

export default AddSupervisor;
