import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
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
} from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import { useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

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

const role = Boolean(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).role
  : [];

const StudentInformationFaculty = () => {
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
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
      const result = await jwtAuthAxios.get(
        `/Student`
        // {
        //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        // }
      );

      const { status, data } = result.data;

      if (status === "OK") {
        console.log("ini isi result.data dalam status ok", result.data.data);
        setDataStudent(data);
      } else {
        console.error("error, ini data result: ", result);
        console.error("Error, ini data result.data: ", result.data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getDataStudent();
  }, []);

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
      <Grid container spacing={2} sx={{ paddingBottom: 4, paddingTop: 2 }}>
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
              navigate(
                `/bimbingan-akademik/${getRole()}/student-information/faculty-student/informatics`,
                { state: { major: "IF" } }
              )
            }
          >
            <Grid container>
              <Grid item>
                <CardHeader title="Informatics Student " />
                <CardContent sx={{ position: "relative", paddingY: 0 }}>
                  <Typography variant="h3" color="#006AF5" fontSize="20px">
                    {dataStudent
                      .filter(
                        (student) =>
                          student.major === "IF" &&
                          student.status !== "GRADUATE"
                      )
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
              navigate(
                `/bimbingan-akademik/${getRole()}/student-information/faculty-student/information-system`,
                { state: { major: "SI" } }
              )
            }
          >
            <Grid container>
              <Grid item>
                <CardHeader title="Information System Student" />
                <CardContent sx={{ position: "relative", paddingY: 0 }}>
                  <Typography variant="h3" color="#006AF5" fontSize="20px">
                    {dataStudent
                      .filter(
                        (student) =>
                          student.major === "SI" &&
                          student.status !== "GRADUATE"
                      )
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
              navigate(
                `/bimbingan-akademik/${getRole()}/student-information/faculty-student/information-technology`,
                { state: { major: "DKV" } }
              )
            }
          >
            <Grid container>
              <Grid item>
                <CardHeader title="Information Technology Student " />
                <CardContent sx={{ position: "relative", paddingY: 0 }}>
                  <Typography variant="h3" color="#006AF5" fontSize="20px">
                    {dataStudent
                      .filter(
                        (student) =>
                          student.major === "DKV" &&
                          student.status !== "GRADUATE"
                      )
                      .reduce((total) => total + 1, 0)}{" "}
                    People
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid display={"flex"} alignItems={"flex-end"} item>
          <Typography
            variant="h2"
            sx={{
              // textAlign: "justify",
              "@media (max-width: 390px)": {
                fontSize: "16px",
                fontWeight: 500,
              },
            }}
          >
            Computer Science Faculty Students List
          </Typography>
        </Grid>
        <Grid sx={{ marginTop: "15px" }} item xs={12}>
          <TableContainer sx={{ maxHeight: 480 }} component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableHeading />
              </TableHead>
              <TableBody>
                {dataStudent &&
                  dataStudent
                    .filter((item) => item.status !== "GRADUATE")
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((item, index) => (
                      <TableItem item={item} index={index} key={index} />
                    ))}
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
  const style = { fontWeight: 400 };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
      <TableCell sx={{ ...style, width: "80px" }}>No</TableCell>
      <TableCell sx={{ ...style, width: "140px" }}>NIM</TableCell>
      <TableCell sx={{ ...style, width: "245px" }}>Student Name</TableCell>
      <TableCell sx={{ ...style, width: "140px" }}>Program Studi</TableCell>
      <TableCell sx={{ ...style, width: "90px" }}>Tahun Masuk</TableCell>
      <TableCell sx={{ ...style, width: "140px" }}>Nilai</TableCell>
      <TableCell sx={{ ...style, width: "140px" }}>Sertifikat</TableCell>
      <TableCell sx={{ ...style, width: "140px" }}>Status</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index }) => {
  const navigate = useNavigate();
  const { nim, firstName, lastName, major, arrivalYear, status } = item;

  const handleButtonNavigate = (event) => {
    const { name } = event.currentTarget;
    // navigate(`/bimbingan-akademik/dekan/student-information/${item.nim}`);

    switch (name) {
      case "profile":
        navigate(
          `/bimbingan-akademik/${getRole()}/student-information/faculty-student/${nim}`,
          { state: { studentNim: nim } }
        );
        break;
      case "grade":
        navigate(
          `/bimbingan-akademik/${getRole()}/student-information/faculty-student/${nim}/grade`,
          {
            state: {
              studentNim: nim,
              firstName: firstName,
              lastName: lastName,
            },
          }
        );
        break;
      case "certificate":
        navigate(
          `/bimbingan-akademik/${getRole()}/student-information/faculty-student/${nim}/certificate`,
          {
            state: {
              studentNim: nim,
              firstName: firstName,
              lastName: lastName,
            },
          }
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
