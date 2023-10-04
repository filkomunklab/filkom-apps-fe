import Page from "@jumbo/shared/Page";
import DaftarAlumni from "app/pages/KlabatBridge/Operator/DaftarAlumni";
import FormTracerStudy from "app/pages/KlabatBridge/Operator/Form Tracer Study";

const operatorRoutes = [
  {
    path: "klabat-bridge/daftar-alumni",
    element: <Page component={DaftarAlumni} />,
  },
  {
    path: "klabat-bridge/form-tracer-study",
    element: <Page component={FormTracerStudy} />,
  },
];

export default operatorRoutes;
