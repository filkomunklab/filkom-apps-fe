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
} from "@mui/material";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'rgba(27, 43, 65, 0.69)',

  '&:hover': {
    textDecoration: 'underline',
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
]

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

const StudentGrade = () => {

  const handleClick = (event) => {
      event.preventDefault();
  };
  

  return (
    <div>
      <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
              <StyledLink to="/bimbingan-akademik/grades" >
                  Grades
              </StyledLink> 
              <Typography color="text.primary">Student Grades</Typography>
          </Breadcrumbs>
      </div>
      <Typography sx={{ fontSize: "24px", fontWeight: 500, paddingTop:"20px" }}>
        Student Grades
      </Typography>
      <Typography sx={{ paddingTop: "20px", paddingBottom: "26px", fontSize: "19px", fontWeight: 400, color: "rgba(27, 43, 65, 0.69)" }}>Semester 1</Typography>
      <TableContainer sx={{ overflow: "auto" }}>
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
      <Typography sx={{ paddingTop:"40px", paddingBottom: "80px",fontSize: "14px", fontWeight: 500 }}>
        Semester I, Academic Year 2022/2023
        <br />Total Grade: 3.92
        <br />Total Major Grade: 3.96
      </Typography>
    </div>
  );
};

export default StudentGrade;
