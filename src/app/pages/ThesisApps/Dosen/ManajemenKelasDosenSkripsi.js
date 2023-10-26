import React, { useState } from "react";
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
} from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ManajemenKelasDosenSkripsi = () => {
  const [open, setOpen] = useState(false);
  const [kelas, setKelas] = useState("");
  const [semester, setSemester] = useState("");
  const [tahunAjaran, setTahunAjaran] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [studentInput, setStudentInput] = useState("");
  const [students, setStudents] = useState([]);
  const [kelasMahasiswa, setKelasMahasiswa] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleOpen = () => {
    handleClose();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setKelas("");
    setSemester("");
    setTahunAjaran("");
  };

  const handleCreateClass = () => {
    const newClass = {
      kelas,
      semester,
      tahunAjaran,
      students: [],
    };
    setClasses([...classes, newClass]);
    handleClose();
    setKelasMahasiswa([
      ...kelasMahasiswa,
      `${kelas} - Semester ${semester} ${tahunAjaran}`,
    ]);
  };

  const handleAccordionClick = (classIndex) => {
    setSelectedClass(selectedClass === classIndex ? null : classIndex);
  };

  const handleAddStudent = () => {
    // Memecah input dari pengguna berdasarkan koma (,)
    const studentEntries = studentInput.split(",").map((entry) => entry.trim());

    const newStudents = studentEntries.map((entry) => {
      // Menggunakan regex untuk memisahkan setiap input mahasiswa
      const regex = /(.+?) (\d+) (.+)/;
      const matches = entry.match(regex);
      setAddStudentOpen(false);

      if (matches && matches.length === 4) {
        const nama = matches[1];
        const nim = matches[2];
        const prodi = matches[3];

        return {
          prodi,
          name: nama,
          nim,
        };
      } else {
        // Tampilkan pesan kesalahan jika input tidak sesuai
        alert(
          "Input tidak sesuai. Pastikan Anda memasukkan nama mahasiswa, NIM, dan program studi dalam format yang benar."
        );
        return null; // Return null for invalid entries
      }
    });

    // Filter out null entries (invalid entries) before adding to the students array
    const validNewStudents = newStudents.filter((student) => student !== null);

    // Menambahkan mahasiswa yang valid ke dalam array mahasiswa
    setStudents([...students, ...validNewStudents]);

    // Mengosongkan input studentInput
    setStudentInput("");
  };

  const handleDeleteStudent = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  const handleEditStudent = (index) => {
    const selected = students[index];
    setSelectedStudent({ ...selected, selectedIndex: index });
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
      const updatedClasses = [...classes];
      updatedClasses.splice(selectedClass, 1);
      setClasses(updatedClasses);
      setSelectedClass(null);
    }
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
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
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
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                label="Semester"
              >
                <MenuItem value="Ganjil">Ganjil</MenuItem>
                <MenuItem value="Padat">Padat</MenuItem>
                <MenuItem value="Genap">Genap</MenuItem>
              </Select>
            </FormControl>
            <TextField
              value={tahunAjaran}
              onChange={(e) => setTahunAjaran(e.target.value)}
              label="Masukan Tahun Ajaran"
              fullWidth
            />
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
              <Typography variant="h2">{classData.kelas}</Typography>
              <Typography>{`Semester ${classData.semester} ${classData.tahunAjaran}`}</Typography>
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
                  {students.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.nim}</TableCell>
                      <TableCell>{student.prodi}</TableCell>
                      <TableCell>
                        <Div sx={{ display: "flex" }}>
                          <span
                            style={{
                              textDecoration: "none",
                              cursor: "pointer",
                              color: "blue",
                              fontSize: "14px",
                            }}
                            onClick={() => handleEditStudent(index)}
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
                            onClick={() => handleDeleteStudent(index)}
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
          </AccordionDetails>
        </Accordion>
      ))}
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
        <DialogContent>
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
              placeholder="Masukkan data mahasiswa (nama NIM prodi)"
              value={studentInput}
              onChange={(e) => setStudentInput(e.target.value)}
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
            onClick={handleAddStudent}
            sx={{ textTransform: "none" }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Div>
  );
};

export default ManajemenKelasDosenSkripsi;
