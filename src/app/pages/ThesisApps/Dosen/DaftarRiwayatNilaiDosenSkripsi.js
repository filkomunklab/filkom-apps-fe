import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DaftarRiwayatNilaiDosenSkripsi = () => {
  // State untuk melacak panel accordion yang terbuka
  const [expanded, setExpanded] = useState(false);

  // Fungsi untuk menangani perubahan pada state accordion yang terbuka
  const handleChangee = (panel) => (event, isExpanded) => {
    // Mengatur state expanded berdasarkan apakah panel tersebut terbuka
    setExpanded(isExpanded ? panel : false);
  };

  const [daftarNilai, setDaftarNilai] = useState();

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
    const fetchDaftarNilaiData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/group/value-history`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );

        // // Memperoleh data dari respons
        // const data = response.data.data;

        // // Membalik urutan data
        // const reversedData = {
        //   dashboard: data.dashboard,
        //   semesterData: data.semesterData.reverse(),
        // };

        setDaftarNilai(response.data.data);
        console.log("Request Get riwayat nilai: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil riwayat nilai:", error);
      }
    };
    fetchDaftarNilaiData();
  }, [token]);

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
          {/* <SearchGlobal /> */}
        </Div>
      </Div>

      {/* Riwayat Mahasiswa Nilai */}
      {daftarNilai?.length > 0 ? (
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
          {daftarNilai?.map(
            (semesterData, index) =>
              semesterData.students.length > 0 && (
                <Accordion
                  key={index}
                  expanded={expanded === `panel${index}`} // Memeriksa apakah accordion ini terbuka
                  onChange={handleChangee(`panel${index}`)} // Menangani perubahan state accordion
                  sx={{
                    width: "100%",
                    padding: "1px",
                    background: "rgba(26, 56, 96, 0.10)",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}bh-content`}
                    id={`panel${index}bh-header`}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        marginTop: "6px",
                        fontSize: "16px",
                        fontWeight: 500,
                      }}
                    >
                      {semesterData.semester}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow sx={{ background: "#F5F5F5" }}>
                            <TableCell>Nomor</TableCell>
                            <TableCell>NIM</TableCell>
                            <TableCell>Nama Mahasiswa</TableCell>
                            <TableCell>Program Studi</TableCell>
                            <TableCell>Nilai</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {semesterData?.students?.map(
                            (dataMahasiswa, index) => (
                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{dataMahasiswa?.nim}</TableCell>
                                <TableCell>{dataMahasiswa?.fullName}</TableCell>
                                <TableCell>
                                  {dataMahasiswa?.major === "IF"
                                    ? "Informatika"
                                    : dataMahasiswa?.major === "SI"
                                    ? "Sistem Informasi"
                                    : ""}
                                </TableCell>
                                <TableCell>{dataMahasiswa?.value}</TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              )
          )}
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
            Belum ada daftar nilai mahasiswa
          </Typography>
        </Div>
      )}
    </Div>
  );
};

export default DaftarRiwayatNilaiDosenSkripsi;
