import React from "react";
import { Typography, Paper } from "@mui/material";

const PreRegistrationClosedCase = () => {
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
          The preregistration period for courses has closed. Please wait for
          direction from your Head of Study Program.
        </Typography>
      </Paper>
    </div>
  );
};

export default PreRegistrationClosedCase;
