import React, { useState } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";

// reachart start
const data = [
  {
    subject: "P16",
    A: 92.07,
  },
  { subject: "P15", A: 73.107 },
  { subject: "KU2", A: 85.6 },
  { subject: "S9", A: 95.6 },
  { subject: "S8", A: 90.6 },
];

const subjectColors = {
  P16: "#E21D12",
  P15: "#158343",
};
// reachart end

// table start
function createData(
  no,
  namaMahasiswa,
  NIM,
  CPMK01,
  CPMK02,
  CPMK03,
  CPMK04,
  CPMK05,
  CPMK06,
  CPMK07,
  totalPerIndividu
) {
  return {
    no,
    namaMahasiswa,
    NIM,
    CPMK01,
    CPMK02,
    CPMK03,
    CPMK04,
    CPMK05,
    CPMK06,
    CPMK07,
    totalPerIndividu,
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
  createData(
    3,
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
    4,
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
    5,
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
    6,
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
    7,
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
    8,
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
    9,
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
    10,
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
// table end

const ReportCPL = () => {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white w-[55vw] rounded-3xl relative">
            <div className="absolute p-5 top-0 right-0">
              <button onClick={handleClose}>
                <CloseIcon />
              </button>
            </div>

            <div className="flex flex-row items-center p-5">
              <div className="w-2/5 h-[40vh]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={({ payload, x, y, textAnchor }) => (
                        <text
                          x={x}
                          y={y}
                          dy={5}
                          fill={subjectColors[payload.value]}
                          textAnchor={textAnchor}
                        >
                          {payload.value}
                        </text>
                      )}
                    />
                    <PolarRadiusAxis
                      tickCount={7}
                      angle={90}
                      domain={[50, 100]}
                      ticks={[50, 60, 70, 80, 90, 100]}
                    />
                    <Radar
                      name="Mike"
                      dataKey="A"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="w-3/5">
                <h2 className="text-xl font-semibold">
                  Performasi CPMK Matakuliah
                </h2>
                <p className=" font-semibold">
                  Berikut ini adalah kalulasi penilaian kekuatan serta kelemahan
                  pada setiap poin penilaian.
                </p>
                <div className="flex items-start my-10">
                  <div className="flex flex-col items-center p-5 bg-secondary  border-[0.5px] rounded-l-2xl border-stone-500">
                    <h2 className="text-xl font-semibold">CPMK TERTINGGI</h2>
                    <h1 className="text-2xl font-bold my-2 text-green-700">
                      92,07
                    </h1>
                    <h2 className="text-xl font-semibold text-stone-400">
                      DIPOSISI P15*
                    </h2>
                  </div>
                  <div className="flex flex-col items-center p-5 bg-secondary border-[0.5px] rounded-r-2xl border-stone-500">
                    <h2 className="text-xl font-semibold">CPMK TERENDAH</h2>
                    <h1 className="text-2xl font-bold my-2 text-red-700">
                      73,107
                    </h1>
                    <h2 className="text-xl font-semibold text-stone-400">
                      DIPOSISI P16*
                    </h2>
                  </div>
                </div>
                <p className="text-lg font-semibold text-stone-700">
                  Informasi:
                </p>
                <p className="text-stone-500">
                  Batas Lulus CPMK adalah 70.50 unutuk setiap CPMK-nya
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-10">
          LAPORAN EVALUASI CAPAIAN PEMBELAJARAN MATAKULIAH
        </h1>
      </div>
      <div className="bg-secondary rounded-2xl p-5 flex flex-row mb-10">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="text-lg font-semibold w-40">Matakuliah</td>
              <td className="text-lg">: Pemrograman Berbasis Web</td>
            </tr>
            <tr>
              <td className="text-lg font-semibold w-40">Kurikulum</td>
              <td className="text-lg">: 2020</td>
            </tr>
            <tr>
              <td className="text-lg font-semibold w-40">Program Studi</td>
              <td className="text-lg">: Teknologi Informasi</td>
            </tr>
            <tr>
              <td className="text-lg font-semibold w-40">SKS/Parallel</td>
              <td className="text-lg">: 3 SKS/ A</td>
            </tr>
          </tbody>
        </table>

        <table className="w-full">
          <tbody>
            <tr>
              <td className="text-lg font-semibold w-40">Status</td>
              <td className="text-lg font-semibold text-green-800">
                : Sangat Baik
              </td>
            </tr>
            <tr>
              <td className="text-lg font-semibold w-40">Semester</td>
              <td className="text-lg">: 5</td>
            </tr>
            <tr>
              <td className="text-lg font-semibold w-40">Dosen</td>
              <td className="text-lg">: Andrew Tanny Liem, SSi., MT., PhD</td>
            </tr>
            <tr>
              <td className="text-lg font-semibold w-40">Jadwal</td>
              <td className="text-lg">: Senin, 08:00 - 10:00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-row items-center bg-white p-5 shadow-xl mb-10">
        <div className="w-2/5 h-[50vh]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis
                dataKey="subject"
                tick={({ payload, x, y, textAnchor }) => (
                  <text
                    x={x}
                    y={y}
                    dy={5}
                    fill={subjectColors[payload.value]}
                    textAnchor={textAnchor}
                  >
                    {payload.value}
                  </text>
                )}
              />
              <PolarRadiusAxis
                tickCount={7}
                angle={90}
                domain={[50, 100]}
                ticks={[50, 60, 70, 80, 90, 100]}
              />
              <Radar
                name="Mike"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-3/5">
          <h2 className="text-xl font-semibold">Performasi CPMK Matakuliah</h2>
          <p className=" font-semibold">
            Berikut ini adalah kalulasi penilaian kekuatan serta kelemahan pada
            setiap poin penilaian.
          </p>
          <div className="flex items-start my-10">
            <div className="flex flex-col items-center p-5 bg-secondary  border-[0.5px] rounded-l-2xl border-stone-500">
              <h2 className="text-xl font-semibold">CPMK TERTINGGI</h2>
              <h1 className="text-2xl font-bold my-2 text-green-700">92,07</h1>
              <h2 className="text-xl font-semibold text-stone-400">
                DIPOSISI P15*
              </h2>
            </div>
            <div className="flex flex-col items-center p-5 bg-secondary border-[0.5px] rounded-r-2xl border-stone-500">
              <h2 className="text-xl font-semibold">CPMK TERENDAH</h2>
              <h1 className="text-2xl font-bold my-2 text-red-700">73,107</h1>
              <h2 className="text-xl font-semibold text-stone-400">
                DIPOSISI P16*
              </h2>
            </div>
          </div>
          <p className="text-lg font-semibold text-stone-700">Informasi:</p>
          <p className="text-stone-500">
            Batas Lulus CPMK adalah 70.50 unutuk setiap CPMK-nya
          </p>
        </div>
      </div>

      <div>
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl font-semibold">List Data Nilai Mahasiswa</h2>
          <div className="text-blue-700 flex flex-row items-center">
            <h2 className="mr-2">Perluas tampilan Tabel </h2>
            <button className="" onClick={toggleFullscreen}>
              <FullscreenIcon />
            </button>
          </div>
        </div>

        <div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow className="bg-primary *:!text-white">
                  <TableCell>No</TableCell>
                  <TableCell>Nama Mahasiswa</TableCell>
                  <TableCell>Nomor Induk Mahasiswa</TableCell>
                  <TableCell>CPMK01</TableCell>
                  <TableCell>CPMK02</TableCell>
                  <TableCell>CPMK03</TableCell>
                  <TableCell>CPMK04</TableCell>
                  <TableCell>CPMK05</TableCell>
                  <TableCell>CPMK06</TableCell>
                  <TableCell>CPMK07</TableCell>
                  <TableCell>Total Per Individu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.no}>
                    <TableCell component="th" scope="row">
                      {row.no}
                    </TableCell>
                    <TableCell
                      onClick={handleOpen}
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
                    <TableCell>{row.CPMK01}</TableCell>
                    <TableCell>{row.CPMK02}</TableCell>
                    <TableCell>{row.CPMK03}</TableCell>
                    <TableCell>{row.CPMK04}</TableCell>
                    <TableCell>{row.CPMK05}</TableCell>
                    <TableCell>{row.CPMK06}</TableCell>
                    <TableCell>{row.CPMK07}</TableCell>
                    <TableCell>{row.totalPerIndividu}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableRow className="bg-primary *:!text-white">
                <TableCell colSpan={3}>TOTAL PER-CPMK</TableCell>
                <TableCell>80</TableCell>
                <TableCell>90</TableCell>
                <TableCell>70</TableCell>
                <TableCell>85</TableCell>
                <TableCell>95</TableCell>
                <TableCell>90</TableCell>
                <TableCell>80</TableCell>
                <TableCell>590</TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportCPL;
