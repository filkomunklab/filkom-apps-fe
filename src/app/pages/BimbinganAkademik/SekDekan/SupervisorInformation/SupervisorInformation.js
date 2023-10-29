import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const yearList = [
  {
    value: "2017",
    label: "2017",
  },
  {
    value: "2018",
    label: "2018",
  },
  {
    value: "2019",
    label: "2019",
  },
  {
    value: "2020",
    label: "2020",
  },
  {
    value: "2021",
    label: "2021",
  },
  {
    value: "2022",
    label: "2022",
  },
  {
    value: "2023",
    label: "2023",
  },
];

const prodiList = [
  {
    value: "informatika",
    label: "Informatika",
  },
  {
    value: "dkv",
    label: "DKV",
  },
  {
    value: "si",
    label: "SI",
  },
];

const data = Array.from(Array(15).keys()).map((item, index) => ({
  nidn: `105022010000`,
  name: `Yuhu, Christopher Darell`,
  prodi: `Informatika`,
  year: `2021`,
  status: `Active`,
}));

const SupervisorInformation = () => {
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Div>
      <Div>
        <Typography variant="h1" sx={{ mb: 3 }}>
          Supervisor Information
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Currently, you are on the Academic Supervisor Information page, here
          you can easily see all information about academic supervisors in your
          department, along with their students.
        </Typography>
      </Div>
      <Grid container spacing={2} sx={{ mb: 5, mt: 2 }}>
        <Grid item sm={12} md={12} lg={4} xs={12}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#E5F0FF",
              },
            }}
            onClick={() =>
              navigate(
                "/bimbingan-akademik/sek-dekan/supervisor-information/informatics"
              )
            }
          >
            <Grid container>
              <Grid item>
                <CardHeader title="Informatics Supervisor " />
                <CardContent sx={{ position: "relative", paddingY: 0 }}>
                  <Typography variant="h3" color="#006AF5" fontSize="20px">
                    {`11 people`}
                  </Typography>
                  <Typography variant="caption">
                    {`last updated: 11 September 2023`}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item sm={12} md={12} lg={4} xs={12}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#E5F0FF",
              },
            }}
            onClick={() =>
              navigate(
                "/bimbingan-akademik/sek-dekan/supervisor-information/information-system"
              )
            }
          >
            <Grid container>
              <Grid item>
                <CardHeader title="Information System Supervisor" />
                <CardContent sx={{ position: "relative", paddingY: 0 }}>
                  <Typography variant="h3" color="#006AF5" fontSize="20px">
                    {`12 people`}
                  </Typography>
                  <Typography variant="caption">
                    {`last updated: 11 September 2023`}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item sm={12} md={12} lg={4} xs={12}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#E5F0FF",
              },
            }}
            onClick={() =>
              navigate(
                "/bimbingan-akademik/sek-dekan/supervisor-information/information-technology"
              )
            }
          >
            <Grid container>
              <Grid item>
                <CardHeader title="Information Technology Supervisor " />
                <CardContent sx={{ position: "relative", paddingY: 0 }}>
                  <Typography variant="h3" color="#006AF5" fontSize="20px">
                    {`8 people`}
                  </Typography>
                  <Typography variant="caption">
                    {`last updated: 11 September 2023`}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid display={"flex"} alignItems={"flex-end"} item md={6}>
          <Typography variant="h2">List of Academic Supervisors</Typography>
        </Grid>
        <Grid item md={4}>
          <SearchGlobal sx={{ height: "100%", width: "100%" }} />
        </Grid>
        <Grid
          item
          md={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/bimbingan-akademik/sek-dekan/supervisor-information/add-supervisor"
          >
            <Button
              sx={{
                backgroundColor: "#006AF5",
                borderRadius: "24px",
                color: "white",
                whiteSpace: "nowrap",
                minWidth: "132px",
                fontSize: "12px",
                padding: "10px",
                gap: "6px",

                "&:hover": {
                  backgroundColor: "#025ED8",
                },
              }}
            >
              <AddIcon sx={{ fontSize: "14px" }} />
              Add Dosen
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableHeading />
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableItem item={item} index={index} key={index} />
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component={"div"}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </Div>
  );
};

const TableHeading = ({ index }) => {
  const style = { fontWeight: 400 };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
      <TableCell sx={[style]}>No</TableCell>
      <TableCell sx={[style]}>NIDN</TableCell>
      <TableCell sx={[style]}>Name</TableCell>
      <TableCell sx={[style]}>Faculty</TableCell>
      <TableCell sx={[style]}>History</TableCell>
      <TableCell sx={[style]}>Number of Student</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index }) => {
  const navigate = useNavigate();
  const handleButtonNavigate = (event) => {
    const { name } = event.currentTarget;

    switch (name) {
      case "profile":
        navigate(
          `/bimbingan-akademik/sek-dekan/supervisor-information/advisor-profile/${item.nidn}`
        );
        break;
      case "history":
        navigate(
          `/bimbingan-akademik/sek-dekan/supervisor-information/history`
        );
        break;

      default:
        console.log("Path not found");
    }
  };
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{`022407712`}</TableCell>
      <TableCell>
        <Button
          name="profile"
          sx={{ textTransform: "capitalize" }}
          onClick={handleButtonNavigate}
        >{`Yuhu, Christopher Darell`}</Button>
      </TableCell>
      <TableCell>{`Informatika`}</TableCell>
      <TableCell>
        <Button
          name="history"
          onClick={handleButtonNavigate}
          sx={{ textTransform: "capitalize" }}
        >
          View History
        </Button>
      </TableCell>
      <TableCell>{`25`}</TableCell>
    </TableRow>
  );
};

export default SupervisorInformation;
