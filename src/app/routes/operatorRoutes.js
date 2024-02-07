// operator
import Page from "@jumbo/shared/Page";
import DaftarAlumni from "app/pages/KlabatBridge/Operator/DaftarAlumni";
import FormTracerStudy from "app/pages/KlabatBridge/Operator/FormTracerStudy";
import Dashboard from "app/pages/KlabatBridge/Operator/Dashboard";
import ViewDetailStudent from "app/pages/KlabatBridge/Operator/ViewDetailStudent";
import PengisianSPT from "app/pages/KlabatBridge/Operator/PengisianSPT";
import DaftarCalonTamatanRegister from "app/pages/KlabatBridge/Operator/DaftarCalonTamatanRegister";
import DaftarCalonTamatanFakultas from "app/pages/KlabatBridge/Operator/DaftarCalonTamatanFakultas";
import HomeAlumni from "app/pages/KlabatBridge/Operator/HomeAlumni";
import HomeCalonTamatan from "app/pages/KlabatBridge/Operator/HomeCalonTamatan";
import DaftarAlumniFakultas from "app/pages/KlabatBridge/Operator/DaftarAlumniFakultas";
import IsiForm from "app/pages/KlabatBridge/Operator/HomeCalonTamatan/IsiForm";
import React from "react";

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
    path: "klabat-bridge/daftar-alumni-fakultas",
    element: <Page component={DaftarAlumniFakultas} />,
  },
  {
    path: "klabat-bridge/form-tracer-study",
    element: <Page component={FormTracerStudy} />,
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
    path: "klabat-bridge/daftar-calon-tamatan-register",
    element: <Page component={DaftarCalonTamatanRegister} />,
  },
  {
    path: "klabat-bridge/daftar-calon-tamatan-fakultas",
    element: <Page component={DaftarCalonTamatanFakultas} />,
  },
  {
    path: "klabat-bridge/home-alumni",
    element: <Page component={HomeAlumni} />,
  },
  {
    path: "klabat-bridge/home-calon-tamatan",
    element: <Page component={HomeCalonTamatan} />,
  },
  {
    path: "klabat-bridge/isi-form",
    element: <Page component={IsiForm} />,
  },
];

export default operatorRoutes;
