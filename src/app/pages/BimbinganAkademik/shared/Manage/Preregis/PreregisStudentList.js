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
import { useNavigate, useParams } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const PreregisStudentList = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [dataStudent, setDataStudent] = useState([]);

  const getDataStudent = async () => {
    try {
      const result = await jwtAuthAxios.get(`pre-regist/list-submitted/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });

      const filteredData = result.data.data.PreRegistrationData.filter(
        (item) => {
          const studentFullName = `${item.Student?.lastName}, ${item.Student?.firstName}`;
          return studentFullName
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        }
      );
      console.log("isi result", result);
      setDataStudent(filteredData);
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error.response && error.response.status === 403) {
        handlePermissionError();
        setTimeout(() => {
          navigate(-1);
        }, 2000);
        return;
      } else if (error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.log("ini error: ", error);
      }
    }
  };
  useEffect(() => {
    getDataStudent();
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
            Manage Pre-registration
          </StyledLink>
          <Typography color="text.primary">
            List Pre-regisration Student
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
              List of Students
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
              label="Search by Name"
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
                <TableCell>NIM</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Tahun Masuk</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataStudent && dataStudent.length > 0 ? (
                dataStudent.map((registration, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{registration.Student?.nim}</TableCell>
                    <TableCell>{`${registration.Student?.firstName} ${registration.Student?.lastName}`}</TableCell>
                    <TableCell>{registration.Student?.arrivalYear}</TableCell>
                    <TableCell>{registration.status}</TableCell>
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
          count={dataStudent.length}
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

export default PreregisStudentList;
