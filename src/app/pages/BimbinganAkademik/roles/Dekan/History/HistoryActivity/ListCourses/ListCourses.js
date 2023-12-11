import {
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TablePagination,
  Typography,
  Paper,
  Button,
  Breadcrumbs,
  experimentalStyled as styled,
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const data = Array.from({ length: 29 }, (_, index) => ({
  number: 1,
  code: "MATH000",
  subject_name: "Matematika/ Mathematics",
  credit: 3,
  type: "General",
  amount: "34",
}));

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

const ListAmount = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event, step) => {
    event.preventDefault();
    navigate(step);
  };

  return (
    <Div>
      <Div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink onClick={(event) => handleClick(event, -2)}>
            History
          </StyledLink>
          <StyledLink onClick={(event) => handleClick(event, -1)}>
            Activity
          </StyledLink>
          <Typography color="text.primary">List Courses</Typography>
        </Breadcrumbs>
      </Div>
      <Grid item xs={12}>
        <Typography
          sx={{
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 500,
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          List of Pre-registered Courses
        </Typography>
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
    </Div>
  );
};

const TableHeading = ({ index }) => {
  const style = { fontWeight: 400 };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
      <TableCell sx={[style]}>Number</TableCell>
      <TableCell sx={[style]}>Code</TableCell>
      <TableCell sx={[style]}>Subject Name</TableCell>
      <TableCell sx={[style]}>Credit(s)</TableCell>
      <TableCell sx={[style]}>Type</TableCell>
      <TableCell sx={[style]}>Amount</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index }) => {
  const navigate = useNavigate();
  const handleButtonNavigate = (event) => {
    const { name } = event.currentTarget;

    switch (name) {
      case "profile":
        navigate(
          `/bimbingan-akademik/dekan/history/activity/list-courses/list-student/${item.code}`
        );
        break;
      default:
        console.log("Path not found");
    }
  };
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{`MATH000`}</TableCell>
      <TableCell>{`"Matematika/ Mathematics`}</TableCell>
      <TableCell>{`3`}</TableCell>
      <TableCell>{`General`}</TableCell>
      <TableCell>
        <Button
          name="profile"
          sx={{ textTransform: "capitalize" }}
          onClick={handleButtonNavigate}
        >{`34`}</Button>
      </TableCell>
    </TableRow>
  );
};

export default ListAmount;
