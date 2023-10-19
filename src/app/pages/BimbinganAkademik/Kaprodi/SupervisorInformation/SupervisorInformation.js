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
  const [showLabel, setShowLabel] = useState(true);

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
        <Typography
          variant="h6"
          sx={{
            paddingBottom: "8px",
            fontSize: "15px",
            fontWeight: 400,
            color: "rgba(27, 43, 65, 0.69)",
          }}
        >
          Currently, you are on the Academic Supervisor Information page, here
          you can easily see all information about academic supervisors in your
          department, along with their students.
        </Typography>
      </Div>

      <Grid container spacing={2} marginTop={1}>
        <Grid display={"flex"} alignItems={"flex-end"} item md={6}>
          <Typography variant="h2">Informatics Supervisor List</Typography>
        </Grid>
        <Grid item md={3}>
          <SearchGlobal sx={{ height: "100%" }} />
        </Grid>
        <Grid item md={3}>
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <InputLabel shrink={false}>{showLabel ? "Filter" : ""}</InputLabel>
            <Select
              sx={{ borderRadius: 50 }}
              multiple
              value={filter}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: "37%",
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <ListSubheader sx={{ color: "black", fontFamily: "inherit" }}>
                Status
              </ListSubheader>
              <MenuItem value={"activeStudent"}>Active</MenuItem>
              <MenuItem value={"nonactiveStudent"}>Nonactive</MenuItem>
              <ListSubheader sx={{ color: "black", fontFamily: "inherit" }}>
                Tahun Masuk
              </ListSubheader>
              {yearList.map((item) => (
                <MenuItem
                  key={item.value}
                  value={item.value}
                  sx={{
                    backgroundColor: "#FAFAFA",
                    borderRadius: "5px",
                    margin: "5px",
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
              <Div>
                <ListSubheader sx={{ color: "black", fontFamily: "inherit" }}>
                  Prodi
                </ListSubheader>
                {prodiList.map((item) => (
                  <MenuItem
                    key={item.value}
                    onChange={(event) => console.log(event.currentTarget.value)}
                    value={item.value}
                    sx={{
                      backgroundColor: "#FAFAFA",
                      borderRadius: "5px",
                      justifyContent: "center",
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Div>
            </Select>
          </FormControl>
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
    navigate(`/bimbingan-akademik/student-information/${item.nidn}`);

    switch (name) {
      case "profile":
        navigate(`/bimbingan-akademik/student-information/${item.nidn}`);
        break;
      case "history":
        navigate(
          `/bimbingan-akademik/student-information/${item.nidn}/history`
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
