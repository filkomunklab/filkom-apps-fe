import React, { Suspense } from "react";
import { Avatar, Typography } from "@mui/material";
import JumboVerticalNavbar from "@jumbo/components/JumboVerticalNavbar/JumboVerticalNavbar";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import Div from "@jumbo/shared/Div";
import SidebarSkeleton from "./SidebarSkeleton";
import { authUser } from "app/shared/widgets/AuthUserDropdown/fake-db";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import JumboNavSection from "@jumbo/components/JumboVerticalNavbar/JumboNavSection";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import { useNavigate } from "react-router-dom";
import { ROLES } from "app/utils/constants/roles";
import { dekanMenus, dosenMenus, kaprodiMenus, mahasiswaMenus } from "./menus";

const roleCheck = () => {
  const roles = JSON.parse(localStorage.getItem("user"))?.role;

  const role =
    typeof roles === "string" ? roles : roles?.length > 0 ? roles[0] : null;
  console.log(role);
  switch (role) {
    case ROLES.MAHASISWA:
      return mahasiswaMenus;
    case ROLES.DOSEN:
      return dosenMenus;
    case ROLES.DEKAN:
      return dekanMenus;
    case ROLES.KAPRODI:
      return kaprodiMenus;
    default:
      return [];
  }
};

const Sidebar = () => {
  const [validatedMenus, setValidatedMenus] = React.useState([]);

  React.useEffect(() => {
    const menus = roleCheck();
    setValidatedMenus(menus);
  }, []);

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
          <JumboVerticalNavbar translate items={validatedMenus} />
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
