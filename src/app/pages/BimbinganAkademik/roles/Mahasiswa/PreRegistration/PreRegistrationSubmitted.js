import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { useNavigate } from "react-router-dom";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const PreRegistrationSubmitted = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const [dataPreregis, setDataPreregis] = useState([]);
  const getDataPreregis = async () => {
    try {
      const nim = JSON.parse(localStorage.getItem("user")).nim;
      const studentData = await jwtAuthAxios.get(`/student/${nim}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      const major = studentData.data.data.major;

      const result = await jwtAuthAxios.get(
        `/pre-regist/status/${major}/${nim}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );
      setDataPreregis(result.data.data);
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
    getDataPreregis();
    return () => controller.abort();
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
