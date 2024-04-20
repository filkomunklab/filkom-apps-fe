import React, { useState } from "react";
import { Update } from "@mui/icons-material";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSummaryReport, putSummaryReport } from "../../../api";
import { useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { StatisticModal } from "./Components";
import NotfoundAnimation from "app/shared/NotfoundAnimation";

const ReportCPMK = () => {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});
  const { rpsId } = useParams();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();

  const handleOpen = (item) => {
    setSelectedStudent(item);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedStudent({});
    setOpen(false);
  };

  const reportDetailQuery = useQuery({
    queryFn: () => getSummaryReport(rpsId),
    queryKey: ["reportSummary", rpsId],
  });

  const reportDetailMutation = useMutation({
    mutationFn: putSummaryReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reportSummary", rpsId] });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data has been updated",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    },
  });

  if (reportDetailQuery.status === "pending" && !reportDetailQuery.data) {
    return <CircularProgress color="info" />;
  }

  const color = (status) => {
    switch (status) {
      case "Sangat Baik":
        return "text-green-800";
      case "Baik":
        return "text-blue-800";
      case "Cukup":
        return "text-yellow-500";
      case "Kurang":
        return "text-red-500";
      case "Sangat Kurang":
        return "text-red-800";
      default:
        break;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-3xl font-bold">
          LAPORAN EVALUASI CAPAIAN PEMBELAJARAN MATAKULIAH
        </h1>
        <LoadingButton
          loading={reportDetailMutation.isPending}
          variant="outlined"
          endIcon={<Update />}
          onClick={() => reportDetailMutation.mutate(rpsId)}
          disabled={!pathname.includes("/obe/evaluasi-mahasiswa")}
        >
          Update Data
        </LoadingButton>
      </div>
      {reportDetailQuery.data ? (
        <>
          <div className="bg-secondary rounded-2xl p-5 flex flex-row mb-10">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="text-lg font-semibold w-40">Matakuliah</td>
                  <td className="text-lg">{`: ${reportDetailQuery.data?.subjectName}`}</td>
                </tr>
                <tr>
                  <td className="text-lg font-semibold w-40">
                    Tahun Kurikulum
                  </td>
                  <td className="text-lg">{`: ${reportDetailQuery.data?.curriculum}`}</td>
                </tr>
                <tr>
                  <td className="text-lg font-semibold w-40">Program Studi</td>
                  <td className="text-lg">{`: ${reportDetailQuery.data?.major}`}</td>
                </tr>
                <tr>
                  <td className="text-lg font-semibold w-40">SKS/Parallel</td>
                  <td className="text-lg">{`: ${reportDetailQuery.data?.credits} SKS/ ${reportDetailQuery.data?.parallel}`}</td>
                </tr>
              </tbody>
            </table>

            <table className="w-full">
              <tbody>
                <tr>
                  <td className="text-lg font-semibold w-40">Status</td>
                  <td
                    className={`text-lg font-semibold ${color(
                      reportDetailQuery.data?.status
                    )}`}
                  >
                    {`: ${reportDetailQuery.data?.status}`}
                  </td>
                </tr>
                <tr>
                  <td className="text-lg font-semibold w-40">Semester</td>
                  <td className="text-lg">{`: ${reportDetailQuery.data?.semester}`}</td>
                </tr>
                <tr>
                  <td className="text-lg font-semibold w-40">Dosen</td>
                  <td className="text-lg">{`: ${reportDetailQuery.data?.teacher}`}</td>
                </tr>
                <tr>
                  <td className="text-lg font-semibold w-40">Jadwal</td>
                  <td className="text-lg">{`: ${reportDetailQuery.data?.schedule}`}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-row items-center bg-white p-5 shadow-xl mb-10">
            <div className="w-2/5 h-[50vh]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={reportDetailQuery.data?.cpmkGradeSummary.avgEach}
                >
                  <PolarGrid />
                  <PolarAngleAxis
                    dataKey="code"
                    tick={({ payload, x, y, textAnchor }) => (
                      <text
                        x={x}
                        y={y}
                        dy={5}
                        // fill={subjectColors[payload.value]}
                        textAnchor={textAnchor}
                      >
                        {payload.value}
                      </text>
                    )}
                  />
                  <PolarRadiusAxis
                    tickCount={5}
                    angle={90}
                    ticks={[20, 40, 60, 80, 100]}
                  />
                  <Radar
                    dataKey="average"
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
                    {reportDetailQuery.data?.highestCpmk.average.toFixed(2)}
                  </h1>
                  <h2 className="text-xl font-semibold text-stone-400">
                    DIPOSISI {reportDetailQuery.data?.highestCpmk.code}
                  </h2>
                </div>
                <div className="flex flex-col items-center p-5 bg-secondary border-[0.5px] rounded-r-2xl border-stone-500">
                  <h2 className="text-xl font-semibold">CPMK TERENDAH</h2>
                  <h1 className="text-2xl font-bold my-2 text-red-700">
                    {reportDetailQuery.data?.lowestCpmk.average.toFixed(2)}
                  </h1>
                  <h2 className="text-xl font-semibold text-stone-400">
                    DIPOSISI {reportDetailQuery.data?.lowestCpmk.code}
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
              <h2 className="text-2xl font-semibold">
                List Data Nilai Mahasiswa
              </h2>
            </div>

            <div>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow className="bg-primary *:!text-white">
                      <TableCell>No</TableCell>
                      <TableCell>Nama Mahasiswa</TableCell>
                      <TableCell>Nomor Induk Mahasiswa</TableCell>
                      {reportDetailQuery.data?.cpmkGradeSummary.avgEach.map(
                        (item, index) => (
                          <TableCell key={index}>{item.code}</TableCell>
                        )
                      )}
                      <TableCell>Total Per Individu</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reportDetailQuery.data?.studentCpmkGrade.map(
                      (row, index) => (
                        <TableRow
                          key={row.nim}
                          hover
                          onClick={() => handleOpen(row)}
                          className="hover:cursor-pointer"
                        >
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
                          <TableCell>{row.nim}</TableCell>
                          {row.StudentGrade.map((item) => (
                            <TableCell key={item.id}>
                              {item.average.toFixed(2)}
                            </TableCell>
                          ))}
                          <TableCell>{row.average.toFixed(2)}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                  <TableRow className="bg-primary *:!text-white">
                    <TableCell colSpan={3}>TOTAL PER-CPMK</TableCell>
                    {reportDetailQuery.data?.cpmkGradeSummary.avgEach.map(
                      (item, index) => (
                        <TableCell key={index}>
                          {item.average.toFixed(2)}
                        </TableCell>
                      )
                    )}
                    <TableCell>
                      {reportDetailQuery.data?.cpmkGradeSummary.overallAvg.toFixed(
                        2
                      )}
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </div>
          </div>
          <StatisticModal
            mainData={reportDetailQuery.data?.cpmkGradeSummary.avgEach}
            comparisonData={selectedStudent}
            onClose={handleClose}
            open={open}
          />
        </>
      ) : (
        <NotfoundAnimation />
      )}
    </div>
  );
};

export default ReportCPMK;
