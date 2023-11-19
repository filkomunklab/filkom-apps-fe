import Page from "@jumbo/shared/Page";
import DaftarPegawai from "app/pages/ThesisApps/Admin/DaftarPegawai";
import ManajemenDosenSkripsi from "app/pages/ThesisApps/Sekertaris/ManajemenDosenSkripsi";

const adminSkripsiRoutes = [
  {
    path: "/global/employee",
    element: <Page component={DaftarPegawai} />,
  },
  {
    path: "/sistem-informasi-skripsi/dosen-skripsi",
    element: <Page component={ManajemenDosenSkripsi} />,
  },
];

export default adminSkripsiRoutes;
