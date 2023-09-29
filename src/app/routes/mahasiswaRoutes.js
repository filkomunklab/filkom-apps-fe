import Page from "@jumbo/shared/Page";
// import DaftarAlumni from "app/pages/Mahasiswa/KlabatBridge/DaftarAlumni";
import DaftarAlumni from "app/pages/KlabatBridge/DaftarAlumni";
import AcademicGuide from "app/pages/BimbinganAkademik/Mahasiswa/AcademicGuide";

const mahasiswaRoutes = [
  {
    path: "/klabat-bridge/daftar-alumni",
    element: <Page component={DaftarAlumni} />,
  },
  {
    path: "/bimbingan-akademik/academic-guide",
    element: <Page component={AcademicGuide} />,
  },
];

export default mahasiswaRoutes;
