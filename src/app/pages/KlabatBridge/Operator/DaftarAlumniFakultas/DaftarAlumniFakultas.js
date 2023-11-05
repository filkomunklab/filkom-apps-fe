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
  FormControl,
  InputLabel,
  Pagination,
  Grid,
  Box,
  Paper,
  ListSubheader,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  TextField,
  Divider,
  Checkbox,
  IconButton,
  TablePagination,
} from "@mui/material";
import ActionButton from "app/shared/ActionButton";
import SearchGlobal from "app/shared/SearchGlobal";
import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";

const DaftarAlumniFakultas = () => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState([]);
  const [major, setMajor] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchBtn, setSearchBtn] = useState(false);

  // pagination
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // for dialog box to edit alumni password
  // const [resetPassword, setResetPassword] = React.useState(false);

  // style cancel button
  const buttonStyle = {
    color: 'black',
    backgroundColor: 'white',
  };

  // // select all button
  // const [selectAll, setSelectAll] = useState(false);
  // const [checkboxes, setCheckboxes] = useState(new Array(10).fill(false));

  // const handleSelectAll = () => {
  //   setSelectAll(!selectAll);
  //   setCheckboxes(new Array(10).fill(!selectAll));
  // };

  // const handleCheckboxChange = (index) => {
  //   const newCheckboxes = [...checkboxes];
  //   newCheckboxes[index] = !checkboxes[index];
  //   setCheckboxes(newCheckboxes);
  //   setSelectAll(newCheckboxes.every((checkbox) => checkbox));
  // };

  const TableItem = ({ index, item }) => (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>
      <TableCell>{item.nim}</TableCell>
      <TableCell>{item.faculty}</TableCell>
      <TableCell>{item.major === "IF" ? "Informatika" : "Sistem Informasi"}</TableCell>
      <TableCell>{item.graduate_year}</TableCell>
    </TableRow>
  );

  const getData = async () => {
    await axios.get(`http://localhost:2000/api/v1/fakultas/alumni?search_query=${searchValue}`).then((res) => {
      console.log(res.data.data);
      
      setData(res.data.data);

      const uniqueYears = [...new Set(res.data.data.map(item=> item.graduate_year))]
      const uniquMajor = [...new Set(res.data.data.map(item=> item.major))]

      console.log(uniqueYears);
      setYear(uniqueYears)
      setMajor(uniquMajor)
    });
  };

  function filterData() {
    return data.filter(item => item["graduate_year"] === filterValue || item["major"] === filterValue);
  }

  React.useEffect(() => {
    getData();
  }, [searchBtn]);

  return (
    <Box
    >
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
          Alumni
        </Typography>
        <Div
          sx={{
            display: "flex",
            direction: "row",
            gap: 3,
            alignItems: "center",
          }}
        >
          {/* searchbar */}
           <TextField
            // label="Search"
            placeholder="Search by Name or NIM"
            variant="outlined"
            size="small"
            // value={searchTerm}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton 
                  onClick={()=> setSearchBtn(!searchBtn)} 
                  edge="end">
                  <SearchIcon />
                </IconButton>
              ),
              style: { borderRadius: '25px', width: '250px', height: '35px'} // Apply border radius here
            }}
          />
          <FormControl sx={{minWidth: 200}} size="small">
            <InputLabel htmlFor="grouped-select">Filter</InputLabel>
            <Select 
              defaultValue="" 
              id="grouped-select" 
              label="Filter"
              sx={{borderRadius: 10, maxHeight: '50px'}}
              value={filterValue}
              onChange={(event)=>setFilterValue(event.target.value)}
            >
              <MenuItem value="">
                  <em>None</em>
              </MenuItem>
              <ListSubheader sx={{color: "#192739F0"}}>Program Study</ListSubheader>
                {major.map(item => {
                  let label
                  switch (item) {
                    case 'IF':
                      label='Informatics'
                      break;
                    case 'SI':
                      label='Sistem Information'
                      break;
                    // case 'DKV':
                    //   label='DKV'
                    //   break;
                    default:
                      break;
                  }
                  return(
                <MenuItem value={item}>{label}</MenuItem>
                )})}
              <ListSubheader sx={{color: "#192739F0"}}>Gradutaion Year</ListSubheader>
              {year.map((item)=>{return(
                 <MenuItem value={item}>{item}</MenuItem>
              )})}
            </Select>
          </FormControl>
        </Div>
      </Div>
      <TableContainer component={Paper} sx={{ overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5'}}>
              <TableCell>No</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>NIM</TableCell>
              <TableCell>Faculty</TableCell>
              <TableCell>Program Study</TableCell>
              <TableCell>Graduation Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {filterData().length > 0 ? filterData()
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <TableItem index={index} item={item} />
            )) : data.map((item, index) => (
              <TableItem index={index} item={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container justifyContent="flex-end" >
        <Grid item>
          {/* <Pagination count={10} color="primary" sx={{marginY:5}}/> */}
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component={"div"}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{marginY:2}}
          />
        </Grid>
      </Grid>
      
    </Box>
  );
};

export default DaftarAlumniFakultas;