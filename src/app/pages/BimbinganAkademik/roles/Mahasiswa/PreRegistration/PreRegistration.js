import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Grid,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  IconButton,
  Modal,
  Link,
} from "@mui/material";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
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

const PreviewPopup = ({ open, onClose, previewRows, totalCredits }) => {
  console.log("hula", previewRows);
  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: 60,
          marginRight: 3,
        }}
      >
        <DialogTitle sx={{ alignSelf: "center", margin: 0 }}>
          Courses Preview
        </DialogTitle>
        <Button
          onClick={onClose}
          color="primary"
          sx={{
            marginY: 2,
            color: "white",
            backgroundColor: "#006AF5",

            "&:hover": {
              backgroundColor: "#025ED8",
            },
          }}
        >
          Close
        </Button>
      </Box>

      <Typography variant="h6" sx={{ paddingLeft: 3 }}>
        {previewRows.length} course selected {totalCredits} credits
      </Typography>
      <DialogContent>
        {previewRows.length > 0 ? (
          <div>
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableHeading />
                </TableHead>
                <TableBody>
                  {previewRows.map((data, index = 1) => (
                    <TableRow key={data.number}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{data.code}</TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell>{data.credits}</TableCell>
                      <TableCell>{data.grades}</TableCell>
                      <TableCell>{data.type}</TableCell>
                      <TableCell>{data.prerequisite}</TableCell>
                      <TableCell>{data.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <div>
            <Typography>
              Tidak ada baris yang dipilih untuk ditampilkan.
            </Typography>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Popup = ({ open, onClose, selectedRows, totalCredits }) => {
  const [previewRows, setPreviewRows] = useState([]);
  const [showPreviewPopup, setShowPreviewPopup] = useState(false);
  const [divVisible, setDivVisible] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleShowPreview = () => {
    console.log("ahem", selectedRows);
    setPreviewRows(selectedRows);
    setDivVisible(true);
  };

  const handleClosePreview = () => {
    setDivVisible(false);
    setShowPreviewPopup(false);
  };

  useEffect(() => {
    const handleCheckboxChange = () => {
      if (selectedRows.length > 0) {
        setDivVisible(true);
      } else {
        setDivVisible(false);
      }
    };

    window.addEventListener("change", handleCheckboxChange);

    return () => {
      window.removeEventListener("change", handleCheckboxChange);
    };
  }, [selectedRows]);

  return (
    <div>
      <PreviewPopup
        open={showPreviewPopup}
        onClose={handleClosePreview}
        previewRows={previewRows}
      />
      {divVisible && (
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            borderRadius: 10,
            left: "50%",
            transform: `translateX(-50%)`,
            backgroundColor: "white",
            padding: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            zIndex: 100,
            width: "80%",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <div style={{ paddingLeft: "20px" }}>
                {selectedRows.length} courses selected, {totalCredits} credits.
              </div>
              <Button
                size="small"
                onClick={() => {
                  handleShowPreview();
                  setShowPreviewPopup(true);
                }}
                sx={{
                  color: "white",
                  backgroundColor: "#006AF5",
                  "@media (max-width: 650px)": { fontSize: "9px" },
                  "&:hover": {
                    backgroundColor: "#025ED8",
                  },
                }}
              >
                See Preview
                <ArrowRightAltIcon
                  sx={{ "@media (max-width: 650px)": { fontSize: "14px" } }}
                />
              </Button>
            </div>
            {showWarning && (
              <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
                Warning: Some selected courses have a grade of "pass."
              </Typography>
            )}
            <PreviewPopup
              open={showPreviewPopup}
              onClose={() => setShowPreviewPopup(false)}
              previewRows={previewRows}
              totalCredits={totalCredits}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const PreRegistration = () => {
  const [curriculumDetails, setCurriculumDetails] = useState({
    name: "",
    year: "",
  });

  useEffect(() => {
    getCurriculumDetails();
  }, []);

  const [listSubject, setListSubject] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const [openFirstModal, setOpenFirstModal] = React.useState(false);
  const [openSecondModal, setOpenSecondModal] = React.useState(false);

  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSecondModal = () => setOpenSecondModal(true);
  const handleCloseSecondModal = () => setOpenSecondModal(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseSecondModal();
    }, 5000); // 5000 ms = 5 detik

    return () => {
      clearTimeout(timer);
    };
  }, [handleOpenSecondModal]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const labelElement = document.getElementById("certificate-label");
    if (labelElement) {
      labelElement.style.border = "0.5px solid #BCBCBC";
    }

    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName("");
    }
  };

  const handleSubmitFirstModal = () => {
    handleCloseFirstModal();
    handleOpenSecondModal();
  };

  const handleCheckboxChange = (isChecked, data) => {
    let updatedSelectedRows = [...selectedRows];
    let updatedTotalCredits = totalCredits;

    if (isChecked) {
      if (updatedTotalCredits + data.credits > 23) {
        alert(
          "Warning: Credit limit exceeded! Please select fewer credits or take courses with 23 accumulated credits."
        );
        return;
      }

      updatedSelectedRows.push(data);
      updatedTotalCredits += data.credits;

      if (data.grade === "pass") {
        setShowWarning(true);
      }
    } else {
      updatedSelectedRows = updatedSelectedRows.filter((row) => row !== data);
      updatedTotalCredits -= data.credits;

      setShowButton(true);
    }

    setSelectedRows(updatedSelectedRows);
    setTotalCredits(updatedTotalCredits);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const getCurriculumDetails = async () => {
    try {
      const curriculumResult = await axios.get(`${BASE_URL_API}/curriculum`);

      if (curriculumResult.data.status === "OK") {
        const firstCurriculum = curriculumResult.data.data[0];

        setCurriculumDetails({
          name: firstCurriculum.major,
          year: firstCurriculum.year,
        });

        const result = await axios.get(
          `${BASE_URL_API}/subject/${firstCurriculum.id}`
        );

        if (result.data.status === "OK") {
          setListSubject(result.data.data);
        }
      }
    } catch (error) {
      console.error("Ini error:", error);
    }
  };

  const renderRows = () => {
    const rows = [];
    let currentSemester = null;

    const checkBox = (value) => (
      <Checkbox
        checked={selectedRows.includes(value)}
        onChange={(e) => handleCheckboxChange(e.target.checked, value)}
      />
    );

    listSubject.forEach((value, index) => {
      if (value.semester !== currentSemester) {
        rows.push(
          <TableRow key={`semester-${value.semester}`}>
            <TableCell
              colSpan={6}
              sx={{
                textAlign: "left",
                fontWeight: 500,
                fontSize: "15px",
                color: "rgba(0,0,0,0.8)",
              }}
            >
              {value.semester === 0
                ? "PRE-REQUISITE"
                : value.semester === 9
                ? "Elective"
                : `SEMESTER ${value.semester}`}
            </TableCell>
          </TableRow>
        );
        currentSemester = value.semester;
      }

      rows.push(
        <TableRow key={value.id}>
          <TableCell>{checkBox(value)}</TableCell>
          <TableCell>{value.code}</TableCell>
          <TableCell>{value.name}</TableCell>
          <TableCell>{value.credits}</TableCell>
          <TableCell>{value.grade ? value.grade : "pass"}</TableCell>
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
          <TableCell>{value.status ? value.status : "-"}</TableCell>
        </TableRow>
      );
    });

    return rows;
  };

  return (
    <div>
      <div>
        <Typography
          sx={{ fontSize: "24px", fontWeight: 500, paddingBottom: 2 }}
        >
          Courses Pre-registration
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
            Not yet filled out KHS <br /> <br />
            Date of KRS Filling: September 09, 2023 - September 12, 2023, at
            19.00
          </Typography>
          <WarningAmberIcon sx={{ color: "#FFCC00", fontSize: "42px" }} />
        </Paper>
        <Paper
          sx={{
            backgroundColor: "rgba(0, 106, 245, 0.1)",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "50px",
            marginBottom: "50px",
          }}
        >
          <Typography variant="body1">
            Attention!
            <br />
            <br /> Every student is required to pre-register for courses for the
            next semester. <br />
            <br />
            Please pay close attention to the courses that have been taken
            before and those that will be taken afterwards, so that there is no
            clash of course schedules and can plan lectures more effectively.
            <br />
            <br /> It must be noted that each student can only fill in
            pre-registration courses limited to 20 credits. No more than that.
          </Typography>
        </Paper>
        <Typography
          sx={{ fontSize: "18px", fontWeight: 500, paddingBottom: "10px" }}
        >
          Curriculum{` ${curriculumDetails.name} - ${curriculumDetails.year}`}
        </Typography>
      </div>
      <div>
        <Popup
          open={showPopup}
          onClose={() => setShowPopup(false)}
          selectedRows={selectedRows}
          totalCredits={totalCredits}
        />
      </div>

      <Grid container pt={2}>
        <TableContainer sx={{ maxHeight: 400 }} component={Paper}>
          <Table stickyHeader>
            <TableHead
            // sx={{
            //   position: "-webkit-sticky",
            //   position: "sticky",
            //   top: 0,
            //   backgroundColor: "rgb(245, 247, 250)",
            //   zIndex: 2,
            // }}
            >
              <TableHeading />
              {/* <TableRow>
                <TableCell sx={{ width: "80px" }}> </TableCell>
                <TableCell sx={{ width: "80px" }}>Code</TableCell>
                <TableCell sx={{ width: "400px" }}>Name</TableCell>
                <TableCell sx={{ width: "80px", textAlign: "right" }}>
                  Credit(s)
                </TableCell>
                <TableCell sx={{ width: "80px", lign: "right" }}>
                  Grade
                </TableCell>
                <TableCell sx={{ width: "130px" }}>Type</TableCell>
                <TableCell sx={{ width: "400px" }}>Prerequisite</TableCell>
                <TableCell sx={{ width: "400px" }}>Status</TableCell>
              </TableRow> */}
            </TableHead>
            <TableBody>{renderRows()}</TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/bimbingan-akademik/pre-registration/"
          >
            <Button
              sx={{
                backgroundColor: "darkgrey",
                borderRadius: "24px",
                color: "black",
                whiteSpace: "nowrap",
                minWidth: "132px",
                fontSize: "12px",
                padding: "10px",
                marginRight: "24px",

                "&:hover": {
                  backgroundColor: "grey",
                },
              }}
            >
              Cancel
            </Button>
          </Link>

          <Button
            onClick={handleOpenFirstModal}
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
                Submit Courses Pre-registration?
              </Typography>
              <Typography
                id="modal-modal-description"
                style={{ marginTop: "16px", marginBottom: "20px" }}
              >
                Are you sure you want to submit this request? Forms that have
                been submitted cannot be edited again.
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
                Successfull Request!
              </Typography>
              <Typography
                id="modal-modal-description"
                style={{ marginTop: "16px", marginBottom: "20px" }}
              >
                You have successfully made a consultation request.
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
      <TableCell sx={[style]}>No</TableCell>
      <TableCell sx={[style]}>Code</TableCell>
      <TableCell sx={[style]}>Subject Name</TableCell>
      <TableCell sx={[style]}>Credit(s)</TableCell>
      <TableCell sx={[style]}>Grades</TableCell>
      <TableCell sx={[style]}>Type</TableCell>
      <TableCell sx={[style]}>Prerequisite</TableCell>
      <TableCell sx={[style]}>Status</TableCell>
    </TableRow>
  );
};

export default PreRegistration;
