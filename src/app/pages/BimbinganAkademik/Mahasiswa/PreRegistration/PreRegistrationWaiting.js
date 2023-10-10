import Div from "@jumbo/shared/Div";
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
} from "@mui/material";

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

const PreRegistrationWaiting = () => {
  return (
    <Div>
      <Typography fontSize={"24px"} fontWeight="500" sx={{ marginBottom: 2 }}>
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
                  sx={{ marginBottom: 2, color: "#FFCC00" }}
                >
                  Waiting
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
      </Grid>
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
    </Div>
  );
};

export default PreRegistrationWaiting;
