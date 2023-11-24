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
import { useState } from "react";

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4} md={3} xl={2}>
              <Typography variant="h5">Student Name</Typography>
            </Grid>
            <Grid item xs={1} xl={"auto"}>
              <Typography variant="h5">:</Typography>
            </Grid>
            <Grid item xs={7} paddingLeft={1}>
              <Typography variant="h5">Awuy, Diany Mariska</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4} md={3} xl={2}>
              <Typography variant="h5">Supervisor Name</Typography>
            </Grid>
            <Grid item xs={1} xl={"auto"}>
              <Typography variant="h5">:</Typography>
            </Grid>
            <Grid item xs={7} paddingLeft={1}>
              <Typography variant="h5">Dengah, Mesakh Leonardo</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4} md={3} xl={2}>
              <Typography variant="h5">Submission Date</Typography>
            </Grid>
            <Grid item xs={1} xl={"auto"}>
              <Typography variant="h5">:</Typography>
            </Grid>
            <Grid item xs={7} paddingLeft={1}>
              <Typography variant="h5">November 14, 2023</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4} md={3} xl={2}>
              <Typography variant="h5">Approval Date</Typography>
            </Grid>
            <Grid item xs={1} xl={"auto"}>
              <Typography variant="h5">:</Typography>
            </Grid>
            <Grid item xs={7} paddingLeft={1}>
              <Typography variant="h5">November 16, 2023</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4} md={3} xl={2}>
              <Typography variant="h5">Status</Typography>
            </Grid>
            <Grid item xs={1} xl={"auto"}>
              <Typography variant="h5">:</Typography>
            </Grid>
            <Grid item xs={7} paddingLeft={1}>
              <Typography variant="h5" sx={{ color: "red" }}>
                Rejected
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4} md={3} xl={2}>
              <Typography variant="h5">Descriptions</Typography>
            </Grid>
            <Grid item xs={1} xl={"auto"}>
              <Typography variant="h5">:</Typography>
            </Grid>
            <Grid item xs={7} paddingLeft={1}>
              <Typography variant="h5">
                Saya ingin mengambil kembali mata kuliah “Pengantar Basisdata/
                Introduction to Database” karena tidak pass di pengambilan
                sebelumnya
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
        sx={{
          maxHeight: 640,
        }}
        component={Paper}
      >
        <Table stickyHeader>
          <TableHead>
            <TableHeading />
          </TableHead>
          <TableBody>
            {tableData1
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data, index) => (
                <TableItem data={data} index={index} key={index} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const TableHeading = ({ index }) => {
  const style = { fontWeight: 400 };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
      <TableCell sx={[style]}>Number</TableCell>
      <TableCell sx={[style]}>Code</TableCell>
      <TableCell sx={[style]}>Subject Name</TableCell>
      <TableCell sx={[style]}>Credit(s)</TableCell>
      <TableCell sx={[style]}>Grade</TableCell>
      <TableCell sx={[style]}>Type</TableCell>
      <TableCell sx={[style]}>Prerequisite</TableCell>
      <TableCell sx={[style]}>Status</TableCell>
    </TableRow>
  );
};

export default PreRegistrationRejected;
