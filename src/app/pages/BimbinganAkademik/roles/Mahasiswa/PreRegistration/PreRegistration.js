import React, { useEffect, useState } from "react";
import PreRegistrationClosedCase from "./PreRegistrationClosedCase";
import PreRegistrationSubmission from "./PreRegistrationSubmission";
import PreRegistrationSubmitted from "./PreRegistrationSubmitted";
import { useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { handleAuthenticationError } from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

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
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.error("error: ");
        return;
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
      {dataPreregis === null ||
      dataPreregis?.length === 0 ||
      dataPreregis.isOpen === false ? (
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
