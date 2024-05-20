import React from "react";

const CPLProdi = () => {
  return (
    <div className="bg-white rounded-sm p-5">
      <h1 className="text-base font-semibold mb-5">
        Capaian Pembelajaran Lulusan (CPL) PRODI
      </h1>
      <div>
        <table className="w-full border-collapse border">
          <thead className="bg-stone-200">
            <tr>
              <th className="border px-2 text-left">ID CPL</th>
              <th className="border px-2 text-left">Deskripsi CPL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2">KK7/CPL/SI</td>
              <td className="border px-2">
                Mengenali berbagai tipe peluang inovasi dan dampaknya terhadap
                rancangan model bisnis.
              </td>
            </tr>
            <tr>
              <td className="border px-2">KU12/CPL/SI</td>
              <td className="border px-2">
                Mengidentifikasi area fungsional dan proses bisnis terkait yang
                berdampak pada implementasi sistem informasi.
              </td>
            </tr>
            <tr>
              <td className="border px-2">P8CPL/SI</td>
              <td className="border px-2">
                Mengidentifikasi peluang digitalisasi dalalm perancangan dan
                inovasi model bisnis
              </td>
            </tr>
            <tr>
              <td className="border px-2">KU12/CPL/SI</td>
              <td className="border px-2">
                Mengidentifikasi area fungsional dan proses bisnis terkait yang
                berdampak pada implementasi sistem informasi.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CPLProdi;
