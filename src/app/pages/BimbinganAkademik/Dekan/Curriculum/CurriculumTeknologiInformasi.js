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
    code: "BEDW121",
    name: "Beginning Drawing/ Menggambar dasar",
    credits: 3,
    type: "",
    prerequisite: "-",
  },
  {
    number: 2,
    code: "DVCM111",
    name: "Desain dalam Visualisasi dan Komunikasi/ Design in Visualization and Communication",
    credits: 3,
    type: "",
    prerequisite: "-",
  },
  {
    number: 3,
    code: "COPS121",
    name: "Introduction to Computing/ Pengantar Komputer",
    credits: 3,
    type: "",
    prerequisite: "-",
  },
  {
    number: 4,
    code: "IND201",
    name: "Indonesian Language/ Bahasa Indonesia",
    credits: 2,
    type: "",
    prerequisite: "-",
  },
  {
    number: 5,
    code: "ICGT162",
    name: "Introduction to Computer Graphic Technology/ Pengantar Teknologi Komputer Grafik",
    credits: 3,
    type: "",
    prerequisite: "-",
  },
  {
    number: 6,
    code: "FILG181",
    name: "Teladan Kehidupan I/ The Exemplary Living I",
    credits: 2,
    type: "",
    prerequisite: "-",
  },
  {
    number: 7,
    code: "BIU101",
    name: "Bahasa Inggris Pra Dasar/ Pre-Elementary English",
    credits: 3,
    type: "",
    prerequisite:
      "- [BIU000] Bahasa Inggris Pemula/ Basic English - 3 credit(s)",
  },
  {
    number: 8,
    code: "WEDU001",
    name: "Pendidikan Keterampilan/ Work Education",
    credits: 1,
    type: "",
    prerequisite: "-",
  },
];

const tableData3 = [
  {
    number: 1,
    code: "CIV201",
    name: "Indonesian Civics/ Pendidikan Kewarganegaraan",
    credits: 2,
    type: "",
    prerequisite: "-",
  },
  {
    number: 2,
    code: "SKVC112",
    name: "Sketching in Visualization and Communication/ Menggambar Sketsa dalam Visualisasi dan Komunikasi",
    credits: 3,
    type: "",
    prerequisite:
      "- [BEDW121] Beginning Drawing/ Menggambar dasar - 3 credit(s)",
  },
  {
    number: 3,
    code: "MATH173",
    name: "Discrete Mathematics/ Matematika Diskrit",
    credits: 2,
    type: "",
    prerequisite:
      "- [COPS121] Introduction to Computing/ Pengantar Komputer - 3 credit(s)",
  },
  {
    number: 4,
    code: "SENG191",
    name: "Computer Programming/ Pemrograman Komputer",
    credits: 6,
    type: "",
    prerequisite:
      "- [COPS121] Introduction to Computing/ Pengantar Komputer - 3 credit(s)",
  },
  {
    number: 5,
    code: "BIU102",
    name: "Elementary English/ Bahasa Inggris Dasar",
    credits: 3,
    type: "",
    prerequisite:
      "- [BIU101] Bahasa Inggris Pra Dasar/ Pre-Elementary English - 3 credit(s)",
  },
  {
    number: 6,
    code: "FILG182",
    name: "The Exemplary Living II/ Teladan Kehidupan II",
    credits: 2,
    type: "",
    prerequisite:
      "- [FILG181] Teladan Kehidupan I/ The Exemplary Living I - 2 credit(s)",
  },
];

const tableData4 = [
  {
    number: 1,
    code: "RAVE251",
    name: "Digital Imaging Raster and Vector/ Pengolahan Citra Digital Raster dan Vektor",
    credits: 3,
    type: "",
    prerequisite:
      "- [BEDW121] Beginning Drawing/ Menggambar dasar - 3 credit(s)",
  },
  {
    number: 2,
    code: "ILVC213",
    name: "Illustrating for Visual and Communication/ Ilustrasi untuk Visual dan Komunikasi",
    credits: 3,
    type: "",
    prerequisite:
      "- [DVCM111] Design in Visualization and Communication - 3 credit(s)",
  },
  {
    number: 3,
    code: "PPKN121",
    name: "Civic/ Pancasila",
    credits: 2,
    type: "",
    prerequisite: "-",
  },
  {
    number: 4,
    code: "GEVC122",
    name: "Geometry Model for Visualization and Communication/ Model Geometri untuk Visualisasi dan Komunikasi",
    credits: 3,
    type: "",
    prerequisite:
      "- [SKCV112] Sketching in Visualization and Communication - 3 credit(s)",
  },
  {
    number: 5,
    code: "EDU112",
    name: "Philosophy of Christian Education/ Filsafat Pendidikan Kristen",
    credits: 2,
    type: "",
    prerequisite: "-",
  },
  {
    number: 6,
    code: "BIU203",
    name: "Bahasa Inggris Pra Menengah I / Pre-Intermediate English I",
    credits: 3,
    type: "",
    prerequisite:
      "- [BIU102] Elementary English/ Bahasa Inggris Dasar - 3 credit(s)",
  },
  {
    number: 7,
    code: "FILG283",
    name: "Prinsip-Prinsip Nilai Kristiani/ The Principles of Christian Values",
    credits: 2,
    type: "",
    prerequisite:
      "- [FILG182] The Exemplary Living II/ Teladan Kehidupan II - 2 credit(s)",
  },
];

