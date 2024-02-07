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
} from "@mui/material";
import SearchLocal from "app/shared/SearchLocal";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GradeSubmissionStudentList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
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
          <Grid item xs={12} sm={8} md={5}>
            <SearchLocal
              sx={{
                height: "100%",
                "@media (max-width: 390px)": {
                  height: "40px",
                },
              }}
            />
          </Grid>
        </Grid>
      </Div>
      <Grid item xs={12}>
        <TableContainer sx={{ maxHeight: 640 }} component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>NIM</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Tahun Masuk</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {studentOptions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableItem
                    item={item}
                    index={index}
                    key={item.nim}
                    isSelected={selectedStudent.includes(item.nim)}
                    handleClick={(i) =>
                      setSelectedStudent(
                        selectedStudent.includes(i.nim)
                          ? selectedStudent.filter((nim) => nim !== i.nim)
                          : [...selectedStudent, i.nim]
                      )
                    }
                  />
                ))} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          // count={studentOptions.length}
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

export default GradeSubmissionStudentList;
