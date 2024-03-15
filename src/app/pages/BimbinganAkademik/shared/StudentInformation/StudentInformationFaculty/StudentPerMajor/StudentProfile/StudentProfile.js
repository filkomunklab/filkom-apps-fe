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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const role = Boolean(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).role
  : [];

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
  const [isLoading, setIsLoading] = useState(false);
  const dosenGuidanceClass = JSON.parse(
    localStorage.getItem("user")
  ).guidanceClassId;

  const getProfile = async () => {
    try {
      const resultStudent = await jwtAuthAxios.get(
        `/student/view/biodata/${studentId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      console.log("ini isi student", resultStudent);
      setStudentProfileData(resultStudent.data.data);
      setAdvisorProfileData(
        resultStudent.data.data.GuidanceClassMember?.gudianceClass?.teacher
      );
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
        console.log("ini error: ", error);
        return;
      }
    }
  };

  const changeStatus = async (value) => {
    try {
      setIsLoading(true);
      handleClosePopover();
      const response = await jwtAuthAxios.patch(
        `/employee/biodataStudent/status/${studentNim}`,
        { status: value },
        {
          signal,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const { status, data } = response.data;
      if (status === "OK") {
        getProfile();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
        return;
      }
    }
  };

  useEffect(() => {
    getProfile();
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

  return (
    <Div>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
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
            : major === "DKV"
            ? "Information Technology"
            : "-"}{" "}
          Students List
        </StyledLink>
        <Typography color="text.primary">Student Profile</Typography>
      </Breadcrumbs>
      <Typography sx={{ fontSize: "24px", fontWeight: 500, paddingY: "20px" }}>
        Student Profile
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
              <Stack direction={"row"} gap={1} justifyContent={"space-between"}>
                <Typography variant="h5">Student Status</Typography>
                {console.log("dosenGuidanceClass", dosenGuidanceClass)}
                {console.log(
                  "studentGuidanceClass",
                  studentProfileData?.GuidanceClassMember?.gudianceClass?.id
                )}
                {dosenGuidanceClass ===
                  studentProfileData?.GuidanceClassMember?.gudianceClass
                    ?.id && (
                  <IconButton size="small" onClick={handleOpenPopover}>
                    <BorderColorIcon fontSize="inherit" />
                  </IconButton>
                )}
              </Stack>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.status ?? "-"}
              </Typography>
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
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.phoneNo ?? "-"}
              </Typography>
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
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.AreaOfConcentration === "OBJECT_PROGRAMMER"
                  ? "Object Programmer"
                  : studentProfileData?.AreaOfConcentration ===
                    "COMPETITIVE_INTELEGENT_ANALYSIS"
                  ? "Competitive Intelligent Analysis"
                  : studentProfileData?.AreaOfConcentration ===
                    "NETWORK_ADMINISTRATOR"
                  ? "Network Administrator"
                  : "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Address</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.address ?? "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Current Residence Status</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.currentResidenceStatus ?? "-"}
              </Typography>
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
              onChange={(e) => changeStatus(e.target.value)}
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
            <Grid item xs={12} md={12}>
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
              <Typography variant="h5">Email</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.guardianEmail ?? "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Phone</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.guardianPhoneNo ?? "-"}
              </Typography>
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
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Address</Typography>
              <Typography variant="h6" sx={textStyle}>
                {advisorProfileData?.Address ?? "-"}
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Div>
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

const textStyle = {
  borderWidth: 1,
  borderColor: "#00000029",
  borderStyle: "solid",
  paddingX: "24px",
  paddingY: "13px",
  borderRadius: "8px",
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
