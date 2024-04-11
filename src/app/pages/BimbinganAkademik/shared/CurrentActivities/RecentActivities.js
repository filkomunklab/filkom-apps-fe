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
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const CurrentActivities = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  //get data
  const [dataActivity, setDataActivity] = useState([]);
  const [dataConsultation, setDataConsultation] = useState([]);

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

  const getActivity = async () => {
    try {
      const { id } = JSON.parse(localStorage.getItem("user"));
      const result = await jwtAuthAxios.get(`/activity/current/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });

      const { status: activityStatus, data } = result.data;
      if (activityStatus === "OK") {
        setDataActivity(data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const getConsultation = async () => {
    try {
      const { nik } = JSON.parse(localStorage.getItem("user"));
      const result = await jwtAuthAxios.get(
        `/academic-consultation/employee/${
          JSON.parse(localStorage.getItem("user")).id
        }`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );
      const { status: consultationStatus, data } = result.data;
      if (consultationStatus === "OK") {
        const onProcessConsultations = data.filter(
          (consultation) => consultation.status === "OnProcess"
        );

        setDataConsultation(onProcessConsultations);
      }
    } catch (error) {
      handleError(error);
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

      const consultationDetailsResult = await jwtAuthAxios.get(
        `/academic-consultation/detail/${value}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

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
      handleError(error);
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
                    item?.type === "activity"
                      ? handleNavigateActivity(item?.id)
                      : handleNavigate(item?.id)
                  }
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontSize: { xs: "12px", md: "14px" },
                          "&:hover": {
                            textDecorationLine: ["none"],
                          },
                        }}
                      >
                        {item?.type === "activity"
                          ? item?.title
                          : `${item?.student.lastName}, ${item?.student.firstName} `}
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
                        {item?.description}
                      </Typography>
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
                          {new Date(item?.createdAt).toLocaleTimeString(
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
    </div>
  );
};

export default CurrentActivities;
