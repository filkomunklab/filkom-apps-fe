import {
  Paper,
  Typography,
  Grid,
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
  Checkbox,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Div from "@jumbo/shared/Div";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import { useNavigate, Link, useLocation } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

// const yearList = [
//   {
//     value: "2017",
//     label: "2017",
//   },
//   {
//     value: "2018",
//     label: "2018",
//   },
//   {
//     value: "2019",
//     label: "2019",
//   },
//   {
//     value: "2020",
//     label: "2020",
//   },
//   {
//     value: "2021",
//     label: "2021",
//   },
//   {
//     value: "2022",
//     label: "2022",
//   },
//   {
//     value: "2023",
//     label: "2023",
//   },
// ];

// const prodiList = [
//   {
//     value: "informatika",
//     label: "Informatika",
//   },
//   {
//     value: "dkv",
//     label: "DKV",
//   },
//   {
//     value: "si",
//     label: "SI",
//   },
// ];

const AdvisorProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { classID, nik } = location.state;
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataProfile, setDataProfile] = useState([]);
  // const studentOptions =
  //   // dataProfile?.student.filter((item) => item.status !== "GRADUATE") ||
  //   [];
  const [studentOptions, setStudentOptions] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const controller = new AbortController();
  const signal = controller.signal;
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

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_API}/guidance-class/${classID}`,
        { signal }
      );
      console.log("ini isi result.data", response.data);

      const { status, data } = response.data;

      if (status === "OK") {
        setDataProfile(data.teacher);
        setStudentOptions(data.GuidanceClassMember);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${BASE_URL_API}/guidance-class/delete-student`,
        {
          data: { studentList: selectedStudent },
          signal,
        }
      );

      console.log("res delete: ", response);
      const { status } = response.data;
      if (status === "OK") {
        getProfile();
        setSelectedStudent([]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    console.log("ini di profile :", location.state);
    return () => controller.abort();
  }, []);

  const handleSelectAllClick = (event) => {
    console.log(event);
    if (event.target.checked) {
      const newSelected = studentOptions.map((item) => item.studentNim);
      setSelectedStudent(newSelected);
    } else {
      setSelectedStudent([]);
    }
  };

  console.log("data profile", dataProfile);
  return (
    <Div>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
      <Div role="presentation" sx={{ paddingBottom: "15px" }}>
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
              {dataProfile.major === "IF"
                ? "Informatics"
                : dataProfile.major === "SI"
                ? "Information System"
                : dataProfile.major === "DKV"
                ? "Information Technology"
                : "-"}
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
        <Grid display={"flex"} alignItems={"flex-end"} item minWidth={"100%"}>
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
        {/* <Grid
          item
          xs={12}
          sm={8}
          md={12}
          xl={6}
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
        </Grid> */}
        <Grid item display={"flex"} alignItems={"center"}>
          <Button
            onClick={() =>
              navigate(
                `/bimbingan-akademik/${getRole()}/supervisor-information/advisor-profile/${nik}/edit-student`,
                {
                  state: {
                    nik: nik,
                    classID: classID,
                    // students: dataProfile?.student.map((item) => item.nim),
                  },
                }
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
            Add Student
          </Button>
        </Grid>
        {selectedStudent.length > 0 && (
          <Grid item display={"flex"} alignItems={"center"}>
            <DeleteIcon
              sx={{
                backgroundColor: "#CA150C",
                fill: "white",
                padding: 1,
                height: 41,
                width: 41,
                borderRadius: 2,
              }}
              onClick={() => handleDelete()}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TableContainer
            sx={{
              maxHeight: 440,
            }}
            component={Paper}
          >
            <Table stickyHeader>
              <TableHead>
                {/* <TableHeading /> */}
                <TableRow sx={{ backgroundColor: "#1A38601A" }}>
                  <TableCell padding="checkbox">
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
                  <TableCell sx={{ fontWeight: 400 }}>No</TableCell>
                  <TableCell sx={{ fontWeight: 400 }}>NIM</TableCell>
                  <TableCell sx={{ fontWeight: 400 }}>Student Name</TableCell>
                  <TableCell sx={{ fontWeight: 400 }}>Program Studi</TableCell>
                  <TableCell sx={{ fontWeight: 400 }}>Tahun Masuk</TableCell>
                  <TableCell sx={{ fontWeight: 400 }}>Nilai</TableCell>
                  <TableCell sx={{ fontWeight: 400 }}>Sertifikat</TableCell>
                  <TableCell sx={{ fontWeight: 400 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentOptions.length > 0 ? (
                  studentOptions
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((item, index) => (
                      <TableItem
                        item={item}
                        index={index}
                        key={item.studentNim}
                        isSelected={selectedStudent.includes(item.studentNim)}
                        handleClick={(i) =>
                          setSelectedStudent(
                            selectedStudent.includes(i)
                              ? selectedStudent.filter((nim) => nim !== i)
                              : [...selectedStudent, i]
                          )
                        }
                      />
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
              dataProfile.student
                ? dataProfile.student.filter(
                    (item) => item.status !== "GRADUATE"
                  ).length
                : 0
            }
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
    </Div>
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

const TableItem = ({ item, index, isSelected, handleClick }) => {
  const navigate = useNavigate();
  const { arrivalYear, firstName, id, lastName, major, nim, status } =
    item.student;
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
  const handleButtonNavigate = (event) => {
    const { name } = event.currentTarget;
    switch (name) {
      case "profile":
        navigate(
          `/bimbingan-akademik/${getRole()}/supervisor-information/advisor-profile/${
            item.nim
          }/student-profile`
        );
        break;
      case "grade":
        navigate(
          `/bimbingan-akademik/${getRole()}/supervisor-information/advisor-profile/${
            item.nim
          }/student-grade`
        );
        break;
      case "certificate":
        navigate(
          `/bimbingan-akademik/${getRole()}/supervisor-information/advisor-profile/${
            item.nim
          }/student-certificate`
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
    <TableRow
      onClick={() => handleClick(nim)}
      role="checkbox"
      aria-checked={isSelected}
      selected={isSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox checked={isSelected} />
      </TableCell>
      <TableCell sx={[rowStyle]}>{index + 1}</TableCell>
      <TableCell sx={[rowStyle]}>{nim}</TableCell>
      <TableCell>
        <Button
          name="profile"
          sx={{
            "@media (max-width: 650px)": { fontSize: "11px" },
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
          : major === "DKV"
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
        <Chip label={status} variant="filled" color={"success"} />
      </TableCell>
    </TableRow>
  );
};

export default AdvisorProfile;
