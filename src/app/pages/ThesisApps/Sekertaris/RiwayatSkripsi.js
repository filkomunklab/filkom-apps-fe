import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Chip,
} from "@mui/material";
import "core-js/stable";
import "regenerator-runtime/runtime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PrintBeritaAcaraSkripsi from "./PrintBeritaAcaraSkripsi";
import { useReactToPrint } from "react-to-print";

const DaftarRiwayatSkripsi = () => {
  // Fungsi untuk mengonversi jam ke dalam format teks
  const convertHourToText = (hour, minute) => {
    const digit = [
      "",
      "satu",
      "dua",
      "tiga",
      "empat",
      "lima",
      "enam",
      "tujuh",
      "delapan",
      "sembilan",
    ];

    // Menentukan puluhan dan satuan pada jam
    const unitHour = hour % 10;

    // Menentukan puluhan dan satuan pada menit
    const tenMinute = Math.floor(minute / 10);
    const unitMinute = minute % 10;

    // Menentukan periode waktu (pagi, siang, sore, malam)
    let periodText = "";
    if (hour < 11) {
      periodText = "pagi";
    } else if (hour < 15) {
      periodText = "siang";
    } else if (hour < 18) {
      periodText = "sore";
    } else {
      periodText = "malam";
    }

    // Menggabungkan teks jam dan menit
    let hourText = "";
    if (hour === 10) {
      hourText = "sepuluh";
    } else if (hour === 11 || (hour > 11 && hour < 20)) {
      hourText = hour === 11 ? "sebelas" : `${digit[unitHour]} belas`;
    } else if (hour === 20) {
      hourText = "dua puluh";
    } else if (hour > 20 && hour < 24) {
      hourText = `dua puluh ${digit[unitHour]}`;
    } else {
      hourText = digit[hour];
    }

    let minuteText = "";
    if (minute === 0) {
      minuteText = "sejuta";
    } else if (minute === 10) {
      minuteText = "sepuluh";
    } else if (minute > 0 && minute < 10) {
      minuteText = digit[minute];
    } else if (minute >= 10 && minute < 20) {
      minuteText = `${digit[minute - 10]} belas`;
    } else {
      minuteText = tenMinute ? `${digit[tenMinute]} puluh` : "";
      const unitMinuteText = unitMinute ? ` ${digit[unitMinute]}` : "";
      minuteText += unitMinuteText;
    }

    return `${hourText}${
      minuteText === "sejuta" ? "" : " " + minuteText
    } ${periodText}`;
  };

  const [selectedTime, setSelectedTime] = useState();
  const [convertedTime, setConvertedTime] = useState();

  // state - menyimpan hasil request
  const [timPanelis, setTimPanelis] = useState([]);

  // state - menyimpan data yang dipilih
  const [semesterIndex, setSemesterIndex] = useState();

  // state - menyimpan data yang dipilih
  const [selectedSemester, setSelectedSemester] = useState();
  const [selectedSchedule, setSelectedSchedule] = useState();

  // State untuk melacak panel accordion yang terbuka
  const [expanded, setExpanded] = useState(false);

  // Fungsi untuk menangani perubahan pada state accordion yang terbuka
  const handleChange = (panel, index, semester) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setSelectedSemester(isExpanded ? semester : null);
  };

  // fungsi untuk mendapatkan data token JWT
  const token = localStorage.getItem("token");
  // console.log("token", token);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // pageStyle: `
    // @page {
    //   size: A4;
    // }`,
  });

  useEffect(() => {
    const fetchTimPanelisData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/group/skripsi-history-list-sekretaris",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTimPanelis(response.data.data);
        console.log("Request daftar tim panelis", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil daftar tim :", error);
      }
    };
    fetchTimPanelisData(); // Panggil fungsi fetchData saat komponen dimuat
  }, [token]);

  useEffect(() => {
    if (selectedTime) {
      //  jam
      const waktu = selectedTime;
      console.log("selectedTime: ", selectedTime);

      // Memisahkan jam dan menit dari selectedSchedule
      const [jam, menit] = waktu?.split(":").map(Number);
      console.log("jam: ", jam);
      console.log("menit: ", menit);

      const convertedHour = convertHourToText(jam, menit);

      setConvertedTime(convertedHour);
    }
  }, [selectedTime]);

  useEffect(() => {
    if (selectedSchedule && convertedTime) {
      handlePrint();
    }
    return () => {
      setSelectedSchedule();
    };
  }, [selectedSchedule, convertedTime]);

  return (
    <Div>
      {/* Table Master Start */}
      <Div
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* Header Start */}
        <Div
          sx={{
            width: "100%",
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
            Daftar Riwayat Skripsi
          </Typography>
          <Div
            sx={{
              flexDirection: "row",
              display: "flex",
              width: "441px",
              padding: "12px 16px",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "16px",
              flexShrink: 0,
            }}
          >
            {/* <SearchGlobal></SearchGlobal> */}
            {/* {timPanelis?.length > 0 && (
              <Button
                color="primary"
                variant="contained"
                sx={{
                  borderRadius: "50px",
                  textTransform: "none",
                }}
              >
                <Typography sx={{ fontSize: "14px", padding: "4px" }}>
                  Print Berita Acara
                </Typography>
              </Button>
            )} */}
          </Div>
        </Div>
        {/* Header End */}
        {/* Semester Start */}
        {timPanelis?.length > 0 ? (
          <>
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
              {timPanelis &&
                timPanelis.map((panelis, index) => (
                  <Accordion
                    key={index}
                    expanded={expanded === `panel${semesterIndex}`} // Memeriksa apakah accordion ini terbuka
                    onChange={handleChange(
                      `panel${semesterIndex}`,
                      index,
                      panelis.semester
                    )} // Menangani perubahan state accordion
                    sx={{
                      width: "100%",
                      padding: "1px",
                      background: "rgba(26, 56, 96, 0.10)",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${semesterIndex}bh-content`}
                      id={`panel${semesterIndex}bh-header`}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          fontSize: "16px",
                          fontWeight: 500,
                          marginTop: "6px",
                        }}
                      >
                        {panelis.semester}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow sx={{ background: "#F5F5F5" }}>
                              <TableCell
                                sx={{ width: "25px", fontSize: "13px" }}
                              >
                                Nomor
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                Ketua Panelis
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                Anggota Panelis
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                Advisor
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                Tanggal
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                Status
                              </TableCell>
                              <TableCell sx={{ fontSize: "13px" }}>
                                Action
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {panelis.schedules.map((jadwal, index) => (
                              <TableRow key={index}>
                                <TableCell sx={{ fontSize: "13px" }}>
                                  {index + 1}
                                </TableCell>
                                <TableCell>
                                  <Typography>
                                    {jadwal.panelis_chairman.name}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>
                                    {jadwal.panelis_member.name}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>{jadwal.advisor.name}</Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>{jadwal.defence_date}</Typography>
                                </TableCell>
                                {/* harus di ubah statusnya*/}
                                <TableCell>
                                  {jadwal.is_pass === "Pass" ||
                                  jadwal.is_pass === "Rejected" ? (
                                    <Chip
                                      label={"Sudah"}
                                      sx={{
                                        background: "rgba(21, 131, 67, 0.10)",
                                        color: "#0A7637",
                                      }}
                                    />
                                  ) : (
                                    <Chip label={"Belum"} />
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Div sx={{ display: "flex" }}>
                                    <span
                                      style={{
                                        textDecoration: "none",
                                        cursor:
                                          jadwal.is_pass === "Pass" ||
                                          jadwal.is_pass === "Rejected"
                                            ? "pointer"
                                            : "not-allowed",
                                        color:
                                          jadwal.is_pass === "Pass" ||
                                          jadwal.is_pass === "Rejected"
                                            ? "blue"
                                            : "gray",
                                      }}
                                      onClick={() => {
                                        if (
                                          jadwal.is_pass === "Pass" ||
                                          jadwal.is_pass === "Rejected"
                                        ) {
                                          console.log("trigger");
                                          setSelectedSchedule(jadwal);
                                          setSelectedTime(jadwal.start_defence);
                                        }
                                      }}
                                    >
                                      Print
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
            </Div>
            <PrintBeritaAcaraSkripsi
              selectedSemester={selectedSemester}
              selectedSchedule={selectedSchedule}
              convertedTime={convertedTime}
              ref={componentRef}
            />
          </>
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
              Belum ada tim panelis.
            </Typography>
          </Div>
        )}
      </Div>
    </Div>
  );
};

export default DaftarRiwayatSkripsi;
