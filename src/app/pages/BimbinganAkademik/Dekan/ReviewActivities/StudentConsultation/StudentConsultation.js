import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Select,
  MenuItem,
  TableControl,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import { Link } from "react-router-dom";

const StudentConsultation = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataWaiting, setDataWaiting] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getDataWaiting();
  }, []);

  const getDataWaiting = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL_API}/academic-consultation/employee/${
          JSON.parse(localStorage.getItem("user")).nik
        }`
      );
      console.log("ini isi result.data", result.data);
      setDataWaiting(result.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleNavigate = async (value) => {
    try {
      // Assuming you have an endpoint to fetch the details of a specific consultation
      const consultationDetailsResult = await axios.get(
        `${BASE_URL_API}/academic-consultation/detail/${value.id}`
      );
      // console.log("hao ", consultationDetailsResult);

      navigate(
        `/bimbingan-akademik/dekan/review-activities/consultation/${value.id}`,
        {
          state: {
            consultationDetails: {
              studentName: consultationDetailsResult.data.data.student_name,
              supervisorName:
                consultationDetailsResult.data.data.supervisor_name,
              studentMajor: consultationDetailsResult.data.data.student_major,
              studentArrivalYear:
                consultationDetailsResult.data.data.student_arrival_year,
              topic: consultationDetailsResult.data.data.topic,
              receiverName: consultationDetailsResult.data.data.receiver_name,
              description: consultationDetailsResult.data.data.description,
            },
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Div>
      <Typography variant="h1" sx={{ mb: 3, fontWeight: 500 }}>
        Student Consultation
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
        You are now on the Consultations submitted by students page. This will
        show you a list of students who have submitted a consultation with you.
      </Typography>
      <Grid item xs={12}>
        <TableContainer
          sx={{
            maxHeight: 440,
          }}
          component={Paper}
        >
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
                <TableCell>Message</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataWaiting &&
                dataWaiting.map((value, index) =>
                  value.status === "Waiting" ? (
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
                      <TableCell align="right" sx={{ width: "80px" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell align="right" sx={{ width: "145px" }}>
                        {new Date(value.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell sx={{ width: "250px" }}>
                        {value.student_name}
                      </TableCell>
                      <TableCell sx={{ width: "160px" }}>
                        {value.topic}
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: "300px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {value.description}
                      </TableCell>
                      <TableCell
                        sx={{ color: "#FFCC00", width: "100px", align: "left" }}
                      >
                        {value.status}
                      </TableCell>
                    </TableRow>
                  ) : (
                    ""
                  )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Div>
  );
};

export default StudentConsultation;
