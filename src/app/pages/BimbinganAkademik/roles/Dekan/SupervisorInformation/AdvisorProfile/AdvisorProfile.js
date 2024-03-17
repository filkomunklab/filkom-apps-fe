import {
  Paper,
  Typography,
  Grid,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  TablePagination,
  Chip,
  Button,
  Breadcrumbs,
  experimentalStyled as styled,
  TableContainer,
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const AdvisorProfile = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const location = useLocation();
  const { classID } = location.state || { classID: null, nik: null };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataProfile, setDataProfile] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);

  const getProfile = async () => {
    try {
      const response = await jwtAuthAxios.get(`/guidance-class/${classID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        signal,
      });
      const { status, data } = response.data;
      if (status === "OK") {
        setDataProfile(data.teacher);
        setStudentOptions(data.GuidanceClassMember);
      }
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error.response && error.response.status === 403) {
        handlePermissionError();
        setTimeout(() => {
          navigate(-1);
        }, 2000);
        return;
      } else if (error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.log("ini error: ", error);
        return;
      }
    }
  };

  useEffect(() => {
    getProfile();
    return () => controller.abort();
  }, []);

  return (
    <Div>
      <Div role="presentation" sx={{ paddingBottom: "15px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/dekan/supervisor-information/">
            Supervisor Information
          </StyledLink>
          <Typography color="text.primary">Supervisor Profile</Typography>
        </Breadcrumbs>
      </Div>
      <Div>
        <Typography variant="h1" fontWeight={500} sx={{ marginBottom: "25px" }}>
          Supervisor Profile
        </Typography>
        <Typography
          variant="h6"
          sx={{
            paddingBottom: "25px",
            fontSize: "14px",
            fontWeight: 400,
            color: "rgba(27, 43, 65, 0.69)",
            textAlign: "justify",
          }}
        >
          Currently, you are on the Academic Supervisor Information page, here
          you can easily see all information about academic supervisors in your
          department, along with their students.
        </Typography>
      </Div>
      <Paper elevation={1} sx={{ mb: 5 }}>
        <Typography
          variant="h5"
          sx={{
            backgroundColor: "#1A38601A",
            fontWeight: 500,
            padding: "16px",
          }}
        >
          Academic Supervisor Information
        </Typography>
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Full Name</Typography>
            <Typography variant="h6" sx={textStyle}>
              {`${dataProfile.lastName}, ${dataProfile.firstName}`}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Email</Typography>
            <Typography variant="h6" sx={textStyle}>
              {dataProfile.email}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Phone</Typography>
            <Typography variant="h6" sx={textStyle}>
              {dataProfile.phoneNum}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Major</Typography>
            <Typography variant="h6" sx={textStyle}>
              {dataProfile.major === "IF"
                ? "Informatics"
                : dataProfile.major === "SI"
                ? "Information System"
                : dataProfile.major === "DKV"
                ? "Information Technology"
                : "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Address</Typography>
            <Typography variant="h6" sx={textStyle}>
              {dataProfile.Address}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        <Grid display={"flex"} alignItems={"flex-end"} item minWidth={"100%"}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "justify",
              "@media (maxWidth: 390px)": {
                fontSize: "16px",
                fontWeight: 500,
              },
            }}
          >
            List of mentored students
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer
            sx={{
              maxHeight: 440,
            }}
            component={Paper}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 500,
                      backgroundColor: "#e8ecf2",
                      textAlign: "center",
                    }}
                  >
                    No
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 500,
                      backgroundColor: "#e8ecf2",
                      textAlign: "center",
                    }}
                  >
                    NIM
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 500,
                      backgroundColor: "#e8ecf2",
                      textAlign: "center",
                    }}
                  >
                    Student Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 500,
                      backgroundColor: "#e8ecf2",
                      textAlign: "center",
                    }}
                  >
                    Program Studi
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 500,
                      backgroundColor: "#e8ecf2",
                      textAlign: "center",
                    }}
                  >
                    Tahun Masuk
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 500,
                      backgroundColor: "#e8ecf2",
                      textAlign: "center",
                    }}
                  >
                    Nilai
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 500,
                      backgroundColor: "#e8ecf2",
                      textAlign: "center",
                    }}
                  >
                    Sertifikat
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 500,
                      backgroundColor: "#e8ecf2",
                      textAlign: "center",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentOptions.length > 0 ? (
                  studentOptions
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((item, index) => (
                      <TableItem
                        item={item}
                        index={index}
                        key={item.studentNim}
                      />
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8}>No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              "@media (maxWidth: 650px)": { justifyContent: "flex-start" },
            }}
            rowsPerPageOptions={[10, 25, 50, 100]}
            component={"div"}
            count={
              dataProfile.student
                ? dataProfile.student.filter(
                    (item) => item.status !== "GRADUATE"
                  ).length
                : 0
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(+event.target.value);
              setPage(0);
            }}
          />
        </Grid>
      </Grid>
    </Div>
  );
};

const textStyle = {
  borderWidth: 1,
  borderColor: "#00000029",
  borderStyle: "solid",
  paddingX: "24px",
  paddingY: "16px",
  borderRadius: "8px",
};

const TableItem = ({ item, index }) => {
  const navigate = useNavigate();
  const { arrivalYear, firstName, lastName, major, nim, status } = item.student;

  const handleButtonNavigate = (_, name) => {
    switch (name) {
      case "profile":
        navigate(
          `/bimbingan-akademik/dekan/supervisor-information/advisor-profile/${nim}/student-profile`,
          { state: { studentNim: nim, studentId: item.studentId } }
        );
        break;
      case "grade":
        navigate(
          `/bimbingan-akademik/dekan/supervisor-information/advisor-profile/${nim}/student-grade`,
          {
            state: {
              studentNim: nim,
              firstName: firstName,
              lastName: lastName,
              studentId: item.studentId,
            },
          }
        );
        break;
      case "certificate":
        navigate(
          `/bimbingan-akademik/dekan/supervisor-information/advisor-profile/${nim}/student-certificate`,
          {
            state: {
              studentNim: nim,
              firstName: firstName,
              lastName: lastName,
              studentId: item.studentId,
            },
          }
        );
        break;

      default:
        console.log("Path not found");
    }
  };
  const rowStyle = {
    "@media (maxWidth: 650px)": { fontSize: "11px" },
    textAlign: "center",
  };
  return (
    <TableRow>
      <TableCell sx={[rowStyle]}>{index + 1}</TableCell>
      <TableCell sx={[rowStyle]}>{nim}</TableCell>
      <TableCell>
        <Typography
          style={{
            "@media (maxWidth: 650px)": { fontSize: "11px" },
            textTransform: "capitalize",
            paddingX: 0,
            color: "#006AF5",
            textDecoration: "none",
            width: "100%",
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={(e) => handleButtonNavigate(e, "profile")}
        >
          {lastName}, {firstName}
        </Typography>
      </TableCell>
      <TableCell sx={[rowStyle]}>
        {major === "IF"
          ? "Informatics"
          : major === "SI"
          ? "Information System"
          : major === "DKV"
          ? "Information Technology"
          : "-"}
      </TableCell>
      <TableCell sx={[rowStyle]}>{arrivalYear}</TableCell>

      <TableCell>
        <Typography
          onClick={(e) => handleButtonNavigate(e, "grade")}
          style={{
            "@media (maxWidth: 650px)": { fontSize: "11px" },
            textTransform: "capitalize",
            paddingX: 0,
            color: "#006AF5",
            textDecoration: "none",
            width: "100%",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          View Grades
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          onClick={(e) => handleButtonNavigate(e, "certificate")}
          style={{
            "@media (maxWidth: 650px)": { fontSize: "11px" },
            textTransform: "capitalize",
            paddingX: 0,
            color: "#006AF5",
            textDecoration: "none",
            width: "100%",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          View Certificates
        </Typography>
      </TableCell>
      <TableCell sx={[rowStyle]}>
        <Chip
          label={status}
          variant="filled"
          color={status === "ACTIVE" ? "success" : "default"}
        />
      </TableCell>
    </TableRow>
  );
};

export default AdvisorProfile;
