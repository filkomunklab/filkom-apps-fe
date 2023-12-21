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
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import WarningIcon from "@mui/icons-material/Warning";
import axios from "axios";

const KalenderAkademik = () => {
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
  const [openAddAkademik, setOpenAddAkademik] = useState(false);
  const [openUpdateAkademik, setOpenUpdateAkademik] = useState(false); // buka/tutup perbarui akademik
  const [semesterAkademik, setSemesterAkademik] = useState(""); // menyimpan akademik - semester yang akan diperbarui
  const [tahunAjaranAkademik, setTahunAjaranAkademik] = useState(""); // menyimpan akademik - year yang akan diperbarui
  const [selectedAkademikData, setSelectedAkademikData] = useState(null); // menyimpan akademik yang akan diperbarui
  const [hapusConfirmationDialogOpen, setHapusConfirmationDialogOpen] =
    useState(false);

  const [selectedAkademikToDelete, setSelectedAkademikToDelete] =
    useState(null);

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

  // fungsi - bersihkan setelah hapus kelas
  const deleteClass = () => {
    setSelectedClass(null);
    setShowDeleteConfirmation(false);
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
      const isKalenderExist = daftarAkademik.some((akademik) => {
        const existingAcadmicId = akademik.id; // Gunakan titik koma di sini
        const existingSemester = akademik.semester;
        const existingYear = akademik.year;
        const selectedAcademicId = selectedAkademikData.id; // Perbaiki nama variabel di sini
        const newSemester = semesterAkademik;
        const newYear = tahunAjaranAkademik;

        return (
          existingSemester.includes(newSemester) &&
          existingYear === newYear &&
          existingAcadmicId !== selectedAcademicId // Tambahkan kondisi untuk memeriksa ID
        );
      });

      if (isKalenderExist) {
        console.log("Kalender akademik ada dalam daftarAkademik.");
        // alert("Akademik dengan nama ini sudah ada. Silakan gunakan nama lain.");
        setOpenErrorUpdateKalender(true);
      } else {
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
              console.log(
                "Akademik Gagal diperbarui:",
                selectedAkademikData.id
              );
            }
          })
          .catch((error) => {
            console.error(
              "Terjadi kesalahan saat memperbarui akademik:",
              error
            );
          });
      }
    }
  };

  const [openErrorUpdateKalender, setOpenErrorUpdateKalender] = useState(false);

  // fungsi - menambahkan akademik
  const handleCreateAkademik = () => {
    if (semesterAkademik && tahunAjaranAkademik) {
      const isKalenderExist = daftarAkademik.some((akademik) => {
        const existingSemester = akademik.semester;
        const existingYear = akademik.year;
        const newSemester = semesterAkademik;
        const newYear = tahunAjaranAkademik;

        return (
          existingSemester.includes(newSemester) && existingYear === newYear
        );
      });

      if (isKalenderExist) {
        console.log("Kalender akademik ada dalam daftarAkademik.");
        // alert("Akademik dengan nama ini sudah ada. Silakan gunakan nama lain.");
        setOpenErrorCreateKalender(true);
      } else {
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
            console.error(
              "Terjadi kesalahan saat menambahkan akademik:",
              error
            );
          });
      }
    }
  };

  const [openErrorCreateKalender, setOpenErrorCreateKalender] = useState(false);

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
        {/* Select Kelas */}
        {/* <Div
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
        </Div> */}
        {/* Header Start */}
        <Div
          sx={{
            width: "60%",
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
              flex: "1 0 0",
              alignSelf: "stretch",
              width: "100%",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "32px",
            }}
          >
            Kalender Akademik
          </Typography>
          <Div
            sx={{
              flexDirection: "row",
              display: "flex",
              width: "441px",
              padding: "12px 16px",
              alignItems: "center",
              gap: "16px",
              flexShrink: 0,
            }}
          >
            {/* <SearchGlobal /> */}
          </Div>
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
          {/* Button Tambah Akademik Calender */}
          <Button
            style={{
              borderRadius: "60px",
              padding: "12px 16px",
              alignItems: "center",
              background: "#006AF5",
              color: "#ffff",
              "&:hover": { color: "#006AF5" },
            }}
            onClick={handleOpenAddAkademik}
          >
            <AddIcon sx={{ fontSize: "20px" }} />
            Tambah Kalender Akademik
          </Button>
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
        </Div>
      </Div>
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
                  <Div sx={{ display: "flex", justifyContent: "center" }}>
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
                <WarningIcon fontSize="small" sx={{ marginRight: "6px" }} />
                <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
                  Hapus Akademik Kalender
                </Typography>
              </DialogTitle>
              <DialogContent>
                Apakah Anda yakin ingin menghapus akademik Kalender ini?
              </DialogContent>
              <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
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
                  <InputLabel id="semester-label-akademik">Semester</InputLabel>
                  <Select
                    labelId="semester-label-akademik"
                    label="Semester"
                    value={semesterAkademik || ""}
                    onChange={(e) => setSemesterAkademik(e.target.value)}
                  >
                    <MenuItem value="Ganjil">Ganjil</MenuItem>
                    <MenuItem value="Padat">Padat</MenuItem>
                    <MenuItem value="Genap">Genap</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  value={tahunAjaranAkademik}
                  onChange={(e) => setTahunAjaranAkademik(e.target.value)}
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
    </Div>
  );
};

export default KalenderAkademik;
