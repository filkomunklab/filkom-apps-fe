import * as React from "react";
import { Container, Stack, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, InputAdornment, MenuItem, IconButton, Popover } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import CheckIcon from "@mui/icons-material/Check";
import LockResetTwoToneIcon from "@mui/icons-material/LockResetTwoTone";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";

import { AddEmployeeModal, EditDataModal, DeleteDataModal, ChangePasswordEmployeeModal } from "./Components";

const EmployeeManagement = () => {
  const [openModalAddEmployee, setOpenModalAddEmployee] = React.useState(false);
  const [openModalEditData, setOpenModalEditData] = React.useState(false);
  const [openModalDeleteData, setOpenModalDeleteData] = React.useState(false);
  const [openModalChangePassword, setOpenModalChangePassword] = React.useState(false);
  const [passingData, setPassingdata] = React.useState({});

  const [isHoverFilter, setIsHoverFilter] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [employees, setEmployees] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hoverActionChangePassword, setHoverActionChangePassword] = React.useState(false);
  const [hoverActionEditData, setHoverActionEditData] = React.useState(false);
  const [hoverActionDeleteData, setHoverActionDeleteData] = React.useState(false);

  React.useEffect(() => {
    getDataEmployee();
  }, []);

  const handleClick = (event, item) => {
    setPassingdata(item);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDataEmployee = async () => {
    try {
      const response = await axios.get(`${BASE_URL_API}/employee`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEmployees(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const majorDescriber = (major) => {
    switch (major) {
      case "IF":
        return "Infromatics";

      case "SI":
        return "Information System";

      case "DKV":
        return "Information Technology";

      default:
        return "None";
    }
  };

  const convertArrayToString = (employee) => {
    if (employee.role.length > 0) {
      const roleString = employee.role.map((item) => item.role).join(", ");
      return roleString;
    } else {
      return "-";
    }
  };

  // ========================================
  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];
  // ========================================

  return (
    <Container
      maxWidth="false"
      disableGutters={true}
      sx={{
        margin: "0",
        padding: "1.5rem",
        width: "100%",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
        sx={{
          marginBottom: "1.5rem",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "1.875rem", color: "#192434" }}>
          Employee Management
        </Typography>

        <Button variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: "60px", width: "168px", height: "52px" }} onClick={() => setOpenModalAddEmployee(true)}>
          <Typography
            sx={{
              fontWeight: 350,
              textTransform: "capitalize",
            }}
          >
            Add Employee
          </Typography>
        </Button>
        <AddEmployeeModal openModalAddEmployee={openModalAddEmployee} setOpenModalAddEmployee={setOpenModalAddEmployee} setEmployees={setEmployees} />
      </Stack>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignContent="center"
          columnGap="5px"
          rowGap="5px"
          flexWrap="wrap"
          alignItems="center"
          sx={{
            paddingTop: "24px",
            paddingBottom: "24px",
          }}
        >
          <Typography variant="h2" sx={{ fontSize: "24px" }}>
            List Employees
          </Typography>

          <Stack direction="row" columnGap="12px" flexWrap="wrap">
            <TextField
              fullWidth
              placeholder="Search by Name or NIK"
              variant="outlined"
              id="search-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#1C304A85" }} />
                  </InputAdornment>
                ),
                style: {
                  borderRadius: "65px",
                  // width: "75%",
                },
              }}
              sx={{
                border: "1px solid #E0E0E0",
                borderRadius: "65px",
                boxShadow: "none",
                width: "320px",
              }}
            />
            <TextField
              fullWidth
              id="outlined-select-currency"
              onMouseOver={() => setIsHoverFilter(true)}
              onMouseLeave={() => setIsHoverFilter(false)}
              select
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterListIcon sx={{ color: "#1C304A85" }} />
                    {isHoverFilter ? "" : <Typography sx={{ marginLeft: "16px", color: "#1C304A85" }}>Filter</Typography>}
                  </InputAdornment>
                ),
                style: {
                  borderRadius: "65px",
                  borderColor: "#E0E0E0",
                },
              }}
              sx={{
                m: 0,
                borderRadius: "65px",
                borderColor: "#E0E0E0",
                width: "270px",
              }}
            >
              <Typography>halo bang</Typography>
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Stack>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead sx={{ backgroundColor: "#1A38601A" }}>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>NIK</TableCell>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Major</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Roles</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees &&
                  employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                      <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                      <TableCell>{item.nik}</TableCell>
                      <TableCell>
                        {item.lastName}, {item.firstName}
                      </TableCell>
                      <TableCell>{majorDescriber(item.major)}</TableCell>
                      <TableCell>{item.phoneNum}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{convertArrayToString(item)}</TableCell>
                      <TableCell>
                        <IconButton onClick={(e) => handleClick(e, item)}>
                          <MoreVertTwoToneIcon sx={{ color: "#7fb2f8" }} />
                        </IconButton>
                        <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          elevation={1}
                          sx={{
                            borderColor: "#1A38601A",
                          }}
                        >
                          <Stack
                            sx={{
                              background: "white",
                            }}
                            direction="column"
                          >
                            <Button
                              fullWidth
                              onClick={() => {
                                handleClose();
                                setOpenModalChangePassword(true);
                              }}
                              sx={{
                                justifyContent: "flex-start",
                                color: "#192739F0",
                                columnGap: 1,
                              }}
                            >
                              <LockResetTwoToneIcon sx={{ color: "#006af5" }} />
                              <Typography sx={{ color: "#006af5" }}>CHANGE PASSWORD</Typography>
                            </Button>
                            <Button
                              fullWidth
                              onClick={() => {
                                handleClose();
                                setOpenModalEditData(true);
                              }}
                              sx={{
                                justifyContent: "flex-start",
                                color: "#192739F0",
                                columnGap: 1,
                              }}
                            >
                              <DriveFileRenameOutlineIcon sx={{ color: "#006af5" }} />
                              <Typography sx={{ color: "#006af5" }}>EDIT DATA</Typography>
                            </Button>
                            <Button
                              onClick={() => {
                                handleClose();
                                setOpenModalDeleteData(true);
                              }}
                              fullWidth
                              sx={{
                                justifyContent: "flex-start",
                                color: "#192739F0",
                                columnGap: 1,
                              }}
                            >
                              <DeleteIcon sx={{ color: "#006af5" }} />
                              <Typography sx={{ color: "#006af5" }}>DELETE DATA</Typography>
                            </Button>
                          </Stack>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={employees.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />

          <EditDataModal openModalEditData={openModalEditData} setOpenModalEditData={setOpenModalEditData} setEmployees={setEmployees} passingData={passingData} />
          <DeleteDataModal openModalDeleteData={openModalDeleteData} setOpenModalDeleteData={setOpenModalDeleteData} passingData={passingData} setEmployees={setEmployees} />
          <ChangePasswordEmployeeModal openModalChangePassword={openModalChangePassword} setOpenModalChangePassword={setOpenModalChangePassword} passingData={passingData} />
        </Paper>
      </Box>
    </Container>
  );
};

export default EmployeeManagement;
