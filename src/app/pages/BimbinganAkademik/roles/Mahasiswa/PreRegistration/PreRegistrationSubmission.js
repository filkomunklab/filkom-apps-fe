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
  Modal,
  CircularProgress,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SuccessOrError from "app/pages/BimbinganAkademik/components/Modal/SuccessOrError";
import { useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

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
  "@media (maxWidth: 480px)": {
    maxWidth: "80%",
  },
};

const PreviewPopup = ({ open, onClose, previewRows, totalCredits }) => {
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
                      <TableCell>{data.grade ? data.grade : "-"}</TableCell>
                      <TableCell>{data.type}</TableCell>
                      <TableCell>
                        {data.prerequisite ? data.prerequisite : "-"}
                      </TableCell>
                      <TableCell>{data.status ? data.status : "-"}</TableCell>
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

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", handleCheckboxChange);
    });

    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener("click", handleCheckboxChange);
      });
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
            width: "400px",
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
                  "@media (maxWidth: 650px)": { fontSize: "9px" },
                  "&:hover": {
                    backgroundColor: "#025ED8",
                  },
                }}
              >
                See Preview
                <ArrowRightAltIcon
                  sx={{ "@media (maxWidth: 650px)": { fontSize: "14px" } }}
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

const PreRegistrationSubmission = ({}) => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  //inisialisasi
  const [listSubject, setListSubject] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(false);

  //get data
  const [dataPreregis, setDataPreregis] = useState([]);
  const [curriculumDetails, setCurriculumDetails] = useState({
    name: "",
    year: "",
  });

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
    } else if (
      error.response &&
      error.response.status >= 401 &&
      error.response.status <= 403
    ) {
      console.log("You don't have permission to access this page");
      navigate(`/`);
    } else {
      console.log("ini error: ", error);
    }
  };

  const getDataPreregis = async () => {
    try {
      const nim = JSON.parse(localStorage.getItem("user")).nim;
      const studentData = await jwtAuthAxios.get(`/student/${nim}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      const major = studentData.data.data.major;
      const result = await jwtAuthAxios.get(
        `/pre-regist/status/${major}/${nim}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );
      const preregisData = result.data.data;
      setDataPreregis(preregisData);

      console.log("ini panjang preregisdata", preregisData.PreRegistrationData);
      console.log("Data preregistration:", preregisData);
    } catch (error) {
      handleError(error);
    }
  };

  const getCurriculumDetails = async () => {
    try {
      const userNIM = JSON.parse(localStorage.getItem("user")).nim;
      const studentData = await jwtAuthAxios.get(`/student/${userNIM}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      const curriculumId = studentData.data.data.curriculumId;
      // const curriculumId = "790021f2-9d25-4d65-a637-f4e883ad1885";

      if (!curriculumId) {
        console.error("Curriculum ID is null.");
        return;
      }

      const curriculumResult = await jwtAuthAxios.get(
        `/pre-regist/curriculum?id=${curriculumId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      const detail = curriculumResult.data.data;
      setCurriculumDetails({
        name: detail.major,
        year: detail.year,
      });

      setListSubject(detail.Subjects);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getCurriculumDetails();
    getDataPreregis();
    return () => controller.abort();
  }, []);

  const handleSubmitFirstModal = async () => {
    handleCloseFirstModal();
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const classId = await jwtAuthAxios.get(
        `/guidance-class/${user.guidanceClassId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal,
        }
      );

      const employeeId = classId.data.data.teacherId;

      const listOfSubject = selectedRows.map((row) => ({ subjectId: row.id }));
      const requestBody = {
        studentId: user.nim,
        employeeId: employeeId,
        listOfSubject: listOfSubject,
        description: "",
        preRegistrationId: dataPreregis.id,
      };

      const response = await jwtAuthAxios.post(
        `/pre-regist/submit`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal,
        }
      );
      console.log("ini isi requestbody:", requestBody);
      if (response.data.status === "OK") {
        window.location.reload();
        setSelectedRows([]);
        setTotalCredits(0);
        setShowPopup(true);
        setLoading(false);
      }
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (
        error.response &&
        error.response.status >= 401 &&
        error.response.status <= 403
      ) {
        console.log("You don't have permission to access this page");
        navigate(`/`);
        return;
      } else {
        console.log("Error submitting courses:", error.response);
        setSelectedRows([]);
        setTotalCredits(0);
        setShowPopup(true);
        handleOpenErrorModal();
        setLoading(false);
      }
    }
  };

  const handleCheckboxChange = (isChecked, data) => {
    let updatedSelectedRows = [...selectedRows];
    let updatedTotalCredits = totalCredits;

    if (isChecked) {
      if (updatedTotalCredits + data.credits > 20) {
        alert(
          "Warning: Credit limit exceeded! Please select fewer credits or take courses with 20 accumulated credits."
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
              colSpan={8}
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
          <TableCell>{value.grade ? value.grade : "-"}</TableCell>
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
            Date of KRS Filling:{" "}
            {new Date(dataPreregis.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}{" "}
            -{" "}
            {new Date(dataPreregis.dueDate).toLocaleDateString("en-US", {
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
        <TableContainer sx={{ maxHeight: 570 }} component={Paper}>
          <Table stickyHeader>
            <TableHead>
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
export default PreRegistrationSubmission;
