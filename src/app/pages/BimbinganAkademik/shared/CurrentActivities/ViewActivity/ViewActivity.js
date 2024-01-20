import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Grid,
  Breadcrumbs,
  experimentalStyled as styled,
  Paper,
  Checkbox,
  Modal,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
  maxWidth: "90%",
  "@media (max-width: 768px)": {
    maxWidth: "80%",
  },
  "@media (max-width: 480px)": {
    maxWidth: "80%",
  },
};

const style2 = {
  position: "fixed",
  top: "15%",
  right: "2%",
  width: 400,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
};

const studentsData = Array.from({ length: 29 }, (_, index) => ({
  id: index + 1,
  name: "Adzana, Shaliha Gracia",
  nim: "105022010006",
  prodi: "Informatika",
}));

const ViewActivity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activityId } = location?.state || "-";
  const controller = new AbortController();
  const signal = controller.signal;
  const [activityDetail, setActivityDetail] = useState("");
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);

  const getActivityDetail = async () => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer token_apa`,
      };

      const response = await axios.get(
        `${BASE_URL_API}/activity/detail/${activityId}`,
        { signal }
      );
      console.log("res activity detail", response);

      const { status, data } = response.data;
      if (status === "OK") {
        setActivityDetail(data);
      } else {
        //tambah handler jika respon lain, kalau tidak perlu hapus saja
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getStudentList = async() =>{
  //   try{
  //     const headers = {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer token_apa`,
  //     };

  //     const response = await axios.get(`${BASE_URL_API}/bla/bla/bla`,{headers})

  //     const {status, message, code, data} = response.data
  //     if(status === 'OK'){ //isi status atau code tergantung API
  //     //simpan dalam usestate contoh:
  //     //setStudentList = data
  //     //tambahkan handle lain jika perlu
  //     }else{
  //     //tambah handler jika respon lain, kalau tidak perlu hapus saja
  //       console.log(response)
  //     }
  //   }catch(error){
  //     console.log(error)
  //   }
  // }

  // const submitAttendance = async()=>{
  //   try{
  //     const headers = {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer token_apa`,
  //     };

  //     const response = await axios.post(`${BASE_URL_API}/bla/bla/bla`,{body: 'data apa'},{headers})

  //   // jika tidak akan melakukan handle terhadap response maka hapus saja "const response =", jadi sisa await dst...
  //     console.log(response)
  //   }catch(error){
  //     console.log(error)
  //   }
  // }

  const submitAttendance = async () => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer token_apa`,
      };

      const response = await axios.patch(
        `${BASE_URL_API}/activity/take-attendance/${activityId}`,
        { members: selectedStudents },
        { signal }
      );
      if (response.data.status === "OK") {
        setOpenFirstModal(false);
        setOpenSecondModal(true);
        // navigate(-1);
      }
      // jika tidak akan melakukan handle terhadap response maka hapus saja "const response =", jadi sisa await dst...
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll);
    setSelectedStudents(
      selectedAll
        ? []
        : activityDetail.ActivityMember.map((student) => student.studentNim)
    );
  };

  const handleSelectStudent = (studentId) => {
    const updatedSelectedStudents = selectedStudents.includes(studentId)
      ? selectedStudents.filter((id) => id !== studentId)
      : [...selectedStudents, studentId];

    setSelectedAll(updatedSelectedStudents.length === studentsData.length);
    setSelectedStudents(updatedSelectedStudents);
  };

  const handleClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleSubmitFirstModal = () => {
    setOpenFirstModal(false);
    setOpenSecondModal(true);
  };

  useEffect(() => {
    getActivityDetail();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenSecondModal(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [openSecondModal === true]);

  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>Current Activities</StyledLink>
          <Typography color="text.primary">Activity</Typography>
        </Breadcrumbs>
      </div>
      <Typography
        sx={{ fontSize: "24px", fontWeight: 500, paddingTop: "20px" }}
      >
        Activity
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack spacing={2} sx={{ paddingTop: 3 }}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Title</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 1 }}>
                {activityDetail?.title}
              </Typography>
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Descriptions</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                {activityDetail?.description}
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Date</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                {new Date(activityDetail?.dueDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Clock</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                {new Date(activityDetail?.dueDate).toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      {activityDetail?.isAttendance === true && (
        <div>
          <Typography sx={{ fontSize: "24px", mt: 2, mb: 2, fontWeight: 400 }}>
            Attendance
          </Typography>
          <TableContainer
            sx={{
              maxHeight: 640,
            }}
            component={Paper}
          >
            <Table stickyHeader>
              <TableHead
                size="small"
                sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}
              >
                <TableRow size="small">
                  <TableCell>
                    <Checkbox
                      checked={selectedAll}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>NIM</TableCell>
                  <TableCell>Prodi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activityDetail.ActivityMember.map((student, index) => (
                  <TableRow key={student.studentNim}>
                    <TableCell sx={{ width: "40px" }}>
                      <Checkbox
                        checked={selectedStudents.includes(student.studentNim)}
                        onChange={() => handleSelectStudent(student.studentNim)}
                      />
                    </TableCell>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {student.student.lastName}, {student.student.firstName}
                    </TableCell>
                    <TableCell>{student.studentNim}</TableCell>
                    <TableCell>
                      {student.student.major === "IF"
                        ? "Informatika"
                        : student.student.major === "SI"
                        ? "Sistem Informasi"
                        : student.student.major === "DKV"
                        ? "Teknologi Informasi"
                        : student.student.major}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid
            sx={{
              padding: 2,
              paddingTop: "30px",
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "60px",
            }}
          >
            <Button
              onClick={() => submitAttendance(true)}
              sx={{
                backgroundColor: "#006AF5",
                borderRadius: "24px",
                color: "white",
                whiteSpace: "nowrap",
                minWidth: "132px",
                fontSize: "12px",
                padding: "10px",
                gap: "6px",

                "&:hover": {
                  backgroundColor: "#025ED8",
                },
              }}
            >
              Submit Attendance
            </Button>
          </Grid>
        </div>
      )}

      <Modal
        open={openFirstModal}
        onClose={() => setOpenFirstModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
            }}
          >
            Submit the Attendance?
          </Typography>
          <Typography
            id="modal-modal-description"
            style={{ marginTop: "16px", marginBottom: "20px" }}
          >
            Are you sure you want to submit this? Forms that have been submitted
            cannot be edited again.
          </Typography>

          <Grid container spacing={1} justifyContent="flex-end">
            <Grid item>
              <Button
                onClick={() => setOpenFirstModal(false)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  color: "black",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "lightgrey",
                  },
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleSubmitFirstModal}
                sx={{
                  backgroundColor: "#006AF5",
                  borderRadius: "5px",
                  color: "white",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#025ED8",
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
      <Modal
        open={openSecondModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style2}>
          <IconButton
            edge="end"
            color="#D9D9D9"
            onClick={() => setOpenSecondModal(false)}
            aria-label="close"
            sx={{
              position: "absolute",
              top: "10px",
              right: "20px",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
            }}
          >
            Successful Submission!
          </Typography>
          <Typography
            id="modal-modal-description"
            style={{ marginTop: "16px", marginBottom: "20px" }}
          >
            You have successfully entered the student attendance form.
          </Typography>
        </div>
      </Modal>
    </div>
  );
};

export default ViewActivity;
