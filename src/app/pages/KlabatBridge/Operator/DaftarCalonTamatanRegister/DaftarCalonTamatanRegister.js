import Div from "@jumbo/shared/Div";
import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  FormControl,
  InputLabel,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Modal,
  TextField,
  Chip,
  Grid,
  Paper,
  Divider,
  FormControlLabel,
  Checkbox,
  ListSubheader,
  TablePagination,
  IconButton,
} from "@mui/material";
import ActionButton from "app/shared/ActionButton";
import SearchGlobal from "app/shared/SearchGlobal";
import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import axios from "axios";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import SearchIcon from "@mui/icons-material/Search";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  //border: '2px solid #000',
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const rows = [
  { id: 1, name: "Row 1", mk: "Robotics", sks: "3", keterangan: "Summer 2023" },
  {
    id: 2,
    name: "Row 2",
    mk: "Research Project 2",
    sks: "3",
    keterangan: "Summer 2023",
  },
  {
    id: 3,
    name: "Row 3",
    mk: "Machine Learning",
    sks: "3",
    keterangan: "Semester 1 2023/2024",
  },
  {
    id: 4,
    name: "Row 4",
    mk: "ITPM",
    sks: "3",
    keterangan: "Semester 1 2023/2024",
  },
  {
    id: 5,
    name: "Row 5",
    mk: "DevOps",
    sks: "3",
    keterangan: "Semester 1 2023/2024",
  },
  {
    id: 6,
    name: "Row 6",
    mk: "Internet of Things",
    sks: "3",
    keterangan: "Semester 1 2023/2024",
  },
  // Add more rows as needed
];

