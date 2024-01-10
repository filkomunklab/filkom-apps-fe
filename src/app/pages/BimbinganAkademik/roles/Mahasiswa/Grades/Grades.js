import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  experimentalStyled as styled,
  Paper,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [semesterData, setSemesterData] = useState([]);

  const getDataGrade = async () => {
    try {
      const nim = JSON.parse(localStorage.getItem("user")).nim;
      const response = await axios.get(
        `${BASE_URL_API}/transaction/semesterList/${nim}`
      );
      console.log("ini respnse", response);
      const sortedData = response.data.data.sort((a, b) =>
        a.semester.localeCompare(b.semester, undefined, { numeric: true })
      );

      const reversedData = sortedData.reverse();

      setSemesterData(reversedData);
    } catch (error) {
      console.log(error.message);
      console.log("ini error: ", error);
    }
  };

  useEffect(() => {
    getDataGrade();
  }, []);
  console.log("ini yg mo loop", semesterData);

  const handleNavigateGrade = async (value) => {
    try {
      const gradeDetailsResult = await axios.get(
        `${BASE_URL_API}/grades/semesterList/${value.id}`
      );
      const detail = gradeDetailsResult.data.data;
      let path = `/bimbingan-akademik/student-grade/`;
      console.log("isi detail", detail);
      navigate(`${path}${value.id}`, {
        state: {
          gradeDetails: {
            semester: detail.semester,
            subject: detail.subject,
          },
        },
      });
    } catch (error) {
      console.log(error.message);
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
        <Typography variant="h5">Select a semester to view grades.</Typography>
      )}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {semesterData.map((value, index) => (
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
