import React, { useState } from "react";
import {
  Typography,
  Grid,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Checkbox,
  Breadcrumbs,
  experimentalStyled as styled,
  Button,
} from "@mui/material";
import SearchLocal from "app/shared/SearchLocal";
import Div from "@jumbo/shared/Div";
import { Link, useLocation, useNavigate } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const data = Array.from(Array(15).keys()).map((item, index) => ({
  nim: `105022010000`,
  name: `Singal, Aldo Aldi`,
  prodi: `Informatika`,
  year: `2020`,
  status: `Active`,
  dospem: `-`,
}));

const CountStudent = ({ selected, totalStudents }) => {
  return (
    <Typography sx={{ fontSize: { xs: "14px", md: "16px", xl: "16px" } }}>
      You have selected {selected.length} out of {totalStudents} students
    </Typography>
  );
};

const EditStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((item, index) => index);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, index) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, selected.length - 1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selected.length - 1)
      );
    }

    setSelected(newSelected);
  };

  const isItemSelected = (index) => selected.indexOf(index) !== -1;
  const isAllSelected = selected.length === data.length;

  return (
    <Div>
      <Div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/dekan/supervisor-information/">
            Supervisor Information
          </StyledLink>
          <StyledLink
            state={location.state}
            // onClick={() => {
            //   console.log("masokkk");
            //   navigate(
            //     `/bimbingan-akademik/dekan/supervisor-information/advisor-profile/${location.state}`,
            //     { state: location.state }
            //   );
            // }}
            to={`/bimbingan-akademik/dekan/supervisor-information/advisor-profile/${location.state}`}
          >
            Advisor Profile
          </StyledLink>
          <Typography color="text.primary">Edit Student</Typography>
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
              List of Students Majoring in Informatics
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
        <TableContainer
          sx={{
            maxHeight: 640,
          }}
          component={Paper}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < data.length
                    }
                    checked={isAllSelected}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>No</TableCell>
                <TableCell>NIM</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Program Studi</TableCell>
                <TableCell>Tahun Masuk</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableItem
                    item={item}
                    index={index}
                    key={index}
                    isSelected={isItemSelected(index)}
                    handleClick={handleClick}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid display="flex" alignItems="center" paddingTop={2} gap={4}>
        <Grid item xs={12} md={4} xl={4}>
          <Div sx={{ alignItems: "center" }}>
            <CountStudent selected={selected} totalStudents={data.length} />
          </Div>
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
          <Button
            onClick={() => {
              navigate(
                `/bimbingan-akademik/dekan/supervisor-information/advisor-profile/${location.state}`,
                { state: location.state }
              );
            }}
            sx={{
              backgroundColor: "#006AF5",
              borderRadius: "24px",
              color: "white",
              whiteSpace: "nowrap",
              minWidth: "132px",
              fontSize: { xs: "10px", md: "12px", xl: "16px" },
              padding: "10px",
              alignItems: "center",

              "&:hover": {
                backgroundColor: "#025ED8",
              },
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Div>
  );
};

const TableItem = ({ item, index, isSelected, handleClick }) => {
  return (
    <TableRow
      onClick={(event) => handleClick(event, index)}
      role="checkbox"
      aria-checked={isSelected}
      selected={isSelected}
    >
      <TableCell padding="checkbox">
        {/* {data[index].dospem === `-` ? (
          <Checkbox checked={!isSelected} />
        ) : (
          <Checkbox checked={isSelected} />
        )} */}
        <Checkbox checked={isSelected} />
      </TableCell>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{item.nim}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.prodi}</TableCell>
      <TableCell>{item.year}</TableCell>
      <TableCell>
        <Chip label={item.status} variant="filled" color="success" />
      </TableCell>
    </TableRow>
  );
};

export default EditStudent;
