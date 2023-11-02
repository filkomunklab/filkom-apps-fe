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
import axios from "axios";

const ManajemenKelasDosenSkripsi = () => {
  const [open, setOpen] = useState(false);
  const [academic_id, setAcademicId] = useState("");
  const [name, setName] = useState("");
  const [tahunAjaran, setTahunAjaran] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [kelasMahasiswa, setKelasMahasiswa] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openAkademik, setOpenAkademik] = useState(false);
  const [openAddAkademik, setOpenAddAkademik] = useState(false);
  const [akademikData, setAkademikData] = useState([]);

  const [semesterAkademik, setSemesterAkademik] = useState("");
  const [tahunAjaranAkademik, setTahunAjaranAkademik] = useState("");
  const [addedStudents, setAddedStudents] = React.useState([]);

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  function findStudentByNIM(nim) {
    const student = students.find((student) => student.nim === nim);
    return student;
  }

  const handleDeleteStudent = (index) => {
    const updatedAddedStudents = [...addedStudents];
    updatedAddedStudents.splice(index, 1);
    setAddedStudents(updatedAddedStudents);

    const updatedSearchResults = [...searchResults];
    updatedSearchResults.splice(index, 1);
    setSearchResults(updatedSearchResults);
  };

  const handleConfirmDeleteClass = () => {
    const classIndex = selectedClassIndex;
    const updatedClasses = [...classes];
    updatedClasses.splice(classIndex, 1);
    setClasses(updatedClasses);
    setKelasMahasiswa(
      kelasMahasiswa.filter((_, index) => index !== classIndex)
    );
    setConfirmDeleteClass(false);
  };
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleCloseDeleteConfirmation = () => {
    // Tutup konfirmasi popup tanpa menghapus kelas
    setOpenDeleteConfirmation(false);
  };

  const handleSearch = () => {
    // Memisahkan NIM yang dimasukkan pengguna berdasarkan spasi
    const nims = searchNIMs.split(" ");
    const newResults = [];

    // Loop melalui setiap NIM dan cari informasi mahasiswa
    for (const nim of nims) {
      const student = findStudentByNIM(nim);
      if (student) {
        newResults.push(student);
      }
    }

    axios
      .post(`http://localhost:2000/api/v1/classroom/insert-student`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Menambahkan hasil pencarian baru ke daftar mahasiswa yang telah ditambahkan
        setAddedStudents([...addedStudents, ...newResults]);

        // Menggabungkan hasil pencarian baru dengan data yang sudah ada
        setSearchResults([...searchResults, ...newResults]);
        setAddStudentOpen(false);
        // Mengosongkan input setelah menambahkan mahasiswa
        setSearchNIMs("");
        console.log("berhasil menambahkan mahasiswa:", response.data);
      })
      .catch((error) => {
        console.error("Gagal menambahkan mahasiswa");
      });
  };

  const [confirmDeleteClass, setConfirmDeleteClass] = useState(false);
  const [selectedClassIndex, setSelectedClassIndex] = useState(null);

  const studentss = [
    { name: "John Doe", nim: "123456", prodi: "Teknik Informatika" },
    { name: "Jane Smith", nim: "789012", prodi: "Manajemen Bisnis" },
    { name: "David Johnson", nim: "654321", prodi: "Akuntansi" },
    { name: "Mary Brown", nim: "987654", prodi: "Ilmu Komputer" },
    { name: "Michael Davis", nim: "4567839", prodi: "Manajemen Bisnis" },
    { name: "Linda Wilson", nim: "5678930", prodi: "Teknik Sipil" },
    { name: "James Lee", nim: "2345627", prodi: "Ilmu Komputer" },
    { name: "Patricia Evans", nim: "3456782", prodi: "Teknik Elektro" },
    { name: "Robert Martinez", nim: "342242", prodi: "Teknik Informatika" },
    { name: "Jennifer Taylor", nim: "89012342", prodi: "Manajemen Bisnis" },
    { name: "William Anderson", nim: "7890132", prodi: "Akuntansi" },
    { name: "Elizabeth Harris", nim: "1234567", prodi: "Ilmu Komputer" },
    { name: "Joseph Clark", nim: "987654", prodi: "Manajemen Bisnis" },
    { name: "Mildred White", nim: "234567", prodi: "Teknik Sipil" },
    { name: "Charles Lewis", nim: "456789", prodi: "Ilmu Komputer" },
    { name: "Nancy Hall", nim: "345678", prodi: "Teknik Elektro" },
    { name: "Thomas Young", nim: "5678904", prodi: "Teknik Informatika" },
    { name: "Karen King", nim: "890123", prodi: "Manajemen Bisnis" },
    { name: "Mark Adams", nim: "654321", prodi: "Akuntansi" },
    { name: "Sarah Scott", nim: "567890", prodi: "Ilmu Komputer" },
  ];

  const [searchNIMs, setSearchNIMs] = React.useState(""); // State untuk NIM yang dimasukkan pengguna
  const [searchResults, setSearchResults] = React.useState([]); // State untuk hasil pencarian

  function findStudentByNIM(nim) {
    const student = studentss.find((student) => student.nim === nim);
    return student;
  }

  // State untuk mengelola data akademik yang sedang diupdate
  const [selectedAkademikData, setSelectedAkademikData] = useState(null);
  const [openUpdateAkademik, setOpenUpdateAkademik] = useState(false);

  // Fungsi untuk membuka form update data akademik
  const handleOpenUpdateAkademik = (data) => {
    setSelectedAkademikData(data);
    setSemesterAkademik(data.semester);
    setTahunAjaranAkademik(data.year);
    setOpenUpdateAkademik(true);
  };

  // Fungsi untuk menutup form update data akademik
  const handleCloseUpdateAkademik = () => {
    setOpenUpdateAkademik(false);
    setSelectedAkademikData(null);
  };

  // Fungsi untuk menghapus data akademik
  const handleDeleteAkademik = (data) => {
    // Melakukan DELETE request ke API
    axios
      .delete(`http://localhost:2000/api/v1/academic-calendar/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`, //ganti token dengan sesusai
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Data berhasil dihapus:", data.id);
          // Memperbarui state setelah penghapusan
          const updatedAkademikData = akademikData.filter(
            (item) => item.id !== data.id
          );
          setAkademikData(updatedAkademikData);
        } else {
          console.log("Gagal menghapus data:", data.id);
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menghapus data:", error);
      });
  };

  // Fungsi untuk mengirim permintaan pembaruan (update) data akademik
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
            console.log("Data berhasil diperbarui:", selectedAkademikData.id);
            // Update state dengan data yang diperbarui
            const updatedAkademikData = akademikData.map((item) =>
              item.id === selectedAkademikData.id
                ? { ...item, ...updatedData }
                : item
            );
            setAkademikData(updatedAkademikData);
            handleCloseUpdateAkademik();
          } else {
            console.log("Gagal memperbarui data:", selectedAkademikData.id);
          }
        })
        .catch((error) => {
          console.error("Terjadi kesalahan saat memperbarui data:", error);
        });
    }
  };

  const handleOpenAddAkademik = () => {
    setOpenAddAkademik(true);
  };

  const handleCloseAddAkademik = () => {
    setOpenAddAkademik(false);
  };

  const handleOpenAkademik = () => {
    setOpenAkademik(true);
  };

  const handleCloseAkademik = () => {
    setOpenAkademik(false);
  };

  const handleOpen = () => {
    handleClose();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAcademicId("");
    setName("");
    setTahunAjaran("");
  };

  // fungsi untuk mendapatkan data GET
  // token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMmViMzU2ODctYzQxNC00NjM0LWIwMTAtMWI2NGNhYTFiZjI3IiwibmlrIjoiZG9zZW4xIiwibmFtZSI6IkxlY3R1cmVyMSBEb3NlbjEiLCJyb2xlIjpbIkRPU0VOIiwiRE9TRU5fTUsiLCJLQVBST0RJIl19LCJpYXQiOjE2OTg2Mjk3Mzh9.B8r31KdGUmERHhPg03k_o_qEi11A51U8zeITaCJmfeg";

  useEffect(() => {
    // Fungsi untuk mengambil data akademik
    const fetchAcademicData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/academic-calendar",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAkademikData(response.data.data);
        console.log("Berhasil mengambil data:");
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    const fetchClassData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/classroom",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClasses(response.data.data);
        console.log("Berhasil mengambil data kelas:");
        console.log(response.data);
      } catch (error) {
        console.error("Gagal mengambil data kelas", error);
      }
    };

    fetchClassData();
    fetchAcademicData();
  }, []);

  // mengirim data POST akademik
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
            // Jika berhasil menambahkan, tambahkan data baru ke state
            setAkademikData([...akademikData, response.data.data]);
            console.log("Berhasil menambahkan data:", response.data);

            // Reset nilai input
            setSemesterAkademik("");
            setTahunAjaranAkademik("");

            // Tutup dialog tambah akademik
            handleCloseAddAkademik();
          } else {
            console.error("Gagal menambahkan data:", response.data);
          }
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        });
    }
  };

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
        // Berhasil membuat kelas di backend, Anda dapat menangani respons di sini
        console.log("Kelas berhasil dibuat:", response.data);
        setClasses([...classes, newClass]);
        handleClose();
        setKelasMahasiswa([
          ...kelasMahasiswa,
          `${academic_id} - Semester ${name}`,
        ]);
      })
      .catch((error) => {
        // Penanganan kesalahan jika ada
        console.error("Gagal membuat kelas:", error);
      });
  };

  const handleAccordionClick = (classIndex) => {
    setSelectedClass(selectedClass === classIndex ? null : classIndex);
  };

  const handleUpdateStudent = () => {
    if (selectedStudent) {
      const updatedStudents = [...students];
      const selectedIndex = selectedStudent.selectedIndex;
      updatedStudents[selectedIndex] = selectedStudent;
      setStudents(updatedStudents);
      setSelectedStudent(null);
    }
  };

  const handleDeleteClass = () => {
    if (selectedClass !== null) {
      // Periksa apakah ada mahasiswa dalam kelas yang akan dihapus
      const classData = classes[selectedClass];
      if (classData.students.length > 0) {
        // Jika ada mahasiswa dalam kelas, tampilkan popup konfirmasi
        setShowDeleteConfirmation(true);
      } else {
        axios
          .delete(`http://localhost:2000/api/v1/classroom/${classData.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // Jika tidak ada mahasiswa dalam kelas, langsung hapus kelas
            deleteClass(selectedClass);
            console.log("Kelas berhasil dihapus", response.data);
          })
          .catch((error) => {
            // Handle respons error
            console.error("Kelas tidak berhasil dihapus: ", error);
          });
      }
    }
  };

  const deleteClass = (classIndex) => {
    const updatedClasses = [...classes];
    updatedClasses.splice(classIndex, 1);
    setClasses(updatedClasses);
    setSelectedClass(null);
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
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
            <InputLabel id="kelas-mahasiswa">Kelas Mahasiswa</InputLabel>
            <Select
              labelId="kelas-mahasiswa"
              label="Kelas Mahasiswa"
              size="small"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {kelasMahasiswa.map((item, index) => (
                <MenuItem key={index} value={index}>
                  {item}
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
                Kalender Akademik
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
                    {akademikData.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.semester}</TableCell>
                        <TableCell>{data.year}</TableCell>
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
                              onClick={() => handleOpenUpdateAkademik(data)}
                            >
                              Update
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
                              onClick={() => handleDeleteAkademik(data)}
                            >
                              Hapus
                            </span>
                          </Div>
                        </TableCell>
                      </TableRow>
                    ))}
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
                        Update Akademik Data
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
              Tambah Akademik Kalender
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
                label="Masukan Tahun Ajaran"
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
              >
                {akademikData.map((semesterData) => (
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
      {classes.map((classData, index) => (
        <Accordion
          key={index}
          expanded={selectedClass === index}
          onChange={() => handleAccordionClick(index)}
          sx={{ marginBottom: "25px" }}
        >
          <AccordionSummary>
            <div>
              <Typography variant="h2">{classData.name}</Typography>
              <Typography>{`Semester ${classData.semester} ${classData.year}`}</Typography>
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
                    mahasiswa di dalamnya. Harap hapus semua mahasiswa terlebih
                    dahulu sebelum menghapus kelas ini.
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
                    variant="contained"
                    color="error"
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
            <TableContainer sx={{ marginTop: "25px" }}>
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
                  {searchResults.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.nim}</TableCell>
                      <TableCell>{student.prodi}</TableCell>
                      <TableCell>
                        <span
                          style={{
                            textDecoration: "none",
                            cursor: "pointer",
                            color: "red",
                            fontSize: "14px",
                          }}
                          onClick={() => handleDeleteStudent(index)}
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

      {showDeleteConfirmation && (
        <Dialog open={showDeleteConfirmation} fullWidth maxWidth="sm">
          <DialogTitle variant="subtitle2">Konfirmasi Hapus Kelas</DialogTitle>
          <DialogContent>
            Apakah Anda yakin ingin menghapus kelas ini? Semua nama mahasiswa
            dalam kelas ini akan dihapus juga.
          </DialogContent>
          <DialogActions>
            <Button size="small" onClick={handleCancelDelete} color="primary">
              Batal
            </Button>
            <Button
              size="small"
              onClick={() => deleteClass(selectedClass)}
              color="error"
            >
              Hapus Kelas
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* edit mahasiswa */}
      <Dialog
        open={selectedStudent !== null}
        onClose={() => setSelectedStudent(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          variant="subtitle2"
          sx={{ textAlign: "center", background: "rgba(26, 56, 96, 0.10)" }}
        >
          Edit Mahasiswa
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "25px",
          }}
        >
          <TextField
            label="Nama Mahasiswa"
            value={selectedStudent ? selectedStudent.name : ""}
            onChange={(e) =>
              setSelectedStudent({
                ...selectedStudent,
                name: e.target.value,
              })
            }
            fullWidth
            sx={{ marginTop: "25px" }}
          />
          <TextField
            label="NIM"
            value={selectedStudent ? selectedStudent.nim : ""}
            onChange={(e) =>
              setSelectedStudent({
                ...selectedStudent,
                nim: e.target.value,
              })
            }
            fullWidth
          />
          <TextField
            label="Program Studi"
            value={selectedStudent ? selectedStudent.prodi : ""}
            onChange={(e) =>
              setSelectedStudent({
                ...selectedStudent,
                prodi: e.target.value,
              })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ background: "#F5F5F5" }}>
          <Button
            size="small"
            onClick={() => setSelectedStudent(null)}
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
            onClick={handleUpdateStudent}
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

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
