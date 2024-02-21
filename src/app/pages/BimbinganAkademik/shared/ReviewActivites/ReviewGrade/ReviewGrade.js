import React, { useEffect, useState } from "react";
import Div from "@jumbo/shared/Div";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const ReviewGrade = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataWaiting, setDataWaiting] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getDataWaiting = async () => {
    try {
      const { id } = JSON.parse(localStorage.getItem("user"));

      const response = await jwtAuthAxios.get(`/employee/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      const major = response.data.data.major;
      const result = await jwtAuthAxios.get(`/transaction/list/${major}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });

      const filteredData = result.data.data.filter((item) => {
        const studentFullName = `${item.Student?.lastName}, ${item.Student?.firstName}`;
        return studentFullName
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });

      setDataWaiting(filteredData);
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
  useEffect(() => {
    getDataWaiting();
    return () => controller.abort();
  }, [searchValue]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleNavigate = async (value) => {
    try {
      const gradeDetailsResult = await jwtAuthAxios.get(
        `/transaction/submissionDetail/${value.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );
      const detail = gradeDetailsResult.data.data;
      let path = "/bimbingan-akademik/kaprodi/review-activities/grade/";
      navigate(`${path}${value.id}`, {
        state: {
          gradeDetails: {
            studentName:
              detail.Student?.lastName + " " + detail.Student?.firstName,
            supervisorName:
              detail.Student?.GuidanceClassMember?.gudianceClass?.teacher
                ?.lastName +
              " " +
              detail.Student?.GuidanceClassMember?.gudianceClass?.teacher
                ?.firstName,
            submitedDate: detail.submitedDate,
            status: detail.status,
            semester: detail.semester,
            grades: detail.Grades,
            id: detail.id,
          },
        },
      });
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

  return (
    <Div>
      <Div>
        <Typography variant="h1" sx={{ mb: 3, fontWeight: 500 }}>
          Review Grades
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "15px",
            fontWeight: 400,
            color: "rgba(27, 43, 65, 0.69)",
            textAlign: "justify",
          }}
        >
          This page contains information related to the collection of grades
          submission from your students. You can use filters to sort the list of
          students to get the information you are looking for.
        </Typography>
      </Div>
      <Grid container mb={3}>
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          xl={3}
          sx={{ marginRight: { xs: 0, sm: 2 } }}
        >
          <TextField
            label="Search by Name"
            variant="outlined"
            size="small"
            sx={{
              width: "100%",
              height: "100%",
              marginTop: "20px",
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
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead
              style={{
                position: "-webkit-sticky",
                position: "sticky",
                top: 0,
                backgroundColor: "rgba(26, 56, 96, 0.1)",
              }}
            >
              <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>Submission Date</TableCell>
                <TableCell>NIM</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Supervisor Name</TableCell>
                <TableCell>Major</TableCell>
                <TableCell>Arrival Year</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Status </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataWaiting && dataWaiting.length > 0 ? (
                dataWaiting.map((value, index) => (
                  <TableRow
                    key={value.id}
                    onClick={() => handleNavigate(value)}
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                        backgroundColor: "#338CFF21",
                        transition: "0.3s",
                        transitionTimingFunction: "ease-in-out",
                        transitionDelay: "0s",
                        transitionProperty: "all",
                      },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {new Date(value.submitedDate).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </TableCell>
                    <TableCell>{value.Student.nim}</TableCell>
                    <TableCell>
                      {value.Student.lastName}, {value.Student.firstName}
                    </TableCell>
                    <TableCell>
                      {
                        value.Student.GuidanceClassMember.gudianceClass.teacher
                          .firstName
                      }{" "}
                      {""}
                      {
                        value.Student.GuidanceClassMember.gudianceClass.teacher
                          .lastName
                      }
                    </TableCell>
                    <TableCell>
                      {value.Student.major === "IF"
                        ? "Informatics"
                        : value.Student.major === "SI"
                        ? "Information System"
                        : value.Student.major === "DKV"
                        ? "Information Technology"
                        : value.Student.major}
                    </TableCell>
                    <TableCell>{value.Student.arrivalYear}</TableCell>{" "}
                    <TableCell>{value.semester}</TableCell>
                    <TableCell
                      sx={{
                        color: "#FFCC00",
                      }}
                    >
                      {value.status.charAt(0) +
                        value.status.slice(1).toLowerCase()}
                    </TableCell>
                  </TableRow>
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
          component="div"
          count={dataWaiting.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Div>
  );
};

export default ReviewGrade;
