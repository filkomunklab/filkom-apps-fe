import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Breadcrumbs,
  experimentalStyled as styled,
  Box,
  Container,
  Stack,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const tableData1 = [
  {
    number: 1,
    name: "[MATH000] Matematika/ Mathematics",
    parallel: "A",
    lecturer: "Sandag, Green A",
    grade: "A (95)",
    retrieval: 1,
  },
  {
    number: 2,
    name: "[IF1112] Dasar Aljabar Linear/ Aljabar Linear Fundamental",
    parallel: "F",
    lecturer: "Sondakh, Debby Erce",
    grade: "A- (87)",
    retrieval: 1,
  },
  {
    number: 3,
    name: "[MATH000] Matematika/ Mathematics",
    parallel: "A",
    lecturer: "Sengkey, Virginia",
    grade: "A (95)",
    retrieval: 1,
  },
  {
    number: 4,
    name: "[IF1112] Dasar Aljabar Linear/ Aljabar Linear Fundamental",
    parallel: "C",
    lecturer: "Sandag, Green A",
    grade: "B (70)",
    retrieval: 2,
  },
  {
    number: 5,
    name: "[MATH000] Matematika/ Mathematics",
    parallel: "B",
    lecturer: "Adam, Stenly",
    grade: "A (95)",
    retrieval: 1,
  },
  {
    number: 6,
    name: "[IF1112] Dasar Aljabar Linear/ Aljabar Linear Fundamental",
    parallel: "A",
    lecturer: "Sandag, Green A",
    grade: "A- (87)",
    retrieval: 1,
  },
  {
    number: 7,
    name: "[FILG182] Teladan Kehidupan II/ The Exemplary Living II",
    parallel: "C",
    lecturer: "Sandag, Green A",
    grade: "B (70)",
    retrieval: 2,
  },
];

const TableItem = ({ data }) => (
  <TableRow>
    <TableCell>{data.number}</TableCell>
    <TableCell>{data.name}</TableCell>
    <TableCell>{data.parallel}</TableCell>
    <TableCell>{data.lecturer}</TableCell>
    <TableCell>{data.grade}</TableCell>
    <TableCell>{data.retrieval}</TableCell>
  </TableRow>
);

const ApprovedHistoryGrade = () => {
  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/history">History</StyledLink>
          <Typography color="text.primary">Grade</Typography>
        </Breadcrumbs>
      </div>
      <Typography
        sx={{ fontSize: "24px", fontWeight: 500, paddingTop: "20px" }}
      >
        Student Grades
      </Typography>
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 0.4 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Student Name
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Supervisor Name
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Semester
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Submission Date
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Status
          </Typography>
        </Box>
        <Box sx={{ flex: 0.04 }}>
          <Typography variant="h3" fontWeight="500" sx={{ marginBottom: 2 }}>
            :
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            :
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            :
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            :
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            :
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Awuy, Diany Mariska
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Adzanu, Shaliha Alifyaa
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            1
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            10 May 2000
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2, color: "#006AF5" }}>
            Approved
          </Typography>
        </Box>
      </Container>
      <TableContainer
        sx={{
          overflow: "auto",
          backgroundColor: "white",
          borderRadius: "6px",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
            <TableRow>
              <TableCell sx={{ width: "80px" }}>Number</TableCell>
              <TableCell sx={{ width: "380px" }}>Subject Name</TableCell>
              <TableCell sx={{ width: "80px" }}>Parallel</TableCell>
              <TableCell sx={{ width: "200px" }}>Lecturer</TableCell>
              <TableCell sx={{ width: "120px" }}>Grade</TableCell>
              <TableCell sx={{ width: "110px" }}>Retrieval</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData1.map((data, index) => (
              <TableItem key={index} data={data} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} sx={{ marginTop: 4, paddingBottom: "80px" }}>
        <Typography variant="h5" sx={{ fontWeight: 600, paddingLeft: "2px" }}>
          Comments from Supervisor
        </Typography>
        <Paper
          sx={{
            borderRadius: "8px",
          }}
          elevation={0}
          variant="outlined"
          fullWidth
        >
          <Typography variant="body1" sx={{ p: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            commodo nunc in ligula tempus, sed feugiat justo vestibulum. Etiam
            pellentesque, odio vel facilisis posuere, urna velit gravida est, eu
            pharetra massa tortor eget quam.
          </Typography>
        </Paper>
      </Stack>
    </div>
  );
};

export default ApprovedHistoryGrade;
