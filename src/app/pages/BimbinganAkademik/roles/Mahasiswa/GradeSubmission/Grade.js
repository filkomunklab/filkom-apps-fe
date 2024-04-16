import React, { useEffect, useState } from "react";
import GradeSubmission from "./GradeSubmission";
import GradeSubmissionClosed from "./GradeSubmissionClosed";
import GradeSubmitted from "./GradeSubmitted";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { useNavigate } from "react-router-dom";
import { handleAuthenticationError } from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const Grade = () => {
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const [dataGrade, setDataGrade] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const getDataGrade = async () => {
    try {
      const { nim, id } = JSON.parse(localStorage.getItem("user"));
      const studentData = await jwtAuthAxios.get(`/student/${nim}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      const major = studentData.data.data.major;

      const result = await jwtAuthAxios.get(`/access/isOpen/${major}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      setDataGrade(result.data.data);

      const resultCurrent = await jwtAuthAxios.get(
        `/transaction/student/currentGrades/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );
      const transactionId = resultCurrent.data.data[0].id;

      const checkTransactionId = await jwtAuthAxios.get(
        `/transaction/grades/check/${transactionId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      if (checkTransactionId.data.data !== null) {
        setSubmissionStatus("success");
      } else {
        setSubmissionStatus("error cuyy");
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
    getDataGrade();
    return () => controller.abort();
  }, []);

  return (
    <div>
      {dataGrade === null ||
      dataGrade?.length === 0 ||
      dataGrade?.isOpen === false ? (
        <GradeSubmissionClosed />
      ) : submissionStatus === "success" ? (
        <GradeSubmitted />
      ) : (
        <GradeSubmission />
      )}
    </div>
  );
};

export default Grade;
