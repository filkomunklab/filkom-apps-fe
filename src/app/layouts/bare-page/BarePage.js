import React from "react";
import useJumboLayout from "@jumbo/hooks/useJumboLayout";
import layoutConfig from "./layoutConfig";
import Div from "@jumbo/shared/Div";

const BarePage = ({ children }) => {
  const { setJumboLayoutOptions } = useJumboLayout();

  React.useEffect(() => {
    setJumboLayoutOptions(layoutConfig);
  }, []);

  return (
    <Div style={{ backgroundColor: "white", width: "100%" }}>{children}</Div>
  );
};

export default BarePage;
