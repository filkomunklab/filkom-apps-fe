import Div from "@jumbo/shared/Div";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  Card, 
  CardContent,
  CardMedia,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import SchoolIcon from '@mui/icons-material/School';
import { 
  BarChart, 
  Bar, XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  LabelList,
  ResponsiveContainer,
 } from 'recharts';
import petaIndonesia from "./Indonesia.svg"

const alumniDistribution = [
  { region: 'Jakarta', alumni: 150, percentage: 30 },
  { region: 'Bali', alumni: 80, percentage: 16 },
  { region: 'Java', alumni: 200, percentage: 40 },
  { region: 'Sumatra', alumni: 120, percentage: 24 },
  { region: 'Kalimantan', alumni: 90, percentage: 18 }
];

const studentsDistribution = [
  { year: '2013', TI: 150, DKV: 100, SI: 75 },
  { year: '2014', TI: 75, DKV: 200, SI: 100 },
  { year: '2015', TI: 150, DKV: 50, SI: 100 },
  { year: '2016', TI: 150, DKV: 100, SI: 50 },
  { year: '2017', TI: 50, DKV: 50, SI: 100 },
  { year: '2018', TI: 100, DKV: 50, SI: 100 },
  { year: '2019', TI: 150, DKV: 100, SI: 50 },
  { year: '2020', TI: 100, DKV: 50, SI: 200 },
  { year: '2021', TI: 150, DKV: 100, SI: 150 },
  { year: '2022', TI: 100, DKV: 50, SI: 250 },
  { year: '2023', TI: 250, DKV: 100, SI: 150 },
  
];

const Dashboard = () => {
  return (
      <Div >
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

        {/* Persebaran alumni */}
        <Card sx={{mb:5}}>
          <Typography variant="h1" sx={{ fontSize: "20px", fontWeight: 500, ml: 5, mt: 5 }}>
            PERESEBARAN ALUMNI FILKOM DI INDONESIA
          </Typography>
          <Div sx={{ p: 5, display: 'flex' }}>
            <Div sx={{ width: '50%', marginRight: '20px'}}>
              <CardMedia
                component="img"
                alt="Your Image"
                height="auto"
                width="auto"
                image={petaIndonesia}
                sx={{ objectFit: 'cover', mr: 5 }} // Set the width to 50%
              />
            </Div>
            <TableContainer sx={{ width: '50%' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Region</TableCell>
                      <TableCell align="center">Alumni</TableCell>
                      <TableCell align="center">%Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {alumniDistribution.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.region}</TableCell>
                        <TableCell align="center">{row.alumni}</TableCell>
                        <TableCell align="center">{row.percentage}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </TableContainer>
          </Div>
          <CardContent>
            {/* <Typography variant="h5" component="div">
              Image Title
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description of your image.
            </Typography> */}
          </CardContent>
        </Card>

        {/* Distribusi mahasiswa */}
        <Card sx={{p: 3}}>
          <Typography variant="h1" sx={{ fontSize: "20px", fontWeight: 500, ml: 5, mt: 5 }}>
            DISTRIBUSI MAHASISWA
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={studentsDistribution}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis label={{ value: 'Jumlah Mahasiswa', angle: -90, position: 'insideLeft', dy: 50 }} />
          <Tooltip />
          <Legend iconType="circle" />
          <Bar dataKey="TI" fill="#FFCC00" name="TI" />
          <Bar dataKey="DKV" fill="#E21D12" name="DKV" />
          <Bar dataKey="SI" fill="#006AF5" name="SI" />
        </BarChart>
      </ResponsiveContainer>
        </Card>
      </Div>
    );
  };

export default Dashboard;
