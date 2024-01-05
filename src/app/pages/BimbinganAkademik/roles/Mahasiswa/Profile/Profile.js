import Div from "@jumbo/shared/Div";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";

const StudentProfile = () => {
  const [advisorProfileData, setAdvisorProfileData] = useState([]);
  const [studentProfileData, setStudentProfileData] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { nim } = JSON.parse(localStorage.getItem("user"));
      const resultStudent = await axios.get(`${BASE_URL_API}/student/${nim}`);
      const result = await axios.get(
        `${BASE_URL_API}/employee/profile/${resultStudent.data.data.employeeNik}`
      );
      console.log(result);
      // console.log(resultStudent);
      setStudentProfileData(resultStudent.data.data);
      setAdvisorProfileData(result.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Div>
      <Typography
        sx={{ fontSize: "24px", fontWeight: 500, paddingBottom: "24px" }}
      >
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
                {`${studentProfileData?.lastName}, ${studentProfileData?.firstName}`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Gender</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.gender}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction={"row"} gap={1} justifyContent={"space-between"}>
                <Typography variant="h5">Student Status</Typography>
              </Stack>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.status}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">NIM</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.nim}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Registration Number</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.reg_num}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Date of Birth</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.dateOfBirth}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Religion</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.religion}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Blood Type</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.bloodType}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Marital Status</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.MaritalStatus}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Student Email</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.studentEmail}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Phone Number</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.phoneNo}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Curriculum</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.curriculumId}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Area of Concentration</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.AreaOfConcentration}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Previous High School</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.highSchoolGrad}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Address</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.address}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Current Address</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.currentAddress}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Current Residence Status</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.currentResidenceStatus}
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
          <Typography fontWeight={500}>Parents / Guardians</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3} sx={{ padding: 2 }}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Full Name</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.guardianName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Level of Education</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.guardianEducation}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Religion</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.guardianReligion}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Married Status</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.guardianStatus}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Family Relationship</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.familyRelation}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Email</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.guardianEmail}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Phone</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.guardianPhoneNo}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Address</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.guardianAddress}
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

const textStyle = {
  borderWidth: 1,
  borderColor: "#00000029",
  borderStyle: "solid",
  paddingX: "24px",
  paddingY: "13px",
  borderRadius: "8px",
};

export default StudentProfile;
