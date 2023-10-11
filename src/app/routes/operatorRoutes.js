// operator
import Page from "@jumbo/shared/Page";
import DaftarAlumni from "app/pages/KlabatBridge/Operator/DaftarAlumni";
import FormTracerStudy from "app/pages/KlabatBridge/Operator/FormTracerStudy";
import GrafikAlumni from "app/pages/KlabatBridge/Operator/GrafikAlumni";
import Dashboard from "app/pages/KlabatBridge/Operator/Dashboard";
import ViewDetailStudent from "app/pages/KlabatBridge/Operator/ViewDetailStudent";
import PengisianSPT from "app/pages/KlabatBridge/Operator/PengisianSPT";
import DaftarCalonTamatan from "app/pages/KlabatBridge/Operator/DaftarCalonTamatan";

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
];

export default operatorRoutes;
