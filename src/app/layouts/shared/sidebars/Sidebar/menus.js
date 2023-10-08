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
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { EmailOutlined } from "@mui/icons-material";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import MailIcon from "@mui/icons-material/Mail";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

import ScheduleTwoToneIcon from "@mui/icons-material/ScheduleTwoTone";

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
// const menus = [
//   {
//     label: "Klabat Bridge",
//     type: "section",
//     children: [
//       {
//         label: "Dafter Alumni",
//         type: "nav-item",
//         icon: <PeopleIcon sx={{ fontSize: 20 }} />,
//         uri: "/klabat-bridge/daftar-alumni",
//       },
//       {
//         label: "Grafik Alumni",
//         type: "nav-item",
//         icon: <PublicIcon sx={{ fontSize: 20 }} />,
//         uri: "/klabat-bridge/grafik-alumni",
//       },
//     ],
//   },
//   {
//     label: "Bimbingan Akademik",
//     type: "section",
//     children: [
//       {
//         label: "Panduan Kurikulum",
//         type: "nav-item",
//         icon: <AccountBalanceIcon sx={{ fontSize: 20 }} />,
//         uri: "/bimbingan-akademik/panduan-kurikulum",
//       },
//       {
//         label: "Grafik Alumni",
//         type: "nav-item",
//         icon: <PublicIcon sx={{ fontSize: 20 }} />,
//         uri: "/klabat-bridge/grafik-alumni",
//       },
//     ],
//   },
// ];

// Mahasiswa Menu System Informasi Skripsi
// // Menu Mahasiswa
// const menus = [
//   {
//     label: "Sistem Informasi Skripsi",
//     type: "section",
//     children: [
//       {
//         label: "Pengajuan Skripsi",
//         type: "nav-item",
//         icon: <PersonIcon sx={{ fontSize: 20 }} />,
//         uri: "/sistem-informasi-skripsi/daftar-pengajuan",
//       },
//     ],
//   },
// ];

// // Menu Dosen
// const menus = [
//   {
//     label: "Sistem Informasi Skripsi",
//     type: "section",
//     children: [
//       {
//         uri: "/sistem-informasi-skripsi/komite-judul-dosen",
//         label: "Komite Judul",
//         type: "nav-item",
//         icon: <AttachEmailIcon sx={{ fontSize: 20 }} />,
//       },
//       {
//         label: "Pengajuan",
//         type: "collapsible",
//         icon: <MailIcon sx={{ fontSize: 20 }} />,
//         children: [
//           {
//             uri: "/sistem-informasi-skripsi/pengajuan-judul-dosen-skripsi",
//             label: "Pengajuan Judul",
//             type: "nav-item",
//             icon: <AttachEmailIcon sx={{ fontSize: 20 }} />,
//           },
//           {
//             uri: "/sistem-informasi-skripsi/pengajuan-proposal-dosen-skripsi",
//             label: "Pengajuan Proposal",
//             type: "nav-item",
//             icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
//           },
//           {
//             uri: "/sistem-informasi-skripsi/pengajuan-skripsi-dosen-skripsi",
//             label: "Pengajuan Skripsi",
//             type: "nav-item",
//             icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
//           },
//         ],
//       },
//       {
//         uri: "/sistem-informasi-skripsi/manajemen-kelas-dosen-skripsi",
//         label: "Manajemen Kelas",
//         type: "nav-item",
//         icon: <CollectionsBookmarkIcon sx={{ fontSize: 20 }} />,
//       },
//       {
//         label: "Bimbingan",
//         type: "collapsible",
//         icon: <MailIcon sx={{ fontSize: 20 }} />,
//         children: [
//           {
//             uri: "/sistem-informasi-skripsi/bimbingan-proposal-advisor",
//             label: "BProp Adv",
//             type: "nav-item",
//             icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
//           },
//           {
//             uri: "/sistem-informasi-skripsi/bimbingan-proposal-co-advisor",
//             label: "BProp Co-Adv",
//             type: "nav-item",
//             icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
//           },
//           {
//             uri: "/sistem-informasi-skripsi/bimbingan-skripsi-advisor",
//             label: "BSkrip Adv",
//             type: "nav-item",
//             icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
//           },
//           {
//             uri: "/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor",
//             label: "BSkrip Co-Adv",
//             type: "nav-item",
//             icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
//           },
//           {
//             uri: "/sistem-informasi-skripsi/riwayat-bimbingan-advisor",
//             label: "RBimb Adv",
//             type: "nav-item",
//             icon: <SchoolIcon sx={{ fontSize: 20 }} />,
//           },
//           {
//             uri: "/sistem-informasi-skripsi/riwayat-bimbingan-co-advisor",
//             label: "RBimb Co-Adv",
//             type: "nav-item",
//             icon: <SchoolIcon sx={{ fontSize: 20 }} />,
//           },
//         ],
//       },
//       {
//         label: "Pengujian",
//         type: "collapsible",
//         icon: <MailIcon sx={{ fontSize: 20 }} />,
//         children: [
//           {
//             uri: "/sistem-informasi-skripsi/uji-proposal-ketua",
//             label: "Uji Proposal Ketua",
//             type: "nav-item",
//             icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
//           },
//           {
//             uri: "/sistem-informasi-skripsi/uji-proposal-anggota",
//             label: "Uji Proposal Anggota",
//             type: "nav-item",
//             icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
//           },
//           {
//             uri: "/sistem-informasi-skripsi/uji-skripsi-ketua",
//             label: "Uji Skripsi Ketua",
//             type: "nav-item",
//             icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
//           },
//           {
//             uri: "/sistem-informasi-skripsi/uji-skripsi-anggota",
//             label: "Uji Skripsi Anggota",
//             type: "nav-item",
//             icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
//           },
//           {
//             uri: "/sistem-informasi-skripsi/riwayat-uji-ketua",
//             label: "Riwayat Uji Ketua",
//             type: "nav-item",
//             icon: <SchoolIcon sx={{ fontSize: 20 }} />,
//           },
//           {
//             uri: "/sistem-informasi-skripsi/riwayat-uji-anggota",
//             label: "Riwayat Uji Anggota",
//             type: "nav-item",
//             icon: <SchoolIcon sx={{ fontSize: 20 }} />,
//           },
//         ],
//       },
//     ],
//   },
// ];

