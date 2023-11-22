import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const tableData1 = [
  {
    number: 1,
    code: "WEDU001",
    name: "Pendidikan Keterampilan/ Work Education",
    credits: 1,
    type: "Pre-requisite",
    prerequisite: "-",
  },
  {
    number: 2,
    code: "MATH000",
    name: "Matematika/ Mathematics",
    credits: 2,
    type: "Pre-requisite",
    prerequisite: "-",
  },
  {
    number: 3,
    code: "COPS000",
    name: "Keterampilan Komputer Dasar/ Basic Computer Skill",
    credits: 3,
    type: "Pre-requisite",
    prerequisite: "-",
  },
  {
    number: 4,
    code: "BIU000",
    name: "Bahasa Inggris Pemula/ Basic English",
    credits: 3,
    type: "Pre-requisite",
    prerequisite: "-",
  },
];

const tableData2 = [
  {
    number: 1,
    code: "FILG181",
    name: "Kehidupan Teladan Yesus I/ The Exemplary Living of Jesus I",
    credits: 2,
    type: "General",
    prerequisite: "-",
  },
  {
    number: 2,
    code: "GEN001",
    name: "Bahasa Inggris Dasar I/ Elementary English I",
    credits: 3,
    type: "General",
    prerequisite: "-",
  },
  {
    number: 3,
    code: "IS1111",
    name: "Dasar Infrastruktur IT/ Fundamental of IT Infrastructure",
    credits: 3,
    type: "Basic",
    prerequisite: "-",
  },
  {
    number: 4,
    code: "IS1112",
    name: "Manajemen Proses Bisnis/ Business Process Management",
    credits: 3,
    type: "Basic",
    prerequisite: "-",
  },
  {
    number: 5,
    code: "IS1113",
    name: "Pemrograman Komputer/ Computer Programming",
    credits: 6,
    type: "Basic",
    prerequisite: "-",
  },
  {
    number: 6,
    code: "BIU101",
    name: "Bahasa Inggris Pra Dasar/ Pre-Elementary English",
    credits: 3,
    type: "General",
    prerequisite:
      "- [BIU000] Bahasa Inggris Pemula/ Basic English - 3 credit(s)",
  },
];

const tableData3 = [
  {
    number: 1,
    code: "GEN002",
    name: "Bahasa Inggris Dasar II/ Elementary English II",
    credits: 3,
    type: "General",
    prerequisite:
      "- [GEN001] Bahasa Inggris Dasar I/ Elementary English I - 3 credit(s)",
  },
  {
    number: 2,
    code: "PEND131",
    name: "Filsafat Pendidikan Kristen/ Philosophy of Christian Education",
    credits: 2,
    type: "General",
    prerequisite: "-",
  },
  {
    number: 3,
    code: "FILG182",
    name: "Kehidupan Teladan II/ The Exemplary Living II",
    credits: 2,
    type: "General",
    prerequisite:
      "- [FILG181] Kehidupan Teladan Yesus I/ The Exemplary Living of Jesus I - 2 credit(s)",
  },
  {
    number: 4,
    code: "IS1221",
    name: "Matematika Diskrit/ Discrete Mathematics",
    credits: 3,
    type: "Major",
    prerequisite: "- [MATH000] Matematika/ Mathematics - 2 credit(s)",
  },
  {
    number: 5,
    code: "IS1222",
    name: "Pengantar Akuntansi Keuangan/ Introduction to Financial Accounting",
    credits: 3,
    type: "Basic",
    prerequisite: "-",
  },
  {
    number: 6,
    code: "IS1223",
    name: "Jaringan Komputer/ Computer Network",
    credits: 3,
    type: "Basic",
    prerequisite:
      "- [IS1111] Dasar Infrastruktur IT/ Fundamental of IT Infrastructure - 3 credit(s)",
  },
  {
    number: 7,
    code: "IS1224",
    name: "Struktur Data dan Algoritma/ Data Structure and Algorithms",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS1113] Pemrograman Komputer/ Computer Programming - 6 credit(s)",
  },
  {
    number: 8,
    code: "BIU102",
    name: "Bahasa Inggris Dasar/ Elementary English",
    credits: 3,
    type: "General",
    prerequisite:
      "- [BIU101] Bahasa Inggris Pra Dasar/ Pre-Elementary English - 3 credit(s)",
  },
];

