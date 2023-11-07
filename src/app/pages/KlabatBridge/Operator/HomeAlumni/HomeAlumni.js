import React, { useState, useEffect } from "react";
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
  Select, 
  MenuItem,
  InputLabel,
  ListSubheader,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import CreateIcon from "@mui/icons-material/Create";
import MarkunreadIcon from "@mui/icons-material/Markunread";

const data = [
  { name: 'John', age: 30, city: 'New York' },
  { name: 'Alice', age: 25, city: 'Chicago' },
  { name: 'Bob', age: 35, city: 'Los Angeles' },
  { name: 'Tom & Jerry', age: 35, city: 'Los Angeles' },
  { name: 'Sam', age: 35, city: 'Los Angeles' },
  { name: 'Bob', age: 25, city: 'Washington' },
  // ...more data
];

const HomeAlumni = () => {

  const [filter, setFilter] = useState('');

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(filter.toString().toLowerCase())
    )
  );

  const handleChange = event => {
    setFilter(event.target.value);
  };

  return (
    <Div >
      {/* <FormControl sx={{m: 1, minWidth: 120}}>
        <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
        <Select 
          defaultValue="" 
          id="grouped-select" 
          label="Grouping"
          value={filter}
          onChange={handleChange}
        >
          <MenuItem value="">
              <em>None</em>
          </MenuItem>
          <ListSubheader>Name</ListSubheader>
          <MenuItem value={"John"}>John</MenuItem>
          <MenuItem value={"Alice"}>Alice</MenuItem>
          <MenuItem value={"Bob"}>Bob</MenuItem>
          <MenuItem value={"Tom & Jerry"}>Tom & Jerry</MenuItem>
          <ListSubheader>Age</ListSubheader>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={35}>35</MenuItem>
          <ListSubheader>Age</ListSubheader>
          <MenuItem value={"New York"}>New York</MenuItem>
          <MenuItem value={"Chicago"}>Chicago</MenuItem>
          <MenuItem value={"Los Angeles"}>Los Angeles</MenuItem>

        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}




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