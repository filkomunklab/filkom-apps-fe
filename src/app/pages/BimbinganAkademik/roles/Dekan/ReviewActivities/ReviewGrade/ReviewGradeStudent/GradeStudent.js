import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  Breadcrumbs,
  experimentalStyled as styled,
  Button,
  Modal,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import Div from "@jumbo/shared/Div";
import { BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

const data = Array.from(Array(8).keys()).map((item, index) => ({
  subject_name: `Keterampilan Komputer Dasar/ Basic Computer Skill`,
  parallel: `C`,
  lecturer: `Sompie, Dimitry Virgy`,
  grade: `94`,
  grade_in_alphabet: `A`,
  retrieval_to: `1`,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 402,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  overflow: "hidden",
};

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const GradeStudent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
        //tambahkan handle lain jika perlu
      }else{
        //tambah handler jika respon lain, kalau tidak perlu hapus saja
        console.log(response)
      }
    }catch(error){
      console.log(error)
    }
  }

  const gradeAction = async()=>{
    try{
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer token_apa`,
      }
      let response;

      if('approve'){
        response = await axios.post(`${BASE_URL_API}/bla/bla/bla`,{
          message: 'message-data',
          etc: 'etc'
        }, {headers})
      }else if('reject'){
        response = await axios.post(`${BASE_URL_API}/bla/bla/bla`,{
          message: 'message-data',
          etc: 'etc'
        }, {headers})
      }

      // jika tidak akan melakukan handle terhadap response maka hapus saja "const response =", jadi sisa await dst...
      console.log(response)

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

  const handleSubmit = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleReject = () => {
    setIsReject(!isReject);
  };
  const handleApprove = () => {
    setIsApprove(!isApprove);
  };

  const handleClick = (event) => {
    event.preventDefault();
  };

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

  return (
    <Div>
      <Div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/dekan/review-activities/grade">
            Review Grade
          </StyledLink>
          <Typography color="text.primary">Grade</Typography>
        </Breadcrumbs>
      </Div>
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
                <Typography variant="h5" sx={{ color: "#FFCC00" }}>
                  Waiting
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
      <Box component="form" noValidate autoComplete="off" sx={{ marginTop: 5 }}>
        <Typography variant="h6">Comments</Typography>
        <TextField
          id="outlined-multiline-static"
          placeholder="Add comment"
          multiline
          minRows={4}
          fullWidth
        />
      </Box>
      <Div
        sx={{
          mt: 3,
          mb: 6,
          display: "flex",
          justifyContent: "flex-end",
          columnGap: 2,
        }}
      >
        <Button
          loading
          variant="contained"
          color="error"
          sx={{
            borderRadius: 50,
            textTransform: "capitalize",
            width: "152px",
          }}
          onClick={handleReject}
        >
          Reject
        </Button>
        <Button
          loading
          variant="contained"
          //   color="success"
          sx={{
            borderRadius: 50,
            textTransform: "capitalize",
            width: "152px",
          }}
          onClick={handleApprove}
        >
          Approve
        </Button>
        <Modal
          open={isReject}
          onClose={handleReject}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Div sx={{ py: 2, px: 3 }}>
              <Typography id="modal-modal-title" variant="h3" color={`#0A0A0A`}>
                Reject this Student Certificate?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please remember to leave comments for the student regarding the
                reasons of the rejection.
              </Typography>
            </Div>
            <Div
              sx={{
                display: "flex",
                columnGap: 2,
                justifyContent: "flex-end",
                bgcolor: "#F5F5F5",
                px: 2,
                py: 1,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#E0E0E0",
                  color: "#0A0A0A",
                  textTransform: "capitalize",
                }}
                onClick={() => setIsReject(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" sx={{ textTransform: "capitalize" }}>
                Submit
              </Button>
            </Div>
          </Box>
        </Modal>
        <Modal
          open={isApprove}
          onClose={handleApprove}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Div sx={{ py: 2, px: 3 }}>
              <Typography id="modal-modal-title" variant="h3" color={`#0A0A0A`}>
                Approve this Student Certificate?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please note that agreeing to this certificate will save the data
                for statistical analysis before making it available.
              </Typography>
            </Div>
            <Div
              sx={{
                display: "flex",
                columnGap: 2,
                justifyContent: "flex-end",
                bgcolor: "#F5F5F5",
                px: 2,
                py: 1,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#E0E0E0",
                  color: "#0A0A0A",
                  textTransform: "capitalize",
                }}
                onClick={() => setIsApprove(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" sx={{ textTransform: "capitalize" }}>
                Submit
              </Button>
            </Div>
          </Box>
        </Modal>
      </Div>
    </Div>
  );
};

export default GradeStudent;
