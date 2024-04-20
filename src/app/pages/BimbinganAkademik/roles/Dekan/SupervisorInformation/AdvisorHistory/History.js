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
  Breadcrumbs,
  experimentalStyled as styled,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { useNavigate, Link, useLocation } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { handleAuthenticationError } from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

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

  const location = useLocation();
  const { classID, id } = location.state || {};
  const [value, setValue] = useState(0);
  const [dataActivity, setDataActivity] = useState([]);
  const [dataConsultation, setDataConsultation] = useState([]);
  const [dataCertificate, setDataCertificate] = useState([]);
  const [dataPreregis, setDataPreregis] = useState([]);

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
    if (error && error.code === "ERR_CANCELED") {
      console.log("request canceled");
    } else if (error && error.response && error.response.status === 401) {
      handleAuthenticationError();
    } else {
      console.error("error: ", error);
    }
  };

  const getHistory = async () => {
    try {
      const resultActivity = await jwtAuthAxios.get(
        `/activity/history-for-advisor/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      const resultConsultation = await jwtAuthAxios.get(
        `/academic-consultation/employee/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      const resultCertificate = await jwtAuthAxios.get(
        `/certificate/dosen/${classID}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      const resultPreregis = await jwtAuthAxios.get(
        `/pre-regist/history-for-advisor/${classID}`,
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

      if (activityStatus === "OK") {
        setDataActivity(activityData);
      }

      if (consultationStatus === "OK") {
        const filteredConsultationData = consultationData.filter(
          (value) => value?.status === "Complete"
        );

        setDataConsultation(filteredConsultationData);
      }

      if (certificateStatus === "OK") {
        setDataCertificate(certificateData);
      }

      if (preregisStatus === "OK") {
        setDataPreregis(preregisData);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getHistory();
    return () => controller.abort();
  }, []);

  const groupedDataActivity = {};
  const groupedDataConsultation = {};
  const groupedDataCertificate = {};
  const groupedDataPreregis = {};

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

  if (Array.isArray(dataCertificate)) {
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
  } else {
    console.error("dataCertificate bukan array");
  }

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
    navigate(`${value.id}/history-activity`, { state: { activityId: value } });
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

      navigate(`${value.id}/history-consultation`, {
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

      const {
        student,
        submitDate,
        path,
        category,
        description,
        approvalStatus,
        approvalDate,
        title,
        id,
        comments,
        level,
      } = certificateDetailsResult.data.data;
      navigate(`${value.id}/history-certificate`, {
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
            level: level,
            description: description,
            status: approvalStatus,
            title: title,
            id: id,
            approvalDate: approvalDate,
            comments: comments,
          },
        },
      });
    } catch (error) {
      handleError(error);
    }
  };

  const handleNavigatePreregis = async (value) => {
    navigate(`${value.id}/history-preregistration`, {
      state: {
        id: value.id,
      },
    });
  };

  return (
    <div>
      <div role="presentation" sx={{ paddingBottom: "15px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/dekan/supervisor-information/">
            Supervisor Information
          </StyledLink>
          <Typography color="text.primary">History</Typography>
        </Breadcrumbs>
      </div>
      <Typography
        sx={{ fontSize: "24px", fontWeight: 500, paddingTop: "20px" }}
      >
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
                                  width: "70px",
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

          {dataCertificate.length > 0 ? (
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
                                  {value.student.lastName},{" "}
                                  {value.student.firstName}
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
                                    width: "70px",
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
          ) : (
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
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
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

export default History;
