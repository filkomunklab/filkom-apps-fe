import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "@mui/material/Button";
import { scheduleData } from "app/shared/widgets/ScheduleCard/data";

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

const PrintBeritaAcara = React.forwardRef((props, ref) => {
  const { selectedSemester, selectedSchedule, convertedTime } = props;

  const [formattedSemester, setFormattedSemester] = useState();
  const [hourText, setHourText] = useState();

  // Membuat fungsi untuk mendapatkan jenis semester
  const getSemesterType = (semester) => {
    if (semester.includes("Ganjil")) {
      return "I";
    } else if (semester.includes("Genap")) {
      return "II";
    } else {
      return "Padat";
    }
  };

  useEffect(() => {
    if (selectedSemester) {
      // Mendapatkan jenis semester dari selectedSemester
      const semesterType = getSemesterType(selectedSemester);

      // Mendapatkan tahun ajaran dari selectedSemester
      const academicYear = selectedSemester.match(/\d{4}\/\d{4}/)[0];

      setFormattedSemester(`Semester ${semesterType}, ${academicYear}`);
    }

    // if (selectedTime) {
    //   //  jam
    //   const waktu = selectedTime;

    //   // Memisahkan jam dan menit dari selectedSchedule
    //   const [jam, menit] = waktu?.split(":").map(Number);
    //   console.log("waktu: ", waktu);
    //   console.log("jam: ", jam);
    //   console.log("menit: ", menit);

    //   const convertedHour = convertHourToText(jam, menit);

    //   setHourText(convertedHour);
    // }
  }, [
    selectedSemester,
    // selectedTime
  ]);

  // Gunakan formattedSemester sesuai kebutuhan
  console.log(formattedSemester);

  // Dapatkan data jadwal yang terpilih dan gunakan sesuai kebutuhan
  console.log("Selected Schedule in PrintBeritaAcara:", selectedSchedule);
  // Dapatkan data jadwal yang terpilih dan gunakan sesuai kebutuhan
  console.log("Selected Semester in PrintBeritaAcara:", selectedSemester);

  const currentDate = new Date(selectedSchedule?.defence_date); // Tanggal hari ini
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

  return (
    <div style={{ display: "none" }}>
      <div
        ref={ref}
        className="App"
        style={{ background: "#f5f5f5", minHeight: "100vh" }}
      >
        {/* <PrintButton onPrint={() => reportContentRef.current} /> */}
        {selectedSchedule?.students?.map((mahasiswa, index) => (
          <div key={index}>
            <div
              style={{
                width: "210mm",
                height: "297mm",
                margin: "auto",
                background: "white",
                padding: "20px", // Optional: Add padding for spacing
                fontFamily: "Times  New Roman",
              }}
            >
              <p>Proposal Skripsi</p>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <h3>BERITA ACARA</h3>
                <h3>UJIAN PROPOSAL SKRIPSI MAHASISWA</h3>
                <p>{formattedSemester}</p>
              </div>
              <div style={{ width: "80%", margin: "auto" }}>
                <p>
                  Pada hari ini <strong>{dayName}</strong> Tanggal
                  <strong> {convertToText(currentDate.getDate())} </strong>
                  bulan <strong> {monthName}</strong> tahun
                  <strong> {yearText}</strong> pukul
                  <strong> {convertedTime} </strong>
                  hingga selesai di Ruang <strong>GK1-207</strong> dari
                  Fakultasi Ilmu Komputer Universitas Klabat, telah diadakan
                  Ujian Proposal Skripsi:
                </p>
              </div>
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <h4>JUDUL</h4>
                <p>
                  <strong>{selectedSchedule?.title}</strong>
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
                      <td>{mahasiswa.fullName}</td>
                    </tr>
                    <tr>
                      <td>NIM</td>
                      <td>:</td>
                      <td>{mahasiswa.nim}</td>
                    </tr>
                    <tr>
                      <td>Jenjang Pendidikan</td>
                      <td>:</td>
                      <td>S-1</td>
                    </tr>
                    <tr>
                      <td>Fakultasi</td>
                      <td>:</td>
                      <td>Fakultas Ilmu Komputer</td>
                    </tr>
                    <tr>
                      <td>Program Studi</td>
                      <td>:</td>
                      <td>
                        {mahasiswa.major === "IF"
                          ? "Informatika"
                          : "Sistem Infomasi"}
                      </td>
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
                    <tr>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        1
                      </td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {selectedSchedule?.panelis_chairman.name}
                      </td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {selectedSchedule?.is_sign_by_chairman.name}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        2
                      </td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {selectedSchedule?.panelis_member.name}
                      </td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {selectedSchedule?.is_sign_by_member.name}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        3
                      </td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {selectedSchedule?.advisor.name}
                      </td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>
                        {selectedSchedule?.is_sign_by_advisor.name}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ width: "80%", margin: "auto" }}>
                <p>
                  Nilai Kesimpulan Ujian Proposal Skripsi :{" "}
                  {mahasiswa.assessment_conclution}
                </p>
                <p>Deskripsi : {selectedSchedule?.is_pass}</p>
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
                  Unklab, {selectedSchedule?.defence_date}
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{renderSignatureBlock("Dekan FILKOM", "", "")}</div>
                  <div style={{ marginRight: "25%" }}>
                    {renderSignatureBlock("Ketua Tim Penguji", "", "")}
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
                    selectedSchedule?.dekan.name,
                    "",
                    selectedSchedule?.dekan.nidn
                  )}
                  {renderSignatureBlock(
                    selectedSchedule?.panelis_chairman.name,
                    "",
                    selectedSchedule?.panelis_chairman.nidn
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default PrintBeritaAcara;
