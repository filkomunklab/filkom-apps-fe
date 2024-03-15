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
  Modal,
  CircularProgress,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import SuccessOrError from "app/pages/BimbinganAkademik/components/Modal/SuccessOrError";
import { useNavigate } from "react-router-dom";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

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
  "@media (maxWidth: 768px)": {
    maxWidth: "80%",
  },
  "@media (maxWwidth: 480px)": {
    maxWidth: "80%",
  },
};

const GradeSubmission = () => {
  //inisialisasi
  const [semester, setSemester] = useState("");
  const [row, setRow] = useState("");
  const [subjectNames, setSubjectNames] = useState(Array(row).fill(""));
  const [grades, setGrades] = useState(Array(row).fill(""));
  const [lecturers, setLecturers] = useState(Array(row).fill(""));
  const [descriptions, setDescriptions] = useState(Array(row).fill(""));
  const [showLabel, setShowLabel] = useState(true);
  const [showLabel2, setShowLabel2] = useState(true);

  //get data
  const [dataGrade, setDataGrade] = useState([]);
  const [curriculumData, setCurriculumData] = useState([]);
  const [loading, setLoading] = useState(false);

  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  //modal
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenErrorModal = () => setOpenErrorModal(true);
  const handleCloseErrorModal = () => setOpenErrorModal(false);

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
      console.error("Error details:", error.response.data);
    }
  };

  const getDataGrade = async () => {
    try {
      const nim = JSON.parse(localStorage.getItem("user")).nim;
      const studentData = await jwtAuthAxios.get(`/student/${nim}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      const major = studentData.data.data.major;
      const result = await jwtAuthAxios.get(`/access/isOpen/${major}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });

      const gradeData = result.data.data;
      setDataGrade(gradeData);

      console.log("ini panjang gradedata", result);
    } catch (error) {
      handleError(error);
    }
  };

  const getCurriculum = async () => {
    try {
      const curriculumId = JSON.parse(
        localStorage.getItem("user")
      ).curriculumId;
      const curriculumResponse = await jwtAuthAxios.get(
        `/subject/${curriculumId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );
      setCurriculumData(curriculumResponse.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getCurriculum();
    getDataGrade();

    return () => controller.abort();
  }, []);

  const handleSubmitFirstModal = async () => {
    handleCloseFirstModal();
    setLoading(true);
    try {
      const { id } = JSON.parse(localStorage.getItem("user"));
      const requestBody = {
        semester,
        data: tableData.map((data, index) => ({
          grades: grades[index],
          lecturer: lecturers[index],
          description: descriptions[index],
          subjectId: subjectNames[index].id,
          subjectName: subjectNames[index].name,
        })),
      };

      console.log("Request Body:", requestBody);

      const response = await jwtAuthAxios.post(
        `/transaction/grades/${id}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      console.log("Response.data pe hasil:", response.data);

      if (response.data.status === "OK") {
        window.location.reload();
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
        console.log("error: ", error);
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
        return;
      }
    }
  };

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

  console.log("ini subjectname", subjectNames);

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

  useEffect(() => {
    console.log("Semester:", semester);
    console.log("Row:", row);
    console.log("Subject Names:", subjectNames);
    console.log("Grades:", grades);
    console.log("Lecturers:", lecturers);
    console.log("Descriptions:", descriptions);
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
          Not yet filled out Grade <br /> <br />
          Date of Grade Filling:{" "}
          {new Date(dataGrade.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}{" "}
          -{" "}
          {new Date(dataGrade.dueDate).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
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
                {showLabel2 ? "Select Row for Subject" : ""}
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
        <Table>
          <TableHead
            sx={{
              position: "-webkit-sticky",
              position: "sticky",
              top: 0,
              fontWeight: 400,
              backgroundColor: "#e8ecf2",
              zIndex: 1,
            }}
          >
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell sx={{ width: "220px" }}>Subject Name</TableCell>
              <TableCell sx={{ width: "120px" }}>Grade</TableCell>
              <TableCell>Lecturer</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
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
                        sx={{ width: "100%" }}
                        {...params}
                        size="small"
                        fullWidth
                        value={subjectNames[index]?.name || ""}
                      />
                    )}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    onChange={(e) => handleGradeChange(e, index)}
                    value={grades[index] || ""}
                    size="small"
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
                Submit Grades?
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
          <SuccessOrError
            open={openErrorModal}
            handleClose={handleCloseErrorModal}
            title="Error Submission!"
            description="Error: Failed to submit grade. Please try again."
          />
        </Box>
      </Grid>
    </div>
  );
};

export default GradeSubmission;
