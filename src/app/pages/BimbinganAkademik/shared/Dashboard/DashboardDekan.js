import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import React, { useState, useEffect } from "react";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LinearProgressWithLabel from "app/shared/LinearProgressWithLabel";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import Div from "@jumbo/shared/Div";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";
import { useNavigate } from "react-router-dom";

const COLORS = ["#8884d8", "#82ca9d", "skyblue", "#AAC4FF", "#51829B"];

const Dashboard = () => {
  const navigate = useNavigate();
  const [distributionData, setDistributionData] = useState([]);
  const [facultyStudent, setFacultyStudent] = useState(0);
  const [activeStudentStatus, setActiveStudentStatus] = useState([]);
  const [inActiveStudentStatus, setInActiveStudentStatus] = useState([]);
  const [certificateData, setCertificateData] = useState([]);
  const role = JSON.parse(localStorage.getItem("user")).role;

  useEffect(() => {
    getDataDistributionStudent();
    getFacultyStudent();
    getActiveStudentStatus();
    getInactiveStudentStatus();
    getCertificateData();
  }, []);

  useEffect(() => {}, [distributionData]);

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

  const getCertificateData = async () => {
    try {
      const response = await jwtAuthAxios.get(
        `/dashboard/statistc/categoryCertificate`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCertificateData(response.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  const getDataDistributionStudent = async () => {
    try {
      const response = await jwtAuthAxios.get(
        `/dashboard/statistic/majorStudent/arrivalYear`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const apiData = response.data.data;

      setDistributionData(apiData);
    } catch (error) {
      handleError(error);
    }
  };

  const getFacultyStudent = async () => {
    try {
      const response = await jwtAuthAxios.get(`/dashboard/statistic/faculty/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setFacultyStudent(response.data.data[0].count);
    } catch (error) {
      handleError(error);
    }
  };

  const getActiveStudentStatus = async () => {
    try {
      if (role.includes("KAPRODI")) {
        const response = await jwtAuthAxios.get(
          `/dashboard/statistic/majorStudent/active`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setActiveStudentStatus(response.data.data);
      } else {
        const response = await jwtAuthAxios.get(
          `/dashboard/statistic/faculty/active`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setActiveStudentStatus(response.data.data[0].count);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const getInactiveStudentStatus = async () => {
    try {
      if (role.includes("KAPRODI")) {
        const response = await jwtAuthAxios.get(
          `/dashboard/statistic/majorStudent/inActive`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setInActiveStudentStatus(response.data.data);
      } else {
        const response = await jwtAuthAxios.get(
          `/dashboard/statistic/faculty/inActive`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setInActiveStudentStatus(response.data.data[0].count);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7}>
          <Card sx={{ width: "100%" }}>
            <CardHeader title="Distribution of students" />
            <CardContent style={{ width: "100%" }}>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={distributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis
                    label={{
                      value: "Total Students",
                      angle: -90,
                      position: "insideLeft",
                      dy: 50,
                      dx: 10,
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="SI" fill="#8884d8" />
                  <Bar dataKey="IF" fill="#82ca9d" />
                  <Bar dataKey="DKV" fill="skyblue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Card>
            <CardHeader title="Certificate" />
            <CardContent>
              <ResponsiveContainer width={"100%"} height={350}>
                <PieChart>
                  <Pie
                    data={certificateData}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="skyblue"
                    label
                  >
                    {certificateData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    formatter={(value) => {
                      switch (value) {
                        case "REGION":
                          return "Region";
                        case "NATIONAL":
                          return "National";
                        case "INTERNATIONAL":
                          return "International";
                        case "UNIVERSITY":
                          return "University";
                        case "MAJOR":
                          return "Study Program";
                        default:
                          return value;
                      }
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item container spacing={2} xs={12} sm={12} md={12} xl={12}>
          <Grid item xs={12} sm={6} md={6} xl={6}>
            <Card sx={{ height: "100%" }}>
              <CardHeader title="Number of Faculty Students" />
              <CardContent
                sx={{ position: "relative", padding: 2, pl: 3, pr: 3 }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 38, md: 40, lg: 38, xl: 50 },
                    color: "#006AF5",
                  }}
                >
                  {`${facultyStudent} people`}
                </Typography>
                <PeopleOutlinedIcon
                  sx={{
                    position: "absolute",
                    right: 0,
                    fontSize: 40,
                    bottom: 0,
                    color: "#006AF5",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={6}>
            <Card sx={{ height: "100%" }}>
              <CardHeader title="Student Status" />
              <CardContent
                sx={{ position: "relative", padding: 2, pl: 3, pr: 3 }}
              >
                <Typography variant="body1">{`Active`}</Typography>
                <LinearProgressWithLabel
                  value={(() => {
                    const result = (activeStudentStatus / facultyStudent) * 100;

                    const finalResult = isNaN(result) ? 0 : result;

                    return finalResult;
                  })()}
                  color="success"
                />
                <Typography variant="body1">{`Non-active`}</Typography>
                <LinearProgressWithLabel
                  value={(() => {
                    const result =
                      (inActiveStudentStatus / facultyStudent) * 100;

                    const finalResult = isNaN(result) ? 0 : result;

                    return finalResult;
                  })()}
                  color="warning"
                />
                <BubbleChartIcon
                  sx={{
                    position: "absolute",
                    right: 0,
                    fontSize: 40,
                    bottom: 0,
                    color: "#006AF5",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Div>
  );
};

export default Dashboard;
