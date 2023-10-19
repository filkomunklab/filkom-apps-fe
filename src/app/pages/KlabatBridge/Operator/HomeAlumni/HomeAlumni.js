import React, { useState } from "react";
import Div from "@jumbo/shared/Div";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Paper,
  Radio,
  FormControl, 
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Grid,
  TextField,
  Input,
  Button,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

const HomeAlumni = () => {

  return (
    <Div >
      <Box sx={{
        backgroundColor:"#E8EBE8", 
        height: "70px", 
        display: 'flex',
        alignItems: 'center',
        borderRadius: "5px",
        paddingLeft: "25px",
      }}>
        <Typography sx={{
          fontSize: "16px", fontWeight: 500,
        }}>
          Silahkan mengisi form Tracer Study
        </Typography>
      </Box>

      
    </Div>
    
  )
}

export default HomeAlumni