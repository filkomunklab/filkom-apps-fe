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
import GroupIcon from "@mui/icons-material/Group";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { EmailOutlined } from "@mui/icons-material";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import MailIcon from "@mui/icons-material/Mail";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import ScheduleIcon from "@mui/icons-material/Schedule";

export const sekretarisMenus = [
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
        label: "Manajemen Jadwal",
        type: "collapsible",
        icon: <ScheduleIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            uri: "/sistem-informasi-skripsi/jadwal-proposal",
            label: "Jadwal Proposal",
            type: "nav-item",
            icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
          },
          {
            uri: "/sistem-informasi-skripsi/jadwal-skripsi",
            label: "Jadwal Skripsi",
            type: "nav-item",
            icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
          },
        ],
      },
      {
        uri: "/sistem-informasi-skripsi/manajamen-dosen-skripsi",
        label: "Manajemen Dosen Skripsi",
        type: "nav-item",
        icon: <PersonIcon sx={{ fontSize: 20 }} />,
      },
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
        uri: "/bimbingan-akademik/sekDekan/academic-guide",
      },
      {
        label: "Vision Mission Goals",
        type: "nav-item",
        icon: <LocalLibraryIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/sekDekan/vision-mission-goals",
      },
      {
        label: "Curriculum",
        type: "nav-item",
        icon: <ImportContactsIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/sekDekan/curriculum",
      },
      {
        label: "Student Information",
        type: "collapsible",
        icon: <SchoolIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/sekDekan/student-information-faculty",
      },
      {
        label: "Supervisor Information",
        type: "nav-item",
        icon: <GroupIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/sekDekan/supervisor-information",
      },
      {
        label: "Profile",
        type: "nav-item",
        icon: <PermContactCalendarIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/sekDekan/profile",
      },
    ],
  },
];

export const mahasiswaMenus = [
  {
    label: "Klabat Bridge",
    type: "section",
    children: [
      // CALON TAMATAN ===============
      {
        label: "Home (Calon Tamatan)",
        type: "nav-item",
        icon: <HomeIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/home-calon-tamatan",
      },
      {
        label: "Pengisian SPT",
        type: "nav-item",
        icon: <FormatListBulletedIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/pengisian-spt",
      },
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
        uri: "/bimbingan-akademik/vision-mission-goals",
      },
      {
        label: "Curriculum",
        type: "nav-item",
        icon: <ImportContactsIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/curriculum",
      },
      {
        label: "Grades",
        type: "nav-item",
        icon: <SchoolIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/grades",
      },
      {
        label: "Certificates",
        type: "nav-item",
        icon: <AssignmentIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/certificates",
      },
      {
        label: "History",
        type: "nav-item",
        icon: <FileCopyIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/history",
      },
      {
        label: "Grade Submission",
        type: "nav-item",
        icon: <LibraryAddIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/grade-submission",
      },
      {
        label: "Pre-registration",
        type: "nav-item",
        icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/pre-registration",
      },
      {
        label: "Consultation",
        type: "nav-item",
        icon: <PermContactCalendarIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/consultation",
      },
      {
        label: "Profile",
        type: "nav-item",
        icon: <PersonIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/profile",
      },
    ],
  },
  {
    label: "Sistem Informasi Skripsi",
    type: "section",
    children: [
      {
        label: "Mahasiswa",
        type: "nav-item",
        icon: <PersonIcon sx={{ fontSize: 20 }} />,
        uri: "/sistem-informasi-skripsi/daftar-pengajuan",
      },
    ],
  },
];

