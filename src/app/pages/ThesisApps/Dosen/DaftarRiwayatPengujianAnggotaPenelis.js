import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const RiwayatPengujianAnggota = () => {
  // state - riwayat
  const [daftarRiwayat, setDaftarRiwayat] = useState([]);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  // console.log("token", token);

  useEffect(() => {
    const fetchDaftarRiwayat = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/group/history-list-member",
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
          Riwayat Bimbingan Anggota Panellis
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
              <MenuItem value="Kelas">Kelas</MenuItem>{" "} */}
          {/* <MenuItem value="option1">Opsi 1</MenuItem>
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
      {/* Riwayat Mahasiswa */}
      {daftarRiwayat.map((riwayat) => (
        <Div
          key={riwayat.semester}
          sx={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "25px",
            width: "100%",
          }}
        >
          <Div
            sx={{
              display: "flex",
              width: "100%",
              padding: "24px",
              alignItems: "center",
              gap: "10px",
              background: "rgba(26, 56, 96, 0.10)",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={handleSemesterClick}
          >
            <Typography variant="subtitle2" sx={{ width: "100%" }}>
              {riwayat.semester}
            </Typography>
            <ExpandMoreIcon />
          </Div>
          {showTable || isTransitioning ? (
            <TableContainer
              style={{
                ...tableVisibleStyle,
                display: isTransitioning ? "block" : "table",
              }}
            >
              <Table>
                <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                  <TableRow>
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
                  {riwayat.skripsis.map((skripsi) =>
                    skripsi.students.map((student, index) => (
                      <TableRow key={skripsi.group_id + index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell>{skripsi.title}</TableCell>
                        {/* Tambahkan tanggal diterima jika tersedia */}
                        <TableCell>
                          {/* Tambahkan tanggal diterima di sini */}
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/sistem-informasi-skripsi/daftar-riwayat-pengujian-anggota/beranda/${skripsi.group_id}/ANGGOTA_PANELIS`}
                            style={{ textDecoration: "none", color: "blue" }}
                          >
                            Detail
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer style={tableHiddenStyle}>
              <Table>
                <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                  <TableRow>
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
                <TableBody></TableBody>
              </Table>
            </TableContainer>
          )}
        </Div>
      ))}
    </Div>
  );
};

export default RiwayatPengujianAnggota;
