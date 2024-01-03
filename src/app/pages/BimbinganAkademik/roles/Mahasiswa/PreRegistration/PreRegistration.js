import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import PreRegistrationClosedCase from "./PreRegistrationClosedCase";
import PreRegistrationSubmission from "./PreRegistrationSubmission";
import PreRegistrationSubmitted from "./PreRegistrationSubmitted";

const PreRegistration = () => {
  const [dataPreregis, setDataPreregis] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const getDataPreregis = async () => {
    try {
      const studentData = await axios.get(
        `${BASE_URL_API}/student/${
          JSON.parse(localStorage.getItem("user")).nim
        }`
      );
      console.log("isi student data", studentData);
      const major = studentData.data.data.major;
      const result = await axios.get(
        `${BASE_URL_API}/pre-regist/?major=${major}`
      );

      const preregisData = result.data.data;
      setDataPreregis(preregisData);

      if (preregisData && preregisData.preRegistrationData.length > 0) {
        setSubmissionStatus("success");
      }
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
      {dataPreregis === null || dataPreregis.length === 0 ? (
        <PreRegistrationClosedCase />
      ) : submissionStatus === "success" ? (
        <PreRegistrationSubmitted />
      ) : (
        <PreRegistrationSubmission />
      )}
    </div>
  );
};

export default PreRegistration;
