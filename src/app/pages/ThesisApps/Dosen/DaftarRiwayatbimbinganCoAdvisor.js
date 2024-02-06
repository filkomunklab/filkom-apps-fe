import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Div from "@jumbo/shared/Div";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

const RiwayatBimbinganCoAdvisor = () => {
  // State untuk melacak panel accordion yang terbuka
  const [expanded, setExpanded] = useState(false);

  // state Pencarian
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Fungsi untuk menangani perubahan pada state accordion yang terbuka
  const handleChangee = (panel) => (event, isExpanded) => {
    // Mengatur state expanded berdasarkan apakah panel tersebut terbuka
    setExpanded(isExpanded ? panel : false);
  };

  // state - riwayat
  const [daftarRiwayat, setDaftarRiwayat] = useState([]);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  // console.log("token", token);

  // Fungsi untuk menangani pencarian
  const handleSearch = () => {
    const results = daftarRiwayat.flatMap((semesterData) =>
      semesterData.skripsis.filter((riwayat) => {
        const studentNames = riwayat.students.map((student) =>
          student.fullName.toLowerCase()
        );
        return (
          studentNames.some((name) =>
            name.includes(searchKeyword.toLowerCase())
          ) || riwayat.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      })
    );

    setSearchResults(results);
    setSearchQuery(searchKeyword);
    setIsSearchModalOpen(true);
  };

  // Fungsi untuk menutup modal pencarian
  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  useEffect(() => {
    const fetchDaftarRiwayat = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/group/history-list-co-advisor",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setDaftarRiwayat' dengan data dari respons
        setDaftarRiwayat(response.data.data);
        console.log("Request get daftar proposal: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil daftar pengujian proposal:",
          error
        );
      }
    };
    fetchDaftarRiwayat();
  }, [token]);
  return (
    <Div
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        gap: "25px",
      }}
    >
      {/* Riwayat Penelitian */}
      <Div
        sx={{
          width: "100%",
          display: "flex",
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
          Riwayat Bimbingan Co-Advisor
        </Typography>
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
          {/* <FormControl>
            <Select
              size="small"
              labelId="dropdown-label"
              id="dropdown"
              value={selectedValue}
              onChange={handleChange}
              sx={{
                height: "30px",
                width: "250px",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              }}
            >
              <MenuItem value="Kelas">Kelas</MenuItem>{" "}
              <MenuItem value="option1">Opsi 1</MenuItem>
              <MenuItem value="option2">Opsi 2</MenuItem>
              <MenuItem value="option3">Opsi 3</MenuItem>
            </Select>
          </FormControl> */}
        </Div>
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
          {/* input search */}
          <TextField
            id="search-input"
            variant="outlined"
            placeholder="Cari Nama Mahasiswa atau Judul"
            size="small"
            sx={{
              borderRadius: 25,
              "& .MuiOutlinedInput-root": {
                borderRadius: 25,
              },
            }}
            fullWidth
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Div>
        <Dialog
          open={isSearchModalOpen}
          onClose={handleCloseSearchModal}
          fullWidth
          maxWidth="xl"
        >
          <DialogTitle sx={{ textAlign: "center" }}>
            <Typography variant="h2" gutterBottom>
              Hasil Pencarian
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ marginBottom: "20px" }}>
              Pencarian Anda : {searchQuery}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: "#F5F5F5" }}>
                    <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                    <TableCell sx={{ width: "30%" }}>
                      Nama Lengkap Mahasiswa
                    </TableCell>
                    <TableCell sx={{ width: "45%" }}>Judul</TableCell>
                    <TableCell sx={{ width: "10%" }}>
                      Tanggal Diterima
                    </TableCell>
                    <TableCell sx={{ width: "10%" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults.map((skripsi, index) => (
                    <TableRow key={skripsi.group_id + index}>
                      <TableCell>{index + 1}</TableCell>
                      {skripsi.students.map((student, studentIndex) => (
                        <TableCell key={studentIndex}>
                          {student.fullName}
                        </TableCell>
                      ))}
                      <TableCell>{skripsi.title}</TableCell>
                      <TableCell>{skripsi.approve_date}</TableCell>
                      <TableCell>
                        <Link
                          to={`/sistem-informasi-skripsi/daftar-riwayat-bimbingan-co-advisor/beranda/${skripsi.group_id}/${skripsi.status_co_advisor}`}
                          style={{ textDecoration: "none", color: "blue" }}
                        >
                          Detail
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
            <Button
              onClick={handleCloseSearchModal}
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
          </DialogActions>
        </Dialog>
      </Div>
      {/* Riwayat Mahasiswa */}
      {daftarRiwayat?.length > 0 ? (
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
          {daftarRiwayat.map((riwayat, riwayatIndex) => (
            <Accordion
              key={riwayat.semester}
              expanded={expanded === `panel${riwayatIndex}`} // Memeriksa apakah accordion ini terbuka
              onChange={handleChangee(`panel${riwayatIndex}`)} // Menangani perubahan state accordion
              sx={{
                margin: "5px",
                width: "97%",
                padding: "1px",
                background: "rgba(26, 56, 96, 0.10)",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${riwayatIndex}bh-content`}
                id={`panel${riwayatIndex}bh-header`}
              >
                <Typography
                  variant="h2"
                  sx={{
                    width: "33%",
                    flexShrink: 0,
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  {riwayat.semester}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ background: "#F5F5F5" }}>
                        <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                        <TableCell sx={{ width: "30%" }}>
                          Nama Lengkap Mahasiswa
                        </TableCell>
                        <TableCell sx={{ width: "45%" }}>Judul</TableCell>
                        <TableCell sx={{ width: "10%" }}>
                          Tanggal Diterima
                        </TableCell>
                        <TableCell sx={{ width: "10%" }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {riwayat.skripsis.map((skripsi, index) => (
                        <TableRow key={skripsi.group_id + index}>
                          <TableCell>{index + 1}</TableCell>
                          {skripsi.students.map((student, studentIndex) => (
                            <TableCell key={studentIndex}>
                              {student.fullName}
                            </TableCell>
                          ))}
                          <TableCell>{skripsi.title}</TableCell>
                          <TableCell>{skripsi.approve_date}</TableCell>
                          <TableCell>
                            <Link
                              to={`/sistem-informasi-skripsi/daftar-riwayat-bimbingan-co-advisor/beranda/${skripsi.group_id}/${skripsi.status_co_advisor}`}
                              style={{ textDecoration: "none", color: "blue" }}
                            >
                              Detail
                            </Link>
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
      ) : (
        <Div
          sx={{
            display: "flex",
            padding: "29px 42px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
            alignSelf: "stretch",
            borderRadius: "8px",
            border: "1px solid #E0E0E0",
            background: "#FFF",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Typography
            sx={{
              width: "100%",
              display: "flex",
              padding: "24px",
              alignItems: "center",
              gap: "10px",
              color: "#CA150C",
              background: "rgba(226, 29, 18, 0.50)",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            Belum ada riwayat bimbingan mahasiswa.
          </Typography>
        </Div>
      )}
    </Div>
  );
};

export default RiwayatBimbinganCoAdvisor;
