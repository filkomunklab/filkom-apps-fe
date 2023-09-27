import { useLocation } from "react-router-dom";

const useRouteAccessMatch = async (routes) => {
  const location = useLocation();
  try {
    const tmp = routes.find((route) => route.path === location.pathname);

    return typeof tmp.permission === "function" ? tmp.permission() : true;
  } catch (error) {
    return true;
  }
};

export default useRouteAccessMatch;
