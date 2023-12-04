import React, { useState } from "react";
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
  Container,
  Stack,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

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

const HistoryGrade = () => {
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isGradeApproved, setIsGradeApproved] = useState(true)

  const getGrade = async() =>{
    try{
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer token_apa`,
      }

      const response = await axios(`${BASE_URL_API}/bla/bla/bla`,{headers})

      const {status, message, data, code} = response.data;

      if(status === 'OK'){ //isi status atau code tergantung API
        //simpan dalam usestate contoh:
        //setGrade = data
        //tambahkan handle lain jika perlu (Approved grade, dll)
      }else{
        //tambah handler jika respon lain, kalau tidak perlu hapus saja
        console.log(response)
      }
    }catch(error){
      console.log(error)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>History</StyledLink>
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
                <Typography sx={{ color: isGradeApproved ? "#005fdb" : "#ca150c" }} variant="h5">
                  {isGradeApproved ? 'Approved': 'Rejected'}
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

export default HistoryGrade;
