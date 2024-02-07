import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { useNavigate } from "react-router-dom";

const GradeSubmitted = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  //get data
  const [dataGrade, setDataGrade] = useState([]);
  const getDataGrade = async () => {
    try {
      const nim = JSON.parse(localStorage.getItem("user")).nim;
      const studentData = await jwtAuthAxios.get(`/student/${nim}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      const major = studentData.data.data.major;
      const result = await jwtAuthAxios.get(`/access/isOpen/${major}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });

      const gradeData = result.data.data;
      setDataGrade(gradeData);

      console.log("ini panjang gradedata", result);
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (
        error.response &&
        error.response.status >= 401 &&
        error.response.status <= 403
      ) {
        console.log("You don't have permission to access this page");
        navigate(`/`);
        return;
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
  return (
    <div>
      <Typography sx={{ fontSize: "24px", fontWeight: 500, paddingBottom: 2 }}>
        Grade Submission
      </Typography>
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
          Grade has already been filled in.
          <br />
          <br />
          Date of Grade Filling:{" "}
          {new Date(dataGrade.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}{" "}
          -{" "}
          {new Date(dataGrade.due_date).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </Typography>
      </Paper>
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
          You have pre-registered for courses for next semester. Please wait for
          a response from your Supervisor. If you have any questions regarding
          this matter, please contact your Supervisor. You can also consult on
          the Consultation page. <br />
          <br />
          If you want to see a list of pre-registration courses that you have
          entered, then please go to the Current Activities page or History
          page.
        </Typography>
      </Paper>
    </div>
  );
};

export default GradeSubmitted;
