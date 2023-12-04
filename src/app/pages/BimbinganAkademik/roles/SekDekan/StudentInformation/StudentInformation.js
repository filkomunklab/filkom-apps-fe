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
  TableContainer,
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
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
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
  name: `Yuhu, Christopher Darell`,
  prodi: `Informatika`,
  year: `2021`,
  status: `Active`,
}));

const StudentInformation = () => {
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

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
        <Typography
          variant="h1"
          sx={{
            mb: 3,
            fontWeight: 500,
            // "@media (max-width: 390px)": {
            //   fontSize: "17px",
            //   fontWeight: 500,
            //   mb: "10px",
            // },
          }}
        >
          Student Information
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            textAlign: "justify",
            // "@media (max-width: 390px)": {
            //   fontSize: "11px",
            //   mb: "15px",
            // },
          }}
        >
          Currently, you are on the Student Information page, where you can
          easily view all information about all students, including the number,
          status, and other detailed and comprehensive information.
        </Typography>
      </Div>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Grid item sm={4} md={4} lg={4} xs={12}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#E5F0FF",
              },

              "@media (max-width: 390px)": {
                width: "102%",
                margin: "auto",
                "& .MuiCardHeader-title": {
                  fontSize: "15px",
                },
              },
            }}
            onClick={() =>
              navigate(
                "/bimbingan-akademik/sek-dekan/student-information/informatics"
              )
            }
          >
            <Grid container>
              <Grid item>
                <CardHeader title="Informatics Student" />
                <CardContent sx={{ position: "relative", paddingY: 0 }}>
                  <Typography
                    variant="h3"
                    color="#006AF5"
                    sx={{
                      fontSize: "20px",
                      "@media (max-width: 390px)": {
                        fontSize: "15px",
                      },
                    }}
                  >
                    {`11 people`}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      "@media (max-width: 390px)": {
                        fontSize: "11px",
                      },
                    }}
                  >
                    {`last updated: 11 September 2023`}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item sm={4} md={4} lg={4} xs={12}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#E5F0FF",
              },

              "@media (max-width: 390px)": {
                width: "100%",
                margin: "auto",
                "& .MuiCardHeader-title": {
                  fontSize: "15px",
                },
              },
            }}
            onClick={() =>
              navigate(
                "/bimbingan-akademik/sek-dekan/student-information/information-system"
              )
            }
          >
            <Grid container>
              <Grid item>
                <CardHeader title="   Information System Student" />
                <CardContent sx={{ position: "relative", paddingY: 0 }}>
                  <Typography
                    variant="h3"
                    color="#006AF5"
                    sx={{
                      fontSize: "20px",
                      "@media (max-width: 390px)": {
                        fontSize: "15px",
                      },
                    }}
                  >
                    {`12 people`}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      "@media (max-width: 390px)": {
                        fontSize: "11px",
                      },
                    }}
                  >
                    {`last updated: 11 September 2023`}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item sm={4} md={4} lg={4} xs={12}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#E5F0FF",
              },

              "@media (max-width: 390px)": {
                width: "102%",
                margin: "auto",
                "& .MuiCardHeader-title": {
                  fontSize: "15px",
                },
              },
            }}
            onClick={() =>
              navigate(
                "/bimbingan-akademik/sek-dekan/student-information/information-technology"
              )
            }
          >
            <Grid container>
              <Grid item>
                <CardHeader title=" Information Technology Student" />
                <CardContent sx={{ position: "relative", paddingY: 0 }}>
                  <Typography
                    variant="h3"
                    color="#006AF5"
                    sx={{
                      fontSize: "18px",
                      "@media (max-width: 390px)": {
                        fontSize: "15px",
                      },
                    }}
                  >
                    {`8 people`}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      "@media (max-width: 390px)": {
                        fontSize: "11px",
                      },
                    }}
                  >
                    {`last updated: 11 September 2023`}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} pt={1}>
        <Grid display={"flex"} alignItems={"flex-end"} item md={12} xl={5}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "justify",
              pt: 1,
              "@media (max-width: 390px)": {
                fontSize: "16px",
                fontWeight: 500,
              },
            }}
          >
            Computer Sciences Faculty Students List
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={8} xl={4}>
          <TextField
            placeholder="Search by Name or NIM"
            variant="outlined"
            size="small"
            sx={{
              width: "100%",
              height: "100%",
            }}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton edge="end">
                  <SearchIcon />
                </IconButton>
              ),
              style: { borderRadius: "25px" },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} xl={3}>
          <FormControl sx={{ width: "100%", height: "110%" }} size="small">
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
                    onChange={(event) => console.log(event.currentTarget.value)}
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
      </Grid>
      {/* <Grid item xs={12} sm={8} md={8} xl={3}>
         <SearchGlobal
          sx={{
            height: "100%",
            "@media (max-width: 390px)": {
              height: "40px",
            },
          }}
        />  
      </Grid> */}
      <Grid container pt={3}>
        <Grid item xs={12}>
          <TableContainer
            sx={{
              maxHeight: 440,
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
    // navigate(`/bimbingan-akademik/sek-dekan/student-information/${item.nim}`);

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
  const rowStyle = {
    "@media (max-width: 390px)": { fontSize: "11px" },
  };
  return (
    <TableRow>
      <TableCell sx={[rowStyle]}>{index + 1}</TableCell>
      <TableCell sx={[rowStyle]}>{`022407712`}</TableCell>
      <TableCell>
        <Button
          name="profile"
          sx={{
            textTransform: "capitalize",
            "@media (max-width: 390px)": { fontSize: "11px" },
          }}
          onClick={handleButtonNavigate}
        >{`Yuhu, Christopher Darell`}</Button>
      </TableCell>
      <TableCell sx={[rowStyle]}>{`Informatika`}</TableCell>
      <TableCell sx={[rowStyle]}>{`2021`}</TableCell>

      <TableCell>
        <Button
          name="grade"
          onClick={handleButtonNavigate}
          sx={{
            "@media (max-width: 390px)": { fontSize: "11px" },
            textTransform: "capitalize",
          }}
        >
          View Grades
        </Button>
      </TableCell>
      <TableCell>
        <Button
          name="certificate"
          onClick={handleButtonNavigate}
          sx={{
            "@media (max-width: 390px)": { fontSize: "11px" },
            textTransform: "capitalize",
          }}
        >
          View Certificates
        </Button>
      </TableCell>
      <TableCell sx={[rowStyle]}>
        <Chip label={"Active"} variant="filled" color={"success"} />
      </TableCell>
    </TableRow>
  );
};

export default StudentInformation;
