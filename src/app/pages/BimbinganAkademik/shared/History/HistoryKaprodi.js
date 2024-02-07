import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import Chip from "@mui/material/Chip";
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

const History = (props) => {
  //abort
  const navigate = useNavigate();
  const controller = new AbortController();
  const signal = controller.signal;

  const [value, setValue] = useState(0);
  const [dataActivity, setDataActivity] = useState([]);
  const [dataConsultation, setDataConsultation] = useState([]);
  const [dataCertificate, setDataCertificate] = useState([]);
  const [dataPreregis, setDataPreregis] = useState([]);
  const [dataGrade, setDataGrade] = useState([]);

  const { role } = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const storedValue = localStorage.getItem("historyTabValue");
    if (storedValue !== null) {
      setValue(parseInt(storedValue));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("historyTabValue", value);
  }, [value]);

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

  const getHistory = async () => {
    try {
      const { nik, guidanceClassId, id } = JSON.parse(
        localStorage.getItem("user")
      );

      const resultActivity = await jwtAuthAxios.get(
        `/activity/history-for-advisor/${nik}`,
        // `/academic-consultation/employee/${nik}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      const resultConsultation = await jwtAuthAxios.get(
        `/academic-consultation/employee/${nik}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      const resultCertificate = await jwtAuthAxios.get(
        // `/academic-consultation/employee/${nik}`,
        `/certificate/dosen/${guidanceClassId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      const resultPreregis = await jwtAuthAxios.get(
        // `/academic-consultation/employee/${nik}`,
        `/pre-regist/history-for-advisor/${guidanceClassId}`,
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

      console.log("response result activity", resultActivity);

      if (activityStatus === "OK") {
        setDataActivity(activityData);
      } else {
        console.log("error activity:", resultActivity);
      }

      if (consultationStatus === "OK") {
        const filteredConsultationData = consultationData.filter(
          (value) => value.status === "Complete"
        );

        setDataConsultation(filteredConsultationData);
      } else {
        console.log("ini error resultConsultation", resultConsultation);
      }

      if (certificateStatus === "OK") {
        setDataCertificate(certificateData);
      } else {
        console.log("ini error resultCertificate", resultCertificate);
      }

      if (preregisStatus === "OK") {
        setDataPreregis(preregisData);
      } else {
        console.log("ini error resultPreregis", resultPreregis);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const getHistoryGrade = async () => {
    try {
      const { id } = JSON.parse(localStorage.getItem("user"));

      const majorResponse = await jwtAuthAxios.get(`/employee/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      const major = majorResponse.data.data.major;

      const resultGrade = await jwtAuthAxios.get(
        `/transaction/hisotry/kaprodi/${major}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      const { status: gradeStatus, data: gradeData } = resultGrade.data;

      if (gradeStatus === "OK") {
        console.log("ini isi response.data gradeData", gradeData);
        setDataGrade(gradeData);
      } else {
        console.log("ini error resultGrade", resultGrade);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getHistory();
    getHistoryGrade();
    return () => controller.abort();
  }, []);

  const groupedDataActivity = {};
  const groupedDataConsultation = {};
  const groupedDataCertificate = {};
  const groupedDataPreregis = {};
  const groupedDataGrade = {};

  dataActivity.forEach((value) => {
    const dateActivity = new Date(value.dueDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    if (!groupedDataActivity[dateActivity]) {
      groupedDataActivity[dateActivity] = [];
    }
    groupedDataActivity[dateActivity].push(value);
  });

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

  dataCertificate.forEach((value) => {
    const date = new Date(value.approvalDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
    const date = new Date(value.approveDate).toLocaleDateString("en-US", {
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

  const handleNavigateActivity = (value) => {
    navigate(`activity`, { state: { activityId: value } });
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

      const { role } = JSON.parse(localStorage.getItem("user"));
      let path = "";
      if (role.includes("DEKAN")) {
        path = "/bimbingan-akademik/dekan/history/consultation/";
      } else if (role.includes("KAPRODI")) {
        path = "/bimbingan-akademik/kaprodi/history/consultation/";
      } else {
        path = "/bimbingan-akademik/dosen-pembimbing/history/consultation/";
      }

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

  const handleNavigateCertificate = async (value) => {
    try {
      const certificateDetailsResult = await jwtAuthAxios.get(
        `/certificate/student/${value.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const { role } = JSON.parse(localStorage.getItem("user"));
      let pathh = "";
      if (role.includes("DEKAN")) {
        pathh = "/bimbingan-akademik/dekan/history/certificate/";
      } else if (role.includes("KAPRODI")) {
        pathh = "/bimbingan-akademik/kaprodi/history/certificate/";
      } else {
        pathh = "/bimbingan-akademik/dosen-pembimbing/history/certificate/";
      }

      const {
        student,
        submitDate,
        path,
        category,
        description,
        approval_status,
        approvalDate,
        title,
        id,
        comments,
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
              approvalDate: approvalDate,
              comments: comments,
            },
          },
        },
        console.log("ini pathFile", path)
      );
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
      const { role } = JSON.parse(localStorage.getItem("user"));
      let path = "";
      console.log("hai ini role KAPRODI", role.includes("KAPRODI"));
      console.log("hai ini role DEKAN", role.includes("DEKAN"));
      if (role.includes("DEKAN")) {
        path = "/bimbingan-akademik/dekan/history/pre-registration/";
      } else if (role.includes("KAPRODI")) {
        path = "/bimbingan-akademik/kaprodi/history/pre-registration/";
      } else {
        path = "/bimbingan-akademik/dosen-pembimbing/history/pre-registration/";
      }
      navigate(`${path}${value.id}`, {
        state: {
          preregisDetails: {
            id: detail.id,
            studentName:
              detail.Student.lastName + ", " + detail.Student.firstName,
            supervisorName:
              detail.Employee.lastName + ", " + detail.Employee.firstName,
            submitDate: detail.submitDate,
            approveDate: detail.approveDate,
            status: detail.status,
            listSubjectPreregis: detail.ListOfRequest,
            comments: detail.comments,
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
      let path = "/bimbingan-akademik/kaprodi/history/grade/";
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
            approveDate: detail.approveDate,
            comments: detail.comments,
          },
        },
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div>
      <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
        History
      </Typography>
      <Typography
        sx={{
          paddingTop: "22px",
          paddingBottom: "28px",
          fontSize: "15px",
          fontWeight: 400,
          color: "rgba(27, 43, 65, 0.69)",
          textAlign: "justify",
        }}
      >
        Currently you are in the history page, all the activities you have done
        in terms of activity handling, student pre-registration, student
        certificate approval, student study result card, everything you have
        approved will be displayed on this page.
      </Typography>

      <div sx={{ borderBottom: 1, borderColor: "divider", paddingTop: "16px" }}>
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
          <Tab label="Consultation" {...a11yProps(3)} />
          <Tab label="Grade" {...a11yProps(4)} />
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
                You don't have any history actvities
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
                You don't have any pre-registration history
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
                                Preregistrsi Semester{" "}
                                {value.PreRegistration.semester} tahun ajaran{" "}
                                {value.PreRegistration.semesterPeriod}
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
                You don't have any certificate history
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
                                  {value.title}
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
                                    value.approvalDate
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
                You don't have any consultation history
              </Typography>
            </Box>
          ) : (
            Object.entries(groupedDataConsultation).map(
              ([date, dataConsultation]) => (
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
                  {dataConsultation &&
                    dataConsultation.map((value, index) => (
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
                          onClick={() => handleNavigateConsultation(value)}
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
                                  {value.student_name}
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
              )
            )
          )}

          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>

      <TabPanel value={value} index={4}>
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
                You don't have any grade history
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
                                {new Date(value.approveDate).toLocaleTimeString(
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
    </div>
  );
};

export default History;
