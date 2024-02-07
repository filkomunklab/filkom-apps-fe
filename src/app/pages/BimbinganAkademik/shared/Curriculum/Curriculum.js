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
import CircularProgress from "@mui/material/CircularProgress";
import * as XLSX from "xlsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { EXCEL_FILE_BASE64 } from "./constants";
import FileSaver from "file-saver";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

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

const style3 = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
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

  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSecondModal = () => setOpenSecondModal(true);
  const handleCloseSecondModal = () => setOpenSecondModal(false);
  const handleOpenErrorModal = () => setOpenErrorModal(true);
  const handleCloseErrorModal = () => setOpenErrorModal(false);

  const [selectedCurriculumId, setSelectedCurriculumId] = useState(null);
  const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);

  const handleOpenDeleteConfirmationModal = () => {
    setDeleteConfirmationModalOpen(true);
  };

  const handleCloseDeleteConfirmationModal = () => {
    setDeleteConfirmationModalOpen(false);
  };

  const handleDeleteClick = (curriculumId) => {
    setSelectedCurriculumId(curriculumId);
    handleOpenDeleteConfirmationModal();
  };

  const handleConfirmDelete = async () => {
    try {
      await jwtAuthAxios.delete(
        `/curriculums/${curriculum}`
        // {
        //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        // }
      );

      handleCloseDeleteConfirmationModal();
      getCurriculum();
      setCurriculum("selectCurriculum");
    } catch (error) {
      console.error("Error deleting curriculum:", error);
      console.error("Error response:", error.response);
    }
  };

  const handleSubmitFirstModal = async () => {
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
        const response = await jwtAuthAxios.post(
          `/curriculum`,
          data
          // {
          //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          // }
        );

        if (response.data.status === "OK") {
          console.log("Successful response:", result.data);
          setSelectedProdi("");
          setSelectedYear("");
          setSelectedFile(null);
          setSelectedFileName("");
          handleOpenSecondModal();
          handleCloseFirstModal();
          handleAddModalClose();
          getCurriculum();
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        console.error("Error response:", error.response);
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
    let timer;

    if (openSecondModal) {
      timer = setTimeout(() => {
        handleCloseSecondModal();
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [openSecondModal, handleCloseSecondModal]);

  useEffect(() => {
    getCurriculum();
  }, []);

  useEffect(() => {
    getSubjectByIdCurriculum();
  }, [curriculum]);

  const getSubjectByIdCurriculum = async () => {
    try {
      const result = await jwtAuthAxios.get(
        `/subject/${curriculum}`
        //  {
        //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        // }
      );

      if (result.data.status === "OK") {
        setListSubject(result.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Error response:", error.response);
    }
  };

  const getCurriculum = async () => {
    try {
      const result = await jwtAuthAxios.get(`/curriculum`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (result.data.status === "OK") {
        setListCurriculum(result.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Error response:", error.response);
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
        alert("Only Excel files (xlsx, xls) are allowed.");
        event.target.value = "";
      }
    } else {
      setSelectedFile(null);
      setSelectedFileName("");
    }
  };

  const handleOnChange = (e) => {
    setCurriculum(e.target.value);
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
    const inputValue = event.target.value;

    if (!isNaN(Number(inputValue))) {
      setSelectedYear(inputValue);
    }
  };
  const handleOpenFirstModal = (event) => {
    if (!selectedProdi || !selectedYear || !selectedFile) {
      alert("Please fill the field first");
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
    if (path.includes("sek-dekan")) {
      return "sekdekan";
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
      case "sekdekan":
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
          sx={{ fontSize: "24px", fontWeight: 500, paddingBottom: "6px" }}
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
                paddingBottom: "6px",
              }}
            >
              You can choose the curriculum
            </Typography>
          </Grid>

          {role === "sekdekan" && allowedFeatures.includes("add_kurikulum") && (
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
                    Successful Adding Curriculum!
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    style={{ marginTop: "16px", marginBottom: "20px" }}
                  >
                    You have successfully added a new curriculum to the list
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
            </Grid>
          )}
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
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: "40%",
              },
            },
          }}
        >
          <MenuItem value="selectCurriculum">
            <Typography sx={{ fontWeight: 400 }}>View Curriculum</Typography>
          </MenuItem>

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
                {role === "sekdekan" &&
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
        </Select>
        <Modal
          open={isDeleteConfirmationModalOpen}
          onClose={handleCloseDeleteConfirmationModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={style2}>
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

      <Grid container pt={3}>
        {curriculum === "selectCurriculum" ? (
          ""
        ) : (
          <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
            <Table>
              <TableHead
                sx={{
                  position: "-webkit-sticky",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "rgb(245, 247, 250)",
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
