import React from "react";
import Home from "../pages/home";
import Page from "@jumbo/shared/Page";
import Login from "app/pages/Login";

/**
 routes which you want to make accessible to both authenticated and anonymous users
 **/
const routesForPublic = [
  {
    path: "/",
    element: <Page component={Home} />,
  },
  {
    path: "/login",
    element: <Page component={Login} layout={"bare-page"} />,
  },
];

/**
 routes only accessible to authenticated users
 **/
const routesForAuthenticatedOnly = [];

/**
 routes only accessible when user is anonymous
 **/
const routesForNotAuthenticatedOnly = [];

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
