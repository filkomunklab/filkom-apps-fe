import React, { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Tab,
  Tabs,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useFormik } from "formik";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const styleCurriculum = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 35,
  backgroundColor: "white",
  borderRadius: 10,
  maxWidth: "90%",
  "@media (maxWidth: 768px)": {
    maxWidth: "80%",
  },
  "@media (maxWidth: 480px)": {
    maxWidth: "80%",
  },
};

const data = Array.from(Array(15).keys()).map((item, index) => ({
  nim: `105022010000`,
  name: `Yuhu, Christopher Darell`,
  prodi: `Informatika`,
  year: `2021`,
  status: `Active`,
}));

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
  const handleAddPreregistration = () => {
    alert("ini isi dari add preregis");
  };
  const [valueDueDate, setValueDueDate] = useState(null);
  const formik = useFormik({
    initialValues: {
      selectedProdi: "",
      selectedYear: "",
      selectedFileName: "",
      valuePick: null,
    },
    validationSchema: yup.object().shape({
      selectedProdi: yup.string().required("Program Studi is required"),
      selectedYear: yup.string().required("Tahun is required"),
      selectedFileName: yup.string().required("File is required"),
      valuePick: yup.date().required("Value Pick is required"),
    }),
    onSubmit: handleAddPreregistration,
  });

  const handleFormChange = (event) => {
    const { target } = event;
    if (target.name === "dueDate" || target.name === "valuePick") {
      // Handle changes for due date and value pick
      formik.setFieldValue(target.name, target.value);
    } else {
      // Handle changes for other form fields
      formik.setFieldValue(target.name, target.value);
    }
  };

  const [value, setValue] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isPreregisModalOpen, setPreregisModalOpen] = useState(false);
  const [isGradeModalOpen, setGradeModalOpen] = useState(false);

  const handlePreregisModalOpen = () => {
    setPreregisModalOpen(true);
  };
  const handlePreregisModalClose = () => {
    setPreregisModalOpen(false);
  };
  const closePreregisModal = () => {
    handlePreregisModalClose();
  };

  const handleGradeModalOpen = () => {
    setGradeModalOpen(true);
  };
  const handleGradeModalClose = () => {
    setGradeModalOpen(false);
  };
  const closeGradeModal = () => {
    handleGradeModalClose();
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
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
        page. On this page, you can create forms for pre-registration and grade
        submissions, and view your track record of pre-registration and grade
        entries that you have created.
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
          <Grid container sx={{ paddingTop: "23px" }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              xl={3}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <TextField
                placeholder="Search by Name or NIM"
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

            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{
                padding: "1px",
                paddingLeft: "10px",
                paddingBottom: "15px",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: "#006AF5",
                  borderRadius: "24px",
                  color: "white",
                  fontSize: "12px",
                  padding: "7px",
                  paddingLeft: "9px",
                  paddingRight: "13px",
                  minWidth: "110px",
                  gap: "5px",
                  "&:hover": {
                    backgroundColor: "#025ED8",
                  },
                }}
                onClick={handlePreregisModalOpen}
              >
                <AddIcon sx={{ fontSize: "14px" }} />
                Add Pre-regis Submission
              </Button>
              <Modal
                open={isPreregisModalOpen}
                onClose={handlePreregisModalClose}
              >
                <Box style={styleCurriculum}>
                  <IconButton
                    edge="end"
                    color="#D9D9D9"
                    onClick={closePreregisModal}
                    aria-label="close"
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "20px",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Grid container paddingTop={2}>
                    <Grid item md={8} xs={8}>
                      <Typography
                        id="modal-modal-title"
                        variant="h4"
                        component="h2"
                        sx={{
                          fontWeight: 600,
                          paddingBottom: 3,
                          "@media (max-width: 390px)": {
                            fontSize: "15px",
                          },
                        }}
                      >
                        Add Pre-registration Submission
                      </Typography>
                    </Grid>
                  </Grid>
                  <form onSubmit={formik.handleSubmit}>
                    <FormControl
                      fullWidth
                      sx={{ margin: "0 0 10px 0" }}
                      error={!!formik.errors.selectedProdi}
                    >
                      <InputLabel>Program Studi</InputLabel>
                      <Select
                        label="Program Studi"
                        name="selectedProdi"
                        value={formik.values.selectedProdi}
                        onChange={handleFormChange}
                      >
                        <MenuItem value="Informatika">Informatika</MenuItem>
                        <MenuItem value="Sistem Informasi">
                          Sistem Informasi
                        </MenuItem>
                        <MenuItem value="Teknologi Informasi">
                          Teknologi Informasi
                        </MenuItem>
                      </Select>
                      {formik.errors.selectedProdi && (
                        <Typography color="error">
                          {formik.errors.selectedProdi}
                        </Typography>
                      )}
                    </FormControl>
                    <TextField
                      sx={{ margin: "10px 0" }}
                      fullWidth
                      label="Tahun"
                      type="text"
                      name="selectedYear"
                      value={formik.values.selectedYear}
                      onChange={handleFormChange}
                      error={!!formik.errors.selectedYear}
                      helperText={formik.errors.selectedYear}
                    />
                    <TextField
                      sx={{ margin: "10px 0" }}
                      fullWidth
                      label="File"
                      type="text"
                      name="selectedFileName"
                      value={formik.values.selectedFileName}
                      onChange={handleFormChange}
                      error={!!formik.errors.selectedFileName}
                      helperText={formik.errors.selectedFileName}
                    />
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        sx={{
                          backgroundColor: "#006AF5",
                          borderRadius: "24px",
                          color: "white",
                          fontSize: "12px",
                          padding: "7px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          margin: "5px 0 0 0",
                          gap: "5px",
                          "&:hover": {
                            backgroundColor: "#025ED8",
                          },
                        }}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Add Submission
                      </Button>
                    </Grid>
                  </form>
                </Box>
              </Modal>
            </Grid>
          </Grid>

          <Grid container pt={1}>
            <Grid item xs={12}>
              <TableContainer
                sx={{
                  maxHeight: 440,
                }}
                component={Paper}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableHeading />
                  </TableHead>
                  <TableBody>
                    {data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, index) => (
                        <TableItem item={item} index={index} key={index} />
                      ))}
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
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>

          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <Grid container sx={{ paddingTop: "23px" }}>
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              xl={3}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <TextField
                placeholder="Search by Name or NIM"
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

            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{
                padding: "1px",
                paddingLeft: "10px",
                paddingBottom: "15px",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: "#006AF5",
                  borderRadius: "24px",
                  color: "white",
                  fontSize: "12px",
                  padding: "7px",
                  paddingLeft: "9px",
                  paddingRight: "13px",
                  minWidth: "110px",
                  gap: "5px",
                  "&:hover": {
                    backgroundColor: "#025ED8",
                  },
                }}
                onClick={handleGradeModalOpen}
              >
                <AddIcon sx={{ fontSize: "14px" }} />
                Add Grade Submission
              </Button>
              <Modal open={isGradeModalOpen} onClose={handleGradeModalClose}>
                <Box style={styleCurriculum}>
                  <IconButton
                    edge="end"
                    color="#D9D9D9"
                    onClick={closeGradeModal}
                    aria-label="close"
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "20px",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Grid container paddingTop={2}>
                    <Grid item md={8} xs={8}>
                      <Typography
                        id="modal-modal-title"
                        variant="h4"
                        component="h2"
                        sx={{
                          fontWeight: 600,
                          paddingBottom: 3,
                          "@media (max-width: 390px)": {
                            fontSize: "15px",
                          },
                        }}
                      >
                        Add Grade Submission
                      </Typography>
                    </Grid>
                  </Grid>
                  <form onSubmit={formik.handleSubmit}>
                    <FormControl
                      fullWidth
                      sx={{ margin: "0 0 10px 0" }}
                      error={!!formik.errors.selectedProdi}
                    >
                      <InputLabel>Program Studi</InputLabel>
                      <Select
                        label="Program Studi"
                        name="selectedProdi"
                        value={formik.values.selectedProdi}
                        onChange={handleFormChange}
                      >
                        <MenuItem value="Informatika">Informatika</MenuItem>
                        <MenuItem value="Sistem Informasi">
                          Sistem Informasi
                        </MenuItem>
                        <MenuItem value="Teknologi Informasi">
                          Teknologi Informasi
                        </MenuItem>
                      </Select>
                      {formik.errors.selectedProdi && (
                        <Typography color="error">
                          {formik.errors.selectedProdi}
                        </Typography>
                      )}
                    </FormControl>
                    <TextField
                      sx={{ margin: "10px 0" }}
                      fullWidth
                      label="Tahun"
                      type="text"
                      name="selectedYear"
                      value={formik.values.selectedYear}
                      onChange={handleFormChange}
                      error={!!formik.errors.selectedYear}
                      helperText={formik.errors.selectedYear}
                    />
                    <TextField
                      sx={{ margin: "10px 0" }}
                      fullWidth
                      label="File"
                      type="text"
                      name="selectedFileName"
                      value={formik.values.selectedFileName}
                      onChange={handleFormChange}
                      error={!!formik.errors.selectedFileName}
                      helperText={formik.errors.selectedFileName}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        sx={{ backgroundColor: "white", width: "100%" }}
                        label={formik.values.dueDate ? "" : "No Due Date"}
                        inputFormat="MM/dd/yyyy"
                        value={formik.values.dueDate}
                        onChange={(event, newValue) =>
                          formik.setFieldValue("dueDate", newValue)
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        sx={{ backgroundColor: "white", width: "100%" }}
                        label="Date&Time picker"
                        value={formik.values.valuePick}
                        onChange={(event, newValue) =>
                          formik.setFieldValue("valuePick", newValue)
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        sx={{
                          backgroundColor: "#006AF5",
                          borderRadius: "24px",
                          color: "white",
                          fontSize: "12px",
                          padding: "7px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          margin: "5px 0 0 0",
                          gap: "5px",
                          "&:hover": {
                            backgroundColor: "#025ED8",
                          },
                        }}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Add Submission
                      </Button>
                    </Grid>
                  </form>
                </Box>
              </Modal>
            </Grid>
          </Grid>

          <Grid container pt={1}>
            <Grid item xs={12}>
              <TableContainer
                sx={{
                  maxHeight: 440,
                }}
                component={Paper}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableHeading />
                  </TableHead>
                  <TableBody>
                    {data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, index) => (
                        <TableItem item={item} index={index} key={index} />
                      ))}
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
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
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

