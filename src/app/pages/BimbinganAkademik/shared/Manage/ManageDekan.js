import React, { useState, useEffect } from "react";
import {
  Tab,
  Tabs,
  Typography,
  Grid,
  TextField,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Manage = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  //inisialisasi
  const [dataGrades, setDataGrades] = useState([]);
  const [dataPreregis, setDataPreregis] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //handle error
  const handleError = (error) => {
    if (error.code === "ERR_CANCELED") {
      console.log("request canceled");
    } else if (error.response && error.response.status === 403) {
      handlePermissionError();
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      return;
    } else if (error.response && error.response.status === 401) {
      handleAuthenticationError();
    } else {
      console.log("ini error: ", error);
    }
  };

  const getDataGrades = async () => {
    try {
      const result = await jwtAuthAxios.get(`/access/list/gradeAccess`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      const filteredData = result.data.data.filter((item) => {
        const employeeFullName = `${item.Employee?.lastName}, ${item.Employee?.firstName}`;
        return employeeFullName
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setDataGrades(filteredData);
    } catch (error) {
      handleError(error);
    }
  };
  const getDataPreregis = async () => {
    try {
      const result = await jwtAuthAxios.get(`/pre-regist`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      const filteredData = result.data.data.filter((item) => {
        const employeeFullName = `${item.Employee?.lastName}, ${item.Employee?.firstName}`;
        return employeeFullName
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setDataPreregis(filteredData);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getDataGrades();
    getDataPreregis();
    return () => controller.abort();
  }, [searchValue]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    localStorage.setItem("historyTabValue", value);
  }, [value]);

  return (
    <div>
      <Typography
        sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: 500 }}
      >
        Management of Pre-registration and Grades
      </Typography>
      <Typography
        sx={{
          paddingTop: "22px",
          paddingBottom: "22px",
          fontSize: { xs: "14px", md: "15px" },
          fontWeight: 400,
          color: "rgba(27, 43, 65, 0.69)",
          textAlign: "justify",
        }}
      >
        Currently, you are on the 'Management of Pre-registration and Grades'
        page. On this page, you can check a history of pre-registration and
        grade submission list that have been created by the Head of Study
        Program (kaprodi).
      </Typography>

      <div sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          onChange={(event, newValue) => setValue(newValue)}
        >
          <Tab label="Pre-registration" {...a11yProps(0)} />
          <Tab label="Grade" {...a11yProps(1)} />
        </Tabs>
      </div>

      <TabPanel value={value} index={0}>
        <div>
          <Grid container pt={1} pb={2}>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              xl={3}
              sx={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "23px",
              }}
            >
              <TextField
                placeholder="Search by Name "
                variant="outlined"
                size="small"
                sx={{
                  width: "350px",
                  height: "100%",
                }}
                onChange={(e) => setSearchValue(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end">
                      <SearchIcon />
                    </IconButton>
                  ),
                  style: { borderRadius: "25px" },
                }}
              />
            </Grid>
          </Grid>
          <Grid container pt={1}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead
                    style={{
                      position: "-webkit-sticky",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      backgroundColor: "rgba(26, 56, 96, 0.1)",
                    }}
                  >
                    <TableRow>
                      <TableCell>Number</TableCell>
                      <TableCell>Created Date</TableCell>
                      <TableCell>Created By</TableCell>
                      <TableCell>To Major</TableCell>
                      <TableCell>Semester</TableCell>
                      <TableCell>Year</TableCell>
                      <TableCell>Due Date Estimation</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataPreregis && dataPreregis.length > 0 ? (
                      dataPreregis.map((value, index) => (
                        <TableRow
                          key={value.id}
                          // onClick={() => handleNavigate(value)}
                          sx={{
                            ":hover": {
                              cursor: "pointer",
                              backgroundColor: "#338CFF21",
                              transition: "0.3s",
                              transitionTimingFunction: "ease-in-out",
                              transitionDelay: "0s",
                              transitionProperty: "all",
                            },
                          }}
                        >
                          <TableCell sx={{ width: "80px" }}>
                            {index + 1}
                          </TableCell>
                          <TableCell sx={{ width: "200px" }}>
                            {new Date(value.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </TableCell>
                          <TableCell sx={{ width: "250px" }}>
                            {value.Employee?.firstName}{" "}
                            {value.Employee?.lastName}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "200px",
                            }}
                          >
                            {value.major === "IF"
                              ? "Informatics"
                              : value.major === "SI"
                              ? "Information System"
                              : value.major === "DKV"
                              ? "Information Technology"
                              : value.major}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "130px",
                            }}
                          >
                            {value.semester}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "170px",
                            }}
                          >
                            {value.semesterPeriod}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "200px",
                            }}
                          >
                            {new Date(value.dueDate).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "130px",
                            }}
                          >
                            {value.isOpen ? "Open" : "Closed"}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8}>No data available</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  "@media (max-width: 650px)": { justifyContent: "flex-start" },
                }}
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={dataPreregis.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>

          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div>
          <Grid container pt={1} pb={2}>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              xl={3}
              sx={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "23px",
              }}
            >
              <TextField
                placeholder="Search by Name"
                variant="outlined"
                size="small"
                sx={{
                  width: "350px",
                  height: "100%",
                }}
                onChange={(e) => setSearchValue(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end">
                      <SearchIcon />
                    </IconButton>
                  ),
                  style: { borderRadius: "25px" },
                }}
              />
            </Grid>
          </Grid>

          <Grid container pt={1}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead
                    style={{
                      position: "-webkit-sticky",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      backgroundColor: "rgba(26, 56, 96, 0.1)",
                    }}
                  >
                    <TableRow>
                      <TableCell>Number</TableCell>
                      <TableCell>Created Date</TableCell>
                      <TableCell>Created By</TableCell>
                      <TableCell>To Major</TableCell>
                      <TableCell>Semester</TableCell>
                      <TableCell>Year</TableCell>
                      <TableCell>Due Date Estimation</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataGrades && dataGrades.length > 0 ? (
                      dataGrades.map((value, index) => (
                        <TableRow key={value.id}>
                          <TableCell sx={{ width: "80px" }}>
                            {index + 1}
                          </TableCell>
                          <TableCell sx={{ width: "200px" }}>
                            {new Date(value.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </TableCell>
                          <TableCell sx={{ width: "250px" }}>
                            {value.Employee?.firstName}{" "}
                            {value.Employee?.lastName}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "200px",
                            }}
                          >
                            {value.major === "IF"
                              ? "Informatics"
                              : value.major === "SI"
                              ? "Information System"
                              : value.major === "DKV"
                              ? "Information Technology"
                              : value.major}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "130px",
                            }}
                          >
                            {value.semester}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "170px",
                            }}
                          >
                            {value.semesterPeriod}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "200px",
                            }}
                          >
                            {new Date(value.dueDate).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "130px",
                            }}
                          >
                            {value.isOpen ? "Open" : "Closed"}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8}>No data available</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  "@media (max-width: 650px)": { justifyContent: "flex-start" },
                }}
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={dataGrades.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>

          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>
    </div>
  );
};

export default Manage;
