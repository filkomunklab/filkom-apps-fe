import React, { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Breadcrumbs,
  experimentalStyled as styled,
  Box,
  Container,
  Stack,
  Paper,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const data = Array.from(Array(8).keys()).map((item, index) => ({
  subject_name: `Keterampilan Komputer Dasar/ Basic Computer Skill`,
  parallel: `C`,
  lecturer: `Sompie, Dimitry Virgy`,
  grade: `94`,
  grade_in_alphabet: `A`,
  retrieval_to: `1`,
}));

const TableHeading = ({ index }) => {
  const style = { fontWeight: 400 };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
      <TableCell sx={[style]}>Number</TableCell>
      <TableCell sx={[style]}>Subject Name</TableCell>
      <TableCell sx={[style]}>Parallel</TableCell>
      <TableCell sx={[style]}>Lecturer</TableCell>
      <TableCell sx={[style]}>Grade</TableCell>
      <TableCell sx={[style]}>Retrieval to-</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index }) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{item.subject_name}</TableCell>
      <TableCell>{item.parallel}</TableCell>
      <TableCell>{item.lecturer}</TableCell>
      <TableCell>{item.grade}</TableCell>
      <TableCell>{item.retrieval_to}</TableCell>
    </TableRow>
  );
};

const ApprovedHistoryGrade = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
        fontSize={"24px"}
        fontWeight="500"
        sx={{ marginBottom: 2, paddingTop: "20px" }}
      >
        Student Grades
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={12} xl={12} id="detail-item">
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Title</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5" fontWeight={500}>
                  Menang Lomba Desan Prototype
                </Typography>
              </Grid>
            </Grid>
          </Grid>
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
                <Typography variant="h5">Dengah, Mesakh Leonardo</Typography>
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
                <Typography variant="h5">November 14, 2023</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Approval Date</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5">-</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Category</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5">Local</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Status</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5" sx={{ color: "#CA150C" }}>
                  Rejected
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Descriptions</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5" sx={{ textAlign: "justify" }}>
                  Saya mengikuti lomba desain prototype website kampus yang
                  diselenggarakan oleh Fakultas Ilmu Komputer.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} paddingTop={2}>
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
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableItem item={item} index={index} key={index} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component={"div"}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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

export default ApprovedHistoryGrade;
