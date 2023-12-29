import * as React from "react";
import {
  Container,
  Stack,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  InputAdornment,
  MenuItem,
  IconButton,
  Popover,
} from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import LockResetTwoToneIcon from "@mui/icons-material/LockResetTwoTone";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";

import {
  AddEmployeeModal,
  EditDataModal,
  DeleteDataModal,
  ChangePasswordEmployeeModal,
} from "./Components";

const EmployeeManagement = () => {
  const [openModalAddEmployee, setOpenModalAddEmployee] = React.useState(false);
  const [openModalEditData, setOpenModalEditData] = React.useState(false);
  const [openModalDeleteData, setOpenModalDeleteData] = React.useState(false);
  const [openModalChangePassword, setOpenModalChangePassword] =
    React.useState(false);
  const [passingData, setPassingdata] = React.useState({});

  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedMajor, setSelectedMajor] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [employees, setEmployees] = React.useState([]);
  const [employeesFromApi, setEmployeesFromApi] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    getDataEmployee();
  }, []);

  React.useEffect(() => {
    filterAndSetEmployees();
  }, [searchTerm, selectedMajor, employeesFromApi]);

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
    setRowsPerPage(event.target.value);
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
      setEmployeesFromApi(response.data.data);
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

      case "NONE":
        return "None";

      default:
        return "-";
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

  const filterAndSetEmployees = () => {
    const filteredData = employeesFromApi.filter(
      (item) =>
        (item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.nik.includes(searchTerm)) &&
        (selectedMajor === "" || item.major === selectedMajor)
    );
    setEmployees(filteredData);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMajorFilter = (event) => {
    if (event.target.value === "All Major") {
      setSelectedMajor("");
    } else {
      setSelectedMajor(event.target.value);
    }
  };

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
        <Typography
          variant="h1"
          sx={{ fontSize: "1.875rem", color: "#192434" }}
        >
          Employee Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: "60px", width: "168px", height: "52px" }}
          onClick={() => setOpenModalAddEmployee(true)}
        >
          <Typography
            sx={{
              fontWeight: 350,
              textTransform: "capitalize",
            }}
          >
            Add Employee
          </Typography>
        </Button>
        <AddEmployeeModal
          openModalAddEmployee={openModalAddEmployee}
          setOpenModalAddEmployee={setOpenModalAddEmployee}
          setEmployees={setEmployees}
          setEmployeesFromApi={setEmployeesFromApi}
        />
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

          <Stack direction="row" columnGap="12px" flexWrap="wrap" rowGap="8px">
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
                },
              }}
              sx={{
                border: "1px solid #E0E0E0",
                borderRadius: "65px",
                boxShadow: "none",
                width: "320px",
              }}
              value={searchTerm}
              onChange={handleSearch}
            />
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ zIndex: -2 }}>
                    <FilterListIcon sx={{ color: "#1C304A85" }} />

                    <Typography sx={{ marginLeft: "16px", color: "#1C304A85" }}>
                      Filter:
                    </Typography>
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
              value={selectedMajor ? selectedMajor : "All Major"}
              onChange={handleMajorFilter}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  paddingLeft: "12px",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                Major
              </Typography>
              <MenuItem key={"All Major"} value={"All Major"}>
                All Major
              </MenuItem>
              <MenuItem key={"NONE"} value={"NONE"}>
                None
              </MenuItem>
              <MenuItem key={"IF"} value={"IF"}>
                Informatics
              </MenuItem>
              <MenuItem key={"SI"} value={"SI"}>
                Information System
              </MenuItem>
              <MenuItem key={"DKV"} value={"DKV"}>
                Information Technology
              </MenuItem>
            </TextField>
          </Stack>
        </Stack>
        <Stack>
          {employees.length > 0 ? (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 480 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead sx={{ backgroundColor: "#1A38601A" }}>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>NIK</TableCell>
                      <TableCell>NIDN</TableCell>
                      <TableCell>Employee Name</TableCell>
                      <TableCell>Degree</TableCell>
                      <TableCell>Major</TableCell>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Roles</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees &&
                      employees
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={item.id}
                          >
                            <TableCell>
                              {index + 1 + page * rowsPerPage}
                            </TableCell>
                            <TableCell>{item.nik}</TableCell>
                            <TableCell>{item.nidn ? item.nidn : "-"}</TableCell>
                            <TableCell>
                              {item.lastName}, {item.firstName}
                            </TableCell>
                            <TableCell>
                              {item.degree ? item.degree : "-"}
                            </TableCell>
                            <TableCell>{majorDescriber(item.major)}</TableCell>
                            <TableCell>{item.phoneNum}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{convertArrayToString(item)}</TableCell>
                            <TableCell>
                              <IconButton onClick={(e) => handleClick(e, item)}>
                                <MoreVertTwoToneIcon
                                  sx={{ color: "#7fb2f8" }}
                                />
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
                                    <LockResetTwoToneIcon
                                      sx={{ color: "#006af5" }}
                                    />
                                    <Typography sx={{ color: "#006af5" }}>
                                      CHANGE PASSWORD
                                    </Typography>
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
                                    <DriveFileRenameOutlineIcon
                                      sx={{ color: "#006af5" }}
                                    />
                                    <Typography sx={{ color: "#006af5" }}>
                                      EDIT DATA
                                    </Typography>
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
                                    <Typography sx={{ color: "#006af5" }}>
                                      DELETE DATA
                                    </Typography>
                                  </Button>
                                </Stack>
                              </Popover>
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={employees.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />

              <EditDataModal
                openModalEditData={openModalEditData}
                setOpenModalEditData={setOpenModalEditData}
                setEmployees={setEmployees}
                setEmployeesFromApi={setEmployeesFromApi}
                passingData={passingData}
              />
              <DeleteDataModal
                openModalDeleteData={openModalDeleteData}
                setOpenModalDeleteData={setOpenModalDeleteData}
                passingData={passingData}
                setEmployees={setEmployees}
              />
              <ChangePasswordEmployeeModal
                openModalChangePassword={openModalChangePassword}
                setOpenModalChangePassword={setOpenModalChangePassword}
                passingData={passingData}
              />
            </Paper>
          ) : (
            <CircularProgress sx={{ alignSelf: "center" }} />
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default EmployeeManagement;
