import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";
// import SearchGlobal from "app/shared/SearchGlobal";
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

const History = (props) => {
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
  const isKaprodi = role.includes("KAPRODI");

  useEffect(() => {
    const storedValue = localStorage.getItem("historyTabValue");
    if (storedValue !== null) {
      setValue(parseInt(storedValue));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("historyTabValue", value);
  }, [value]);

  const getHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const { nik, guidanceClassId, id } = JSON.parse(
        localStorage.getItem("user")
      );

      console.log("idddddddddddddddddd", id);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const majorResponse = await axios.get(`${BASE_URL_API}/employee/${id}`, {
        headers,
      });

      const major = majorResponse.data.data.major;

      const resultActivity = await axios.get(
        `${BASE_URL_API}/activity/history-for-advisor/${nik}`,
        { signal }
      );

      const resultConsultation = await axios.get(
        `${BASE_URL_API}/academic-consultation/employee/${nik}`
      );

      const resultCertificate = await axios.get(
        `${BASE_URL_API}/certificate/dosen/${guidanceClassId}`,
        { headers }
      );

      const resultPreregis = await axios.get(
        `${BASE_URL_API}/pre-regist/history-for-advisor/${guidanceClassId}`
      );

      const resultGrade = await axios.get(
        `${BASE_URL_API}/transaction/history/kaprodi/${major}`
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

      if (gradeStatus === "OK") {
        console.log("ini isi response.data gradeData", gradeData);
        setDataGrade(gradeData);
      } else {
        console.log("ini error resultGrade", resultGrade);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);
  console.log("ini data certi", dataCertificate);

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

  // if (Array.isArray(dataCertificate)) {
  //   const groupedDataCertificate = {};
  //   dataCertificate.forEach((value) => {
  //     const date = new Date(value.approvalDate).toLocaleDateString("en-US", {
  //       weekday: "long",
  //       year: "numeric",
  //       month: "short",
  //       day: "numeric",
  //     });
  //     if (!groupedDataCertificate[date]) {
  //       groupedDataCertificate[date] = [];
  //     }
  //     groupedDataCertificate[date].push(value);
  //   });
  // }

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

  const handleNavigateConsultation = async (value) => {
    try {
      const consultationDetailsResult = await axios.get(
        `${BASE_URL_API}/academic-consultation/detail/${value.id}`
      );
      // console.log("ini detail Consutation result:", consultationDetailsResult);

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
      console.log(error.message);
    }
  };

  const handleNavigateCertificate = async (value) => {
    try {
      const certificateDetailsResult = await axios.get(
        `${BASE_URL_API}/certificate/student/${value.id}`
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
      console.log(error.message);
    }
  };

  const handleNavigatePreregis = async (value) => {
    try {
      const preregisDetailsResult = await axios.get(
        `${BASE_URL_API}/pre-regist/details/${value.id}`
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
      console.log(error.message);
    }
  };

  const handleNavigateGrade = async (value) => {
    try {
      const gradeDetailsResult = await axios.get(
        `${BASE_URL_API}/transaction/submissionDetail/${value.id}`
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
      console.log(error.message);
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

      {/* <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ paddingBottom: 4 }}>
          <SearchGlobal
            sx={{
              width: "40%",
              "@media (max-width: 600px)": {
                height: "40px",
                width: "100%",
              },
            }}
          />
        </Grid>
      </Grid> */}

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
          {isKaprodi && <Tab label="Grade" {...a11yProps(4)} />}
        </Tabs>
      </div>

      <TabPanel value={value} index={0}>
        <div>
          {/* {dataActivity?.map((item, index) => ( */}
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
                  Today
                </Typography>
              </Box>
              {dataActivity?.map((item, index) => (
                <>
                  <ListItem
                    size="small"
                    button
                    tabIndex={index}
                    component={Link}
                    to="activity"
                    state={{ activityId: item.id }}
                    sx={{ paddingLeft: "50px", paddingRight: "50px" }}
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
                            {item.title}
                          </Typography>
                          <Typography
                            sx={{
                              paddingLeft: "8px",
                              fontSize: { xs: "12px", md: "14px" },
                            }}
                          >
                            {item.description}
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
                              fontSize: { xs: "10px", md: "12px" },
                              color: "rgba(27, 43, 65, 0.69)",
                            }}
                          >
                            {new Date(item.dueDate).toLocaleTimeString(
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
                </>
              ))}

              {/* <ListItem
                    size="small"
                    button
                    component={Link}
                    to="activity1"
                    sx={{ paddingLeft: "50px", paddingRight: "50px" }}
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
                            Akan Diadakan Pertemuan pada 10 Februari 2024
                          </Typography>
                          <Typography
                            sx={{
                              paddingLeft: "8px",
                              fontSize: { xs: "12px", md: "14px" },
                            }}
                          >
                            Pertemuan dilaksanakan di gedung GK3 lt.2.
                            Diwajibkan memakai sepatu.
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
                              fontSize: { xs: "10px", md: "12px" },
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
                  <ListItem
                    size="small"
                    button
                    component={Link}
                    to="activity"
                    sx={{ paddingLeft: "50px", paddingRight: "50px" }}
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
                            Pemasukan sertifikat
                          </Typography>
                          <Typography
                            sx={{
                              paddingLeft: "8px",
                              fontSize: { xs: "12px", md: "14px" },
                            }}
                          >
                            Himbauan untuk memasukan sertifikat yang telah
                            didapat dari fakultas
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
                              fontSize: { xs: "10px", md: "12px" },
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
                      Tuesday, Feb 2, 2024
                    </Typography>
                  </Box>
                  <ListItem
                    size="small"
                    button
                    component={Link}
                    to="activity3"
                    sx={{ paddingLeft: "50px", paddingRight: "50px" }}
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
                            Silakan memasukkan nilai semester anda sebelumnya
                          </Typography>
                          <Typography
                            sx={{
                              paddingLeft: "8px",
                              fontSize: { xs: "12px", md: "14px" },
                            }}
                          >
                            Saat ini sedang masa pemasukkan nilai semester
                            sebelumnya. Harap semuanya dapat mengisi
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
                              fontSize: { xs: "10px", md: "12px" },
                              color: "rgba(27, 43, 65, 0.69)",
                            }}
                          >
                            02:00 PM
                          </Typography>
                        }
                      />
                    </Box>
                  </ListItem>
                  <Divider component="li" /> */}
            </List>
          </Stack>
          <Typography sx={{ padding: "20px" }}></Typography>
          {/* <Typography sx={{ padding: "10px" }}></Typography>
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
                  Today
                </Typography>
              </Box>

              <ListItem
                size="small"
                button
                component={Link}
                to="activity2"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
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
                        Form untuk memasukan Pre-Registration Course telah
                        dibuka.
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Tidak ada pertemuan tatap muka. Diharapkan semua untuk
                        mengisi.
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
                          fontSize: { xs: "10px", md: "12px" },
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

              <ListItem
                size="small"
                button
                component={Link}
                to="activity1"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
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
                        Akan Diadakan Pertemuan pada 10 Februari 2024
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Pertemuan dilaksanakan di gedung GK3 lt.2. Diwajibkan
                        memakai sepatu.
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
                          fontSize: { xs: "10px", md: "12px" },
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
              <ListItem
                size="small"
                button
                component={Link}
                to="activity"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
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
                        Pemasukan sertifikat
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Himbauan untuk memasukan sertifikat yang telah didapat
                        dari fakultas
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
                          fontSize: { xs: "10px", md: "12px" },
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
                  Tuesday, Feb 2, 2024
                </Typography>
              </Box>
              <ListItem
                size="small"
                button
                component={Link}
                to="activity3"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
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
                        Silakan memasukkan nilai semester anda sebelumnya
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Saat ini sedang masa pemasukkan nilai semester
                        sebelumnya. Harap semuanya dapat mengisi
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
                          fontSize: { xs: "10px", md: "12px" },
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
          <Typography sx={{ padding: "20px" }}></Typography> */}
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
