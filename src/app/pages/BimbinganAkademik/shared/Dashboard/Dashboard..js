import {
  Card,
  Container,
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
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import Header from "app/layouts/shared/headers/Header";

const COLORS = ["#8884d8", "#82ca9d"];

const data = [
  {
    year: null,
    IF: 10,
    DKV: 2,
    SI: 17,
  },
  {
    year: "2020",
    SI: 2,
    DKV: 2,
    IF: 6,
  },
];

const data02 = [
  {
    category: "Local",
    count: 1,
  },
  {
    category: "National",
    count: 2,
  },
  {
    category: "International",
    count: 2,
  },
];

const data03 = [...Array(5).keys()].map((i) => ({
  title: "Menang lomba desain prototype",
  name: "Mukesh K",
  profileImage:
    "https://www.mecgale.com/wp-content/uploads/2017/08/dummy-profile.png",
  submiteDate: "11 September 2023",
  status: "Waiting",
}));

const data04 = [...Array(4).keys()].map((_) => ({
  nim: "105022010000",
  name: "Yuhu, Christopher Darell",
  profileImage:
    "https://img.freepik.com/free-photo/business-finance-employment-female-successful-entrepreneurs-concept-friendly-smiling-office-manager-greeting-new-coworker-businesswoman-welcome-clients-with-hand-wave-hold-laptop_1258-59122.jpg?w=740&t=st=1696821634~exp=1696822234~hmac=71482abe3c3e1282d09976b8ebc39f7b50eb50eaa2a32f443094b12028a42cfe",
  semester: "1",
  prodi: "Informatika",
  status: "Waiting",
}));

const statusColor = (status) => {
  switch (status.toLowerCase()) {
    case "waiting":
      return "warning.main";
    case "approved":
      return "success.main";
    case "rejected":
      return "error.main";
    default:
      return "black";
  }
};

const Dashboard = () => {
  const [distributionData, setDistributionData] = useState([]);
  const [myMajor, setMyMajor] = useState("");
  const [majorStudent, setMajorStudent] = useState([]);
  const [facultyStudent, setFacultyStudent] = useState(0);
  const [activeStudentStatus, setActiveStudentStatus] = useState([]);
  const [inActiveStudentStatus, setInActiveStudentStatus] = useState([]);
  const [certificateData, setCertificateData] = useState([]);
  const role = JSON.parse(localStorage.getItem("user")).role;

  useEffect(() => {
    getDataDistributionStudent();
    getMajorStudent();
    getFacultyStudent();
    getMyDataProfile();
    getActiveStudentStatus();
    getInactiveStudentStatus();
    getCertificateData();
  }, []);

  useEffect(() => {}, [distributionData]);
  const getMyDataProfile = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_API}/employee/${
          JSON.parse(localStorage.getItem("user")).id
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMyMajor(response.data.data.major);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCertificateData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_API}/dashboard/statistc/categoryCertificate`
      );

      setCertificateData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDataDistributionStudent = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_API}/dashboard/statistic/majorStudent/arrivalYear`
      );

      // setDistributionData(response.data.data);
      const apiData = response.data.data;

      setDistributionData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMajorStudent = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_API}/dashboard/statistic/majorStudent/`
      );

      console.log(response.data);

      setMajorStudent(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFacultyStudent = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_API}/dashboard/statistic/faculty/`
      );

      console.log(response.data);

      setFacultyStudent(response.data.data[0].count);
    } catch (error) {
      console.log(error);
    }
  };

  const getActiveStudentStatus = async () => {
    try {
      if (role.includes("KAPRODI")) {
        const response = await axios.get(
          `${BASE_URL_API}/dashboard/statistic/majorStudent/active`
        );

        console.log(response.data);

        setActiveStudentStatus(response.data.data);
      } else {
        const response = await axios.get(
          `${BASE_URL_API}/dashboard/statistic/faculty/active`
        );

        console.log(response.data);

        setActiveStudentStatus(response.data.data[0].count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getInactiveStudentStatus = async () => {
    try {
      if (role.includes("KAPRODI")) {
        const response = await axios.get(
          `${BASE_URL_API}/dashboard/statistic/majorStudent/inActive`
        );

        console.log(response.data);

        setInActiveStudentStatus(response.data.data);
      } else {
        const response = await axios.get(
          `${BASE_URL_API}/dashboard/statistic/faculty/inActive`
        );

        console.log(response.data);

        setInActiveStudentStatus(response.data.data[0].count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7}>
          <Card sx={{ width: "100%" }}>
            <CardHeader title="Distribution of students" />
            <CardContent style={{ width: "100%" }}>
              <ResponsiveContainer width="100%" height={250}>
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
              <ResponsiveContainer width={"100%"} height={250}>
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
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        {role.includes("DEKAN") ? (
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
                      const result =
                        (activeStudentStatus / facultyStudent) * 100;
                      // console.log("ini result e: ", result);

                      // Memeriksa apakah hasil kalkulasi adalah NaN
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

                      // Memeriksa apakah hasil kalkulasi adalah NaN
                      const finalResult = isNaN(result) ? 0 : result;
                      // console.log("ini result e: ", result);

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
        ) : role.includes("KAPRODI") ? (
          <Grid item container spacing={2} xs={12} sm={12} md={12} xl={12}>
            <Grid item xs={12} sm={6} md={6} xl={6}>
              <Card sx={{ height: "100%" }}>
                <CardHeader title="Number of Study Program Students" />
                <CardContent
                  sx={{ position: "relative", padding: 2, pl: 3, pr: 3 }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 38, md: 40, lg: 38, xl: 50 },
                      color: "#006AF5",
                    }}
                  >
                    {`${
                      (majorStudent &&
                        majorStudent.find((major) => major.major === myMajor)
                          ?.count) ||
                      0
                    } peoples`}
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
                      const studentActiveCount = activeStudentStatus.find(
                        (item) => item.major === myMajor
                      );
                      const allStudentCount = majorStudent.find(
                        (item) => item.major === myMajor
                      );

                      const result =
                        (studentActiveCount?.count / allStudentCount?.count) *
                        100;
                      // console.log("ini result e: ", result);

                      // Memeriksa apakah hasil kalkulasi adalah NaN
                      const finalResult = isNaN(result) ? 0 : result;

                      return finalResult;
                    })()}
                    color="success"
                  />
                  <Typography variant="body1">{`Non-active`}</Typography>
                  <LinearProgressWithLabel
                    value={(() => {
                      const studentInActiveCount = inActiveStudentStatus.find(
                        (item) => item.major === myMajor
                      );
                      const allStudentCount = majorStudent.find(
                        (item) => item.major === myMajor
                      );

                      const result =
                        (studentInActiveCount?.count / allStudentCount?.count) *
                        100;

                      // Memeriksa apakah hasil kalkulasi adalah NaN
                      const finalResult = isNaN(result) ? 0 : result;
                      // console.log("ini result e: ", result);

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
        ) : (
          <div>setang</div>
        )}
        {/* <Grid item container spacing={2} xs={12} sm={12} md={12} xl={12}>
            <Grid item xs={12} sm={6} md={6} xl={6}>
              <Card sx={{ height: "100%" }}>
                <CardHeader title="Number of Study Program Students" />
                <CardContent
                  sx={{ position: "relative", padding: 2, pl: 3, pr: 3 }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 38, md: 40, lg: 38, xl: 50 },
                      color: "#006AF5",
                    }}
                  >
                    {`${
                      (majorStudent &&
                        majorStudent.find((major) => major.major === myMajor)
                          ?.count) ||
                      0
                    } peoples`}
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
                      const studentActiveCount = activeStudentStatus.find(
                        (item) => item.major === myMajor
                      );
                      const allStudentCount = majorStudent.find(
                        (item) => item.major === myMajor
                      );

                      const result =
                        (studentActiveCount?.count / allStudentCount?.count) *
                        100;
                      console.log("ini result e: ", result);

                      // Memeriksa apakah hasil kalkulasi adalah NaN
                      const finalResult = isNaN(result) ? 0 : result;

                      return finalResult;
                    })()}
                    color="success"
                  />
                  <Typography variant="body1">{`Non-active`}</Typography>
                  <LinearProgressWithLabel
                    value={(() => {
                      const studentInActiveCount = inActiveStudentStatus.find(
                        (item) => item.major === myMajor
                      );
                      const allStudentCount = majorStudent.find(
                        (item) => item.major === myMajor
                      );

                      const result =
                        (studentInActiveCount?.count / allStudentCount?.count) *
                        100;

                      // Memeriksa apakah hasil kalkulasi adalah NaN
                      const finalResult = isNaN(result) ? 0 : result;
                      console.log("ini result e: ", result);

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
          </Grid> */}
      </Grid>
    </Div>
  );
};

export default Dashboard;
