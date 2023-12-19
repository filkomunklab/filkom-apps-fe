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
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";

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

const ReviewCertificateMentored = () => {
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataWaiting, setDataWaiting] = useState([]);
  const navigate = useNavigate();

  const getDataWaiting = async () => {
    try {
      const { nik } = JSON.parse(localStorage.getItem("user"));
      const result = await axios.get(
        `${BASE_URL_API}/certificate/waitingList/dosen/${nik}`
      );
      console.log("ini isi result.data", result.data);
      setDataWaiting(result.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getDataWaiting();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleNavigate = async (value) => {
    try {
      const consultationDetailsResult = await axios.get(
        `${BASE_URL_API}/academic-consultation/detail/${value.id}`
      );
      // console.log("ini detail Consutation result:", consultationDetailsResult);
      const { role } = JSON.parse(localStorage.getItem("user"));
      let path = "";
      console.log("hai ini role", role.includes === "KAPRODI");
      if (role.includes("DEKAN")) {
        path = "/bimbingan-akademik/dekan/review-activities/consultation/";
      } else if (role.includes("KAPRODI")) {
        path = "/bimbingan-akademik/kaprodi/review-activities/consultation/";
      } else {
        path =
          "/bimbingan-akademik/dosen-pembimbing/review-activities/consultation/";
      }

      navigate(`${path}${value.id}`, {
        state: {
          consultationDetails: {
            studentName: consultationDetailsResult.data.data.student_name,
            supervisorName: consultationDetailsResult.data.data.supervisor_name,
            studentMajor: consultationDetailsResult.data.data.student_major,
            studentArrivalYear:
              consultationDetailsResult.data.data.student_arrival_year,
            topic: consultationDetailsResult.data.data.topic,
            receiverName: consultationDetailsResult.data.data.receiver_name,
            description: consultationDetailsResult.data.data.description,
            id: consultationDetailsResult.data.data.id,
          },
        },
      });
    } catch (error) {
      console.log(error.message);
    }
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
              maxHeight: 440,
            }}
            component={Paper}
          >
            <Table>
              <TableHead
                sx={{
                  position: "-webkit-sticky",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "rgba(26, 56, 96, 0.1)",
                }}
              >
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>Submission Date</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataWaiting &&
                  dataWaiting.map((value, index) => (
                    <TableRow
                      key={value.id}
                      onClick={() => handleNavigate(value)}
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
                      <TableCell
                        align="right"
                        sx={{ width: "80px", paddingRight: "17px" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ width: "145px", paddingLeft: "17px" }}>
                        {new Date(
                          value.Certificate.submitDate
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell sx={{ width: "245px" }}>
                        {value.Student.lastName}, {value.Student.firstName}
                      </TableCell>
                      <TableCell sx={{ width: "140px" }}>
                        {value.Certificate.title}
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: "300px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {value.Certificate.category}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#FFCC00",
                          width: "100px",
                          align: "left",
                        }}
                      >
                        {value.Certificate.approval_status.charAt(0) +
                          value.Certificate.approval_status
                            .slice(1)
                            .toLowerCase()}
                      </TableCell>
                    </TableRow>
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
            count={dataWaiting.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </Div>
  );
};

export default ReviewCertificateMentored;
