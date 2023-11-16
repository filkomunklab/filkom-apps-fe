import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
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

const data = Array.from(Array(1).keys()).map((item, index) => ({
  submission_date: `Sep 23, 2022`,
  student_name: `Dengah, Julio Franco`,
  topic: `Academic`,
  message: `Syalom sir, mohon maaf mengganggu, saya ingin melakukan konsultasi terkait perkuliahan saya. Saya mengalami krisis dalam hal keuangan`,
  status: `Waiting`,
}));

const StudentConsultation = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const TableHeading = ({ index }) => {
    const style = { fontWeight: 400 };
    return (
      <TableRow sx={{ backgroundColor: "#1A38601A" }}>
        <TableCell sx={[style]}>Number</TableCell>
        <TableCell sx={[style]}>Submission Date</TableCell>
        <TableCell sx={[style]}>Student Name</TableCell>
        <TableCell sx={[style]}>Topic</TableCell>
        <TableCell sx={[style]}>Message</TableCell>
        <TableCell sx={[style]}>Status</TableCell>
      </TableRow>
    );
  };

  const TableItem = ({ item, index }) => {
    const navigate = useNavigate();
    const handleButtonNavigate = () => {
      navigate(
        `/bimbingan-akademik/dosen-pembimbing/review-activities/consultation/${item.student_name}`
      );
    };
    return (
      <TableRow
        sx={{
          ":hover": {
            backgroundColor: "#E5F0FF",
          },
        }}
        onClick={handleButtonNavigate}
      >
        <TableCell>{index + 1}</TableCell>
        <TableCell>{item.submission_date}</TableCell>
        <TableCell>{item.student_name}</TableCell>
        <TableCell>{item.topic}</TableCell>
        <TableCell>{item.message}</TableCell>
        <TableCell>{item.status}</TableCell>
      </TableRow>
    );
  };

  return (
    <Div>
      <Typography variant="h1" sx={{ mb: 3 }}>
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
          <Table stickyHeader>
            <TableHead>
              <TableHeading />
            </TableHead>
            <TableBody>
              {data
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
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Div>
  );
};

export default StudentConsultation;
