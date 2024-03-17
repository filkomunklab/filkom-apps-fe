import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Link from "@mui/material/Link";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItemIcon } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import { SIDEBAR_VIEWS } from "@jumbo/utils/constants/layout";
import { useTranslation } from "react-i18next";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const menuBefore = {
  left: 0,
  top: 0,
  content: `''`,
  position: "absolute",
  display: "inline-block",
  width: "4px",
  height: "100%",
  backgroundColor: "transparent",
};

const JumboNavItem = ({ item, isNested, translate }) => {
  const location = useLocation();
  const { sidebarOptions } = useJumboLayoutSidebar();
  const { t } = useTranslation();

  const isMiniAndClosed = React.useMemo(() => {
    return sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;
  }, [sidebarOptions.view, sidebarOptions.open]);

  const label = React.useMemo(() => {
    return translate ? t(item.label) : item.label;
  }, [item, translate, t]);

  if (!item) return null;

  const textColor = item.color ? item.color : undefined;

  return (
    <ListItemButton
      onClick={item.onClick && item.onClick}
      component={"li"}
      sx={{
        p: 0,
        overflow: "hidden",
        borderRadius: isMiniAndClosed ? "50%" : "0 24px 24px 0",
        margin: isMiniAndClosed ? "0 auto" : "0",
        ...(isMiniAndClosed
          ? { width: 40, height: 40, justifyContent: "center" }
          : {}),
        ...(!isMiniAndClosed ? { "&::before": menuBefore } : {}),
        "&:hover": {
          color: (theme) => theme.palette.primary.light,
          backgroundColor: (theme) => theme.palette.nav.background.hover,
          ...(!isMiniAndClosed
            ? {
                "&::before": {
                  ...menuBefore,
                  backgroundColor: (theme) => theme.palette.nav.tick.hover,
                },
              }
            : {}),
        },
        ...(location.pathname === item.uri ||
        location.pathname.includes(item.uri)
          ? {
              color: (theme) => theme.palette.primary.main,
              backgroundColor: (theme) => theme.palette.primary.lowContrast,
              ...(!isMiniAndClosed
                ? {
                    "&::before": {
                      ...menuBefore,
                      backgroundColor: (theme) => theme.palette.primary.main,
                    },
                  }
                : {}),
            }
          : {}),
      }}
    >
      <Link
        underline={"none"}
        component={RouterLink}
        to={item.uri}
        {...(item.target ? { target: item.target } : {})}
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
          color: "inherit",
          p: (theme) => (!isMiniAndClosed ? theme.spacing(1, 3.75) : 0),
          ...(isMiniAndClosed ? { justifyContent: "center" } : {}),
        }}
      >
        <ListItemIcon
          sx={{ minWidth: isMiniAndClosed ? 20 : 32, color: "inherit" }}
        >
          {isNested ? (
            <KeyboardArrowRightIcon sx={{ fontSize: 16, ml: 1 }} />
          ) : (
            item.icon
          )}
        </ListItemIcon>
        {!isMiniAndClosed && (
          <ListItemText
            primary={label}
            sx={{
              color: textColor,
              m: 0,
              "& .MuiTypography-root": {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            }}
          />
        )}
      </Link>
    </ListItemButton>
  );
};

export default JumboNavItem;
