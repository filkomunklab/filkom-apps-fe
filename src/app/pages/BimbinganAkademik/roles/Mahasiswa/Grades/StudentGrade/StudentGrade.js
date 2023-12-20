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
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const StudentGrade = () => {
  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/student-grade">
            Student Grades
          </StyledLink>
          <Typography color="text.primary">Grade</Typography>
        </Breadcrumbs>
      </div>
      <Stack gap={3} paddingTop={3}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h1" fontWeight={500}>
            Grade
          </Typography>
        </Stack>
        <Typography variant="h5">Semester 1</Typography>
        <Grid item xs={12}>
          <TableContainer
            sx={{
              maxHeight: 640,
            }}
            component={Paper}
          >
            <Table stickyHeader>
              <TableHead>
                <TableHeading />
              </TableHead>
              <TableBody>
                {[...Array(10)].map((item, index) => (
                  <TableItem index={index} key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Stack>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: 14, md: 16, xl: 18 } }}
          >
            Semester 1, Tahun Akademik 2022/2023
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: 14, md: 16, xl: 18 } }}
          >
            Total Grade: 3.92
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

const TableHeading = () => {
  const style = { fontWeight: 400 };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
      <TableCell sx={[style]}>No</TableCell>
      <TableCell sx={[style]}>Subject Name</TableCell>
      <TableCell sx={[style]}>Parallel</TableCell>
      <TableCell sx={[style]}>Lecturer</TableCell>
      <TableCell sx={[style]}>Grade</TableCell>
      <TableCell sx={[style]}>The -th Enrollment</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index }) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{`[IF3263] Kecerdasan Buatan/ Artificial Intelligence`}</TableCell>
      <TableCell>{`A`}</TableCell>
      <TableCell>{`Adam, Stenly`}</TableCell>
      <TableCell>{`A (95)`}</TableCell>
      <TableCell>{`1`}</TableCell>
    </TableRow>
  );
};

export default StudentGrade;
