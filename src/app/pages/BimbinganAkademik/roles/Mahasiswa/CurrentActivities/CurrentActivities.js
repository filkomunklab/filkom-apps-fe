import React, { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  experimentalStyled as styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import { useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CurrentActivities = () => {
  const navigate = useNavigate();
  const controller = new AbortController();
  const signal = controller.signal;
  const [value, setValue] = useState(0);
  const [dataActivity, setDataActivity] = useState([]);
  const [dataConsultation, setDataConsultation] = useState([]);
  const [dataCertificate, setDataCertificate] = useState([]);
  const [dataPreregis, setDataPreregis] = useState([]);
  const [dataGrade, setDataGrade] = useState([]);

  useEffect(() => {
    const storedValue = localStorage.getItem("currentTabValue");
    if (storedValue !== null) {
      setValue(parseInt(storedValue));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentTabValue", value);
  }, [value]);

  const getCurrentActivities = async () => {
    try {
      const token = localStorage.getItem("token");
      //content-type dan Authorization liat di dokumentasi API atau postman
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const { nim } = JSON.parse(localStorage.getItem("user"));

      const resultActivity = await axios.get(
        `${BASE_URL_API}/activity/current/${nim}`,
        { signal }
      );

      const resultConsultation = await axios.get(
        `${BASE_URL_API}/academic-consultation/student/${nim}`
        // {  headers,}
      );

      const resultCertificate = await axios.get(
        `${BASE_URL_API}/certificate/current/student/${nim}`,
        { headers }
        // {  headers,}
      );

      const resultPreregis = await axios.get(
        `${BASE_URL_API}/pre-regist/list-for-student/${nim}`
        // {  headers,}
      );

      const resultGrade = await axios.get(
        `${BASE_URL_API}/transaction/student/currentGrades/${nim}`,
        { headers, signal }
      );
      console.log("result activity", resultActivity);
      const { status: activityStatus, data: activityData } =
        resultActivity.data;
      const { status: consultationStatus, data: consultationData } =
        resultConsultation.data;
      const { status: certificateStatus, data: certificateData } =
        resultCertificate.data;
      const { status: preregisStatus, data: preregisData } =
        resultPreregis.data;
      const { status: gradeStatus, data: gradeData } = resultGrade.data;

      if (activityStatus === "OK") {
        setDataActivity(
          activityData.filter((item) => item.type === "activity")
        );
      }

      if (consultationStatus === "OK") {
        const filteredConsultationData = consultationData.filter(
          (value) => value.status === "Waiting" || value.status === "OnProcess"
        );
        setDataConsultation(filteredConsultationData);
      } else {
        console.log("ini error resultConsultation", resultConsultation);
      }

      if (certificateStatus === "OK") {
        console.log(
          "ini isi response.data dalam status certificate woyyyyyy",
          certificateData
        );
        setDataCertificate(certificateData);
      } else {
        console.log(resultCertificate);
        console.log(resultCertificate.data);
      }

      if (preregisStatus === "OK") {
        const filteredPreregisData = preregisData.filter(
          (value) => value.status === "WAITING"
        );
        setDataPreregis(filteredPreregisData);
      } else {
        console.log(resultPreregis);
        console.log(resultPreregis.data);
      }

      if (gradeStatus === "OK") {
        console.log("ini isi response.data gradeData", gradeData);
        setDataGrade(gradeData);
      } else {
        console.log(resultGrade);
        console.log(resultGrade.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentActivities();
  }, []);

  const groupedDataActivity = {};
  const groupedDataConsultation = {};
  const groupedDataCertificate = {};
  const groupedDataPreregis = {};
  const groupedDataGrade = {};

  dataConsultation.forEach((value) => {
    const dateConsultation = new Date(value.createdAt).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
    if (!groupedDataConsultation[dateConsultation]) {
      groupedDataConsultation[dateConsultation] = [];
    }
    groupedDataConsultation[dateConsultation].push(value);
  });

  dataActivity.forEach((value) => {
    const date = new Date(value.createdAt).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    if (!groupedDataActivity[date]) {
      groupedDataActivity[date] = [];
    }
    groupedDataActivity[date].push(value);
  });

  dataCertificate.forEach((value) => {
    const date = new Date(value.Certificate.submitDate).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
    if (!groupedDataCertificate[date]) {
      groupedDataCertificate[date] = [];
    }
    groupedDataCertificate[date].push(value);
  });

  dataPreregis.forEach((value) => {
    const date = new Date(value.submitDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    if (!groupedDataPreregis[date]) {
      groupedDataPreregis[date] = [];
    }
    groupedDataPreregis[date].push(value);
  });

  dataGrade.forEach((value) => {
    const date = new Date(value.submitedDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    if (!groupedDataGrade[date]) {
      groupedDataGrade[date] = [];
    }
    groupedDataGrade[date].push(value);
  });

  const formatDate = (date) => {
    const currentDate = new Date();
    const formattedDate = new Date(date);

    if (formattedDate.toDateString() === currentDate.toDateString()) {
      return "Today";
    } else if (
      formattedDate.toDateString() ===
      new Date(currentDate - 1 * 24 * 60 * 60 * 1000).toDateString()
    ) {
      return "Yesterday";
    } else {
      return formattedDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  const handleNavigateActivity = async (value) => {
    try {
      const response = await axios.get(
        `${BASE_URL_API}/activity/detail/${value}`,
        { signal }
      );
      const { status, data } = response.data;
      console.log("response navigate activity", response);
      const path = "/bimbingan-akademik/current-activities/activity";

      if (status === "OK") {
        navigate("/bimbingan-akademik/current-activities/activity", {
          state: {
            activityDetails: {
              activityMember: data.ActivityMember,
              activityType: data.activityType,
              createdAt: data.createdAt,
              description: data.description,
              dueDate: data.dueDate,
              isAttendance: data.isAttendance,
              title: data.title,
            },
          },
        });
      }
    } catch (error) {
      console.log("error navigate activity", error);
    }
  };

  const handleNavigateConsultation = async (value) => {
    try {
      const consultationDetailsResult = await axios.get(
        `${BASE_URL_API}/academic-consultation/detail/${value.id}`
      );
      console.log("ini detail Consutation result:", consultationDetailsResult);
      let path = "/bimbingan-akademik/current-activities/consultation/";

      navigate(`${path}${value.id}`, {
        state: {
          consultationDetails: {
            studentName: consultationDetailsResult.data.data.student_name,
            supervisorName: consultationDetailsResult.data.data.supervisor_name,
            studentMajor: consultationDetailsResult.data.data.student_major,
            studentArrivalYear:
              consultationDetailsResult.data.data.student_arrival_year,
            topic: consultationDetailsResult.data.data.topic,
            receiverName: consultationDetailsResult.data.data.receiver_name,
            description: consultationDetailsResult.data.data.description,
            id: consultationDetailsResult.data.data.id,
          },
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNavigateCertificate = async (value) => {
    try {
      const certificateDetailsResult = await jwtAuthAxios.get(
        `/certificate/student/${value.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      let pathh = "/bimbingan-akademik/current-activities/certificate/";

      const {
        student,
        submitDate,
        path,
        category,
        description,
        approval_status,
        title,
        id,
      } = certificateDetailsResult.data.data;
      navigate(
        `${pathh}${value.id}`,
        {
          state: {
            certificateDetails: {
              firstName: student.firstName,
              lastName: student.lastName,
              SupervisorFirstName:
                student.GuidanceClassMember.gudianceClass.teacher.firstName,
              SupervisorLastName:
                student.GuidanceClassMember.gudianceClass.teacher.lastName,
              submissionDate: submitDate,
              pathFile: path,
              category: category,
              description: description,
              status: approval_status,
              title: title,
              id: id,
            },
          },
        },
        console.log("ini pathFile", path)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNavigatePreregis = async (value) => {
    try {
      const preregisDetailsResult = await axios.get(
        `${BASE_URL_API}/pre-regist/details/${value.id}`
      );
      const detail = preregisDetailsResult.data.data;
      let path = "/bimbingan-akademik/current-activities/pre-registration/";

      navigate(`${path}${value.id}`, {
        state: {
          preregisDetails: {
            id: detail.id,
            studentName:
              detail.Student.lastName + ", " + detail.Student.firstName,
            supervisorName:
              detail.Employee.lastName + ", " + detail.Employee.firstName,
            submitDate: detail.submitDate,
            status: detail.status,
            listSubjectPreregis: detail.ListOfRequest,
          },
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNavigateGrade = async (value) => {
    try {
      const gradeDetailsResult = await jwtAuthAxios.get(
        `/transaction/submissionDetail/${value.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const detail = gradeDetailsResult.data.data;
      let path = "/bimbingan-akademik/current-activities/grade/";
      console.log("isi detail", detail);
      navigate(`${path}${value.id}`, {
        state: {
          gradeDetails: {
            studentName:
              detail.Student.lastName + ", " + detail.Student.firstName,
            supervisorName:
              detail.Student.GuidanceClassMember.gudianceClass.teacher
                .lastName +
              ", " +
              detail.Student.GuidanceClassMember.gudianceClass.teacher
                .firstName,
            submitedDate: detail.submitedDate,
            status: detail.status,
            semester: detail.semester,
            grades: detail.Grades,
          },
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Typography
        sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: 500 }}
      >
        Current Activities
      </Typography>
      <Typography
        sx={{
          paddingTop: "22px",
          paddingBottom: "32px",
          fontSize: { xs: "14px", md: "15px" },
          fontWeight: 400,
          color: "rgba(27, 43, 65, 0.69)",
          textAlign: "justify",
        }}
      >
        Currently, you are on the Current Activities page. On this page, you can
        view information about Pre-registration, Certificates, Grades, and
        Consultations that you have created which are still ongoing or awaiting
        approval.
      </Typography>

      <div sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          onChange={(event, newValue) => setValue(newValue)}
        >
          <Tab label="Activity" {...a11yProps(0)} />
          <Tab label="Pre-registration" {...a11yProps(1)} />
          <Tab label="Certificate" {...a11yProps(2)} />
          <Tab label="Grade" {...a11yProps(3)} />
          <Tab label="Consultation" {...a11yProps(4)} />
        </Tabs>
      </div>

      <TabPanel value={value} index={0}>
        <div>
          <Typography sx={{ padding: "10px" }}></Typography>

          {dataActivity.length === 0 ? (
            <Box
              sx={{
                height: "50px",
                backgroundColor: "rgba(235, 235, 235, 1)",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
              }}
            >
              <Typography
                sx={{ color: "rgba(0, 0, 0, 1)", paddingLeft: "25px" }}
              >
                You don't have any current actvities
              </Typography>
            </Box>
          ) : (
            Object.entries(groupedDataActivity).map(([date, dataActivity]) => (
              <div key={date}>
                <Box
                  sx={{
                    height: "50px",
                    backgroundColor: "rgba(235, 235, 235, 1)",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "10px",
                  }}
                >
                  <Typography
                    sx={{ color: "rgba(0, 0, 0, 1)", paddingLeft: "25px" }}
                  >
                    {formatDate(date)}
                  </Typography>
                </Box>
                {dataActivity &&
                  dataActivity.map((value, index) => (
                    <List
                      key={index}
                      sx={{
                        width: "100%",
                        maxWidth: 2000,
                        bgcolor: "background.paper",
                        paddingTop: "0px",
                        paddingBottom: "0px",
                        ":hover": {
                          cursor: "pointer",
                          backgroundColor: "#338CFF21",
                          transition: "0.3s",
                          transitionTimingFunction: "ease-in-out",
                          transitionDelay: "0s",
                          transitionProperty: "all",
                        },
                      }}
                    >
                      <ListItem
                        sx={{ padding: "10px 50px" }}
                        onClick={() => {
                          handleNavigateActivity(value.id);
                          // console.log("ini isi dari value preregis: ", value);
                        }}
                      >
                        <ListItemText
                          primary={
                            <Chip
                              size={"small"}
                              label={"Activity"}
                              sx={{
                                backgroundColor: "rgba(0, 106, 245, 0.1)",
                                color: "rgba(0, 95, 219, 1)",
                              }}
                            />
                          }
                          secondary={
                            <>
                              <Typography
                                sx={{
                                  color: "rgba(0, 0, 0, 1)",
                                  paddingLeft: "8px",
                                  paddingTop: "5px",
                                  fontSize: { xs: "12px", md: "14px" },
                                }}
                              >
                                {value.title}
                              </Typography>
                              <Typography
                                sx={{
                                  paddingLeft: "8px",
                                  fontSize: { xs: "12px", md: "14px" },
                                }}
                              >
                                {value.description}
                              </Typography>
                            </>
                          }
                        />
                        <Box
                          sx={{
                            marginLeft: { xs: "auto", md: 0 },
                            textAlign: "right",
                          }}
                        >
                          <ListItemText
                            secondary={
                              <Typography
                                sx={{
                                  fontSize: { xs: "10px", md: "14px" },
                                  color: "rgba(27, 43, 65, 0.69)",
                                }}
                              >
                                {new Date(value.createdAt).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  }
                                )}
                              </Typography>
                            }
                          />
                        </Box>
                      </ListItem>
                      <Divider component="li" />
                    </List>
                  ))}
              </div>
              // <div>activity</div>
            ))
          )}
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div>
          <Typography sx={{ padding: "10px" }}></Typography>

          {dataPreregis.length === 0 ? (
            <Box
              sx={{
                height: "50px",
                backgroundColor: "rgba(235, 235, 235, 1)",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
              }}
            >
              <Typography
                sx={{ color: "rgba(0, 0, 0, 1)", paddingLeft: "25px" }}
              >
                You don't have any current pre-registration
              </Typography>
            </Box>
          ) : (
            Object.entries(groupedDataPreregis).map(([date, dataPreregis]) => (
              <div key={date}>
                <Box
                  sx={{
                    height: "50px",
                    backgroundColor: "rgba(235, 235, 235, 1)",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "10px",
                  }}
                >
                  <Typography
                    sx={{ color: "rgba(0, 0, 0, 1)", paddingLeft: "25px" }}
                  >
                    {formatDate(date)}
                  </Typography>
                </Box>
                {dataPreregis &&
                  dataPreregis.map((value, index) => (
                    <List
                      key={index}
                      sx={{
                        width: "100%",
                        maxWidth: 2000,
                        bgcolor: "background.paper",
                        paddingTop: "0px",
                        paddingBottom: "0px",
                        ":hover": {
                          cursor: "pointer",
                          backgroundColor: "#338CFF21",
                          transition: "0.3s",
                          transitionTimingFunction: "ease-in-out",
                          transitionDelay: "0s",
                          transitionProperty: "all",
                        },
                      }}
                    >
                      <ListItem
                        sx={{ padding: "10px 50px" }}
                        onClick={() => {
                          handleNavigatePreregis(value);
                          // console.log("ini isi dari value preregis: ", value);
                        }}
                      >
                        <ListItemText
                          primary={
                            <Chip
                              size={"small"}
                              label={"Pre-registration"}
                              sx={{
                                backgroundColor: "rgba(21, 131, 67, 0.1)",
                                color: "rgba(21, 131, 67, 1)",
                              }}
                            />
                          }
                          secondary={
                            <>
                              <Typography
                                sx={{
                                  color: "rgba(0, 0, 0, 1)",
                                  paddingLeft: "8px",
                                  paddingTop: "5px",
                                  fontSize: { xs: "12px", md: "14px" },
                                }}
                              >
                                {value.Student.lastName},{" "}
                                {value.Student.firstName}
                              </Typography>
                              <Typography
                                sx={{
                                  paddingLeft: "8px",
                                  fontSize: { xs: "12px", md: "14px" },
                                }}
                              >
                                Preregistration Semester Genap/Ganjil tahun
                                ajaran 2023/2024
                              </Typography>
                            </>
                          }
                        />
                        <Box
                          sx={{
                            marginLeft: { xs: "auto", md: 0 },
                            textAlign: "right",
                          }}
                        >
                          <ListItemText
                            secondary={
                              <Typography
                                sx={{
                                  fontSize: { xs: "10px", md: "14px" },
                                  color: "rgba(27, 43, 65, 0.69)",
                                }}
                              >
                                {new Date(value.submitDate).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  }
                                )}
                              </Typography>
                            }
                          />
                        </Box>
                      </ListItem>
                      <Divider component="li" />
                    </List>
                  ))}
              </div>
            ))
          )}
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <div>
          <Typography sx={{ padding: "10px" }}></Typography>
          {dataCertificate.length === 0 ? (
            <Box
              sx={{
                height: "50px",
                backgroundColor: "rgba(235, 235, 235, 1)",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
              }}
            >
              <Typography
                sx={{ color: "rgba(0, 0, 0, 1)", paddingLeft: "25px" }}
              >
                You don't have any current certificate
              </Typography>
            </Box>
          ) : (
            Object.entries(groupedDataCertificate).map(
              ([date, dataCertificate]) => (
                <div key={date}>
                  <Box
                    sx={{
                      height: "50px",
                      backgroundColor: "rgba(235, 235, 235, 1)",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "10px",
                    }}
                  >
                    <Typography
                      sx={{ color: "rgba(0, 0, 0, 1)", paddingLeft: "25px" }}
                    >
                      {formatDate(date)}
                    </Typography>
                  </Box>
                  {dataCertificate &&
                    dataCertificate.map((value, index) => (
                      <List
                        sx={{
                          width: "100%",
                          maxWidth: 2000,
                          bgcolor: "background.paper",
                          paddingTop: "0px",
                          paddingBottom: "0px",
                          ":hover": {
                            cursor: "pointer",
                            backgroundColor: "#338CFF21",
                            transition: "0.3s",
                            transitionTimingFunction: "ease-in-out",
                            transitionDelay: "0s",
                            transitionProperty: "all",
                          },
                        }}
                      >
                        <ListItem
                          sx={{ padding: "10px 50px" }}
                          onClick={() => {
                            handleNavigateCertificate(value);
                            // console.log("ini isi dari value certi: ", value);
                          }}
                        >
                          <ListItemText
                            primary={
                              <Chip
                                size={"small"}
                                label={"Certificate"}
                                sx={{
                                  backgroundColor: "rgba(255, 204, 0, 0.1)",
                                  color: "rgba(152, 82, 17, 1)",
                                }}
                              />
                            }
                            secondary={
                              <>
                                <Typography
                                  sx={{
                                    color: "rgba(0, 0, 0, 1)",
                                    paddingLeft: "8px",
                                    paddingTop: "5px",
                                    fontSize: { xs: "12px", md: "14px" },
                                  }}
                                >
                                  {value.student.lastName},{" "}
                                  {value.student.firstName}
                                </Typography>
                                <Typography
                                  sx={{
                                    paddingLeft: "8px",
                                    fontSize: { xs: "12px", md: "14px" },
                                  }}
                                >
                                  {value.Certificate.title}
                                </Typography>
                              </>
                            }
                          />
                          <Box
                            sx={{
                              marginLeft: { xs: "auto", md: 0 },
                              textAlign: "right",
                            }}
                          >
                            <ListItemText
                              secondary={
                                <Typography
                                  sx={{
                                    fontSize: { xs: "10px", md: "14px" },
                                    color: "rgba(27, 43, 65, 0.69)",
                                  }}
                                >
                                  {new Date(
                                    value.Certificate.submitDate
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  })}
                                </Typography>
                              }
                            />
                          </Box>
                        </ListItem>
                        <Divider component="li" />
                      </List>
                    ))}
                </div>
              )
            )
          )}
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <div>
          <Typography sx={{ padding: "10px" }}></Typography>
          {dataGrade.length === 0 ? (
            <Box
              sx={{
                height: "50px",
                backgroundColor: "rgba(235, 235, 235, 1)",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
              }}
            >
              <Typography
                sx={{ color: "rgba(0, 0, 0, 1)", paddingLeft: "25px" }}
              >
                You don't have any current grade
              </Typography>
            </Box>
          ) : (
            Object.entries(groupedDataGrade).map(([date, dataGrade]) => (
              <div key={date}>
                <Box
                  sx={{
                    height: "50px",
                    backgroundColor: "rgba(235, 235, 235, 1)",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "10px",
                  }}
                >
                  <Typography
                    sx={{ color: "rgba(0, 0, 0, 1)", paddingLeft: "25px" }}
                  >
                    {formatDate(date)}
                  </Typography>
                </Box>
                {dataGrade &&
                  dataGrade.map((value, index) => (
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 2000,
                        bgcolor: "background.paper",
                        paddingTop: "0px",
                        paddingBottom: "0px",
                        ":hover": {
                          cursor: "pointer",
                          backgroundColor: "#338CFF21",
                          transition: "0.3s",
                          transitionTimingFunction: "ease-in-out",
                          transitionDelay: "0s",
                          transitionProperty: "all",
                        },
                      }}
                    >
                      <ListItem
                        sx={{ padding: "10px 50px" }}
                        onClick={() => {
                          handleNavigateGrade(value);
                        }}
                      >
                        <ListItemText
                          primary={
                            <Chip
                              size={"small"}
                              label={"Grade"}
                              sx={{
                                backgroundColor: "rgba(101, 10, 204, 0.1)",
                                color: "rgba(101, 10, 204, 1)",
                              }}
                            />
                          }
                          secondary={
                            <>
                              <Typography
                                sx={{
                                  color: "rgba(0, 0, 0, 1)",
                                  paddingLeft: "8px",
                                  paddingTop: "5px",
                                  fontSize: { xs: "12px", md: "14px" },
                                }}
                              >
                                {value.Student.lastName},{" "}
                                {value.Student.firstName}
                              </Typography>
                              <Typography
                                sx={{
                                  paddingLeft: "8px",
                                  fontSize: { xs: "12px", md: "14px" },
                                }}
                              >
                                {value.semester}
                              </Typography>
                            </>
                          }
                        />
                        <Box
                          sx={{
                            marginLeft: { xs: "auto", md: 0 },
                            textAlign: "right",
                          }}
                        >
                          <ListItemText
                            secondary={
                              <Typography
                                sx={{
                                  fontSize: { xs: "10px", md: "14px" },
                                  color: "rgba(27, 43, 65, 0.69)",
                                }}
                              >
                                {new Date(
                                  value.submitedDate
                                ).toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                })}
                              </Typography>
                            }
                          />
                        </Box>
                      </ListItem>
                      <Divider component="li" />
                    </List>
                  ))}
              </div>
            ))
          )}
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>

      <TabPanel value={value} index={4}>
        <div>
          <Typography sx={{ padding: "10px" }}></Typography>
          {dataConsultation.length === 0 ? (
            <Box
              sx={{
                height: "50px",
                backgroundColor: "rgba(235, 235, 235, 1)",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
              }}
            >
              <Typography
                sx={{ color: "rgba(0, 0, 0, 1)", paddingLeft: "25px" }}
              >
                You don't have any current consultation
              </Typography>
            </Box>
          ) : (
            Object.entries(groupedDataConsultation).map(
              ([dateConsultation, dataConsultation]) => (
                <div key={dateConsultation}>
                  <Box
                    sx={{
                      height: "50px",
                      backgroundColor: "rgba(235, 235, 235, 1)",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "10px",
                    }}
                  >
                    <Typography
                      sx={{ color: "rgba(0, 0, 0, 1)", paddingLeft: "25px" }}
                    >
                      {formatDate(dateConsultation)}
                    </Typography>
                  </Box>
                  {dataConsultation &&
                    dataConsultation.map((value, index) =>
                      value.status === "Waiting" ||
                      value.status === "OnProcess" ? (
                        <List
                          sx={{
                            width: "100%",
                            maxWidth: 2000,
                            bgcolor: "background.paper",
                            paddingTop: "0px",
                            paddingBottom: "0px",
                            ":hover": {
                              cursor: "pointer",
                              backgroundColor: "#338CFF21",
                              transition: "0.3s",
                              transitionTimingFunction: "ease-in-out",
                              transitionDelay: "0s",
                              transitionProperty: "all",
                            },
                          }}
                        >
                          <ListItem
                            sx={{ padding: "10px 50px" }}
                            onClick={() => {
                              handleNavigateConsultation(value);
                              // console.log("ini isi dari value: ", value);
                            }}
                          >
                            <ListItemText
                              primary={
                                <Chip
                                  size={"small"}
                                  label={"Consultation"}
                                  sx={{
                                    backgroundColor: "rgba(223, 11, 146, 0.1)",
                                    color: "rgba(223, 11, 146, 1)",
                                  }}
                                />
                              }
                              secondary={
                                <>
                                  <Typography
                                    sx={{
                                      color: "rgba(0, 0, 0, 1)",
                                      paddingLeft: "8px",
                                      paddingTop: "5px",
                                      fontSize: { xs: "12px", md: "14px" },
                                    }}
                                  >
                                    To {value.receiver_name}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      paddingLeft: "8px",
                                      fontSize: { xs: "12px", md: "14px" },
                                    }}
                                  >
                                    {value.topic === "others" && "Others"}
                                    {value.topic === "academic" && "Academic"}
                                    {value.topic === "non-academic" &&
                                      "Non-Academic"}
                                    {value.status && ` - ${value.status}`}
                                  </Typography>
                                </>
                              }
                            />
                            <Box
                              sx={{
                                marginLeft: { xs: "auto", md: 0 },
                                textAlign: "right",
                              }}
                            >
                              <ListItemText
                                secondary={
                                  <Typography
                                    sx={{
                                      fontSize: { xs: "10px", md: "14px" },
                                      color: "rgba(27, 43, 65, 0.69)",
                                    }}
                                  >
                                    {new Date(
                                      value.createdAt
                                    ).toLocaleTimeString("en-US", {
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                    })}
                                  </Typography>
                                }
                              />
                            </Box>
                          </ListItem>
                          <Divider component="li" />
                        </List>
                      ) : (
                        ""
                      )
                    )}
                </div>
              )
            )
          )}
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>
    </div>
  );
};

export default CurrentActivities;
