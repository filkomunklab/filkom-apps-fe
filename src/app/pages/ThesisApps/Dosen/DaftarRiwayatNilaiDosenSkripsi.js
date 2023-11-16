import React, { useState, useEffect } from "react";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Paper,
} from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DaftarRiwayatNilaiDosenSkripsi = () => {
  const [accordionExpanded, setAccordionExpanded] = useState(false);

  const [accordionExpaned2, setAccordionExpanded2] = useState(false);

  const accordionToggle = () => {
    setAccordionExpanded(!accordionExpanded);
  };

  const accordionToggle2 = () => {
    setAccordionExpanded2(!accordionExpaned2);
  };

  const dataRiwayatNilai = [
    {
      namaLengkap: "Geovalga Fransiscus Lim",
      NIM: "105021910051",
      Prodi: "Informatika",
      Nilai: "9",
    },
    {
      namaLengkap: "Frances Rully Yong",
      NIM: "103042342142",
      Prodi: "Informatika",
      Nilai: "9",
    },
    {
      namaLengkap: "Brian sompie",
      NIM: "1030423422",
      Prodi: "Sistem Informasi",
      Nilai: "8",
    },
    {
      namaLengkap: "Brian sompie",
      NIM: "1030423422",
      Prodi: "Sistem Informasi",
      Nilai: "8",
    },
    {
      namaLengkap: "Brian sompie",
      NIM: "1030423422",
      Prodi: "Sistem Informasi",
      Nilai: "8",
    },
    {
      namaLengkap: "Brian sompie",
      NIM: "1030423422",
      Prodi: "Sistem Informasi",
      Nilai: "8",
    },
    {
      namaLengkap: "Brian sompie",
      NIM: "1030423422",
      Prodi: "Sistem Informasi",
      Nilai: "8",
    },
    {
      namaLengkap: "Brian sompie",
      NIM: "1030423422",
      Prodi: "Sistem Informasi",
      Nilai: "8",
    },
  ];

  // state - riwayat
  const [daftarRiwayat, setDaftarRiwayat] = useState([]);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  // console.log("token", token);

  //   useEffect(() => {
  //     const fetchDaftarRiwayat = async () => {
  //       try {
  //         const response = await axios.get(
  //           "http://localhost:2000/api/v1/group/history-list-kaprodi",
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //         // Atur state 'setDaftarRiwayat' dengan data dari respons
  //         setDaftarRiwayat(response.data.data);
  //         console.log("Request get daftar proposal: ", response.data.data);
  //       } catch (error) {
  //         console.error(
  //           "Terjadi kesalahan saat mengambil daftar pengujian proposal:",
  //           error
  //         );
  //       }
  //     };
  //     fetchDaftarRiwayat();
  //   }, [token]);

  const [selectedValue, setSelectedValue] = useState("Kelas"); // Tentukan teks default di sini

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  //--------------------------------------
  const [showTable, setShowTable] = useState(false);
  const [showTable2, setShowTable2] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTransitioning2, setIsTransitioning2] = useState(false);

  const tableVisibleStyle = {
    opacity: 1,
    maxHeight: "200px", // Sesuaikan tinggi maksimal sesuai kebutuhan
    transition: "opacity 0.3s ease-in-out, max-height 0.3s ease-in-out",
  };

  const tableHiddenStyle = {
    opacity: 0,
    maxHeight: "0",
    transition: "opacity 0.3s ease-in-out, max-height 0.3s ease-in-out",
  };

  const handleSemesterClick = () => {
    setIsTransitioning(true); // Mulai animasi
    setTimeout(() => {
      setShowTable(!showTable); // Toggle visibilitas tabel setelah animasi selesai
      setIsTransitioning(false); // Selesaikan animasi
    }, 300); // Waktu animasi dalam milidetik (0.3 detik)
  };

  const handleSemesterClick2 = () => {
    setIsTransitioning2(true); // Mulai animasi
    setTimeout(() => {
      setShowTable2(!showTable2); // Toggle visibilitas tabel setelah animasi selesai
      setIsTransitioning2(false); // Selesaikan animasi
    }, 300); // Waktu animasi dalam milidetik (0.3 detik)
  };

  return (
    <Div
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        gap: "25px",
        height: "100%",
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
          Daftar Riwayat Nilai
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
          <FormControl>
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
                  maxHeight: "200px", // Sesuaikan dengan tinggi yang diinginkan
                },
              }}
            >
              <MenuItem value="Kelas">Kelas</MenuItem>{" "}
              {/* Tambahkan nilai default di sini */}
              <MenuItem value="option1">Opsi 1</MenuItem>
              <MenuItem value="option2">Opsi 2</MenuItem>
              <MenuItem value="option3">Opsi 3</MenuItem>
            </Select>
          </FormControl>
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
          <SearchGlobal />
        </Div>
      </Div>

      {/* Riwayat Mahasiswa Nilai */}
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
        <Accordion
          expanded={accordionExpanded}
          onChange={accordionToggle}
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
            aria-controls="panel1bh-content"
            id="panel1bh-header"
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
              Proposal Semester Ganjil 2023-2024
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: "#F5F5F5" }}>
                    <TableCell>Nomor</TableCell>
                    <TableCell>Nama Mahasiswa</TableCell>
                    <TableCell>NIM</TableCell>
                    <TableCell>Program Studi</TableCell>
                    <TableCell>Nilai</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataRiwayatNilai.map((dataMahasiswa, index) => (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{dataMahasiswa.namaLengkap}</TableCell>
                      <TableCell>{dataMahasiswa.NIM}</TableCell>
                      <TableCell>{dataMahasiswa.Prodi}</TableCell>
                      <TableCell>{dataMahasiswa.Nilai}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={accordionExpaned2}
          onChange={accordionToggle2}
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
            aria-controls="panel1bh-content"
            id="panel1bh-header"
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
              Proposal Semester Ganjil 2023-2024
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: "#F5F5F5" }}>
                    <TableCell>Nomor</TableCell>
                    <TableCell>Nama Mahasiswa</TableCell>
                    <TableCell>NIM</TableCell>
                    <TableCell>Program Studi</TableCell>
                    <TableCell>Nilai</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataRiwayatNilai.map((dataMahasiswa, index) => (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{dataMahasiswa.namaLengkap}</TableCell>
                      <TableCell>{dataMahasiswa.NIM}</TableCell>
                      <TableCell>{dataMahasiswa.Prodi}</TableCell>
                      <TableCell>{dataMahasiswa.Nilai}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </Div>
    </Div>
  );
};

export default DaftarRiwayatNilaiDosenSkripsi;
