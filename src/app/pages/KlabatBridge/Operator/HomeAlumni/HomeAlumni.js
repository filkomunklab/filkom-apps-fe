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
} from "@mui/material";


import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";


const HomeAlumni = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Select Date"
          format="dd/MM/yyyy" // Set the desired input date format here (day/month/year)
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      {/* <Box sx={{
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
      </Box> */}

      
    </Div>
    
  )
}

export default HomeAlumni