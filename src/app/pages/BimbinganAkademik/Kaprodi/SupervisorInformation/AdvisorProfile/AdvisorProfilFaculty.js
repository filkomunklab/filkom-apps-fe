import {
  Paper,
  Typography,
  Grid,
  TextField,
  Stack,
  MenuItem,
  Select,
  FormControl,
  ListSubheader,
  InputLabel,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  TablePagination,
  Chip,
  Button,
  Breadcrumbs,
  experimentalStyled as styled,
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import { useState } from "react";
import SearchLocal from "app/shared/SearchLocal";
import { useNavigate, Link } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const data = Array.from(Array(15).keys()).map((item, index) => ({
  nim: `105022010000`,
  name: `Yuhu, Christopher Darell`,
  prodi: `Informatika`,
  year: `2021`,
  status: `Active`,
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

const AdvisorProfileFaculty = () => {
  const [showLabel, setShowLabel] = useState(true);
  const [pilihJurusan, setPilihJurusan] = useState("");

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

  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };
  const handleUbahJurusan = (event) => {
    setPilihJurusan(event.target.value);
  };

  const handleUbahJurusanDanKlik = (event) => {
    handleUbahJurusan(event);
    handleClick(event);
    setShowLabel(false);
  };

  return (
    <Div>
      <Div
        role="presentation"
        onClick={handleClick}
        sx={{ paddingBottom: "15px" }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>Supervisor Information</StyledLink>
          <Typography color="text.primary">Advisor Profile</Typography>
        </Breadcrumbs>
      </Div>
      <Div>
        <Typography variant="h1" fontWeight={500} sx={{ mb: 3 }}>
          Advisor Profile
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Currently, you are on the Academic Supervisor Information page, here
          you can easily see all information about academic supervisors in your
          department, along with their students.
        </Typography>
      </Div>
      <Paper elevation={1} sx={{ mb: 5 }}>
        <Typography
          variant="h5"
          sx={{
            backgroundColor: "#1A38601A",
            fontWeight: 500,
            padding: "16px",
          }}
        >
          Academic Advisor Information
        </Typography>
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Full Name</Typography>
            <Typography variant="h6" sx={textSyle}>
              Adzana Shaliha
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">NIDN</Typography>
            <Typography variant="h6" sx={textSyle}>
              319288918900
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Email</Typography>
            <Typography variant="h6" sx={textSyle}>
              AdzanaShaliha123@gmail.com
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Phone</Typography>
            <Typography variant="h6" sx={textSyle}>
              082919912400
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Major</Typography>
            <Typography variant="h6" sx={textSyle}>
              Informatics
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Address</Typography>
            <Typography variant="h6" sx={textSyle}>
              Perum Agape griya blok K/10, Tumaluntung, Kabupaten Minahasa Utara
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        <Grid item md={4} display="flex" alignItems="center">
          <Typography variant="h2">List of mentored students</Typography>
        </Grid>
        <Grid
          item
          md={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <SearchLocal sx={{ height: "100%", alignItems: "center" }} />
        </Grid>
        <Grid
          item
          md={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
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
        <Grid item md={2} display="flex" alignItems="center">
          <Link to={`/add-supervisor/informatics`}>
            <Button
              sx={{
                backgroundColor: "#006AF5",
                borderRadius: "24px",
                color: "white",
                whiteSpace: "nowrap",
                minWidth: "132px",
                fontSize: "12px",
                padding: "10px",

                "&:hover": {
                  backgroundColor: "#025ED8",
                },
              }}
            >
              Edit Student
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

const textSyle = {
  borderWidth: 1,
  borderColor: "#00000029",
  borderStyle: "solid",
  paddingX: "24px",
  paddingY: "16px",
  borderRadius: "8px",
};

const TableItem = ({ item, index }) => {
  const navigate = useNavigate();
  const handleButtonNavigate = (event) => {
    const { name } = event.currentTarget;
    switch (name) {
      case "profile":
        navigate(
          `/bimbingan-akademik/kaprodi/supervisor-information/student-information/${item.nim}`
        );
        break;
      case "grade":
        navigate(
          `/bimbingan-akademik/kaprodi/supervisor-information/${item.nim}/grade`
        );
        break;
      case "certificate":
        navigate(
          `/bimbingan-akademik/kaprodi/supervisor-information/${item.nim}/certificate`
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

export default AdvisorProfileFaculty;
