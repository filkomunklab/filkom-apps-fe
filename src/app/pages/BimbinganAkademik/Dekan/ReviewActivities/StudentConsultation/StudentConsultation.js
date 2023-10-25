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
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const data = Array.from(Array(1).keys()).map((item, index) => ({
  submission_date: `Sep 23, 2022`,
  student_name: `Dengah, Julio Franco`,
  topic: `Akademic`,
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
        `/bimbingan-akademik/dekan/review-activities/consultation/${item.student_name}`
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
      <Typography variant="h6" sx={{ mb: 5 }}>
        You are now on the Consultations submitted by students page. This will
        show you a list of students who have submitted a consultation with you.
      </Typography>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
            <TableRow>
              <TableCell size="small" sx={{ width: "30px" }}>
                Number
              </TableCell>
              <TableCell size="small" sx={{ width: "60px" }}>
                Submission Date
              </TableCell>
              <TableCell size="small" sx={{ width: "130px" }}>
                Student Name
              </TableCell>
              <TableCell size="small" sx={{ width: "40px" }}>
                Topic
              </TableCell>
              <TableCell size="small" sx={{ width: "300px" }}>
                Message
              </TableCell>
              <TableCell size="small" sx={{ width: "30px" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => {
                const maxWords = 12;
                const messageWords = item.message.split(" ");

                const truncatedMessage =
                  messageWords.length > maxWords
                    ? messageWords.slice(0, maxWords).join(" ") + "..."
                    : item.message;

                const truncatedItem = { ...item, message: truncatedMessage };

                return (
                  <TableItem item={truncatedItem} index={index} key={index} />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Div>
  );
};

export default StudentConsultation;
