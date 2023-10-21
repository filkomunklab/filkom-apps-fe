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
  Grid
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
  PieChart, 
  Pie, 
  Cell,
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

// pie chart - jumlah alumni yg menigisi TS
const pieChartData = [
  { name: 'Informatika', value: 450,  description: 'Description for Value 1' },
  { name: 'Sistem Informasi', value: 350,  description: 'Description for Value 2' },
  { name: 'Desain dan Animasi', value: 200,  description: 'Description for Value 3' },
];

// colors for pie chart
const pieColors = ['#FED605', '#0053C0', '#FF4242']; 

// bar chart - jenis perusahann tempat alumni bekerja
const data = [
  { organization: 'Instansi Pemerintahan', value: 30, color: '#6200EE' },
  { organization: 'BUMN/BUMD', value: 45, color: '#FFF735' },
  { organization: 'Institusi/Organisasi Multilateral', value: 28, color: '#6BFAD7' },
  { organization: 'Organisasi non-profit/Lembaga Swadaya Masyarakat', value: 60, color: '#128DFF' },
  { organization: 'Perusahaan Swasta', value: 15, color: '#001AFF' },
  { organization: 'Wiraswasta/Perusahaan sendiri', value: 80, color: '#C317FF' },
  { organization: 'Lainnya', value: 55, color: '#FC76DE' },
];
// const data = [
//   { organization: 'Pemerintahan', value: 30, color: '#8884d8' },
//   { organization: 'BUMN/BUMD', value: 45, color: '#82ca9d' },
//   { organization: 'Multilateral', value: 28, color: '#ffc658' },
//   { organization: 'Non-profit', value: 60, color: '#ff7300' },
//   { organization: 'Swasta', value: 15, color: '#0088fe' },
//   { organization: 'Wiraswasta', value: 80, color: '#00c49f' },
//   { organization: 'Lainnya', value: 55, color: '#ff5733' },
// ];

// Function to customize abbreviation for each organization
const abbreviateName = (organizationName) => {
  const customAbbreviations = {
    'Instansi Pemerintahan': 'Org 1',
    'BUMN/BUMD': 'Org 2',
    'Institusi/Organisasi Multilateral': 'Org 3',
    'Organisasi non-profit/Lembaga Swadaya Masyarakat': 'Org 4',
    'Perusahaan Swasta': 'Org 5',
    'Wiraswasta/Perusahaan sendiri': 'Org 6',
    'Lainnya': 'Org 7',
    // Add more organizations and their custom abbreviations as needed
  };

  return customAbbreviations[organizationName] || organizationName;
};

const processedData = data.map(item => ({
  ...item,
  fill: item.color,
  abbreviatedName: abbreviateName(item.organization),
}));

const Dashboard = () => {
  return (
      <Div >
        <Grid container spacing={5}>
          <Grid item md={12}>
            {/* 4 cards */}
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
          </Grid>

          {/* Persebaran alumni */}
          <Grid item md={12}>
            <Card sx={{ p: 5}}>
              <Typography variant="h1" sx={{ fontSize: "20px", fontWeight: 500, textAlign: 'center', mb: 3}}>
                PERESEBARAN ALUMNI FILKOM DI INDONESIA
              </Typography>
              <Div sx={{ display: 'flex', alignItems: 'center' }}>
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
          </Grid>

          {/* Distribusi mahasiswa */}
          <Grid item sm={12} md={6}>
            <Card sx={{ p: 5 }}>
              <Typography variant="h1" sx={{ fontSize: "20px", fontWeight: 500, textAlign: 'center'}}>
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
          </Grid>

          {/* Pie Chart - Jumlah alumni yg telah mengisi TS  */}
          <Grid item xs={12} sm={12} md={6}>
            <Card sx={{ p: 5}}>
              <Typography variant="h1" sx={{ fontSize: "20px", textAlign: 'center', fontWeight: 500 }}>
                JUMLAH ALUMNI YANG TELAH MENGISI KUESIONER
              </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
            </Card>
          </Grid>

          {/* Bar Chart - Jenis perusahaan tempat alumni bekerja */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 5 }}>
             
                <Typography variant="h1" sx={{ fontSize: "20px", fontWeight: 500, textAlign: 'center'}}>
                  Jenis Perusahaan
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart 
                    data={processedData} 
                    margin={{ top: 20, right: 30, bottom: 5 }}
                    //barCategoryGap="10%" // Adjust the space between bars
                    //barGap="5%" // Adjust the space between groups of bars (if applicable)
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="organization" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
            </Card>
            
          </Grid>
          
        </Grid>
      </Div>
    );
  };

export default Dashboard;
