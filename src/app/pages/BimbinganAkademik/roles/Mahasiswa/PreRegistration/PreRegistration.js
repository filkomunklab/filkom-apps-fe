import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import PreRegistrationClosedCase from "./PreRegistrationClosedCase";
import PreRegistrationSubmission from "./PreRegistrationSubmission";
import PreRegistrationSubmitted from "./PreRegistrationSubmitted";

const PreRegistration = () => {
  const [dataPreregis, setDataPreregis] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(
    localStorage.getItem("submissionStatus") || null
  );

  const getDataPreregis = async () => {
    try {
      const studentData = await axios.get(
        `${BASE_URL_API}/student/${
          JSON.parse(localStorage.getItem("user")).nim
        }`
      );
      const major = studentData.data.data.major;
      const result = await axios.get(
        `${BASE_URL_API}/pre-regist/status/${major}`
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

  useEffect(() => {
    if (submissionStatus === "success") {
      localStorage.setItem("submissionStatus", "success");
    }
  }, [submissionStatus]);

  return (
    <div>
      {dataPreregis === null ? (
        <PreRegistrationClosedCase />
      ) : submissionStatus === "success" ? (
        <PreRegistrationSubmitted />
      ) : (
        <PreRegistrationSubmission submissionStatus={setSubmissionStatus} />
      )}
    </div>
  );
};

export default PreRegistration;