const tableData4 = [
  {
    number: 1,
    code: "GEN101",
    name: "Bahasa Inggris Pra Menengah I / Pre-Inter English I",
    credits: 3,
    type: "General",
    prerequisite:
      "- [GEN002] Bahasa Inggris Dasar II/ Elementary English II - 3 credit(s)",
  },
  {
    number: 2,
    code: "FILG283",
    name: "Dasar-Dasar Nilai Kristiani/ The Principles of Christian Values",
    credits: 2,
    type: "General",
    prerequisite:
      "- [FILG182] Teladan Kehidupan II/ The Exemplary Living II - 2 credit(s)",
  },
  {
    number: 3,
    code: "PPKN101",
    name: "Pendidikan Kewarganegaraan/ Indonesian Civics",
    credits: 3,
    type: "General",
    prerequisite: "-",
  },
  {
    number: 4,
    code: "IS2131",
    name: "Sistem Informasi Manajemen/ Management Information System",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS1111] Dasar Infrastruktur IT/ Fundamental of IT Infrastructure - 3
        credit(s)
        <br />- [IS1112] Manajemen Proses Bisnis/ Business Process Management -
        3 credit(s)"
      </div>
    ),
  },
  {
    number: 5,
    code: "IS2132",
    name: "Perancangan Web/ Web Design",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS1113] Pemrograman Komputer/ Computer Programming - 6 credit(s)",
  },
  {
    number: 6,
    code: "IS2133",
    name: "Pengantar Basisdata/ Introduction to Database",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS1111] Dasar Infrastruktur IT/ Fundamental of IT Infrastructure - 3 credit(s)",
  },
  {
    number: 7,
    code: "IS2134",
    name: "Statistik dan Probabilitas/ Statistics and Probability",
    credits: 3,
    type: "Basic",
    prerequisite:
      "- [IS1221] Matematika Diskrit/ Discrete Mathematics - 3 credit(s)",
  },
  {
    number: 8,
    code: "BIU203",
    name: "Bahasa Inggris Pra Menengah I / Pre-Intermediate English I",
    credits: 3,
    type: "General",
    prerequisite:
      "- [BIU102] Bahasa Inggris Dasar/ Elementary English - 3 credit(s)",
  },
];

const tableData5 = [
  {
    number: 1,
    code: "GEN102",
    name: "Bahasa Inggris Pra Menengah II / Pre-Inter English II",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [GEN101] Bahasa Inggris Pra Menengah I / Pre-Inter English I - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 2,
    code: "FILG284",
    name: "Pemuda dan Dunia/ Youth and the World",
    credits: 2,
    type: "General",
    prerequisite: (
      <div>
        - [FILG283] Dasar-Dasar Nilai Kristiani/ The Principles of Christian
        Values - 2 credit(s)
      </div>
    ),
  },
  {
    number: 3,
    code: "IS2241",
    name: "Sistem Manajemen Basisdata/ Database Management System",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS2133] Pengantar Basisdata/ Introduction to Database - 3 credit(s)
      </div>
    ),
  },
  {
    number: 4,
    code: "IS2242",
    name: "Kewirausahaan/ Entrepreneur - Project Capstone",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS1112] Manajemen Proses Bisnis/ Business Process Management - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 5,
    code: "IS2243",
    name: "Pemrograman Berorientasi Objek/ Object Oriented Programming",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS1113] Pemrograman Komputer/ Computer Programming - 6 credit(s)
      </div>
    ),
  },
  {
    number: 6,
    code: "IS2244",
    name: "Etika Komputer dan Profesi/ Computer Ethics and Profession",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS1111] Dasar Infrastruktur IT/ Fundamental of IT Infrastructure - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 7,
    code: "IS2245",
    name: "Penulisan Ilmiah/ Scientific Writing",
    credits: 2,
    type: "Major",
    prerequisite: (
      <div>
        - [IS1111] Dasar Infrastruktur IT/ Fundamental of IT Infrastructure - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 8,
    code: "BIU204",
    name: "Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II",
    credits: 3,
    type: "General",
    prerequisite: (
      <div>
        - [BIU203] Bahasa Inggris Pra Menengah I / Pre-Intermediate English I -
        3 credit(s)
      </div>
    ),
  },
];

