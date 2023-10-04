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


// Menu Mahasiswa
const menus = [
  {
    label: "Sistem Informasi Skripsi",
    type: "section",
    children: [
      {
        label: "Pengajuan Skripsi",
        type: "nav-item",
        icon: <PersonIcon sx={{ fontSize: 20 }} />,
        uri: "/sistem-informasi-skripsi/daftar-pengajuan",
      },
    ],
  },
];

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

// // Menu Sekretaris
// const menus = [
//   {
//     label: "Sistem Informasi Skripsi",
//     type: "section",
//     children: [
//       {
//         label: "Pengajuan",
//         type: "collapsible",
//         icon: <MailIcon sx={{ fontSize: 20 }} />,
//         children: [
//           {
//             uri: "/sistem-informasi-skripsi/daftar-pengajuan-proposal",
//             label: "Pengajuan Proposal",
//             type: "nav-item",
//             icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
//           },
//           {
//             uri: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi",
//             label: "Pengajuan Skripsi",
//             type: "nav-item",
//             icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
//           },
//         ]
//       },
//       {
//         uri: "/sistem-informasi-skripsi/manajemen-jadwal",
//         label: "Kelola Jadwal",
//         type: "nav-item",
//         icon: <ScheduleTwoToneIcon sx={{ fontSize: 20 }} />,
//         children: [
//           {
//             uri: "/sistem-informasi-skripsi/jadwal-proposal",
//             label: "Jadwal Proposal",
//             type: "nav-item",
//             icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
//           },
//           {
//             uri: "/sistem-informasi-skripsi/jadwal-proposal",
//             label: "Jadwal Skripsi",
//             type: "nav-item",
//             icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
//           },
//         ]
//       },
//       {
//         uri: "/sistem-informasi-skripsi/manajamen-dosen-skripsi",
//         label: "Dosen Skripsi",
//         type: "nav-item",
//         icon: <PersonIcon sx={{ fontSize: 20 }} />,
//       },
//       {
//         uri: "/sistem-informasi-skripsi/manajamen-dosen",
//         label: "Dosen",
//         type: "nav-item",
//         icon: <PersonIcon sx={{ fontSize: 20 }} />,
//       },
//     ],
//   },
// ];

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