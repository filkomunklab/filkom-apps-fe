// operator
import Page from "@jumbo/shared/Page";
import DaftarAlumni from "app/pages/KlabatBridge/Operator/DaftarAlumni";
import FormTracerStudy from "app/pages/KlabatBridge/Operator/FormTracerStudy";
import GrafikAlumni from "app/pages/KlabatBridge/Operator/GrafikAlumni";
import Dashboard from "app/pages/KlabatBridge/Operator/Dashboard";
import ViewDetailStudent from "app/pages/KlabatBridge/Operator/ViewDetailStudent";
import PengisianSPT from "app/pages/KlabatBridge/Operator/PengisianSPT";
import DaftarCalonTamatan from "app/pages/KlabatBridge/Operator/DaftarCalonTamatan";
import HomeAlumni from "app/pages/KlabatBridge/Operator/HomeAlumni";
import HomeCalonTamatan from "app/pages/KlabatBridge/Operator/HomeCalonTamatan";

const operatorRoutes = [
  {
    path: "klabat-bridge/dashboard",
    element: <Page component={Dashboard} />,
  },
  {
    path: "klabat-bridge/daftar-alumni",
    element: <Page component={DaftarAlumni} />,
  },
  {
    path: "klabat-bridge/form-tracer-study",
    element: <Page component={FormTracerStudy} />,
  },
  {
    path: "klabat-bridge/grafik-alumni",
    element: <Page component={GrafikAlumni} />,
  },
  {
    path: "klabat-bridge/view-detail-student",
    element: <Page component={ViewDetailStudent} />,
  },
  {
    path: "klabat-bridge/pengisian-spt",
    element: <Page component={PengisianSPT} />,
  },
  {
    path: "klabat-bridge/daftar-calon-tamatan",
    element: <Page component={DaftarCalonTamatan} />,
  },
  {
    path: "klabat-bridge/home-alumni",
    element: <Page component={HomeAlumni} />,
  },
  {
    path: "klabat-bridge/home-calon-tamatan",
    element: <Page component={HomeCalonTamatan} />,
  },
];

export default operatorRoutes;
