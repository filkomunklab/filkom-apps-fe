import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const CustomAlert = ({ message, onClose }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="warning" onClose={onClose}>
        {message}
      </Alert>
    </Stack>
  );
};

export default CustomAlert;
