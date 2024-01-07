import React, { useEffect } from "react";
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
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const StudentGrade = () => {
  const { state } = useLocation();
  const gradeDetails = state ? state.gradeDetails : {};
  const { semester, subject } = gradeDetails;
  console.log("ini grade detail", gradeDetails);

  const getLetterGrade = (grade) => {
    if (grade >= 91) return { letter: "A", weight: 4.0 };
    else if (grade >= 85) return { letter: "A-", weight: 3.7 };
    else if (grade >= 82) return { letter: "B+", weight: 3.3 };
    else if (grade >= 78) return { letter: "B", weight: 3.0 };
    else if (grade >= 75) return { letter: "B-", weight: 2.7 };
    else if (grade >= 70) return { letter: "C+", weight: 2.3 };
    else if (grade >= 67) return { letter: "C", weight: 2.0 };
    else if (grade >= 60) return { letter: "C-", weight: 1.7 };
    else if (grade >= 50) return { letter: "D", weight: 1.0 };
    else return { letter: "F", weight: 0.0 };
  };

  const handleBreadcrumbsClick = () => {
    let path = "/bimbingan-akademik/student-grade";
    return <StyledLink to={path}>Grades</StyledLink>;
  };

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ paddingBottom: 2 }}>
        {handleBreadcrumbsClick()}
        <Typography color="text.primary">Student Grade</Typography>
      </Breadcrumbs>
      <Stack gap={3} paddingTop={2}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h1" fontWeight={500}>
            Grade {semester}
          </Typography>
        </Stack>

        <Grid item xs={12} paddingTop={1}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1A38601A" }}>
                  <TableCell>No</TableCell>
                  <TableCell>Subject Name</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Lecturer</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subject &&
                  subject.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ width: "40px" }}>{index + 1}</TableCell>
                      <TableCell sx={{ width: "40px" }}>
                        {data.subjectName}
                      </TableCell>
                      <TableCell sx={{ width: "40px" }}>
                        {`${data.grades} (${
                          getLetterGrade(data.grades).letter
                        })`}
                      </TableCell>
                      <TableCell sx={{ width: "40px" }}>
                        {data.lecturer}
                      </TableCell>
                      <TableCell sx={{ width: "40px" }}>
                        {data.description || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Stack paddingTop={2}>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: 14, md: 16, xl: 18 } }}
          >
            {semester}, Tahun Akademik 2022/2023
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: 14, md: 16, xl: 18 } }}
          >
            Total Grade: 4.00
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: 14, md: 16, xl: 18 } }}
          >
            Total Major Grade: 3.95
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
};
export default StudentGrade;
