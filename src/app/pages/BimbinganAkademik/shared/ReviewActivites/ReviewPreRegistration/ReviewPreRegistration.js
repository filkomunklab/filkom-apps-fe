import Div from "@jumbo/shared/Div";
import {
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { handleAuthenticationError } from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const ReviewPreRegistration = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const [dataWaiting, setDataWaiting] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getDataWaiting = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const result = await jwtAuthAxios.get(
        `/pre-regist/review/${user.guidanceClassId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );
      const filteredData = result.data.data.filter((item) => {
        const studentFullName =
          `${item.Student?.lastName}, ${item.Student?.firstName}`.toLowerCase();
        const includesSearch = studentFullName.includes(
          searchValue.toLowerCase()
        );
        return includesSearch;
      });
      setDataWaiting(filteredData);
    } catch (error) {
      if (error && error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error && error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.error("error: ");
        return;
      }
    }
  };

  useEffect(() => {
    getDataWaiting();
  }, [searchValue]);

  const handleNavigate = async (value) => {
    try {
      const preregisDetailsResult = await jwtAuthAxios.get(
        `/pre-regist/details/${value.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );
      const detail = preregisDetailsResult.data.data;
      const { role } = JSON.parse(localStorage.getItem("user"));
      let path = "";
      if (role.includes("DEKAN")) {
        path = "/bimbingan-akademik/dekan/review-activities/pre-registration/";
      } else if (role.includes("KAPRODI")) {
        path =
          "/bimbingan-akademik/kaprodi/review-activities/pre-registration/";
      } else {
        path =
          "/bimbingan-akademik/dosen-pembimbing/review-activities/pre-registration/";
      }
      navigate(`${path}${value.id}`, {
        state: {
          preregisDetails: {
            id: detail.id,
            studentName:
              detail.Student?.lastName + ", " + detail.Student?.firstName,
            supervisorName:
              detail.Employee?.firstName + " " + detail.Employee?.lastName,
            submitDate: detail.submitDate,
            status: detail.status,
            listSubjectPreregis: detail.ListOfRequest,
            curriculum: detail.Student?.curriculum,
            totalCredits: value.totalCredits,
          },
        },
      });
    } catch (error) {
      if (error && error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error && error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.error("error: ");
        return;
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Div>
      <Div>
        <Typography variant="h1" sx={{ mb: 3, fontWeight: 500 }}>
          Review Pre-Registration
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
          This page contains information related to filling out the Student
          Study Plan Card, especially for students under your guidance. You can
          use filters to sort the list of students to get the information you
          are looking for.
        </Typography>
      </Div>

      <Grid container mb={4}>
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
              sx={{
                position: "-webkit-sticky",
                position: "sticky",
                top: 0,
                backgroundColor: "rgba(26, 56, 96, 0.1)",
                zIndex: 1,
              }}
            >
              <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>NIM</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Major</TableCell>
                <TableCell>Arrival Year</TableCell>
                <TableCell>Pre-registration Status</TableCell>
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
                    <TableCell>{value.Student?.nim}</TableCell>
                    <TableCell>
                      {value.Student?.lastName}, {value.Student?.firstName}
                    </TableCell>
                    <TableCell>{value.Student?.major}</TableCell>
                    <TableCell>{value.Student?.arrivalYear}</TableCell>
                    <TableCell
                      sx={{
                        color: "#FFCC00",

                        align: "left",
                      }}
                    >
                      {value.status.charAt(0) +
                        value.status.slice(1).toLowerCase()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>No data available</TableCell>
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

export default ReviewPreRegistration;
