import React from "react";
import Home from "../pages/home";
import Page from "@jumbo/shared/Page";
import Login from "app/pages/Login";
import mahasiswaRoutes from "./mahasiswaRoutes";
import NotFound from "../pages/404";
import Unauthorized from "app/pages/unauthorized";
import operatorRoutes from "./operatorRoutes";
import dosenRoutes from "./dosenRoutes";
import sekertarisRoutes from "./sekertarisRoutes";
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
  ...dosenRoutes,
  ...sekertarisRoutes,
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