const tableData6 = [
  {
    number: 1,
    code: "FILG385",
    name: "Kehidupan Rumah Tangga/ Family Living",
    credits: 2,
    type: "General",
    prerequisite:
      "- [FILG284] Pemuda dan Dunia/ Youth and the World - 2 credit(s)",
  },

  {
    number: 2,
    code: "IS3151",
    name: "Pengembangan Web Front-End/ Front-End Web Development",
    credits: 3,
    type: "Major",
    prerequisite: "- [IS2132] Perancangan Web/ Web Design - 3 credit(s)",
  },

  {
    number: 3,
    code: "IS3152",
    name: "Analisis dan Perancangan Sistem/ System Analysis and Design",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS1113] Pemrograman Komputer/ Computer Programming - 6 credit(s)
        <br />- [IS2131] Sistem Informasi Manajemen/ Management Information
        System - 3 credit(s)
      </div>
    ),
  },

  {
    number: 4,
    code: "IS3153",
    name: "Keamanan Sistem Informasi/ Information System Security",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS1223] Jaringan Komputer/ Computer Network - 3 credit(s)",
  },

  {
    number: 5,
    code: "IS3154",
    name: "Penambangan dan Pergudangan Data/ Data Mining and Warehousing",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS2241] Sistem Manajemen Basisdata/ Database Management System - 3 credit(s)",
  },

  {
    number: 6,
    code: "IS3155",
    name: "Rekayasa Proses Bisnis/ Business Process Reengineering",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS1222] Pengantar Akuntansi Keuangan/ Introduction to Financial
        Accounting - 3 credit(s)
        <br />- [IS2131] Sistem Informasi Manajemen/ Management Information
        System - 3 credit(s)
      </div>
    ),
  },

  {
    number: 7,
    code: "IS3156",
    name: "Bisnis Elektronik/ Electronic Business (E-Business)",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS1112] Manajemen Proses Bisnis/ Business Process Management - 3
        credit(s)
        <br />- [IS2132] Perancangan Web/ Web Design - 3 credit(s)
      </div>
    ),
  },
];

const tableData7 = [
  {
    number: 1,
    code: "FILG386",
    name: "Hidup Akhir Zaman/ End Time Living",
    credits: 2,
    type: "General",
    prerequisite: (
      <div>- [FILG385] Kehidupan Rumah Tangga/ Family Living - 2 credit(s)</div>
    ),
  },

  {
    number: 2,
    code: "IS3261",
    name: "Pengembangan Perangkat Bergerak/ Mobile Application Development",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS2243] Pemrograman Berorientasi Objek/ Object Oriented Programming -
        3 credit(s)
      </div>
    ),
  },

  {
    number: 3,
    code: "IS3262",
    name: "Interaksi Manusia dan Komputer/ Human and Computer Interaction",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS3152] Analisis dan Perancangan Sistem/ System Analysis and Design -
        3 credit(s)
      </div>
    ),
  },

  {
    number: 4,
    code: "IS3263",
    name: "Visualisasi Data/ Data Visualization",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS2241] Sistem Manajemen Basisdata/ Database Management System - 3
        credit(s)
      </div>
    ),
  },

  {
    number: 5,
    code: "IS3264",
    name: "Manajemen Proyek Teknologi Informasi/ Information Technology Project Management",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS3152] Analisis dan Perancangan Sistem/ System Analysis and Design -
        3 credit(s)
      </div>
    ),
  },

  {
    number: 6,
    code: "IS3265",
    name: "Metodologi Penelitian/ Research Method",
    credits: 3,
    type: "Basic",
    prerequisite: (
      <div>
        - [IS2134] Statistik dan Probabilitas/ Statistics and Probability - 3
        credit(s)
      </div>
    ),
  },

  {
    number: 7,
    code: "IS3266",
    name: "Kecerdasan dan Analisis Bisnis/ Business Intelligence and Analytics",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS3154] Penambangan dan Pergudangan Data/ Data Mining and Warehousing
        - 3 credit(s)
      </div>
    ),
  },
];