const tableData5 = [
  {
    number: 1,
    code: "ANIM223",
    name: "Introduction to Animation/ Pengantar Animasi",
    credits: 3,
    type: "",
    prerequisite: (
      <div>
        - [SKVC112] Sketching in Visualization and Communication/ Menggambar
        Sketsa dalam Visualisasi dan Komunikasi - 3 credit(s)
        <br />- [ILVC213] Illustrating for Visual and Communication/ Ilustrasi
        untuk Visual dan Komunikasi - 3 credit(s)
        <br />- [GEVC122] Geometry Model for Visualization and Communication/
        Model Geometri untuk Visualisasi dan Komunikasi - 3 credit(s)
      </div>
    ),
  },
  {
    number: 2,
    code: "PRCR214",
    name: "Principles of Creative Design/ Prinsip-prinsip Desain Kreatif",
    credits: 3,
    type: "",
    prerequisite:
      "- [ILVC213] Illustrating for Visual and Communication/ Ilustrasi untuk Visual dan Komunikasi - 3 credit(s)",
  },
  {
    number: 3,
    code: "DIPA271",
    name: "Digital Painting And Coloring/ Pengecatan dan Pewarnaan digital",
    credits: 3,
    type: "",
    prerequisite:
      "- [ILVC213] Illustrating for Visual and Communication/ Ilustrasi untuk Visual dan Komunikasi - 3 credit(s)",
  },
  {
    number: 4,
    code: "IMUL352",
    name: "Fundamentals of Interactive Multimedia Design/ Dasar-dasar Desain Multimedia Interaktif",
    credits: 3,
    type: "",
    prerequisite:
      "- [DVCM111] Design in Visualization and Communication - 3 credit(s)",
  },
  {
    number: 5,
    code: "SENG291",
    name: "Object Oriented Programming/ Pemrograman Berorientasi Objek",
    credits: 3,
    type: "",
    prerequisite:
      "- [SENG191] Computer Programming/ Pemrograman Komputer - 6 credit(s)",
  },
  {
    number: 6,
    code: "BIU204",
    name: "Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II",
    credits: 3,
    type: "",
    prerequisite:
      "- [BIU203] Bahasa Inggris Pra Menengah I / Pre-Intermediate English I - 3 credit(s)",
  },
  {
    number: 7,
    code: "FILG284",
    name: "Orang Muda dan Dunia/ Youth and the World",
    credits: 2,
    type: "",
    prerequisite:
      "- [FILG283] Prinsip-Prinsip Nilai Kristiani/ The Principles of Christian Values - 2 credit(s)",
  },
];

const tableData6 = [
  {
    number: 1,
    code: "ANIM324",
    name: "Motion Graphic in Computer Animation/ Grafik Gerak dalam Animasi Komputer",
    credits: 3,
    type: "",
    prerequisite: (
      <div>
        - [ANIM223] Introduction to Animation/ Pengantar Animasi - 3 credit(s)
        <br />- [DIPA271] Digital Painting And Coloring/ Pengecatan dan
        Pewarnaan digital - 3 credit(s)
      </div>
    ),
  },
  {
    number: 2,
    code: "MARK264",
    name: "Digital Marketing/ Pemasaran Digital",
    credits: 3,
    type: "",
    prerequisite:
      "- [IMUL352] Fundamentals of Interactive Multimedia Design/ Dasar-dasar Desain Multimedia Interaktif - 3 credit(s)",
  },
  {
    number: 3,
    code: "STOR315",
    name: "Storyboarding Preproduction/ Papan Alur Cerita Pre-produksi",
    credits: 3,
    type: "",
    prerequisite: (
      <div>
        - [ANIM223] Introduction to Animation/ Pengantar Animasi - 3 credit(s)
        <br />- [PRCR214] Principles of Creative Design/ Prinsip-prinsip Desain
        Kreatif - 3 credit(s)
      </div>
    ),
  },
  {
    number: 4,
    code: "CSAR331",
    name: "Web Design/ Perancangan Web",
    credits: 3,
    type: "",
    prerequisite:
      "- [SENG291] Object Oriented Programming/ Pemrograman Berorientasi Objek - 3 credit(s)",
  },
  {
    number: 5,
    code: "CTMS331",
    name: "Content Management System/ Sistem Manajemen Konten",
    credits: 3,
    type: "",
    prerequisite:
      "- [SENG291] Object Oriented Programming/ Pemrograman Berorientasi Objek - 3 credit(s)",
  },
  {
    number: 6,
    code: "COGR353",
    name: "Computer Graphic Development I/ Pengembangan Grafika Komputer I",
    credits: 3,
    type: "",
    prerequisite:
      "- [SENG291] Object Oriented Programming/ Pemrograman Berorientasi Objek - 3 credit(s)",
  },
  {
    number: 7,
    code: "FILG385",
    name: "Kehidupan Keluarga / Family Living",
    credits: 2,
    type: "",
    prerequisite:
      "- [FILG284] Orang Muda dan Dunia/ Youth and the World - 2 credit(s)",
  },
];

