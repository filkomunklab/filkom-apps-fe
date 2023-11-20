import Page from "@jumbo/shared/Page";
import DaftarPegawai from "app/pages/ThesisApps/Admin/DaftarPegawai";
import KalenderAkademik from "app/pages/ThesisApps/Admin/KalenderAkademik";
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
  {
    path: "/sistem-informasi-skripsi/kalender-akademik",
    element: <Page component={KalenderAkademik} />,
  },
];

export default adminSkripsiRoutes;
