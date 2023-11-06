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
} from "@mui/material";
import { Link } from "react-router-dom";
import Div from "@jumbo/shared/Div";

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
      <Grid container>
        <Grid item id="detail-item">
          <Grid container>
            <Grid item md={"auto"}>
              <Stack>
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
                  Status
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Submission Date
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Approval Date
                </Typography>
              </Stack>
            </Grid>
            <Grid item md={"auto"}>
              <Stack paddingX={1}>
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
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  :
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  :
                </Typography>
              </Stack>
            </Grid>
            <Grid item md={"auto"}>
              <Stack>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Bolung, Alexander Joseph
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Inkiriwang, Michelle Jesica
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  10 May 2000
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  11 May 2000
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ marginBottom: 2, color: "#FFCC00" }}
                >
                  Waiting
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Seminar
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ paddingTop: 3 }}>
        <Table>
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
