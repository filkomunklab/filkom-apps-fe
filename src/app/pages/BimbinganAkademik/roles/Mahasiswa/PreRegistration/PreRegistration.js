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
      const nim = JSON.parse(localStorage.getItem("user")).nim;
      const studentData = await axios.get(`${BASE_URL_API}/student/${nim}`);
      const major = studentData.data.data.major;
      const result = await axios.get(
        `${BASE_URL_API}/pre-regist/status/${major}/${nim}`
      );
      const preregisData = result.data.data;
      setDataPreregis(preregisData);

      console.log("ini panjang preregisdata", preregisData.PreRegistrationData);
      console.log("Data preregistration:", preregisData);
      if (
        Array.isArray(preregisData.PreRegistrationData) &&
        preregisData.PreRegistrationData.length > 0
      ) {
        setSubmissionStatus("success");
      }
    } catch (error) {
      console.log(error.message);
      console.log("ini error: ", error);
    }
  };

  useEffect(() => {
    getDataPreregis();
  }, [submissionStatus]);

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
