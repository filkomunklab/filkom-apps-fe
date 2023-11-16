import React, { useState, useEffect } from "react";
import Div from "@jumbo/shared/Div";
import {
  Typography,
  Box,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const HomeAlumni = () => {
  // Use useLocation to get the state passed through the route
  const { state } = useLocation();
  const [buttonColor, setButtonColor] = useState(state ? state.buttonColor : '#E8EBE8');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [buttonText, setButtonText] = useState(state ? state.buttonText : 'Silahkan mengisi form Tracer Study');

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
    <Div >
      <Link to="/klabat-bridge/form-tracer-study" style={{ textDecoration: "none", width: "100%" }} >
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
    </Div>
    
  )
}

export default HomeAlumni