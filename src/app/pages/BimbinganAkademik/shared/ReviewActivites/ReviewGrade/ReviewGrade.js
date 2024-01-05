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
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";

const ReviewGrade = () => {
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataWaiting, setDataWaiting] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const getDataWaiting = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const { id } = JSON.parse(localStorage.getItem("user"));

      const response = await axios.get(`${BASE_URL_API}/employee/${id}`, {
        headers,
      });
      const major = response.data.data.major;
      const result = await axios.get(
        `${BASE_URL_API}/transaction/list/${major}`
      );
      const filteredData = result.data.data.filter((item) => {
        const studentFullName = `${item.Student?.lastName}, ${item.Student?.firstName}`;
        return studentFullName
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });

      setDataWaiting(filteredData);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getDataWaiting();
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
      const gradeDetailsResult = await axios.get(
        `${BASE_URL_API}/transaction/submissionDetail/${value.transactionId}`
      );
      const detail = gradeDetailsResult.data.data;
      let path = "/bimbingan-akademik/history/grade";

      navigate(`${path}`, {
        state: {
          gradeDetails: {
            studentName:
              detail.Student.firstName + " " + detail.Student.lastName,
            supervisorName:
              detail.Employee.firstName + " " + detail.Employee.lastName,
            submitedDate: detail.submitDate,
            status: detail.status,
            semester: detail.semester,
            grades: detail.Grades,
          },
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Div>
      <Div>
        <Typography variant="h1" sx={{ mb: 3, fontWeight: 500 }}>
          Review Certificate
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
          This page contains information related to the collection of
          certificates from your students. You can use filters to sort the list
          of students to get the information you are looking for.
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
        {/* <Grid item xs={12} sm={4} md={4} xl={3}>
          <FormControl
            sx={{ width: "100%", height: "100%", marginTop: "20px" }}
            size="small"
          >
            <InputLabel htmlFor="grouped-select">Filter</InputLabel>
            <Select
              style={{ borderRadius: "25px" }}
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
                Category
              </ListSubheader>
              <MenuItem value={"local"}>Local</MenuItem>
              <MenuItem value={"national"}>National</MenuItem>
              <MenuItem value={"international"}>International</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
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
                      {value.Employee.firstName}
                      {value.Employee.lastName}
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
