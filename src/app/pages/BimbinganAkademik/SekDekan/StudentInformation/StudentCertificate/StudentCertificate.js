import Div from "@jumbo/shared/Div";
import {
  FormControl,
  Grid,
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
  Typography,
  Breadcrumbs,
  experimentalStyled as styled,
  Paper,
  TableContainer,
} from "@mui/material";
import SearchLocal from "app/shared/SearchLocal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL_API } from "../../../../../../@jumbo/config/env";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const StudentCertificate = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [certificates, setCertificates] = useState([]);

  const getCertificate = async () => {
    try {
      const result = await axios.get(`${BASE_URL_API}/certificate/dosen/dosen`);
      if (result.data.status === "OK") {
        console.log("Successful response:", result.data);
        setCertificates(result.data.data);

        console.log("ini isi list sertifikat: ", certificates);
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Error response:", error.response);
    }
  };

  useEffect(() => {
    console.log("ini url: ", BASE_URL_API);
    getCertificate();
  }, []);

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
  return (
    <Div>
      <Div role="presentation" onClick={handleClick} sx={{ paddingBottom: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>Student Information</StyledLink>
          <Typography color="text.primary">Student Certificate</Typography>
        </Breadcrumbs>
      </Div>
      <Stack gap={3}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h1" fontWeight={500}>
            All Certifications
          </Typography>
          <Typography variant="h6">Yuhu, Darell Deil</Typography>
        </Stack>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item md={12} xs={12}>
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Here is the data of the attached certificates belonging to this
              student.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={3}>
            <SearchLocal />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                sx={{ borderRadius: "24px" }}
                labelId="sort-component"
                id="demo-simple-select-helper"
                value={sortBy}
                label="Sort By"
                onChange={(event) => setSortBy(event.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Empty"}>Empty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <TableContainer
          sx={{ overflow: "auto", maxHeight: 640 }}
          component={Paper}
        >
          <Table stickyHeader>
            <TableHead>
              <TableHeading />
            </TableHead>
            <TableBody>
              {Array.isArray(certificates) &&
                certificates.map((value, index) => (
                  <TableItem index={index} key={index} value={value} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <Grid
        item
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          "@media (max-width: 890px)": { justifyContent: "flex-start" },
        }}
      >
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
          count={certificates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Div>
  );
};

const TableHeading = () => {
  const style = { fontWeight: 400, whiteSpace: "nowrap" };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
      <TableCell sx={{ ...style, width: "50px", align: "right" }}>No</TableCell>
      <TableCell sx={{ ...style, width: "50px", align: "right" }}>
        Submission Date
      </TableCell>
      <TableCell sx={{ ...style, width: "300px" }}>Title</TableCell>
      <TableCell sx={{ ...style, width: "50px" }}>Category</TableCell>
      <TableCell sx={{ ...style, width: "300px" }}>Description</TableCell>
      <TableCell sx={{ ...style, width: "50px" }}>Status</TableCell>
    </TableRow>
  );
};

const TableItem = ({ value, index }) => {
  const navigate = useNavigate();
  let statusColor;

  switch (value.status) {
    case "WAITING":
      statusColor = "#FFCC00";
      break;
    case "APPROVED":
      statusColor = "#005FDB";
      break;
    case "REJECTED":
      statusColor = "#E21D12";
      break;
  }

  const handleNavigate = () => {
    navigate(
      "/bimbingan-akademik/sek-dekan/student-information/10000002/certificate/1000001"
    );
  };
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formattedStatus =
    value.status.charAt(0) + value.status.slice(1).toLowerCase();

  const submitDate = new Date(value.submitDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
      <TableCell>{submitDate}</TableCell>
      <TableCell>{value.title}</TableCell>
      <TableCell>{value.category}</TableCell>
      <TableCell>{value.description}</TableCell>
      <TableCell sx={{ color: statusColor }}>{formattedStatus}</TableCell>
    </TableRow>
  );
};

export default StudentCertificate;
