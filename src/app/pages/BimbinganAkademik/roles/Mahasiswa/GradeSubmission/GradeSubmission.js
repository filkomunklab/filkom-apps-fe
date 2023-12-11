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
  Button,
  IconButton,
  Link,
  Box,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

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

  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSecondModal = () => setOpenSecondModal(true);
  const handleCloseSecondModal = () => setOpenSecondModal(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseSecondModal();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleOpenSecondModal]);

  const handleSubmitFirstModal = () => {
    handleCloseFirstModal();
    handleOpenSecondModal();
  };

  const [semester, setSemester] = useState("");
  const [row, setRow] = useState();
  const [subjectName, setSubjectName] = useState(Array(row).fill(""));
  const [parallel, setParallel] = useState(Array(row).fill(""));
  const [lecturer, setLecturer] = useState(Array(row).fill(""));
  const [grade, setGrade] = useState(Array(row).fill(""));
  const [retrieval, setRetrieval] = useState(Array(row).fill(""));
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

  const handleSubjectNameChange = (event, index) => {
    const newSubjectName = [...subjectName];
    newSubjectName[index] = event.target.value;
    setSubjectName(newSubjectName);
  };

  const handleParallelChange = (event, index) => {
    const newParallel = [...parallel];
    newParallel[index] = event.target.value;
    setParallel(newParallel);
  };

  const handleLecturerChange = (event, index) => {
    const newLecturer = [...lecturer];
    newLecturer[index] = event.target.value;
    setLecturer(newLecturer);
  };

  const handleGradeChange = (event, index) => {
    const newGrade = [...grade];
    newGrade[index] = event.target.value;
    setGrade(newGrade);
  };

  const handleRetrievalChange = (event, index) => {
    const newRetrieval = [...retrieval];
    newRetrieval[index] = event.target.value;
    setRetrieval(newRetrieval);
  };

  const generateTableData = (rowCount) => {
    const dataTemplate = {
      number: 1,
      subjectName: "",
      parallel: "",
      lecturer: "",
      grade: "",
      retrievalTo: "",
    };

    return Array.from({ length: rowCount }, (_, index) => {
      return { ...dataTemplate, number: index + 1 };
    });
  };

  const tableData = generateTableData(row);

  return (
    <div>
      <Typography
        sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: 500 }}
      >
        Grade Submission
      </Typography>
      <Typography
        sx={{
          paddingTop: "22px",
          paddingBottom: "32px",
          fontSize: { xs: "14px", md: "15px" },
          fontWeight: 400,
          color: "rgba(27, 43, 65, 0.69)",
          textAlign: "justify",
        }}
      >
        Every student is allowed to input grades for courses completed in the
        previous semester. Please input your grades honestly, and if any
        dishonesty is detected (such as altering your own grades, etc.), the
        individual involved must be prepared to face the consequences imposed by
        the faculty.
      </Typography>
      <Grid container spacing={2} sx={{ paddingBottom: "28px" }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
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

        <Grid item xs={12} sm={6} md={4} lg={3}>
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
          <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
            <TableRow>
              <TableCell size="small" sx={{ width: "60px" }}>
                Number
              </TableCell>
              <TableCell size="small" sx={{ width: "350px" }}>
                Subject Name
              </TableCell>
              <TableCell size="small" sx={{ width: "130px" }}>
                Parallel
              </TableCell>
              <TableCell size="small" sx={{ width: "200px" }}>
                Lecturer
              </TableCell>
              <TableCell size="small" sx={{ width: "105px" }}>
                Grade
              </TableCell>
              <TableCell size="small" sx={{ width: "105px" }}>
                Retrieval to-
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "white" }}>
            {tableData.map((data, index) => (
              <TableRow key={data.number}>
                <TableCell>{data.number}</TableCell>
                <TableCell>
                  <FormControl size="small" sx={{ minWidth: "100%" }}>
                    <InputLabel
                      sx={{
                        display: {
                          xs: "none",
                          sm: "none",
                          md: "block",
                        },
                      }}
                      shrink={false}
                    >
                      {!subjectName[index] ? "Select Subject Name" : ""}
                    </InputLabel>
                    <Select
                      value={subjectName[index]}
                      onChange={(e) => handleSubjectNameChange(e, index)}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: "37%",
                          },
                        },
                      }}
                    >
                      <MenuItem value="Math">
                        [BIU101] Pre-Elementary English
                      </MenuItem>
                      <MenuItem value="Physics">
                        [IS1113] Computer Programming
                      </MenuItem>
                      <MenuItem value="Aljabar">
                        [IF1112] Aljabar Linear Fundamental
                      </MenuItem>
                      <MenuItem value="Math1">
                        [BIU101] Pre-Elementary English
                      </MenuItem>
                      <MenuItem value="Physics1">
                        [IS1113] Computer Programming
                      </MenuItem>
                      <MenuItem value="Aljabar1">
                        [IF1112] Aljabar Linear Fundamental
                      </MenuItem>
                      <MenuItem value="Math2">
                        [BIU101] Pre-Elementary English
                      </MenuItem>
                      <MenuItem value="Physics2">
                        [IS1113] Computer Programming
                      </MenuItem>
                      <MenuItem value="Aljabar2">
                        [IF1112] Aljabar Linear Fundamental
                      </MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl size="small" sx={{ minWidth: "100%" }}>
                    <InputLabel
                      sx={{
                        display: {
                          xs: "none",
                          sm: "none",
                          md: "block",
                        },
                      }}
                      shrink={false}
                    >
                      {!parallel[index] ? "Parallel" : ""}
                    </InputLabel>
                    <Select
                      value={parallel[index]}
                      onChange={(e) => handleParallelChange(e, index)}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: "37%",
                          },
                        },
                      }}
                    >
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="C">C</MenuItem>
                      <MenuItem value="D">D</MenuItem>
                      <MenuItem value="E">E</MenuItem>
                      <MenuItem value="F">F</MenuItem>
                      <MenuItem value="G">G</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl size="small" sx={{ minWidth: "100%" }}>
                    <InputLabel
                      sx={{
                        display: {
                          xs: "none",
                          sm: "none",
                          md: "block",
                        },
                      }}
                      shrink={false}
                    >
                      {!lecturer[index] ? "Select Lecturer" : ""}
                    </InputLabel>
                    <Select
                      value={lecturer[index]}
                      onChange={(e) => handleLecturerChange(e, index)}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: "37%",
                          },
                        },
                      }}
                    >
                      <MenuItem value="Sandag, Green A">
                        Sandag, Green A
                      </MenuItem>
                      <MenuItem value="Pungus, Stenly">Pungus, Stenly</MenuItem>
                      <MenuItem value="Adam, Stenly">Adam, Stenly</MenuItem>
                      <MenuItem value="Liem, Andrew T">Liem, Andrew T</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <TextField
                    onChange={(e) => handleGradeChange(e, index)}
                    value={grade[index]}
                    size="small"
                    fullWidth
                    type="number"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    onChange={(e) => handleRetrievalChange(e, index)}
                    value={retrieval[index]}
                    size="small"
                    fullWidth
                    type="number"
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
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to="/bimbingan-akademik/certificates/"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              disabled={
                row !== subjectName.length ||
                row !== parallel.length ||
                row !== lecturer.length ||
                row !== grade.length ||
                row !== retrieval.length
                // !subjectName.every(Boolean) ||
                // !parallel.every(Boolean) ||
                // !lecturer.every(Boolean) ||
                // !grade.every(Boolean) ||
                // !retrieval.every(Boolean)
              }
              onClick={handleOpenFirstModal}
              sx={{
                backgroundColor:
                  row !== subjectName.length ||
                  row !== parallel.length ||
                  row !== lecturer.length ||
                  row !== grade.length ||
                  row !== retrieval.length
                  // !subjectName.every(Boolean) ||
                  // !parallel.every(Boolean) ||
                  // !lecturer.every(Boolean) ||
                  // !grade.every(Boolean) ||
                  // !retrieval.every(Boolean)
                    ? "#1A38601A"
                    : "#006AF5",
                borderRadius: "24px",
                color:
                  row !== subjectName.length ||
                  row !== parallel.length ||
                  row !== lecturer.length ||
                  row !== grade.length ||
                  row !== retrieval.length
                  // !subjectName.every(Boolean) ||
                  // !parallel.every(Boolean) ||
                  // !lecturer.every(Boolean) ||
                  // !grade.every(Boolean) ||
                  // !retrieval.every(Boolean)
                    ? "black"
                    : "white",
                whiteSpace: "nowrap",
                minWidth: "132px",
                fontSize: "12px",
                padding: "10px",
                gap: "6px",
                "&:hover": {
                  backgroundColor:
                    row !== subjectName.length ||
                    row !== parallel.length ||
                    row !== lecturer.length ||
                    row !== grade.length ||
                    row !== retrieval.length
                    // !subjectName.every(Boolean) ||
                    // !parallel.every(Boolean) ||
                    // !lecturer.every(Boolean) ||
                    // !grade.every(Boolean) ||
                    // !retrieval.every(Boolean)
                      ? "grey"
                      : "#025ED8",
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
                {/* Tambahkan tautan dan elemen lain yang diperlukan di sini */}
              </div>
            </Modal>
          </Box>
        </Link>
      </Grid>
    </div>
  );
};

export default GradeSubmission;