const TableHeading = ({ index }) => {
  const style = { fontWeight: 400 };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
      <TableCell sx={[style]}>No</TableCell>
      <TableCell sx={[style]}>NIM</TableCell>
      <TableCell sx={[style]}>Student Name</TableCell>
      <TableCell sx={[style]}>Program Studi</TableCell>
      <TableCell sx={[style]}>Tahun Masuk</TableCell>
      <TableCell sx={[style]}>Nilai</TableCell>
      <TableCell sx={[style]}>Sertifikat</TableCell>
      <TableCell sx={[style]}>Status</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index }) => {
  const navigate = useNavigate();

  const handleButtonNavigate = (event) => {
    const { name } = event.currentTarget;
    // navigate(`/bimbingan-akademik/sek-dekan/student-information/${item.nim}`);

    switch (name) {
      case "profile":
        navigate(
          `/bimbingan-akademik/sek-dekan/student-information/${item.nim}`
        );
        break;
      case "grade":
        navigate(
          `/bimbingan-akademik/sek-dekan/student-information/${item.nim}/grade`
        );
        break;
      case "certificate":
        navigate(
          `/bimbingan-akademik/sek-dekan/student-information/${item.nim}/certificate`
        );
        break;

      default:
        console.log("Path not found");
    }
  };
  const rowStyle = {
    "@media (max-width: 390px)": { fontSize: "11px" },
  };
  return (
    <TableRow>
      <TableCell sx={[rowStyle]}>{index + 1}</TableCell>
      <TableCell sx={[rowStyle]}>{`022407712`}</TableCell>
      <TableCell>
        <Button
          name="profile"
          sx={{
            textTransform: "capitalize",
            "@media (max-width: 390px)": { fontSize: "11px" },
          }}
          onClick={handleButtonNavigate}
        >{`Yuhu, Christopher Darell`}</Button>
      </TableCell>
      <TableCell sx={[rowStyle]}>{`Informatika`}</TableCell>
      <TableCell sx={[rowStyle]}>{`2021`}</TableCell>

      <TableCell>
        <Button
          name="grade"
          onClick={handleButtonNavigate}
          sx={{
            "@media (max-width: 390px)": { fontSize: "11px" },
            textTransform: "capitalize",
          }}
        >
          View Grades
        </Button>
      </TableCell>
      <TableCell>
        <Button
          name="certificate"
          onClick={handleButtonNavigate}
          sx={{
            "@media (max-width: 390px)": { fontSize: "11px" },
            textTransform: "capitalize",
          }}
        >
          View Certificates
        </Button>
      </TableCell>
      <TableCell sx={[rowStyle]}>
        <Chip label={"Active"} variant="filled" color={"success"} />
      </TableCell>
    </TableRow>
  );
};

export default Manage;
