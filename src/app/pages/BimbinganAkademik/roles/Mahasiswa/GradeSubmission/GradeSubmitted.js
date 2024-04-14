import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { useNavigate } from "react-router-dom";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const GradeSubmitted = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

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
          {new Date(dataGrade.dueDate).toLocaleDateString("en-US", {
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
          You have successfully submitted your grades. Please wait for a
          response from the Head of Study Program. If you have any inquiries
          regarding this matter, kindly contact the Head of Study Program. You
          can also seek further assistance on the Consultation page. <br />
          <br />
          If you wish to view the list of course grades you've submitted, please
          navigate to the History page. Alternatively, if you want to view the
          approved grades, please visit the Grades page.
        </Typography>
      </Paper>
    </div>
  );
};

export default GradeSubmitted;