// Dekan Bimbingan Akademik Menus
export const dekanMenus = [
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
    ],
  },
  {
    label: "Bimbingan Akademik",
    type: "section",
    children: [
      {
        label: "Dashboard",
        type: "nav-item",
        icon: <DashboardIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/dekan/dashboard",
      },
      {
        label: "Academic Guide",
        type: "nav-item",
        icon: <AccountBalanceIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/dekan/academic-guide",
      },
      {
        label: "Vision Mission Goals",
        type: "nav-item",
        icon: <LocalLibraryIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/dekan/vision-mission-goals",
      },
      {
        label: "Curriculum",
        type: "nav-item",
        icon: <ImportContactsIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/dekan/curriculum",
      },
      {
        label: "Student Information",
        type: "collapsible",
        icon: <SchoolIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            label: "Mentored Student",
            type: "nav-item",
            uri: "/bimbingan-akademik/dekan/student-information-mentored",
          },
          {
            label: "Faculty Student",
            type: "nav-item",
            uri: "/bimbingan-akademik/dekan/student-information-faculty",
          },
        ],
      },
      {
        label: "Supervisor Information",
        type: "nav-item",
        icon: <GroupIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/dekan/supervisor-information",
      },
      {
        label: "Review Activities",
        type: "collapsible",
        icon: <AssignmentIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            label: "Review Pre-Registration",
            type: "nav-item",
            uri: "/bimbingan-akademik/dekan/review-activities/pre-registration",
          },
          {
            label: "Review Certificates",
            type: "nav-item",
            uri: "/bimbingan-akademik/dekan/review-activities/certificate",
          },
          {
            label: "Student Consultation",
            type: "nav-item",
            uri: "/bimbingan-akademik/dekan/review-activities/consultation",
          },
          {
            label: "Review Grades",
            type: "nav-item",
            uri: "/bimbingan-akademik/dekan/review-activities/grade",
          },
        ],
      },
      {
        label: "Recent History",
        type: "nav-item",
        icon: <FileCopyIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/dekan/recent-history",
      },
      {
        label: "Activity History",
        type: "nav-item",
        icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/dekan/activity-history",
      },
      {
        label: "Add Activity",
        type: "nav-item",
        icon: <LibraryAddIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/dekan/add-activity",
      },
      {
        label: "Profile",
        type: "nav-item",
        icon: <PermContactCalendarIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/dekan/profile",
      },
    ],
  },
  {
    label: "Sistem Informasi Skripsi",
    type: "section",
    children: [
      {
        uri: "/sistem-informasi-skripsi/pengajuan-judul-kaprodi",
        label: "Pengajuan Judul",
        type: "nav-item",
        icon: <AttachEmailIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/sistem-informasi-skripsi/pengajuan-proposal-kaprodi",
        label: "Pengajuan Proposal",
        type: "nav-item",
        icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/sistem-informasi-skripsi/pengajuan-skripsi-kaprodi",
        label: "Pengajuan Skripsi",
        type: "nav-item",
        icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/sistem-informasi-skripsi/riwayat-kaprodi",
        label: "Riwayat",
        type: "nav-item",
        icon: <SchoolIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
];

export const dosenMenus = [
  {
    label: "Bimbingan Akademik",
    type: "section",
    children: [
      {
        label: "Dashboard",
        type: "nav-item",
        icon: <DashboardIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/dashboard",
      },
      {
        label: "Academic Guide",
        type: "nav-item",
        icon: <AccountBalanceIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/academic-guide",
      },
      {
        label: "Vision, Mission and Goals",
        type: "nav-item",
        icon: <LocalLibraryIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/vision-mission-goals",
      },
      {
        label: "Curriculum",
        type: "nav-item",
        icon: <ImportContactsIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/curriculum",
      },
      {
        label: "Student Information",
        type: "nav-item",
        icon: <SchoolIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/student-information",
      },
      {
        label: "Review Activity",
        type: "collapsible",
        icon: <AssignmentIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            label: "Review Pre-Registration",
            type: "nav-item",
            uri: "/bimbingan-akademik/review-pre-registration",
          },
          {
            label: "Review Certificate",
            type: "nav-item",
            uri: "/bimbingan-akademik/review-certificate",
          },
          {
            label: "Student Consultation",
            type: "nav-item",
            uri: "/bimbingan-akademik/student-consultation",
          },
        ],
      },
      {
        label: "Recent Activities",
        type: "nav-item",
        icon: <RecentActorsIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/recent-activities",
      },
      {
        label: "Activity History",
        type: "nav-item",
        icon: <SchoolIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/activity-history",
      },
      {
        label: "Add Activity",
        type: "nav-item",
        icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/add-activity",
      },
      {
        label: "Profile",
        type: "nav-item",
        icon: <PersonIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/profile",
      },
    ],
  },
  {
    label: "Sistem Informasi Skripsi",
    type: "section",
    children: [
      {
        uri: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen",
        label: "Komite Judul",
        type: "nav-item",
        icon: <AttachEmailIcon sx={{ fontSize: 20 }} />,
      },
      {
        label: "Pengajuan",
        type: "collapsible",
        icon: <MailIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            uri: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi",
            label: "Pengajuan Judul",
            type: "nav-item",
            icon: <AttachEmailIcon sx={{ fontSize: 20 }} />,
          },
          {
            uri: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi",
            label: "Pengajuan Proposal",
            type: "nav-item",
            icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
          },
          {
            uri: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi",
            label: "Pengajuan Skripsi",
            type: "nav-item",
            icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
          },
        ],
      },
      {
        uri: "/sistem-informasi-skripsi/manajemen-kelas-dosen-skripsi",
        label: "Manajemen Kelas",
        type: "nav-item",
        icon: <CollectionsBookmarkIcon sx={{ fontSize: 20 }} />,
      },
      {
        label: "Bimbingan",
        type: "collapsible",
        icon: <MailIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            uri: "/sistem-informasi-skripsi/bimbingan-proposal-advisor",
            label: "BProp Adv",
            type: "nav-item",
            icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
          },
          {
            uri: "/sistem-informasi-skripsi/bimbingan-proposal-co-advisor",
            label: "BProp Co-Adv",
            type: "nav-item",
            icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
          },
          {
            uri: "/sistem-informasi-skripsi/bimbingan-skripsi-advisor",
            label: "BSkrip Adv",
            type: "nav-item",
            icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
          },
          {
            uri: "/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor",
            label: "BSkrip Co-Adv",
            type: "nav-item",
            icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
          },
          {
            uri: "/sistem-informasi-skripsi/riwayat-bimbingan-advisor",
            label: "RBimb Adv",
            type: "nav-item",
            icon: <SchoolIcon sx={{ fontSize: 20 }} />,
          },
          {
            uri: "/sistem-informasi-skripsi/riwayat-bimbingan-co-advisor",
            label: "RBimb Co-Adv",
            type: "nav-item",
            icon: <SchoolIcon sx={{ fontSize: 20 }} />,
          },
        ],
      },
      {
        label: "Pengujian",
        type: "collapsible",
        icon: <MailIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            uri: "/sistem-informasi-skripsi/uji-proposal-ketua",
            label: "Uji Proposal Ketua",
            type: "nav-item",
            icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
          },
          {
            uri: "/sistem-informasi-skripsi/uji-proposal-anggota",
            label: "Uji Proposal Anggota",
            type: "nav-item",
            icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
          },
          {
            uri: "/sistem-informasi-skripsi/uji-skripsi-ketua",
            label: "Uji Skripsi Ketua",
            type: "nav-item",
            icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
          },
          {
            uri: "/sistem-informasi-skripsi/uji-skripsi-anggota",
            label: "Uji Skripsi Anggota",
            type: "nav-item",
            icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
          },
          {
            uri: "/sistem-informasi-skripsi/riwayat-uji-ketua",
            label: "Riwayat Uji Ketua",
            type: "nav-item",
            icon: <SchoolIcon sx={{ fontSize: 20 }} />,
          },
          {
            uri: "/sistem-informasi-skripsi/riwayat-uji-anggota",
            label: "Riwayat Uji Anggota",
            type: "nav-item",
            icon: <SchoolIcon sx={{ fontSize: 20 }} />,
          },
        ],
      },
    ],
  },
];

