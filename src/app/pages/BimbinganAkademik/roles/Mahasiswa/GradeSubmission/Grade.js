import React, { useEffect, useState } from "react";
import GradeSubmission from "./GradeSubmission";
import GradeSubmissionClosed from "./GradeSubmissionClosed";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { useNavigate } from "react-router-dom";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const Grade = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const [dataGrade, setDataGrade] = useState(null);

  const getDataGrade = async () => {
    try {
      const nim = JSON.parse(localStorage.getItem("user")).nim;
      const studentData = await jwtAuthAxios.get(`/student/${nim}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      const major = studentData.data.data.major;
      const result = await jwtAuthAxios.get(`/access/isOpen/${major}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });

      const gradeData = result.data.data;
      setDataGrade(gradeData);

      console.log("ini panjang gradedata", result);
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
    getDataGrade();
    return () => controller.abort();
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