const DaftarCalonTamatan = () => {
  const [data, setData] = useState([]);
  const [statusByFac, setStatusByFac] = useState([]);
  const [statusByRegister, setStatusByRegister] = useState([]);
  const [graduatePlan, setGraduatePlan] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchBtn, setSearchBtn] = useState(false);
  // const [filterBy, setFilterBy] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedStatus, setSelectedStatus] = useState({});
  // const [data1, setData1] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // // dialog box to send data calon tamatan to operator
  // const [open, setOpen] = React.useState(false);

  // dialog box to accept student's SPT
  const [terimaSPT, setTerimaSPT] = React.useState(false);

  // open modal box to see form SPT of student
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (item) => {
    setSelectedData(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedData(null);
    setModalOpen(false);
  };

  const handleTolakButton = async (item) => {
    try {
      await jwtAuthAxios.patch(
        `spt/reg-approval/${item.id}?status=REJECTED`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleTerimaButton = async (item) => {
    try {
      await jwtAuthAxios.patch(
        `spt/reg-approval/${item.id}?status=APPROVED`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const TableSPT = ({ index, item }) => (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{item?.subject}</TableCell>
      <TableCell>{item?.sks}</TableCell>
      <TableCell>{item?.keterangan}</TableCell>
    </TableRow>
  );

  // modal content to see student's SPT
  const viewDetailSPT = (item) => (
    <Div>
      <Typography
        id="modal-modal-title"
        mb={2}
        sx={{ fontSize: "24px", fontWeight: 500 }}
      >
        Surat Permohonan Tamat
      </Typography>
      <Box sx={{ paddingX: 5 }}>
        <Typography variant="body1" sx={{ lineHeight: 2.5 }}>
          Saya yang bertanda tangan di bawah ini, bermohon untuk dapat wisuda
          pada
          <Chip
            label={`${item?.graduate_plan}`}
            variant={"outlined"}
            sx={{ marginX: "5px", borderRadius: "5px" }}
          />
          dengan sisa SKS yang harus diambil
          <Chip
            label={`${item?.remaining_credits}`}
            variant={"outlined"}
            sx={{ marginX: "5px", borderRadius: "5px" }}
          />
          sks.
        </Typography>
        <Grid container spacing={3} sx={{ paddingTop: 5 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Nama Sesuai Ijazah</Typography>
            <Typography variant="h6" sx={textSyle}>
              {item?.full_name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Nomor Registrasi</Typography>
            <Typography variant="h6" sx={textSyle}>
              {item?.reg_num}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Tanggal Lahir</Typography>
            <Typography variant="h6" sx={textSyle}>
              {item?.date_of_birth}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Jenis Kelamin</Typography>
            <Typography variant="h6" sx={textSyle}>
              {item?.gender}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Nomor Induk Kependudukan (NIK)</Typography>
            <Typography variant="h6" sx={textSyle}>
              {item?.nik}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Nomor Induk Mahasiswa (NIM)</Typography>
            <Typography variant="h6" sx={textSyle}>
              {item?.nim}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Email</Typography>
            <Typography variant="h6" sx={textSyle}>
              {item?.personal_email}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Program Studi</Typography>
            <Typography variant="h6" sx={textSyle}>
              {item?.major}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Minor/Konsentrasi</Typography>
            <Typography variant="h6" sx={textSyle}>
              {item?.minor}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Nomor Telepon</Typography>
            <Typography variant="h6" sx={textSyle}>
              {item?.phone_num}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Nama Ibu Kandung</Typography>
            <Typography variant="h6" sx={textSyle}>
              {item?.birth_mother}
            </Typography>
          </Grid>
        </Grid>

        {/* table */}
        <Typography mt={5} sx={{ fontSize: "24px", fontWeight: 500 }}>
          Sisa mata kuliah yang harus diambil:
        </Typography>
        <Box sx={{ marginY: 2 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ width: "10px" }}>No.</TableCell>
                  <TableCell sx={{ width: "300px" }}>Mata kuliah</TableCell>
                  <TableCell sx={{ width: "200px" }}>SKS</TableCell>
                  <TableCell sx={{ width: "400px" }}>Keterangan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {item?.remaining_classes?.map((item, index) => (
                  <TableSPT index={index} item={item} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Div
          sx={{
            display: "flex",
            direction: "row",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          {/* upload pdf sertifikat */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <iframe
                title="certificate"
                src={item?.certificateURL}
                // width="100%"
                // height="500px"
                //frameBorder="0"
              ></iframe>
            </Box>

            <Button
              size="small"
              sx={{
                textTransform: "none",
                mt: 1,
                alignSelf: "flex-start", // Align the button to the left
              }}
              onClick={() => {
                const pdfURL = item?.certificateURL;

                // Open the link in a new tab or window
                window.open(pdfURL, "_blank");
              }}
            >
              Open Certificate
            </Button>
          </div>

          {/* total sks */}
          <Typography variant="body1" sx={{ lineHeight: 2.5 }}>
            Total SKS yang diambil: {item?.remaining_credits} sks.
          </Typography>
        </Div>

        <Divider sx={{ marginY: 3 }} />

        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setModalOpen(false);
              handleTolakButton(item);
            }}
            style={{ marginRight: "10px" }}
          >
            Tolak
          </Button>
          <Div>
            <Button
              variant="contained"
              onClick={() => {
                setTerimaSPT(true);
                handleTerimaButton(item);
              }}
            >
              Terima
            </Button>
            <Dialog
              open={terimaSPT}
              onClose={() => {
                setTerimaSPT(false);
                setModalOpen(false);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Berhasil!"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Data berhasil ditambahkan
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setTerimaSPT(false);
                    setModalOpen(false);
                  }}
                  autoFocus
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Div>
        </Box>
      </Box>
    </Div>
  );

  React.useEffect(() => {
    // Fetch initial status values from the backend
    jwtAuthAxios
      .get("/spt", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const initialStatus = {};

        console.log("get status mhs", response.data.data);

        response.data.data.forEach((item) => {
          initialStatus[item.nim] = item.student.status;
        });
        setSelectedStatus(initialStatus);
      })
      .catch((error) => {
        console.error("Error fetching initial status:", error);
      });
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts

  const handleSelectChange = (event, nim) => {
    const newSelectedStatus = { ...selectedStatus, [nim]: event.target.value };
    setSelectedStatus(newSelectedStatus);

    // Send a PATCH request to update the backend
    // jwtAuthAxios.patch(`/spt/reg-changeStatus/${nim}`, { status: event.target.value })
    jwtAuthAxios
      .patch(
        `/spt/reg-changeStatus/${nim}?status=${event.target.value}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data); // Handle successful response if needed
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  // tabel calon tamatan
  const TableItem = ({ index, item }) => (
    <TableRow>
      <TableCell>{index + 1 + rowsPerPage * page}</TableCell>
      <TableCell>
        <Button
          variant="text"
          color="primary"
          onClick={() => handleOpenModal(item)}
          sx={{
            color: "black",
            textTransform: "capitalize",
            textAlign: "left",
            "&:hover": {
              color: "#4C5EFF", // Change background color on hover
            },
          }}
        >
          {item?.full_name}
        </Button>
      </TableCell>
      <TableCell>{item?.nim}</TableCell>
      <TableCell>{item?.faculty}</TableCell>
      <TableCell>
        {/* {item?.major === "IF" ? "Informatika" : "Sistem Informasi"} */}
        {item?.major}
      </TableCell>
      <TableCell>{item?.graduate_plan}</TableCell>
      <TableCell>
        {/* {item?.student.status} */}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select
            labelId={`status-select-${index}`}
            id={`status-select-${index}`}
            value={selectedStatus[item?.nim] || "ACTIVE"} // Set default value based on backend data
            onChange={(event) => handleSelectChange(event, item?.nim)}
          >
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="GRADUATE">Graduate</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="center">
        <Chip
          label={item?.approval_fac}
          style={{
            backgroundColor: getColorForApproval(item?.approval_fac),
            color: "white",
          }}
        />
      </TableCell>
      <TableCell align="center">
        <Chip
          label={item?.approval_reg}
          style={{
            backgroundColor: getColorForApproval(item?.approval_reg),
            color: "white",
          }}
        />
      </TableCell>
    </TableRow>
  );

  // colors for student's approval
  const getColorForApproval = (approvalValue) => {
    switch (approvalValue) {
      case "APPROVED":
        return "#5cb85c"; 
      case "WAITING":
        return "#f0ad4e"; 
      case "REJECTED":
        return "#d9534f"; 
      default:
        return "default"; 
    }
  };

  React.useEffect(() => {
    jwtAuthAxios
      .get(`/spt?search_query=${searchValue}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        const formattedData = res.data.data.map((item) => {
          const remaining_classes = JSON.parse(item.remaining_classes);
          return { ...item, remaining_classes };
        });

        console.log("formatted data", formattedData);
        // console.log(res.data.data);

        setData(formattedData);

        const uniqueStatusByFac = [
          ...new Set(res.data.data.map((item) => item.approval_fac)),
        ];
        const uniqueStatusByReg = [
          ...new Set(res.data.data.map((item) => item.approval_reg)),
        ];
        const uniqueGraduatePlan = [
          ...new Set(res.data.data.map((item) => item.graduate_plan)),
        ];

        setStatusByFac(uniqueStatusByFac);
        setStatusByRegister(uniqueStatusByReg);
        setGraduatePlan(uniqueGraduatePlan);
        // console.log(uniqueGraduatePlan);
      });
  }, [searchBtn]);

  function filterData() {
    // return data.filter(item => item["graduate_year"] === filterValue || item["major"] === filterValue);
    return data.filter(
      (item) =>
        item["approval_fac"] + "FACULTY" === filterValue ||
        item["approval_reg"] + "REGISTER" === filterValue ||
        item["graduate_plan"] === filterValue
    );
  }

  console.log(selectedData);

  return (
    <Box>
      <Div
        sx={{
          display: "flex",
          direction: "row",
          justifyContent: "space-between",
          gap: 3,
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
          Graduate Candidates
        </Typography>
        <Div
          sx={{
            display: "flex",
            direction: "row",
            gap: 3,
            alignItems: "center",
          }}
        >
          {/* searchbar */}
          <TextField
            // label="Search"
            placeholder="Search by Name or NIM"
            variant="outlined"
            size="small"
            // value={searchTerm}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setSearchBtn(!searchBtn)} edge="end">
                  <SearchIcon />
                </IconButton>
              ),
              style: { borderRadius: "25px", width: "250px", height: "35px" }, // Apply border radius here
            }}
          />
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel htmlFor="grouped-select">Filter</InputLabel>
            <Select
              defaultValue=""
              id="grouped-select"
              label="Filter"
              sx={{ borderRadius: 10, maxHeight: "50px" }}
              value={filterValue}
              onChange={(event) => setFilterValue(event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <ListSubheader sx={{ color: "#192739F0" }}>
                Status by Faculty
              </ListSubheader>
              {statusByFac.map((item) => {
                return <MenuItem value={item + "FACULTY"}>{item}</MenuItem>;
              })}

              <ListSubheader sx={{ color: "#192739F0" }}>
                Status by Register
              </ListSubheader>
              {statusByRegister.map((item) => {
                return <MenuItem value={item + "REGISTER"}>{item}</MenuItem>;
              })}

              <ListSubheader sx={{ color: "#192739F0" }}>
                Rencana Tamat
              </ListSubheader>
              {graduatePlan.map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Div>
      </Div>

      <TableContainer component={Paper} sx={{ overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>No</TableCell>
              <TableCell>Nama Lengkap</TableCell>
              <TableCell>Nim</TableCell>
              <TableCell>Fakultas</TableCell>
              <TableCell>Program Studi</TableCell>
              <TableCell>Rencana Tamat</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Approved by Faculty</TableCell>
              <TableCell>Approved by Registar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData().length > 0
              ? filterData()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableItem
                      index={index}
                      item={item}
                      key={item.nim} // Use a unique identifier from your data
                    />
                  ))
              : data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableItem
                      index={index}
                      item={item}
                      key={item.nim} // Use a unique identifier from your data
                    />
                  ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* modal box */}
      {/* <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ maxHeight: '800px', overflowY: 'auto' }}
      >
        {viewDetailSPT}
      </Modal> */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent style={{ maxHeight: "1200px", overflowY: "auto" }}>
          {viewDetailSPT(selectedData)}
        </DialogContent>
      </Dialog>

      {/* below the table Data Calon Tamatan */}
      <Grid container justifyContent="flex-end">
        <Grid item>
          {/* <Pagination count={10} color="primary" sx={{ marginY: 5 }} /> */}
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component={"div"}
            // count={data.length}
            count={filterData().length > 0 ? filterData().length : data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ marginY: 2 }}
          />
        </Grid>
      </Grid>

      {/* <Box display="flex" justifyContent="flex-end">
        <Button variant="outlined" color="primary" style={{ marginRight: "10px" }}>
          Batal
        </Button>
        
        <Div >
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Kirim
          </Button>
          <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
                {"Kirim Data SPT?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Data ini akan dikirim ke fakultas dan operator
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Batal</Button>
                <Button onClick={() => setOpen(false)} autoFocus>
                    Kirim
                </Button>
            </DialogActions>
          </Dialog>
        </Div>
      </Box> */}
    </Box>
  );
};

const textSyle = {
  borderWidth: 1,
  borderColor: "#00000029",
  borderStyle: "solid",
  paddingX: "24px",
  paddingY: "16px",
  borderRadius: "8px",
  minHeight: "50px",
};

export default DaftarCalonTamatan;
