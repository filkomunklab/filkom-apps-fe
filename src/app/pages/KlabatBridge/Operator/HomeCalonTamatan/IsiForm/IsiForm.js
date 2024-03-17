import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const IsiForm = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/klabat-bridge/home-calon-tamatan", {
      state: {
        buttonColor: "#B1FFA5",
        formSubmitted: true,
        buttonText: "Anda telah mengisi form SPT",
      },
    });
  };

  return (
    <Box>
      <Button onClick={handleSubmit}>
        {/* <Link to="/klabat-bridge/home-calon-tamatan">Submit</Link> */}
        Submit
      </Button>

      {/* <Box sx={{
          backgroundColor:"#E8EBE8", 
          height: "70px", 
          display: 'flex',
          alignItems: 'center',
          borderRadius: "5px",
          paddingLeft: "25px",
      }}>
          <Typography sx={{fontSize: "16px", fontWeight: 500,}}>Form TEst</Typography>
      </Box> */}
    </Box>
  );
};

export default IsiForm;
