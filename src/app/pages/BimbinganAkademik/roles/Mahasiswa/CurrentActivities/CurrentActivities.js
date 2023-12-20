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
  Stack,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import { useNavigate } from "react-router-dom";

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
  const [value, setValue] = useState(0);
  const [dataConsultation, setDataConsultation] = useState([]);
  const [dataCertificate, setDataCertificate] = useState([]);

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
      //content-type dan Authorization liat di dokumentasi API atau postman
      // const headers = {
      //     'Content-Type': 'multipart/form-data',
      //     Authorization: `Bearer token_apa`,
      //   };

      const { nim } = JSON.parse(localStorage.getItem("user"));
      const resultConsultation = await axios.get(
        `${BASE_URL_API}/academic-consultation/student/${nim}`
        // {  headers,}
      );

      const resultCertificate = await axios.get(
        `${BASE_URL_API}/certificate/current/student/${nim}`
        // {  headers,}
      );

      const { status: consultationStatus, data: consultationData } =
        resultConsultation.data;
      const { status: certificateStatus, data: certificateData } =
        resultCertificate.data;

      if (consultationStatus === "OK") {
        console.log("ini isi result.data dalam status ok", consultationData);
        setDataConsultation(consultationData);
      } else {
        console.log(resultConsultation);
        console.log(resultConsultation.data);
      }

      if (certificateStatus === "OK") {
        console.log("ini isi response.data dalam status ok", certificateData);
        setDataCertificate(certificateData);
      } else {
        console.log(resultCertificate);
        console.log(resultCertificate.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentActivities();
  }, []);

  const groupedDataConsultation = {};
  const groupedDataCertificate = {};

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
      const certificateDetailsResult = await axios.get(
        `${BASE_URL_API}/certificate/student/${value.certificateId}`
      );
      let pathh = "/bimbingan-akademik/current-activities/certificate/";

      const {
        transaction,
        submitDate,
        path,
        category,
        description,
        approval_status,
        title,
        id,
      } = certificateDetailsResult.data.data;
      navigate(
        `${pathh}${value.certificateId}`,
        {
          state: {
            certificateDetails: {
              firstName: transaction[0].Student.firstName,
              lastName: transaction[0].Student.lastName,
              SupervisorFirstName: transaction[0].Employee.firstName,
              SupervisorLastName: transaction[0].Employee.lastName,
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
          <Tab label="Pre-registration" {...a11yProps(0)} />
          <Tab label="Certificate" {...a11yProps(1)} />
          <Tab label="Grade" {...a11yProps(2)} />
          <Tab label="Consultation" {...a11yProps(3)} />
        </Tabs>
      </div>

      <TabPanel value={value} index={0}>
        <div>
          <Typography sx={{ padding: "10px" }}></Typography>
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            justifyContent={"flex-start"}
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 2000,
                bgcolor: "background.paper",
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
            >
              <Box
                sx={{
                  height: "50px",
                  backgroundColor: "rgba(235, 235, 235, 1)",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>
                  Yesterday
                </Typography>
              </Box>
              <ListItem
                button
                component={Link}
                to="/bimbingan-akademik/current-activities/pre-registration"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
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
                        Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Preregistrasi semester II tahun ajaran 2023/2024
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
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
                        02:00 PM
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />
              <Box
                sx={{
                  height: "50px",
                  backgroundColor: "rgba(235, 235, 235, 1)",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>
                  Sunday, Aug 6, 2023
                </Typography>
              </Box>
              <ListItem
                button
                component={Link}
                to="/bimbingan-akademik/current-activities/pre-registration/"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
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
                        Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Preregistrasi semester I tahun ajaran 2023/2024
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
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
                        02:00 PM
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />
              <Box
                sx={{
                  height: "50px",
                  backgroundColor: "rgba(235, 235, 235, 1)",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>
                  Sunday, Mar 12, 2023
                </Typography>
              </Box>
              <ListItem
                button
                component={Link}
                to="/bimbingan-akademik/current-activities/pre-registration/"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
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
                        Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Preregistrasi semester II tahun ajaran 2022/2023
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
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
                        02:00 PM
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />
            </List>
          </Stack>
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div>
          <Typography sx={{ padding: "10px" }}></Typography>

          {Object.entries(groupedDataCertificate).map(
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
                                {value.Student.lastName},
                                {value.Student.firstName}
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
          )}
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <div>
          <Typography sx={{ padding: "10px" }}></Typography>
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            justifyContent={"flex-start"}
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 2000,
                bgcolor: "background.paper",
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
            >
              <Box
                sx={{
                  height: "50px",
                  backgroundColor: "rgba(235, 235, 235, 1)",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>
                  Yesterday
                </Typography>
              </Box>

              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to="/bimbingan-akademik/current-activities/grade"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
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
                        Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Semester 4
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
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
                        02:00 PM
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />

              <Box
                sx={{
                  height: "50px",
                  backgroundColor: "rgba(235, 235, 235, 1)",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>
                  Tuesday, Aug 2, 2023
                </Typography>
              </Box>

              <ListItem
                button
                component={Link}
                to="/bimbingan-akademik/current-activities/grade"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
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
                        Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Semester 3
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
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
                        02:00 PM
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />
            </List>
          </Stack>
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <div>
          <Typography sx={{ padding: "10px" }}></Typography>
          {Object.entries(groupedDataConsultation)
            .filter(([dateConsultation, dataConsultation]) =>
              dataConsultation.some(
                (value) =>
                  value.status === "Waiting" || value.status === "OnProcess"
              )
            )
            .map(([dateConsultation, dataConsultation]) => (
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
                    ) : (
                      ""
                    )
                  )}
              </div>
            ))}
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>
    </div>
  );
};

export default CurrentActivities;
