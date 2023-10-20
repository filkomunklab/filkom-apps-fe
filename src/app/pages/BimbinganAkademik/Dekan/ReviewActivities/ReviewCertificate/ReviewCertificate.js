import React, { useEffect, useState } from "react";
import Div from "@jumbo/shared/Div";
import { Typography, Select, MenuItem } from "@mui/material";
import ReviewCertificateMentored from "./ReviewCertificateMentored";
import ReviewCertificateFaculty from "./ReviewCertificateFaculty";

const ReviewCertificate = () => {
  const [reviewCertificate, setReviewCertificate] = useState(
    "selectReviewCertificate"
  );

  const [
    certificateMentoredContentVisible,
    setCertificateMentoredContentVisible,
  ] = useState(false);
  const [
    certificateFacultyContentVisible,
    setCertificateFacultyContentVisible,
  ] = useState(false);

  useEffect(() => {
    reviewCertificate === "certificateMentored"
      ? setCertificateMentoredContentVisible(true)
      : setCertificateMentoredContentVisible(false);
    reviewCertificate === "certificateFaculty"
      ? setCertificateFacultyContentVisible(true)
      : setCertificateFacultyContentVisible(false);
  }, [reviewCertificate]);

  const handleOnChange = (e) => {
    setReviewCertificate(e.target.value);
  };

  return (
    <Div>
      <Div>
        <Typography variant="h1" sx={{ mb: 3 }}>
          Review Certificate
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          This page contains information related to the collection of
          certificates from your students. You can use filters to sort the list
          of students to get the information you are looking for.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            paddingBottom: "12px",
            fontWeight: 400,
            color: "rgba(27, 43, 65, 0.69)",
          }}
        >
          You Can Specify a List of Mentored Students or All Faculty Students.
        </Typography>
      </Div>
      <div>
        <Select
          value={reviewCertificate}
          onChange={handleOnChange}
          sx={{ width: "100%", backgroundColor: "rgba(26, 56, 96, 0.1)" }}
        >
          <MenuItem value="selectReviewCertificate">
            <Typography sx={{ fontWeight: 400 }}>View List Student</Typography>
          </MenuItem>
          <MenuItem value="certificateMentored">
            Certificate Mentored Student
          </MenuItem>
          <MenuItem value="certificateFaculty">
            Certificate Faculty Student
          </MenuItem>
        </Select>
      </div>
      {certificateMentoredContentVisible && <ReviewCertificateMentored />}
      {certificateFacultyContentVisible && <ReviewCertificateFaculty />}
    </Div>
  );
};

export default ReviewCertificate;
