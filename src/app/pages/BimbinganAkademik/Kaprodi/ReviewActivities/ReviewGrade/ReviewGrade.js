import React, { useEffect, useState } from "react";
import Div from "@jumbo/shared/Div";
import { Typography, Select, MenuItem } from "@mui/material";
import ReviewGradeMentored from "./ReviewGradeMentored";
import ReviewGradeFaculty from "./ReviewGradeFaculty";

const ReviewGrade = () => {
  const [reviewGrade, setReviewGrade] = useState("selectReviewGrade");

  const [gradeMentoredContentVisible, setGradeMentoredContentVisible] =
    useState(false);
  const [gradeFacultyContentVisible, setGradeFacultyContentVisible] =
    useState(false);

  useEffect(() => {
    reviewGrade === "gradeMentored"
      ? setGradeMentoredContentVisible(true)
      : setGradeMentoredContentVisible(false);
    reviewGrade === "gradeFaculty"
      ? setGradeFacultyContentVisible(true)
      : setGradeFacultyContentVisible(false);
  }, [reviewGrade]);

  const handleOnChange = (e) => {
    setReviewGrade(e.target.value);
  };

  return (
    <Div>
      <Div>
        <Typography variant="h1" sx={{ mb: 3, fontWeight: 500 }}>
          Review Grade
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
          This page contains information related to the collection of grades
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
          value={reviewGrade}
          onChange={handleOnChange}
          sx={{ width: "100%", backgroundColor: "rgba(26, 56, 96, 0.1)" }}
        >
          <MenuItem value="selectReviewGrade">
            <Typography sx={{ fontWeight: 400 }}>View List Student</Typography>
          </MenuItem>
          <MenuItem value="gradeMentored">Grades Mentored Student</MenuItem>
          <MenuItem value="gradeFaculty">Grades Faculty Student</MenuItem>
        </Select>
      </div>
      {gradeMentoredContentVisible && <ReviewGradeMentored />}
      {gradeFacultyContentVisible && <ReviewGradeFaculty />}
    </Div>
  );
};

export default ReviewGrade;
