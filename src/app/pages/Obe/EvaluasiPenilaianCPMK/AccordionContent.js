import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function AccordionContent() {
  function createData(
    no,
    namaMahasiswa,
    NIM,
    kuis1,
    kuis2,
    tugas1,
    tugas4,
    kehadiran,
    midTerm,
    final,
    totalBobot
  ) {
    return {
      no,
      namaMahasiswa,
      NIM,
      kuis1,
      kuis2,
      tugas1,
      tugas4,
      kehadiran,
      midTerm,
      final,
      totalBobot,
    };
  }

  const rows = [
    createData(
      1,
      "Misael Jordy",
      "	105022010076",
      80,
      90,
      70,
      85,
      95,
      90,
      80,
      590
    ),
    createData(
      2,
      "Misael Jordy",
      "	105022010076",
      80,
      90,
      70,
      85,
      95,
      90,
      80,
      590
    ),
  ];

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="bg-primary *:!text-white">
              <TableCell>No</TableCell>
              <TableCell>Nama Mahasiswa</TableCell>
              <TableCell>Nomor Induk Mahasiswa</TableCell>
              <TableCell>Kuis 1</TableCell>
              <TableCell>Kuis 2</TableCell>
              <TableCell>Tugas 1</TableCell>
              <TableCell>Tugas 4</TableCell>
              <TableCell>Kehadiran</TableCell>
              <TableCell>Mid Term</TableCell>
              <TableCell>Final</TableCell>
              <TableCell>Total Bobot</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.no}>
                <TableCell component="th" scope="row">
                  {row.no}
                </TableCell>
                <TableCell
                  // onClick={handleOpen}
                  style={{ cursor: "pointer", color: "black" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "blue";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "black";
                  }}
                >
                  {row.namaMahasiswa}
                </TableCell>

                <TableCell>{row.NIM}</TableCell>
                <TableCell>{row.kuis1}</TableCell>
                <TableCell>{row.kuis2}</TableCell>
                <TableCell>{row.tugas1}</TableCell>
                <TableCell>{row.tugas4}</TableCell>
                <TableCell>{row.kehadiran}</TableCell>
                <TableCell>{row.midTerm}</TableCell>
                <TableCell>{row.final}</TableCell>
                <TableCell>{row.totalBobot}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableRow className="bg-primary *:!text-white">
            <TableCell colSpan={10} align="center">
              TOTAL CPMK1
            </TableCell>
            <TableCell>590</TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </div>
  );
}
