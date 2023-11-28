import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "@mui/material/Button";

const PrintButton = ({ onPrint }) => {
  const handlePrint = useReactToPrint({
    content: onPrint,
  });

  return (
    <Button variant="contained" color="primary" onClick={handlePrint}>
      Print
    </Button>
  );
};

// Fungsi untuk mengonversi tahun ke dalam format teks
const convertToText = (number) => {
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

  if (number < 10) {
    return digit[number];
  }

  const ten = digit[Math.floor(number / 10)];
  const unit = digit[number % 10];

  if (number % 10 === 0) {
    return `${ten} puluh`;
  } else {
    return `${ten} puluh ${unit}`;
  }
};

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
  const tenHour = Math.floor(hour / 10);
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

const ReportContent = React.forwardRef((props, ref) => {
  const [studentInfo, setStudentInfo] = useState({
    name: "Geovalga Fransiscus Lim",
    nim: "105021910051",
    educationLevel: "S1",
    faculty: "Ilmu Komputer",
    studyProgram: "Informatika",
  });

  const [examinerInfo, setExaminerInfo] = useState([
    { no: 1, name: "Andrew T. Liem, MT, PhD", signature: "" },
    { no: 2, name: "Stenly R. Pungus, MT, PhD", signature: "" },
    { no: 3, name: "Jimmy H. Moedjahedy, SKom, MKom, MM", signature: "" },
  ]);

  const [signatures, setSignatures] = useState([
    { name: "Dekan FILKOM", role: "", nidn: "" },
    { name: "Ketua Tim Penguji", role: "", nidn: "" },
    {
      name: "Andrew Tenny Liem, S.SI., MT., PhD",
      role: "",
      nidn: "0916038101",
    },
    {
      name: "Stenly Richard Pungus, S.Kom., MT., MM",
      role: "",
      nidn: "0922098101",
    },
  ]);

  const renderSignatureBlock = (name, role, nidn, position) => (
    <div style={{ textAlign: position, marginTop: "20px" }}>
      <div style={{ marginBottom: "10px", textDecoration: "none" }}>{name}</div>
      <div style={{ marginBottom: "5px", textDecoration: "none" }}>{role}</div>
      {nidn && (
        <div style={{ marginBottom: "5px", textDecoration: "none" }}>
          NIDN: {nidn}
        </div>
      )}
    </div>
  );
  const currentDate = new Date(); // Tanggal hari ini
  const dayNumber = currentDate.getDay();
  const monthNumber = currentDate.getMonth();
  const yearNumber = currentDate.getFullYear();

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dayName = days[dayNumber];
  const monthName = months[monthNumber];
  // Fungsi untuk mengonversi tahun ke dalam format teks
  const convertYearToText = (number) => {
    const ribuan = Math.floor(number / 1000);
    const ratusan = Math.floor((number % 1000) / 100);
    const puluhan = Math.floor((number % 100) / 10);
    const satuan = number % 10;

    const ribuanText = ribuan > 0 ? `${convertToText(ribuan)} ribu` : "";
    const ratusanText = ratusan > 0 ? `${convertToText(ratusan)} ratus` : "";
    const puluhanText = puluhan > 0 ? `${convertToText(puluhan)} puluh` : "";
    const satuanText = satuan > 0 ? `${convertToText(satuan)}` : "";

    return `${ribuanText} ${ratusanText} ${puluhanText} ${satuanText}`;
  };

  const yearText = convertYearToText(yearNumber);

  //  input manual jam
  const hourText = convertHourToText(11, 30);

  return (
    <div
      ref={ref}
      style={{
        width: "210mm",
        height: "297mm",
        margin: "auto",
        background: "white",
        padding: "20px", // Optional: Add padding for spacing
      }}
    >
      <p>Proposal Skripsi</p>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h3>BERITA ACARA</h3>
        <h3>UJIAN PROPOSAL SKRIPSI MAHASISWA</h3>
        <p>Semester II, 2022 - 2023</p>
      </div>
      <div style={{ width: "80%", margin: "auto" }}>
        <p>
          Pada hari ini <strong>{dayName}</strong> Tanggal
          <strong> {convertToText(currentDate.getDate())}</strong>
          bulan <strong> {monthName}</strong> tahun
          <strong> {yearText}</strong> pukul
          <strong> {hourText} </strong>
          hingga selesai di Ruang <strong>GK1-207</strong> dari Fakultasi Ilmu
          Komputer Universitas Klabat, telah diadakan Ujian Proposal Skripsi:
        </p>
      </div>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h4>JUDUL</h4>
        <p>
          <strong>
            Pengembangan Aplikasi Traces Study Berbasis Web di Universitas
            Klabat
          </strong>
        </p>
      </div>
      <div style={{ width: "50%", margin: "auto" }}>
        <table
          style={{
            width: "100%",
            marginBottom: "20px",
            textAlign: "left",
            margin: "auto",
          }}
        >
          <tbody>
            <tr>
              <td>Atas Nama</td>
              <td>:</td>
              <td>{studentInfo.name}</td>
            </tr>
            <tr>
              <td>NIM</td>
              <td>:</td>
              <td>{studentInfo.nim}</td>
            </tr>
            <tr>
              <td>Jenjang Pendidikan</td>
              <td>:</td>
              <td>{studentInfo.educationLevel}</td>
            </tr>
            <tr>
              <td>Fakultasi</td>
              <td>:</td>
              <td>{studentInfo.faculty}</td>
            </tr>
            <tr>
              <td>Program Studi</td>
              <td>:</td>
              <td>{studentInfo.studyProgram}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ width: "80%", margin: "auto", marginTop: "25px" }}>
        <table
          style={{
            width: "100%",
            marginBottom: "20px",
            textAlign: "left",
            margin: "auto",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                  borderBottom: "none",
                }}
              >
                Tim Penguji
              </th>
            </tr>
          </thead>
        </table>
        <table
          style={{
            width: "100%",
            marginBottom: "20px",
            textAlign: "left",
            margin: "auto",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                No
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Nama
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Tanda Tanggan
              </th>
            </tr>
          </thead>
          <tbody>
            {examinerInfo.map((examiner) => (
              <tr key={examiner.no}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {examiner.no}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {examiner.name}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {examiner.signature}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ width: "80%", margin: "auto" }}>
        <p>Nilai Kesimpulan Ujian Proposal Skripsi : A</p>
        <p>Deskripsi : Lulus</p>
      </div>

      <div
        style={{
          width: "80%",
          textAlign: "right",
          marginTop: "50px",
          margin: "auto",
          height: "150px",
        }}
      >
        <p style={{ marginRight: "23%", marginBottom: "-5px" }}>
          Unklab, 2 April 2023
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {renderSignatureBlock(
              signatures[0].name,
              signatures[0].role,
              signatures[0].nidn
            )}
          </div>
          <div style={{ marginRight: "25%" }}>
            {renderSignatureBlock(
              signatures[1].name,
              signatures[1].role,
              signatures[1].nidn
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "space-between",
          margin: "auto",
        }}
      >
        {renderSignatureBlock(
          signatures[2].name,
          signatures[2].role,
          signatures[2].nidn
        )}
        {renderSignatureBlock(
          signatures[3].name,
          signatures[3].role,
          signatures[3].nidn
        )}
      </div>
    </div>
  );
});

const PrintBeritaAcara = () => {
  const reportContentRef = useRef();

  return (
    <div className="App" style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <PrintButton onPrint={() => reportContentRef.current} />
      <ReportContent ref={reportContentRef} />
    </div>
  );
};

export default PrintBeritaAcara;