const tableData8 = [
  {
    number: 1,
    code: "IS4171",
    name: "Skripsi I/ Research Project I",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>- [IS3265] Metodologi Penelitian/ Research Method - 3 credit(s)</div>
    ),
  },

  {
    number: 2,
    code: "IS4172",
    name: "Perilaku Organisasi/ Organization Behavior",
    credits: 2,
    type: "Major",
    prerequisite: (
      <div>
        - [IS1112] Manajemen Proses Bisnis/ Business Process Management - 3
        credit(s)
      </div>
    ),
  },

  {
    number: 3,
    code: "IS4173",
    name: "Manajemen Pengetahuan/ Knowledge Management",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS3154] Penambangan dan Pergudangan Data/ Data Mining and Warehousing
        - 3 credit(s)
      </div>
    ),
  },

  {
    number: 4,
    code: "IS4174",
    name: "Desain UI dan UX/ UI and UX Design",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS3262] Interaksi Manusia dan Komputer/ Human and Computer
        Interaction - 3 credit(s)
      </div>
    ),
  },

  {
    number: 5,
    code: "IS4175",
    name: "Pengelolaan Teknologi Informasi/ Information Technology Governance",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS3152] Analisis dan Perancangan Sistem/ System Analysis and Design -
        3 credit(s)
      </div>
    ),
  },
];

const tableData9 = [
  {
    number: 1,
    code: "IS4281",
    name: "Skripsi II/ Research Project II",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>- [IS4171] Skripsi I/ Research Project I - 3 credit(s)</div>
    ),
  },

  {
    number: 2,
    code: "IS4282",
    name: "Audit Sistem Informasi/ Information System Audit",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS1222] Pengantar Akuntansi Keuangan/ Introduction to Financial
        Accounting - 3 credit(s)
        <br />- [IS3153] Keamanan Sistem Informasi/ Information System Security
        - 3 credit(s)
      </div>
    ),
  },

  {
    number: 3,
    code: "IS4283",
    name: "Sistem Pendukung Keputusan/ Decision Support System",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS3154] Penambangan dan Pergudangan Data/ Data Mining and Warehousing
        - 3 credit(s)
      </div>
    ),
  },

  {
    number: 4,
    code: "IS4284",
    name: "Sistem Perencanaan Sumberdaya Perusahaan/ Enterprise Resource Planning System",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS3155] Rekayasa Proses Bisnis/ Business Process Reengineering - 3
        credit(s)
      </div>
    ),
  },
];

