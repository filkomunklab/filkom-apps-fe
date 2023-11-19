import React from "react";
import Home from "../pages/home";
import Page from "@jumbo/shared/Page";
import Login from "app/pages/Login";
import mahasiswaRoutes from "./BA-mahasiswaRoutes";
import NotFound from "../pages/404";
import Unauthorized from "app/pages/unauthorized";
import operatorRoutes from "./operatorRoutes";
import dosenPembimbingRoutes from "./BA-dosenPembimbingRoutes";
import dekanRoutes from "./BA-dekanRoutes";
import kepalaProgramStudiRoutes from "./BA-kepalaProgramStudiRoutes";
import sekretarisDekanRoutes from "./BA-sekDekanRoutes";
import skripsiAppDekanRoutes from "./skripsi_app_dekan_routes";
import skripsiAppKaprodiRoutes from "./skripsi_app_kaprodi_routes";
import skripsiAppDosenRoutes from "./skripsi_app_dosen_routes";
import skripsiAppSekretarisRoutes from "./skripsi_app_sekretaris_routes";
import skripsiAppMahasiswaRoutes from "./skripsi_app_mahasiswa_routes";
import adminSkripsiRoutes from "./skripsi_app_admin_routes";
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
  ...adminSkripsiRoutes,
];

/**
 routes only accessible when user is anonymous
 **/
const routesForNotAuthenticatedOnly = [
  {
    path: "/login",
    element: <Page component={Login} layout={"bare-page"} />,
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
