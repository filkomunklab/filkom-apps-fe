import React, { useState, useEffect } from "react";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import WarningIcon from "@mui/icons-material/Warning";
import axios from "axios";

const ManajemenKelasDosenSkripsi = () => {
  // state - kelas
  const [daftarSemuaKelas, setDaftarSemuaKelas] = useState([]); // menyimpan data semua kelas
  const [daftarPilihanKelas, setDaftarPilihanKelas] = useState([]); // menyimpan data list kelas
  // const [kelasId, setKelasId] = useState(); // menyimpan id kelas yang dipilih
  const [selectedClass, setSelectedClass] = useState(null); // menyimpan index daftarSemuaKelas
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // buka/tutup konfirmasi hapus kelas
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [confirmDeleteClass, setConfirmDeleteClass] = useState(false);
  const [addStudentOpen, setAddStudentOpen] = useState(false); // buka/tutup tambah mahasiswa
  const [searchNIMs, setSearchNIMs] = useState(""); // menyimpan nim yang dimasukkan
  // const [studentId, setStudentId] = useState(); // menyimpan id student yang dipilih dalam kelas
  // state - akademik
  const [daftarAkademik, setDaftarAkademik] = useState([]);
  const [openAkademik, setOpenAkademik] = useState(false);
  const [openAddAkademik, setOpenAddAkademik] = useState(false);
  const [openUpdateAkademik, setOpenUpdateAkademik] = useState(false); // buka/tutup perbarui akademik
  const [semesterAkademik, setSemesterAkademik] = useState(""); // menyimpan akademik - semester yang akan diperbarui
  const [tahunAjaranAkademik, setTahunAjaranAkademik] = useState(""); // menyimpan akademik - year yang akan diperbarui
  const [selectedAkademikData, setSelectedAkademikData] = useState(null); // menyimpan akademik yang akan diperbarui
  // state - menambah kelas
  const [open, setOpen] = useState(false); // buka/tutup tambah kelas
  const [name, setName] = useState(""); // menyimpan kelas - name
  const [tahunAjaran, setTahunAjaran] = useState(""); // meyimpan kelas - tahun ajaran
  const [academic_id, setAcademicId] = useState(""); // meyimpan kelas - akademik
  const [hapusConfirmationDialogOpen, setHapusConfirmationDialogOpen] =
    useState(false);

  const [showDeleteStudentConfirmation, setShowDeleteStudentConfirmation] =
    useState(false);
  const [selectedStudentToDelete, setSelectedStudentToDelete] = useState(null);

  const [selectedAkademikToDelete, setSelectedAkademikToDelete] =
    useState(null);

  // Fungsi untuk membuka popup konfirmasi hapus mahasiswa
  const handleOpenDeleteStudentConfirmation = (studentId) => {
    setSelectedStudentToDelete(studentId);
    setShowDeleteStudentConfirmation(true);
  };

  // Fungsi untuk menutup popup konfirmasi hapus mahasiswa
  const handleCloseDeleteStudentConfirmation = () => {
    setShowDeleteStudentConfirmation(false);
  };

  // Fungsi untuk mengonfirmasi penghapusan mahasiswa
  const handleConfirmDeleteStudent = () => {
    if (selectedStudentToDelete) {
      handleDeleteStudent(selectedStudentToDelete); // Memanggil fungsi penghapusan mahasiswa
      setSelectedStudentToDelete(null);
      setShowDeleteStudentConfirmation(false);
    }
  };

  const confirmDeleteAkademik = () => {
    if (selectedAkademikToDelete) {
      handleDeleteAkademikAction(selectedAkademikToDelete);
      setSelectedAkademikToDelete(null);
    }
  };

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  const fetchDaftarSemuaKelasData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/v1/classroom",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Atur state 'setDaftarSemuaKelas' dengan data dari respons
      setDaftarSemuaKelas(response.data.data);
      console.log(
        "Berhasil mengambil daftar semua kelas: ",
        response.data.data
      );
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengambil daftar semua kelas:",
        error
      );
    }
  };
  const fetchDaftarPilihanKelasData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/v1/classroom",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Atur state 'setDaftarPilihanKelas' dengan data dari respons
      setDaftarPilihanKelas(response.data.data);
      console.log(
        "Berhasil mengambil daftar pilihan kelas: ",
        response.data.data
      );
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengambil daftar pilihan kelas:",
        error
      );
    }
  };
  const fetchDaftarAkademikData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/v1/academic-calendar",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const sortedAkademikData = response.data.data.sort((a, b) => {
        const semesterA = a.semester + a.year;
        const semesterB = b.semester + b.year;
        return semesterB.localeCompare(semesterA);
      });
      // Atur state 'setDaftarAkademik' dengan data dari respons
      setDaftarAkademik(response.data.data);
      console.log("Berhasil mengambil daftar akadmik: ", response.data.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil daftar akademik:", error);
    }
  };
  useEffect(() => {
    fetchDaftarSemuaKelasData();
    fetchDaftarPilihanKelasData();
    fetchDaftarAkademikData();
  }, [token]);

  // fungsi - hapus kelas
  const handleDeleteClass = () => {
    if (selectedClass !== null) {
      // Periksa apakah ada mahasiswa dalam kelas yang akan dihapus
      const daftarSemuaKelasData = daftarSemuaKelas[selectedClass];
      if (daftarSemuaKelasData.students.length > 0) {
        // Jika ada mahasiswa dalam kelas, tampilkan popup konfirmasi
        setShowDeleteConfirmation(true);
      } else {
        axios
          .delete(
            `http://localhost:2000/api/v1/classroom/${daftarSemuaKelasData.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            deleteClass(selectedClass);
            fetchDaftarSemuaKelasData();
            fetchDaftarPilihanKelasData();
            console.log("Kelas berhasil dihapus", response.data);
          })
          .catch((error) => {
            // Handle respons error
            console.error("Kelas tidak berhasil dihapus: ", error);
          });
      }
    }
  };

  // fungsi - bersihkan setelah hapus kelas
  const deleteClass = () => {
    setSelectedClass(null);
    setShowDeleteConfirmation(false);
  };

  // fungsi - buka/tutup kelas
  const handleAccordionClick = (classIndex) => {
    setSelectedClass(selectedClass === classIndex ? null : classIndex);
    console.log("Kelas yang dipilih: ", selectedClass);
  };

  // fungsi - menutup konfirmasi hapus kelas
  const handleCloseDeleteConfirmation = () => {
    // Tutup konfirmasi popup tanpa menghapus kelas
    setOpenDeleteConfirmation(false);
  };

  // fungsi - konfirmasi hapus kelas
  const handleConfirmDeleteClass = () => {
    setConfirmDeleteClass(false);
  };

  // fungsi - membatalkan hapus kelas
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  // fungsi - menambah mahasiswa
  const handleSearch = () => {
    // Split `searchNIMs` berdasarkan spasi atau tab
    const nims = searchNIMs.split(/\s+/);
    const newStudents = {
      classroom_id: daftarSemuaKelas[selectedClass].id,
      students: nims.map((nim) => ({ nim })),
    };
    console.log("create new students:", newStudents);
    console.log("class id:", setSelectedClass);
    axios
      .post(
        `http://localhost:2000/api/v1/classroom/insert-student`,
        newStudents,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // request data
        fetchDaftarSemuaKelasData();
        setAddStudentOpen(false);
        // Mengosongkan input setelah menambahkan mahasiswa
        setSearchNIMs("");
        console.log("Mahasiswa berhasil ditambahkan:", response.data);
      })
      .catch((error) => {
        console.error("Mahasiswa gagal ditambahkan", error);
      });
  };

  // fungsi - menghapus mahasiswa yang dipilih
  const handleDeleteStudent = (studentId) => {
    axios
      .delete(
        `http://localhost:2000/api/v1/classroom/delete-student/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // request data
        fetchDaftarSemuaKelasData();
        deleteClass(selectedClass);
        console.log("Mahasiswa berhasil dihapus", response.data);
      })
      .catch((error) => {
        // Handle respons error
        console.error("Mahasiswa gagal dihapus: ", error);
      });
  };

  // fungsi - membuka Kalender Akademik
  const handleOpenAkademik = () => {
    setOpenAkademik(true);
  };

  // fungsi - menutup Kalender Akademik
  const handleCloseAkademik = () => {
    setOpenAkademik(false);
  };

  // fungsi - membuka tambah akademik
  const handleOpenAddAkademik = () => {
    setOpenAddAkademik(true);
  };

  // fungsi - menutup tambah akademik
  const handleCloseAddAkademik = () => {
    setSemesterAkademik(null);
    setTahunAjaranAkademik(null);
    setOpenAddAkademik(false);
  };

  // fungsi - membuka perbarui akademik
  const handleOpenUpdateAkademik = (akademik) => {
    setSelectedAkademikData(akademik);
    setSemesterAkademik(akademik.semester);
    setTahunAjaranAkademik(akademik.year);
    setOpenUpdateAkademik(true);
  };

  // fungsi - menutup perbarui akademik
  const handleCloseUpdateAkademik = () => {
    setOpenUpdateAkademik(false);
    setSelectedAkademikData(null);
    setSemesterAkademik(null);
    setTahunAjaranAkademik(null);
  };

  // fungsi - menghapus akademik
  const handleDeleteAkademikAction = (akademik) => {
    setSelectedAkademikToDelete(akademik);
    // Melakukan DELETE request ke API
    axios
      .delete(`http://localhost:2000/api/v1/academic-calendar/${akademik.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Akademik berhasil dihapus:", akademik.id);
          // request data
          setHapusConfirmationDialogOpen();
          fetchDaftarAkademikData();
        } else {
          console.log("Akademik gagal dihapus:", akademik.id);
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menghapus akademik:", error);
      });
  };

  // fungsi - memperbarui akademik
  const handleUpdateAkademik = () => {
    if (selectedAkademikData) {
      const updatedData = {
        semester: semesterAkademik,
        year: tahunAjaranAkademik,
      };

      axios
        .put(
          `http://localhost:2000/api/v1/academic-calendar/${selectedAkademikData.id}`,
          updatedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(
              "Akademik berhasil diperbarui:",
              selectedAkademikData.id
            );
            // request data
            fetchDaftarAkademikData();
            handleCloseUpdateAkademik();
          } else {
            console.log("Akademik Gagal diperbarui:", selectedAkademikData.id);
          }
        })
        .catch((error) => {
          console.error("Terjadi kesalahan saat memperbarui akademik:", error);
        });
    }
  };

  // fungsi - menambahkan akademik
  const handleCreateAkademik = () => {
    if (semesterAkademik && tahunAjaranAkademik) {
      const newAkademikData = {
        semester: semesterAkademik,
        year: tahunAjaranAkademik,
      };

      axios
        .post(
          "http://localhost:2000/api/v1/academic-calendar",
          newAkademikData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            console.log("Akademik Berhasil ditambahkan:", response.data);
            // request data
            fetchDaftarAkademikData();
            // Reset nilai input
            setSemesterAkademik("");
            setTahunAjaranAkademik("");

            // Tutup dialog tambah akademik
            handleCloseAddAkademik();
          } else {
            console.error("Akademik gagal ditambahkan:", response.data);
          }
        })
        .catch((error) => {
          console.error("Terjadi kesalahan saat menambahkan akademik:", error);
        });
    }
  };

  // fungsi - membuka tambah kelas
  const handleOpen = () => {
    handleClose();
    setOpen(true);
  };

  // fungsi - menutup tambah kelas
  const handleClose = () => {
    setOpen(false);
    setAcademicId("");
    setName("");
    setTahunAjaran("");
  };

  // fungsi - membuat kelas
  const handleCreateClass = () => {
    const newClass = {
      academic_id,
      name,
    };
    console.log(newClass);

    axios
      .post(`http://localhost:2000/api/v1/classroom`, newClass, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Kelas berhasil dibuat:", response.data);
        fetchDaftarSemuaKelasData();
        fetchDaftarPilihanKelasData();
        handleClose();
      })
      .catch((error) => {
        console.error("Kelas Gagal dibuat:", error);
      });
  };

  return (
    <Div>
      <Div
        sx={{
          width: "100%",
          display: "flex",
          padding: "24px",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Div
          sx={{
            width: "60%",
            display: "flex",
            padding: "10px",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FormControl sx={{ width: "60%" }}>
            <InputLabel id="kelas">Kelas</InputLabel>
            <Select labelId="kelas" label="Kelas" size="small">
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
              {daftarPilihanKelas.map((kelas, index) => (
                <MenuItem key={index} value={index}>
                  {kelas.classroom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <SearchGlobal />
        </Div>
        <Div
          sx={{
            display: "flex",
            padding: "13px 0px",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "12px",
            flex: "1 0 0",
          }}
        >
          {/* Button Akademik Calender */}
          <Button
            style={{
              borderRadius: "60px",
              padding: "12px 16px",
              alignItems: "center",
              background: "#006AF5",
              color: "#ffff",
              "&:hover": { color: "#006AF5" },
            }}
            onClick={handleOpenAkademik}
          >
            Kalender Akademik
          </Button>
          {/* popup Akademik Caldender Start */}
          <Dialog
            open={openAkademik}
            onClose={handleCloseAkademik}
            fullWidth
            maxWidth="lg"
          >
            <DialogTitle
              variant="subtitle2"
              sx={{ textAlign: "center", background: "rgba(26, 56, 96, 0.10)" }}
            >
              Kalender Akademik
            </DialogTitle>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "25px",
              }}
            >
              <Button
                size="small"
                style={{
                  borderRadius: "60px",
                  background: "#006AF5",
                  color: "#ffff",
                  textTransform: "none",
                  "&:hover": { color: "#006AF5" },
                  marginLeft: "auto",
                  marginTop: "25px",
                }}
                onClick={handleOpenAddAkademik}
              >
                <AddIcon sx={{ fontSize: "20px" }} />
                Tambah Kalender Akademik
              </Button>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: "#F5F5F5" }}>
                      <TableCell sx={{ width: "10%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "40%" }}>Semester</TableCell>
                      <TableCell sx={{ width: "30%" }}>Tahun Ajaran</TableCell>
                      <TableCell sx={{ width: "25%", textAlign: "center" }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {daftarAkademik.map((akademik, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{akademik.semester}</TableCell>
                        <TableCell>{akademik.year}</TableCell>
                        <TableCell>
                          <Div
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                color: "blue",
                                fontSize: "14px",
                              }}
                              onClick={() => handleOpenUpdateAkademik(akademik)}
                            >
                              Perbarui
                            </span>
                            <Div
                              style={{
                                margin: "0 5px", // Margin di sekitar garis vertikal
                                color: "#E0E0E0",
                              }}
                            >
                              |
                            </Div>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                color: "red",
                                fontSize: "14px",
                              }}
                              onClick={() => {
                                setSelectedAkademikToDelete(akademik);
                              }}
                            >
                              Hapus
                            </span>
                          </Div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* popup hapus akademik */}
                    <Dialog
                      open={Boolean(selectedAkademikToDelete)}
                      onClose={() => setSelectedAkademikToDelete(null)}
                      maxWidth="xs"
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
                        <WarningIcon
                          fontSize="small"
                          sx={{ marginRight: "6px" }}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: "20px" }}
                        >
                          Hapus Akademik Kalender
                        </Typography>
                      </DialogTitle>
                      <DialogContent>
                        Apakah Anda yakin ingin menghapus akademik Kalender ini?
                      </DialogContent>
                      <DialogActions
                        sx={{ background: "rgba(26, 56, 96, 0.10)" }}
                      >
                        <Button
                          onClick={() => setSelectedAkademikToDelete(null)}
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
                          onClick={confirmDeleteAkademik}
                          sx={{
                            textTransform: "none",
                            background: "#FC0",
                            color: "#263445",
                            "&:hover": {
                              color: "#FC0",
                            },
                          }}
                        >
                          Dihapus
                        </Button>
                      </DialogActions>
                    </Dialog>

                    {/* popup update akademik */}
                    <Dialog
                      open={openUpdateAkademik}
                      onClose={handleCloseUpdateAkademik}
                      fullWidth
                      maxWidth="sm"
                    >
                      <DialogTitle
                        variant="subtitle2"
                        sx={{
                          textAlign: "center",
                          background: "rgba(26, 56, 96, 0.10)",
                        }}
                      >
                        Perbarui Akademik Kalender
                      </DialogTitle>
                      <DialogContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "25px",
                        }}
                      >
                        <FormControl fullWidth sx={{ marginTop: "25px" }}>
                          <InputLabel id="semester-label-akademik">
                            Semester
                          </InputLabel>
                          <Select
                            labelId="semester-label-akademik"
                            label="Semester"
                            value={semesterAkademik || ""}
                            onChange={(e) =>
                              setSemesterAkademik(e.target.value)
                            }
                          >
                            <MenuItem value="Ganjil">Ganjil</MenuItem>
                            <MenuItem value="Padat">Padat</MenuItem>
                            <MenuItem value="Genap">Genap</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          value={tahunAjaranAkademik}
                          onChange={(e) =>
                            setTahunAjaranAkademik(e.target.value)
                          }
                          label="Masukan Tahun Ajaran"
                          placeholder="Contoh: 2023/2024"
                          fullWidth
                        />
                      </DialogContent>
                      <DialogActions sx={{ background: "#F5F5F5" }}>
                        <Button
                          size="small"
                          onClick={handleCloseUpdateAkademik}
                          color="primary"
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
                          size="small"
                          variant="contained"
                          color="primary"
                          sx={{ textTransform: "none" }}
                          onClick={handleUpdateAkademik}
                        >
                          Simpan
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogActions sx={{ background: "#F5F5F5" }}>
              <Button
                onClick={handleCloseAkademik}
                color="primary"
                size="small"
                sx={{
                  background: "white",
                  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                  textTransform: "none",
                  color: "black",
                }}
              >
                Kembali
              </Button>
            </DialogActions>
          </Dialog>
          {/* popup Akademik Caldender End */}
          {/* popup membuat add Akademik Calendar start */}
          <Dialog
            fullWidth
            maxWidth="sm"
            open={openAddAkademik}
            onClose={handleCloseAddAkademik}
          >
            <DialogTitle
              variant="subtitle2"
              sx={{ textAlign: "center", background: "rgba(26, 56, 96, 0.10)" }}
            >
              Tambah Kalender Akademik
            </DialogTitle>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "25px",
              }}
            >
              <FormControl fullWidth sx={{ marginTop: "25px" }}>
                <InputLabel id="semester-label-akademik">Semester</InputLabel>
                <Select
                  labelId="semester-label-akademik"
                  label="Semester"
                  value={semesterAkademik}
                  onChange={(e) => setSemesterAkademik(e.target.value)}
                >
                  <MenuItem value="Ganjil">Ganjil</MenuItem>
                  <MenuItem value="Padat">Padat</MenuItem>
                  <MenuItem value="Genap">Genap</MenuItem>
                </Select>
              </FormControl>
              <TextField
                onChange={(e) => setTahunAjaranAkademik(e.target.value)}
                value={tahunAjaranAkademik}
                label="Tahun Ajaran"
                placeholder="Contoh: 2023/2024"
                fullWidth
              />
            </DialogContent>
            <DialogActions sx={{ background: "#F5F5F5" }}>
              <Button
                size="small"
                color="primary"
                sx={{
                  background: "white",
                  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                  textTransform: "none",
                  color: "black",
                }}
                onClick={handleCloseAddAkademik}
              >
                Kembali
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                sx={{ textTransform: "none" }}
                onClick={handleCreateAkademik}
              >
                Buat Akademik
              </Button>
            </DialogActions>
          </Dialog>
          {/* popup membuat add Akademik Calendar end */}

          <Button
            onClick={handleOpen}
            style={{
              borderRadius: "60px",
              padding: "12px 16px",
              alignItems: "center",
              background: "#006AF5",
              color: "#ffff",
              "&:hover": { color: "#006AF5" },
            }}
          >
            <AddIcon />
            Tambah Kelas
          </Button>
        </Div>
        {/* popup membuat kelas start */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle
            variant="subtitle2"
            sx={{ textAlign: "center", background: "rgba(26, 56, 96, 0.10)" }}
          >
            Tambah Kelas
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "25px",
            }}
          >
            <FormControl fullWidth sx={{ marginTop: "25px" }}>
              <InputLabel id="kelas-label">Kelas</InputLabel>
              <Select
                labelId="kelas-label"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Kelas"
              >
                <MenuItem value="Proposal">Proposal</MenuItem>
                <MenuItem value="Skripsi">Skripsi</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="semester-label">Semester</InputLabel>
              <Select
                labelId="semester-label"
                value={academic_id}
                onChange={(e) => setAcademicId(e.target.value)}
                label="Semester"
                sx={{ maxHeight: "600px" }}
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
                    maxHeight: "600px", // Sesuaikan dengan tinggi yang diinginkan
                  },
                }}
              >
                {daftarAkademik.map((semesterData) => (
                  <MenuItem
                    key={semesterData.id} // Sesuaikan dengan kunci yang sesuai di data Anda
                    value={semesterData.id}
                  >
                    {`${semesterData.semester} ${semesterData.year}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ background: "#F5F5F5" }}>
            <Button
              size="small"
              onClick={handleClose}
              color="primary"
              sx={{
                background: "white",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                textTransform: "none",
                color: "black",
              }}
            >
              Kembali
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              sx={{ textTransform: "none" }}
              onClick={handleCreateClass}
            >
              Buat Kelas
            </Button>
          </DialogActions>
        </Dialog>
        {/* popup membuat kelas end */}
      </Div>
      <Div
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "25px",
          width: "100%",
          height: "460px",
          overflowY: "auto",
          background: "#FFF",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "8px",
          borderRadius: "8px",
        }}
      >
        {daftarSemuaKelas.map((classroomData, index) => (
          <Accordion
            key={index}
            expanded={selectedClass === index}
            onChange={() => handleAccordionClick(index)}
            sx={{
              marginBottom: "25px",
              width: "100%",
              padding: "1px",
              background: "rgba(26, 56, 96, 0.10)",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <AccordionSummary>
              <div>
                <Typography variant="h2">{classroomData.classroom}</Typography>
              </div>
            </AccordionSummary>

            <AccordionDetails>
              <Div sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={handleDeleteClass}
                >
                  <DeleteIcon fontSize="small" />
                  Hapus Kelas
                </Button>
                {/* Konfirmasi popup untuk menghapus kelas */}
                <Dialog
                  open={openDeleteConfirmation}
                  onClose={handleCloseDeleteConfirmation}
                  fullWidth
                  maxWidth="sm"
                >
                  <DialogTitle variant="subtitle2">
                    Konfirmasi Penghapusan Kelas
                  </DialogTitle>
                  <DialogContent>
                    <Typography>
                      Anda tidak dapat menghapus kelas ini karena masih ada
                      mahasiswa di dalamnya. Harap hapus semua mahasiswa
                      terlebih dahulu sebelum menghapus kelas ini.
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      size="small"
                      onClick={handleCloseDeleteConfirmation}
                      color="primary"
                    >
                      Batal
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      onClick={handleConfirmDeleteClass}
                    >
                      Hapus Kelas
                    </Button>
                  </DialogActions>
                </Dialog>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => setAddStudentOpen(true)}
                  sx={{ textTransform: "none" }}
                >
                  <AddCircleOutlineIcon fontSize="small" />
                  Tambahkan Mahasiswa
                </Button>
              </Div>
              <TableContainer sx={{ marginTop: "25px" }} component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: "#F5F5F5" }}>
                      <TableCell>No</TableCell>
                      <TableCell>Nama Mahasiswa</TableCell>
                      <TableCell>NIM</TableCell>
                      <TableCell>Program Studi</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {classroomData.students.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell>{student.nim}</TableCell>
                        <TableCell>
                          {student.major === "IF"
                            ? "Informatika"
                            : student.major === "SI"
                            ? "Sistem Informasi"
                            : student.major}
                        </TableCell>
                        <TableCell>
                          <span
                            style={{
                              textDecoration: "none",
                              cursor: "pointer",
                              color: "red",
                              fontSize: "14px",
                            }}
                            onClick={() =>
                              handleOpenDeleteStudentConfirmation(student.id)
                            }
                          >
                            Hapus
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </Div>
      {/* Dialog Konfirmasi Hapus Mahasiswa */}
      <Dialog
        open={showDeleteStudentConfirmation}
        onClose={handleCloseDeleteStudentConfirmation}
        maxWidth="xs"
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
          <WarningIcon fontSize="small" sx={{ marginRight: "6px" }} />
          <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
            Hapus Mahasiswa
          </Typography>
        </DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menghapus mahasiswa ini?
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCloseDeleteStudentConfirmation}
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
            onClick={handleConfirmDeleteStudent}
            sx={{
              textTransform: "none",
              background: "#FC0",
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

      {showDeleteConfirmation && (
        <Dialog
          open={showDeleteConfirmation}
          onClose={() => setSelectedAkademikToDelete(null)}
          maxWidth="xs"
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
            <WarningIcon fontSize="small" sx={{ marginRight: "6px" }} />
            <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
              Hapus Kelas
            </Typography>
          </DialogTitle>
          <DialogContent>
            Kelas tidak dapat dihapus karena masih ada mahasiswa didalam kelas
          </DialogContent>
          <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
            <Button
              onClick={handleCancelDelete}
              sx={{
                background: "white",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                textTransform: "none",
                color: "black",
              }}
            >
              Batal
            </Button>
            {/* <Button
              onClick={() => deleteClass(selectedClass)}
              sx={{
                textTransform: "none",
                background: "#FC0",
                color: "#263445",
                "&:hover": {
                  color: "#FC0",
                },
              }}
            >
              Hapus
            </Button> */}
          </DialogActions>
        </Dialog>
      )}

      {/* tambah mahasiswa */}
      <Dialog
        open={addStudentOpen}
        onClose={() => setAddStudentOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          variant="subtitle2"
          sx={{ textAlign: "center", background: "rgba(26, 56, 96, 0.10)" }}
        >
          Menambahkan Mahasiswa
        </DialogTitle>
        <DialogContent>
          <Div
            sx={{
              textAlign: "center",
            }}
          >
            <TextField
              size="small"
              type="text"
              placeholder="Masukkan NIM mahasiswa (pisahkan dengan spasi)"
              value={searchNIMs}
              onChange={(e) => setSearchNIMs(e.target.value)}
              sx={{
                margin: "10px 0",
                padding: "10px 0",
                width: "100%",
              }}
            />
          </Div>
        </DialogContent>
        <DialogActions sx={{ background: "#F5F5F5" }}>
          <Button
            size="small"
            onClick={() => setAddStudentOpen(false)}
            color="primary"
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
            size="small"
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ textTransform: "none" }}
          >
            Tambah
          </Button>
        </DialogActions>
      </Dialog>
    </Div>
  );
};

export default ManajemenKelasDosenSkripsi;
