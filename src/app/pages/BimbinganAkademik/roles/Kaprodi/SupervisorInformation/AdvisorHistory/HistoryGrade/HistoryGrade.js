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
  Grid,
  Stack,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const data = Array.from(Array(7).keys()).map((item, index) => ({
  subject_name: `[MATH000] Matematika/ Mathematics`,
  parallel: `B`,
  lecturer: `Sandag, Green A`,
  grade: `A (91)`,
  retrieval: `1`,
}));

const ApprovedHistoryGrade = () => {
  const navigate = useNavigate();
  const handleClick = (event, step) => {
    event.preventDefault();
    navigate(step);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink onClick={(event) => handleClick(event, -2)}>
            Supervisor Information
          </StyledLink>
          <StyledLink onClick={(event) => handleClick(event, -1)}>
            History
          </StyledLink>
          <Typography color="text.primary">Grade</Typography>
        </Breadcrumbs>
      </div>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 500,
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        Student Grades
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} xl={12} id="detail-item">
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Student Name</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5">Awuy, Diany Mariska</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Supervisor Name</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5">Adzanu, Shaliha Alifyaa</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Semester</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5">1</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Submission Date</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5">10 May 2000</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ pb: 4 }}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Status</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography sx={{ color: "#006AF5" }} variant="h5">
                  Approved
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TableContainer sx={{ maxHeight: 640 }} component={Paper}>
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
          </Grid>
        </Grid>
      </Grid>
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

const TableHeading = ({ index }) => {
  const style = { fontWeight: 400 };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
      <TableCell sx={[style]}>No</TableCell>
      <TableCell sx={[style]}>Subject Name</TableCell>
      <TableCell sx={[style]}>Parallel</TableCell>
      <TableCell sx={[style]}>Lecturer</TableCell>
      <TableCell sx={[style]}>Grade</TableCell>
      <TableCell sx={[style]}>Retrieval to-</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index }) => {
  const rowStyle = {
    "@media (max-width: 650px)": { fontSize: "11px" },
  };
  return (
    <TableRow>
      <TableCell sx={[rowStyle]}>{index + 1}</TableCell>
      <TableCell
        sx={[rowStyle]}
      >{`[MATH000] Matematika/ Mathematics`}</TableCell>
      <TableCell>{`B`}</TableCell>
      <TableCell sx={[rowStyle]}>{`Sandag, Green A`}</TableCell>
      <TableCell sx={[rowStyle]}>{`A(91)`}</TableCell>
      <TableCell sx={[rowStyle]}>{`1`}</TableCell>
    </TableRow>
  );
};

export default ApprovedHistoryGrade;
