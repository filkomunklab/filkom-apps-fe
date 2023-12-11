import {
  Paper,
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
  ListSubheader,
  InputLabel,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  TablePagination,
  Chip,
  Button,
  Breadcrumbs,
  experimentalStyled as styled,
  TableContainer,
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import SearchLocal from "app/shared/SearchLocal";
import { useNavigate, Link, useLocation } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const yearList = [
  {
    value: "2017",
    label: "2017",
  },
  {
    value: "2018",
    label: "2018",
  },
  {
    value: "2019",
    label: "2019",
  },
  {
    value: "2020",
    label: "2020",
  },
  {
    value: "2021",
    label: "2021",
  },
  {
    value: "2022",
    label: "2022",
  },
  {
    value: "2023",
    label: "2023",
  },
];

const prodiList = [
  {
    value: "informatika",
    label: "Informatika",
  },
  {
    value: "dkv",
    label: "DKV",
  },
  {
    value: "si",
    label: "SI",
  },
];

const AdvisorProfile = () => {
  const [showLabel, setShowLabel] = useState(true);
  const [pilihJurusan, setPilihJurusan] = useState("");
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [dataStudent, setDataStudent] = useState([]);
  const [dataProfile, setDataProfile] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const getProfile = async () => {
    try {
      const { nik } = location.state;
      const response = await axios.get(
        `${BASE_URL_API}/employee/profile/${nik}`
      );
      console.log("ini isi result.data", response.data.data);
      setDataProfile(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDataStudent = async () => {
    try {
      const { nik } = location.state;
      const result = await axios.get(`${BASE_URL_API}/student/dosen/${nik}`);
      const { status } = result.data;

      if (status === "OK") {
        console.log(
          "ini isi result.data dalam status ok mentored",
          result.data.data
        );
        const filteredData = result.data.data.filter(
          (item) => item.status !== "GRADUATE"
        );

        setDataStudent(result.data.data);
      } else {
        console.error("error, ini data result: ", result);
        console.error("Error, ini data result.data: ", result.data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getProfile();
    getDataStudent();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event) => {
    event.preventDefault();
    navigate(-2);
  };
  const handleUbahJurusan = (event) => {
    setPilihJurusan(event.target.value);
  };

  const handleUbahJurusanDanKlik = (event) => {
    handleUbahJurusan(event);
    handleClick(event);
    setShowLabel(false);
  };

  return (
    <Div>
      <Div
        role="presentation"
        onClick={handleClick}
        sx={{ paddingBottom: "15px" }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/kaprodi/supervisor-information/">
            Supervisor Information
          </StyledLink>
          <Typography color="text.primary">Advisor Profile</Typography>
        </Breadcrumbs>
      </Div>
      <Div>
        <Typography variant="h1" fontWeight={500} sx={{ marginBottom: "25px" }}>
          Advisor Profile
        </Typography>
        <Typography
          variant="h6"
          sx={{
            paddingBottom: "25px",
            fontSize: "14px",
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
      <Paper elevation={1} sx={{ mb: 5 }}>
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
            <Typography variant="h6" sx={textStyle}>
              {`${dataProfile.lastName}, ${dataProfile.firstName}`}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">NIDN</Typography>
            <Typography variant="h6" sx={textStyle}>
              {dataProfile.nidn}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Email</Typography>
            <Typography variant="h6" sx={textStyle}>
              {dataProfile.email}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Phone</Typography>
            <Typography variant="h6" sx={textStyle}>
              {dataProfile.phoneNum}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Major</Typography>
            <Typography variant="h6" sx={textStyle}>
              {dataProfile.major}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Address</Typography>
            <Typography variant="h6" sx={textStyle}>
              {dataProfile.Address}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        <Grid display={"flex"} alignItems={"flex-end"} item md={6} xl={4}>
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
        <Grid
          item
          xs={12}
          sm={8}
          md={12}
          xl={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <SearchLocal
            sx={{
              height: "100%",
              "@media (max-width: 390px)": {
                height: "40px",
              },
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={12}
          xl={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <InputLabel htmlFor="grouped-select">Filter</InputLabel>
            <Select
              sx={{
                borderRadius: 50,
                "@media (max-width: 390px)": {
                  height: "45px",
                },
              }}
              multiple
              value={filter}
              label="Grouping"
              renderValue={(selected) => selected.join(", ")}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: "37%",
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <ListSubheader sx={{ color: "black", fontFamily: "inherit" }}>
                Status
              </ListSubheader>
              <MenuItem value={"activeStudent"}>Active</MenuItem>
              <MenuItem value={"nonactiveStudent"}>Nonactive</MenuItem>
              <ListSubheader sx={{ color: "black", fontFamily: "inherit" }}>
                Tahun Masuk
              </ListSubheader>
              {yearList.map((item) => (
                <MenuItem
                  key={item.value}
                  value={item.value}
                  sx={{
                    backgroundColor: "#FAFAFA",
                    borderRadius: "5px",
                    margin: "5px",
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
              <Div>
                <ListSubheader sx={{ color: "black", fontFamily: "inherit" }}>
                  Prodi
                </ListSubheader>
                {prodiList.map((item) => (
                  <MenuItem
                    key={item.value}
                    onChange={(event) => console.log(event.currentTarget.value)}
                    value={item.value}
                    sx={{
                      backgroundColor: "#FAFAFA",
                      borderRadius: "5px",
                      justifyContent: "center",
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Div>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          lg={2}
          md={3}
          sm={4}
          xs={6}
          display="flex"
          alignItems="center"
        >
          {/* <Link to={`/add-supervisor/informatics`}> */}
          <Button
            onClick={() =>
              navigate(
                `/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/${location.state}/edit-student`,
                { state: location.state }
              )
            }
            sx={{
              backgroundColor: "#006AF5",
              borderRadius: "24px",
              color: "white",
              whiteSpace: "nowrap",
              minWidth: "135px",
              fontSize: "12px",
              padding: "10px",

              "&:hover": {
                backgroundColor: "#025ED8",
              },
            }}
          >
            Edit Student
          </Button>
          {/* </Link> */}
        </Grid>
        <Grid item xs={12}>
          <TableContainer
            sx={{
              maxHeight: 440,
            }}
            component={Paper}
          >
            <Table stickyHeader>
              <TableHead>
                <TableHeading />
              </TableHead>
              <TableBody>
                {Array.isArray(dataStudent) && dataStudent.length > 0 ? (
                  dataStudent
                    .filter((item) => item.status !== "GRADUATE")
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((item, index) => (
                      <TableItem item={item} index={index} key={index} />
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8}>No data available</TableCell>
                  </TableRow>
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
            count={
              dataStudent.filter((item) => item.status !== "GRADUATE").length
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </Div>
  );
};

const TableHeading = ({ index }) => {
  const style = { fontWeight: 400 };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
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

const textStyle = {
  borderWidth: 1,
  borderColor: "#00000029",
  borderStyle: "solid",
  paddingX: "24px",
  paddingY: "16px",
  borderRadius: "8px",
};

const TableItem = ({ item, index }) => {
  const navigate = useNavigate();
  const handleButtonNavigate = (event) => {
    const { name } = event.currentTarget;
    switch (name) {
      case "profile":
        navigate(
          `/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/${item.nim}/student-profile`
        );
        break;
      case "grade":
        navigate(
          `/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/${item.nim}/student-grade`
        );
        break;
      case "certificate":
        navigate(
          `/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/${item.nim}/student-certificate`
        );
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
      <TableCell sx={[rowStyle]}>{index + 1}</TableCell>
      <TableCell sx={[rowStyle]}>{item.nim}</TableCell>
      <TableCell>
        <Button
          name="profile"
          sx={{
            "@media (max-width: 650px)": { fontSize: "11px" },
            textTransform: "capitalize",
          }}
          onClick={handleButtonNavigate}
        >
          {item.lastName}, {item.firstName}
        </Button>
      </TableCell>
      <TableCell sx={[rowStyle]}>{item.major}</TableCell>
      <TableCell sx={[rowStyle]}>{item.arrival_Year}</TableCell>

      <TableCell>
        <Button
          name="grade"
          onClick={handleButtonNavigate}
          sx={{
            "@media (max-width: 650px)": { fontSize: "11px" },
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
            textTransform: "capitalize",
          }}
        >
          View Certificates
        </Button>
      </TableCell>
      <TableCell sx={[rowStyle]}>
        <Chip label={item.status} variant="filled" color={"success"} />
      </TableCell>
    </TableRow>
  );
};

export default AdvisorProfile;
