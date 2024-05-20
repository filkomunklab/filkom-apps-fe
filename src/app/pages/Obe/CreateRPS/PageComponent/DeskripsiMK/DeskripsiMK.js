import React from "react";

const DeskripsiMK = () => {
  return (
    <div className="bg-white rounded-sm p-5">
      <h1 className="text-base font-semibold mb-5">Deskripsi Mata Kuliah</h1>
      <p className="font-semibold mb-2">Deskripsi</p>
      {/* <p className="border rounded-md p-2 text-stone-400">
        Matakuliah ini mengajarkan pentingnya Business Process Reengineering
        (BPR) dalam konteks bisnis modern, dengan fokus pada karakteristik
        esensial BPR, pemodelan proses menggunakan IDEF0 dan BPMN, strategi
        implementasi, analisis, desain, simulasi, dan evaluasi proses, serta
        manajemen perubahan dan transisi organisasi. Mahasiswa akan dipersiapkan
        untuk menghadapi tantangan perubahan dalam organisasi dengan pemahaman
        mendalam tentang BPR dan keterampilan praktis dalam merancang,
        mengelola, dan mengoptimalkan proses bisnis. <br /> <br />
        This course teaches the importance of Business Process Reengineering
        (BPR) in the context of modern business, focusing on the essential
        characteristics of BPR, process modeling using IDEF0 and BPMN,
        implementation strategies, process analysis, design, simulation, and
        evaluation, as well as organizational change management and transition.
        Students will be prepared to confront the challenges of organizational
        change with a deep understanding of BPR and practical skills in
        designing, managing, and optimizing business processes.
      </p> */}

      <textarea className="w-full border border-gray-400 rounded-md p-2 py-4 hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out" />
    </div>
  );
};
export default DeskripsiMK;
