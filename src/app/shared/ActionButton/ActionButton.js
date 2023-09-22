import { Button } from "@mui/material";
import React from "react";

const ActionButton = (props) => {
  const { children } = props;
  const mainSx = {
    borderRadius: "60px",
    px: "28px",
    textTransform: "capitalize",
    ...props.customsx,
  };
  return (
    <Button sx={mainSx} {...props}>
      {children}
    </Button>
  );
};

export default ActionButton;
