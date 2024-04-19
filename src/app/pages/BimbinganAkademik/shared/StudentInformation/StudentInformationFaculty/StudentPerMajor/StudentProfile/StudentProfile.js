import Div from "@jumbo/shared/Div";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Breadcrumbs,
  Grid,
  Stack,
  Typography,
  experimentalStyled as styled,
  Link,
  Popover,
  IconButton,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Backdrop,
  CircularProgress,
  Button,
  Modal,
  TextField,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import SuccessOrError from "app/pages/BimbinganAkademik/components/Modal/SuccessOrError";
import { handleAuthenticationError } from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const role = Boolean(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).role
  : [];

const areaOfConcentrationOptions = [
  { value: "OBJECT_PROGRAMMER", label: "Object Programmer" },
  {
    value: "COMPETITIVE_INTELEGENT_ANALYSIS",
    label: "Competitive Intelligent Analysis",
  },
  { value: "NETWORK_ADMINISTRATOR", label: "Network Administrator" },
];

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
  maxWidth: "100%",
  "@media (max-width: 768px)": {
    maxWidth: "80%",
  },
  "@media (max-width: 480px)": {
    maxWidth: "80%",
  },
};

const StudentProfile = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const location = useLocation();
  const { studentId, major, studentNim } = location.state || "-";
  const [advisorProfileData, setAdvisorProfileData] = useState([]);
  const [studentProfileData, setStudentProfileData] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [editedFields, setEditedFields] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [areaOfConcentration, setAreaOfConcentration] = useState("");
  const [showLabelAreaOfConcentration, setShowLabelAreaOfConcentration] =
    useState(false);
  const dosenGuidanceClass = JSON.parse(
    localStorage.getItem("user")
  ).guidanceClassId;

  //modal
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const handleOpenConfirmModal = () => {
    setOpenConfirmModal(true);
  };
  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };
  const handleOpenFirstModal = () => {
    if (selectedStatus) {
      setOpenFirstModal(true);
    }
  };
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenErrorModal = () => setOpenErrorModal(true);
  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
    handleCloseFirstModal();
  };

  //handle error
  const handleError = (error) => {
    if (error.code === "ERR_CANCELED") {
      console.log("request canceled");
    } else if (error.response && error.response.status === 401) {
      handleAuthenticationError();
    } else {
      console.error("error: ");
    }
  };

  const getProfile = async () => {
    try {
      const resultStudent = await jwtAuthAxios.get(
        `/student/view/biodata/${studentId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      setStudentProfileData(resultStudent.data.data);
      setAdvisorProfileData(
        resultStudent.data.data.GuidanceClassMember?.gudianceClass?.teacher
      );
    } catch (error) {
      handleError(error);
    }
  };

  const changeStatus = async (value) => {
    try {
      setIsLoading(true);
      handleClosePopover();
      const response = await jwtAuthAxios.patch(
        `/employee/biodataStudent/status/${studentNim}`,
        { status: selectedStatus },
        {
          signal,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { status } = response.data;
      if (status === "OK") {
        setOpenFirstModal(false);
        getProfile();
      }
      setIsLoading(false);
    } catch (error) {
      handleOpenErrorModal();
      setIsLoading(false);
      handleError(error);
    }
  };

  const handleChangeStatus = (event) => {
    handleOpenFirstModal();
    setSelectedStatus(event.target.value);
  };

  useEffect(() => {
    getProfile().finally(() => setIsLoading(false));
    return () => controller.abort();
  }, []);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleEditProfile = () => {
    if (isEditMode) {
      handleOpenConfirmModal();
    } else {
      setIsEditMode(true);
    }
  };

  const handleFieldChange = (fieldName, value) => {
    setEditedFields((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setOpenConfirmModal(false);
      const payload = { ...editedFields };
      const response = await jwtAuthAxios.patch(
        `/employee/change-student-profile/${studentId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setIsEditMode(false);
      setIsLoading(false);
      getProfile();
    } catch (error) {
      setIsLoading(false);
      setOpenErrorModal(true);
      console.error("Error:");
    }
  };

  const textStyle = {
    borderWidth: 1,
    borderColor: "#00000029",
    borderStyle: "solid",
    paddingX: "24px",
    paddingY: "13px",
    borderRadius: "8px",
    color: isEditMode ? "#ccc" : "#000",
    cursor: isEditMode ? "not-allowed" : "text",
  };

  return (
    <>
      {isLoading ? (
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress />
        </Backdrop>
      ) : (
        <Div>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledLink
              onClick={() =>
                navigate(
                  `/bimbingan-akademik/${getRole()}/student-information/faculty-student`
                )
              }
            >
              Faculty Student
            </StyledLink>

            <StyledLink onClick={() => navigate(-1)}>
              {major === "IF"
                ? "Informatics"
                : major === "SI"
                ? "Information System"
                : major === "TI"
                ? "Information Technology"
                : "-"}{" "}
              Students List
            </StyledLink>
            <Typography color="text.primary">Student Profile</Typography>
          </Breadcrumbs>
          <Typography
            sx={{ fontSize: "24px", fontWeight: 500, paddingY: "20px" }}
          >
            Student Profile
            {dosenGuidanceClass ===
            studentProfileData?.GuidanceClassMember?.gudianceClass?.id ? (
              <Button
                sx={{
                  backgroundColor: "#006AF5",
                  color: "white",
                  borderRadius: "30px",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#004EE9",
                  },
                  float: "right",
                  marginRight: "20px",
                  padding: "10px 20px",
                }}
                onClick={handleEditProfile}
              >
                {isEditMode ? "Submit" : "Edit Profile"}
              </Button>
            ) : null}
            <Modal
              open={openConfirmModal}
              onClose={() => setOpenConfirmModal(false)}
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
                    paddingTop: 2,
                  }}
                >
                  Change Student Information?
                </Typography>
                <Typography
                  id="modal-modal-description"
                  style={{ marginTop: "16px", marginBottom: "20px" }}
                >
                  Are you sure you want to change information of this student?
                </Typography>

                <Grid container spacing={1} justifyContent="flex-end">
                  <Grid item>
                    <Button
                      onClick={() => setOpenConfirmModal(false)}
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
                      No
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={handleSubmit}
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
          </Typography>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ backgroundColor: "#1A38601A" }}
            >
              <Typography fontWeight={500}>Student Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3} sx={{ padding: 2 }}>
                <Grid item>
                  <Div
                    sx={{
                      width: "200px",
                      height: "300px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#1C345442",
                      borderRadius: "10px",
                    }}
                  >
                    {studentProfileData?.path ? (
                      <img
                        id="displayImage"
                        src={studentProfileData.path}
                        alt="Profile-Picture"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                        loading="lazy"
                      />
                    ) : (
                      <Typography>No photo</Typography>
                    )}
                  </Div>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="h5">Full Name</Typography>
                  <Typography variant="h6" sx={textStyle}>
                    {`${studentProfileData?.lastName ?? "-"}, ${
                      studentProfileData?.firstName ?? "-"
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Gender</Typography>
                  <Typography variant="h6" sx={textStyle}>
                    {studentProfileData?.gender ?? "-"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction={"row"}
                    gap={1}
                    justifyContent={"space-between"}
                  >
                    <Typography variant="h5">Student Status</Typography>
                    {dosenGuidanceClass ===
                    studentProfileData?.GuidanceClassMember?.gudianceClass
                      ?.id ? (
                      <IconButton size="small" onClick={handleOpenPopover}>
                        <BorderColorIcon fontSize="inherit" />
                      </IconButton>
                    ) : null}
                  </Stack>
                  {isEditMode ? (
                    <Typography
                      variant="h6"
                      sx={{
                        borderWidth: 1,
                        borderColor: "#00000029",
                        borderStyle: "solid",
                        paddingX: "24px",
                        paddingY: "13px",
                        borderRadius: "8px",
                      }}
                    >
                      {studentProfileData?.status ?? "-"}
                    </Typography>
                  ) : (
                    <Typography variant="h6" sx={textStyle}>
                      {studentProfileData?.status ?? "-"}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">NIM</Typography>
                  <Typography variant="h6" sx={textStyle}>
                    {studentProfileData?.nim ?? "-"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Registration Number</Typography>
                  <Typography variant="h6" sx={textStyle}>
                    {studentProfileData?.reg_num ?? "-"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Date of Birth</Typography>
                  <Typography variant="h6" sx={textStyle}>
                    {studentProfileData?.dateOfBirth
                      ? new Date(studentProfileData.dateOfBirth).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "-"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Religion</Typography>
                  <Typography variant="h6" sx={textStyle}>
                    {studentProfileData?.religion ?? "-"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Student Email</Typography>
                  <Typography variant="h6" sx={textStyle}>
                    {studentProfileData?.studentEmail ?? "-"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Phone Number</Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      size="small"
                      inputProps={{
                        style: {
                          borderRadius: "8px",
                          height: "27px",
                        },
                      }}
                      value={editedFields.phoneNo ?? studentProfileData.phoneNo}
                      onChange={(e) =>
                        handleFieldChange("phoneNo", e.target.value)
                      }
                    />
                  ) : (
                    <Typography variant="h6" sx={textStyle}>
                      {studentProfileData?.phoneNo ?? "-"}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Curriculum</Typography>
                  <Typography variant="h6" sx={textStyle}>
                    {studentProfileData?.curriculum?.major} -
                    {studentProfileData?.curriculum?.year}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Area of Concentration</Typography>
                  {isEditMode ? (
                    <FormControl size="small" sx={{}} fullWidth>
                      <InputLabel shrink={false}>
                        {showLabelAreaOfConcentration ? "Select Option" : ""}
                      </InputLabel>
                      <Select
                        sx={{
                          padding: 0.5,
                        }}
                        value={
                          editedFields.areaOfConcentration ??
                          areaOfConcentration
                        }
                        onChange={(event) => {
                          handleFieldChange(
                            "areaOfConcentration",
                            event.target.value
                          );
                          setShowLabelAreaOfConcentration(false);
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: "37%",
                            },
                          },
                        }}
                      >
                        {areaOfConcentrationOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <Typography variant="h6" sx={textStyle}>
                      {studentProfileData?.areaOfConcentration ===
                      "OBJECT_PROGRAMMER"
                        ? "Object Programmer"
                        : studentProfileData?.areaOfConcentration ===
                          "COMPETITIVE_INTELEGENT_ANALYSIS"
                        ? "Competitive Intelligent Analysis"
                        : studentProfileData?.areaOfConcentration ===
                          "NETWORK_ADMINISTRATOR"
                        ? "Network Administrator"
                        : "-"}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Address</Typography>
                  <Typography variant="h6" sx={textStyle}>
                    {studentProfileData?.address ?? "-"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Current Residence Status</Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      size="small"
                      value={
                        editedFields.currentResidenceStatus ??
                        studentProfileData.currentResidenceStatus
                      }
                      inputProps={{
                        style: {
                          borderRadius: "8px",
                          height: "27.5px",
                        },
                      }}
                      onChange={(e) =>
                        handleFieldChange(
                          "currentResidenceStatus",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <Typography variant="h6" sx={textStyle}>
                      {studentProfileData?.currentResidenceStatus ?? "-"}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </AccordionDetails>

            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <FormControl
                component="fieldset"
                id="demo-controlled-radio-buttons-group"
              >
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={studentProfileData?.status}
                  onChange={handleChangeStatus}
                >
                  <FormControlLabel
                    value="ACTIVE"
                    control={<Radio />}
                    label="Active"
                    sx={{ marginLeft: "3px" }}
                  />
                  <FormControlLabel
                    value="INACTIVE"
                    control={<Radio />}
                    label="Inactive"
                  />
                </RadioGroup>
                <Modal
                  open={openFirstModal}
                  onClose={() => setOpenFirstModal(false)}
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
                        paddingTop: 2,
                      }}
                    >
                      Change Student Status?
                    </Typography>
                    <Typography
                      id="modal-modal-description"
                      style={{ marginTop: "16px", marginBottom: "20px" }}
                    >
                      Are you sure you want to change student status?
                    </Typography>

                    <Grid container spacing={1} justifyContent="flex-end">
                      <Grid item>
                        <Button
                          onClick={() => setOpenFirstModal(false)}
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
                          No
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={changeStatus}
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
              </FormControl>
            </Popover>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ backgroundColor: "#1A38601A" }}
            >
              <Typography fontWeight={500}>Parents / Guardians</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3} sx={{ padding: 2 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Full Name</Typography>
                  <Typography variant="h6" sx={textStyle}>
                    {studentProfileData?.guardianName ?? "-"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Family Relationship</Typography>
                  <Typography variant="h6" sx={textStyle}>
                    {studentProfileData?.familyRelation ?? "-"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Phone</Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      size="small"
                      value={
                        editedFields.guardianPhoneNo ??
                        studentProfileData.guardianPhoneNo
                      }
                      inputProps={{
                        style: {
                          borderRadius: "8px",
                          height: "27px",
                        },
                      }}
                      onChange={(e) =>
                        handleFieldChange("guardianPhoneNo", e.target.value)
                      }
                    />
                  ) : (
                    <Typography variant="h6" sx={textStyle}>
                      {studentProfileData?.guardianPhoneNo ?? "-"}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Email</Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      size="small"
                      value={
                        editedFields.guardianEmail ??
                        studentProfileData.guardianEmail
                      }
                      onChange={(e) =>
                        handleFieldChange("guardianEmail", e.target.value)
                      }
                      inputProps={{
                        style: {
                          borderRadius: "8px",
                          height: "27px",
                        },
                      }}
                    />
                  ) : (
                    <Typography variant="h6" sx={textStyle}>
                      {studentProfileData?.guardianEmail ?? "-"}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ backgroundColor: "#1A38601A" }}
            >
              <Typography fontWeight={500}>Academic Supervisor</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3} sx={{ padding: 2 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Full Name</Typography>
                  <Typography variant="h6" sx={textStyle}>
                    {advisorProfileData?.lastName !== undefined &&
                    advisorProfileData?.firstName !== undefined
                      ? `${advisorProfileData?.lastName}, ${advisorProfileData?.firstName}`
                      : "-"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Email</Typography>
                  <Typography variant="h6" sx={textStyle}>
                    {advisorProfileData?.email ?? "-"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Phone</Typography>
                  <Typography variant="h6" sx={textStyle}>
                    {advisorProfileData?.phoneNum ?? "-"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Address</Typography>
                  <Typography variant="h6" sx={textStyle}>
                    {advisorProfileData?.Address ?? "-"}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <SuccessOrError
            open={openErrorModal}
            handleClose={handleCloseErrorModal}
            title="Error Submission!"
            description="Error: Failed to submit your change. Please try again."
          />
        </Div>
      )}
    </>
  );
};

const getRole = () => {
  const filter = role.includes("KAPRODI")
    ? "kaprodi"
    : role.includes("DEKAN")
    ? "dekan"
    : role.includes("OPERATOR_FAKULTAS")
    ? "sekretaris"
    : "dosen-pembimbing";

  return filter;
};

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

export default StudentProfile;
