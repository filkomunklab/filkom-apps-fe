import React, { useState, useEffect } from "react";
import {
  Box,
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
  Popover,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import JumboSelectField from "@jumbo/components/JumboFormik/JumboSelectField";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ViewListIcon from "@mui/icons-material/ViewList";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CircularProgress from "@mui/material/CircularProgress";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import SuccessOrError from "app/pages/BimbinganAkademik/components/Modal/SuccessOrError";
import { MoreVert } from "@mui/icons-material";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";
import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 35,
  backgroundColor: "white",
  borderRadius: 8,
  maxWidth: "90%",
  "@media (maxWidth: 768px)": {
    maxWidth: "80%",
  },
  "@media (maxWidth: 480px)": {
    maxWidth: "80%",
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <p
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
    </p>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const preregisSchema = Yup.object({
  semester: Yup.string("Select Semester").required("Semester is required"),
  semesterPeriod: Yup.string()
    .matches(
      /^(19|20)\d{2}\/(19|20)\d{2}$/,
      'Invalid format. Please use "YYYY/YYYY".'
    )
    .required("Semester Period is required"),
  dueDate: Yup.date("Choose DueDate").required("DueDate is required"),
});

const gradeSchema = Yup.object({
  semester: Yup.string("Select Semester").required("Semester is required"),
  semesterPeriod: Yup.string()
    .matches(
      /^(19|20)\d{2}\/(19|20)\d{2}$/,
      'Invalid format. Please use "YYYY/YYYY".'
    )
    .required("Semester Period is required"),
  dueDate: Yup.date("Choose DueDate").required("DueDate is required"),
});

const Manage = () => {
  const navigate = useNavigate();

  //inisialisasi
  const [formType, setFormType] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataGrades, setDataGrades] = useState([]);
  const [dataPreregis, setDataPreregis] = useState([]);
  const [value, setValue] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [preregisModalOpen, setPreregisModalOpen] = useState(false);
  const [gradeModalOpen, setGradeModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [major, setMajor] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  //modal
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const handleOpenSuccessModal = () => setOpenSuccessModal(true);
  const handleCloseSuccessModal = () => setOpenSuccessModal(false);
  const handleOpenErrorModal = () => setOpenErrorModal(true);
  const handleCloseErrorModal = () => setOpenErrorModal(false);

  //handle error
  const handleError = (error) => {
    if (error.response && error.response.status === 403) {
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

  useEffect(() => {
    const getData = async () => {
      await getMajor();
    };

    getData();
  }, []);

  useEffect(() => {
    if (major) {
      getGradeAndPreregis();
    }
  }, [major, searchValue]);

  const getMajor = async () => {
    try {
      const { id } = JSON.parse(localStorage.getItem("user"));
      const response = await jwtAuthAxios.get(`/employee/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setMajor(response.data.data.major);
    } catch (error) {
      handleError(error);
    }
  };

  const getGradeAndPreregis = async () => {
    try {
      console.log("ini major", major);
      const gradesResult = await jwtAuthAxios.get(
        `/access/list/gradesAccess/${major}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const preregisResult = await jwtAuthAxios.get(
        `/pre-regist?major=${major}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const filteredGrades = gradesResult.data.data.filter((item) => {
        const isOpenText = item.isOpen ? "Open" : "Closed";
        return isOpenText.toLowerCase().includes(searchValue.toLowerCase());
      });

      const filteredPreregis = preregisResult.data.data.filter((item) => {
        const employeeFullName = `${item.Employee?.lastName}, ${item.Employee?.firstName}`;
        return employeeFullName
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });

      setDataGrades(filteredGrades);
      setDataPreregis(filteredPreregis);
    } catch (error) {
      handleError(error);
    }
  };

  const handleClosePreregis = async (id) => {
    try {
      setLoading(true);
      const currentItem = dataPreregis.find((item) => item.id === id);

      if (currentItem && currentItem.isOpen === false) {
        setLoading(false);
        alert("Already closed");
        return;
      }

      const response = await jwtAuthAxios.patch(
        `/pre-regist/close-access/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("response close prereg", response);

      getGradeAndPreregis();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCloseGrade = async (id) => {
    try {
      setLoading(true);
      const currentItem = dataGrades.find((item) => item.id === id);

      if (currentItem && currentItem.isOpen === false) {
        setLoading(false);
        alert("Already closed");
        return;
      }

      const response = await jwtAuthAxios.patch(`/access/close/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("response close prereg", response);

      getGradeAndPreregis();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //handle
  const handlePreregisModalOpen = () => setPreregisModalOpen(true);
  const PreregisModalClose = () => setPreregisModalOpen(false);
  const handleGradeModalOpen = () => setGradeModalOpen(true);
  const GradeModalClose = () => setGradeModalOpen(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [listPreregisModalOpen, setListPreregisModalOpen] = useState(false);

  const handleTableRowClick = (rowData) => {
    console.log("ahaha", rowData);
    setSelectedRow(rowData);
    setListPreregisModalOpen(true);
  };

  const ListPreregisModalClose = () => {
    setSelectedRow(null);
    setListPreregisModalOpen(false);
  };

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

  useEffect(() => {
    getMajor();
  }, []);

  return (
    <div>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(34, 34, 34, 0.7)",
            zIndex: 2003,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
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
          {/* <Grid container pt={1} pb={2}> */}
          {/* <Grid
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
                placeholder="Search by Status "
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
            </Grid> */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              padding: "1px",
              // paddingLeft: "10px",
              paddingBottom: "15px",
              // paddingTop: "23px",
              paddingTop: "10px",
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
            <Modal open={preregisModalOpen} onClose={PreregisModalClose}>
              <Box style={styleModal}>
                <IconButton
                  edge="end"
                  color="#D9D9D9"
                  onClick={PreregisModalClose}
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
                        "@media (maxWidth: 390px)": {
                          fontSize: "15px",
                        },
                      }}
                    >
                      Add Pre-registration Submission
                    </Typography>
                  </Grid>
                </Grid>
                <Formik
                  initialValues={{
                    semester: "",
                    semesterPeriod: "",
                    major: "",
                    dueDate: null,
                    employeeId:
                      JSON.parse(localStorage.getItem("user"))?.id || "",
                  }}
                  validationSchema={preregisSchema}
                  onSubmit={async (values, { resetForm, setSubmitting }) => {
                    const { id } = JSON.parse(localStorage.getItem("user"));
                    setLoading(true);

                    // buat dueDate ke WITA
                    const dueDateWITA = new Date(values.dueDate).toLocaleString(
                      "en-US",
                      {
                        timeZone: "Asia/Makassar",
                      }
                    );

                    values.semester = values.semester;
                    values.semesterPeriod = values.semesterPeriod;
                    values.major = major;
                    values.dueDate = new Date(dueDateWITA);
                    values.employeeId = id;

                    try {
                      const response = await jwtAuthAxios.post(
                        `/pre-regist/create`,
                        values,
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                        }
                      );

                      console.log("ini isi values preregis", values);

                      setLoading(false);
                      resetForm();
                      PreregisModalClose();
                      handleOpenSuccessModal();
                      setSubmitting(false);
                      setFormType("pre-registration");
                    } catch (error) {
                      console.log("Error submitting form:", error);

                      if (error.response) {
                        console.log(
                          "Server responded with status:",
                          error.response.status
                        );
                        console.log(
                          "Server responded with data:",
                          error.response.data
                        );
                      }

                      setLoading(false);
                      PreregisModalClose();
                      handleOpenErrorModal();
                      setSubmitting(false);
                      setFormType("");
                    }
                  }}
                >
                  {({
                    isSubmitting,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    values,
                  }) => (
                    <Form>
                      <div
                        style={{
                          display: "flex",
                          rowGap: "20px",
                          flexDirection: "column",
                        }}
                      >
                        <Grid xs={12} item>
                          <JumboSelectField
                            name="semester"
                            label="Semester"
                            sx={{ width: "480px" }}
                            options={[
                              { value: "", label: "None" },
                              { value: "Ganjil", label: "Ganjil" },
                              { value: "Genap", label: "Genap" },
                            ]}
                            onChange={(event) => {
                              setFieldValue("semester", event.target.value);
                            }}
                          />
                        </Grid>
                        <Grid xs={12} item>
                          <JumboTextField
                            name="semesterPeriod"
                            variant="outlined"
                            label="Semester Period (e.g., 2023/2024)"
                            fullWidth
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid xs={12} item>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              sx={{
                                backgroundColor: "white",
                                width: "100%",
                              }}
                              label="Choose Due Date"
                              value={values.dueDate || null}
                              onChange={(date) =>
                                setFieldValue("dueDate", date)
                              }
                              TextField={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <LoadingButton
                            loading={isSubmitting}
                            type="submit"
                            variant="contained"
                            sx={{
                              textTransform: "capitalize",
                              backgroundColor: "#006AF5",
                            }}
                            onClick={handleSubmit}
                          >
                            Submit
                          </LoadingButton>
                        </Grid>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Modal>
          </Grid>
          {/* </Grid> */}
          <Grid container pt={1}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead
                    style={{
                      position: "-webkit-sticky",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "rgba(26, 56, 96, 0.1)",
                      zIndex: 1,
                    }}
                  >
                    <TableRow>
                      <TableCell>Number</TableCell>
                      <TableCell>Created Date</TableCell>
                      {/* <TableCell>To Major</TableCell> */}
                      <TableCell>Semester</TableCell>
                      <TableCell>Year</TableCell>
                      <TableCell>Due Date Estimation</TableCell>
                      <TableCell>Status</TableCell>
                      {/* <TableCell>Action</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataPreregis && dataPreregis.length > 0 ? (
                      dataPreregis.map((value, index) => (
                        <TableRow
                          key={value.id}
                          onClick={() => handleTableRowClick(value)}
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
                          {/* <TableCell
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
                          </TableCell> */}
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
                              width: "150px",
                            }}
                          >
                            {value.isOpen ? "Open" : "Closed"}
                          </TableCell>
                          {/* <TableCell
                            sx={{
                              width: "150px",
                            }}
                          >
                            <MoreVert
                              aria-describedby={value.id}
                              onClick={(e) => {
                                setAnchorEl(e.currentTarget);
                                setOpen(true);
                              }}
                            />
                            <Popover
                              id={value.id}
                              anchorEl={anchorEl}
                              open={open}
                              onClose={() => setOpen(false)}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                            >
                              <Button
                                onClick={() => {
                                  handleClosePreregis(value.id);
                                  console.log("Button Clicked prereg");
                                }}
                              >
                                Close
                              </Button>
                            </Popover>
                          </TableCell> */}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8}>No data available</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <Modal
                  open={listPreregisModalOpen}
                  onClose={ListPreregisModalClose}
                >
                  <Box
                    style={{
                      ...styleModal,
                      overflow: "auto",
                      maxHeight: "80vh",
                    }}
                  >
                    <IconButton
                      edge="end"
                      color="#D9D9D9"
                      onClick={ListPreregisModalClose}
                      aria-label="close"
                      sx={{
                        position: "absolute",
                        top: "10px",
                        right: "20px",
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <Grid container>
                      <Grid item md={8} xs={8}>
                        <Typography
                          id="modal-modal-title"
                          variant="h4"
                          component="h2"
                          sx={{
                            fontWeight: 600,
                            paddingBottom: 3,
                            "@media (maxWidth: 390px)": {
                              fontSize: "15px",
                            },
                          }}
                        >
                          Pre-registration Submission
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6">Semester</Typography>
                        <Typography variant="h6" sx={textStyle}>
                          {selectedRow?.semester}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6">Year</Typography>
                        <Typography variant="h6" sx={textStyle}>
                          {selectedRow?.semesterPeriod}
                        </Typography>
                      </Grid>
                      {/* <Grid item xs={12} md={6}>
                        <Typography variant="h6">To Major</Typography>
                        <Typography variant="h6" sx={textStyle}>
                          {selectedRow?.major === "IF"
                            ? "Informatics"
                            : selectedRow?.major === "SI"
                            ? "Information System"
                            : selectedRow?.major === "DKV"
                            ? "Information Technology"
                            : selectedRow?.major}
                        </Typography>
                      </Grid> */}
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6">Status</Typography>
                        <Typography variant="h6" sx={textStyle}>
                          {selectedRow?.isOpen ? "Open" : "Closed"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6">Create Date</Typography>
                        <Typography variant="h6" sx={textStyle}>
                          {new Date(selectedRow?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Typography variant="h6">
                          Due Date Estimation
                        </Typography>
                        <Typography variant="h6" sx={textStyle}>
                          {new Date(selectedRow?.dueDate).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Button
                          variant="outlined"
                          size="small"
                          fullWidth
                          onClick={() =>
                            navigate(
                              `/bimbingan-akademik/kaprodi/manage/list-student/${selectedRow?.id}`,
                              { state: { id: selectedRow?.id, major: major } }
                            )
                          }
                          sx={{
                            backgroundColor: "#006AF5",
                            borderRadius: "15px",
                            color: "white",
                            fontSize: "12px",
                            padding: "7px",
                            paddingLeft: "9px",
                            paddingRight: "13px",
                            gap: "5px",
                            "&:hover": {
                              backgroundColor: "#025ED8",
                            },
                          }}
                        >
                          <PeopleAltIcon sx={{ fontSize: "14px" }} />
                          View List Student
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Button
                          variant="outlined"
                          size="small"
                          fullWidth
                          onClick={() =>
                            navigate(
                              `/bimbingan-akademik/kaprodi/manage/list-courses/${selectedRow?.id}`,
                              { state: { id: selectedRow?.id, major: major } }
                            )
                          }
                          sx={{
                            backgroundColor: "#006AF5",
                            borderRadius: "15px",
                            color: "white",
                            fontSize: "12px",
                            padding: "7px",
                            paddingLeft: "9px",
                            paddingRight: "13px",
                            gap: "5px",
                            "&:hover": {
                              backgroundColor: "#025ED8",
                            },
                          }}
                        >
                          <ViewListIcon sx={{ fontSize: "14px" }} />
                          View List Courses
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Modal>
              </TableContainer>
              <TablePagination
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  "@media (maxWidth: 650px)": { justifyContent: "flex-start" },
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
          {/* <Grid container pt={1} pb={2}> */}
          {/* <Grid
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
                placeholder="Search by Status"
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
            </Grid> */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              padding: "1px",
              // paddingLeft: "10px",
              paddingBottom: "15px",
              // paddingTop: "23px",
              paddingTop: "10px",
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
              Add Grades Submission
            </Button>
            <Modal open={gradeModalOpen} onClose={GradeModalClose}>
              <Box style={styleModal}>
                <IconButton
                  edge="end"
                  color="#D9D9D9"
                  onClick={GradeModalClose}
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
                        "@media (maxWidth: 390px)": {
                          fontSize: "15px",
                        },
                      }}
                    >
                      Add Grades Submission
                    </Typography>
                  </Grid>
                </Grid>
                <Formik
                  initialValues={{
                    semester: "",
                    semesterPeriod: "",
                    major: "",
                    dueDate: null,
                    employeeId:
                      JSON.parse(localStorage.getItem("user"))?.id || "",
                  }}
                  validationSchema={gradeSchema}
                  onSubmit={async (values, { resetForm, setSubmitting }) => {
                    const { id } = JSON.parse(localStorage.getItem("user"));
                    setLoading(true);
                    values.semester = values.semester;
                    values.semesterPeriod = values.semesterPeriod;
                    values.major = major;
                    values.dueDate = values.dueDate;
                    values.employeeId = id;
                    try {
                      const result = await jwtAuthAxios.post(
                        `/access/open/grades`,
                        values,
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                        }
                      );

                      setLoading(false);
                      console.log("ini isi values grade", values);
                      resetForm();
                      GradeModalClose();
                      handleOpenSuccessModal();
                      setSubmitting(false);
                      setFormType("grade");
                    } catch (error) {
                      console.log(error);
                      setLoading(false);
                      GradeModalClose();
                      handleOpenErrorModal();
                      setSubmitting(false);
                      setFormType("");
                    }
                  }}
                >
                  {({
                    isSubmitting,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    values,
                  }) => (
                    <Form>
                      <Grid container>
                        <Grid xs={12} item>
                          <JumboSelectField
                            name="semester"
                            label="Semester"
                            sx={{ margin: "0 0 20px 0", width: "480px" }}
                            options={[
                              { value: "", label: "None" },
                              { value: "Ganjil", label: "Ganjil" },
                              { value: "Genap", label: "Genap" },
                            ]}
                            onChange={(event) => {
                              setFieldValue("semester", event.target.value);
                            }}
                          />
                        </Grid>
                        <Grid xs={12} item>
                          <JumboTextField
                            name="semesterPeriod"
                            variant="outlined"
                            label="Semester Period (e.g., 2023/2024)"
                            sx={{ margin: "0 0 20px 0" }}
                            fullWidth
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid xs={12} item>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              sx={{
                                backgroundColor: "white",
                                width: "100%",
                                margin: "0 0 20px 0",
                              }}
                              label="Choose Due Date"
                              value={values.dueDate || null}
                              onChange={(date) =>
                                setFieldValue("dueDate", date)
                              }
                              TextField={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <LoadingButton
                            loading={isSubmitting}
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                              textTransform: "capitalize",
                              backgroundColor: "#006AF5",
                            }}
                            onClick={() => {
                              console.log("Button clicked submit");
                              handleSubmit();
                            }}
                          >
                            Submit
                          </LoadingButton>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Modal>
          </Grid>
          {/* </Grid> */}

          <Grid container pt={1}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead
                    style={{
                      position: "-webkit-sticky",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "rgba(26, 56, 96, 0.1)",
                      zIndex: 1,
                    }}
                  >
                    <TableRow>
                      <TableCell>Number</TableCell>
                      <TableCell>Created Date</TableCell>
                      {/* <TableCell>To Major</TableCell> */}
                      <TableCell>Semester</TableCell>
                      <TableCell>Year</TableCell>
                      <TableCell>Due Date Estimation</TableCell>
                      <TableCell>Status</TableCell>
                      {/* <TableCell>Action</TableCell> */}
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
                          {/* <TableCell sx={{ width: "200px" }}>
                            {value.major === "IF"
                              ? "Informatics"
                              : value.major === "SI"
                              ? "Information System"
                              : value.major === "DKV"
                              ? "Information Technology"
                              : value.major}
                          </TableCell> */}
                          <TableCell sx={{ width: "130px" }}>
                            {value.semester}
                          </TableCell>
                          <TableCell sx={{ width: "170px" }}>
                            {value.semesterPeriod}
                          </TableCell>
                          <TableCell sx={{ width: "200px" }}>
                            {new Date(value.dueDate).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </TableCell>
                          <TableCell sx={{ width: "150px" }}>
                            {value.isOpen ? "Open" : "Closed"}
                          </TableCell>
                          {/* <TableCell sx={{ width: "150px" }}>
                            <MoreVert
                              aria-describedby={value.id}
                              onClick={(e) => {
                                setAnchorEl(e.currentTarget);
                                setOpen(true);
                              }}
                            />
                            <Popover
                              id={value.id}
                              anchorEl={anchorEl}
                              open={open}
                              onClose={() => setOpen(false)}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                            >
                              <Button
                                onClick={() => {
                                  handleCloseGrade(value.id);
                                  console.log("Button Clicked grade");
                                }}
                              >
                                Close
                              </Button>
                            </Popover>
                          </TableCell> */}
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
                  "@media (maxWidth: 650px)": { justifyContent: "flex-start" },
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

      <SuccessOrError
        open={openSuccessModal}
        handleClose={handleCloseSuccessModal}
        title="Success creating submission form!"
        description={`You have successfully creating a form for ${formType} submission. Please refresh your page.`}
      />
      <SuccessOrError
        open={openErrorModal}
        handleClose={handleCloseErrorModal}
        title="Error Submission!"
        description="Error: Failed to creating form submission. Please try again."
      />
    </div>
  );
};

const textStyle = {
  borderWidth: 1,
  borderColor: "#00000029",
  borderStyle: "solid",
  paddingX: "24px",
  paddingY: "13px",
  borderRadius: "4px",
};

export default Manage;
