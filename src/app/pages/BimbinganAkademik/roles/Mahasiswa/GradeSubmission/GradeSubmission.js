import React, { useState, useEffect } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Grid,
  Stack,
  Paper,
  Button,
  IconButton,
  Box,
  Autocomplete,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { BASE_URL_API } from "@jumbo/config/env";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
  maxWidth: "90%",
  "@media (max-width: 768px)": {
    maxWidth: "80%",
  },
  "@media (max-width: 480px)": {
    maxWidth: "80%",
  },
};

const style2 = {
  position: "fixed",
  top: "15%",
  right: "2%",
  width: 400,
  // bgcolor: "background.paper",
  boxShadow: 24,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
};

const GradeSubmission = () => {
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [dataGrade, setDataGrade] = useState([]);
  const [curriculumData, setCurriculumData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSecondModal = () => setOpenSecondModal(true);
  const handleCloseSecondModal = () => setOpenSecondModal(false);
  const handleOpenErrorModal = () => setOpenErrorModal(true);
  const handleCloseErrorModal = () => setOpenErrorModal(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseSecondModal();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleOpenSecondModal]);
  const getDataGrade = async () => {
    try {
      const nim = JSON.parse(localStorage.getItem("user")).nim;
      const studentData = await axios.get(`${BASE_URL_API}/student/${nim}`);
      const major = studentData.data.data.major;
      const result = await axios.get(
        `${BASE_URL_API}/access/list/gradesAccess/${major}/`
      );
      const gradeData = result.data.data;
      setDataGrade(gradeData);
    } catch (error) {
      console.log(error.message);
      console.log("ini error: ", error);
    }
  };

  const getCurriculum = async () => {
    try {
      const curriculumId = JSON.parse(
        localStorage.getItem("user")
      ).curriculumId;
      const curriculumResponse = await axios.get(
        `${BASE_URL_API}/subject/${curriculumId}`
      );
      console.log("isi kurikulumrespon", curriculumResponse);
      setCurriculumData(curriculumResponse.data.data);
    } catch (error) {
      console.error("Error fetching curriculum data:", error);
    }
  };

  useEffect(() => {
    getCurriculum();
    getDataGrade();
  }, []);

  const handleSubmitFirstModal = async () => {
    try {
      setLoading(true);
      const { nim } = JSON.parse(localStorage.getItem("user"));
      const requestBody = {
        semester,
        employeeNik: "1001",
        data: tableData.map((data, index) => ({
          grades: grades[index],
          lecturer: lecturers[index],
          description: descriptions[index],
          subjectId: subjectNames[index].id,
          subjectName: subjectNames[index].name,
        })),
      };

      console.log("Request Body:", requestBody);

      const response = await axios.post(
        `${BASE_URL_API}/transaction/grades/${nim}`,
        requestBody
      );
      if (response.data.status === "OK") {
        handleCloseFirstModal();
        handleOpenSecondModal();
        setSemester("");
        setRow();
        setSubjectNames(Array(row).fill(""));
        setGrades(Array(row).fill(""));
        setLecturers(Array(row).fill(""));
        setDescriptions(Array(row).fill(""));
        setShowLabel(true);
        setShowLabel2(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting grades:", error);
      handleOpenErrorModal();
      setSemester("");
      setRow();
      setSubjectNames(Array(row).fill(""));
      setGrades(Array(row).fill(""));
      setLecturers(Array(row).fill(""));
      setDescriptions(Array(row).fill(""));
      setShowLabel(true);
      setShowLabel2(true);
      setLoading(false);
    }
  };

  const [semester, setSemester] = useState("");
  const [row, setRow] = useState();
  const [subjectNames, setSubjectNames] = useState(Array(row).fill(""));
  const [grades, setGrades] = useState(Array(row).fill(""));
  const [lecturers, setLecturers] = useState(Array(row).fill(""));
  const [descriptions, setDescriptions] = useState(Array(row).fill(""));
  const [showLabel, setShowLabel] = useState(true);
  const [showLabel2, setShowLabel2] = useState(true);

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
    setShowLabel(false);
  };

  const handleRowChange = (event) => {
    setRow(event.target.value);
    setShowLabel2(false);
  };

  const handleSubjectNameChange = (event, index, value) => {
    const newSubjectNames = [...subjectNames];
    const subjectId = value?.id || index;
    newSubjectNames[index] = { ...value, subjectId };
    setSubjectNames(newSubjectNames);
  };

  const handleGradeChange = (event, index) => {
    const newGrades = [...grades];
    const inputValue = event.target.value;
    if (!isNaN(inputValue) && inputValue <= 100) {
      newGrades[index] = inputValue;
      setGrades(newGrades);
    }
  };

  const handleLecturerChange = (event, index) => {
    const newLecturers = [...lecturers];
    newLecturers[index] = event.target.value;
    setLecturers(newLecturers);
  };

  const handleDescriptionChange = (event, index) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = event.target.value;
    setDescriptions(newDescriptions);
  };
  const generateTableData = () => {
    const dataTemplate = {
      number: 1,
      subjectName: "",
      grade: "",
      lecturer: "",
      description: "",
    };

    return Array.from({ length: row }, (_, index) => {
      return { ...dataTemplate, number: index + 1 };
    });
  };

  const tableData = generateTableData(row);

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
            zIndex: 2004,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Typography
        sx={{
          fontSize: { xs: "20px", md: "24px" },
          fontWeight: 500,
          paddingBottom: 2,
        }}
      >
        Grade Submission
      </Typography>
      <Paper
        sx={{
          backgroundColor: "rgba(255, 204, 0, 0.1)",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "50px",
          marginBottom: "15px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">
          {dataGrade.length === 0 ? (
            <>
              Not yet filled out Grade <br /> <br />
              Date of Grade Filling: N/A - N/A
            </>
          ) : (
            <>
              Filled out Grade <br /> <br />
              Date of Grade Filling:{" "}
              {new Date(dataGrade[0].createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}{" "}
              -{" "}
              {new Date(dataGrade[0].due_date).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </>
          )}
        </Typography>

        <WarningAmberIcon sx={{ color: "#FFCC00", fontSize: "42px" }} />
      </Paper>
      <Paper
        sx={{
          backgroundColor: "rgba(0, 106, 245, 0.1)",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "50px",
          marginBottom: "30px",
        }}
      >
        <Typography variant="body1">
          Attention!
          <br />
          <br /> Every student is allowed to input grades for courses completed
          in the previous semester. <br />
          <br />
          Please input your grades honestly, and if any dishonesty is detected
          (such as altering your own grades, etc.), the individual involved must
          be prepared to face the consequences imposed by the faculty.
        </Typography>
      </Paper>
      <Grid container spacing={2} sx={{ paddingBottom: "20px" }}>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Stack spacing={2}>
            <FormControl size="small" sx={{ backgroundColor: "white" }}>
              <InputLabel shrink={false}>
                {showLabel ? "Select Semester" : ""}
              </InputLabel>
              <Select
                value={semester}
                onChange={handleSemesterChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: "37%",
                    },
                  },
                }}
              >
                {Array.from({ length: 14 }, (_, i) => i + 1).map((num) => (
                  <MenuItem key={num} value={`Semester ${num}`}>
                    Semester {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Stack spacing={2}>
            <FormControl size="small" sx={{ backgroundColor: "white" }}>
              <InputLabel shrink={false}>
                {showLabel2 ? "Select Row" : ""}
              </InputLabel>
              <Select
                value={row}
                onChange={handleRowChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: "37%",
                    },
                  },
                }}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Grid>
      </Grid>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableHeading />
          </TableHead>
          <TableBody sx={{ backgroundColor: "white" }}>
            {tableData.map((data, index) => (
              <TableRow key={data.number}>
                <TableCell>{data.number}</TableCell>
                <TableCell>
                  <Autocomplete
                    disablePortal
                    options={curriculumData}
                    onChange={(event, value) =>
                      handleSubjectNameChange(event, index, value)
                    }
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        key={subjectNames[index]?.subjectId || index}
                        size="small"
                        value={subjectNames[index]?.name || ""}
                      />
                    )}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    onChange={(e) => handleGradeChange(e, index)}
                    value={grades[index]}
                    size="small"
                    fullWidth
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    onChange={(e) => handleLecturerChange(e, index)}
                    value={lecturers[index]}
                    size="small"
                    fullWidth
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    onChange={(e) => handleDescriptionChange(e, index)}
                    value={descriptions[index]}
                    size="small"
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid
        sx={{
          padding: 2,
          paddingTop: "30px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={() => {
              if (
                !semester ||
                !row ||
                subjectNames.some((name) => !name) ||
                grades.some((grade) => !grade) ||
                lecturers.some((lecturer) => !lecturer)
              ) {
                alert("Please fill all the fields first.");
              } else {
                handleOpenFirstModal();
              }
            }}
            sx={{
              backgroundColor: "#006AF5",
              borderRadius: "24px",
              color: "white",
              whiteSpace: "nowrap",
              minWidth: "132px",
              fontSize: "12px",
              padding: "10px",
              gap: "6px",
              "&:hover": {
                backgroundColor: "#025ED8",
              },
            }}
          >
            Submit
          </Button>

          <Modal
            open={openFirstModal}
            onClose={handleCloseFirstModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div style={style}>
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 600,
                }}
              >
                Send Grades?
              </Typography>
              <Typography
                id="modal-modal-description"
                style={{ marginTop: "16px", marginBottom: "20px" }}
              >
                Are you sure you want to submit this? Forms that have been
                submitted cannot be edited again.
              </Typography>

              <Grid container spacing={1} justifyContent="flex-end">
                <Grid item>
                  <Button
                    onClick={handleCloseFirstModal}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                      boxShadow: 4,
                      color: "black",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        backgroundColor: "lightgrey",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleSubmitFirstModal}
                    sx={{
                      backgroundColor: "#006AF5",
                      borderRadius: "5px",
                      boxShadow: 4,
                      color: "white",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        backgroundColor: "#025ED8",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Modal>
          <Modal
            open={openSecondModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div style={style2}>
              <IconButton
                edge="end"
                color="#D9D9D9"
                onClick={handleCloseSecondModal}
                aria-label="close"
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "20px",
                }}
              >
                <CloseIcon />
              </IconButton>
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 600,
                }}
              >
                Successful Submission!
              </Typography>
              <Typography
                id="modal-modal-description"
                style={{ marginTop: "16px", marginBottom: "20px" }}
              >
                You have successfully submit your grades.
              </Typography>
            </div>
          </Modal>
          <Modal
            open={openErrorModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div style={style2}>
              <IconButton
                edge="end"
                color="#D9D9D9"
                onClick={handleCloseErrorModal}
                aria-label="close"
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "20px",
                }}
              >
                <CloseIcon />
              </IconButton>
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 600,
                }}
              >
                Error Submission!
              </Typography>
              <Typography
                id="modal-modal-description"
                style={{ marginTop: "16px", marginBottom: "20px" }}
              >
                Error: Failed to submit Pre-Registration. Please try again.
              </Typography>
            </div>
          </Modal>
        </Box>
      </Grid>
    </div>
  );
};

const TableHeading = () => {
  const style = { fontWeight: 500 };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
      <TableCell sx={[style]}>Number</TableCell>
      <TableCell sx={{ ...[style], width: "400px" }}>Subject Name</TableCell>
      <TableCell sx={{ ...[style], width: "140px" }}>Grade</TableCell>
      <TableCell sx={[style]}>Lecturer</TableCell>
      <TableCell sx={[style]}>Description</TableCell>
    </TableRow>
  );
};
export default GradeSubmission;