const tableData7 = [
  {
    number: 1,
    code: "SENG331",
    name: "Interaksi Manusia dan Komputer/ Human Computer Interaction",
    credits: 3,
    type: "-",
    prerequisite: (
      <div>
        - [SENG291] Object Oriented Programming/ Pemrograman Berorientasi Objek
        - 3 credit(s)
      </div>
    ),
  },

  {
    number: 2,
    code: "VIRE325",
    name: "Introduction to Virtual Reality and Augmented Reality/ Pengantar Realitas Virtual dan Augmented",
    credits: 3,
    type: "-",
    prerequisite: (
      <div>
        - [ANIM324] Motion Graphic in Computer Animation/ Grafik Gerak dalam
        Animasi Komputer - 3 credit(s)
      </div>
    ),
  },

  {
    number: 3,
    code: "PRAN325",
    name: "Production for Computer Animation/ Produksi untuk Animasi Komputer",
    credits: 3,
    type: "-",
    prerequisite: (
      <div>
        - [ANIM324] Motion Graphic in Computer Animation/ Grafik Gerak dalam
        Animasi Komputer - 3 credit(s)
        <br />- [DIPA271] Digital Painting And Coloring/ Pengecatan dan
        Pewarnaan digital - 3 credit(s)
        <br />- [STOR315] Storyboarding Preproduction/ Papan Alur Cerita
        Pre-produksi - 3 credit(s)
      </div>
    ),
  },

  {
    number: 4,
    code: "-",
    name: "Electives",
    credits: 3,
    type: "-",
    prerequisite: "-",
  },

  {
    number: 5,
    code: "VISA327",
    name: "Visual Effects and Animation in Film/ Efek Visual dan Animasi dalam Film",
    credits: 3,
    type: "-",
    prerequisite: (
      <div>
        - [ANIM324] Motion Graphic in Computer Animation/ Grafik Gerak dalam
        Animasi Komputer - 3 credit(s)
        <br />- [STOR315] Storyboarding Preproduction/ Papan Alur Cerita
        Pre-produksi - 3 credit(s)
      </div>
    ),
  },

  {
    number: 6,
    code: "COGR354",
    name: "Computer Graphic Development II/ Pengembangan Grafika Komputer II",
    credits: 3,
    type: "-",
    prerequisite: (
      <div>
        - [COGR353] Computer Graphic Development I/ Pengembangan Grafika
        Komputer I - 3 credit(s)
      </div>
    ),
  },

  {
    number: 7,
    code: "FILG386",
    name: "Kehidupan di Akhir Zaman/ End Time Living",
    credits: 2,
    type: "-",
    prerequisite: (
      <div>- [FILG385] Kehidupan Keluarga / Family Living - 2 credit(s)</div>
    ),
  },
];

