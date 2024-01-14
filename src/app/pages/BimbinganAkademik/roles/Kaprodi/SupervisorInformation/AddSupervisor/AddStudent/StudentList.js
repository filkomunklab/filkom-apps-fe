import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Chip,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  TableRow,
  TableCell,
  TableContainer,
  Checkbox,
  Breadcrumbs,
  experimentalStyled as styled,
  Button,
  Paper,
} from "@mui/material";
import SearchLocal from "app/shared/SearchLocal";
import Div from "@jumbo/shared/Div";
import { Link, useLocation } from "react-router-dom";
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
  name: `Awuy, Diany Mariska`,
  prodi: `Teknologi Informasi`,
  year: `2020`,
  status: `Active`,
  dospem: `-`,
}));

const CountStudent = ({ selected, totalStudents }) => {
  return (
    <Typography sx={{ fontSize: "16px" }}>
      You have selected {selected.length} out of {totalStudents} students
    </Typography>
  );
};

const StudentList = () => {
  const location = useLocation();
  const { students, supervisor } = location.state;
  const controller = new AbortController();
  const signal = controller.signal;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [studentOptions, setStudentOptions] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(
    students?.map((data) => data.nim) || []
  );

  const getStudent = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_API}/guidance-class/get-all-unassigned-student/list`,
        { signal }
      );

      const { status, data } = response.data;
      console.log("inii response :", response);
      if (status === "OK") {
        setStudentOptions(data.filter((item) => item.status !== "GRADUATE"));
      } else {
        console.log("ini response :", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudent();
    console.log("ini di studentlist :", location?.state);
    return () => controller.abort();
  }, []);

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
      <Div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/kaprodi/supervisor-information/">
            Supervisor Information
          </StyledLink>
          <StyledLink
            state={{ supervisor: supervisor }}
            to="/bimbingan-akademik/kaprodi/supervisor-information/add-supervisor"
          >
            Add Supervisor
          </StyledLink>
          <Typography color="text.primary">Student List</Typography>
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
              List of Students
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
        <TableContainer sx={{ maxHeight: 640 }} component={Paper}>
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
      <Grid display="flex" alignItems="center" gap={4}>
        <Grid item md={4}>
          <Div sx={{ alignItems: "center" }}>
            <CountStudent
              selected={selectedStudent}
              totalStudents={studentOptions.length}
            />
          </Div>
        </Grid>
        <Grid item md={4}>
          <Link
            state={{
              students: studentOptions.filter((student) =>
                selectedStudent.includes(student.nim)
              ),
              supervisor: supervisor,
            }}
            to={`/bimbingan-akademik/kaprodi/supervisor-information/add-supervisor`}
          >
            <Button
              sx={{
                backgroundColor: "#006AF5",
                borderRadius: "24px",
                color: "white",
                whiteSpace: "nowrap",
                minWidth: "132px",
                fontSize: "12px",
                padding: "10px",
                alignItems: "center",

                "&:hover": {
                  backgroundColor: "#025ED8",
                },
              }}
            >
              Save
            </Button>
          </Link>
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
        <Chip label={item.status} variant="filled" color="success" />
      </TableCell>
    </TableRow>
  );
};

export default StudentList;
