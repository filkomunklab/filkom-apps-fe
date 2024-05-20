import Div from "@jumbo/shared/Div";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Typography,
  experimentalStyled as styled,
  Paper,
  Breadcrumbs,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { handleAuthenticationError } from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "#1A2027" : "rgba(26, 56, 96, 0.1)",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
  transition: "background-color 0.3s ease-in-out",

  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 106, 254, 0.1)",
    color:
      theme.palette.mode === "dark"
        ? "rgba(0, 95, 219, 1)"
        : "rgba(0, 95, 219, 1)",
  },
}));

const StudentGradeDashboard = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const [semesterData, setSemesterData] = useState([]);
  const location = useLocation();
  const { studentNim, firstName, lastName, major, studentId } = location.state
    ? location.state
    : "";

  //handle error
  const handleError = (error) => {
    if (error && error.code === "ERR_CANCELED") {
      console.log("request canceled");
    } else if (error && error.response && error.response.status === 401) {
      handleAuthenticationError();
    } else {
      console.error("error: ");
    }
  };

  const getDataGrade = async () => {
    try {
      const response = await jwtAuthAxios.get(
        `/transaction/semesterList/${studentId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      const sortedData = response.data.data.sort((a, b) =>
        a.semester.localeCompare(b.semester, undefined, { numeric: true })
      );

      const reversedData = sortedData.reverse();

      setSemesterData(reversedData);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getDataGrade();
    return () => controller.abort();
  }, []);

  const handleNavigateGrade = async (value) => {
    try {
      const gradeDetailsResult = await jwtAuthAxios.get(
        `/grades/detailGrades/${value.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      const detail = gradeDetailsResult.data.data;

      navigate(`${value.id}`, {
        state: {
          gradeDetails: {
            semester: detail.semester,
            subject: detail.subject,
            lastName: lastName,
            firstName: firstName,
            major,
          },
        },
      });
    } catch (error) {
      handleError();
    }
  };

  const role = Boolean(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user")).role
    : [];
  const getRole = () => {
    const filter = role.includes("KAPRODI")
      ? "kaprodi"
      : role.includes("DEKAN")
      ? "dekan"
      : role.includes("OPERATOR_FAKULTAS")
      ? "sekretaris"
      : "dosen-pembimbing";

    return filter;
  };

  return (
    <Div>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledLink onClick={() => navigate(-2)}>Faculty Student</StyledLink>

        <StyledLink onClick={() => navigate(-1)}>
          {major === "IF"
            ? "Informatics"
            : major === "SI"
            ? "Information System"
            : major === "TI"
            ? "Information Technology"
            : "-"}{" "}
          Students List
        </StyledLink>
        <Typography color="text.primary">Student Grades</Typography>
      </Breadcrumbs>
      <Stack gap={3} paddingTop={3}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h1" fontWeight={500}>
            Student Grade
          </Typography>
          <Typography variant="h6">
            {lastName}, {firstName}
          </Typography>
        </Stack>

        {semesterData && semesterData.length === 0 ? (
          <Paper
            sx={{
              backgroundColor: "rgba(0, 106, 245, 0.1)",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "50px",
              marginBottom: "15px",
            }}
          >
            <Typography variant="body1">
              This student has not submitted their grades yet.
            </Typography>
          </Paper>
        ) : (
          <Typography variant="h5">
            Select a semester to view grades.
          </Typography>
        )}
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {semesterData &&
            semesterData.map((value, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Item
                  onClick={() => {
                    handleNavigateGrade(value, studentNim);
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "11px",
                      fontWeight: "400",
                      color: "rgba(27, 43, 65, 0.69)",
                      textAlign: "left",
                    }}
                  >
                    Student Grades
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "17px",
                      fontWeight: "600",
                      textAlign: "left",
                    }}
                  >
                    {value.semester}
                  </Typography>
                </Item>
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Div>
  );
};

export default StudentGradeDashboard;
