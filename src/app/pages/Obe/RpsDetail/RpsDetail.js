import { Stack, Button, CircularProgress } from "@mui/material";
import { ASSET_IMAGES } from "app/utils/constants/paths";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRpsDetail } from "app/api";
import moment from "moment";
import { convertShortMajor } from "app/utils/appHelpers";
import NotfoundAnimation from "app/shared/NotfoundAnimation";

const marginTop = "10mm";
const marginRight = "10mm";
const marginBottom = "10mm";
const marginLeft = "10mm";

const getPageMargins = () => {
  return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
};

const RpsDetail = () => {
  const componentRef = useRef();
  const { rpsId } = useParams();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const rpsQuery = useQuery({
    queryKey: ["rps", rpsId],
    queryFn: () => getRpsDetail(rpsId),
  });

  if (rpsQuery.status === "pending") {
    return <CircularProgress color="info" />;
  }

  if (!rpsQuery.data) {
    return <NotfoundAnimation />;
  }

  return (
    <Stack
      alignItems={"center"}
      style={{
        height: `calc(100vh - 150px)`,
        fontFamily: "Tahoma, sans-serif",
      }}
    >
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
                    PROGRAM STUDI S1 <br />
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
                    {`${rpsQuery.data?.Subject.englishName} / ${rpsQuery.data?.Subject.indonesiaName}`}
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black text-center"
                  >
                    {rpsQuery.data?.Subject.code}
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black text-center"
                  >
                    {rpsQuery.data?.subjectFamily}
                  </td>
                  <td className="border-[1px] border-black text-center">
                    {rpsQuery.data?.Subject.credits}
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
                    {rpsQuery.data?.Subject.Curriculum_Subject.map(
                      (item) => item.semester
                    ).join(", ")}
                  </td>
                  <td
                    colSpan={2}
                    className="border-[1px] border-black text-center"
                  >
                    {moment(rpsQuery.data?.updatedAt).format("DD/MM/YYYY")}
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
                    {rpsQuery.data?.rpsDeveloper}
                  </td>
                  <td
                    colSpan={3}
                    className="border-[1px] border-black text-center"
                  >
                    {rpsQuery.data?.headOfExpertise}
                  </td>
                  <td
                    colSpan={4}
                    className="border-[1px] border-black text-center"
                  >
                    {rpsQuery.data?.headOfProgramStudy}
                  </td>
                </tr>
              </>

              {/* 4 Deskripsi MK */}
              <>
                <tr>
                  <td className="border-[1px] border-black">
                    Deskripsi Mata Kuliah
                  </td>
                  <td colSpan={12} className="border-[1px] border-black w-full">
                    <pre className="whitespace-pre-wrap">
                      {rpsQuery.data?.subjectDescription}
                    </pre>
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
                {rpsQuery.data?.Subject.Subject_Cpl.map((item, index) => (
                  <tr key={item.cpl.id}>
                    <td className="border-[1px] border-black">
                      {item.cpl.code}
                    </td>
                    <td colSpan={11} className="border-[1px] border-black">
                      {item.cpl.description}
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
                {rpsQuery.data?.Cpmk.map((item) => (
                  <tr>
                    <td className="border-[1px] border-black">{item.code}</td>
                    <td colSpan={8} className="border-[1px] border-black">
                      {item.description}
                    </td>
                    <td colSpan={3} className="border-[1px] border-black">
                      {item.SupportedCpl.map((item) => item.cpl.code).join(
                        ", "
                      )}
                    </td>
                  </tr>
                ))}
              </>

              {/* 6 Penilaian */}
              <>
                <tr>
                  <td className="border-[1px] border-black">Penilaian</td>
                  <td colSpan={12} className="border-[1px] border-black p-0">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <td
                            rowSpan={2}
                            className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                          >
                            ID CPMK
                          </td>
                          <td
                            colSpan={
                              rpsQuery.data?.GradingSystem.gradingSys.length
                            }
                            className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                          >
                            Bobot per bentuk penilaian
                          </td>
                          <td
                            rowSpan={2}
                            className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                          >
                            Total Bobot Per CPMK
                          </td>
                        </tr>
                        <tr>
                          {rpsQuery.data?.GradingSystem.gradingSys.map(
                            (item) => (
                              <td className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold">
                                {item.label}
                              </td>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {rpsQuery.data?.GradingSystem.cpmkGrades.map((item) => (
                          <tr>
                            <td className="border-[1px] border-black text-center">
                              {item.code}
                            </td>
                            {item.grades.map((grade) => (
                              <td className="border-[1px] border-black text-center">
                                {grade}
                              </td>
                            ))}
                            <td className="border-[1px] border-black text-center">
                              {item.totalGradingWeight}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold">
                            Total Per Penilaian
                          </td>
                          {rpsQuery.data?.GradingSystem.gradingSys.map(
                            (item) => (
                              <td className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold">
                                {item.value}
                              </td>
                            )
                          )}
                          <td className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold">
                            {rpsQuery?.data?.GradingSystem.total}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </td>
                </tr>
              </>

              {/* 7 Pustaka */}
              <>
                <tr>
                  <td
                    rowspan={
                      rpsQuery.data?.mainReferences.length +
                      rpsQuery.data?.supportingReferences.length +
                      2
                    }
                    className="border-[1px] border-black"
                  >
                    Pustaka{" "}
                  </td>
                  <td
                    colspan="12"
                    className="border-[1px] border-black bg-[#d9d9d9] text-center font-semibold"
                  >
                    Utama:{" "}
                  </td>
                </tr>
                {rpsQuery.data?.mainReferences.map((item, index) => (
                  <tr className="border-l-[1px] border-black">
                    <td colspan="12" className="border-r-[1px] border-black">
                      <pre className="whitespace-pre-wrap">
                        {`${index + 1}. ${item}`}
                      </pre>
                    </td>
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
                {rpsQuery.data?.supportingReferences.map((item, index) => (
                  <tr>
                    <td colspan="12" className="border-r-[1px] border-black">
                      <pre className="whitespace-pre-wrap">
                        {`${index + 1}. ${item}`}
                      </pre>
                    </td>
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
                    {rpsQuery.data?.software}
                  </td>
                  <td className="border-[1px] border-black">
                    {rpsQuery.data?.hardware}
                  </td>
                </tr>
              </>

              {/* 9 Team Teaching */}
              <>
                <tr>
                  <td className="border-[1px] border-black">Team Teaching</td>
                  <td colspan="12" className="border-[1px] border-black">
                    {rpsQuery.data?.teamTeaching.map((item) => item).join(", ")}
                  </td>
                </tr>
              </>

              {/* 10 MK Prasyarat */}
              <>
                <tr>
                  <td className="border-[1px] border-black">
                    Matakuliah Syarat{" "}
                  </td>
                  <td colspan="12" className="border-[1px] border-black">
                    {rpsQuery.data?.Prerequisite.map((item) => (
                      <table className="w-full">
                        <tr className="bg-[#d9d9d9] text-center font-semibold">
                          <td>{`${convertShortMajor(item.curriculum.major)} - ${
                            item.curriculum.year
                          }`}</td>
                        </tr>
                        {item.prerequisite.map((item) => (
                          <tr>
                            <td>
                              {`${item.code} - ${item.englishName} / ${item.indonesiaName}`}
                            </td>
                          </tr>
                        ))}
                      </table>
                    ))}
                  </td>
                </tr>
              </>

              {/* 11 Ambang Batas */}
              <>
                <tr>
                  <td className="border-[1px] border-black text-red-500">
                    Ambang Batas Kelulusan Mahasiswa
                  </td>
                  <td className="border-[1px] border-black">
                    {rpsQuery.data?.minPassStudents}
                  </td>
                  <td colspan="11" className="border-[1px] border-black">
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td className="border-[1px] border-black text-red-500">
                    Ambang Batas Kelulusan MK{" "}
                  </td>
                  <td className="border-[1px] border-black">
                    {rpsQuery.data?.minPassGrade}
                  </td>
                  <td colspan="11" className="border-[1px] border-black">
                    &nbsp;
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
              {rpsQuery.data?.MeetingPlan.map((item, index) => (
                <tr>
                  <td className="border-[1px] border-black text-center">
                    {item.week}
                  </td>
                  <td className="border-[1px] border-black">
                    {item.cpmkList.map((item) => item).join(", ")}
                  </td>
                  <td className="border-[1px] border-black align-top">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.subCpmkDescription,
                      }}
                    />
                  </td>
                  <td className="border-[1px] border-black align-top">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.achievementIndicators,
                      }}
                    />
                  </td>
                  <td className="border-[1px] border-black align-top">
                    {item.assessmentModel}
                  </td>
                  <td className="border-[1px] border-black align-top">
                    <div dangerouslySetInnerHTML={{ __html: item.material }} />
                  </td>
                  <td className="border-[1px] border-black align-top">
                    <div dangerouslySetInnerHTML={{ __html: item.method }} />
                  </td>
                  <td className="border-[1px] border-black align-top">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.offlineActivity,
                      }}
                    />
                  </td>
                  <td className="border-[1px] border-black align-top">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.onlineActivity,
                      }}
                    />
                  </td>
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
              <ol>
                <li>
                  Ambang Batas Kelulusan Mahasiswa merupakan batas minimal nilai
                  yang harus dicapai mahasiswa untuk setiap CPMK pada MK
                </li>
                <li>
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
          <Stack gap={5}>
            {rpsQuery.data?.StudentAssignmentPlan.map((item, index) => (
              <table
                className="table-fixed w-[570px] self-center"
                key={item.id}
              >
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
                      {`${rpsQuery.data?.Subject.englishName} / ${rpsQuery.data?.Subject.indonesiaName}`}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] border-black">Kode </td>
                    <td className="border-[1px] border-black text-red-600 font-semibold text-center">
                      {rpsQuery.data?.Subject.code}
                    </td>
                    <td className="border-[1px] border-black text-center">
                      SKS{" "}
                    </td>
                    <td className="border-[1px] border-black text-center">
                      {rpsQuery.data?.Subject.credits}
                    </td>
                    <td className="border-[1px] border-black text-center">
                      SEMESTER{" "}
                    </td>
                    <td className="border-[1px] border-black text-center">
                      {rpsQuery.data?.Subject.Curriculum_Subject.map(
                        (item) => item.semester
                      ).join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-[1px] border-black">
                      Dosen Pengampu
                    </td>
                    <td colspan="5" className="border-[1px] border-black">
                      {`${rpsQuery.data?.teacher.firstName} ${rpsQuery.data?.teacher.lastName}`}
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
                      {item.assignmentModel}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="6" className="border-x-[1px] border-black">
                      Pustaka: {item.references}
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
                      {item.subLearningOutcomes}
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
                      {item.assignmentDescription}
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
                      <pre className="whitespace-pre-wrap">
                        {item.icbValuation}
                      </pre>
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
                      {item.dueSchedule}
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
                      {item.others}
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
                      {item.referenceList}
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </Stack>
        </Stack>
      </div>
    </Stack>
  );
};

export default RpsDetail;
