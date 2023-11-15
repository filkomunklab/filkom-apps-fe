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
import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import SearchIcon from "@mui/icons-material/Search";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import axios from "axios";
import { DataArrayRounded } from "@mui/icons-material";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

const DaftarAlumni = () => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState([]);
  const [major, setMajor] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
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
  const [resetPassword, setResetPassword] = React.useState(false);

  // style cancel button
  const buttonStyle = {
    color: "black",
    backgroundColor: "white",
  };

  // select all button
  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState(new Array(10).fill(false));
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [selectedPhoneNums, setSelectedPhoneNums] = useState([]);

  const handleSelectAll = () => {
    // If "Select All" is checked, deselect all items, and vice versa
    if (selectAll) {
      setSelectedEmails([]);
      setSelectedPhoneNums([]);
    } else {
      // Select all items
      const allEmails = data.map((item) => item.personal_email);
      const allPhoneNums = data.map((item) => item.phone_num);
      setSelectedEmails(allEmails);
      setSelectedPhoneNums(allPhoneNums);
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (index, email, phoneNumber) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !checkboxes[index];
    setCheckboxes(newCheckboxes);
    setSelectAll(newCheckboxes.every((checkbox) => checkbox));

    setSelectedEmails((prevSelectedEmails) =>
      prevSelectedEmails.includes(email)
        ? prevSelectedEmails.filter((selectedEmail) => selectedEmail !== email)
        : [...prevSelectedEmails, email]
    );

    // Check if the phone number is already in the array, and toggle its presence
    setSelectedPhoneNums((prevSelectedPhoneNums) =>
      prevSelectedPhoneNums.includes(phoneNumber)
        ? prevSelectedPhoneNums.filter(
            (selectedPhoneNum) => selectedPhoneNum !== phoneNumber
          )
        : [...prevSelectedPhoneNums, phoneNumber]
    );
  };

  const handleSendButton = async () => {
    try {
      await jwtAuthAxios.post("/operator/send-broadcast-email", {
        recipientEmails: selectedEmails,
      });
      await jwtAuthAxios.post("/operator/alumni/send-broadcast-whatsapp", {
        phoneNums: selectedPhoneNums,
        pesan:
          "Halo, ini adalah pesan broadcast dari Klabat Bridge. Terima kasih.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleWhatsappButton = async (phoneNum) => {
    try {
      await jwtAuthAxios.post("/operator/alumni/send-broadcast-whatsapp", {
        phoneNums: [phoneNum],
        pesan:
          "Halo, ini adalah pesan broadcast dari Klabat Bridge. Terima kasih.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailButton = async (email) => {
    try {
      await jwtAuthAxios.post("/operator/send-broadcast-email", {
        recipientEmails: [email],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleExportButton = async () => {
    try {
      const { data } = await jwtAuthAxios.get("/admin-operator/exportDataTS", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(
        new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const a = document.createElement("a");
      a.href = url;
      const suffix = new Date().toISOString().substring(0, 10);
      a.download = `tracer-study-${suffix}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  const TableItem = ({ index, item }) => (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={selectedEmails.includes(item.personal_email)}
          onChange={() =>
            handleCheckboxChange(index, item.personal_email, item.phone_num)
          }
          color="primary"
        />
      </TableCell>
      <TableCell>{index + 1 + rowsPerPage * page}</TableCell>
      <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>
      <TableCell>{item.nim}</TableCell>
      <TableCell>{item.faculty}</TableCell>
      <TableCell>
        {item.major === "IF" ? "Informatika" : "Sistem Informasi"}
      </TableCell>
      <TableCell>{item.graduate_year}</TableCell>
      <TableCell>{item.status}</TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            //justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button onClick={() => handleWhatsappButton(item.phone_num)}>
            <WhatsAppIcon sx={{ fontSize: 16, color: "black" }} />
          </Button>
          <Button onClick={() => handleEmailButton(item.personal_email)}>
            <MarkunreadIcon sx={{ fontSize: 16, color: "black" }} />
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );

  // React.useEffect(() =>{

  //   if(filterValue){
  //     function filterData() {
  //       return data.filter(item => item["graduate_year"] === filterValue || item["major"] === filterValue);
  //     }

  //     const data1 = filterData()
  //     console.log(data1)
  //     setFilterValue(data1)
  //   }
  // }, [filterValue, data]);

  function filterData() {
    return data.filter(
      (item) =>
        item["graduate_year"] === filterValue || item["major"] === filterValue
    );
  }

  React.useEffect(() => {
    let isMounted = true;
    jwtAuthAxios
      .get(`/admin-operator/alumni?search_query=${searchValue}`)
      .then((res) => {
        if (isMounted) {
          setData(res.data.data);
          const uniqueYears = [
            ...new Set(res.data.data.map((item) => item.graduate_year)),
          ];
          const uniqueMajor = [
            ...new Set(res.data.data.map((item) => item.major)),
          ];

          setYear(uniqueYears);
          setMajor(uniqueMajor);
        }
      });
      
    return () => {
      isMounted = false;
    };
  }, [searchBtn]);

  useEffect(() => {
    console.log(selectedEmails);
    console.log(selectedPhoneNums);
  }, [selectedEmails]);

  console.log(data)
  return (
    <Box>
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
          {/* <SearchGlobal sx={{ minWidth: { xs: 100, md: 300 } }} /> */}
          <TextField
            // label="Search"
            placeholder="Search by Name or NIM"
            variant="outlined"
            size="small"
            // value={searchTerm}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setSearchBtn(!searchBtn)} edge="end">
                  <SearchIcon />
                </IconButton>
              ),
              style: { borderRadius: "25px", width: "250px", height: "35px" }, // Apply border radius here
            }}
          />

          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel htmlFor="grouped-select">Filter</InputLabel>
            <Select
              defaultValue=""
              id="grouped-select"
              label="Filter"
              sx={{ borderRadius: 10, maxHeight: "50px" }}
              value={filterValue}
              onChange={(event) => setFilterValue(event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <ListSubheader sx={{ color: "#192739F0" }}>
                Program Study
              </ListSubheader>
              {major.map((item) => {
                let label;

                switch (item) {
                  case "IF":
                    label = "Informatika";
                    break;
                  case "SI":
                    label = "Sistem Informasi";
                    break;
                  case "DKV":
                    label = "DKV";
                    break;
                  default:
                    break;
                }
                return <MenuItem value={item}>{label}</MenuItem>;
              })}
              <ListSubheader sx={{ color: "#192739F0" }}>
                Graduation Year
              </ListSubheader>
              {year.map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 10,
              // whiteSpace: "nowrap",
              minWidth: 100,
            }}
            onClick={handleExportButton}
          >
            <Box>Export</Box>
          </Button>
        </Div>
      </Div>
      <TableContainer component={Paper} sx={{ overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
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
            {filterData().length > 0
              ? filterData()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => <TableItem index={index} item={item} />)
              : data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableItem index={index} item={item} />
                  ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container justifyContent="flex-end">
        <Grid item>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component={"div"}
            count={filterData().length > 0 ? filterData().length : data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ marginY: 2 }}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button
            onClick={handleSendButton}
            disabled={selectedEmails.length === 0}
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
        <DialogContent style={{ minWidth: "500px" }}>
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
            sx={{ mb: 3 }}
          />
          <Typography>New Password</Typography>
          <TextField
            id="outlined-basic"
            placeholder="New Password"
            variant="outlined"
            type="password"
            fullWidth
            sx={{ mb: 3 }}
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
          <Button
            onClick={() => setResetPassword(false)}
            variant="contained"
            style={buttonStyle}
          >
            Cancel
          </Button>
          <Button
            onClick={() => setResetPassword(false)}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DaftarAlumni;
