import {
  Grid,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Breadcrumbs,
  experimentalStyled as styled,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const tableData1 = [
  {
    number: 1,
    code: "MATH000",
    name: "Matematika/ Mathematics",
    credit: 3,
    grade: "-",
    type: "General",
    prerequisite: "-",
    lecturer: "Sandag, Green A",
    status: "-",
  },
  {
    number: 2,
    code: "IF1112",
    name: "Dasar Aljabar Linear/ Aljabar Linear Fundamental",
    credit: 3,
    grade: "-",
    type: "Major",
    prerequisite: "- [MATH000] Matematika/ Mathematics - 2 credit(s)",
    lecturer: "Sondakh, Debby Erce",
    status: "-",
  },
  {
    number: 3,
    code: "MATH000",
    name: "Matematika/ Mathematics",
    credit: 2,
    grade: "-",
    type: "General",
    prerequisite: "- [MATH000] Matematika/ Mathematics - 2 credit(s)",
    lecturer: "Sengkey, Virginia",
    status: "-",
  },
  {
    number: 4,
    code: "IF1112",
    name: "Dasar Aljabar Linear/ Aljabar Linear Fundamental",
    credit: 3,
    grade: "-",
    type: "General",
    prerequisite: "-",
    lecturer: "Sandag, Green A",
    status: "-",
  },
  {
    number: 5,
    code: "MATH000",
    name: "Matematika/ Mathematics",
    credit: 2,
    grade: "-",
    type: "Major",
    prerequisite: "-",
    lecturer: "Adam, Stenly",
    status: "-",
  },
  {
    number: 6,
    code: "IF1112",
    name: "Dasar Aljabar Linear/ Aljabar Linear Fundamental",
    credit: 3,
    grade: "-",
    type: "Major",
    prerequisite: "- [MATH000] Matematika/ Mathematics - 2 credit(s)",
    lecturer: "Sandag, Green A",
    status: "-",
  },
  {
    number: 7,
    code: "FILG182",
    name: "Teladan Kehidupan II/ The Exemplary Living II",
    credit: 2,
    grade: "-",
    type: "Major",
    prerequisite: "-",
    lecturer: "Sandag, Green A",
    status: "-",
  },
];

const TableItem = ({ data }) => (
  <TableRow>
    <TableCell>{data.number}</TableCell>
    <TableCell>{data.code}</TableCell>
    <TableCell>{data.name}</TableCell>
    <TableCell>{data.credit}</TableCell>
    <TableCell>{data.grade}</TableCell>
    <TableCell>{data.type}</TableCell>
    <TableCell>{data.prerequisite}</TableCell>
    <TableCell>{data.status}</TableCell>
  </TableRow>
);

const PreRegistrationRejected = () => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };
  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>History</StyledLink>
          <Typography color="text.primary">Pre-registration</Typography>
        </Breadcrumbs>
      </div>
      <Typography
        fontSize={"24px"}
        fontWeight="500"
        sx={{ marginBottom: 2, paddingTop: "20px" }}
      >
        Courses Pre-registration
      </Typography>
      <Grid container>
        <Grid item id="detail-item">
          <Grid container>
            <Grid item md={"auto"}>
              <Stack>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Student Name
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Supervisor Name
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Submission Date
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Approval Date
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Status
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Category
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Descriptions
                </Typography>
              </Stack>
            </Grid>
            <Grid item md={"auto"}>
              <Stack paddingX={1}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  :
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  :
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  :
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  :
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  :
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  :
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  :
                </Typography>
              </Stack>
            </Grid>
            <Grid item md={10}>
              <Stack>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Awuy, Diany Mariska
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Adzanu, Shaliha Alifyaa
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  10 May 2000
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  11 May 2000
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ marginBottom: 2, color: "#CA150C" }}
                >
                  Rejected
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Seminar
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Saya ingin mengambil kembali mata kuliah “Pengantar Basisdata/
                  Introduction to Database” karena tidak pass di pengambilan
                  sebelumnya
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>{" "}
      <Stack spacing={2} sx={{ marginTop: 3, paddingBottom: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Comments from Supervisor
        </Typography>
        <Paper elevation={0} variant="outlined" fullWidth>
          <Typography variant="body1" sx={{ p: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            commodo nunc in ligula tempus, sed feugiat justo vestibulum. Etiam
            pellentesque, odio vel facilisis posuere, urna velit gravida est, eu
            pharetra massa tortor eget quam.
          </Typography>
        </Paper>
      </Stack>
      <TableContainer
        sx={{ overflow: "auto", marginTop: 4, backgroundColor: "white" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
            <TableRow>
              <TableCell sx={{ width: "40px" }}>Number</TableCell>
              <TableCell sx={{ width: "40px" }}>Code</TableCell>
              <TableCell sx={{ width: "400px" }}>Subject Name</TableCell>
              <TableCell sx={{ width: "40px" }}>Credit(s)</TableCell>
              <TableCell sx={{ width: "40px" }}>Grade</TableCell>
              <TableCell sx={{ width: "200px" }}>Type </TableCell>
              <TableCell sx={{ width: "380px" }}>Prerequisite</TableCell>
              <TableCell sx={{ width: "110px" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData1.map((data, index) => (
              <TableItem key={index} data={data} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PreRegistrationRejected;
