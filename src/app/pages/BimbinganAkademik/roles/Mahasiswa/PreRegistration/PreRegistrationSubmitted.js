import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";

const PreRegistrationSubmitted = () => {
  const [dataPreregis, setDataPreregis] = useState([]);
  const getDataPreregis = async () => {
    try {
      const nim = JSON.parse(localStorage.getItem("user")).nim;
      const studentData = await axios.get(`${BASE_URL_API}/student/${nim}`);
      const major = studentData.data.data.major;
      const result = await axios.get(
        `${BASE_URL_API}/pre-regist/status/${major}/${nim}`
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
        Courses Pre-registration
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
          KRS has already been filled in.
          <br />
          <br />
          Date of KRS Filling:{" "}
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

export default PreRegistrationSubmitted;