// Menu Sekretaris
const menus = [
  {
    label: "Sistem Informasi Skripsi",
    type: "section",
    children: [
      {
        label: "Pengajuan",
        type: "collapsible",
        icon: <MailIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            uri: "/sistem-informasi-skripsi/daftar-pengajuan-proposal",
            label: "Pengajuan Proposal",
            type: "nav-item",
            icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
          },
          {
            uri: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi",
            label: "Pengajuan Skripsi",
            type: "nav-item",
            icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
          },
        ],
      },
      {
        uri: "/sistem-informasi-skripsi/manajemen-jadwal",
        label: "Kelola Jadwal",
        type: "nav-item",
        icon: <ScheduleTwoToneIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            uri: "/sistem-informasi-skripsi/jadwal-proposal",
            label: "Jadwal Proposal",
            type: "nav-item",
            icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
          },
          {
            uri: "/sistem-informasi-skripsi/jadwal-proposal",
            label: "Jadwal Skripsi",
            type: "nav-item",
            icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
          },
        ],
      },
      {
        uri: "/sistem-informasi-skripsi/manajamen-dosen-skripsi",
        label: "Dosen Skripsi",
        type: "nav-item",
        icon: <PersonIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/sistem-informasi-skripsi/manajamen-dosen",
        label: "Dosen",
        type: "nav-item",
        icon: <PersonIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
];

// // Menu Kaprpodi
// const menus = [
//   {
//     label: "Sistem Informasi Skripsi",
//     type: "section",
//     children: [
//       {
//         uri: "/sistem-informasi-skripsi/pengajuan-judul-kaprodi",
//         label: "Pengajuan Judul",
//         type: "nav-item",
//         icon: <AttachEmailIcon sx={{ fontSize: 20 }} />,
//       },
//       {
//         uri: "/sistem-informasi-skripsi/pengajuan-proposal-kaprodi",
//         label: "Pengajuan Proposal",
//         type: "nav-item",
//         icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
//       },
//       {
//         uri: "/sistem-informasi-skripsi/pengajuan-skripsi-kaprodi",
//         label: "Pengajuan Skripsi",
//         type: "nav-item",
//         icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
//       },
//       {
//         uri: "/sistem-informasi-skripsi/riwayat-kaprodi",
//         label: "Riwayat",
//         type: "nav-item",
//         icon: <SchoolIcon sx={{ fontSize: 20 }} />,
//       },
//     ],
//   },
// ];

// // Menu Dekan
// const menus = [
//   {
//     label: "Sistem Informasi Skripsi",
//     type: "section",
//     children: [
//       {
//         uri: "/sistem-informasi-skripsi/pengajuan-judul-kaprodi",
//         label: "Pengajuan Judul",
//         type: "nav-item",
//         icon: <AttachEmailIcon sx={{ fontSize: 20 }} />,
//       },
//       {
//         uri: "/sistem-informasi-skripsi/pengajuan-proposal-kaprodi",
//         label: "Pengajuan Proposal",
//         type: "nav-item",
//         icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
//       },
//       {
//         uri: "/sistem-informasi-skripsi/pengajuan-skripsi-kaprodi",
//         label: "Pengajuan Skripsi",
//         type: "nav-item",
//         icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
//       },
//       {
//         uri: "/sistem-informasi-skripsi/riwayat-kaprodi",
//         label: "Riwayat",
//         type: "nav-item",
//         icon: <SchoolIcon sx={{ fontSize: 20 }} />,
//       },
//     ],
//   },
// ];

export default menus;