const tableData8 = [
  {
    number: 1,
    code: "DIVA455",
    name: "Digital Video and Audio/ Video dan Audio Digital",
    credits: 3,
    type: "-",
    prerequisite:
      "- [PRAN325] Production for Computer Animation/ Produksi untuk Animasi Komputer - 3 credit(s)",
  },
  {
    number: 2,
    code: "PRJC415",
    name: "Project Management in visual design production/ Manajemen Proyek dalam produksi desain visual",
    credits: 3,
    type: "-",
    prerequisite:
      "- [PRAN325] Production for Computer Animation/ Produksi untuk Animasi Komputer - 3 credit(s)",
  },
  {
    number: 3,
    code: "DIGR428",
    name: "Lighting Render in Computer Animation/ Render pencahayaan dalam Animasi Komputer",
    credits: 3,
    type: "-",
    prerequisite:
      "- [VISA327] Visual Effects and Animation in Film/ Efek Visual dan Animasi dalam Film - 3 credit(s)",
  },
  {
    number: 4,
    code: "ADPI456",
    name: "Advanced Digital Picture Illustration/ Ilustrasi Gambar Digital Lanjutan",
    credits: 3,
    type: "-",
    prerequisite: (
      <div>
        - [VIRE325] Introduction to Virtual Reality and Augmented Reality/
        Pengantar Realitas Virtual dan Augmented - 3 credit(s)
        <br />- [VISA327] Visual Effects and Animation in Film/ Efek Visual dan
        Animasi dalam Film - 3 credit(s)
      </div>
    ),
  },
  {
    number: 5,
    code: "-",
    name: "Electives",
    credits: 3,
    type: "-",
    prerequisite: "-",
  },
  {
    number: 6,
    code: "PRJT416",
    name: "Computer Graphics Production Project I/Proyek I Produksi Grafika Komputer",
    credits: 3,
    type: "-",
    prerequisite:
      "- [PRAN325] Production for Computer Animation/ Produksi untuk Animasi Komputer - 3 credit(s)",
  },
  {
    number: 7,
    code: "TECH465",
    name: "Technopreneurship",
    credits: 2,
    type: "-",
    prerequisite:
      "- [MARK264] Digital Marketing/ Pemasaran Digital - 3 credit(s)",
  },
];

const tableData9 = [
  {
    number: 1,
    code: "PRJT417",
    name: "Computer Graphics Production Project II /Proyek II Produksi Grafika Komputer",
    credits: 3,
    type: "-",
    prerequisite:
      "- [PRJT416] Computer Graphics Production Project I/Proyek I Produksi Grafika Komputer - 3 credit(s)",
  },
  {
    number: 2,
    code: "INFD415",
    name: "Information Design/ Desain Informasi",
    credits: 3,
    type: "-",
    prerequisite:
      "- [ADPI456] Advanced Digital Picture Illustration/ Ilustrasi Gambar Digital Lanjutan - 3 credit(s)",
  },
  {
    number: 3,
    code: "MOBA441",
    name: "Mobile Application Development/ Pengembangan Aplikasi Mobile",
    credits: 3,
    type: "-",
    prerequisite: (
      <div>
        - [SENG291] Object Oriented Programming/ Pemrograman Berorientasi Objek
        - 3 credit(s)
        <br />- [PRJC415] Project Management in visual design production/
        Manajemen Proyek dalam produksi desain visual - 3 credit(s)
      </div>
    ),
  },
  {
    number: 4,
    code: "GAME432",
    name: "Game Programming/ Pemrograman Game",
    credits: 3,
    type: "-",
    prerequisite: (
      <div>
        - [SENG291] Object Oriented Programming/ Pemrograman Berorientasi Objek
        - 3 credit(s)
        <br />- [PRJC415] Project Management in visual design production/
        Manajemen Proyek dalam produksi desain visual - 3 credit(s)
      </div>
    ),
  },
  {
    number: 5,
    code: "-",
    name: "Elective",
    credits: 3,
    type: "-",
    prerequisite: "-",
  },
];

const tableData10 = [
  {
    number: 1,
    code: "VASR367",
    name: "Value Added Service",
    credits: 3,
    type: "-",
    prerequisite:
      "- [MARK264] Digital Marketing/ Pemasaran Digital - 3 credit(s)",
  },
  {
    number: 2,
    code: "PHOT472",
    name: "Photography/ Fotografi",
    credits: 3,
    type: "-",
    prerequisite:
      "- [VIRE325] Introduction to Virtual Reality and Augmented Reality/ Pengantar Realitas Virtual dan Augmented - 3 credit(s)",
  },
  {
    number: 3,
    code: "DSPR418",
    name: "Product Design/ Desain Produk",
    credits: 3,
    type: "-",
    prerequisite:
      "- [PRAN325] Production for Computer Animation/ Produksi untuk Animasi Komputer - 3 credit(s)",
  },
  {
    number: 4,
    code: "DTEC161",
    name: "Discovering Technology/ Mengenal Teknologi",
    credits: 3,
    type: "-",
    prerequisite:
      "- [ICGT162] Introduction to Computer Graphic Technology/ Pengantar Teknologi Komputer Grafik - 3 credit(s)",
  },
  {
    number: 5,
    code: "MMCS263",
    name: "Mass Media and Contemporary Society/ Media Massa dan Masyarakat Kontemporer",
    credits: 3,
    type: "-",
    prerequisite:
      "- [ICGT162] Introduction to Computer Graphic Technology/ Pengantar Teknologi Komputer Grafik - 3 credit(s)",
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

const CurriculumTeknologiInformasi = () => {
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

export default CurriculumTeknologiInformasi;
