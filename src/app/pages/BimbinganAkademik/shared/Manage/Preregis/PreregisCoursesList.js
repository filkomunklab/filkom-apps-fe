import Div from "@jumbo/shared/Div";
import {
  Typography,
  Breadcrumbs,
  experimentalStyled as styled,
  Link,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableCell,
  Paper,
  TablePagination,
  TableRow,
  TextField,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { handleAuthenticationError } from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const PreregisCoursesList = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const location = useLocation();
  const { id, major } = location.state || "-";
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [dataCourses, setDataCourses] = useState([]);

  const getDataCourses = async () => {
    try {
      const result = await jwtAuthAxios.get(`pre-regist/list-subject/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });

      const filteredData = result.data.data.filter((item) => {
        const subjectName = item?.name?.toLowerCase();
        return subjectName.includes(searchValue.toLowerCase());
      });

      setDataCourses(filteredData);
    } catch (error) {
      if (error && error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error && error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.error("error: ");
      }
    }
  };
  useEffect(() => {
    getDataCourses();
    return () => controller.abort();
  }, [searchValue, id]);

  const handleClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };
  return (
    <Div>
      <Div role="presentation">
        <Breadcrumbs aria-label="breadcrumb" onClick={handleClick}>
          <StyledLink to="/bimbingan-akademik/kaprodi/manage">
            Manage Courses
          </StyledLink>
          <Typography color="text.primary">
            List Pre-regisration Courses
          </Typography>
        </Breadcrumbs>
      </Div>
      <Div sx={{ paddingTop: 4, paddingBottom: 2 }}>
        <Grid
          container
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item md={6}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              List of Courses
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            xl={3}
            sx={{ marginRight: { xs: 0, sm: 2 } }}
          >
            <TextField
              label="Search by Subject"
              variant="outlined"
              size="small"
              sx={{
                width: "100%",
                height: "100%",
                marginTop: "20px",
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
        </Grid>
      </Div>
      <Grid item xs={12}>
        <TableContainer sx={{ maxHeight: 640 }} component={Paper}>
          <Table>
            <TableHead
              style={{
                position: "-webkit-sticky",
                position: "sticky",
                top: 0,
                backgroundColor: "rgba(26, 56, 96, 0.1)",
                zIndex: 1,
              }}
            >
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Subject Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataCourses && dataCourses.length > 0 ? (
                dataCourses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{course.code}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.type}</TableCell>
                    <TableCell>{course.totalRequest}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8}>No data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={dataCourses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
          }}
        />
      </Grid>
    </Div>
  );
};

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

export default PreregisCoursesList;
