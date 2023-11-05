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
  Grid,
  CardHeader, 
  Avatar 
} from "@mui/material";
import React, { useState, useEffect } from "react";
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
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
import { styled } from "@mui/system";
import axios from "axios";

let filkomStudents = [
  { icon: <PeopleIcon style={{ fontSize: 38 }}/>, topText: "Total Alumni", bottomText: "1,324 Students" },
  { icon: <PeopleIcon style={{ fontSize: 38 }}/>, topText: "Informatics", bottomText: "357 Students" },
  { icon: <PeopleIcon style={{ fontSize: 38 }}/>, topText: "Information Systems", bottomText: "486 Students" },
  // { icon: <PeopleIcon style={{ fontSize: 38 }}/>, topText: "Animation & Design", bottomText: "165 Students" },
];

const ResponsiveAvatar = styled(Avatar)(
  ({ theme }) => ({
    fontSize: theme.typography.pxToRem(48), // Set initial font size
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(36), // Reduce font size on smaller screens
    },
  })
);

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
  // { name: 'Desain dan Animasi', value: 200,  description: 'Description for Value 3' },
];

// colors for pie chart
const pieColors = ['#FED605', '#0053C0', '#FF4242']; 

// bar chart - jenis perusahann tempat alumni bekerja
const jenisPerusahaan = [
  { organization: 'Instansi Pemerintahan', value: 30, color: '#6200EE' },
  { organization: 'BUMN/BUMD', value: 45, color: '#FFF735' },
  { organization: 'Institusi/Organisasi Multilateral', value: 28, color: '#6BFAD7' },
  { organization: 'Organisasi non-profit/Lembaga Swadaya Masyarakat', value: 60, color: '#128DFF' },
  { organization: 'Perusahaan Swasta', value: 15, color: '#001AFF' },
  { organization: 'Wiraswasta/Perusahaan sendiri', value: 80, color: '#C317FF' },
  { organization: 'Lainnya', value: 55, color: '#FC76DE' },
];

// bar chart - alumni yang mendapat pekerjaan <12 bulan 
const dapatKerja = [
  { month: '2 months', value: 40 },
  { month: '4 months', value: 65 },
  { month: '6 months', value: 80 },
  { month: '8 months', value: 70 },
  { month: '10 months', value: 30 },
  { month: '12 months', value: 50 },
];

const processedData = jenisPerusahaan.map(item => ({
  ...item,
  fill: item.color,
}));

