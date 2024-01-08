import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";
import { BASE_URL_API } from "@jumbo/config/env";

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

const StudentInformationMentored = () => {
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataStudent, setDataStudent] = useState([]);
  const controller = new AbortController();
  const signal = controller.signal;
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDataStudent = async () => {
    const { guidanceClassId } = JSON.parse(localStorage.getItem("user"));
    try {
      // const { nik } = JSON.parse(localStorage.getItem("user"));
      // const result = await axios.get(`${BASE_URL_API}/student/dosen/${nik}`, {
      //   cancelToken: source.token,
      // });
      const result = await axios.get(
        `${BASE_URL_API}/guidance-class/${guidanceClassId}`,
        {
          signal,
        }
      );

      const { status, data } = result.data;

      if (status === "OK") {
        console.log("ini isi result.data dalam status ok mentored", result);
        setDataStudent(data.GuidanceClassMember);
      } else {
        console.error("error, ini data result: ", result);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => console.log("tes", dataStudent), [dataStudent]);

  useEffect(() => {
    getDataStudent();
    return () => controller.abort();
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
        <Grid item xs={12} sm={8} md={3}>
          <SearchGlobal sx={{ height: "100%" }} />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <InputLabel htmlFor="grouped-select">Filter</InputLabel>
            <Select
              sx={{ borderRadius: 50 }}
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
        <Grid item xs={12}>
          <TableContainer sx={{ maxHeight: 540 }} component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableHeading />
              </TableHead>
              <TableBody>
                {dataStudent.length > 0 &&
                  dataStudent
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
              "@media (max-width: 650px)": { justifyContent: "flex-start" },
            }}
            rowsPerPageOptions={[10, 25, 50, 100]}
            component={"div"}
            count={dataStudent.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
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

const TableItem = ({ item, index }) => {
  const navigate = useNavigate();
  const { firstName, lastName, major, arrivalYear, nim, status } = item.student;
  const role = JSON.parse(localStorage.getItem("user")).role;
  console.log("test role", role);

  const getRole = () => {
    const filter = role.includes("KAPRODI")
      ? "kaprodi"
      : role.includes("DEKAN")
      ? "dekan"
      : role.includes("OPERATOR_FAKULTAS")
      ? "sek-dekan"
      : "dosen-pembimbing";

    return filter;
  };

  const handleButtonNavigate = (event) => {
    const { name } = event.currentTarget;
    // navigate(
    //   `/bimbingan-akademik/kaprodi/student-information/mentored-student/${item.nim}`
    // );

    switch (name) {
      case "profile":
        navigate(
          `/bimbingan-akademik/${getRole()}/student-information/${nim}`,
          { state: { studentNim: nim } }
        );
        break;
      case "grade":
        navigate(
          `/bimbingan-akademik/${getRole()}/student-information/${nim}/grade`,
          { state: { studentNim: nim } }
        );
        break;
      case "certificate":
        navigate(
          `/bimbingan-akademik/${getRole()}/student-information/${nim}/certificate`
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

export default StudentInformationMentored;
