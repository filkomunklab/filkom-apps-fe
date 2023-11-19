import DaftarPegawai from "app/pages/ThesisApps/Admin/DaftarPegawai";
import Page from "@jumbo/shared/Page";

const adminSkripsiRoutes = [
  {
    // daftar pengajuan proposal
    path: "/sistem-informasi-skripsi/daftar-pegawai",
    element: <Page component={DaftarPegawai} />,
  },
];

export default adminSkripsiRoutes;
