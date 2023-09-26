import React, { Suspense } from "react";
import { Avatar, Typography } from "@mui/material";
import menus from "./menus";
import JumboVerticalNavbar from "@jumbo/components/JumboVerticalNavbar/JumboVerticalNavbar";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import useJumboSidebarTheme from "@jumbo/hooks/useJumboSidebarTheme";
import { SIDEBAR_VIEWS } from "@jumbo/utils/constants/layout";
import Div from "@jumbo/shared/Div";
import SidebarSkeleton from "./SidebarSkeleton";
import { authUser } from "app/shared/widgets/AuthUserDropdown/fake-db";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import JumboNavSection from "@jumbo/components/JumboVerticalNavbar/JumboNavSection";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  return (
    <React.Fragment>
      <SidebarHeader />
      <JumboScrollbar autoHide autoHideDuration={200} autoHideTimeout={500}>
        <Suspense
          fallback={
            <Div
              sx={{
                display: "flex",
                minWidth: 0,
                alignItems: "center",
                alignContent: "center",
                px: 3,
              }}
            >
              <SidebarSkeleton />
            </Div>
          }
        >
          <JumboVerticalNavbar translate items={menus} />
        </Suspense>
        <Div
          sx={{
            borderTop: "1px solid",
            borderTopColor: "divider",
          }}
        >
          <SidebarFooter />
        </Div>
      </JumboScrollbar>
    </React.Fragment>
  );
};

const SidebarHeader = () => {
  // const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();
  // const { sidebarTheme } = useJumboSidebarTheme();

  // const isMiniAndClosed = React.useMemo(() => {
  //   return sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;
  // }, [sidebarOptions.view, sidebarOptions.open]);

  return (
    <React.Fragment>
      <Div
        sx={{
          px: "16px",
          pt: "40px",
          pb: "24px",
          borderBottom: "1px solid",
          borderBottomColor: "divider",
          display: "flex",
          gap: "16px",
        }}
      >
        <Avatar
          //   src={authUser.profile_pic}
          alt={authUser.name}
          sx={{ width: 48, height: 48 }}
        />
        <Div>
          <Typography variant={"h5"}>{`Darell Yuhu`}</Typography>
          <Typography variant={""} color="text.secondary">
            Mahasiswa Ganteng :v
          </Typography>
        </Div>
      </Div>
    </React.Fragment>
  );
};

const SidebarFooter = () => {
  const { setAuthToken } = useJumboAuth();
  const navigate = useNavigate();
  const footer = {
    label: "Settings",
    type: "section",
    children: [
      {
        uri: "/change-password",
        label: "Change Password",
        type: "nav-item",
        icon: <VpnKeyIcon sx={{ fontSize: 20 }} />,
      },
      {
        onClick: () => {
          localStorage.clear();
          setAuthToken(null);
          navigate("/login");
        },
        label: "Logout",
        type: "nav-item",
        color: "error.main",
        icon: <ExitToAppIcon sx={{ fontSize: 20, color: "error.main" }} />,
      },
    ],
  };
  return (
    <React.Fragment>
      <Suspense
        fallback={
          <Div
            sx={{
              display: "flex",
              minWidth: 0,
              alignItems: "center",
              alignContent: "center",
              px: 3,
            }}
          >
            <SidebarSkeleton />
          </Div>
        }
      >
        <JumboNavSection translate item={footer} />
      </Suspense>
    </React.Fragment>
  );
};

export default Sidebar;
