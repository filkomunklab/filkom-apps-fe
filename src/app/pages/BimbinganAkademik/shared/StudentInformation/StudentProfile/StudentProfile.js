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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import { useLocation, useNavigate } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const role = JSON.parse(localStorage.getItem("user")).role;

const StudentProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const controller = new AbortController();
  const signal = controller.signal;
  const { studentNim } = location.state || "-";
  const [advisorProfileData, setAdvisorProfileData] = useState([]);
  const [studentProfileData, setStudentProfileData] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState("Active");

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const replaceNull = (data) => {
    const result = {};

    for (const key in data) {
      result[key] = data[key] !== null ? data[key] : "-";
    }

    return result;
  };

  const {
    firstName,
    lastName,
    gender,
    // status,
    nim,
    reg_num,
    dateOfBirth,
    religion,
    bloodType,
    MaritalStatus,
    studentEmail,
    phoneNo,
    curriculumId,
    AreaOfConcentration,
    highSchoolGrad,
    address,
    currentAddress,
    currentResidenceStatus,
    guardianName,
    guardianEducation,
    guardianReligion,
    guardianStatus,
    familyRelation,
    guardianEmail,
    guardianPhoneNo,
    guardianAddress,
  } = replaceNull(studentProfileData);

  const getProfile = async () => {
    try {
      const { guidanceClassId } = JSON.parse(localStorage.getItem("user"));
      console.log("ini role", role);
      const result = await axios.get(`${BASE_URL_API}/student/${studentNim}`, {
        signal,
      });
      const resultAdvisor = await axios.get(
        `${BASE_URL_API}/guidance-class/${guidanceClassId}`,
        { signal }
      );
      console.log("testt", result, resultAdvisor);

      setStudentProfileData(result.data.data);
      setAdvisorProfileData(resultAdvisor.data.data.teacher);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    navigate(
      `/bimbingan-akademik/${getRole()}/student-information${
        getRole() !== "dosen-pembimbing" ? "/faculty-student" : ""
      }`
    );
  };

  return (
    <Div>
      <Breadcrumbs aria-label="breadcrumb" onClick={handleClick}>
        <StyledLink>Student Information</StyledLink>
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
                <Typography>Photo</Typography>
              </Div>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Full Name</Typography>
              <Typography variant="h6" sx={textStyle}>
                {`${lastName}, ${firstName}`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Gender</Typography>
              <Typography variant="h6" sx={textStyle}>
                {gender}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction={"row"} gap={1} justifyContent={"space-between"}>
                <Typography variant="h5">Student Status</Typography>
                <IconButton size="small" onClick={handleOpenPopover}>
                  <BorderColorIcon fontSize="inherit" />
                </IconButton>
              </Stack>
              <Typography variant="h6" sx={textStyle}>
                {status}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">NIM</Typography>
              <Typography variant="h6" sx={textStyle}>
                {nim}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Registration Number</Typography>
              <Typography variant="h6" sx={textStyle}>
                {reg_num}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Date of Birth</Typography>
              <Typography variant="h6" sx={textStyle}>
                {dateOfBirth}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Religion</Typography>
              <Typography variant="h6" sx={textStyle}>
                {religion}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Blood Type</Typography>
              <Typography variant="h6" sx={textStyle}>
                {bloodType}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Marital Status</Typography>
              <Typography variant="h6" sx={textStyle}>
                {MaritalStatus}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Student Email</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentEmail}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Phone Number</Typography>
              <Typography variant="h6" sx={textStyle}>
                {phoneNo}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Curriculum</Typography>
              <Typography variant="h6" sx={textStyle}>
                {curriculumId}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Area of Concentration</Typography>
              <Typography variant="h6" sx={textStyle}>
                {AreaOfConcentration}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Previous High School</Typography>
              <Typography variant="h6" sx={textStyle}>
                {highSchoolGrad}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Address</Typography>
              <Typography variant="h6" sx={textStyle}>
                {address}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Current Address</Typography>
              <Typography variant="h6" sx={textStyle}>
                {currentAddress}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Current Residence Status</Typography>
              <Typography variant="h6" sx={textStyle}>
                {currentResidenceStatus}
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
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="status"
              name="status"
              value={status}
              onChange={handleStatusChange}
            >
              <FormControlLabel
                value="Active"
                control={<Radio />}
                label="Active"
                sx={{ marginLeft: "3px" }}
              />
              <FormControlLabel
                value="Inactive"
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
                {guardianName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Level of Education</Typography>
              <Typography variant="h6" sx={textStyle}>
                {guardianEducation}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Religion</Typography>
              <Typography variant="h6" sx={textStyle}>
                {guardianReligion}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Married Status</Typography>
              <Typography variant="h6" sx={textStyle}>
                {guardianStatus}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Family Relationship</Typography>
              <Typography variant="h6" sx={textStyle}>
                {familyRelation}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Email</Typography>
              <Typography variant="h6" sx={textStyle}>
                {guardianEmail}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Phone</Typography>
              <Typography variant="h6" sx={textStyle}>
                {guardianPhoneNo}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Address</Typography>
              <Typography variant="h6" sx={textStyle}>
                {guardianAddress}
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
          <Typography fontWeight={500}>Academic Advisor</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3} sx={{ padding: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Full Name</Typography>
              <Typography variant="h6" sx={textStyle}>
                {`${advisorProfileData?.lastName}, ${advisorProfileData?.firstName}`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">NIDN</Typography>
              <Typography variant="h6" sx={textStyle}>
                {advisorProfileData?.nidn}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Email</Typography>
              <Typography variant="h6" sx={textStyle}>
                {advisorProfileData?.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Phone</Typography>
              <Typography variant="h6" sx={textStyle}>
                {advisorProfileData?.phoneNum}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Address</Typography>
              <Typography variant="h6" sx={textStyle}>
                {advisorProfileData?.Address}
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
