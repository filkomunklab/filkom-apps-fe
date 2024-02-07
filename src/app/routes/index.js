import React from "react";
import Home from "../pages/home";
import Page from "@jumbo/shared/Page";
import ChangePassword from "app/pages/ChangePassword";
import Login from "app/pages/Login";
import mahasiswaRoutes from "./BA-mahasiswaRoutes";
import NotFound from "../pages/404";
import Unauthorized from "app/pages/unauthorized";
import operatorRoutes from "./operatorRoutes";
import dosenPembimbingRoutes from "./BA-dosenPembimbingRoutes";
import dekanRoutes from "./BA-dekanRoutes";
import kepalaProgramStudiRoutes from "./BA-kepalaProgramStudiRoutes";
import sekretarisDekanRoutes from "./BA-sekretarisRoutes";
import skripsiAppDekanRoutes from "./skripsi_app_dekan_routes";
import skripsiAppKaprodiRoutes from "./skripsi_app_kaprodi_routes";
import skripsiAppDosenRoutes from "./skripsi_app_dosen_routes";
import skripsiAppSekretarisRoutes from "./skripsi_app_sekretaris_routes";
import skripsiAppMahasiswaRoutes from "./skripsi_app_mahasiswa_routes";
import skripsiAppAdminRoutes from "./skripsi_app_admin_routes";
import SkripsiFakultasIlmuKomputer from "app/pages/ThesisApps/Mahasiswa/SkripsiFakultasIlmuKomputer";
import adminRoutes from "./adminRoutes";
/**
 routes which you want to make accessible to both authenticated and anonymous users
 **/
const routesForPublic = [
  { path: "/notfound", element: <NotFound /> },
  { path: "/unauthorized", element: <Unauthorized /> },
];

/**
 routes only accessible to authenticated users
 **/
const routesForAuthenticatedOnly = [
  {
    path: "/",
    element: <Page component={Home} />,
  },
  {
    path: "/change-password",
    element: <Page component={ChangePassword} />,
  },
  ...mahasiswaRoutes,
  ...operatorRoutes,
  ...dosenPembimbingRoutes,
  ...dekanRoutes,
  ...kepalaProgramStudiRoutes,
  ...sekretarisDekanRoutes,
  //...operatorRoutes,
  ...skripsiAppDekanRoutes,
  ...skripsiAppKaprodiRoutes,
  ...skripsiAppDosenRoutes,
  ...skripsiAppSekretarisRoutes,
  ...skripsiAppMahasiswaRoutes,
  ...skripsiAppAdminRoutes,
  ...adminRoutes,
];

/**
 routes only accessible when user is anonymous
 **/
const routesForNotAuthenticatedOnly = [
  {
    path: "/login",
    element: <Page component={Login} layout={"bare-page"} />,
  },
  {
    path: "/skripsi-fakultas-ilmu-komputer",
    element: (
      <Page component={SkripsiFakultasIlmuKomputer} layout={"bare-page"} />
    ),
  },
];

const routes = [
  ...routesForPublic,
  ...routesForAuthenticatedOnly,
  ...routesForNotAuthenticatedOnly,
];

export {
  routes as default,
  routesForPublic,
  routesForNotAuthenticatedOnly,
  routesForAuthenticatedOnly,
};
