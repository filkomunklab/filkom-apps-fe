import React, { useState } from "react";
import {
  Typography,
  Grid,
  Chip,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  TableRow,
  TableCell,
  Checkbox,
  Breadcrumbs,
  experimentalStyled as styled,
  Button,
} from "@mui/material";
import SearchLocal from "app/shared/SearchLocal";
import Div from "@jumbo/shared/Div";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const data = Array.from(Array(15).keys()).map((item, index) => ({
  nim: `105022010000`,
  name: `Awuy, Diany Mariska`,
  prodi: `Sistem Informasi`,
  year: `2020`,
  status: `Active`,
}));

const CountStudent = ({ selected, totalStudents }) => {
  return (
    <Typography sx={{ fontSize: "16px" }}>
      You have selected {selected.length} out of {totalStudents} students
    </Typography>
  );
};

const InformationSystem = () => {
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
    <Div sx={{ padding: 2 }}>
      <Div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/sek-dekan/supervisor-information/">
            Supervisor Information
          </StyledLink>
          <StyledLink to="/bimbingan-akademik/sek-dekan/supervisor-information/add-supervisor">
            Add Supervisor
          </StyledLink>
          <Typography color="text.primary">
            Information System Student
          </Typography>
        </Breadcrumbs>
      </Div>
      <Div sx={{ padding: 2 }}>
        <Grid
          container
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item md={6}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              List of Students Majoring in Information System
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <SearchLocal />
          </Grid>
        </Grid>
      </Div>
      <Div>
        <Table>
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Div>
      <Grid display="flex" alignItems="center" gap={4}>
        <Grid item md={4}>
          <Div sx={{ alignItems: "center" }}>
            <CountStudent selected={selected} totalStudents={data.length} />
          </Div>
        </Grid>
        <Grid item md={4}>
          <Link
            to={`/bimbingan-akademik/sek-dekan/supervisor-information/add-supervisor`}
          >
            <Button
              sx={{
                backgroundColor: "#006AF5",
                borderRadius: "24px",
                color: "white",
                whiteSpace: "nowrap",
                minWidth: "132px",
                fontSize: "12px",
                padding: "10px",
                alignItems: "center",

                "&:hover": {
                  backgroundColor: "#025ED8",
                },
              }}
            >
              Save
            </Button>
          </Link>
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

export default InformationSystem;
