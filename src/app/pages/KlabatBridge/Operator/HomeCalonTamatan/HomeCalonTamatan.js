import React, {useState, useEffect } from 'react';
import {
    Typography,
    Box,
    Button,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const HomeCalonTamatan = () => {
  // Use useLocation to get the state passed through the route
  const { state } = useLocation();
  const [buttonColor, setButtonColor] = useState(state ? state.buttonColor : '#E8EBE8');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [buttonText, setButtonText] = useState(state ? state.buttonText : 'Silahkan mengisi form SPT');

  useEffect(() => {
    // Update the button color when the state changes
    if (state && state.buttonColor) {
      setButtonColor(state.buttonColor);
    }

     // Update the formSubmitted state
     if (state && state.formSubmitted !== undefined) {
      setFormSubmitted(state.formSubmitted);
    }

    // Update the buttonText state
    if (state && state.buttonText) {
      setButtonText(state.buttonText);
    }
  }, [state]);

  return (
    <Box>
      <Link to="/klabat-bridge/pengisian-spt" style={{ textDecoration: "none", width: "100%" }} >
        <span style={{ color: formSubmitted === true ? "gray" : "inherit", pointerEvents: formSubmitted === true ? "none" : "auto" }}>
          <Box
            component="div"
            sx={{
              padding: "10px 15px",
              backgroundColor: buttonColor,
              color: "black",
              border: "none", /* Remove borders */
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              height: "70px",
              textAlign: "left",
              textTransform: "none",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            {buttonText}    
          </Box>
        </span>
      </Link>
    </Box>
  )
}

export default HomeCalonTamatan