const tableData10 = [
  {
    number: 1,
    code: "IS4191",
    name: "Manajemen Resiko/ Risk Management",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [IS3153] Keamanan Sistem Informasi/ Information System Security - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 2,
    code: "IS4192",
    name: "Manajemen Layanan IT/ IT Service Management",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [IS3155] Rekayasa Proses Bisnis/ Business Process Reengineering - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 3,
    code: "IS4291",
    name: "Manajemen Kelangsungan Bisnis/ Business Continuity Management",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [IS2131] Sistem Informasi Manajemen/ Management Information System - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 4,
    code: "IS4292",
    name: "Manajemen Perubahan/ Change Management",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [IS1112] Manajemen Proses Bisnis/ Business Process Management - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 5,
    code: "IS4193",
    name: "Strategi Pemasaran Digital/ Digital Marketing Strategies",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [IS3261] Pengembangan Perangkat Bergerak/ Mobile Application
        Development - 3 credit(s)
      </div>
    ),
  },
  {
    number: 6,
    code: "IS4194",
    name: "Periklanan/ Advertising",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [IS3156] Bisnis Elektronik/ Electronic Business (E-Business) - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 7,
    code: "IS4293",
    name: "Kampanye dan Analisis Sosial Media/ Social Media Campaign and Analytics",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [IS3156] Bisnis Elektronik/ Electronic Business (E-Business) - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 8,
    code: "IS4294",
    name: "Monetasi Inovasi/ Monetizing Innovation",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [IS2242] Kewirausahaan/ Entrepreneur - Project Capstone - 3 credit(s)
      </div>
    ),
  },
  {
    number: 9,
    code: "IS4195",
    name: "Inovasi dan Kewirausahaan/ Innovation and Entrepreneurship",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [IS2242] Kewirausahaan/ Entrepreneur - Project Capstone - 3 credit(s)
      </div>
    ),
  },
  {
    number: 10,
    code: "IS4196",
    name: "Meluncurkan Usaha Baru/ Launching New Ventures",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [IS2242] Kewirausahaan/ Entrepreneur - Project Capstone - 3 credit(s)
      </div>
    ),
  },
  {
    number: 11,
    code: "IS4295",
    name: "Strategi Pengembangan Bisnis/ Business Development Strategies",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [IS2242] Kewirausahaan/ Entrepreneur - Project Capstone - 3 credit(s)
      </div>
    ),
  },
  {
    number: 12,
    code: "IS4296",
    name: "Pemodalan Usaha/ Venture Capital",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [IS2242] Kewirausahaan/ Entrepreneur - Project Capstone - 3 credit(s)
      </div>
    ),
  },
  {
    number: 13,
    code: "BENG310",
    name: "Bahasa Inggris Bisnis Membaca dan Kosakata/ Business English Reading and Vocabulary",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 14,
    code: "BENG320",
    name: "Korespondensi Bisnis Bahasa Inggris/ Business English Correspondence",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 15,
    code: "BENG330",
    name: "Komunikasi Bisnis Bahasa Inggris/ Business English Communication",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 16,
    code: "ELIT271",
    name: "Studi Literatur I/ Literature Studies I",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 17,
    code: "BIU305",
    name: "Bahasa Inggris Menengah I/ Intermediate English I",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II -
        3 credit(s)
      </div>
    ),
  },
  {
    number: 18,
    code: "BIU305",
    name: "Bahasa Inggris Menengah I/ Intermediate English I",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 19,
    code: "BIU306",
    name: "Bahasa Inggris Menengah II/ Intermediate English II",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II -
        3 credit(s)
      </div>
    ),
  },
  {
    number: 20,
    code: "BIU306",
    name: "Bahasa Inggris Menengah II/ Intermediate English II",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 21,
    code: "ESP401",
    name: "Bahasa Inggris Bisnis Membaca dan Kosakata/ Business English Reading and Vocabulary",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II -
        3 credit(s)
      </div>
    ),
  },
  {
    number: 22,
    code: "ESP401",
    name: "Bahasa Inggris Bisnis Membaca dan Kosakata/ Business English Reading and Vocabulary",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 23,
    code: "ESP402",
    name: "Korespondensi Bisnis Bahasa Inggris/ Business English Correspondence",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II -
        3 credit(s)
      </div>
    ),
  },
  {
    number: 24,
    code: "ESP402",
    name: "Korespondensi Bisnis Bahasa Inggris/ Business English Correspondence",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 25,
    code: "ESP403",
    name: "Komunikasi Bisnis Bahasa Inggris/ Business English Communication",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II -
        3 credit(s)
      </div>
    ),
  },
  {
    number: 26,
    code: "ESP403",
    name: "Komunikasi Bisnis Bahasa Inggris/ Business English Communication",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 27,
    code: "ENG433",
    name: "Penulisan Akademik Bahasa Inggris III/ Academic English Writing III",
    credits: 3,
    type: "Elective",
    prerequisite: "-",
  },
];

