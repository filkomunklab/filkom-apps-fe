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
  const navigate = useNavigate();

  const [dataPreregis, setDataPreregis] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const getDataPreregis = async () => {
    try {
      const { nim, id } = JSON.parse(localStorage.getItem("user"));
      const studentData = await jwtAuthAxios.get(`/student/${nim}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const major = studentData.data.data.major;

      const result = await jwtAuthAxios.get(
        `/pre-regist/status/${major}/${id}`,
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
      if (error.response && error.response.status === 403) {
        handlePermissionError();
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else if (error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else if (error.code === "ECONNABORTED") {
        console.log("Request timeout. Please check your internet connection.");
      } else {
        console.log("An error occurred: ", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getDataPreregis();
      } catch (error) {
        console.log("An error occurred while fetching data: ", error);
      }
    };

    fetchData();

    return () => {};
  }, [submissionStatus]);

  return (
    <div>
      {dataPreregis.isOpen === false ? (
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
