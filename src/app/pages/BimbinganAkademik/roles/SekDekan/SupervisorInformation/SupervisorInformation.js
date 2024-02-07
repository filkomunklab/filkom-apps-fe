import Div from "@jumbo/shared/Div";
import {
  Button,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const data = Array.from(Array(15).keys()).map((item, index) => ({
  nidn: `022407712`,
  name: `Yuhu, Christopher Darell`,
  prodi: `Informatika`,
  year: `2021`,
  status: `Active`,
}));

const SupervisorInformation = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
        <Typography variant="h1" sx={{ mb: 3, fontWeight: 500 }}>
          Supervisor Information
        </Typography>
        <Typography
          variant="h6"
          sx={{
            paddingBottom: "25px",
            fontSize: "15px",
            fontWeight: 400,
            color: "rgba(27, 43, 65, 0.69)",
            textAlign: "justify",
          }}
        >
          Currently, you are on the Academic Supervisor Information page, here
          you can easily see all information about academic supervisors in your
          department, along with their students.
        </Typography>
      </Div>
      <Grid container spacing={2}>
        <Grid display={"flex"} alignItems={"flex-end"} item md={5.5} xl={5}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "justify",
              "@media (max-width: 390px)": {
                fontSize: "16px",
                fontWeight: 500,
              },
            }}
          >
            List of Academic Supervisors
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={4} xl={5}>
          <SearchGlobal
            sx={{
              height: "100%",
              "@media (max-width: 390px)": {
                height: "40px",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={1}>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/bimbingan-akademik/sek-dekan/supervisor-information/add-supervisor"
          >
            <Button
              sx={{
                backgroundColor: "#006AF5",
                borderRadius: "24px",
                color: "white",
                whiteSpace: "nowrap",
                minWidth: "132px",
                width: "100%",
                fontSize: "12px",
                padding: "10px",
                gap: "6px",

                "&:hover": {
                  backgroundColor: "#025ED8",
                },
              }}
            >
              <AddIcon sx={{ fontSize: "14px" }} />
              Add Dosen
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
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
  const style = {
    fontWeight: 400,
    "@media (max-width: 650px)": { fontSize: "13px" },
  };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
      <TableCell sx={[style]}>No</TableCell>
      <TableCell sx={[style]}>NIDN</TableCell>
      <TableCell sx={[style]}>Name</TableCell>
      <TableCell sx={[style]}>Faculty</TableCell>
      <TableCell sx={[style]}>History</TableCell>
      <TableCell sx={[style]}>Number of Student</TableCell>
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
          `/bimbingan-akademik/sek-dekan/supervisor-information/advisor-profile/${item.nidn}`,
          { state: item.nidn }
        );
        break;
      case "history":
        navigate(
          `/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${item.nidn}`,
          { state: item.nidn }
        );
        break;

      default:
        console.log("Path not found");
    }
  };

  const rowStyle = {
    "@media (max-width: 650px)": { fontSize: "11px" },
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
            "@media (max-width: 650px)": { fontSize: "11px" },
          }}
          onClick={handleButtonNavigate}
        >{`Yuhu, Christopher Darell`}</Button>
      </TableCell>
      <TableCell sx={[rowStyle]}>{`Informatika`}</TableCell>
      <TableCell>
        <Button
          name="history"
          onClick={handleButtonNavigate}
          sx={{
            "@media (max-width: 650px)": { fontSize: "11px" },
            textTransform: "capitalize",
          }}
        >
          View History
        </Button>
      </TableCell>
      <TableCell sx={[rowStyle]}>{`25`}</TableCell>
    </TableRow>
  );
};

export default SupervisorInformation;
