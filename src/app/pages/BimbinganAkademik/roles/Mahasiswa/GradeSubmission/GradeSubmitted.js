import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

const GradeSubmitted = () => {
  const [dataPreregis, setDataPreregis] = useState([]);
  const getDataPreregis = async () => {
    try {
      const nim = JSON.parse(localStorage.getItem("user")).nim;
      const studentData = await jwtAuthAxios.get(`/student/${nim}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const major = studentData.data.data.major;
      const result = await jwtAuthAxios.get(
        `/pre-regist/status/${major}/${nim}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setDataPreregis(result.data.data);
    } catch (error) {
      console.log(error.message);
      console.log("ini error: ", error);
    }
  };
  useEffect(() => {
    getDataPreregis();
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
          {new Date(dataPreregis.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}{" "}
          -{" "}
          {new Date(dataPreregis.dueDate).toLocaleDateString("en-US", {
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
