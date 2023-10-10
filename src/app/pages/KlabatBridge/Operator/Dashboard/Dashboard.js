import Div from "@jumbo/shared/Div";
import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  Icon,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Pagination,
} from "@mui/material";
import ActionButton from "app/shared/ActionButton";
import SearchGlobal from "app/shared/SearchGlobal";
import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import SchoolIcon from '@mui/icons-material/School';
import { Search } from "@mui/icons-material";
//import PetaIndo from "public/images/peta-indonesia.jpg";

const citiesData = [
    { name: "Jakarta", population: 10770487 },
    { name: "Surabaya", population: 2831000 },
    { name: "Bandung", population: 2575479 },
    { name: "Medan", population: 2468571 },
    { name: "Semarang", population: 1692157 },
  ];

const calculatePercentage = (population) => {
const totalPopulation = citiesData.reduce((total, city) => total + city.population, 0);
return ((population / totalPopulation) * 100).toFixed(2);
};

const Dashboard = () => {

  return (
    <Div>
        <Div
            sx={{
                marginBottom:"20px",
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 300,
                    height: 80,
                    mb: 2,
                },
            }}
        >
            <Paper sx={{p: 1.5 }}>
                <Box display="flex" alignItems="center">
                    <SchoolIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
                    <Box flexGrow={1}>
                    <Typography variant="subtitle1" sx={{ fontSize: "14px"}}>Total Mahasiswa FILKOM</Typography>
                    <Typography variant="body2" sx={{ fontSize: "22px", fontWeight: 500 }}>1,324 Mahasiswa</Typography>
                    </Box>
                </Box>
            </Paper>
            <Paper sx={{p: 1.5 }}>
                <Box display="flex" alignItems="center">
                    <SchoolIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
                    <Box flexGrow={1}>
                    <Typography variant="subtitle1" sx={{ fontSize: "14px"}}>Mahasiswa Informatika</Typography>
                    <Typography variant="body2" sx={{ fontSize: "22px", fontWeight: 500 }}>357 Mahasiswa</Typography>
                    </Box>
                </Box>
            </Paper>
            <Paper sx={{p: 1.5 }}>
                <Box display="flex" alignItems="center">
                    <SchoolIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
                    <Box flexGrow={1}>
                    <Typography variant="subtitle1" sx={{ fontSize: "14px"}}>Mahasiswa Sistem Informasi</Typography>
                    <Typography variant="body2" sx={{ fontSize: "22px", fontWeight: 500 }}>486 Mahasiswa</Typography>
                    </Box>
                </Box>
            </Paper>
            <Paper sx={{p: 1.5 }}>
                <Box display="flex" alignItems="center">
                    <SchoolIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
                    <Box flexGrow={1}>
                    <Typography variant="subtitle1" sx={{ fontSize: "14px"}}>Mahasiswa Animasi dan Desain</Typography>
                    <Typography variant="body2" sx={{ fontSize: "22px", fontWeight: 500 }}>165 Mahasiswa</Typography>
                    </Box>
                </Box>
            </Paper>
        </Div>

        {/* Indonesia's map */}
        <div style={{ display: "flex", padding: 20 }}>
      {/* Map Image on the Left Side */}
      <div style={{ marginRight: 20 }}>
        {/* <img src={PetaIndo} alt="Indonesia Map" style={{ maxWidth: "100%", height: "auto" }} /> */}
      </div>

      {/* Table on the Right Side */}
      <div>
        <Typography variant="h4" gutterBottom>
          Top 5 Most Crowded Cities in Indonesia
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>City</TableCell>
                <TableCell>Population</TableCell>
                <TableCell>Percentage</TableCell> {/* New Percentage Column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {citiesData.map((city, index) => (
                <TableRow key={index}>
                  <TableCell>{city.name}</TableCell>
                  <TableCell>{city.population}</TableCell>
                  <TableCell>{calculatePercentage(city.population)}%</TableCell> {/* Display Percentage */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
    </Div>
  );
};

export default Dashboard;
