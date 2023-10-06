import Page from "@jumbo/shared/Page";
import DaftarAlumni from "app/pages/KlabatBridge/Operator/DaftarAlumni";
import FormTracerStudy from "app/pages/KlabatBridge/Operator/FormTracerStudy";
import GrafikAlumni from "app/pages/KlabatBridge/Operator/GrafikAlumni";
import Dashboard from "app/pages/KlabatBridge/Operator/Dashboard";

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
];

export default operatorRoutes;
