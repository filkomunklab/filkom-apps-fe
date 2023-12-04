import React, { useEffect, useState } from "react";
import Div from "@jumbo/shared/Div";
import { Typography, Select, MenuItem } from "@mui/material";
import ReviewPreRegistrationMentored from "./ReviewPreRegistrationMentored";
import ReviewPreRegistrationFaculty from "./ReviewPreRegistrationFaculty";

const ReviewPreRegistration = () => {
  const [reviewPreRegistration, setReviewPreRegistration] = useState(
    "selectReviewPreRegistration"
  );

  const [
    preRegistrationMentoredContentVisible,
    setPreRegistrationMentoredContentVisible,
  ] = useState(false);
  const [
    preRegistrationFacultyContentVisible,
    setPreRegistrationFacultyContentVisible,
  ] = useState(false);

  useEffect(() => {
    reviewPreRegistration === "preRegistrationMentored"
      ? setPreRegistrationMentoredContentVisible(true)
      : setPreRegistrationMentoredContentVisible(false);
    reviewPreRegistration === "preRegistrationFaculty"
      ? setPreRegistrationFacultyContentVisible(true)
      : setPreRegistrationFacultyContentVisible(false);
  }, [reviewPreRegistration]);

  const handleOnChange = (e) => {
    setReviewPreRegistration(e.target.value);
  };

  return (
    <Div>
      <Div>
        <Typography variant="h1" sx={{ mb: 3, fontWeight: 500 }}>
          Review Pre-Registration
        </Typography>
        <Typography
          variant="h6"
          sx={{
            paddingBottom: "25px",
            fontSize: "15px",
            fontWeight: 400,
            color: "rgba(27, 43, 65, 0.69)",
            textAlign: "justify",
          }}
        >
          This page contains information related to pre-registration collection
          from your students. You can use filters to sort the list of students
          to get the information you are looking for.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            paddingBottom: "25px",
            fontSize: "15px",
            fontWeight: 400,
            color: "rgba(27, 43, 65, 0.69)",
            textAlign: "justify",
          }}
        >
          You Can Specify a List of Mentored Students or All Faculty Students.
        </Typography>
      </Div>
      <div>
        <Select
          value={reviewPreRegistration}
          onChange={handleOnChange}
          sx={{ width: "100%", backgroundColor: "rgba(26, 56, 96, 0.1)" }}
        >
          <MenuItem value="selectReviewPreRegistration">
            <Typography sx={{ fontWeight: 400 }}>View List Student</Typography>
          </MenuItem>
          <MenuItem value="preRegistrationMentored">
            Pre-Registration Mentored Student
          </MenuItem>
          <MenuItem value="preRegistrationFaculty">
            Pre-Registration Faculty Student
          </MenuItem>
        </Select>
      </div>
      {preRegistrationMentoredContentVisible && (
        <ReviewPreRegistrationMentored />
      )}
      {preRegistrationFacultyContentVisible && <ReviewPreRegistrationFaculty />}
    </Div>
  );
};

export default ReviewPreRegistration;
