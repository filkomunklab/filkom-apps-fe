import React, { Suspense, useEffect, useState } from "react";
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
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  adminMenus,
  dekanMenus,
  dosenMKMenus,
  dosenMenus,
  kaprodiMenus,
  mahasiswaMenus,
  mahasiswaMenusGraduate,
  operatorMenus,
  registerMenus,
  sekretarisMenus,
} from "./menus";
import { Rocket } from "@mui/icons-material";

const roleCheck = () => {
  const roles = JSON.parse(localStorage.getItem("user"))?.role;

  const role =
    typeof roles === "string" ? roles : roles?.length > 0 ? roles[0] : null;
  console.log(role);
  switch (role) {
    case ROLES.ADMIN:
      return adminMenus;
    case ROLES.MAHASISWA:
    case ROLES.ALUMNI:
      if (JSON.parse(localStorage.getItem("user")).status === "GRADUATE") {
        return mahasiswaMenusGraduate;
      }
      return mahasiswaMenus;
    case ROLES.DOSEN:
      if (roles.includes(ROLES.DEKAN)) {
        return dekanMenus;
      } else if (roles.includes(ROLES.KAPRODI)) {
        return kaprodiMenus;
      } else if (roles.includes(ROLES.DOSEN_MK)) {
        return dosenMKMenus;
      }
      return dosenMenus;
    case ROLES.DEKAN:
      return dekanMenus;
    case ROLES.KAPRODI:
      return kaprodiMenus;
    case ROLES.SEKRETARIS:
    case ROLES.OPERATOR_FAKULTAS:
      return sekretarisMenus;
    case ROLES.REGISTER:
      return registerMenus;
    case ROLES.OPERATOR_LPMI:
      return operatorMenus;
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
  const navigate = useNavigate();
  const [studentProfileData, setStudentProfileData] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { nim } = JSON.parse(localStorage.getItem("user"));
      const resultStudent = await jwtAuthAxios.get(
        `/student/view/biodata/${nim}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log("ini isi student", resultStudent);
      // console.log(resultStudent);
      setStudentProfileData(resultStudent.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  // const { sidebarOptions, setSidebarOptions } = useJumboLayoutSidebar();
  // const { sidebarTheme } = useJumboSidebarTheme();

  // const isMiniAndClosed = React.useMemo(() => {
  //   return sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;
  // }, [sidebarOptions.view, sidebarOptions.open]);
  const name = JSON.parse(localStorage.getItem("user"))?.name;
  const role = JSON.parse(localStorage.getItem("user"))?.role;

  console.log(role);

  const checkArrayRole = () =>
    role?.find(
      (role) =>
        role === ROLES.DEKAN ||
        role === ROLES.KAPRODI ||
        role === ROLES.OPERATOR_LPMI ||
        role === ROLES.OPERATOR_FAKULTAS
    )
      ? role?.find(
          (role) =>
            role === ROLES.DEKAN ||
            role === ROLES.KAPRODI ||
            role === ROLES.OPERATOR_LPMI ||
            role === ROLES.OPERATOR_FAKULTAS
        )
      : "DOSEN";

  const accessRole = typeof role === "string" ? role : checkArrayRole();

  const getProfilePath = (role) => {
    switch (role) {
      case ROLES.KAPRODI:
        return "kaprodi";
      case ROLES.DOSEN:
        return "dosen-pembimbing";
      case ROLES.DEKAN:
        return "dekan";
      case ROLES.OPERATOR_FAKULTAS:
      case ROLES.SEKRETARIS:
        return "sekretaris";
      default:
        return "unknown";
    }
  };

  const handleClick = () => {
    if (accessRole === ROLES.MAHASISWA) {
      navigate("/bimbingan-akademik/profile");
    } else {
      const profilePath = getProfilePath(accessRole);
      navigate(`/bimbingan-akademik/${profilePath}/profile`);
    }
  };

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
          ":hover": {
            cursor: "pointer",
          },
        }}
        onClick={handleClick}
      >
        <Avatar
          src={accessRole === "MAHASISWA" ? studentProfileData.path : undefined}
          alt={authUser.name}
          sx={{ width: 48, height: 48 }}
        />
        <Div>
          <Typography variant={"h5"}>{name}</Typography>
          <Typography variant={""} color="text.secondary">
            {accessRole}
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
      // {
      //   uri: "/change-password",
      //   label: "Change Password",
      //   type: "nav-item",
      //   icon: <VpnKeyIcon sx={{ fontSize: 20 }} />,
      // },
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
