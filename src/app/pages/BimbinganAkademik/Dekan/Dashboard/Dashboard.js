import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LinearProgressWithLabel from "app/shared/LinearProgressWithLabel";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import Div from "@jumbo/shared/Div";
import moment from "moment";
import { Link } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];

const data02 = [
  {
    name: "Local",
    value: 2400,
  },
  {
    name: "National",
    value: 4567,
  },
  {
    name: "International",
    value: 1398,
  },
];

const data03 = [...Array(10).keys()].map((i) => ({
  title: "Menang lomba desain prototype",
  name: "Mukesh K",
  profileImage:
    "https://www.mecgale.com/wp-content/uploads/2017/08/dummy-profile.png",
  submiteDate: "11 September 2023",
  status: "Waiting",
}));

const data04 = [...Array(10).keys()].map((_) => ({
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
  return (
    <Div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Card style={{ width: "100%" }}>
            <CardHeader title="Distribution of students" />
            <CardContent style={{ width: "100%" }}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Stack gap={2}>
            <Card>
              <CardHeader title="Number of Guidance Students" />
              <CardContent sx={{ position: "relative", paddingY: 0 }}>
                <Typography
                  variant="h3"
                  color="#006AF5"
                >{`85 people`}</Typography>
                <Typography variant="caption">{`last updated: 11 September 2023`}</Typography>
                <PeopleOutlinedIcon
                  sx={{
                    position: "absolute",
                    right: 0,
                    fontSize: 50,
                    bottom: 0,
                    color: "#006AF5",
                  }}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader title="Student Status" />
              <CardContent
                sx={{ position: "relative", paddingRight: 6.5, paddingY: 0 }}
              >
                <Typography variant="body1">{`Active`}</Typography>
                <LinearProgressWithLabel value={80} />
                <Typography variant="body1">{`Non-active`}</Typography>
                <LinearProgressWithLabel value={20} color="warning" />
                <BubbleChartIcon
                  sx={{
                    position: "absolute",
                    right: 0,
                    fontSize: 50,
                    bottom: 0,
                    color: "#006AF5",
                  }}
                />
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader title="Certificate" />
            <CardContent>
              <ResponsiveContainer width={"100%"} height={250}>
                <PieChart>
                  <Pie
                    data={data02}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#82ca9d"
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
      </Grid>
    </Div>
  );
};

export default Dashboard;
