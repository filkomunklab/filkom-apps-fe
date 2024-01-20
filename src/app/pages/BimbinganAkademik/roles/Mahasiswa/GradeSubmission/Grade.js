import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import GradeSubmission from "./GradeSubmission";
import GradeSubmissionClosed from "./GradeSubmissionClosed";
import GradeSubmitted from "./GradeSubmitted";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

const Grade = () => {
  const [dataGrade, setDataGrade] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const getDataGrade = async () => {
    try {
      const nim = JSON.parse(localStorage.getItem("user")).nim;
      const studentData = await jwtAuthAxios.get(`/student/${nim}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const major = studentData.data.data.major;
      const result = await jwtAuthAxios.get(`/access/isOpen/${major}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const gradeData = result.data.data;
      // const result = await axios.get(`${BASE_URL_API}/access/isOpen/${major}/`);
      // const gradeData = result.data.data.isOpen;
      setDataGrade(gradeData);

      console.log("ini panjang gradedata", result);
    } catch (error) {
      console.log(error.message);
      console.log("ini error: ", error);
    }
  };

  useEffect(() => {
    getDataGrade();
  }, []);

  return (
    <div>
      {console.log("ini isi dari dataGrade", dataGrade)}

      {dataGrade === null || dataGrade.length === 0 ? (
        <GradeSubmissionClosed />
      ) : (
        <GradeSubmission />
      )}
    </div>
  );
};

export default Grade;
