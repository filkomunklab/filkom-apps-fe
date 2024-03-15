import Div from "@jumbo/shared/Div";
import {
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  experimentalStyled as styled,
  Breadcrumbs,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const StudentCertificate = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [dataWaiting, setDataWaiting] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const location = useLocation();
  const { studentNim, firstName, lastName } = location.state
    ? location.state
    : "";

  //handle error
  const handleError = (error) => {
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
    }
  };

  const getDataWaiting = async () => {
    try {
      const result = await jwtAuthAxios.get(
        `/certificate/all/${JSON.parse(localStorage.getItem("user")).id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      console.log("ini isi result data di certi", result);

      if (result.data && result.data.data) {
        setDataWaiting(result.data.data);
      } else {
        setDataWaiting([]);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getDataWaiting();
    return () => controller.abort();
  }, []);

  const handleNavigate = async (value) => {
    try {
      const certificateDetailsResult = await jwtAuthAxios.get(
        `/certificate/student/${value.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      console.log("ini detail certi result:", certificateDetailsResult);

      const {
        student,
        submitDate,
        path,
        category,
        description,
        level,
        approvalStatus,
        approvalDate,
        title,
        id,
        comments,
      } = certificateDetailsResult.data.data;
      navigate(
        `${value.id}`,
        {
          state: {
            certificateDetails: {
              firstName: student.firstName,
              lastName: student.lastName,
              SupervisorFirstName:
                student.GuidanceClassMember?.gudianceClass?.teacher?.firstName,
              SupervisorLastName:
                student.GuidanceClassMember?.gudianceClass?.teacher?.lastName,
              submissionDate: submitDate,
              pathFile: path,
              category: category,
              level: level,
              description: description,
              status: approvalStatus,
              title: title,
              id: id,
              approvalDate: approvalDate,
              comments: comments,
            },
          },
        },
        console.log("ini pathFile", path)
      );
    } catch (error) {
      handleError(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event, step) => {
    event.preventDefault();
    navigate(step);
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case "PENALARAN_KEILMUAN":
        return "Reasoning and Scholarship";
      case "ORGANISASI_KEPEMIMPINAN":
        return "Organization and Leadership";
      case "BAKAT_MINAT":
        return "Talents and Interests";
      case "PENGABDIAN_MASYARAKAT":
        return "Community Service";
      case "OTHER":
        return "Others";
      default:
        return category;
    }
  };

  return (
    <Div>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledLink onClick={(event) => handleClick(event, -1)}>
          Student Information
        </StyledLink>
        <Typography color="text.primary">Student Certificates</Typography>
      </Breadcrumbs>
      <Stack gap={3} paddingTop={3}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h1" fontWeight={500}>
            All Certifications
          </Typography>
          <Typography variant="h6">
            {lastName}, {firstName}
          </Typography>
        </Stack>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item md={6}>
            <Typography variant="h6">
              Here is the data of the attached certificates belonging to this
              student.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead
                  style={{
                    position: "-webkit-sticky",
                    position: "sticky",
                    top: 0,
                    backgroundColor: "rgba(26, 56, 96, 0.1)",
                    zIndex: 1,
                  }}
                >
                  <TableRow>
                    <TableCell>Number</TableCell>
                    <TableCell>Submission Date</TableCell>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Descriptions</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataWaiting && dataWaiting.length > 0 ? (
                    dataWaiting.map((value, index) => (
                      <TableRow
                        key={value.id}
                        onClick={() => handleNavigate(value, studentNim)}
                        sx={{
                          ":hover": {
                            cursor: "pointer",
                            backgroundColor: "#338CFF21",
                            transition: "0.3s",
                            transitionTimingFunction: "ease-in-out",
                            transitionDelay: "0s",
                            transitionProperty: "all",
                          },
                        }}
                      >
                        <TableCell
                          align="right"
                          sx={{ width: "80px", paddingRight: "40px" }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ width: "180px", paddingLeft: "17px" }}>
                          {new Date(value.approvalDate).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </TableCell>
                        <TableCell sx={{ width: "200px" }}>
                          {value.student?.lastName}, {value.student?.firstName}
                        </TableCell>
                        <TableCell
                          sx={{
                            maxWidth: "240px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {value.title}
                        </TableCell>
                        <TableCell>
                          {getCategoryLabel(value.category)}
                        </TableCell>
                        <TableCell>{value.description}</TableCell>
                        <TableCell
                          sx={{
                            color:
                              value.approvalStatus === "WAITING"
                                ? "#FFCC00"
                                : value.approvalStatus === "APPROVED"
                                ? "#005FDB"
                                : value.approvalStatus === "REJECTED"
                                ? "#E21D12"
                                : "inherit",
                            align: "left",
                            width: "100px",
                          }}
                        >
                          {value.approvalStatus &&
                            value.approvalStatus.charAt(0) +
                              value.approvalStatus.slice(1).toLowerCase()}
                        </TableCell>
                      </TableRow>
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
              component="div"
              count={dataWaiting.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Stack>
    </Div>
  );
};

export default StudentCertificate;
