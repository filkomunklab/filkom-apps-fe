import React from "react";
import NotificationsDropdown from "../../../../shared/NotificationsDropdown";
import SearchGlobal from "../../../../shared/SearchGlobal";
import { Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { ASSET_IMAGES } from "app/utils/constants/paths";

const Header = () => {
  return (
    <React.Fragment>
      <Div
        sx={{
          // backgroundColor: mainTheme.palette.primary.main,
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Div
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <img
            src={`${ASSET_IMAGES}/img-logo-short-white.png`}
            style={{
              objectFit: "contain",
              objectPosition: "left",
              display: "flex",
              flex: 1,
              height: "50px",
            }}
          />
          <Typography sx={{ color: "white" }} variant="h2">
            Fakultas Ilmu Komputer
          </Typography>
        </Div>

        <Div sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <NotificationsDropdown />
          <SearchGlobal sx={{ maxWidth: { xs: 240, md: 320 } }} />
        </Div>
      </Div>
    </React.Fragment>
  );
};

export default Header;
