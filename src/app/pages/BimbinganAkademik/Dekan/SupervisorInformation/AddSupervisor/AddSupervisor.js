import React, { useState } from "react";
import {
  Typography,
  Breadcrumbs,
  experimentalStyled as styled,
  Grid,
  Paper,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  MenuItem,
  Chip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

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

const AddSupervisor = () => {
  const [showLabel, setShowLabel] = useState(true);
  const [pilihJurusan, setPilihJurusan] = useState("");
  const [pilihMahasiswa, setPilihMahasiswa] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleClick = (event) => {
    event.preventDefault();
  };

  const handleUbahJurusan = (event) => {
    setPilihJurusan(event.target.value);
  };

  const handleUbahJurusanDanKlik = (event) => {
    handleUbahJurusan(event);
    handleClick(event);
    setShowLabel(false);
  };

  const isMajorDisabled = pilihJurusan !== "";

  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/dekan/supervisor-information/">
            Supervisor Information
          </StyledLink>
          <Typography color="text.primary">Add Supervisor</Typography>
        </Breadcrumbs>
      </div>
      <Typography
        fontSize={"24px"}
        fontWeight="500"
        sx={{ marginBottom: 3, paddingTop: "20px" }}
      >
        Add Supervisor
      </Typography>
      <Paper elevation={1} sx={{ mb: 4 }}>
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
            <TextField
              size="small"
              sx={{ backgroundColor: "white" }}
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Full Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">NIDN</Typography>
            <TextField
              size="small"
              sx={{ backgroundColor: "white" }}
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter NIDN"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Email</Typography>
            <TextField
              size="small"
              sx={{ backgroundColor: "white" }}
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Email"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Phone</Typography>
            <TextField
              size="small"
              sx={{ backgroundColor: "white" }}
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Phone Number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Major</Typography>
            {/* <TextField
              size="small"
              sx={{ backgroundColor: "white" }}
              id="outlined-basic"
              variant="outlined"
              placeholder="Select Major"
              fullWidth
            /> */}
            <Stack sx={{ paddingBottom: 3 }}>
              <TextField
                size="small"
                sx={{ width: "100%", backgroundColor: "white" }}
                id="outlined-select-major"
                select
                label={showLabel ? "Select Major" : ""}
                onChange={handleUbahJurusanDanKlik}
                InputLabelProps={{
                  shrink: false,
                }}
              >
                <MenuItem value="informatics">Informatics</MenuItem>
                <MenuItem value="information-system">
                  Information System
                </MenuItem>
                <MenuItem value="information-technology">
                  Information Technology
                </MenuItem>
              </TextField>
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Address</Typography>
            <TextField
              size="small"
              sx={{ backgroundColor: "white" }}
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Address"
              fullWidth
              multiline
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        <Grid item md={9}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              margin: "12px",
            }}
          >
            List of Academic Supervisors
          </Typography>
        </Grid>
        <Grid
          item
          md={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/add-supervisor/${pilihJurusan}`}
          >
            <Button
              sx={{
                backgroundColor: isMajorDisabled ? "#006AF5" : "gray",
                borderRadius: "24px",
                color: "white",
                whiteSpace: "nowrap",
                minWidth: "132px",
                fontSize: "12px",
                padding: "10px",
                gap: "6px",
                cursor: isMajorDisabled ? "pointer" : "not-allowed",

                "&:hover": {
                  backgroundColor: isMajorDisabled ? "#025ED8" : "gray",
                },
              }}
              onClick={isMajorDisabled ? null : handleClick}
            >
              <AddIcon sx={{ fontSize: "14px" }} />
              Add Student
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
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component={"div"}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Grid>
      </Grid>
      <Grid>
        <Link to={`/bimbingan-akademik/dekan/supervisor-information/`}>
          <Button
            sx={{
              backgroundColor: "#006AF5",
              borderRadius: "24px",
              color: "white",
              whiteSpace: "nowrap",
              minWidth: "132px",
              fontSize: "12px",
              padding: "10px",
              margin: "20px",

              "&:hover": {
                backgroundColor: "#025ED8",
              },
            }}
          >
            Submit
          </Button>
        </Link>
      </Grid>
    </div>
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
    switch (name) {
      case "profile":
        navigate(`/bimbingan-akademik/dekan/student-information/${item.nim}`);
        break;
      case "grade":
        navigate(
          `/bimbingan-akademik/dekan/student-information/${item.nim}/grade`
        );
        break;
      case "certificate":
        navigate(
          `/bimbingan-akademik/dekan/student-information/${item.nim}/certificate`
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

export default AddSupervisor;
