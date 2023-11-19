import DaftarPegawai from "app/pages/ThesisApps/Admin/DaftarPegawai";
import { Page } from "react-pdf";

const adminSkripsiRoutes = [
  {
    // daftar pengajuan proposal
    path: "/sistem-informasi-skripsi/daftar-pegawai",
    element: <Page component={DaftarPegawai} />,
  },
];

export default adminSkripsiRoutes;
