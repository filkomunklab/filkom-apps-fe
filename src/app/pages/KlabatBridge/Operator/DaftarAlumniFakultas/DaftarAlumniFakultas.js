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

  // for dialog box to edit alumni password
  const [resetPassword, setResetPassword] = React.useState(false);

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
    await axios.get("http://localhost:2000/api/v1/fakultas/alumni").then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    });
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      // p={8}
      // sx={{
      //     backgroundColor: 'white',
      //     borderRadius: 5,
      //     boxShadow: 3,
      // }}
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
           <TextField
            label="Search"
            variant="outlined"
            size="small"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton 
                  //onClick={handleSearch} 
                  edge="end">
                  <SearchIcon />
                </IconButton>
              ),
              style: { borderRadius: '25px', width: '200px', height: '35px'} // Apply border radius here
            }}
          />
          <FormControl sx={{minWidth: 200}} size="small">
            <InputLabel htmlFor="grouped-select">Filter</InputLabel>
            <Select 
              defaultValue="" 
              id="grouped-select" 
              label="Filter"
              sx={{borderRadius: 10, maxHeight: '50px'}}
              // value={filter}
              // onChange={handleChange}
            >
              <MenuItem value="">
                  <em>None</em>
              </MenuItem>
              <ListSubheader sx={{color: "#192739F0"}}>Program Study</ListSubheader>
              <MenuItem value={"Informatika"}>Informatics</MenuItem>
              <MenuItem value={"Sistem Informasi"}>Information Systems</MenuItem>
              <ListSubheader sx={{color: "#192739F0"}}>Gradutaion Year</ListSubheader>
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
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
            {data.map((item, index) => (
              <TableItem index={index} item={item}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container justifyContent="flex-end" >
        <Grid item>
          <Pagination count={10} color="primary" sx={{marginY:5}}/>
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-end" >
        <Grid item> 
          <Button
            variant="contained" 
            color="primary"
            sx={{
            borderRadius: 10,
            whiteSpace: "nowrap",
            minWidth: 100,
            // pr:3,
            // pl:3,
            }}
          >
            Send
          </Button>
      </Grid>
      </Grid>


      

      {/* dialog box to reset alumni password */}
      <Dialog open={resetPassword} onClose={() => setResetPassword(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <Divider />
        <DialogContent style={{ minWidth: '500px' }}>
          {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
          /> */}
          <Typography>Email</Typography>
          <TextField 
            id="outlined-basic"   
            placeholder="s11810007@student.unklab.ac.id" 
            variant="outlined" 
            type="email"
            fullWidth
            sx={{mb:3}}
          />
          <Typography>New Password</Typography>
          <TextField 
            id="outlined-basic"   
            placeholder="New Password" 
            variant="outlined" 
            type="password"
            fullWidth
            sx={{mb:3}}
          />
          <Typography>Confirm New Password</Typography>
          <TextField 
            id="outlined-basic"   
            placeholder="Confirm New Password" 
            variant="outlined" 
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetPassword(false)} variant="contained"  style={buttonStyle}>Cancel</Button>
          <Button onClick={() => setResetPassword(false)} variant="contained" color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DaftarAlumniFakultas;