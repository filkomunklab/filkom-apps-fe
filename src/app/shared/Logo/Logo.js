import React from "react";
import Div from "@jumbo/shared/Div";
import { ASSET_IMAGES } from "../../utils/constants/paths";

const Logo = ({ mini, mode, sx }) => {
  return (
    <Div sx={{ display: "inline-flex", ...sx }}>
      <>
        {!mini ? (
          <img
            src={
              mode === "light"
                ? `${ASSET_IMAGES}/logo.png`
                : `${ASSET_IMAGES}/logo-white.png`
            }
            alt="Jumbo React"
          />
        ) : (
          <img
            src={
              mode === "light"
                ? `${ASSET_IMAGES}/img-logo-short.png`
                : `${ASSET_IMAGES}/logo-short-white.png`
            }
            alt="Jumbo React"
          />
        )}
      </>
    </Div>
  );
};

Logo.defaultProps = {
  mode: "light",
};

export default Logo;
