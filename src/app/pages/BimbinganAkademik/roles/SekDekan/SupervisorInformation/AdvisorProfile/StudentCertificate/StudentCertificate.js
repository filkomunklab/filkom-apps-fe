import Div from "@jumbo/shared/Div";
import {
  FormControl,
  Grid,
  Paper,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  experimentalStyled as styled,
  ListSubheader,
  Breadcrumbs,
} from "@mui/material";
import SearchLocal from "app/shared/SearchLocal";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

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

const data = [...Array(15)].map(() => ({
  submissionDate: "10 May 2000",
  title: "Menang Lomba Desain Prototype",
  category: "Faculty",
  certifacePhoto: "Sertifikat menang lomba.pdf",
  description:
    "Saya mengikuti lomba desain prototype website kampus yang diselenggarakan oleh Fakultas Ilmu Komputer",
  status: "Approved",
}));

const StudentCertificate = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();
  const handleClick = (event, step) => {
    event.preventDefault();
    navigate(step);
  };

  return (
    <Div>
      <Div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink onClick={(event) => handleClick(event, -2)}>
            Supervisor Information
          </StyledLink>
          <StyledLink onClick={(event) => handleClick(event, -1)}>
            Advisor Profile
          </StyledLink>
          <Typography color="text.primary">Student Certificate</Typography>
        </Breadcrumbs>
      </Div>
      <Stack gap={3} paddingTop={3}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h1" fontWeight={500}>
            All Certifications
          </Typography>
          <Typography variant="h6">Yuhu, Darell Deil</Typography>
        </Stack>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item md={6}>
            <Typography variant="h6">
              Here is the data of the attached certificates belonging to this
              student.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={3}>
            <SearchLocal
              sx={{
                height: "100%",
                "@media (max-width: 390px)": {
                  height: "40px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <FormControl
              sx={{
                width: "100%",
              }}
            >
              <InputLabel>Filter</InputLabel>
              <Select
                sx={{
                  borderRadius: 50,
                  "@media (max-width: 390px)": {
                    height: "45px",
                  },
                }}
                multiple
                value={filter}
                label="Grouping"
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
                <MenuItem
                  sx={{
                    backgroundColor: "#FAFAFA",
                    borderRadius: "5px",
                  }}
                  value={"activeStudent"}
                >
                  Active
                </MenuItem>
                <MenuItem
                  sx={{
                    backgroundColor: "#FAFAFA",
                    borderRadius: "5px",
                  }}
                  value={"nonactiveStudent"}
                >
                  Nonactive
                </MenuItem>
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
                      onChange={(event) =>
                        console.log(event.currentTarget.value)
                      }
                      value={item.value}
                      sx={{
                        backgroundColor: "#FAFAFA",
                        borderRadius: "5px",
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
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => (
                      <TableItem item={item} index={index} key={index} />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                "@media (max-width: 650px)": { justifyContent: "flex-start" },
              }}
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
        {/* <Table sx={{ overflowX: "auto" }}>
          <TableHead>
            <TableHeading />
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableItem index={index} key={index} item={item} />
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component={"div"}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Stack>
    </Div>
  );
};

const TableHeading = () => {
  const style = { fontWeight: 400, whiteSpace: "nowrap" };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
      <TableCell sx={[style]}>No</TableCell>
      <TableCell sx={[style]}>Submission Date</TableCell>
      <TableCell sx={[style]}>Title</TableCell>
      <TableCell sx={[style]}>Category</TableCell>
      <TableCell sx={[style]}>Certificate Photo</TableCell>
      <TableCell sx={[style]}>Description</TableCell>
      <TableCell sx={[style]}>Status</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index }) => {
  const var1 = useLocation();
  const id1 = "022407712";
  const id2 = "105022010000";
  const navigate = useNavigate();
  let statusColor;

  switch (item.status) {
    case "Waiting":
      statusColor = "#FFCC00";
      break;
    case "Approved":
      statusColor = "#005FDB";
      break;
    case "Rejected":
      statusColor = "#E21D12";
      break;
  }

  const handleNavigate = () => {
    navigate(
      `/bimbingan-akademik/sek-dekan/supervisor-information/advisor-profile/${id1}/student-certificate/${id2}`
    );
  };

  return (
    <TableRow
      onClick={handleNavigate}
      sx={{
        ":hover": {
          cursor: "pointer",
          backgroundColor: "#338CFF21",
          transition: "0.3s",
          transitionTimingFunction: "ease-in-out",
          transitionDelay: "0s",
          transitionProperty: "all",
        },
      }}
    >
      <TableCell>{index + 1}</TableCell>
      <TableCell>{item.submissionDate}</TableCell>
      <TableCell>{item.title}</TableCell>
      <TableCell>{item.category}</TableCell>
      <TableCell>{item.certifacePhoto}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell sx={{ color: statusColor }}>{item.status}</TableCell>
    </TableRow>
  );
};

export default StudentCertificate;
