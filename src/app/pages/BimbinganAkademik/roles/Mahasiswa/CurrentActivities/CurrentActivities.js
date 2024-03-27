import React, { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Divider,
  experimentalStyled as styled,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

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
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  //get data
  const [dataActivity, setDataActivity] = useState([]);
  const [dataConsultation, setDataConsultation] = useState([]);
  const [dataCertificate, setDataCertificate] = useState([]);
  const [dataPreregis, setDataPreregis] = useState([]);
  const [dataGrade, setDataGrade] = useState([]);

  //set tab value
  const [value, setValue] = useState(0);

  //useEffect untuk tab
  useEffect(() => {
    const storedValue = localStorage.getItem("currentTabValue");
    if (storedValue !== null) {
      setValue(parseInt(storedValue));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("currentTabValue", value);
  }, [value]);

  //handle error
  const handleError = (error) => {
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
    }
  };

  //get current activities
  const getCurrentActivities = async () => {
    try {
      const { id } = JSON.parse(localStorage.getItem("user"));

      const resultActivity = await jwtAuthAxios.get(`/activity/current/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });

      const resultConsultation = await jwtAuthAxios.get(
        `/academic-consultation/student/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      const resultCertificate = await jwtAuthAxios.get(
        `/certificate/current/student/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      const resultPreregis = await jwtAuthAxios.get(
        `/pre-regist/current/student/${id}`
      );

      const resultGrade = await jwtAuthAxios.get(
        `/transaction/student/currentGrades/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

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
      } else {
        console.error("Error in activityStatus: ", activityStatus);
      }

      if (consultationStatus === "OK") {
        setDataConsultation(
          consultationData.filter(
            (value) =>
              value.status === "Waiting" || value.status === "OnProcess"
          )
        );
      } else {
        console.error("Error in consultationStatus: ", consultationStatus);
      }

      if (certificateStatus === "OK") {
        setDataCertificate(certificateData);
      } else {
        console.error("Error in certificateStatus: ", certificateStatus);
      }

      if (preregisStatus === "OK") {
        setDataPreregis(preregisData);
      } else {
        console.error(
          "Error in preregisStatus: ",
          preregisStatus,
          resultPreregis
        );
      }

      if (gradeStatus === "OK") {
        setDataGrade(gradeData);
      } else {
        console.error("Error in gradeStatus: ", gradeStatus);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    getCurrentActivities();
    return () => controller.abort();
  }, []);

  //filter berdasarkan tanggal
  const groupedDataActivity = {};
  const groupedDataConsultation = {};
  const groupedDataCertificate = {};
  const groupedDataPreregis = {};
  const groupedDataGrade = {};
  const groupDataByDate = (data, dateKey, groupedData) => {
    data.forEach((value) => {
      const date = new Date(value[dateKey]).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      if (!groupedData[date]) {
        groupedData[date] = [];
      }

      groupedData[date].push(value);
    });
  };
  groupDataByDate(dataConsultation, "createdAt", groupedDataConsultation);
  groupDataByDate(dataActivity, "createdAt", groupedDataActivity);
  groupDataByDate(dataCertificate, "submitDate", groupedDataCertificate);
  groupDataByDate(dataPreregis, "submitDate", groupedDataPreregis);
  groupDataByDate(dataGrade, "submitedDate", groupedDataGrade);

  //format tanggal untuk today dan yesterday
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
      const response = await jwtAuthAxios.get(`/activity/detail/${value}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });

      const { status, data } = response.data;

      if (status === "OK") {
        navigate("activity", {
          state: {
            activityDetails: {
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

  const handleNavigateCertificate = async (value) => {
    try {
      const certificateDetailsResult = await jwtAuthAxios.get(
        `/certificate/student/${value.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const {
        student,
        submitDate,
        path,
        category,
        level,
        description,
        approvalStatus,
        title,
        id,
      } = certificateDetailsResult.data.data;
      navigate(`certificate/${value.id}`, {
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
            level: level,
            category: category,
            description: description,
            status: approvalStatus,
            title: title,
            id: id,
          },
        },
      });
    } catch (error) {
      handleError(error);
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
      handleError(error);
    }
  };

  const handleNavigatePreregis = async (value) => {
    try {
      const preregisDetailsResult = await jwtAuthAxios.get(
        `/pre-regist/details/${value.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
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
      handleError(error);
    }
  };

  const handleNavigateConsultation = async (value) => {
    try {
      const consultationDetailsResult = await jwtAuthAxios.get(
        `/academic-consultation/detail/${value.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

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
      handleError(error);
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case "PENALARAN_KEILMUAN":
        return "Reasoning and Scholarship";
      case "ORGANISASI_KEPEMIMPINAN":
        return "Organization and Leadership";
      case "BAKAT_MINAT":
        return "Talents and Interests";
      case "PENGABDIAN_MASYARAKAT":
        return "Community Service";
      case "OTHER":
        return "Others";
      default:
        return category;
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
              key="no-activity-message"
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
            Object.entries(groupedDataActivity).map(
              ([date, dataActivity, index]) => (
                <div key={`${index}-${date}`}>
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
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    color: "rgba(0, 0, 0, 1)",
                                    paddingLeft: "8px",
                                    paddingTop: "5px",
                                    fontSize: { xs: "12px", md: "14px" },
                                  }}
                                >
                                  {value.title.charAt(0).toUpperCase() +
                                    value.title.slice(1)}
                                </Typography>
                                <Typography
                                  sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
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
                                    width: "70px",
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
              )
            )
          )}
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div>
          <Typography sx={{ padding: "10px" }}></Typography>

          {dataPreregis.length === 0 ? (
            <Box
              key="no-preregis-message"
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
            Object.entries(groupedDataPreregis).map(
              ([date, dataPreregis, index]) => (
                <div key={`${index}-${date}`}>
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
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
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
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
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
                                    width: "70px",
                                    fontSize: { xs: "10px", md: "14px" },
                                    color: "rgba(27, 43, 65, 0.69)",
                                  }}
                                >
                                  {new Date(
                                    value.submitDate
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

      <TabPanel value={value} index={2}>
        <div>
          <Typography sx={{ padding: "10px" }}></Typography>
          {dataCertificate.length > 0 ? (
            Object.entries(groupedDataCertificate).map(
              ([date, dataCertificateGroup], index) => (
                <div key={`${index}-${date}`}>
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
                  {dataCertificateGroup &&
                    dataCertificateGroup.map((value, index) => (
                      <List
                        key={index}
                        sx={{
                          width: "100%",
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
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
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
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    paddingLeft: "8px",
                                    fontSize: { xs: "12px", md: "14px" },
                                  }}
                                >
                                  {getCategoryLabel(value.category)}
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
                                    width: "70px",
                                    fontSize: { xs: "10px", md: "14px" },
                                    color: "rgba(27, 43, 65, 0.69)",
                                  }}
                                >
                                  {new Date(
                                    value.submitDate
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
          ) : (
            <Box
              key="no-certificate-message"
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
          )}
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <div>
          <Typography sx={{ padding: "10px" }}></Typography>
          {dataGrade.length === 0 ? (
            <Box
              key="no-grade-message"
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
            Object.entries(groupedDataGrade).map(([date, dataGrade, index]) => (
              <div key={`${index}-${date}`}>
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
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
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
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
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
                                  width: "70px",
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
              key="no-consultation-message"
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
              ([date, dataConsultation, index]) => (
                <div key={`${index}-${date}`}>
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
                  {dataConsultation &&
                    dataConsultation.map((value, index) => (
                      <List
                        sx={{
                          width: "100%",

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
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
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
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
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
                                    width: "70px",
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
