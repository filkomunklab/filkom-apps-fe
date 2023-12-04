import React from "react";
import { Typography, Paper } from "@mui/material";

const PreRegistrationSubmitted = () => {
  return (
    <div>
      <Typography sx={{ fontSize: "24px", fontWeight: 500, paddingBottom: 2 }}>
        Courses Pre-registration
      </Typography>
      <Paper
        sx={{
          backgroundColor: "rgba(0, 106, 245, 0.1)",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "50px",
          marginBottom: "15px",
        }}
      >
        <Typography variant="body1">
          Already filled in KRS
          <br />
          <br />
          Date of KRS Filling: September 09, 2023 - September 12, 2023, at 19.00
        </Typography>
      </Paper>
      <Paper
        sx={{
          backgroundColor: "rgba(0, 106, 245, 0.1)",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "50px",
          marginBottom: "15px",
        }}
      >
        <Typography variant="body1">
          You have pre-registered for courses for next semester. Please wait for
          a response from your Supervisor. If you have any questions regarding
          this matter, please contact your Supervisor. You can also consult on
          the Consultation page. <br />
          <br />
          If you want to see a list of pre-registration courses that you have
          entered, then please go to the Activity History page.
        </Typography>
      </Paper>
    </div>
  );
};

export default PreRegistrationSubmitted;
