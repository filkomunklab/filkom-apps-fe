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
} from "@mui/material";
import SearchLocal from "app/shared/SearchLocal";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",
  "&:hover": {
    textDecoration: "underline",
  },
}));

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
  const [sortBy, setSortBy] = useState("");

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
      <Div role="presentation" onClick={handleClick} sx={{ paddingBottom: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/sek-dekan/student-information">
            Student Information
          </StyledLink>
          <Typography color="text.primary">Student Certificate</Typography>
        </Breadcrumbs>
      </Div>
      <Stack gap={3}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h1">All Certifications</Typography>
          <Typography variant="h6">Yuhu, Darell Deil</Typography>
        </Stack>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item md={12} xs={12}>
            <Typography variant="h6">
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
        <Table sx={{ overflowX: "auto" }}>
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
      </Stack>{" "}
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
          rowsPerPageOptions={[10, 25, 50, 100]}
          component={"div"}
          count={data.length}
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
      "/bimbingan-akademik/sek-dekan/student-information/10000002/certificate/1000001"
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
