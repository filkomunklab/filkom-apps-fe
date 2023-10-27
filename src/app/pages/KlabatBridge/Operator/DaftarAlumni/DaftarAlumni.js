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
} from "@mui/material";
import ActionButton from "app/shared/ActionButton";
import SearchGlobal from "app/shared/SearchGlobal";
import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import MarkunreadIcon from "@mui/icons-material/Markunread";

const DaftarAlumni = () => {
  // for dialog box to edit alumni password
  const [resetPassword, setResetPassword] = React.useState(false);

  // style cancel button
  const buttonStyle = {
    color: 'black',
    backgroundColor: 'white',
  };

  // select all button
  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState(new Array(10).fill(false));

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setCheckboxes(new Array(10).fill(!selectAll));
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !checkboxes[index];
    setCheckboxes(newCheckboxes);
    setSelectAll(newCheckboxes.every((checkbox) => checkbox));
  };

  const TableItem = ({ index }) => (
    <TableRow>
      <TableCell>
        <Checkbox 
          checked={checkboxes[index]}
          onChange={() => handleCheckboxChange(index)}
          color="primary"
        />
      </TableCell>
      <TableCell>{index + 1}</TableCell>
      <TableCell>Shyereal Saerang</TableCell>
      <TableCell>105011810011</TableCell>
      <TableCell>Computer Science</TableCell>
      <TableCell>Informatics</TableCell>
      <TableCell>2023</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: 'center',
        }}
        >
          <Button onClick={() => setResetPassword(true)}>
            <CreateIcon sx={{ fontSize: 16 }} />
          </Button>
          <Button>
            <MarkunreadIcon sx={{ fontSize: 16 }}/>
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );

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
          <SearchGlobal sx={{ minWidth: { xs: 100, md: 300 } }} />
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
          
          {/* select all button */}
          <Button 
            variant="contained" 
            color="primary" 
            
            sx={{
              borderRadius: 10,
              // whiteSpace: "nowrap",
              minWidth: 100,
              }}
          >
            <Box>Export</Box>
          </Button>
        </Div>
      </Div>
      <TableContainer component={Paper} sx={{ overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5'}}>
              <TableCell>
                <Checkbox onClick={handleSelectAll}/>
              </TableCell>
              <TableCell>No</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>NIM</TableCell>
              <TableCell>Faculty</TableCell>
              <TableCell>Program Study</TableCell>
              <TableCell>Graduation Year</TableCell>
              <TableCell>Status</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
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

export default DaftarAlumni;
