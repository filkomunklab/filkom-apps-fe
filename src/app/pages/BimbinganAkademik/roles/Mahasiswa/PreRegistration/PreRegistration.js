import React, { useEffect, useState } from "react";
import PreRegistrationClosedCase from "./PreRegistrationClosedCase";
import PreRegistrationSubmission from "./PreRegistrationSubmission";
import PreRegistrationSubmitted from "./PreRegistrationSubmitted";
import { useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const PreRegistration = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const [dataPreregis, setDataPreregis] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState("");

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
        }
      );
      const preregisData = result.data.data;
      setDataPreregis(preregisData);

      if (
        preregisData &&
        Array.isArray(preregisData.PreRegistrationData) &&
        preregisData.PreRegistrationData.length > 0 &&
        submissionStatus !== "success"
      ) {
        setSubmissionStatus("success");
      }
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
