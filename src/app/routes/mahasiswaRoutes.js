import Page from "@jumbo/shared/Page";
import DaftarAlumni from "app/pages/Mahasiswa/KlabatBridge/DaftarAlumni";

const mahasiswaRoutes = [
  {
    path: "/klabat-bridge/daftar-alumni",
    element: <Page component={DaftarAlumni} />,
  },
];

export default mahasiswaRoutes;
