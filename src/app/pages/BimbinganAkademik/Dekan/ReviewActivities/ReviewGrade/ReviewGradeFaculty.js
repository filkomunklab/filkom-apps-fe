import Div from "@jumbo/shared/Div";
import {
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
  submission_date: `Sep 23, 2022`,
  nim: `105022889200`,
  name: `Muaja, Alda Ivana`,
  supervisor_name: `Sompie, Dimitry Virgy`,
  major: `Information System`,
  year: `2019`,
  semester: 8,
  status: `Active`,
}));

const ReviewGradeFaculty = () => {
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
        <TableCell sx={[style]}>Number</TableCell>
        <TableCell sx={[style]}>Submission Date</TableCell>
        <TableCell sx={[style]}>NIM</TableCell>
        <TableCell sx={[style]}>Student Name</TableCell>
        <TableCell sx={[style]}>Supervisor Name</TableCell>
        <TableCell sx={[style]}>Major</TableCell>
        <TableCell sx={[style]}>Arrival Year</TableCell>
        <TableCell sx={[style]}>Semester</TableCell>
        <TableCell sx={[style]}>Status</TableCell>
      </TableRow>
    );
  };

  const TableItem = ({ item, index }) => {
    const navigate = useNavigate();
    const handleButtonNavigate = () => {
      navigate(`/bimbingan-akademik/dekan/review-activities/grade/${item.nim}`);
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
        <TableCell>{item.nim}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.supervisor_name}</TableCell>
        <TableCell>{item.major}</TableCell>
        <TableCell>{item.year}</TableCell>
        <TableCell>{item.semester}</TableCell>
        <TableCell>{item.status}</TableCell>
      </TableRow>
    );
  };

  return (
    <Div sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid display={"flex"} alignItems={"flex-end"} item md={6}>
          <Typography variant="h2">
            Review Grades of Guidance Students
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
                Arrival Year
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
                  Major
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

export default ReviewGradeFaculty;
