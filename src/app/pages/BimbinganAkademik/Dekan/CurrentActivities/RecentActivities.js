import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  experimentalStyled as styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

const CurrentActivities = () => {
  const navigate = useNavigate();
  const [dataConsultation, setDataConsultation] = useState([]);
  // const [certificateData, setCertificateData] = useState([]);
  // const dataActivities = [...dataConsultation, ...certificateData];

  const getConsultation = async () => {
    try {
      //content-type dan Authorization liat di dokumentasi API atau postman
      // const headers = {
      //     'Content-Type': 'multipart/form-data',
      //     Authorization: `Bearer token_apa`,
      //   };

      const { nik } = JSON.parse(localStorage.getItem("user"));
      const result = await axios.get(
        `${BASE_URL_API}/academic-consultation/employee/${nik}`
        // {  headers,}
      );
      const { status } = result.data;
      if (status === "OK") {
        console.log("ini isi result.data dalam status ok", result.data.data);
        setDataConsultation(result.data.data);
      } else {
        console.log(result);
        console.log(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const getCertificateData = async () => {
  //   try {
  //     const { nik } = JSON.parse(localStorage.getItem("user"));
  //     const result = await axios.get(
  //       `${BASE_URL_API}/certificate/student/${nik}`
  //     );
  //     const { status } = result.data;
  //     if (status === "OK") {
  //       console.log("Certificate data:", result.data.data);
  //       setCertificateData(result.data.data);
  //     } else {
  //       console.log(result);
  //       console.log(result.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getConsultation();
    // getCertificateData();
  }, []);

  const groupedData = {};
  dataConsultation.forEach((value) => {
    const date = new Date(value.createdAt).toLocaleDateString("en-US", {
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

  const handleNavigate = async (value) => {
    try {
      const consultationDetailsResult = await axios.get(
        `${BASE_URL_API}/academic-consultation/detail/${value.id}`
      );
      // console.log("ini detail Consutation result:", consultationDetailsResult);
      const { role } = JSON.parse(localStorage.getItem("user"));
      let path = "";
      console.log("hai ini role", role.includes === "KAPRODI");
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

      {Object.entries(groupedData).map(([date, dataConsultation]) => (
        <div key={date}>
          <Box
            sx={{
              height: "55px",
              backgroundColor: "rgba(235, 235, 235, 1)",
              display: "flex",
              alignItems: "center",
              paddingLeft: "10px",
            }}
          >
            <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>{date}</Typography>
          </Box>
          {dataConsultation &&
            dataConsultation.map((value, index) =>
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
                        marginLeft: { xs: "auto", md: 0 },
                        marginRight: "-72px",
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
                    <Divider component="li" variant="inset" />
                  </ListItem>
                </List>
              ) : (
                ""
              )
            )}
        </div>
      ))}
    </div>
  );
};

export default CurrentActivities;
