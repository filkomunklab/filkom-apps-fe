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
  Popover,
  Backdrop,
  CircularProgress,
  TextField,
  InputAdornment,
  MenuItem,
  Modal,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { MoreVert } from "@mui/icons-material";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { handleAuthenticationError } from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
  maxWidth: "90%",
  "@media (max-width: 768px)": {
    maxWidth: "80%",
  },
  "@media (max-width: 480px)": {
    maxWidth: "80%",
  },
};

const SupervisorInformation = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataSupervisor, setDataSupervisor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  //search dan filter
  const [searchFilteredData, setSearchFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [originalDataSupervisor, setOriginalDataSupervisor] = useState([]);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [selectedSupervisorId, setSelectedSupervisorId] = useState(null);

  const handleOpenDeleteConfirmationModal = (id) => {
    setSelectedSupervisorId(id);
    setIsDeleteConfirmationModalOpen(true);
  };
  const handleCloseDeleteConfirmationModal = () => {
    setSelectedSupervisorId(null);
    setIsDeleteConfirmationModalOpen(false);
  };

  const getDataSupervisor = async () => {
    try {
      const response = await jwtAuthAxios.get(`/guidance-class`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      setDataSupervisor(response.data.data);
    } catch (error) {
      if (error && error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error && error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.error("error: ", error);
      }
    }
  };

  const handleDeleteSupervisor = async (id) => {
    try {
      setIsLoading(true);
      const response = await jwtAuthAxios.delete(`/guidance-class/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        signal,
      });
      getDataSupervisor();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error && error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error && error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.error("error: ", error);
      }
    }
  };

  useEffect(() => {
    getDataSupervisor();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setOriginalDataSupervisor(dataSupervisor);
  }, [dataSupervisor]);

  useEffect(() => {
    filterAndSetStudents();
  }, [search, filter, originalDataSupervisor]);

  const filterAndSetStudents = () => {
    const filteredData = originalDataSupervisor.filter((item) => {
      const nameMatches =
        item?.teacher?.firstName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item?.teacher?.lastName?.toLowerCase().includes(search.toLowerCase());

      const majorMatches = filter === "" || item?.teacher?.major === filter;

      return nameMatches && majorMatches;
    });

    setSearchFilteredData(filteredData);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleFilter = (event) => {
    if (event.target.value === "All Major") {
      setFilter("");
    } else {
      setFilter(event.target.value);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Div>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
      <Div>
        <Typography variant="h1" sx={{ mb: 3, fontWeight: 500 }}>
          Supervisor Information
        </Typography>
        <Typography
          variant="h6"
          sx={{
            paddingBottom: "30px",
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
        <Grid item xs={12} sm={9} md={10} xl={10}>
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
      </Grid>

      <Grid container paddingTop={3} paddingBottom={2} spacing={2}>
        <Grid item xs={12} sm={6} md={3.5}>
          <TextField
            size="small"
            placeholder="Search by Name"
            variant="outlined"
            id="search-field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#1C304A85" }} />
                </InputAdornment>
              ),
              style: {
                borderRadius: "65px",
              },
            }}
            sx={{
              width: "100%",
              marginBottom: { xs: 2, md: 0 },
            }}
            value={search}
            onChange={handleSearch}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            size="small"
            fullWidth
            id="outlined-select-currency"
            select
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ zIndex: -2 }}>
                  <FilterListIcon sx={{ color: "#1C304A85" }} />

                  <Typography sx={{ marginLeft: "16px", color: "#1C304A85" }}>
                    Filter:
                  </Typography>
                </InputAdornment>
              ),
              style: {
                borderRadius: "65px",
                borderColor: "#E0E0E0",
              },
            }}
            sx={{
              m: 0,
              borderRadius: "65px",
              width: "100%",
              borderColor: "#E0E0E0",
            }}
            value={filter ? filter : "All Major"}
            onChange={handleFilter}
          >
            <Typography
              sx={{
                fontWeight: "600",
                paddingLeft: "12px",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Major
            </Typography>
            <MenuItem key={"All Major"} value={"All Major"}>
              All Major
            </MenuItem>
            <MenuItem key={"IF"} value={"IF"}>
              Informatics
            </MenuItem>
            <MenuItem key={"SI"} value={"SI"}>
              Information System
            </MenuItem>
            <MenuItem key={"TI"} value={"TI"}>
              Information Technology
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={2} sm={2} md={2} xl={2}>
          <Button
            sx={{
              backgroundColor: "#006AF5",
              borderRadius: "24px",
              color: "white",
              width: "100%",
              minWidth: "132px",
              fontSize: "12px",
              height: "95%",
              "&:hover": {
                backgroundColor: "#025ED8",
              },
            }}
            onClick={() => {
              navigate("add-supervisor");
            }}
          >
            <AddIcon sx={{ fontSize: "14px" }} />
            Add Supervisor
          </Button>
        </Grid>
      </Grid>

      <Grid xs={12} mt={3}>
        <TableContainer sx={{ maxHeight: 480 }} component={Paper}>
          <Table>
            <TableHead
              sx={{
                position: "-webkit-sticky",
                position: "sticky",
                top: 0,
                backgroundColor: "#e8ecf2",
                zIndex: 1,
              }}
            >
              <TableHeading />
            </TableHead>
            <TableBody>
              {searchFilteredData && searchFilteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8}>No data available</TableCell>
                </TableRow>
              ) : (
                searchFilteredData
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map((item, index) => (
                    <TableItem
                      item={item}
                      index={index + page * rowsPerPage}
                      key={index}
                      onDelete={() =>
                        handleOpenDeleteConfirmationModal(item.id)
                      }
                    />
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          open={isDeleteConfirmationModalOpen}
          onClose={handleCloseDeleteConfirmationModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={style}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 600,
              }}
            >
              Confirm Deletion
            </Typography>
            <Typography
              id="modal-modal-description"
              style={{ marginTop: "16px", marginBottom: "20px" }}
            >
              Are you sure you want to delete this supervisor?
            </Typography>
            <Grid container spacing={1} justifyContent="flex-end">
              <Grid item>
                <Button
                  onClick={handleCloseDeleteConfirmationModal}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "5px",
                    color: "black",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      backgroundColor: "lightgrey",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    handleDeleteSupervisor(selectedSupervisorId);
                    handleCloseDeleteConfirmationModal();
                  }}
                  sx={{
                    borderRadius: "5px",
                    color: "white",
                    whiteSpace: "nowrap",
                    backgroundColor: "#006AF5",
                    "&:hover": {
                      backgroundColor: "#025ED8",
                    },
                  }}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>

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
          count={searchFilteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Div>
  );
};

const TableHeading = () => {
  return (
    <TableRow>
      <TableCell sx={{ textAlign: "center" }}>No</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Name</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Major</TableCell>
      <TableCell sx={{ textAlign: "center" }}>History</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Number of Student</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index, onDelete }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorE1] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const { firstName, lastName, major, nik } = item.teacher;

  const handleButtonNavigate = (_, name) => {
    switch (name) {
      case "profile":
        navigate(`advisor-profile/${nik}`, {
          state: { classID: item.id, nik: nik },
        });
        break;
      case "history":
        navigate(`advisor-history/${nik}`, {
          state: { classID: item.id, id: item.teacher.id },
        });
        break;
    }
  };

  const rowStyle = {
    "@media (max-width: 650px)": { fontSize: "11px" },
    textAlign: "center",
  };

  return (
    <TableRow>
      <TableCell sx={[rowStyle]}>{index + 1}</TableCell>
      <TableCell>
        <Typography
          onClick={(e) => handleButtonNavigate(e, "profile")}
          style={{
            textTransform: "capitalize",
            "@media (max-width: 650px)": { fontSize: "11px" },
            color: "#006AF5",
            textDecoration: "none",
            width: "100%",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          {lastName}, {firstName}
        </Typography>
      </TableCell>
      <TableCell sx={[rowStyle]}>
        {major === "IF"
          ? "Informatics"
          : major === "SI"
          ? "Information System"
          : major === "TI"
          ? "Information Technology"
          : "-"}
      </TableCell>
      <TableCell>
        <Typography
          onClick={(e) => handleButtonNavigate(e, "history")}
          style={{
            "@media (max-width: 650px)": { fontSize: "11px" },
            textTransform: "capitalize",
            paddingX: 0,
            color: "#006AF5",
            textDecoration: "none",
            width: "100%",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          View History
        </Typography>
      </TableCell>
      <TableCell sx={[rowStyle]}>{item._count.GuidanceClassMember}</TableCell>
      <TableCell sx={{ textAlign: "center", cursor: "pointer" }}>
        <MoreVert
          aria-describedby={id}
          onClick={(e) => setAnchorE1(e.currentTarget)}
          sx={{ cursor: "pointer" }}
        />
        <Popover
          id={id}
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorE1(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Button onClick={() => onDelete()} sx={{ color: "#CA150C" }}>
            Delete
          </Button>
        </Popover>
      </TableCell>
    </TableRow>
  );
};

export default SupervisorInformation;