// Kaprodi Bimbingan Akademik Menus
export const kaprodiMenus = [
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
    ],
  },
  {
    label: "Bimbingan Akademik",
    type: "section",
    children: [
      {
        label: "Dashboard",
        type: "nav-item",
        icon: <AccountBalanceIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/kaprodi/dashboard",
      },
      {
        label: "Academic Guide",
        type: "nav-item",
        icon: <AccountBalanceIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/kaprodi/academic-guide",
      },
      {
        label: "Vision Mission Goals",
        type: "nav-item",
        icon: <LocalLibraryIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/kaprodi/vision-mission-goals",
      },
      {
        label: "Curriculum",
        type: "nav-item",
        icon: <ImportContactsIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/kaprodi/curriculum",
      },
      {
        label: "Student Information",
        type: "collapsible",
        icon: <SchoolIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            label: "Mentored Student",
            type: "nav-item",
            uri: "/bimbingan-akademik/kaprodi/student-information/mentored-student",
          },
          {
            label: "Faculty Student",
            type: "nav-item",
            uri: "/bimbingan-akademik/kaprodi/student-information/faculty-student",
          },
        ],
      },
      {
        label: "Supervisor Information",
        type: "nav-item",
        icon: <GroupIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/kaprodi/supervisor-information",
      },
      {
        label: "Review Activities",
        type: "collapsible",
        icon: <AssignmentIcon sx={{ fontSize: 20 }} />,
        children: [
          {
            label: "Review Pre-Registration",
            type: "nav-item",
            uri: "/bimbingan-akademik/kaprodi/Review-Activities/pre-registration",
          },
          {
            label: "Review Certificates",
            type: "nav-item",
            uri: "/bimbingan-akademik/kaprodi/Review-Activities/certificates",
          },
          {
            label: "Review Grades",
            type: "nav-item",
            uri: "/bimbingan-akademik/kaprodi/Review-Activities/grade",
          },
          {
            label: "Student Consultation",
            type: "nav-item",
            uri: "/bimbingan-akademik/kaprodi/Review-Activities/consultation",
          },
        ],
      },
      {
        label: "Current Activities",
        type: "nav-item",
        icon: <FileCopyIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/kaprodi/current-activities",
      },
      {
        label: "History",
        type: "nav-item",
        icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/kaprodi/history",
      },
      {
        label: "Add Activity",
        type: "nav-item",
        icon: <LibraryAddIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/kaprodi/add-activity",
      },
      {
        label: "Profile",
        type: "nav-item",
        icon: <PersonIcon sx={{ fontSize: 20 }} />,
        uri: "/bimbingan-akademik/kaprodi/profile",
      },
    ],
  },
  {
    label: "Sistem Informasi Skripsi",
    type: "section",
    children: [
      {
        uri: "/sistem-informasi-skripsi/pengajuan-judul-kaprodi",
        label: "Pengajuan Judul",
        type: "nav-item",
        icon: <AttachEmailIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/sistem-informasi-skripsi/pengajuan-proposal-kaprodi",
        label: "Pengajuan Proposal",
        type: "nav-item",
        icon: <BorderColorIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/sistem-informasi-skripsi/pengajuan-skripsi-kaprodi",
        label: "Pengajuan Skripsi",
        type: "nav-item",
        icon: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
      },
      {
        uri: "/sistem-informasi-skripsi/riwayat-kaprodi",
        label: "Riwayat",
        type: "nav-item",
        icon: <SchoolIcon sx={{ fontSize: 20 }} />,
      },
    ],
  },
];

export const operatorMenus = [
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
    ],
  },
];

export const adminMenus = [
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
        label: "Form Tracer Study",
        type: "nav-item",
        icon: <InsertDriveFileIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/form-tracer-study",
      },
    ],
  },
];

export const registerMenus = [
  {
    label: "Klabat Bridge",
    type: "section",
    children: [
      {
        label: "Daftar Calon Tamatan",
        type: "nav-item",
        icon: <GroupsIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/daftar-calon-tamatan",
      },
    ],
  },
];

export const mahasiswaMenusGraduate = [
  {
    label: "Klabat Bridge",
    type: "section",
    children: [
      // ALUMNI ================
      {
        label: "Home (Alumni)",
        type: "nav-item",
        icon: <HomeIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/home-alumni",
      },
      {
        label: "Form Tracer Study",
        type: "nav-item",
        icon: <InsertDriveFileIcon sx={{ fontSize: 20 }} />,
        uri: "/klabat-bridge/form-tracer-study",
      },
    ],
  },
];
