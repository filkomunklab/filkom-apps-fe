import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  submission_date: `Jan 29, 2022`,
  name: `Yuhu, Christopher Darell`,
  title: `Sertifikat Kejuaraan Panco`,
  category: `National`,
  supervisor_name: `Budianto Nurmala Faizal`,
  status: `Waiting`,
}));

const ReviewCertificateMentored = () => {
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

  const TableHeading = ({ index }) => {
    const style = { fontWeight: 400 };
    return (
      <TableRow sx={{ backgroundColor: "#1A38601A" }}>
        <TableCell sx={[style]}>No</TableCell>
        <TableCell sx={[style]}>Submission Date</TableCell>
        <TableCell sx={[style]}>Student Name</TableCell>
        <TableCell sx={[style]}>Title</TableCell>
        <TableCell sx={[style]}>Category</TableCell>
        <TableCell sx={[style]}>Supervisor Name</TableCell>
        <TableCell sx={[style]}>Status </TableCell>
      </TableRow>
    );
  };

  const TableItem = ({ item, index }) => {
    const navigate = useNavigate();
    const handleButtonNavigate = () => {
      navigate(
        `/bimbingan-akademik/dekan/review-activities/certificate/${item.nim}`
      );
    };
    return (
      <TableRow
        sx={{
          ":hover": {
            backgroundColor: "#E5F0FF",
          },
        }}
        onClick={handleButtonNavigate}
      >
        <TableCell>{index + 1}</TableCell>
        <TableCell>{item.submission_date}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.title}</TableCell>
        <TableCell>{item.category}</TableCell>
        <TableCell>{item.supervisor_name}</TableCell>
        <TableCell sx={{ color: "#FFCC00" }}>{item.status}</TableCell>
      </TableRow>
    );
  };

  return (
    <Div sx={{ paddingTop: 2 }}>
      <Grid container spacing={2}>
        <Grid display={"flex"} alignItems={"flex-end"} item md={6}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "justify",
              paddingTop: 2,
              "@media (max-width: 390px)": {
                fontSize: "15px",
                fontWeight: 500,
              },
              "@media (min-width: 768px)": {
                fontSize: "17px",
                fontWeight: 500,
              },
            }}
          >
            Review Student Mentored Certificates
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={8} xl={3}>
          <SearchGlobal
            sx={{
              height: "100%",
              "@media (max-width: 390px)": {
                height: "40px",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} xl={3}>
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <InputLabel htmlFor="grouped-select">Filter</InputLabel>
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

export default ReviewCertificateMentored;
