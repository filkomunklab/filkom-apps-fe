import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LockResetIcon from "@mui/icons-material/LockReset";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GroupsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import PersonIcon from "@mui/icons-material/Person";

// Student Menu
// const menus = [
//   {
//     label: "Klabat Bridge",
//     type: "section",
//     children: [
//       {
//         uri: "/klabat-bridge/pengisian-spt",
//         label: "Pengisian SPT",
//         type: "nav-item",
//         icon: <InsertCommentIcon sx={{ fontSize: 20 }} />,
//       },
//     ],
//   },
//   {
//     label: "Bimbingan Akademik",
//     type: "section",
//     children: [
//       // {
//       //   label: "sidebar.menu.editor",
//       //   type: "collapsible",
//       //   icon: <ModeEditOutlinedIcon sx={{ fontSize: 20 }} />,
//       //   children: [
//       //     {
//       //       uri: "/extensions/editors/ck",
//       //       label: "sidebar.menuItem.ckEditor",
//       //       type: "nav-item",
//       //     },
//       //     {
//       //       uri: "/extensions/editors/wysiwyg",
//       //       label: "sidebar.menuItem.wysiwygEditor",
//       //       type: "nav-item",
//       //     },
//       //   ],
//       // },
//       {
//         uri: "/bimbingan-akademik/panduan-akademik",
//         label: "Panduan Akademik",
//         type: "nav-item",
//         icon: <AccountBalanceIcon sx={{ fontSize: 20 }} />,
//       },
//       {
//         uri: "/bimbingan-akademik/kuikulum",
//         label: "Kurikulum",
//         type: "nav-item",
//         icon: <ImportContactsIcon sx={{ fontSize: 20 }} />,
//       },
//       {
//         uri: "/bimbingan-akademik/nilai",
//         label: "Nilai",
//         type: "nav-item",
//         icon: <SchoolIcon sx={{ fontSize: 20 }} />,
//       },
//       {
//         uri: "/bimbingan-akademik/sertifikat",
//         label: "Sertifikat",
//         type: "nav-item",
//         icon: <AssignmentIcon sx={{ fontSize: 20 }} />,
//       },
//       {
//         uri: "/bimbingan-akademik/riwayat-kegiatan",
//         label: "Riwayat Kegiatan",
//         type: "nav-item",
//         icon: <FileCopyIcon sx={{ fontSize: 20 }} />,
//       },
//       {
//         uri: "/bimbingan-akademik/pemasukan-nilai",
//         label: "Pemasukan Nilai",
//         type: "nav-item",
//         icon: <LibraryAddIcon sx={{ fontSize: 20 }} />,
//       },
//       {
//         uri: "/bimbingan-akademik/preregis-mata-kuliah",
//         label: "Preregis Mata Kuliah",
//         type: "nav-item",
//         icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
//       },
//       {
//         uri: "/bimbingan-akademik/buat-janji",
//         label: "Buat Janji",
//         type: "nav-item",
//         icon: <PermContactCalendarIcon sx={{ fontSize: 20 }} />,
//       },
//     ],
//   },
//   {
//     label: "Skripsi",
//     type: "section",
//     children: [
//       // {
//       //   label: "sidebar.menu.login",
//       //   type: "collapsible",
//       //   icon: <LoginIcon sx={{ fontSize: 20 }} />,
//       //   children: [
//       //     {
//       //       uri: "/auth-pages/login-1",
//       //       label: "sidebar.menuItem.login1",
//       //       type: "nav-item",
//       //       target: "_blank",
//       //     },
//       //     {
//       //       uri: "/auth-pages/login-2",
//       //       label: "sidebar.menuItem.login2",
//       //       type: "nav-item",
//       //       target: "_blank",
//       //     },
//       //   ],
//       // },
//       // {
//       //   label: "sidebar.menu.signup",
//       //   type: "collapsible",
//       //   icon: <PersonAddAltIcon sx={{ fontSize: 20 }} />,
//       //   children: [
//       //     {
//       //       uri: "/auth-pages/signup-1",
//       //       label: "sidebar.menuItem.signup1",
//       //       type: "nav-item",
//       //       target: "_blank",
//       //     },
//       //     {
//       //       uri: "/auth-pages/signup-2",
//       //       label: "sidebar.menuItem.signup2",
//       //       type: "nav-item",
//       //       target: "_blank",
//       //     },
//       //   ],
//       // },
//       {
//         uri: "/skripsi/forgot-password",
//         label: "sidebar.menuItem.forgetPassword",
//         type: "nav-item",
//         icon: <PasswordOutlinedIcon sx={{ fontSize: 20 }} />,
//         target: "_blank",
//       },
//       {
//         uri: "/skripsi/reset-password",
//         label: "sidebar.menuItem.resetPassword",
//         type: "nav-item",
//         icon: <LockResetIcon sx={{ fontSize: 20 }} />,
//         target: "_blank",
//       },
//     ],
//   },
//   // {
//   //   label: "Skripsi",
//   //   type: "section",
//   //   children: [
//   //     {
//   //       label: "sidebar.menu.calendar",
//   //       type: "collapsible",
//   //       icon: <EventNoteIcon sx={{ fontSize: 20 }} />,
//   //       children: [
//   //         {
//   //           uri: "/modules/calendars/basic",
//   //           label: "sidebar.menuItem.basic",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/calendars/culture",
//   //           label: "sidebar.menuItem.cultures",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/calendars/popup",
//   //           label: "sidebar.menuItem.popup",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/calendars/rendering",
//   //           label: "sidebar.menuItem.rendering",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/calendars/selectable",
//   //           label: "sidebar.menuItem.selectable",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/calendars/timeslot",
//   //           label: "sidebar.menuItem.timeSlots",
//   //           type: "nav-item",
//   //         },
//   //       ],
//   //     },
//   //     {
//   //       label: "sidebar.menu.charts",
//   //       type: "collapsible",
//   //       icon: <InsertChartOutlinedIcon sx={{ fontSize: 20 }} />,
//   //       children: [
//   //         {
//   //           uri: "/modules/charts/line",
//   //           label: "sidebar.menuItem.line",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/charts/bar",
//   //           label: "sidebar.menuItem.bar",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/charts/area",
//   //           label: "sidebar.menuItem.area",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/charts/composed",
//   //           label: "sidebar.menuItem.composed",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/charts/pie",
//   //           label: "sidebar.menuItem.pie",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/charts/scatter",
//   //           label: "sidebar.menuItem.scatter",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/charts/radial",
//   //           label: "sidebar.menuItem.radial",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/charts/radar",
//   //           label: "sidebar.menuItem.radar",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/charts/treemap",
//   //           label: "sidebar.menuItem.treeMap",
//   //           type: "nav-item",
//   //         },
//   //       ],
//   //     },
//   //     {
//   //       label: "sidebar.menu.maps",
//   //       type: "collapsible",
//   //       icon: <MyLocationIcon sx={{ fontSize: 20 }} />,
//   //       children: [
//   //         {
//   //           uri: "/modules/maps/simple",
//   //           label: "sidebar.menuItem.simpleMap",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/maps/styled",
//   //           label: "sidebar.menuItem.styledMap",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/maps/geo-location",
//   //           label: "sidebar.menuItem.geoLocation",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/maps/directions",
//   //           label: "sidebar.menuItem.directional",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/maps/overlay",
//   //           label: "sidebar.menuItem.overlay",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/maps/kml",
//   //           label: "sidebar.menuItem.kmLayer",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/maps/popup-info",
//   //           label: "sidebar.menuItem.popupInfo",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/maps/street-view",
//   //           label: "sidebar.menuItem.streetView",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/maps/drawing",
//   //           label: "sidebar.menuItem.drawing",
//   //           type: "nav-item",
//   //         },
//   //         {
//   //           uri: "/modules/maps/clustering",
//   //           label: "sidebar.menuItem.clustering",
//   //           type: "nav-item",
//   //         },
//   //       ],
//   //     },
//   //   ],
//   // },
// ];
// Alumni
const menus = [
  {
    label: "Klabat Bridge",
    type: "section",
    children: [
      {
        label: "Dashboard",
        type: "nav-item",
        icon: <DashboardIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/dashboard",
      },
      {
        label: "Dafter Alumni",
        type: "nav-item",
        icon: <PeopleIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/daftar-alumni",
      },
      {
        label: "Grafik Alumni",
        type: "nav-item",
        icon: <PublicIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/grafik-alumni",
      },
      {
        label: "Form Tracer Study",
        type: "nav-item",
        icon: <InsertDriveFileIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/form-tracer-study",
      },
      {
        label: "Pengisian SPT",
        type: "nav-item",
        icon: <FormatListBulletedIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/pengisian-spt",
      },
      {
        label: "View Detail Student",
        type: "nav-item",
        icon: <AccountBoxIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/view-detail-student",
      },
      {
        label: "Daftar Calon Tamatan",
        type: "nav-item",
        icon: <GroupsIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/daftar-calon-tamatan",
      },
      {
        label: "Daftar Calon Tamatan Fakultas",
        type: "nav-item",
        icon: <GroupsIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/daftar-calon-tamatan-fakultas",
      },
      {
        label: "Home (Alumni)",
        type: "nav-item",
        icon: <HomeIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/home-alumni",
      },
      {
        label: "Home (Calon Tamatan)",
        type: "nav-item",
        icon: <HomeIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/home-calon-tamatan",
      },
      // {
      //   label: "Pengisian Tracer Study",
      //   type: "nav-item",
      //   icon: <InsertDriveFileIcon sx={{ fontSize: 20 }} />,
      //   uri: "/klabat-bridge/pengisian-tracer-study",
      // },
    ],
  },
  {
    label: "Bimbingan Akademik",
    type: "section",
    children: [
      {
        label: "Academic Guide",
        type: "nav-item",
        icon: <AccountBalanceIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/academic-guide",
      },
      {
        label: "Vision Mission Goals",
        type: "nav-item",
        icon: <LocalLibraryIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/vision-mission-goals",
      },
      {
        label: "Curriculum",
        type: "nav-item",
        icon: <ImportContactsIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/curriculum",
      },
      {
        label: "Grades",
        type: "nav-item",
        icon: <SchoolIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/grades",
      },
      {
        label: "Certificates",
        type: "nav-item",
        icon: <AssignmentIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/certificates",
      },
      {
        label: "History",
        type: "nav-item",
        icon: <FileCopyIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/history",
      },
      {
        label: "Grade Submission",
        type: "nav-item",
        icon: <LibraryAddIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/grade-submission",
      },
      {
        label: "Pre-registration",
        type: "nav-item",
        icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/vision-mission-goals",
      },
      {
        label: "Consultation",
        type: "nav-item",
        icon: <PermContactCalendarIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/consultation",
      },
      {
        label: "Profile",
        type: "nav-item",
        icon: <PersonIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/profile",
      },
    ],
  },
];

export default menus;
