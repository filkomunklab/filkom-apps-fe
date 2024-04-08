import { Stack, Button } from "@mui/material";
import { ASSET_IMAGES } from "app/utils/constants/paths";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const marginTop = "10mm";
const marginRight = "10mm";
const marginBottom = "10mm";
const marginLeft = "10mm";

const getPageMargins = () => {
  return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
};

const RpsDetail = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Stack alignItems={"center"} style={{ height: `calc(100vh - 150px)` }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        width={"100%"}
        bgcolor={"white"}
        borderRadius={5}
        p={2}
        textAlign={"center"}
        mb={2}
        boxShadow={3}
      >
        <h1 className="flex items-center text-lg font-semibold">Rincian RPS</h1>
        <Button variant="contained" onClick={handlePrint}>
          Print
        </Button>
      </Stack>

      <div className={"w-[100%] h-full overflow-auto"}>
        <Stack
          ref={componentRef}
          className="inline-block w-[277mm] bg-white"
          style={{ fontSize: "9.5pt" }}
        >
          <style>{getPageMargins()}</style>
          {/* RPS */}
          <table>
            <tbody>
              {/* 1 Header */}
              <>
                <tr>
                  <td className="border-[1px] border-black justify-center">
                    <div className="flex justify-center items-center">
                      <img
                        src={`${ASSET_IMAGES}/img-logo-short-white.png`}
                        className="object-contain w-[57.6pt]"
                      />
                    </div>
                  </td>
                  <td
                    colSpan={12}
                    className="text-center border-[1px] border-black py-1"
                  >
                    RENCANA PEMBELAJARAN SEMESTER <br />
                    PROGRAM STUDI S1 SISTEM INFORMASI <br />
                    FAKULTAS ILMU KOMPUTER <br />
                    <b>Universitas Klabat</b>
                  </td>
                </tr>
              </>

              {/* 2 Identitas MK */}
              <>
                <tr>
                  <td rowSpan={2} className="border-[1px] border-black">
                    Identitas Mata Kuliah
                  </td>
                  <td className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold">
                    NAMA MK
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    KODE MK
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    RUMPUN MATA KULIAH
                  </td>
                  <td
                    colSpan={3}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    BOBOT(SKS)
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    SEMESTER
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    Direvisi
                  </td>
                </tr>
                <tr>
                  <td className="border-[1px] border-black text-center">
                    Business Process Reengineering / Rekayasa Proses Bisnis
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black text-center"
                  >
                    IS3155
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black text-center"
                  >
                    Business and Management
                  </td>
                  <td className="border-[1px] border-black text-center">3</td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black text-center"
                  >
                    0
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black text-center"
                  >
                    5
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black text-center"
                  >
                    9/8/2023
                  </td>
                </tr>
              </>

              {/* 3 Otoritas */}
              <>
                <tr>
                  <td rowSpan={2} className="border-[1px] border-black">
                    Otoritas
                  </td>
                  <td
                    colSpan={5}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    Pengembang RPS
                  </td>
                  <td
                    colSpan={3}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    Ketua Kelompok Penelitian
                  </td>
                  <td
                    colSpan={4}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    Ka PRODI
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={5}
                    className="border-[1px] border-black text-center"
                  >
                    Andrew Tanny Liem, SSi., MT., PhD{" "}
                  </td>
                  <td
                    colSpan={3}
                    className="border-[1px] border-black text-center"
                  >
                    Andrew Tanny Liem, SSi., MT., PhD{" "}
                  </td>
                  <td
                    colSpan={4}
                    className="border-[1px] border-black text-center"
                  >
                    Stenly Richard Pungus, S.Kom., MT., MM., PhD{" "}
                  </td>
                </tr>
              </>

              {/* 4 Deskripsi MK */}
              <>
                <tr>
                  <td className="border-[1px] border-black">
                    Deskripsi Mata Kuliah
                  </td>
                  <td colSpan={12} className="border-[1px] border-black">
                    Matakuliah ini mengajarkan pentingnya Business Process
                    Reengineering (BPR) dalam konteks bisnis modern, dengan
                    fokus pada karakteristik esensial BPR, pemodelan proses
                    menggunakan IDEF0 dan BPMN, strategi implementasi, analisis,
                    desain, simulasi, dan evaluasi proses, serta manajemen
                    perubahan dan transisi organisasi. Mahasiswa akan
                    dipersiapkan untuk menghadapi tantangan perubahan dalam
                    organisasi dengan pemahaman mendalam tentang BPR dan
                    keterampilan praktis dalam merancang, mengelola, dan
                    mengoptimalkan proses bisnis. This course teaches the
                    importance of Business Process Reengineering (BPR) in the
                    context of modern business, focusing on the essential
                    characteristics of BPR, process modeling using IDEF0 and
                    BPMN, implementation strategies, process analysis, design,
                    simulation, and evaluation, as well as organizational change
                    management and transition. Students will be prepared to
                    confront the challenges of organizational change with a deep
                    understanding of BPR and practical skills in designing,
                    managing, and optimizing business processes.
                  </td>
                </tr>
              </>

              {/* 5 CPL & CPMK */}
              <>
                <tr>
                  <td rowSpan={12} className="border-[1px] border-black">
                    Capaian Pembelajaran Lulusan & Capaian Pembelajaran Mata
                    Kuliah{" "}
                  </td>
                  <td
                    colSpan={12}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    Capaian Pembelajaran Lulusan (CPL) PRODI
                  </td>
                </tr>
                {Array(3)
                  .fill("yuhu")
                  .map((item, index) => (
                    <tr>
                      <td className="border-[1px] border-black">{`CPL0${
                        index + 1
                      }`}</td>
                      <td colSpan={11} className="border-[1px] border-black">
                        Mengenali berbagai tipe peluang inovasi dan dampaknya
                        terhadap rancangan model bisnis.
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td
                    colSpan={9}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    Capaian Pembelajaran Mata Kuliah (CPMK)
                  </td>
                  <td
                    colSpan={3}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    CPL yang di dukung{" "}
                  </td>
                </tr>
                {Array(7)
                  .fill("huhi")
                  .map((item) => (
                    <tr>
                      <td className="border-[1px] border-black">CPMK01</td>
                      <td colSpan={8} className="border-[1px] border-black">
                        Mahasiswa mampu menganalisis berbagai peluang inovasi
                        dan dampaknya terhadap desain model bisnis.
                      </td>
                      <td colSpan={3} className="border-[1px] border-black">
                        CPL021, CPL022
                      </td>
                    </tr>
                  ))}
              </>

              {/* 6 Penilaian */}
              <>
                <tr>
                  <td rowSpan={12} className="border-[1px] border-black">
                    Penilaian
                  </td>
                  <td
                    rowSpan={2}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    ID CPMK
                  </td>
                  <td
                    colSpan={10}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    Bobot per Bentuk Penilaian
                  </td>
                  <td
                    rowSpan={2}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    TOTAL BOBOT PER CPMK
                  </td>
                </tr>
                <tr>
                  <td className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold">
                    Presensi
                  </td>
                  <td className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold">
                    Kuis 1
                  </td>
                  <td className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold">
                    Tugas 1
                  </td>
                  <td className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold">
                    Tugas 2
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    Proyek 1
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    UTS
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    UAS
                  </td>
                </tr>
                {Array(9)
                  .fill("huhi")
                  .map((item) => (
                    <tr>
                      <td className="border-[1px] border-black text-center">
                        CPMK01
                      </td>
                      <td className="border-[1px] border-black text-center">
                        1
                      </td>
                      <td className="border-[1px] border-black text-center">
                        5
                      </td>
                      <td className="border-[1px] border-black text-center">
                        5
                      </td>
                      <td className="border-[1px] border-black text-center">
                        0
                      </td>
                      <td
                        colSpan={2}
                        className="border-[1px] border-black text-center"
                      >
                        0
                      </td>
                      <td
                        colSpan={2}
                        className="border-[1px] border-black text-center"
                      >
                        0
                      </td>
                      <td
                        colSpan={2}
                        className="border-[1px] border-black text-center"
                      >
                        0
                      </td>
                      <td className="border-[1px] border-black text-center">
                        11
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold">
                    Total Per Penilaian
                  </td>
                  <td className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold">
                    10
                  </td>
                  <td className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold">
                    5
                  </td>
                  <td className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold">
                    25
                  </td>
                  <td className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold">
                    5
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    25
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    30
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    30
                  </td>
                  <td className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold">
                    100
                  </td>
                </tr>
              </>

              {/* 7 Pustaka */}
              <>
                <tr>
                  <td rowspan="9" className="border-[1px] border-black">
                    Pustaka{" "}
                  </td>
                  <td
                    colspan="12"
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    Utama:{" "}
                  </td>
                </tr>
                {Array(5)
                  .fill("huhi")
                  .map((item, index) => (
                    <tr className="border-l-[1px] border-black">
                      <td
                        colspan="12"
                        className="border-r-[1px] border-black"
                      >{`${
                        index + 1
                      }. Fundamentals of Business Process Management, Marlon Dumas, 2018`}</td>
                    </tr>
                  ))}
                <tr>
                  <td
                    colspan="12"
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    Pustaka Pendukung:{" "}
                  </td>
                </tr>
                {Array(2)
                  .fill("huhi")
                  .map((item, index) => (
                    <tr>
                      <td
                        colspan="12"
                        className="border-r-[1px] border-black"
                      >{`${
                        index + 1
                      }.Business Analysis and Process Modeling Guidebook: Business Analysis Techniques and Business Process Improvement`}</td>
                    </tr>
                  ))}
              </>

              {/* 8 Media Pembelajaran */}
              <>
                <tr>
                  <td rowspan="2" className="border-[1px] border-black">
                    Media Pembelajaran
                  </td>
                  <td
                    colspan="11"
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    Software:{" "}
                  </td>
                  <td className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold">
                    Hardware:{" "}
                  </td>
                </tr>
                <tr>
                  <td colspan="11" className="border-[1px] border-black">
                    Arena Simulation Software{" "}
                  </td>
                  <td className="border-[1px] border-black">
                    Komputer/Laptop; Projector{" "}
                  </td>
                </tr>
              </>

              {/* 9 Team Teaching */}
              <>
                <tr>
                  <td className="border-[1px] border-black">Team Teaching</td>
                  <td colspan="12" className="border-[1px] border-black">
                    Andrew Tanny Liem., SSi., MT., PhD{" "}
                  </td>
                </tr>
              </>

              {/* 10 MK Prasyarat */}
              <>
                <tr>
                  <td rowspan="2" className="border-[1px] border-black">
                    Matakuliah Syarat{" "}
                  </td>
                  <td colspan="12" className="border-[1px] border-black">
                    - [IS1222] Pengantar Akuntansi Keuangan/ Introduction to
                    Financial Accounting - 3 credit(s){" "}
                  </td>
                </tr>
                <tr>
                  <td colspan="12" className="border-[1px] border-black">
                    - [IS2131] Sistem Informasi Manajemen/ Management
                    Information System - 3 credit(s)
                  </td>
                </tr>
              </>

              {/* 11 Ambang Batas */}
              <>
                <tr>
                  <td className="border-[1px] border-black text-red-500">
                    Ambang Batas Kelulusan Mahasiswa
                  </td>
                  <td className="border-[1px] border-black">50.01</td>
                  <td colspan="11" className="border-[1px] border-black">
                    &nbsp;&nbsp;
                  </td>
                </tr>
                <tr>
                  <td className="border-[1px] border-black text-red-500">
                    Ambang Batas Kelulusan MK{" "}
                  </td>
                  <td className="border-[1px] border-black">85.00%</td>
                  <td colspan="11" className="border-[1px] border-black">
                    &nbsp;&nbsp;
                  </td>
                </tr>
              </>
            </tbody>
          </table>

          <p className="mt-5 mb-2">
            <span className="text-blue-600 font-semibold">TM: 2x(3x80’)</span>{" "}
            dibaca : kuliah tatap muka 2 kali (minggu) x 3 sks x 80 menit = 480
            menit.
          </p>

          {/* Meeting Plan */}
          <table>
            <thead>
              <tr>
                <td className="border-[1px] border-black bg-green-400 text-center font-semibold">
                  MINGGU KE-
                </td>
                <td className="border-[1px] border-black bg-green-400 text-center font-semibold">
                  ID CPMK
                </td>
                <td className="border-[1px] border-black bg-green-400 text-center font-semibold">
                  DESKRIPSI SUB CPMK
                </td>
                <td className="border-[1px] border-black bg-green-400 text-center font-semibold">
                  INDIKATOR KETERCAPAIAN CPMK
                </td>
                <td className="border-[1px] border-black bg-green-400 text-center font-semibold">
                  BENTUK ASSESSMENT
                </td>
                <td className="border-[1px] border-black bg-green-400 text-center font-semibold">
                  MATERI
                </td>
                <td className="border-[1px] border-black bg-green-400 text-center font-semibold">
                  METODE
                </td>
                <td className="border-[1px] border-black bg-green-400 text-center font-semibold text-red-600">
                  LUAR JARINGAN (TATAP MUKA)
                </td>
                <td className="border-[1px] border-black bg-green-400 text-center font-semibold text-red-600">
                  DALAM JARINGAN (DARING)
                </td>
              </tr>
            </thead>
            <tbody>
              {Array(3)
                .fill("yuhu")
                .map((item, index) => (
                  <tr>
                    <td className="border-[1px] border-black text-center">
                      {index + 1}
                    </td>
                    <td className="border-[1px] border-black">CPMK01</td>
                    <td className="border-[1px] border-black align-top">
                      Topik: BPR and Organization <br />
                      Mahasiswa mampu menjelaskan berbagai pendekatan BPR dan
                      menjelaskan dampaknya terhadap desain model bisnis <br />
                      Mahasiswa memahami perubahan organisasi yang diperlukan
                      untuk mendukung upaya BPR
                    </td>
                    <td className="border-[1px] border-black align-top">
                      Tugas 1: Ketepatan mahasiswa dalam menjelaskan konsep
                      dasar BPR <br />
                      Kuis 1: Ketepatan mahasiswa dalam menjawab kuis
                    </td>
                    <td className="border-[1px] border-black align-top">
                      Kuis, Case Study{" "}
                    </td>
                    <td className="border-[1px] border-black align-top">
                      BPR and Organization #1: Definisi dari Re-Engineering,
                      process dan proses bisnis. Definisi dan contoh dari BPR{" "}
                      <br />
                      BPR and Organization #2: Bagaimana BPR dapat di
                      implementasikan pada suatu Organisasi <br />
                      BPR and Organization #3: Karateristik dan Tujuan/Objektif
                      dari BPR <br />
                      BPR and Organization #3: Metodologi untuk
                      mengimplementasikan BPR dan teknik-teknik lain yang dapat
                      digunakan
                    </td>
                    <td className="border-[1px] border-black align-top">
                      Ceramah dan Diskusi TM: 2x(3x50’) <br />
                      Case Study 1 Mazda vs. Ford Case: Memahami dampak BPR
                      terhadap desain model bisnis dan perubahan yang disebabkan{" "}
                      <br />
                      BM:2x(3x60’) BT:2x(3x60’)
                    </td>
                    <td className="border-[1px] border-black align-top">
                      1. Mengikuti perkulihan tatap muka <br />
                      2. Penjelasan materi <br />
                      3. Menanyakan materi yang belum jelas ke dosen <br />
                      4. diskusi dan tanya jawab
                    </td>
                    <td className="border-[1px] border-black align-top"></td>
                  </tr>
                ))}
            </tbody>
          </table>

          <Stack gap={4} className="my-3">
            <b>
              TM = Tatap Muka di kelas; BT = Belajar Terstruktur (mengerjakan PR
              atau tugas); BM = Belajar Mandiri di luar kelas; DR = Pembelajaran
              secara daring
            </b>
            <p>
              Student Center Learning-Jigsaw: salah satu model pembelajaran yang
              terdiri dari tim-tim belajar heterogen, beranggotakan 4-6
              mahasiswa, setiap mahasiswa bertanggung jawab atas penguasaan
              bagian dari materi belajar dan harus mampu mengajarkan bagian
              tersebut kepada anggota tim lainnya.
            </p>
            <div>
              <b>Notes:</b>
              <ol className="list-decimal px-5">
                <li className="list-item">
                  Ambang Batas Kelulusan Mahasiswa merupakan batas minimal nilai
                  yang harus dicapai mahasiswa untuk setiap CPMK pada MK
                </li>
                <li className="list-item">
                  Ambang Batas Kelulusan Mata Kuliah merupakan batas minimal
                  persentase jumlah mahasiswa dalam satu periode pengajaran yang
                  memperoleh
                </li>
              </ol>
              <p>
                {
                  "nilai >= Ambang Batas Kelulusan Mahasiswa. Contoh: Dalam 1 kelas terdapat 50 mahasiswa, dimana 30 diantaranya mendapatkan nilai akhir lebih dari 50,01; 15 mahasiswa memperoleh nilai di bawah 50,01; sementara 5 lainnya memperoleh nilai 50,01 maka persentase untuk 1 CPMK pada MK ini sebagai berikut"
                }
              </p>
            </div>
            <table>
              <thead>
                <tr>
                  <td />
                  <td
                    colSpan={2}
                    className="border-[1px] border-black font-semibold text-center"
                  >
                    di atas ambang batas
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black font-semibold text-center"
                  >
                    sesuai ambang batas
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black font-semibold text-center"
                  >
                    di bawah ambang batas
                  </td>
                  <td className="border-[1px] border-black">Status MK</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-[1px] border-black text-center">
                    CL008
                  </td>
                  <td className="border-[1px] border-black text-center">30</td>
                  <td className="border-[1px] border-black text-center">
                    60.00%
                  </td>
                  <td className="border-[1px] border-black text-center">5</td>
                  <td className="border-[1px] border-black text-center">
                    10.00%
                  </td>
                  <td className="border-[1px] border-black text-center">15</td>
                  <td className="border-[1px] border-black text-center">
                    30.00%
                  </td>
                  <td className="border-[1px] border-black text-center">
                    FAILED
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5}>
                    karena persentase jumlah mahasiswa yang berada di bawah
                    ambang batas kelulusan lebih dari 14,5%.
                  </td>
                </tr>
              </tfoot>
            </table>
          </Stack>

          {/* Student Assignment Plan */}
          <table className="table-fixed w-[570px] self-center">
            <tbody>
              <tr>
                <td
                  colspan="6"
                  className="border-[1px] border-black bg-[#01a0d9] text-center font-semibold"
                >
                  RENCANA TUGAS MAHASISWA{" "}
                </td>
              </tr>
              <tr>
                <td className="border-[1px] border-black">Mata Kuliah </td>
                <td
                  colspan="5"
                  className="border-[1px] border-black text-red-600 font-semibold"
                >
                  Business Process Reengineering
                </td>
              </tr>
              <tr>
                <td className="border-[1px] border-black">Kode </td>
                <td className="border-[1px] border-black text-red-600 font-semibold text-center">
                  IS3155
                </td>
                <td className="border-[1px] border-black text-center">SKS </td>
                <td className="border-[1px] border-black text-center">3</td>
                <td className="border-[1px] border-black text-center">
                  SEMESTER{" "}
                </td>
                <td className="border-[1px] border-black text-center">5</td>
              </tr>
              <tr>
                <td className="border-[1px] border-black">Dosen Pengampu</td>
                <td colspan="5" className="border-[1px] border-black">
                  Andrew Tanny Liem, S.Kom., MT., PhD{" "}
                </td>
              </tr>
              <tr>
                <td
                  colspan="6"
                  className="border-[1px] border-black bg-[#d9d9d9] font-semibold"
                >
                  BENTUK TUGAS{" "}
                </td>
              </tr>
              <tr>
                <td colspan="6" className="border-x-[1px] border-black">
                  Case Study 1: Mazda vs. Ford
                </td>
              </tr>
              <tr>
                <td colspan="6" className="border-x-[1px] border-black">
                  Pustaka: [1]{" "}
                </td>
              </tr>
              <tr>
                <td
                  colspan="6"
                  className="border-[1px] border-black bg-[#d9d9d9] font-semibold"
                >
                  SUB CAPAIAN PEMBELAJARAN{" "}
                </td>
              </tr>
              <tr>
                <td colspan="6" className="border-[1px] border-black">
                  CPMK01 Mahasiswa mampu menganalisis berbagai peluang inovasi
                  dan dampaknya terhadap desain model bisnis.{" "}
                </td>
              </tr>
              <tr>
                <td
                  colspan="6"
                  className="border-[1px] border-black bg-[#d9d9d9] font-semibold"
                >
                  DESKRIPSI TUGAS{" "}
                </td>
              </tr>
              <tr>
                <td colspan="6" className="border-[1px] border-black">
                  Mahasiswa membaca materi peran pentingnya BPR, menganalisis
                  inovasi yang dilakukan oleh Mazda vs. Ford dan dapat melihat
                  dampaknya terhadap perusahaan.{" "}
                </td>
              </tr>
              <tr>
                <td
                  colspan="6"
                  className="border-[1px] border-black bg-[#d9d9d9] font-semibold"
                >
                  INDIKATOR, KRITERIA DAN BOBOT PENILAIAN{" "}
                </td>
              </tr>
              <tr>
                <td colspan="6" className="border-[1px] border-black">
                  1.{" "}
                  <span>
                    Case Study 1 diberikan pada minggu ke-1 perkuliahan
                  </span>
                  <span>
                    <br />
                    2. Laporan hasil analisis dikumpulkan pada minggu ke-2
                    perkuliahan
                    <br />
                    3. Laporan akan dinilai sesuai rubrikasi yang telah
                    diberikan
                  </span>
                </td>
              </tr>
              <tr>
                <td
                  colspan="6"
                  className="border-[1px] border-black bg-[#d9d9d9] font-semibold"
                >
                  JADWAL PELAKSANAAN{" "}
                </td>
              </tr>
              <tr>
                <td colspan="6" className="border-[1px] border-black">
                  Minggu ke-1 perkuliahan{" "}
                </td>
              </tr>
              <tr>
                <td
                  colspan="6"
                  className="border-[1px] border-black bg-[#d9d9d9] font-semibold"
                >
                  LAIN-LAIN{" "}
                </td>
              </tr>
              <tr>
                <td colspan="6" className="border-[1px] border-black">
                  Bobot nilai Tugas <span>1</span>
                  <span> </span>
                  <span>adalah </span>
                  <span>5</span>
                  <span>%</span>
                  <span> dari total bobot mata kuliah </span>
                </td>
              </tr>
              <tr>
                <td
                  colspan="6"
                  className="border-[1px] border-black bg-[#d9d9d9] font-semibold"
                >
                  DAFTAR RUJUKAN{" "}
                </td>
              </tr>
              <tr>
                <td colspan="6" className="border-[1px] border-black">
                  z
                </td>
              </tr>
            </tbody>
          </table>
        </Stack>
      </div>
    </Stack>
  );
};

export default RpsDetail;
