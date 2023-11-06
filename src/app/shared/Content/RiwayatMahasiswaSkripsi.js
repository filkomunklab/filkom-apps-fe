import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Div from "@jumbo/shared/Div";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const RiwayatMahasiswaSkripsi = () => {
  const [showTable, setShowTable] = useState(false);
  const [showTable2, setShowTable2] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTransitioning2, setIsTransitioning2] = useState(false);

  const data = [
    {
      id: 1,
      nomor: 1,
      namaLengkapMahasiswa: "Geovalga Fransiscus Lim",
      judul:
        "SISTEM INFORMASI MANAJEMEN SKRIPSI DI FAKULTAS ILMU KOMPUTER UNIVERSITAS KLABAT",
      tanggalDiterima: "2023-10-10",
    },
    {
      id: 2,
      nomor: 2,
      namaLengkapMahasiswa: "Frances Rully Yong",
      judul:
        "SISTEM INFORMASI MANAJEMEN SKRIPSI DI FAKULTAS ILMU KOMPUTER UNIVERSITAS KLABAT",
      tanggalDiterima: "2023-10-15",
    },
  ];

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
          Semester Ganjil 2023/2024
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
                <TableCell sx={{ width: "10%" }}>Tanggal Diterima</TableCell>
                <TableCell sx={{ width: "10%" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nomor}</TableCell>
                  <TableCell>{row.namaLengkapMahasiswa}</TableCell>
                  <TableCell>{row.judul}</TableCell>
                  <TableCell>{row.tanggalDiterima}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "blue",
                      }}
                    >
                      View
                    </span>
                  </TableCell>
                </TableRow>
              ))}
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
                <TableCell sx={{ width: "10%" }}>Tanggal Diterima</TableCell>
                <TableCell sx={{ width: "10%" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      )}

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
        onClick={handleSemesterClick2}
      >
        <Typography variant="subtitle2" sx={{ width: "100%" }}>
          Semester Genap 2023/2024
        </Typography>

        <ExpandMoreIcon />
      </Div>

      {showTable2 || isTransitioning2 ? (
        <TableContainer
          style={{
            ...tableVisibleStyle,
            display: isTransitioning2 ? "block" : "table",
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
                <TableCell sx={{ width: "10%" }}>Tanggal Diterima</TableCell>
                <TableCell sx={{ width: "10%" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nomor}</TableCell>
                  <TableCell>{row.namaLengkapMahasiswa}</TableCell>
                  <TableCell>{row.judul}</TableCell>
                  <TableCell>{row.tanggalDiterima}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "blue",
                      }}
                    >
                      View
                    </span>
                  </TableCell>
                </TableRow>
              ))}
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
                <TableCell sx={{ width: "10%" }}>Tanggal Diterima</TableCell>
                <TableCell sx={{ width: "10%" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      )}
    </Div>
  );
};

export default RiwayatMahasiswaSkripsi;
