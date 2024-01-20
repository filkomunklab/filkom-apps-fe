import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import PreRegistrationClosedCase from "./PreRegistrationClosedCase";
import PreRegistrationSubmission from "./PreRegistrationSubmission";
import PreRegistrationSubmitted from "./PreRegistrationSubmitted";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

const PreRegistration = () => {
  const [dataPreregis, setDataPreregis] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const getDataPreregis = async () => {
    try {
      const nim = JSON.parse(localStorage.getItem("user")).nim;

      const studentData = await jwtAuthAxios.get(`/student/${nim}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const major = studentData.data.data.major;

      const result = await jwtAuthAxios.get(
        `/pre-regist/status/${major}/${nim}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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
