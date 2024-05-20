import React, { useEffect, useState } from "react";
import {
  Typography,
  Breadcrumbs,
  experimentalStyled as styled,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  MenuItem,
  Chip,
  TableContainer,
  TablePagination,
  Backdrop,
  CircularProgress,
  Modal,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { handleAuthenticationError } from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";
import SuccessOrError from "app/pages/BimbinganAkademik/components/Modal/SuccessOrError";
import CustomAlert from "app/pages/BimbinganAkademik/components/Alert/Alert";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

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

const AddSupervisor = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const location = useLocation();
  const { students, supervisor } = location.state || [];
  const [SupervisorOptions, setSupervisorOptions] = useState([]);
  const [supervisorId, setSupervisorId] = useState("");
  const [selectedSupervisor, setSelectedSupervisor] = useState(
    supervisor || undefined
  );
  const [showLabel, setShowLabel] = useState(!selectedSupervisor);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [openFirstModal, setOpenFirstModal] = useState(false);

  // Alert
  const [alert, setAlert] = useState(null);
  const showAlert = (message) => {
    setAlert({ message });
  };
  const hideAlert = () => {
    setAlert(null);
  };

  //handle error
  const handleError = (error) => {
    if (error && error.code === "ERR_CANCELED") {
      console.log("request canceled");
    } else if (error && error.response && error.response.status === 401) {
      handleAuthenticationError();
    } else {
      console.error("error: ", error);
    }
  };

  const getSupervisor = async () => {
    try {
      const response = await jwtAuthAxios.get(
        `/guidance-class/get-all-unassigned-teacher/list`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );
      const { status, data } = response.data;

      if (status === "OK") {
        setSupervisorOptions(data);
      }
    } catch (error) {
      handleError();
    }
  };

  const [openErrorModal, setOpenErrorModal] = useState(false);
  const handleOpenErrorModal = () => setOpenErrorModal(true);
  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
    setOpenFirstModal(false);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (!students || students.length === 0) {
        showAlert(
          "Make sure you have selected both the Supervisor and Student to be added."
        );
        setIsLoading(false);
        return;
      }
      const response = await jwtAuthAxios.post(
        `/guidance-class/create-new/${selectedSupervisor?.id}`,
        {
          studentList: students.map((item) => ({
            studentId: item.id,
          })),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        }
      );

      const { status } = response.data;
      setIsLoading(false);
      if (status === "OK") {
        navigate(`/bimbingan-akademik/kaprodi/supervisor-information`);
      }
    } catch (error) {
      setIsLoading(false);
      handleOpenErrorModal();
      handleError(error);
    }
  };

  useEffect(() => {
    getSupervisor();
    return () => controller.abort();
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/kaprodi/supervisor-information/">
            Supervisor Information
          </StyledLink>
          <Typography color="text.primary">Add Supervisor</Typography>
        </Breadcrumbs>
      </div>
      <Typography
        fontSize={"24px"}
        fontWeight="500"
        sx={{ marginBottom: 3, paddingTop: "20px" }}
      >
        Add Supervisor
      </Typography>
      <Paper elevation={1} sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            backgroundColor: "#1A38601A",
            fontWeight: 500,
            padding: "16px",
          }}
        >
          Academic Supervisor Information
        </Typography>
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Full Name</Typography>
            <Stack>
              <FormControl size="small" sx={{ backgroundColor: "white" }}>
                <InputLabel shrink={false}>
                  {showLabel ? "Select" : ""}
                </InputLabel>
                <Select
                  value={
                    supervisorId ||
                    (SupervisorOptions?.length && supervisor?.id) ||
                    ""
                  }
                  onChange={(e) => {
                    setSupervisorId(e.target.value);
                    setSelectedSupervisor(
                      SupervisorOptions.find(
                        (supervisor) => supervisor.id === e.target.value
                      )
                    );
                    setShowLabel(false);
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: "37%",
                      },
                    },
                  }}
                >
                  {SupervisorOptions?.sort((a, b) =>
                    a.lastName.localeCompare(b.lastName)
                  ).map((item) => (
                    <MenuItem value={item.id || ""} key={item.id}>
                      {item.lastName}, {item.firstName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Email</Typography>
            <Paper variant="outlined" sx={{ padding: 1 }}>
              {selectedSupervisor?.email || "-"}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Phone</Typography>
            <Paper variant="outlined" sx={{ padding: 1 }}>
              {selectedSupervisor?.phoneNum || "-"}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Major</Typography>
            <Paper variant="outlined" sx={{ padding: 1 }}>
              {selectedSupervisor?.major === "IF"
                ? "Informatics"
                : selectedSupervisor?.major === "SI"
                ? "Information System"
                : selectedSupervisor?.major === "TI"
                ? "Information Technology"
                : "-"}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Address</Typography>
            <Paper variant="outlined" sx={{ padding: 1 }}>
              {selectedSupervisor?.Address || "-"}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        <Grid item md={9}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              margin: "12px",
            }}
          >
            List of Academic Supervisors
          </Typography>
        </Grid>
        <Grid
          item
          md={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            state={{
              supervisor: selectedSupervisor,
              students: students,
              major: selectedSupervisor?.major,
            }}
            style={{ textDecoration: "none", color: "white" }}
            to="student-list"
          >
            <Button
              sx={{
                backgroundColor: selectedSupervisor ? "#006AF5" : "gray",
                borderRadius: "24px",
                color: "white",
                whiteSpace: "nowrap",
                minWidth: "132px",
                fontSize: "12px",
                padding: "10px",
                gap: "6px",
                cursor: selectedSupervisor ? "pointer" : "not-allowed",

                "&:hover": {
                  backgroundColor: selectedSupervisor ? "#025ED8" : "gray",
                },
              }}
              onClick={selectedSupervisor ? null : handleClick}
            >
              <AddIcon sx={{ fontSize: "14px" }} />
              Add Student
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
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
                {students?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8}>No data available</TableCell>
                  </TableRow>
                ) : (
                  students
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((item, index) => (
                      <TableItem
                        item={item}
                        index={index + page * rowsPerPage}
                        key={index}
                      />
                    ))
                )}
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
            count={students?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(+event.target.value);
              setPage(0);
            }}
          />
        </Grid>
      </Grid>
      <Grid>
        <Button
          sx={{
            backgroundColor: "#006AF5",
            borderRadius: "24px",
            color: "white",
            whiteSpace: "nowrap",
            minWidth: "132px",
            fontSize: "12px",
            padding: "10px",
            margin: "0px 20px",

            "&:hover": {
              backgroundColor: "#025ED8",
            },
          }}
          onClick={() => setOpenFirstModal(true)}
        >
          Submit
        </Button>
        <Modal
          open={openFirstModal}
          onClose={() => {
            setOpenFirstModal(false);
            hideAlert();
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disablePortal
        >
          <div style={style}>
            {alert && (
              <CustomAlert message={alert.message} onClose={hideAlert} />
            )}
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              paddingTop={2}
              sx={{ fontWeight: 600 }}
            >
              Add Supervisor?
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ marginTop: "16px", marginBottom: "20px" }}
            >
              Are you sure you want to add supervisor?
            </Typography>
            <Grid container spacing={1} justifyContent="flex-end">
              <Grid item>
                <Button
                  onClick={() => {
                    setOpenFirstModal(false);
                    hideAlert();
                  }}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "5px",
                    color: "black",
                    whiteSpace: "nowrap",
                    backgroundColor: "lightgrey",
                    "&:hover": { backgroundColor: "darkgrey" },
                  }}
                >
                  No
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                  sx={{
                    backgroundColor: "#006AF5",
                    borderRadius: "5px",
                    color: "white",
                    whiteSpace: "nowrap",
                    "&:hover": { backgroundColor: "#025ED8" },
                  }}
                >
                  Yes
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
        <SuccessOrError
          open={openErrorModal}
          handleClose={handleCloseErrorModal}
          title="Error Submission!"
          description="Error: Failed to add supervisor. Please try again."
        />
      </Grid>
    </div>
  );
};

const TableHeading = () => {
  return (
    <TableRow>
      <TableCell sx={{ textAlign: "center" }}>No</TableCell>
      <TableCell sx={{ textAlign: "center" }}>NIM</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Student Name</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Major</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Arrival Year</TableCell>
      <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index }) => {
  return (
    <TableRow>
      <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{item.nim}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        {item.lastName}, {item.firstName}
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        {item.major === "IF"
          ? "Informatics"
          : item.major === "SI"
          ? "Information System"
          : item.major === "TI"
          ? "Information Technology"
          : "-"}
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>{item.arrivalYear}</TableCell>

      <TableCell sx={{ textAlign: "center" }}>
        <Chip
          label={item.status}
          variant="filled"
          color={item.status === "ACTIVE" ? "success" : "default"}
        />
      </TableCell>
    </TableRow>
  );
};

export default AddSupervisor;
