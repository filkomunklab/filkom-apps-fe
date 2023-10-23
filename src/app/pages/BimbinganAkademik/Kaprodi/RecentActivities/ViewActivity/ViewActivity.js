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
import { Link, useNavigate } from "react-router-dom";

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
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll);
    setSelectedStudents(
      selectedAll ? [] : studentsData.map((student) => student.id)
    );
  };

  const handleSelectStudent = (studentId) => {
    const updatedSelectedStudents = selectedStudents.includes(studentId)
      ? selectedStudents.filter((id) => id !== studentId)
      : [...selectedStudents, studentId];

    setSelectedAll(updatedSelectedStudents.length === studentsData.length);
    setSelectedStudents(updatedSelectedStudents);
  };

  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const [openFirstModal, setOpenFirstModal] = React.useState(false);
  const [openSecondModal, setOpenSecondModal] = React.useState(false);
  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSecondModal = () => setOpenSecondModal(true);
  const handleCloseSecondModal = () => setOpenSecondModal(false);
  const handleSubmitFirstModal = () => {
    handleCloseFirstModal();
    handleOpenSecondModal();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseSecondModal();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleOpenSecondModal]);

  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>Back</StyledLink>
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
                Pengumpulan Kartu Rencana Studi Semester ganjil tahun 2022/2023
                Gelombang 1
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
                Diinfokan untuk semua mahasiswa yang akan mendaftar kuliah
                semester depan semester I 2023/2024 WAJIB untuk mengisi
                PreRegistration segera. Mohon memperhatikan tahun kurikulum anda
                agar dapat mengisi pada form yang benar. Perhatikan due-date
                yang ada. <br />
                <br />
                Note: Jika tidak mengisi, maka anda tidak bisa untuk kontrak
                mata kuliah di semester yang akan datang. Terima Kasih.
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Due Date</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                Senin, 22 September 2023
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Clock (optional)</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                18:00
              </Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      <Grid
        sx={{
          padding: 2,
          paddingTop: "30px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={handleOpenFirstModal}
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
          Submit
        </Button>
      </Grid>

      <Modal
        open={openFirstModal}
        onClose={handleCloseFirstModal}
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
            Send Certificate?
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
                onClick={handleCloseFirstModal}
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
            onClick={handleCloseSecondModal}
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
            You have successfully preregistered for the course.
          </Typography>
        </div>
      </Modal>

      <div sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: "24px", fontWeight: 400 }}>
          Attendance
        </Typography>
        <TableContainer
          sx={{
            overflow: "auto",
            marginTop: 4,
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <Table>
            <TableHead
              size="small"
              sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}
            >
              <TableRow size="small">
                <TableCell>Number</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>NIM</TableCell>
                <TableCell>Prodi</TableCell>
                <TableCell>
                  <Checkbox checked={selectedAll} onChange={handleSelectAll} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsData.map((student) => (
                <TableRow key={student.id}>
                  <TableCell sx={{ width: "40px" }}>{student.id}</TableCell>
                  <TableCell sx={{ width: "190px" }}>{student.name}</TableCell>
                  <TableCell sx={{ width: "80px" }}>{student.nim}</TableCell>
                  <TableCell sx={{ width: "80px" }}>{student.prodi}</TableCell>
                  <TableCell sx={{ width: "40px" }}>
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleSelectStudent(student.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

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
          onClick={handleOpenFirstModal}
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

      <Modal
        open={openFirstModal}
        onClose={handleCloseFirstModal}
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
            Send Certificate?
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
                onClick={handleCloseFirstModal}
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
            onClick={handleCloseSecondModal}
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
            You have successfully preregistered for the course.
          </Typography>
        </div>
      </Modal>
    </div>
  );
};

export default ViewActivity;
