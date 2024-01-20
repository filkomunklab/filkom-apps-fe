import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Checkbox,
  Breadcrumbs,
  experimentalStyled as styled,
  Button,
  TablePagination,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import SearchLocal from "app/shared/SearchLocal";
import Div from "@jumbo/shared/Div";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const CountStudent = ({ selected, totalStudents }) => {
  return (
    <Typography sx={{ fontSize: { xs: "14px", md: "16px", xl: "16px" } }}>
      You have selected {selected.length} out of {totalStudents} students
    </Typography>
  );
};

const EditStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nik, classID, major } = location.state;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [studentOptions, setStudentOptions] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const controller = new AbortController();
  const signal = controller.signal;

  const getStudent = async () => {
    try {
      const response = await jwtAuthAxios.get(
        `/guidance-class/get-all-unassigned-student/list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        { signal }
      );

      const { status, data } = response.data;
      console.log("inii response :", response);
      if (status === "OK") {
        const filteredStudents = data.filter(
          (item) => item.status !== "GRADUATE" && item.major === major
        );
        console.log("isi major di supervisor", major);
        setStudentOptions(filteredStudents);
        // setStudentOptions(data.filter((item) => item.status !== "GRADUATE"));
      } else {
        console.log("ini response :", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const nimList = selectedStudent.map((nim) => ({ studentNim: nim }));
      console.log("yaho", nimList);

      const response = await jwtAuthAxios.post(
        `/guidance-class/add-student/${classID}`,
        { studentList: nimList },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        { signal }
      );

      console.log("ahahaha :", response);
      const { status } = response.data;
      setIsLoading(false);
      if (status === "OK") {
        navigate(
          `/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/${nik}`,
          { state: location.state }
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.log("nnn", error);
    }
  };

  useEffect(() => {
    getStudent();
    console.log("ini location :", location?.state);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    console.log("hadeh", selectedStudent);
  }, [selectedStudent]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = studentOptions.map((item) => item.nim);
      setSelectedStudent(newSelected);
    } else {
      setSelectedStudent([]);
    }
  };

  return (
    <Div>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
      <Div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/kaprodi/supervisor-information/">
            Supervisor Information
          </StyledLink>
          <StyledLink
            state={location.state}
            to={`/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/${nik}`}
          >
            Advisor Profile
          </StyledLink>
          <Typography color="text.primary">Edit Student</Typography>
        </Breadcrumbs>
      </Div>
      <Div sx={{ paddingTop: 4, paddingBottom: 2 }}>
        <Grid
          container
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item md={6}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              List of Students Majoring in Informatics
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={5}>
            <SearchLocal
              sx={{
                height: "100%",
                "@media (max-width: 390px)": {
                  height: "40px",
                },
              }}
            />
          </Grid>
        </Grid>
      </Div>
      <Grid item xs={12}>
        <TableContainer
          sx={{
            maxHeight: 640,
          }}
          component={Paper}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
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
                <TableCell>No</TableCell>
                <TableCell>NIM</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Program Studi</TableCell>
                <TableCell>Tahun Masuk</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentOptions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableItem
                    item={item}
                    index={index}
                    key={item.nim}
                    isSelected={selectedStudent.includes(item.nim)}
                    handleClick={(i) =>
                      setSelectedStudent(
                        selectedStudent.includes(i.nim)
                          ? selectedStudent.filter((nim) => nim !== i.nim)
                          : [...selectedStudent, i.nim]
                      )
                    }
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={studentOptions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
          }}
        />
      </Grid>
      <Grid display="flex" alignItems="center" paddingTop={2} gap={4}>
        <Grid item xs={12} md={4} xl={4}>
          <Div sx={{ alignItems: "center" }}>
            <CountStudent
              selected={selectedStudent}
              totalStudents={studentOptions.length}
            />
          </Div>
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
          <Button
            onClick={() => handleSubmit()}
            sx={{
              backgroundColor: "#006AF5",
              borderRadius: "24px",
              color: "white",
              whiteSpace: "nowrap",
              minWidth: "132px",
              fontSize: { xs: "10px", md: "12px", xl: "16px" },
              padding: "10px",
              alignItems: "center",

              "&:hover": {
                backgroundColor: "#025ED8",
              },
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Div>
  );
};

const TableItem = ({ item, index, isSelected, handleClick }) => {
  return (
    <TableRow
      onClick={() => handleClick(item)}
      role="checkbox"
      aria-checked={isSelected}
      selected={isSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox checked={isSelected} />
      </TableCell>
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
      <TableCell>{item.arrivalYear}</TableCell>
      <TableCell>
        <Chip
          label={item.status}
          variant="filled"
          color={item.status === "ACTIVE" ? "success" : "default"}
        />
      </TableCell>
    </TableRow>
  );
};

export default EditStudent;
