import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  experimentalStyled as styled,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

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

const Grades = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const [semesterData, setSemesterData] = useState([]);

  const getDataGrade = async () => {
    try {
      const response = await jwtAuthAxios.get(
        `/transaction/semesterList/${
          JSON.parse(localStorage.getItem("user")).id
        }`,
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
          },
        },
      });
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

  return (
    <div>
      <Typography
        sx={{ fontSize: "24px", fontWeight: 500, paddingBottom: "20px" }}
      >
        Student Grades
      </Typography>
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
          <Typography variant="body1">You don't have a grade yet.</Typography>
        </Paper>
      ) : (
        <Typography variant="h5" sx={{ paddingBottom: "20px" }}>
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
                  handleNavigateGrade(value);
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
    </div>
  );
};

export default Grades;
