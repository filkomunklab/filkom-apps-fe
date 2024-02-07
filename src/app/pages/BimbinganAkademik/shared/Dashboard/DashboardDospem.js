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
import jwtAuthAxios from "app/services/Auth/jwtAuth";

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

const Dashboard = () => {
  const [guidanceStudent, setGuidanceStudent] = useState(0);
  const [activeStudentStatus, setActiveStudentStatus] = useState([]);
  const [inActiveStudentStatus, setInActiveStudentStatus] = useState([]);

  useEffect(() => {
    getGuidanceStudent();
    // getMyDataProfile();
    getActiveStudentStatus();
    getInactiveStudentStatus();
  }, []);

  // const getMyDataProfile = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${BASE_URL_API}/employee/${
  //         JSON.parse(localStorage.getItem("user")).id
  //       }`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     setMyMajor(response.data.data.major);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const getGuidanceStudent = async () => {
    try {
      const response = await jwtAuthAxios.get(
        `/dashboard/statistic/studentGuidance`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log(response.data);

      setGuidanceStudent(response.data.data[0].count);
    } catch (error) {
      console.log(error);
    }
  };

  const getActiveStudentStatus = async () => {
    try {
      const response = await jwtAuthAxios.get(
        `/dashboard/statistic/studentGuidance/Active`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);

      setActiveStudentStatus(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getInactiveStudentStatus = async () => {
    try {
      const response = await jwtAuthAxios.get(
        `/dashboard/statistic/studentGuidance/inActive`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);

      setInActiveStudentStatus(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Div>
      <Grid container spacing={2}>
        <Grid item container spacing={2} xs={12} sm={12} md={12} xl={12}>
          <Grid item xs={12} sm={6} md={6} xl={6}>
            <Card sx={{ height: "100%" }}>
              <CardHeader title="Number of Students" />
              <CardContent
                sx={{ position: "relative", padding: 2, pl: 3, pr: 3 }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 38, md: 40, lg: 38, xl: 50 },
                    color: "#006AF5",
                  }}
                >
                  {`${guidanceStudent} people`}
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
                      (activeStudentStatus / guidanceStudent) * 100;
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
                      (inActiveStudentStatus / guidanceStudent) * 100;

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
      </Grid>
    </Div>
  );
};

export default Dashboard;
