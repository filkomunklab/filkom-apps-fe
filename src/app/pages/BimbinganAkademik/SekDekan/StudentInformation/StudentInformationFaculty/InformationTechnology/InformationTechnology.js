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
  Breadcrumbs,
  experimentalStyled as styled,
} from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",
  "&:hover": {
    textDecoration: "underline",
  },
}));

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
  nim: `105022010000`,
  name: `Yuhu, Christopher Darell`,
  prodi: `Informatika`,
  year: `2021`,
  status: `Active`,
}));

const InformationTechnology = () => {
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <Div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/sek-dekan/student-information">
            Student Information
          </StyledLink>
          <Typography color="text.primary">Information Technology</Typography>
        </Breadcrumbs>
      </div>
      <Grid container spacing={2} paddingTop={1}>
        <Grid display={"flex"} alignItems={"flex-end"} item md={6}>
          <Typography variant="h2">
            Information Technology Students List
          </Typography>
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
            <InputLabel htmlFor="grouped-select">Filter</InputLabel>
            <Select
              sx={{ borderRadius: 50 }}
              multiple
              value={filter}
              label="Grouping"
              renderValue={(selected) => selected.join(", ")}
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
      <TableCell sx={[style]}>NIM</TableCell>
      <TableCell sx={[style]}>Student Name</TableCell>
      <TableCell sx={[style]}>Program Studi</TableCell>
      <TableCell sx={[style]}>Tahun Masuk</TableCell>
      <TableCell sx={[style]}>Nilai</TableCell>
      <TableCell sx={[style]}>Sertifikat</TableCell>
      <TableCell sx={[style]}>Status</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index }) => {
  const navigate = useNavigate();
  const handleButtonNavigate = (event) => {
    const { name } = event.currentTarget;
    navigate(`/bimbingan-akademik/sek-dekan/student-information/${item.nim}`);

    switch (name) {
      case "profile":
        navigate(
          `/bimbingan-akademik/sek-dekan/student-information/${item.nim}`
        );
        break;
      case "grade":
        navigate(
          `/bimbingan-akademik/sek-dekan/student-information/${item.nim}/grade`
        );
        break;
      case "certificate":
        navigate(
          `/bimbingan-akademik/sek-dekan/student-information/${item.nim}/certificate`
        );
        break;

      default:
        console.log("Path not found");
    }
  };
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{`105022010000`}</TableCell>
      <TableCell>
        <Button
          name="profile"
          sx={{ textTransform: "capitalize" }}
          onClick={handleButtonNavigate}
        >{`Yuhu, Christopher Darell`}</Button>
      </TableCell>
      <TableCell>{`Informatika`}</TableCell>
      <TableCell>{`2021`}</TableCell>

      <TableCell>
        <Button
          name="grade"
          onClick={handleButtonNavigate}
          sx={{ textTransform: "capitalize" }}
        >
          View Grades
        </Button>
      </TableCell>
      <TableCell>
        <Button
          name="certificate"
          onClick={handleButtonNavigate}
          sx={{ textTransform: "capitalize" }}
        >
          View Certificates
        </Button>
      </TableCell>
      <TableCell>
        <Chip label={"Active"} variant="filled" color={"success"} />
      </TableCell>
    </TableRow>
  );
};

export default InformationTechnology;
