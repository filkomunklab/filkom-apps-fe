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
  CircularProgress,
} from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import * as XLSX from "xlsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { EXCEL_FILE_BASE64 } from "./constants";
import FileSaver from "file-saver";
import { useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import SuccessOrError from "../../components/Modal/SuccessOrError";
import { handleAuthenticationError } from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";
import CustomAlert from "../../components/Alert/Alert";

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
  "@media (max-width: 768px)": {
    maxWidth: "80%",
  },
  "@media (max-width: 480px)": {
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
  "@media (max-width: 768px)": {
    maxWidth: "80%",
  },
  "@media (max-width: 480px)": {
    maxWidth: "80%",
  },
};

const Curriculum = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const [curriculum, setCurriculum] = useState("selectCurriculum");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [showLabel, setShowLabel] = useState(true);
  const [loading, setLoading] = useState(false);

  const [listCurriculum, setListCurriculum] = useState([]);
  const [listSubject, setListSubject] = useState([]);

  // Alert
  const [alert, setAlert] = useState(null);
  const showAlert = (message) => {
    setAlert({ message });
  };
  const hideAlert = () => {
    setAlert(null);
  };

  //modal
  const [selectedProdi, setSelectedProdi] = useState("");
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSuccessModal = () => setOpenSuccessModal(true);
  const handleCloseSuccessModal = () => setOpenSuccessModal(false);
  const handleOpenErrorModal = () => setOpenErrorModal(true);
  const handleCloseErrorModal = () => setOpenErrorModal(false);

  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  const handleOpenDeleteConfirmationModal = () =>
    setDeleteConfirmationModalOpen(true);
  const handleCloseDeleteConfirmationModal = () =>
    setDeleteConfirmationModalOpen(false);

  const handleDeleteClick = (curriculumId) => {
    setSelectedCurriculumId(curriculumId);
    handleOpenDeleteConfirmationModal();
  };

  const [selectedCurriculumId, setSelectedCurriculumId] = useState(null);
  const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);

  const handleConfirmDelete = async () => {
    try {
      await jwtAuthAxios.delete(`/curriculums/${curriculum}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });

      handleCloseDeleteConfirmationModal();
      getCurriculum();
      setCurriculum("selectCurriculum");
    } catch (error) {
      if (error && error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error && error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.error("error: ");
        return;
      }
    }
  };

  const handleSubmitFirstModal = async () => {
    setLoading(true);

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
        const response = await jwtAuthAxios.post(`/curriculum`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        });

        if (response.data.status === "OK") {
          hideAlert();
          setSelectedProdi("");
          setSelectedYear("");
          setSelectedFile(null);
          setSelectedFileName("");
          handleOpenSuccessModal();
          handleCloseFirstModal();
          handleAddModalClose();
          getCurriculum();
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:");
        hideAlert();
        setSelectedProdi("");
        setSelectedYear("");
        setSelectedFile(null);
        setSelectedFileName("");
        handleOpenErrorModal();
        handleCloseFirstModal();
        handleAddModalClose();
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    getCurriculum();
  }, []);

  useEffect(() => {
    getSubjectByIdCurriculum();
  }, [curriculum]);

  const getSubjectByIdCurriculum = async () => {
    try {
      const result = await jwtAuthAxios.get(`/subject/${curriculum}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });

      if (result.data.status === "OK") {
        setListSubject(result.data.data);
      }
    } catch (error) {
      if (error && error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error && error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.log("error: ");
        return;
      }
    }
  };

  const getCurriculum = async () => {
    try {
      const result = await jwtAuthAxios.get(`/curriculum`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });

      if (result.data.status === "OK") {
        setListCurriculum(result.data.data);
      }
    } catch (error) {
      if (error && error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error && error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.error("error: ");
        return;
      }
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
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
        showAlert("Only Excel files (xlsx, xls) are allowed.");
        event.target.value = "";
      }
    } else {
      setSelectedFile(null);
      setSelectedFileName("");
    }
  };

  const handleProdiChange = (event) => {
    setSelectedProdi(event.target.value);
  };

  const handleYearChange = (event) => {
    const inputValue = event.target.value;

    if (!isNaN(Number(inputValue))) {
      const formattedValue = inputValue.slice(0, 4);
      setSelectedYear(formattedValue);
    }
  };

  const handleOpenFirstModal = (event) => {
    if (!selectedProdi || !selectedYear || !selectedFile) {
      showAlert("Please fill the field first");
      return;
    } else if (selectedYear.length !== 4) {
      showAlert("Year must have exactly 4 digits");
      return;
    } else {
      setOpenFirstModal(true);
    }
  };

  const closeModal = () => {
    handleAddModalClose();
  };

  const getRoleFromPath = () => {
    const path = window.location.pathname;
    if (path.includes("sekretaris")) {
      return "sekretaris";
    } else if (path.includes("dekan")) {
      return "dekan";
    } else if (path.includes("kaprodi")) {
      return "kaprodi";
    } else if (path.includes("dospem")) {
      return "dospem";
    }
  };
  const [role, setRole] = useState(getRoleFromPath());
  const determineAllowedFeatures = () => {
    switch (role) {
      case "sekretaris":
        return ["view_kurikulum", "add_kurikulum", "delete_kurikulum"];
      case "dekan":
        return ["view_kurikulum"];
      case "kaprodi":
        return ["view_kurikulum"];
      case "dospem":
        return ["view_kurikulum"];
      default:
        return [];
    }
  };
  const allowedFeatures = determineAllowedFeatures();

  const handleTemplate = () => {
    let dataBlob = EXCEL_FILE_BASE64;
    let sliceSize = 1024;
    let byteCharacters = atob(dataBlob);
    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    let byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      let begin = sliceIndex * sliceSize;
      let end = Math.min(begin + sliceSize, bytesLength);
      let bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    let blob = new Blob(byteArrays, { type: "application/vnd.ms.excel" });
    FileSaver.saveAs(new Blob([blob], {}), "templateCurriculum.xlsx");
  };

  const renderRows = () => {
    const rows = [];
    let currentSemester = null;

    listSubject.forEach((value, index) => {
      if (value.semester !== currentSemester) {
        rows.push(
          <TableRow key={`semester-${value.semester}`}>
            <TableCell
              colSpan={6}
              sx={{
                lign: "left",
                fontWeight: 500,
                fontSize: "15px",
                color: "black",
              }}
            >
              {value.semester === 0
                ? "Pre-Requisite"
                : value.semester === 9
                ? "Elective"
                : `Semester ${value.semester}`}
            </TableCell>
          </TableRow>
        );
        currentSemester = value.semester;
      }

      rows.push(
        <TableRow key={value.id}>
          <TableCell>{value.code}</TableCell>
          <TableCell>{value.name}</TableCell>
          <TableCell sx={{ width: "80px", textAlign: "right" }}>
            {value.credits}
          </TableCell>
          <TableCell>{value.type}</TableCell>
          <TableCell sx={{ width: "400px" }}>
            {value.prerequisite === null || value.prerequisite === ""
              ? "-"
              : value.prerequisite
                  .split(/(?<=\])\s-\s|\n/)
                  .map((prereq, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && (
                        <>
                          <br /> <br />
                        </>
                      )}
                      {prereq}
                    </React.Fragment>
                  ))}
          </TableCell>
        </TableRow>
      );
    });
    return rows;
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
          sx={{ fontSize: "24px", fontWeight: 500, paddingBottom: "5px" }}
        >
          Curriculum
        </Typography>
        <Grid container spacing={2} pb={2}>
          <Grid item md={8}>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 400,
                color: "rgba(27, 43, 65, 0.69)",
                paddingTop: "7px",
              }}
            >
              You can choose the curriculum
            </Typography>
          </Grid>

          {role === "sekretaris" &&
            allowedFeatures.includes("add_kurikulum") && (
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
                    {alert && (
                      <CustomAlert
                        message={alert.message}
                        onClose={hideAlert}
                      />
                    )}
                    <Grid container paddingTop={2}>
                      <Grid item md={8} xs={8}>
                        <Typography
                          id="modal-modal-title"
                          variant="h4"
                          component="h2"
                          sx={{
                            fontWeight: 600,
                            paddingBottom: 3,
                            paddingTop: 2,
                            "@media (max-width: 390px)": {
                              fontSize: "15px",
                            },
                          }}
                        >
                          Add Curriculum
                        </Typography>
                      </Grid>
                      <Grid item mt={2} md={4} xs={4}>
                        <Link
                          sx={{
                            cursor: "pointer",
                            color: "#025ED8",
                            display: "flex",
                            justifyContent: "flex-end",
                            "@media (max-width: 390px)": { fontSize: "11px" },
                          }}
                          onClick={handleTemplate}
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
                    >
                      <InputLabel>Program of Study</InputLabel>
                      <Select
                        label="Program of Study"
                        value={selectedProdi}
                        onChange={handleProdiChange}
                      >
                        <MenuItem value="Informatika">Informatics</MenuItem>
                        <MenuItem value="Sistem Informasi">
                          Information System
                        </MenuItem>
                        <MenuItem value="Teknologi Informasi">
                          Information Technology
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Year (e.g., 2020)"
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
                          e.currentTarget.style.border = "0.2px solid #BCBCBC";
                        }}
                        onClick={(e) => {
                          e.currentTarget.style.border = "2px solid #006AF5";
                        }}
                        id="excel-file-label"
                      >
                        <span
                          style={{
                            color: selectedFileName ? "#000000" : "#7a7a7a",
                          }}
                        >
                          {selectedFileName || "Import Excel"}
                        </span>
                        <SaveAltIcon sx={{ color: "#888888" }} />
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
                        variant="outlined"
                        sx={{
                          borderRadius: "24px",
                          fontSize: "12px",
                          padding: "7px 20px",
                          borderColor: "#E0E0E0",
                          color: "#0A0A0A",
                          mr: 1,
                        }}
                        onClick={closeModal}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="small"
                        onClick={handleOpenFirstModal}
                        sx={{
                          backgroundColor: "#006AF5",
                          borderRadius: "24px",
                          color: "white",
                          fontSize: "12px",
                          padding: "7px 20px",
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
                          Add Curriculum?
                        </Typography>
                        <Typography
                          id="modal-modal-description"
                          sx={{ marginTop: "16px", marginBottom: "20px" }}
                        >
                          Are you sure you want to add this curriculum on the
                          list?
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
                                backgroundColor: "lightgrey",
                                "&:hover": {
                                  backgroundColor: "darkgrey",
                                },
                              }}
                            >
                              No
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
                              Yes
                            </Button>
                          </Grid>
                        </Grid>
                      </div>
                    </Modal>
                  </Box>
                </Modal>
                <SuccessOrError
                  open={openSuccessModal}
                  handleClose={handleCloseSuccessModal}
                  title="Successful Adding Curriculum!"
                  description="You have successfully added a new curriculum to the list."
                />
                <SuccessOrError
                  open={openErrorModal}
                  handleClose={handleCloseErrorModal}
                  title="Error Submission!"
                  description="Error: Failed to add curriculum. Please try again."
                />
              </Grid>
            )}
        </Grid>
      </div>
      <div>
        <TextField
          value={curriculum}
          id="outlined-select-topic"
          select
          onChange={(event) => {
            setCurriculum(event.target.value);
            setShowLabel(false);
          }}
          label={showLabel ? "View Curriculum" : ""}
          sx={{
            width: "100%",
            backgroundColor: "rgba(26, 56, 96, 0.1)",
          }}
          InputLabelProps={{
            shrink: false,
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: "30vh",
              },
            },
          }}
        >
          {listCurriculum.map((value, index) => (
            <MenuItem
              key={value.id}
              value={value.id}
              sx={{
                "&:hover": {
                  ".delete-icon": {
                    display: ["flex"],
                  },
                },
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {value.major} {value.year}
                {role === "sekretaris" &&
                  allowedFeatures.includes("add_kurikulum") && (
                    <IconButton
                      className="delete-icon"
                      onClick={() => handleDeleteClick(value.id)}
                      sx={{
                        color: "#4b4951",
                        marginLeft: 1,
                        display: "none",
                        padding: 0,
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: "18px" }} />
                    </IconButton>
                  )}
              </div>
            </MenuItem>
          ))}
        </TextField>
        <Modal
          open={isDeleteConfirmationModalOpen}
          onClose={handleCloseDeleteConfirmationModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={style}>
            <IconButton
              edge="end"
              color="#D9D9D9"
              onClick={handleCloseDeleteConfirmationModal}
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
              Confirm Deletion
            </Typography>
            <Typography
              id="modal-modal-description"
              style={{ marginTop: "16px", marginBottom: "20px" }}
            >
              Are you sure you want to delete this curriculum?
            </Typography>
            <Grid container spacing={1} justifyContent="flex-end">
              <Grid item>
                <Button
                  onClick={handleCloseDeleteConfirmationModal}
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
                  onClick={handleConfirmDelete}
                  sx={{
                    borderRadius: "5px",
                    color: "white",
                    whiteSpace: "nowrap",
                    backgroundColor: "#006AF5",
                    "&:hover": {
                      backgroundColor: "#025ED8",
                    },
                  }}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>

      <Grid container pt={4}>
        {curriculum === "selectCurriculum" ? (
          ""
        ) : (
          <TableContainer sx={{ maxHeight: "85vh" }} component={Paper}>
            <Table>
              <TableHead
                sx={{
                  position: "-webkit-sticky",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#dfe4eb",
                  zIndex: 1,
                }}
              >
                <TableRow>
                  <TableCell sx={{ width: "80px" }}>Code</TableCell>
                  <TableCell sx={{ width: "400px" }}>Name</TableCell>
                  <TableCell sx={{ width: "80px", textAlign: "right" }}>
                    Credit(s)
                  </TableCell>
                  <TableCell sx={{ width: "130px" }}>Type</TableCell>
                  <TableCell sx={{ width: "400px" }}>Prerequisite</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderRows()}</TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </div>
  );
};

export default Curriculum;
