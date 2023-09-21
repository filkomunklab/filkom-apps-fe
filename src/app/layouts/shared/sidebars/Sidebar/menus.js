import React from "react";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LockResetIcon from "@mui/icons-material/LockReset";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import NewspaperIcon from "@mui/icons-material/Newspaper";

const menus = [
  {
    label: "sidebar.menu.home",
    type: "section",
    children: [
      {
        uri: "/dashboards/misc",
        label: "sidebar.menuItem.misc",
        type: "nav-item",
        icon: <GraphicEqIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboards/crypto",
        label: "sidebar.menuItem.crypto",
        type: "nav-item",
        icon: <CurrencyExchangeOutlinedIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboards/listing",
        label: "sidebar.menuItem.listing",
        type: "nav-item",
        icon: <ListAltOutlinedIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboards/crm",
        label: "sidebar.menuItem.crm",
        type: "nav-item",
        icon: <SupportAgentOutlinedIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboards/intranet",
        label: "sidebar.menuItem.intranet",
        type: "nav-item",
        icon: <PieChartOutlineOutlinedIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboards/ecommerce",
        label: "sidebar.menuItem.eCommerce",
        type: "nav-item",
        icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/dashboards/news",
        label: "sidebar.menuItem.news",
        type: "nav-item",
        icon: <NewspaperIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
  {
    label: "sidebar.menu.extensions",
    type: "section",
    children: [
      {
        label: "sidebar.menu.editor",
        type: "collapsible",
        icon: <ModeEditOutlinedIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            uri: "/extensions/editors/ck",
            label: "sidebar.menuItem.ckEditor",
            type: "nav-item",
          },
          {
            uri: "/extensions/editors/wysiwyg",
            label: "sidebar.menuItem.wysiwygEditor",
            type: "nav-item",
          },
        ],
      },
      {
        uri: "/extensions/dnd",
        label: "sidebar.menuItem.dnd",
        type: "nav-item",
        icon: <DragIndicatorIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/extensions/dropzone",
        label: "sidebar.menuItem.dropzone",
        type: "nav-item",
        icon: <BackupOutlinedIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/extensions/sweet-alert",
        label: "sidebar.menuItem.sweetAlerts",
        type: "nav-item",
        icon: <WarningAmberIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
  {
    label: "sidebar.menu.modules",
    type: "section",
    children: [
      {
        label: "sidebar.menu.calendar",
        type: "collapsible",
        icon: <EventNoteIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            uri: "/modules/calendars/basic",
            label: "sidebar.menuItem.basic",
            type: "nav-item",
          },
          {
            uri: "/modules/calendars/culture",
            label: "sidebar.menuItem.cultures",
            type: "nav-item",
          },
          {
            uri: "/modules/calendars/popup",
            label: "sidebar.menuItem.popup",
            type: "nav-item",
          },
          {
            uri: "/modules/calendars/rendering",
            label: "sidebar.menuItem.rendering",
            type: "nav-item",
          },
          {
            uri: "/modules/calendars/selectable",
            label: "sidebar.menuItem.selectable",
            type: "nav-item",
          },
          {
            uri: "/modules/calendars/timeslot",
            label: "sidebar.menuItem.timeSlots",
            type: "nav-item",
          },
        ],
      },
      {
        label: "sidebar.menu.charts",
        type: "collapsible",
        icon: <InsertChartOutlinedIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            uri: "/modules/charts/line",
            label: "sidebar.menuItem.line",
            type: "nav-item",
          },
          {
            uri: "/modules/charts/bar",
            label: "sidebar.menuItem.bar",
            type: "nav-item",
          },
          {
            uri: "/modules/charts/area",
            label: "sidebar.menuItem.area",
            type: "nav-item",
          },
          {
            uri: "/modules/charts/composed",
            label: "sidebar.menuItem.composed",
            type: "nav-item",
          },
          {
            uri: "/modules/charts/pie",
            label: "sidebar.menuItem.pie",
            type: "nav-item",
          },
          {
            uri: "/modules/charts/scatter",
            label: "sidebar.menuItem.scatter",
            type: "nav-item",
          },
          {
            uri: "/modules/charts/radial",
            label: "sidebar.menuItem.radial",
            type: "nav-item",
          },
          {
            uri: "/modules/charts/radar",
            label: "sidebar.menuItem.radar",
            type: "nav-item",
          },
          {
            uri: "/modules/charts/treemap",
            label: "sidebar.menuItem.treeMap",
            type: "nav-item",
          },
        ],
      },
      {
        label: "sidebar.menu.maps",
        type: "collapsible",
        icon: <MyLocationIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            uri: "/modules/maps/simple",
            label: "sidebar.menuItem.simpleMap",
            type: "nav-item",
          },
          {
            uri: "/modules/maps/styled",
            label: "sidebar.menuItem.styledMap",
            type: "nav-item",
          },
          {
            uri: "/modules/maps/geo-location",
            label: "sidebar.menuItem.geoLocation",
            type: "nav-item",
          },
          {
            uri: "/modules/maps/directions",
            label: "sidebar.menuItem.directional",
            type: "nav-item",
          },
          {
            uri: "/modules/maps/overlay",
            label: "sidebar.menuItem.overlay",
            type: "nav-item",
          },
          {
            uri: "/modules/maps/kml",
            label: "sidebar.menuItem.kmLayer",
            type: "nav-item",
          },
          {
            uri: "/modules/maps/popup-info",
            label: "sidebar.menuItem.popupInfo",
            type: "nav-item",
          },
          {
            uri: "/modules/maps/street-view",
            label: "sidebar.menuItem.streetView",
            type: "nav-item",
          },
          {
            uri: "/modules/maps/drawing",
            label: "sidebar.menuItem.drawing",
            type: "nav-item",
          },
          {
            uri: "/modules/maps/clustering",
            label: "sidebar.menuItem.clustering",
            type: "nav-item",
          },
        ],
      },
    ],
  },
  {
    label: "sidebar.menu.authPages",
    type: "section",
    children: [
      {
        label: "sidebar.menu.login",
        type: "collapsible",
        icon: <LoginIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            uri: "/auth-pages/login-1",
            label: "sidebar.menuItem.login1",
            type: "nav-item",
            target: "_blank",
          },
          {
            uri: "/auth-pages/login-2",
            label: "sidebar.menuItem.login2",
            type: "nav-item",
            target: "_blank",
          },
        ],
      },
      {
        label: "sidebar.menu.signup",
        type: "collapsible",
        icon: <PersonAddAltIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            uri: "/auth-pages/signup-1",
            label: "sidebar.menuItem.signup1",
            type: "nav-item",
            target: "_blank",
          },
          {
            uri: "/auth-pages/signup-2",
            label: "sidebar.menuItem.signup2",
            type: "nav-item",
            target: "_blank",
          },
        ],
      },
      {
        uri: "/auth-pages/forgot-password",
        label: "sidebar.menuItem.forgetPassword",
        type: "nav-item",
        icon: <PasswordOutlinedIcon sx={{ fontSize: 20 }} />,
        target: "_blank",
      },
      {
        uri: "/auth-pages/reset-password",
        label: "sidebar.menuItem.resetPassword",
        type: "nav-item",
        icon: <LockResetIcon sx={{ fontSize: 20 }} />,
        target: "_blank",
      },
    ],
  },
];

export default menus;
