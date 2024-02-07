import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

const CurrentActivities = () => {
  const navigate = useNavigate();
  const controller = new AbortController();
  const signal = controller.signal;
  const [dataActivity, setDataActivity] = useState([]);
  const [dataConsultation, setDataConsultation] = useState([]);

  const getActivity = async () => {
    try {
      //content-type dan Authorization liat di dokumentasi API atau postman
      // const headers = {
      //     'Content-Type': 'multipart/form-data',
      //     Authorization: `Bearer token_apa`,
      //   };

      const { nik } = JSON.parse(localStorage.getItem("user"));
      const result = await axios.get(
        `${BASE_URL_API}/activity/current/${nik}`,
        { signal }
        // {  headers,}
      );

      console.log("ini result", result);
      const { status, data } = result.data;
      if (status === "OK") {
        // const onProcessConsultations = result.data.data.filter(
        //   (consultation) => consultation.status === "OnProcess"
        // );

        setDataActivity(data);
      } else {
        console.log(result);
        console.log(result.data);
      }
    } catch (error) {
      console.log("error getActivity", error);
    }
  };

  const getConsultation = async () => {
    try {
      //content-type dan Authorization liat di dokumentasi API atau postman
      // const headers = {
      //     'Content-Type': 'multipart/form-data',
      //     Authorization: `Bearer token_apa`,
      //   };

      const { nik } = JSON.parse(localStorage.getItem("user"));
      const result = await axios.get(
        `${BASE_URL_API}/academic-consultation/employee/${nik}`,
        { signal }
        // {  headers,}
      );
      const { status, data } = result.data;
      if (status === "OK") {
        const onProcessConsultations = data.filter(
          (consultation) => consultation.status === "OnProcess"
        );

        setDataConsultation(onProcessConsultations);
      } else {
        console.log(result);
        console.log(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getConsultation();
    getActivity();

    return () => controller.abort();
  }, []);

  const groupedDataActivity = {};
  const groupedDataConsultation = {};

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

  dataConsultation.forEach((value) => {
    const date = new Date(value.createdAt).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    if (!groupedDataConsultation[date]) {
      groupedDataConsultation[date] = [];
    }
    groupedDataConsultation[date].push(value);
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

  const handleNavigate = async (value) => {
    try {
      const { role } = JSON.parse(localStorage.getItem("user"));

      const consultationDetailsResult = await axios.get(
        `${BASE_URL_API}/academic-consultation/detail/${value}`
      );
      console.log("ini detail Consutation result:", consultationDetailsResult);
      const { data, status } = consultationDetailsResult.data;

      let path = "";
      if (role.includes("DEKAN")) {
        path =
          "/bimbingan-akademik/dekan/current-activities/view-consultation/";
      } else if (role.includes("KAPRODI")) {
        path =
          "/bimbingan-akademik/kaprodi/current-activities/view-consultation/";
      } else {
        path =
          "/bimbingan-akademik/dosen-pembimbing/current-activities/view-consultation/";
      }

      if (status === "OK") {
        navigate(`${path}${value}`, {
          state: {
            consultationDetails: {
              studentName: data.student_name,
              supervisorName: data.supervisor_name,
              studentMajor: data.student_major,
              studentArrivalYear: data.student_arrival_year,
              topic: data.topic,
              receiverName: data.receiver_name,
              description: data.description,
              id: data.id,
            },
          },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNavigateActivity = (value) => {
    navigate(`view-activity`, { state: { activityId: value } });
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
        review the activities you've created, take attendance for students, and
        respond to ongoing consultations.
      </Typography>

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
          <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>
            You don't have any current activities
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
              <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>
                {formatDate(date)}
              </Typography>
            </Box>
            {dataActivity.map((item, index) => (
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
                  onClick={() =>
                    item.type === "activity"
                      ? handleNavigateActivity(item.id)
                      : handleNavigate(item.id)
                  }
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: "12px", md: "14px" },
                          "&:hover": {
                            textDecorationLine: ["none"],
                          },
                        }}
                      >
                        {item.type === "activity"
                          ? item.title
                          : `${item.student.lastName},${item.student.firstName} `}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: "rgba(27, 43, 65, 0.69)",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        {item.description}
                      </Typography>
                    }
                  />

                  <Box
                    sx={{
                      marginRight: "-72px",
                      textAlign: "right",
                      width: "300px",
                      "@media (max-width: 630px)": {
                        width: "400px",
                      },
                      "@media (max-width: 400px)": {
                        width: "600px",
                      },
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
                          {new Date(item.createdAt).toLocaleTimeString(
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
                  <Divider component="li" variant="inset" />
                </ListItem>
              </List>
            ))}
            {/* {dataConsultation.map((value, index) => (
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
                <ListItem onClick={() => handleNavigate(value)}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: "12px", md: "14px" },
                          "&:hover": {
                            textDecorationLine: ["none"],
                          },
                        }}
                      >
                        {value.student_name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: "rgba(27, 43, 65, 0.69)",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        {value.description}
                      </Typography>
                    }
                  />

                  <Box
                    sx={{
                      marginRight: "-72px",
                      textAlign: "right",
                      width: "300px",
                      "@media (max-width: 630px)": {
                        width: "400px",
                      },
                      "@media (max-width: 400px)": {
                        width: "600px",
                      },
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
                  <Divider component="li" variant="inset" />
                </ListItem>
              </List>
            ))} */}
          </div>
        ))
      )}
    </div>
  );
};

export default CurrentActivities;
