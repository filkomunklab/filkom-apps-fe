import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Grid,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";

const StudentConsultation = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataWaiting, setDataWaiting] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const getDataWaiting = async () => {
    try {
      const { nik } = JSON.parse(localStorage.getItem("user"));
      const result = await axios.get(
        `${BASE_URL_API}/academic-consultation/employee/${nik}`
      );
      console.log("API Response:", result.data);

      const filteredData = result.data.data.filter((item) => {
        const studentFullName = `${item.student_name}`.toLowerCase();
        const includesSearch = studentFullName.includes(
          searchValue.toLowerCase()
        );

        return includesSearch && item.status === "Waiting";
      });

      console.log("Filtered data:", filteredData);
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
      const consultationDetailsResult = await axios.get(
        `${BASE_URL_API}/academic-consultation/detail/${value.id}`
      );
      // console.log("ini detail Consutation result:", consultationDetailsResult);
      const { role } = JSON.parse(localStorage.getItem("user"));
      let path = "";
      console.log("hai ini role", role.includes === "KAPRODI");
      if (role.includes("DEKAN")) {
        path = "/bimbingan-akademik/dekan/review-activities/consultation/";
      } else if (role.includes("KAPRODI")) {
        path = "/bimbingan-akademik/kaprodi/review-activities/consultation/";
      } else {
        path =
          "/bimbingan-akademik/dosen-pembimbing/review-activities/consultation/";
      }

      navigate(`${path}${value.id}`, {
        state: {
          consultationDetails: {
            studentName: consultationDetailsResult.data.data.student_name,
            supervisorName: consultationDetailsResult.data.data.supervisor_name,
            studentMajor: consultationDetailsResult.data.data.student_major,
            studentArrivalYear:
              consultationDetailsResult.data.data.student_arrival_year,
            topic: consultationDetailsResult.data.data.topic,
            receiverName: consultationDetailsResult.data.data.receiver_name,
            description: consultationDetailsResult.data.data.description,
            id: consultationDetailsResult.data.data.id,
          },
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Typography variant="h1" sx={{ mb: 3, fontWeight: 500 }}>
        Student Consultation
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
        You are now on the Consultations submitted by students page. This will
        show you a list of students who have submitted a consultation with you.
      </Typography>
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
              }}
            >
              <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>Submission Date</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
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
                    <TableCell
                      align="right"
                      sx={{ width: "80px", paddingRight: "17px" }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell sx={{ width: "180px", paddingLeft: "17px" }}>
                      {new Date(value.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell sx={{ width: "245px" }}>
                      {value.student_name}
                    </TableCell>
                    <TableCell sx={{ width: "140px" }}>{value.topic}</TableCell>
                    <TableCell
                      sx={{
                        maxWidth: "150px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {value.description}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#FFCC00",
                        width: "100px",
                        align: "left",
                      }}
                    >
                      {value.status}
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
    </div>
  );
};

export default StudentConsultation;
