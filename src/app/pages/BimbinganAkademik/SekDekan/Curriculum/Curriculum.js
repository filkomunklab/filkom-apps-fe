import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Select,
  MenuItem,
  Modal,
  FormControl,
  Grid,
  InputLabel,
  Box,
  TextField,
  Link,
  IconButton,
  Input,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { BASE_URL_API } from "../../../../../@jumbo/config/env";
import * as XLSX from "xlsx";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  padding: 24,
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

const style2 = {
  position: "fixed",
  top: "15%",
  right: "2%",
  width: 400,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
};

const Curriculum = () => {
  const [curriculum, setCurriculum] = useState("selectCurriculum");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedProdi, setSelectedProdi] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [openFirstModal, setOpenFirstModal] = React.useState(false);
  const [openSecondModal, setOpenSecondModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const [listCurriculum, setListCurriculum] = useState([]);
  const [listSubject, setListSubject] = useState([]);

  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSecondModal = () => setOpenSecondModal(true);
  const handleCloseSecondModal = () => setOpenSecondModal(false);
  const handleOpenErrorModal = () => setOpenErrorModal(true);
  const handleCloseErrorModal = () => setOpenErrorModal(false);

  const handleSubmitFirstModal = async () => {
    handleCloseFirstModal();
    setLoading(true);

    console.log("ini selected file: ", selectedFile);
    const file = selectedFile;
    const reader = new FileReader();

    reader.onload = async (e) => {
      const dataExcel = new Uint8Array(e.target.result);
      const workbook = XLSX.read(dataExcel, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const options = {
        header: ["code", "name", "credits", "type", "prerequisite", "semester"],
        raw: false,
        range: 1,
        defval: "",
      };
      const result = XLSX.utils.sheet_to_json(sheet, options);

      const data = {
        major: selectedProdi,
        year: selectedYear,
        data: result,
      };

      try {
        const result = await axios.post(`${BASE_URL_API}/curriculum`, data);
        if (result.data.status === "OK") {
          console.log("Successful response:", result.data);
          setSelectedProdi("");
          setSelectedYear("");
          setSelectedFile(null);
          handleOpenSecondModal();
          handleAddModalClose();
          getCurriculum();
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        console.error("Error response:", error.response);
        handleOpenErrorModal();
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Closing second modal...");
      handleCloseSecondModal();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleOpenSecondModal]);

  useEffect(() => {
    console.log("ini url: ", BASE_URL_API);
    getCurriculum();
  }, []);

  const [Informatika2018ContentVisible, setInformatika2018ContentVisible] =
    useState(false);
  const [Informatika2020ContentVisible, setInformatika2020ContentVisible] =
    useState(false);
  const [
    SistemInformasi2018ContentVisible,
    setSistemInformasi2018ContentVisible,
  ] = useState(false);
  const [
    SistemInformasi2020ContentVisible,
    setSistemInformasi2020ContentVisible,
  ] = useState(false);
  const [
    TeknologiInformasiContentVisible,
    setTeknologiInformasiContentVisible,
  ] = useState(false);

  useEffect(() => {
    console.log("Curriculum effect triggered with curriculum:", curriculum);
    getSubjectByIdCurriculum();
  }, [curriculum]);

  const getSubjectByIdCurriculum = async () => {
    try {
      const result = await axios.get(`${BASE_URL_API}/subject/${curriculum}`);
      if (result.data.status === "OK") {
        console.log("Successful response:", result.data.data);
        setListSubject(result.data.data);
        console.log("ini isi list subject: ", listSubject);
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Error response:", error.response);
    }
  };

  const getCurriculum = async () => {
    try {
      const result = await axios.get(`${BASE_URL_API}/curriculum`);
      if (result.data.status === "OK") {
        console.log("Successful response:", result.data);
        setListCurriculum(result.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Error response:", error.response);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    const allowedExtensions = ["xlsx", "xls"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      setSelectedFile(file);

      const labelElement = document.getElementById("excel-file");
      if (labelElement) {
        labelElement.style.border = "0.2px solid #BCBCBC";
      }

      if (file) {
        setSelectedFileName(file.name);
      } else {
        setSelectedFileName("");
      }
    } else {
      alert("Only Excel files (xlsx, xls) are allowed.");
      event.target.value = "";
    }
  };

  const handleOnChange = (e) => {
    setCurriculum(e.target.value);
    console.log("ini adalah curriculum: ", curriculum);
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleProdiChange = (event) => {
    setSelectedProdi(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const closeModal = () => {
    handleAddModalClose();
  };

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
      <div>
        <Typography
          sx={{ fontSize: "24px", fontWeight: 400, paddingBottom: "10px" }}
        >
          Curriculum
        </Typography>
        <Grid container spacing={2} pb={1}>
          <Grid item md={8}>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 400,
                color: "rgba(27, 43, 65, 0.69)",
                paddingTop: "6px",
              }}
            >
              You can choose the curriculum
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: "3px",
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
                paddingRight: "9px",
                minWidth: "110px",
                gap: "5px",
                "&:hover": {
                  backgroundColor: "#025ED8",
                },
              }}
              onClick={handleAddModalOpen}
            >
              <AddIcon sx={{ fontSize: "14px" }} />
              Add Curriculum
            </Button>
            <Modal open={isAddModalOpen} onClose={handleAddModalClose}>
              <Box style={styleCurriculum}>
                <IconButton
                  edge="end"
                  color="#D9D9D9"
                  onClick={closeModal}
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
                  <Grid item md={8}>
                    <Typography
                      id="modal-modal-title"
                      variant="h4"
                      component="h2"
                      sx={{
                        fontWeight: 600,
                        paddingBottom: 3,
                        paddingTop: 2,
                      }}
                    >
                      Add Curriculum
                    </Typography>
                  </Grid>
                  <Grid item mt={2} md={4}>
                    <Link
                      sx={{
                        cursor: "pointer",
                        color: "#025ED8",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      Template Excel
                    </Link>
                  </Grid>
                </Grid>
                <FormControl
                  fullWidth
                  sx={{
                    width: "100%",
                    marginBottom: 3,
                  }}
                  label="Program Studi"
                >
                  <InputLabel>Program Studi</InputLabel>
                  <Select
                    label="Program Studi"
                    value={selectedProdi}
                    onChange={handleProdiChange}
                  >
                    <MenuItem value="Informatika">Informatika</MenuItem>
                    <MenuItem value="Sistem Informasi">
                      Sistem Informasi
                    </MenuItem>
                    <MenuItem value="Teknologi Informasi">
                      Teknologi Informasi
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Tahun"
                  variant="outlined"
                  fullWidth
                  value={selectedYear}
                  onChange={handleYearChange}
                  sx={{ marginBottom: 3 }}
                />
                <FormControl
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: "white" }}
                  size="small"
                >
                  <Input
                    type="file"
                    id="excel-file-input"
                    onChange={handleFileInputChange}
                    disableUnderline
                    inputProps={{ style: { display: "none" } }}
                  />
                  <label
                    htmlFor="excel-file-input"
                    style={{
                      border: "0.2px solid #BCBCBC",
                      padding: "14px",
                      height: "53px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "border-color 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "black";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#BCBCBC";
                    }}
                    onClick={(e) => {
                      e.currentTarget.style.border = "2px solid #006AF5";
                    }}
                    id="excel-file-label"
                  >
                    <span style={{ color: "#7a7a7a" }}>
                      {selectedFileName || "Import Excel"}
                    </span>
                    <SaveAltIcon style={{ color: "#888888" }} />
                  </label>
                </FormControl>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    pt: 3,
                  }}
                >
                  <Button
                    size="small"
                    onClick={handleOpenFirstModal}
                    sx={{
                      backgroundColor: "#006AF5",
                      borderRadius: "24px",
                      color: "white",
                      fontSize: "12px",
                      padding: "7px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      gap: "5px",
                      "&:hover": {
                        backgroundColor: "#025ED8",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
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
                      Send Certificate?
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
                      You have successfully preregistered for the course.
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
                      Error: Failed to add curriculum. Please try again.
                    </Typography>
                  </div>
                </Modal>
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </div>
      <div>
        <Select
          value={curriculum}
          onChange={handleOnChange}
          sx={{
            width: "100%",
            backgroundColor: "rgba(26, 56, 96, 0.1)",
          }}
        >
          <MenuItem value="selectCurriculum">
            <Typography sx={{ fontWeight: 400 }}>View Curriculum</Typography>
          </MenuItem>

          {listCurriculum.map((value, index) => {
            return (
              <MenuItem key={value.id} value={value.id}>
                {value.major} {value.year}
              </MenuItem>
            );
          })}
        </Select>
      </div>

      <Grid container pt={4}>
        {curriculum === "selectCurriculum" ? (
          ""
        ) : (
          <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
            <Table>
              {/* stickyHeader */}
              <TableHead
                sx={{
                  position: "-webkit-sticky",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "rgb(245, 247, 250)",
                }}
              >
                <TableCell sx={{ width: "80px" }}>Number</TableCell>
                <TableCell sx={{ width: "80px" }}>Semester</TableCell>
                <TableCell sx={{ width: "80px" }}>Code</TableCell>
                <TableCell sx={{ width: "400px" }}>Name</TableCell>
                <TableCell sx={{ width: "80px" }}>Credit(s)</TableCell>
                <TableCell sx={{ width: "80px" }}>Type</TableCell>
                <TableCell sx={{ width: "400px" }}>Prerequisite</TableCell>
              </TableHead>
              {listSubject &&
                listSubject.map((value, index) => (
                  <TableRow key={value.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {value.semester === 0 ? "Pre-Requisite" : value.semester}
                    </TableCell>
                    <TableCell>{value.code}</TableCell>
                    <TableCell>{value.name}</TableCell>
                    <TableCell>{value.credits}</TableCell>
                    <TableCell>{value.type}</TableCell>
                    <TableCell>
                      {value.prerequisite === null || value.prerequisite === ""
                        ? "-"
                        : value.prerequisite}
                    </TableCell>
                  </TableRow>
                ))}
            </Table>
          </TableContainer>
        )}
      </Grid>
    </div>
  );
};

export default Curriculum;
