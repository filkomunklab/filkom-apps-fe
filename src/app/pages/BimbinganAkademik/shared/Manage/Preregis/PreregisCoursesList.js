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
  TableRow,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
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

      filteredData.sort((a, b) => b.totalRequest - a.totalRequest);

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

  // const generatePDF = useReactToPrint({
  //   content: () => conponentPDF.current,
  //   documentTitle: "List of Courses",
  //   onAfterPrint: () => {
  //     const { jsPDF } = require("jspdf");
  //     const doc = new jsPDF();
  //     doc.text("List of Courses", 10, 10);
  //     doc.autoTable({ html: "#table" });
  //     doc.save("courses.pdf");
  //   },
  // });

  const conponentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: `Course List ${major}`,
  });

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
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              List of Courses
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={4}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid item xs={10} sm={10} justifyContent="flex-end">
              <TextField
                label="Search by Subject Name"
                variant="outlined"
                size="small"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end">
                      <SearchIcon />
                    </IconButton>
                  ),
                  style: { borderRadius: "25px" },
                }}
                sx={{
                  width: "96%",
                }}
              />
            </Grid>
            <Grid item xs={2} sm={2}>
              <Button
                onClick={generatePDF}
                variant="contained"
                color="primary"
                size="small"
              >
                PDF
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Div>
      <Grid item xs={12}>
        <Div ref={conponentPDF} style={{ width: "100%" }}>
          <Div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead
                  style={{
                    position: "-webkit-sticky",
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#e8ecf2",
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
          </Div>
        </Div>
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