const Dashboard = () => {

  const [data, setData] = useState([]);
  const [distribusiAlumni, setDistribusiAlumni] = useState([]);
  const [totalITS, setTotalITS] = useState([]);

  const getData = async () => {
    await axios.get("http://localhost:2000/api/v1/dashboard/statistic").then((response) => {
      console.log(response.data.data);
      // setData(response.data.data);

      const apiData = response.data.data.distribusiAlumni;
      const apiData1 = response.data.data.totalTS;
      
      // Format the API response data for alumni distribution bar chart
    const formattedData = apiData.map(item => {
      const year = item.graduateYear;
      const siCount = item.major.find(major => major.name === 'SI')?.count || 0;
      const ifCount = item.major.find(major => major.name === 'IF')?.count || 1;

      return {
        year: year,
        SI: siCount,
        IF: ifCount
      };
    });

    // formated data for total alumni pie chart
    const formattedData1 = apiData1.map(item => ({
      name: item.major,
      value: item.count
    }));

    setData(response.data.data);
    setDistribusiAlumni(formattedData);
    setTotalITS(formattedData1);
    
    });
  };

  React.useEffect(() => {
    getData();
  }, []);

  // React.useEffect(() => {
  //   const data1 = [
  //     {value: ""},
  //     {value: "200"},
  //     {value: "300"},
  //   ]
  //   filkomStudents = filkomStudents.map((item, index) => ({
  //     ...item,
  //     ...data1[index]
  //   }))
  // }, []);


  return (
      <Div >
        {/* <Typography>Total filkom students: {data.totalAlumni}</Typography> */}
        <Grid container spacing={3}>
          {/* 3 cards */}
          <Grid item md={12}>
             <Grid container spacing={3}>
              {/* {filkomStudents.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardHeader
                      avatar={<ResponsiveAvatar sx={{ color: 'primary.main', bgcolor: 'white' }}>{item.icon}</ResponsiveAvatar>}
                      title={<Typography variant="h6">{item.topText}</Typography>}
                      subheader={<Typography variant="body2" sx={{ fontSize: "18px", fontWeight: 500 }}>{`${item.value} students`}</Typography>}
                    />
                  </Card>
                </Grid>
              ))} */}
              <Grid item xs={12} sm={6} md={4} >
                <Card>
                  <CardHeader
                    avatar={
                      <ResponsiveAvatar sx={{ color: 'primary.main', bgcolor: 'white' }}>
                        <PeopleIcon style={{ fontSize: 38 }}/>
                      </ResponsiveAvatar>
                    }
                    title={<Typography variant="h6">Total Alumni</Typography>}
                    subheader={<Typography variant="body2" sx={{ fontSize: "18px", fontWeight: 500 }}>{`${data.totalAlumni} students`}</Typography>}
                  />
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4} >
                <Card>
                  <CardHeader
                    avatar={
                      <ResponsiveAvatar sx={{ color: 'primary.main', bgcolor: 'white' }}>
                        <PeopleIcon style={{ fontSize: 38 }}/>
                      </ResponsiveAvatar>
                    }
                    title={<Typography variant="h6">Informatics</Typography>}
                    subheader={<Typography variant="body2" sx={{ fontSize: "18px", fontWeight: 500 }}>{`${data.totalAlumniIF} students`}</Typography>}
                  />
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4} >
                <Card>
                  <CardHeader
                    avatar={
                      <ResponsiveAvatar sx={{ color: 'primary.main', bgcolor: 'white' }}>
                        <PeopleIcon style={{ fontSize: 38 }}/>
                      </ResponsiveAvatar>
                    }
                    title={<Typography variant="h6">Information Systems</Typography>}
                    subheader={<Typography variant="body2" sx={{ fontSize: "18px", fontWeight: 500 }}>{`${data.totalAlumniSI} students`}</Typography>}
                  />
                </Card>
              </Grid>

            </Grid>
          </Grid>

          {/* Persebaran alumni */}
          <Grid item md={12}>
            <Card sx={{ p: 5}}>
              <Typography variant="h1" sx={{ fontSize: "18px", fontWeight: 500, mb: 3}}>
                DISTRIBUTION OF COMPUTER SCIENCE ALUMNI IN INDONESIA
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
                          <TableCell align="center">Percentage</TableCell>
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
          <Grid item md={12}>
            <Card sx={{ p: 5 }}>
              <Typography variant="h1" sx={{ fontSize: "18px", fontWeight: 500, marginLeft: "20px"}}>
                ALUMNI DISTRIBUTION 
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={distribusiAlumni}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={"year"} />
                  <YAxis label={{ value: 'Total Students', angle: -90, position: 'insideLeft', dy: 50 }} />
                  <Tooltip />
                  <Legend iconType="circle" />
                  <Bar dataKey="IF" fill="#FFCC00" name="IF" />
                  {/* <Bar dataKey="DKV" fill="#E21D12" name="DKV" /> */}
                  <Bar dataKey="SI" fill="#006AF5" name="SI" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          {/* Bar Chart - Jenis perusahaan tempat alumni bekerja */}
          <Grid item md={12}>
            <Card sx={{ p: 5 }}>
                <Typography variant="h1" sx={{ fontSize: "18px", fontWeight: 500, marginLeft: "20px"}}>
                  COMPANY CATEGORIES OF ALUMNI EMPLOYMENT
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
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

          {/* Bar Chart - alumni yang mendapatkan pekerjaan selama <12 bulan */}
          <Grid item md={12}>
            <Card sx={{ p: 5 }}>
              <Typography variant="h1" sx={{ fontSize: "18px", fontWeight: 500, marginLeft: "20px"}}>
                ALUMNI EMPLOYED IN &lt;12 MONTHS
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                  data={dapatKerja} 
                  margin={{ top: 20, right: 30, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend/> */}
                  <Bar dataKey="value" fill="#006AF5" />
                </BarChart>
              </ResponsiveContainer>
              <Typography  ml={5}>
                <span style={{ fontSize: '1.2em' }}>300 students </span>
                 obtained jobs within 12 months
              </Typography>
            </Card>
            
          </Grid>
          
           {/* Pie Chart - Jumlah alumni yg telah mengisi TS  */}
           <Grid item md={6}>
            <Card sx={{ p: 5}}>
              <Typography variant="h1" sx={{ fontSize: "18px", fontWeight: 500, marginLeft: "20px" }}>
                NUMBER OF ALUMNI SURVEYED
              </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={totalITS}
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

        </Grid>
      </Div>
    );
  };

export default Dashboard;
