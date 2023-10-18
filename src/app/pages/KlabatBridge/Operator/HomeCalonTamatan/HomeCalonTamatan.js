import React, {useState} from 'react';
import Div from "@jumbo/shared/Div";
import {
    Typography,
    Box,
} from "@mui/material";

const HomeCalonTamatan = () => {
  return (
    <Box sx={{
        backgroundColor:"#E8EBE8", 
        height: "70px", 
        display: 'flex',
        alignItems: 'center',
        borderRadius: "5px",
        paddingLeft: "25px",
    }}>
        <Typography sx={{fontSize: "16px", fontWeight: 500,}}>Silahkan mengisi form SPT</Typography>
    </Box>
  )
}

export default HomeCalonTamatan