const TableItem = ({ data }) => (
  <TableRow>
    <TableCell>{data.number}</TableCell>
    <TableCell>{data.code}</TableCell>
    <TableCell>{data.name}</TableCell>
    <TableCell>{data.credits}</TableCell>
    <TableCell>{data.type}</TableCell>
    <TableCell>{data.prerequisite}</TableCell>
  </TableRow>
);

const CurriculumSistemInformasi = () => {
  return (
    <div>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 500,
          paddingTop: "25px",
          paddingBottom: "20px",
        }}
      ></Typography>

      <TableContainer
        sx={{ overflow: "auto", maxHeight: 740 }}
        component={Paper}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} sx={{ top: 0, backgroundColor: "white" }}>
                PREREQUISITE
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "80px", top: 57 }}>Number</TableCell>
              <TableCell sx={{ width: "110px", top: 57 }}>Code</TableCell>
              <TableCell sx={{ width: "400px", top: 57 }}>Name</TableCell>
              <TableCell sx={{ width: "80px", top: 57 }}>Credit(s)</TableCell>
              <TableCell sx={{ width: "120px", top: 57 }}>Type</TableCell>
              <TableCell sx={{ width: "288px", top: 57 }}>
                Prerequisite
              </TableCell>
            </TableRow>
          </TableHead>
          {tableData1.map((data, index) => (
            <TableItem key={index} data={data} />
          ))}
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} sx={{ top: 0, backgroundColor: "white" }}>
                SEMESTER 1
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "80px", top: 57 }}>Number</TableCell>
              <TableCell sx={{ width: "110px", top: 57 }}>Code</TableCell>
              <TableCell sx={{ width: "400px", top: 57 }}>Name</TableCell>
              <TableCell sx={{ width: "80px", top: 57 }}>Credit(s)</TableCell>
              <TableCell sx={{ width: "120px", top: 57 }}>Type</TableCell>
              <TableCell sx={{ width: "288px", top: 57 }}>
                Prerequisite
              </TableCell>
            </TableRow>
          </TableHead>
          {tableData2.map((data, index) => (
            <TableItem key={index} data={data} />
          ))}
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} sx={{ top: 0, backgroundColor: "white" }}>
                SEMESTER 2
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "80px", top: 57 }}>Number</TableCell>
              <TableCell sx={{ width: "110px", top: 57 }}>Code</TableCell>
              <TableCell sx={{ width: "400px", top: 57 }}>Name</TableCell>
              <TableCell sx={{ width: "80px", top: 57 }}>Credit(s)</TableCell>
              <TableCell sx={{ width: "120px", top: 57 }}>Type</TableCell>
              <TableCell sx={{ width: "288px", top: 57 }}>
                Prerequisite
              </TableCell>
            </TableRow>
          </TableHead>
          {tableData3.map((data, index) => (
            <TableItem key={index} data={data} />
          ))}
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} sx={{ top: 0, backgroundColor: "white" }}>
                SEMESTER 3
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "80px", top: 57 }}>Number</TableCell>
              <TableCell sx={{ width: "110px", top: 57 }}>Code</TableCell>
              <TableCell sx={{ width: "400px", top: 57 }}>Name</TableCell>
              <TableCell sx={{ width: "80px", top: 57 }}>Credit(s)</TableCell>
              <TableCell sx={{ width: "120px", top: 57 }}>Type</TableCell>
              <TableCell sx={{ width: "288px", top: 57 }}>
                Prerequisite
              </TableCell>
            </TableRow>
          </TableHead>
          {tableData4.map((data, index) => (
            <TableItem key={index} data={data} />
          ))}
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} sx={{ top: 0, backgroundColor: "white" }}>
                SEMESTER 4
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "80px", top: 57 }}>Number</TableCell>
              <TableCell sx={{ width: "110px", top: 57 }}>Code</TableCell>
              <TableCell sx={{ width: "400px", top: 57 }}>Name</TableCell>
              <TableCell sx={{ width: "80px", top: 57 }}>Credit(s)</TableCell>
              <TableCell sx={{ width: "120px", top: 57 }}>Type</TableCell>
              <TableCell sx={{ width: "288px", top: 57 }}>
                Prerequisite
              </TableCell>
            </TableRow>
          </TableHead>
          {tableData5.map((data, index) => (
            <TableItem key={index} data={data} />
          ))}
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} sx={{ top: 0, backgroundColor: "white" }}>
                SEMESTER 5
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "80px", top: 57 }}>Number</TableCell>
              <TableCell sx={{ width: "110px", top: 57 }}>Code</TableCell>
              <TableCell sx={{ width: "400px", top: 57 }}>Name</TableCell>
              <TableCell sx={{ width: "80px", top: 57 }}>Credit(s)</TableCell>
              <TableCell sx={{ width: "120px", top: 57 }}>Type</TableCell>
              <TableCell sx={{ width: "288px", top: 57 }}>
                Prerequisite
              </TableCell>
            </TableRow>
          </TableHead>
          {tableData6.map((data, index) => (
            <TableItem key={index} data={data} />
          ))}
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} sx={{ top: 0, backgroundColor: "white" }}>
                SEMESTER 6
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "80px", top: 57 }}>Number</TableCell>
              <TableCell sx={{ width: "110px", top: 57 }}>Code</TableCell>
              <TableCell sx={{ width: "400px", top: 57 }}>Name</TableCell>
              <TableCell sx={{ width: "80px", top: 57 }}>Credit(s)</TableCell>
              <TableCell sx={{ width: "120px", top: 57 }}>Type</TableCell>
              <TableCell sx={{ width: "288px", top: 57 }}>
                Prerequisite
              </TableCell>
            </TableRow>
          </TableHead>
          {tableData7.map((data, index) => (
            <TableItem key={index} data={data} />
          ))}
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} sx={{ top: 0, backgroundColor: "white" }}>
                SEMESTER 7
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "80px", top: 57 }}>Number</TableCell>
              <TableCell sx={{ width: "110px", top: 57 }}>Code</TableCell>
              <TableCell sx={{ width: "400px", top: 57 }}>Name</TableCell>
              <TableCell sx={{ width: "80px", top: 57 }}>Credit(s)</TableCell>
              <TableCell sx={{ width: "120px", top: 57 }}>Type</TableCell>
              <TableCell sx={{ width: "288px", top: 57 }}>
                Prerequisite
              </TableCell>
            </TableRow>
          </TableHead>
          {tableData8.map((data, index) => (
            <TableItem key={index} data={data} />
          ))}
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} sx={{ top: 0, backgroundColor: "white" }}>
                SEMESTER 8
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "80px", top: 57 }}>Number</TableCell>
              <TableCell sx={{ width: "110px", top: 57 }}>Code</TableCell>
              <TableCell sx={{ width: "400px", top: 57 }}>Name</TableCell>
              <TableCell sx={{ width: "80px", top: 57 }}>Credit(s)</TableCell>
              <TableCell sx={{ width: "120px", top: 57 }}>Type</TableCell>
              <TableCell sx={{ width: "288px", top: 57 }}>
                Prerequisite
              </TableCell>
            </TableRow>
          </TableHead>
          {tableData9.map((data, index) => (
            <TableItem key={index} data={data} />
          ))}
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} sx={{ top: 0, backgroundColor: "white" }}>
                SEMESTER 9
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "80px", top: 57 }}>Number</TableCell>
              <TableCell sx={{ width: "110px", top: 57 }}>Code</TableCell>
              <TableCell sx={{ width: "400px", top: 57 }}>Name</TableCell>
              <TableCell sx={{ width: "80px", top: 57 }}>Credit(s)</TableCell>
              <TableCell sx={{ width: "120px", top: 57 }}>Type</TableCell>
              <TableCell sx={{ width: "288px", top: 57 }}>
                Prerequisite
              </TableCell>
            </TableRow>
          </TableHead>
          {tableData10.map((data, index) => (
            <TableItem key={index} data={data} />
          ))}
          <div>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                margin: "18px",
                width: "100%",
              }}
            >
              END
            </Typography>
          </div>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CurriculumSistemInformasi;
