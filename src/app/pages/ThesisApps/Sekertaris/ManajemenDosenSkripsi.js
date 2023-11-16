import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import AddIcon from "@mui/icons-material/Add";
import Div from "@jumbo/shared/Div";
import WarningIcon from "@mui/icons-material/Warning";

const ManajemenDosenSkripsi = () => {
  // state - menyimpan hasil request data
  const [dosenSkripsi, setDosenSkripsi] = useState();
  const [daftarDosen, setDaftarDosen] = useState();

  const [selectedUserId, setSelectedUserId] = useState();

  const groupId = useParams().groupId;
  console.log("group id: ", groupId);
  const [progress, setProgress] = useState(null);

  const userRole = useParams().role;
  console.log("role user akses page: ", userRole);

  const { role } = JSON.parse(localStorage.getItem("user"));
  // const role = ["ADVISOR", "DOSEN"];
  console.log("role user yang sign in: ", role);
  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchDosenSkripsiData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/employee/dosen-skripsi`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setDosenSkripsi(response.data.data);
        console.log("Request Get daftar dosen skripsi: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil daftar dosen skripsi:",
          error
        );
      }
    };
    // daftar dosen yang bukan dosen skripsi
    const fetchDaftarDosenData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/employee/dosen`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setDaftarDosen(response.data.data);
        console.log("Request Get daftar dosen: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil daftar dosen:", error);
      }
    };
    fetchDosenSkripsiData();
    fetchDaftarDosenData();
  }, [token]);

  const [open, setOpen] = useState(false);
  const [selectedDosen, setSelectedDosen] = useState("");
  const [dosenList, setDosenList] = useState([]);
  const [nextDosenId, setNextDosenId] = useState(1);

  const [confirmationDialogOpenNonActive, setConfirmationDialogOpenNonActive] =
    useState(false);
  const [selectedDosenId, setSelectedDosenId] = useState(null);

  const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] =
    useState(false);
  const [selectedDosenToDelete, setSelectedDosenToDelete] = useState(null);

  const handleOpenDeleteConfirmationDialog = (dosenId) => {
    setSelectedDosenToDelete(dosenId);
    setDeleteConfirmationDialogOpen(true);
  };

  const handleCloseDeleteConfirmationDialog = () => {
    setSelectedDosenToDelete(null);
    setDeleteConfirmationDialogOpen(false);
  };

  const handleOpenConfirmationDialogNonActive = (dosenId) => {
    setSelectedDosenId(dosenId);
    setConfirmationDialogOpenNonActive(true);
  };

  const handleCloseConfirmationDialogNonActive = () => {
    setSelectedDosenId(null);
    setConfirmationDialogOpenNonActive(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleTambahDosenSkripsi = () => {
    if (selectedDosen) {
      const dosen = {
        employee_id: selectedDosen,
      };
      console.log("dosen yang akan dikirim: ", dosen);
      axios
        .post(`http://localhost:2000/api/v1/employee/dosen-skripsi`, dosen, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSelectedDosen("");
          setOpen(false);

          console.log("Berhasil menambah dosen skripsi:", response.data);

          // request data
          const fetchDosenSkripsiData = async () => {
            try {
              const response = await axios.get(
                `http://localhost:2000/api/v1/employee/dosen-skripsi`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                  },
                }
              );
              setDosenSkripsi(response.data.data);
              console.log(
                "Request Get daftar dosen skripsi: ",
                response.data.data
              );
            } catch (error) {
              console.error(
                "Terjadi kesalahan saat mengambil daftar dosen skripsi:",
                error
              );
            }
          };
          // daftar dosen yang bukan dosen skripsi
          const fetchDaftarDosenData = async () => {
            try {
              const response = await axios.get(
                `http://localhost:2000/api/v1/employee/dosen`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                  },
                }
              );
              setDaftarDosen(response.data.data);
              console.log("Request Get daftar dosen: ", response.data.data);
            } catch (error) {
              console.error(
                "Terjadi kesalahan saat mengambil daftar dosen:",
                error
              );
            }
          };
          fetchDosenSkripsiData();
          fetchDaftarDosenData();
        })
        .catch((error) => {
          console.error(
            "Terjadi kesalahan saat menambah dosen skripsi:",
            error
          );
        });
    }
  };

  const dosenOptions = [
    { value: 10, label: "Andrew T. Liem, MT, PhD" },
    { value: 20, label: "Green Mandias, SKom, MCs" },
    { value: 30, label: "Stenly R. Pungus, MT, PhD" },
    { value: 40, label: "Debby E. Sondakh, MT, PhD" },
    { value: 50, label: "Ir. Edson Y. Putra, MKom" },
    { value: 60, label: "Green A. Sandag, SKom, MS" },
    { value: 70, label: "Jacquline M. S. Waworundeng, ST, MT" },
    { value: 80, label: "Jimmy H. Moedjahedy, SKom, MKom, MM" },
    { value: 90, label: "Joe Y. Mambu, BSIT, MCIS" },
    { value: 100, label: "Lidya C. Laoh, SKom, MMSi" },
    { value: 110, label: "Marshal Tombeng," },
    { value: 120, label: "Oktoverano H. Lengkong, SKom, MDs, MM" },
    { value: 130, label: "Reymon Rotikan, SKom, MS, MM" },
    { value: 140, label: "Reynoldus A. Sahulata, SKom, MM" },
    { value: 150, label: "Rolly Lontaan, MKom" },
    { value: 160, label: "Semmy W. Taju, SKom" },
    { value: 170, label: "Senly I. Adam, SKom, MSc" },
  ];

  const generateRandomNIDN = () => {
    // Fungsi ini bisa Anda sesuaikan sesuai kebutuhan Anda
    // Untuk menghasilkan NIDN secara acak
    return Math.floor(1000000000 + Math.random() * 9000000000);
  };

  const handleToggleStatus = (dosenId, newStatus) => {
    const updatedDosenList = dosenList.map((dosen) => {
      if (dosen.id === dosenId) {
        return { ...dosen, status: newStatus };
      }
      return dosen;
    });

    setDosenList(updatedDosenList);
  };

  const handleDeleteDosen = () => {
    axios
      .delete(
        `http://localhost:2000/api/v1/employee/dosen-skripsi/${selectedUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // bersihkan user id yang dipilih
        setSelectedUserId("");
        // tutup konfirmasi
        handleCloseDeleteConfirmationDialog();

        console.log("Berhasil menghapus dosen skripsi:", response.data);

        // request data
        const fetchDosenSkripsiData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/employee/dosen-skripsi`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setDosenSkripsi(response.data.data);
            console.log(
              "Request Get daftar dosen skripsi: ",
              response.data.data
            );
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil daftar dosen skripsi:",
              error
            );
          }
        };
        // daftar dosen yang bukan dosen skripsi
        const fetchDaftarDosenData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/employee/dosen`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setDaftarDosen(response.data.data);
            console.log("Request Get daftar dosen: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil daftar dosen:",
              error
            );
          }
        };
        fetchDosenSkripsiData();
        fetchDaftarDosenData();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menghapus dosen skripsi:", error);
      });
  };

  const handleConfirmStatusChange = (newStatus) => {
    if (selectedDosenId !== null) {
      // Lakukan logika untuk mengubah status dosen dengan ID yang sesuai
      const updatedDosenList = dosenList.map((dosen) => {
        if (dosen.id === selectedDosenId) {
          return { ...dosen, status: newStatus };
        }
        return dosen;
      });

      setDosenList(updatedDosenList);
      setSelectedDosenId(null);
    }
  };

  return (
    <Div>
      {/* Table Master Start */}
      <Div
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* Header Start */}
        <Div
          sx={{
            width: "100%",
            display: "flex",
            padding: "24px",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",

              alignSelf: "stretch",
              fontSize: "20px",
              fontWeight: 600,
              width: "50%",
            }}
          >
            Manajemen Dosen Skripsi
          </Typography>
          <Div
            sx={{
              flexDirection: "row",
              display: "flex",
              padding: "12px 16px",
              alignItems: "center",
              gap: "16px",
              flexShrink: 0,
              width: "30%",
            }}
          >
            <SearchGlobal />
          </Div>
          <Div
            sx={{
              flexDirection: "row",
              display: "flex",
              padding: "12px 16px",
              alignItems: "center",
              gap: "16px",
              flexShrink: 0,
            }}
          >
            <Button
              color="primary"
              variant="contained"
              sx={{
                borderRadius: "50px",
                textTransform: "none",
              }}
              onClick={handleOpenDialog}
            >
              <AddIcon fontSize="small" />
              <Typography sx={{ fontSize: "14px", padding: "4px" }}>
                Tambahkan Dosen Skripsi
              </Typography>
            </Button>
          </Div>
        </Div>
        {/* Header End */}
        {/* Table Mahasiswa Proposal Start */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "25px", fontSize: "13px" }}>
                  Nomor
                </TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Nama Dosen</TableCell>
                <TableCell sx={{ fontSize: "13px" }}>NIDN</TableCell>
                {/* <TableCell sx={{ fontSize: "13px" }}>Status</TableCell> */}
                <TableCell sx={{ fontSize: "13px" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dosenSkripsi?.map((dosen, index) => (
                <TableRow key={dosen.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{dosen.fullName}</TableCell>
                  <TableCell>{dosen.nidn}</TableCell>
                  <TableCell sx={{ width: "20%" }}>
                    <Div sx={{ display: "flex" }}>
                      <span
                        style={{
                          textDecoration: "none",
                          cursor: "pointer",
                          color: "red",
                        }}
                        onClick={() => {
                          handleOpenDeleteConfirmationDialog(dosen.id);
                          setSelectedUserId(dosen.role_id);
                        }}
                      >
                        Hapus
                      </span>
                    </Div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Table Mahasiswa Proposal End */}
      </Div>
      {/* Table Master End */}

      {/* Dialog Tambah Dosen Skripsi */}
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            background: "rgba(26, 56, 96, 0.10)",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Tambahkan Dosen Skripsi
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "25px",
            alignSelf: "stretch",
          }}
        >
          <Div
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "25px",
              alignSelf: "stretch",
            }}
          >
            {/* Daftar Dosen */}
            <FormControl fullWidth size="small" sx={{ marginTop: "25px" }}>
              <InputLabel id="dosen-label">Dosen</InputLabel>
              <Select
                labelId="dosen-label"
                id="dosen"
                label="Dosen"
                value={selectedDosen}
                onChange={(event) => setSelectedDosen(event.target.value)}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                  style: {
                    maxHeight: "230px", // Sesuaikan dengan tinggi yang diinginkan
                  },
                }}
              >
                {daftarDosen?.map((dosen) => (
                  <MenuItem key={dosen.id} value={dosen.id}>
                    {dosen.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Div>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              background: "white",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              textTransform: "none",
              color: "black",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={handleTambahDosenSkripsi}
            color="primary"
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Tambah
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Konfirmasi Delete */}
      <Dialog
        open={deleteConfirmationDialogOpen}
        onClose={handleCloseDeleteConfirmationDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
          }}
        >
          <WarningIcon fontSize="large" sx={{ marginRight: "6px" }} />
          <Typography variant="h1" sx={{ margin: "10px 0" }}>
            Menonaktifkan Dosen Skripsi
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus Dosen ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCloseDeleteConfirmationDialog}
            sx={{
              background: "white",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              textTransform: "none",
              color: "black",
              textTransform: "none",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={() => {
              handleDeleteDosen();
            }}
            sx={{
              background: "#FC0",
              boxShadow: "rgba(0, 0, 0, 0.12)",
              textTransform: "none",
              color: "#263445",
              "&:hover": {
                color: "#FC0",
              },
            }}
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Div>
  );
};

export default ManajemenDosenSkripsi;
