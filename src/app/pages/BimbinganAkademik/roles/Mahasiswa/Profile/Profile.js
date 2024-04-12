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
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { useNavigate } from "react-router-dom";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";
import Swal from "sweetalert2";

const StudentProfile = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const [studentProfileData, setStudentProfileData] = useState([]);
  const [advisorProfileData, setAdvisorProfileData] = useState([]);

  const getProfile = async () => {
    try {
      const { id } = JSON.parse(localStorage.getItem("user"));
      const resultStudent = await jwtAuthAxios.get(
        `/student/view/biodata/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      setStudentProfileData(resultStudent.data.data);
      setAdvisorProfileData(
        resultStudent.data.data.GuidanceClassMember.gudianceClass.teacher
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
        const blueTheme = {
          confirmButtonColor: "#007BFF",
        };
        Swal.fire({
          icon: "info",
          title: "Please Sign In Again",
          text: "You have successfully completed the data. Now, please sign in again.",
          ...blueTheme,
        });
        navigate("/login");
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
                {studentProfileData?.path ? (
                  <img
                    id="displayImage"
                    src={studentProfileData?.path}
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
                {studentProfileData?.lastName
                  ? `${studentProfileData.lastName}, ${studentProfileData.firstName}`
                  : "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Gender</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.gender || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction={"row"} gap={1} justifyContent={"space-between"}>
                <Typography variant="h5">Student Status</Typography>
              </Stack>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.status || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">NIM</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.nim || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Registration Number</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.reg_num || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Student Email</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.studentEmail || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Major</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.major === "IF"
                  ? "Informatics"
                  : studentProfileData?.major === "SI"
                  ? "Information System"
                  : studentProfileData?.major === "DKV"
                  ? "Information Technology"
                  : "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Curriculum</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.curriculum
                  ? `${studentProfileData?.curriculum.major} - ${studentProfileData?.curriculum.year}`
                  : "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Area of Concentration</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.areaOfConcentration === "OBJECT_PROGRAMMER"
                  ? "Object Programmer"
                  : studentProfileData?.areaOfConcentration ===
                    "COMPETITIVE_INTELEGENT_ANALYSIS"
                  ? "Competitive Intelligent Analysis"
                  : studentProfileData?.areaOfConcentration ===
                    "NETWORK_ADMINISTRATOR"
                  ? "Network Administrator"
                  : "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Date of Birth</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.dateOfBirth
                  ? new Date(studentProfileData?.dateOfBirth).toLocaleString(
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
                {studentProfileData?.religion || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Phone Number</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.phoneNo || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Current Residence Status</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.currentResidenceStatus || "-"}
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
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Full Name</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.guardianName || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Family Relationship</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.familyRelation || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Phone</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.guardianPhoneNo || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Email</Typography>
              <Typography variant="h6" sx={textStyle}>
                {studentProfileData?.guardianEmail || "-"}
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
                {advisorProfileData?.lastName
                  ? `${advisorProfileData.lastName}, ${advisorProfileData.firstName}`
                  : "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Email</Typography>
              <Typography variant="h6" sx={textStyle}>
                {advisorProfileData?.email || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Phone</Typography>
              <Typography variant="h6" sx={textStyle}>
                {advisorProfileData?.phoneNum || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Address</Typography>
              <Typography variant="h6" sx={textStyle}>
                {advisorProfileData?.Address || "-"}
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
