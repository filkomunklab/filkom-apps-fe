import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Stack,
  Grid,
  Box,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

const requiredStyle = {
  color: "red",
  marginLeft: "4px",
};

function RTypography({ children, sx }) {
  return (
    <Typography variant="body1" sx={sx}>
      {children}
      <span style={requiredStyle}>*</span>
    </Typography>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
  maxWidth: "90%",
  "@media (max-width: 768px)": {
    maxWidth: "80%",
  },
  "@media (max-width: 480px)": {
    maxWidth: "80%",
  },
};

const style2 = {
  position: "fixed",
  top: "15%",
  right: "2%",
  width: 400,
  boxShadow: 24,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
};
import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Stack,
  Grid,
  FormControl,
  Box,
  Button,
  Input,
  IconButton,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

const requiredStyle = {
  color: "red",
  marginLeft: "4px",
};

function RTypography({ children, sx }) {
  return (
    <Typography variant="body1" sx={sx}>
      {children}
      <span style={requiredStyle}>*</span>
    </Typography>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
  maxWidth: "90%",
  "@media (max-width: 768px)": {
    maxWidth: "80%",
  },
  "@media (max-width: 480px)": {
    maxWidth: "80%",
  },
};

const style2 = {
  position: "fixed",
  top: "15%",
  right: "2%",
  width: 400,
  boxShadow: 24,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
};

const Consultation = () => {
  return (
    <div>
      <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
        Consultation
      </Typography>
    </div>
  );
};

export default Consultation;
