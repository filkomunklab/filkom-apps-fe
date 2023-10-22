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
  Grid,
  Card, 
  CardHeader,
  Avatar,
  CardContent,
} from "@mui/material";
import ActionButton from "app/shared/ActionButton";
import SearchGlobal from "app/shared/SearchGlobal";
import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import SchoolIcon from '@mui/icons-material/School';
import { Search } from "@mui/icons-material";
import { styled } from "@mui/system";

const listSort = ["namalengkap", "nim", "prodi"];

const filkomStudents = [
    { icon: <SchoolIcon style={{ fontSize: 40 }}/>, topText: "Total Mahasiswa FILKOM", bottomText: "1,324 Students" },
    { icon: <SchoolIcon style={{ fontSize: 40 }}/>, topText: "Mahasiswa Informatika", bottomText: "357 Students" },
    { icon: <SchoolIcon style={{ fontSize: 40 }}/>, topText: "Mahasiswa Sistem Informasi", bottomText: "486 Students" },
    { icon: <SchoolIcon style={{ fontSize: 40 }}/>, topText: "Mahasiswa Animasi & Desain", bottomText: "165 Students" },
  ];
  
  const ResponsiveAvatar = styled(Avatar)(
    ({ theme }) => ({
      fontSize: theme.typography.pxToRem(48), // Set initial font size
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.typography.pxToRem(36), // Reduce font size on smaller screens
      },
    })
  );

const GrafikAlumni = () => {
  const [sortBy, setSortBy] = useState(null);

  const TableItem = ({ index }) => (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>Shyereal </TableCell>
      <TableCell>105011810011</TableCell>
      <TableCell>Sistem Informasi</TableCell>
      <TableCell>Fakultas Ilmu Komputer</TableCell>
      <TableCell>2023</TableCell>
      <TableCell>Belum Bengisi kuesioner</TableCell>
      <TableCell>
        <Button>
          <CreateIcon />
        </Button>
        <Button>
          <MarkunreadIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
  return (
    <Box>
        <Grid container spacing={5}>
            {/* 4 cards */}
            <Grid item md={12}>
            <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
                Total Lulusan
            </Typography>
                <Grid container spacing={5}>
                {filkomStudents.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card sx={{ paddingX: 1 }}>
                    <CardHeader
                        avatar={<ResponsiveAvatar sx={{ color: 'primary.main', bgcolor: 'white' }}>{item.icon}</ResponsiveAvatar>}
                        title={<Typography variant="h6">{item.topText}</Typography>}
                        subheader={<Typography variant="body2" sx={{ fontSize: "22px", fontWeight: 500 }}>{item.bottomText}</Typography>}
                    />
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Grid>

            <Grid item md={12}>
                <Div
                    sx={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                    }}
                >
                    <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
                        Daftar Alumni
                    </Typography>
                    <Div
                    sx={{
                        display: "flex",
                        direction: "row",
                        gap: 3,
                        alignItems: "center",
                    }}
                    >
                    <SearchGlobal sx={{ minWidth: { xs: 100, md: 300 } }} />
                    {/* <Select
                        sx={{ borderRadius: "50px", minWidth: "150px" }}
                        value={sortBy}
                        onChange={(event) => setSortBy(event.target.value)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={"namalengkap"}>Nama Lengkap</MenuItem>
                        <MenuItem value={"nim"}>NIM</MenuItem>
                        <MenuItem value={"prodi"}>Prodi</MenuItem>
                    </Select> */}
                    <FormControl sx={{minWidth: 150}} size="small">
                        <InputLabel id="demo-select-small">Sort by</InputLabel>
                        <Select
                            sx={{ borderRadius: "50px", minWidth: "150px"}}
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={sortBy}
                            label="Sort by"
                            onChange={(event) => setSortBy(event.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Nama"}>Nama</MenuItem>
                            <MenuItem value={"Fakultas"}>Fakultas</MenuItem>
                            <MenuItem value={"Prodi"}>Prodi</MenuItem>
                            <MenuItem value={"NIM"}>NIM</MenuItem>
                            <MenuItem value={"Tahun Lulus"}>Tahun Lulus</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        sx={{
                        backgroundColor: "#006AF5",
                        borderRadius: "24px",
                        color: "white",
                        whiteSpace: "nowrap",
                        width: "100%",
                        pr:3,
                        pl:3,

                        "&:hover": {
                            backgroundColor: "#006AF5",
                        },
                        }}
                    >
                        + Import Data
                    </Button>
                    </Div>
                </Div>
                <Card>
                    <CardContent>
                        <TableContainer sx={{ overflow: "auto" }}>
                            <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f5f5f5'}}>
                                <TableCell>No</TableCell>
                                <TableCell>Nama Lengkap</TableCell>
                                <TableCell>Nim</TableCell>
                                <TableCell>Nama Prodi</TableCell>
                                <TableCell>Fakultas</TableCell>
                                <TableCell>Tahun Lulus</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Aksi</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[...Array(10)].map((item, index) => (
                                <TableItem index={index} />
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid container justifyContent="flex-end" >
                            <Grid item>
                            {/* Content you want to position on the right side */}
                            <Pagination count={10} color="primary" sx={{marginY:5}}/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    </Box>
  );
};

export default GrafikAlumni;
