import React from "react";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
// import useJumboHeaderTheme from "@jumbo/hooks/useJumboHeaderTheme";
import NotificationsDropdown from "../../../../shared/NotificationsDropdown";
import SearchGlobal from "../../../../shared/SearchGlobal";
import { IconButton, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { ASSET_IMAGES } from "app/utils/constants/paths";
import { SIDEBAR_STYLES, SIDEBAR_VARIANTS } from "@jumbo/utils/constants";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
// import Logo from "app/shared/Logo";

const Header = () => {
  const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();
  // const [dropdownSearchVisibility, setDropdownSearchVisibility] =
  //   React.useState(false);
  // const { headerTheme } = useJumboHeaderTheme();

  // const showDropdownSearch = useMediaQuery("(max-width:575px)");
  return (
    <React.Fragment>
      {(sidebarOptions.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER ||
        sidebarOptions.variant === SIDEBAR_VARIANTS.TEMPORARY ||
        (sidebarOptions.variant === SIDEBAR_VARIANTS.PERSISTENT &&
          !sidebarOptions.open)) && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{
            ml:
              sidebarOptions.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER
                ? -2
                : 0,
            mr: 3,
          }}
          onClick={() => setSidebarOptions({ open: !sidebarOptions.open })}
        >
          {sidebarOptions?.open ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      )}
      {/* {sidebarOptions?.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER && (
        <Logo sx={{ mr: 3 }} mode={headerTheme.type ?? "light"} mini={true} />
      )} */}
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
          <SearchGlobal sx={{ maxWidth: { xs: 120, sm: 120, md: 320 } }} />
        </Div>
      </Div>
    </React.Fragment>
  );
};

export default Header;
