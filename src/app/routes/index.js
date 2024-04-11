import React from "react";
import Home from "../pages/home";
import Page from "@jumbo/shared/Page";
import ChangePassword from "app/pages/ChangePassword";
import Login from "app/pages/Login";
import mahasiswaRoutes from "./mahasiswaRoutes";
import NotFound from "../pages/404";
import Unauthorized from "app/pages/unauthorized";
import operatorRoutes from "./operatorRoutes";
import dosenPembimbingRoutes from "./dosenPembimbingRoutes";
import dekanRoutes from "./dekanRoutes";
import kepalaProgramStudiRoutes from "./kepalaProgramStudiRoutes";
import sekFakultasRoutes from "./sekretarisRoutes";
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

const userJSON = localStorage.getItem("user");
const user = userJSON ? JSON.parse(userJSON) : null;

const isDekan = () => {
  return (
    user && user.role && (user.role === "DEKAN" || user.role.includes("DEKAN"))
  );
};

const isMahasiswa = () => {
  return (
    user &&
    user.role &&
    (user.role === "MAHASISWA" || user.role.includes("MAHASISWA"))
  );
};

const isSekFakultas = () => {
  return (
    user &&
    user.role &&
    (user.role === "OPERATOR_FAKULTAS" ||
      user.role.includes("OPERATOR_FAKULTAS"))
  );
};

const isDosen = () => {
  return (
    user && user.role && (user.role === "DOSEN" || user.role.includes("DOSEN"))
  );
};

const isKaprodi = () => {
  return (
    user &&
    user.role &&
    (user.role === "KAPRODI" || user.role.includes("KAPRODI"))
  );
};

const routesForAuthenticatedOnly = [
  {
    path: "/",
    element: <Page component={Home} />,
  },
  {
    path: "/change-password",
    element: <Page component={ChangePassword} />,
  },
  ...(isMahasiswa() ? mahasiswaRoutes : []),
  ...(isDekan() ? dekanRoutes : []),
  ...operatorRoutes,
  ...(isDosen() ? dosenPembimbingRoutes : []),
  ...(isKaprodi() ? kepalaProgramStudiRoutes : []),
  ...(isSekFakultas() ? sekFakultasRoutes : []),
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
