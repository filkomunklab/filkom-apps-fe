import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import GradeSubmission from "./GradeSubmission";
import GradeSubmissionClosed from "./GradeSubmissionClosed";
import GradeSubmitted from "./GradeSubmitted";

const Grade = () => {
  const [dataGrade, setDataGrade] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const getDataGrade = async () => {
    try {
      const nim = JSON.parse(localStorage.getItem("user")).nim;
      const studentData = await axios.get(`${BASE_URL_API}/student/${nim}`);
      const major = studentData.data.data.major;
      const result = await axios.get(
        `${BASE_URL_API}/access/list/gradesAccess/${major}/`
      );
      const gradeData = result.data.data;
      setDataGrade(gradeData);

      console.log("ini panjang gradedata", gradeData);
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
      {dataGrade === null || dataGrade.length === 0 ? (
        <GradeSubmissionClosed />
      ) : (
        <GradeSubmission />
      )}
    </div>
  );
};

export default Grade;
