import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
  maxWidth: "90%",
  "@media (max-width: 768px)": {
    maxWidth: "80%",
  },
  "@media (max-width: 480px)": {
    maxWidth: "80%",
  },
};

const style2 = {
  position: "fixed",
  top: "15%",
  right: "2%",
  width: 400,
  // bgcolor: "background.paper",
  boxShadow: 24,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
};

const TableItem = ({ data, selectedRows, handleCheckboxChange }) => (
  <TableRow>
    <TableCell>
      <Checkbox
        checked={selectedRows.includes(data)}
        onChange={(e) => handleCheckboxChange(e.target.checked, data)}
      />
    </TableCell>
    <TableCell>{data.number}</TableCell>
    <TableCell>{data.code}</TableCell>
    <TableCell>{data.name}</TableCell>
    <TableCell>{data.credits}</TableCell>
    <TableCell>{data.grades}</TableCell>
    <TableCell>{data.type}</TableCell>
    <TableCell>{data.prerequisite}</TableCell>
    <TableCell>{data.status}</TableCell>
  </TableRow>
);

const PreviewPopup = ({ open, onClose, previewRows }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Preview</DialogTitle>
      <DialogContent>
        {previewRows.length > 0 ? (
          <div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Number</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Subject Name</TableCell>
                    <TableCell>Credit(s)</TableCell>
                    <TableCell>Grades</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Prerequisite</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {previewRows.map((data, index = 1) => (
                    <TableRow key={data.number}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{data.code}</TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell>{data.credits}</TableCell>
                      <TableCell>{data.grades}</TableCell>
                      <TableCell>{data.type}</TableCell>
                      <TableCell>{data.prerequisite}</TableCell>
                      <TableCell>{data.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <div>
            <Typography>
              Tidak ada baris yang dipilih untuk ditampilkan.
            </Typography>
          </div>
        )}
        <Button
          onClick={onClose}
          color="primary"
          sx={{
            marginTop: 2,
            color: "white",
            backgroundColor: "#006AF5",

            "&:hover": {
              backgroundColor: "#025ED8",
            },
          }}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const Popup = ({ open, onClose, selectedRows, totalCredits, tableData }) => {
  const [previewRows, setPreviewRows] = useState([]);
  const [showPreviewPopup, setShowPreviewPopup] = useState(false);
  const [divVisible, setDivVisible] = useState(false);

  const handleShowPreview = () => {
    const selectedData = tableData.filter((data) =>
      selectedRows.includes(data)
    );
    setPreviewRows(selectedData);
    setDivVisible(true);
  };

  const handleClosePreview = () => {
    setDivVisible(false);
    setShowPreviewPopup(false);
  };

  useEffect(() => {
    const handleCheckboxChange = () => {
      if (selectedRows.length > 0) {
        setDivVisible(true);
      } else {
        setDivVisible(false);
      }
    };

    window.addEventListener("change", handleCheckboxChange);

    return () => {
      window.removeEventListener("change", handleCheckboxChange);
    };
  }, [selectedRows]);

  return (
    <div>
      <PreviewPopup
        open={showPreviewPopup}
        onClose={handleClosePreview}
        previewRows={previewRows}
      />
      {divVisible && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            borderRadius: 10,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            padding: "10px",
            boxShadow: "20",
            zIndex: 999,
          }}
        >
          <div open={open} onClose={onClose}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <div>
                {selectedRows.length} courses selected, {totalCredits} credits.
              </div>
              <Button
                size="small"
                onClick={() => {
                  handleShowPreview();
                  setShowPreviewPopup(true);
                }}
                sx={{
                  color: "white",
                  backgroundColor: "#006AF5",

                  "&:hover": {
                    backgroundColor: "#025ED8",
                  },
                }}
              >
                See Preview <ArrowRightAltIcon />
              </Button>
            </div>
            <PreviewPopup
              open={showPreviewPopup}
              onClose={() => setShowPreviewPopup(false)}
              previewRows={previewRows}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const tableData1 = [
  {
    number: 1,
    code: "MATH000",
    name: "Matematika/ Mathematics",
    credits: 2,
    grades: "78",
    type: "Pre-requisite",
    prerequisite: "-",
    status: "Pass",
  },
  {
    number: 2,
    code: "COPS000",
    name: "Keterampilan Komputer Dasar/ Basic Computer Skill",
    credits: 3,
    grades: "81",
    type: "Pre-requisite",
    prerequisite: "-",
    status: "Pass",
  },
  {
    number: 3,
    code: "WEDU001",
    name: "Pendidikan Keterampilan/ Work Education",
    credits: 1,
    grades: "83",
    type: "Pre-requisite",
    prerequisite: "-",
    status: "Pass",
  },
  {
    number: 4,
    code: "BIU000",
    name: "Bahasa Inggris Pemula/ Basic English",
    credits: 3,
    grades: "92",
    type: "Pre-requisite",
    prerequisite: "-",
    status: "Pass",
  },
  {
    number: 5,
    code: "LMTR999",
    name: "Mata Kuliah Pembatas/ Limiter Subject",
    credits: 1,
    grades: "90",
    type: "Pre-requisite",
    prerequisite: "-",
    status: "Pass",
  },
];

const tableData2 = [
  {
    number: 1,
    code: "FILG181",
    name: "Teladan Kehidupan I/ The Exemplary Living I",
    credits: 2,
    grades: "81",
    type: "General",
    prerequisite: "-",
    status: "Pass",
  },
  {
    number: 2,
    code: "GEN001",
    name: "Bahasa Inggris Dasar I/ Elementary English I",
    credits: 3,
    grades: "100",
    type: "General",
    prerequisite:
      "- [LMTR999] Mata Kuliah Pembatas/ Limiter Subject - 1 credit(s)",
    status: "Pass",
  },
  {
    number: 3,
    code: "IF1111",
    name: "Pengantar Komputer/ Introduction to Computing",
    credits: 3,
    grades: "20",
    type: "Basic",
    prerequisite: "-",
    status: "Failed",
  },
  {
    number: 4,
    code: "IS1113",
    name: "Pemrograman Komputer/ Computer Programming",
    credits: 6,
    grades: "79",
    type: "Major",
    prerequisite: "-",
    status: "Pass",
  },
  {
    number: 5,
    code: "IF1112",
    name: "Dasar Aljabar Linear/ Aljabar Linear Fundamental",
    credits: 3,
    grades: "89",
    type: "Basic",
    prerequisite: "-",
    status: "Pass",
  },
  {
    number: 6,
    code: "BIU101",
    name: "Bahasa Inggris Pra Dasar/ Pre-Elementary English",
    credits: 3,
    grades: "90",
    type: "General",
    prerequisite:
      "- [BIU000] Bahasa Inggris Pemula/ Basic English - 3 credit(s)",
    status: "Pass",
  },
];

const tableData3 = [
  {
    number: 1,
    code: "FILG182",
    name: "Teladan Kehidupan II/ The Exemplary Living II",
    credits: 2,
    type: "General",
    prerequisite:
      "- [FILG181] Teladan Kehidupan I/ The Exemplary Living I - 2 credit(s)",
  },
  {
    number: 2,
    code: "IS1221",
    name: "Matematika Diskrit/ Discrete Mathematics",
    credits: 3,
    type: "Basic",
    prerequisite: "- [MATH000] Matematika/ Mathematics - 2 credit(s)",
  },
  {
    number: 3,
    code: "IF1222",
    name: "Kalkulus/ Calculus",
    credits: 3,
    type: "Basic",
    prerequisite: "- [MATH000] Matematika/ Mathematics - 2 credit(s)",
  },
  {
    number: 4,
    code: "IF1223",
    name: "Logika Informatika/ Informatics Logic",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IF1111] Pengantar Komputer/ Introduction to Computing - 3 credit(s)",
  },
  {
    number: 5,
    code: "IS1224",
    name: "Struktur Data dan Algoritma/ Data Structure and Algorithms",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS1113] Pemrograman Komputer/ Computer Programming - 6 credit(s)",
  },
  {
    number: 6,
    code: "BIU102",
    name: "Bahasa Inggris Dasar/ Elementary English",
    credits: 3,
    type: "General",
    prerequisite:
      "- [BIU101] Bahasa Inggris Pra Dasar/ Pre-Elementary English - 3 credit(s)",
  },
  {
    number: 7,
    code: "EDU112",
    name: "Filsafat Pendidikan Kristen/ Philosophy of Christian Education",
    credits: 2,
    type: "General",
    prerequisite: "-",
  },
];

const tableData4 = [
  {
    number: 1,
    code: "GEN101",
    name: "Bahasa Inggris Pra Menengah I / Pre-Inter English I",
    credits: 3,
    type: "General",
    prerequisite: (
      <div>
        - [GEN002] Bahasa Inggris Dasar II/ Elementary English II - 3 credit(s)
        <br />- [LMTR999] Mata Kuliah Pembatas/ Limiter Subject - 1 credit(s)
      </div>
    ),
  },
  {
    number: 2,
    code: "FILG283",
    name: "Prinsip-Prinsip Nilai Kristiani/ The Principles of Christian Values",
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
    code: "IF2131",
    name: "Organisasi dan Arsitektur Komputer/ Computer Organization and Architecture",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IF1223] Logika Informatika/ Informatics Logic - 3 credit(s)
        <br />- [IF1111] Pengantar Komputer/ Introduction to Computing - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 5,
    code: "IS2133",
    name: "Pengantar Basisdata/ Introduction to Database",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IF1111] Pengantar Komputer/ Introduction to Computing - 3 credit(s)",
  },
  {
    number: 6,
    code: "IS2134",
    name: "Statistik dan Probabilitas/ Statistics and Probability",
    credits: 3,
    type: "Major",
    prerequisite: "- [MATH000] Matematika/ Mathematics - 2 credit(s)",
  },
  {
    number: 7,
    code: "IS2132",
    name: "Perancangan Web/ Web Design",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS1224] Struktur Data dan Algoritma/ Data Structure and Algorithms - 3 credit(s)",
  },
  {
    number: 8,
    code: "BIU203",
    name: "Bahasa Inggris Pra Menengah I / Pre-Intermediate English I",
    credits: 3,
    type: "General",
    prerequisite:
      "- [BIU000] Bahasa Inggris Pemula/ Basic English - 3 credit(s)",
  },
  {
    number: 9,
    code: "BIU203",
    name: "Bahasa Inggris Pra Menengah I / Pre-Intermediate English I",
    credits: 3,
    type: "General",
    prerequisite:
      "- [GEN002] Bahasa Inggris Dasar II/ Elementary English II - 3 credit(s)",
  },
];

const tableData5 = [
  {
    number: 1,
    code: "GEN102",
    name: "Bahasa Inggris Pra Menengah II / Pre-Inter English II",
    credits: 3,
    type: "General",
    prerequisite: (
      <div>
        - [GEN101] Bahasa Inggris Pra Menengah I / Pre-Inter English I - 3
        credit(s)
        <br />- [LMTR999] Mata Kuliah Pembatas/ Limiter Subject - 1 credit(s)
      </div>
    ),
  },
  {
    number: 2,
    code: "FILG284",
    name: "Orang Muda dan Dunia/ Youth and the World",
    credits: 2,
    type: "General",
    prerequisite:
      "- [FILG283] Prinsip-Prinsip Nilai Kristiani/ The Principles of Christian Values - 2 credit(s)",
  },
  {
    number: 3,
    code: "IF2243",
    name: "Jaringan Komputer I/ Computer Network I",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IF2131] Organisasi dan Arsitektur Komputer/ Computer Organization and Architecture - 3 credit(s)",
  },
  {
    number: 4,
    code: "IF2244",
    name: "Sistem Cerdas/ Expert System",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [MATH000] Matematika/ Mathematics - 2 credit(s)
        <br />- [IS1221] Matematika Diskrit/ Discrete Mathematics - 3 credit(s)
      </div>
    ),
  },
  {
    number: 5,
    code: "IF2245",
    name: "Teori Bahasa dan Automata/ Language and Automata Theory",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS1221] Matematika Diskrit/ Discrete Mathematics - 3 credit(s)",
  },
  {
    number: 6,
    code: "IS2241",
    name: "Sistem Manajemen Basisdata/ Database Management System",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS2133] Pengantar Basisdata/ Introduction to Database - 3 credit(s)",
  },
  {
    number: 7,
    code: "IS2243",
    name: "Pemrograman Berorientasi Objek/ Object Oriented Programming",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS1113] Pemrograman Komputer/ Computer Programming - 6 credit(s)",
  },
  {
    number: 8,
    code: "BIU204",
    name: "Bahasa Inggris Pra Menengah II / Pre-Intermediate English II",
    credits: 3,
    type: "General",
    prerequisite:
      "- [BIU203] Bahasa Inggris Pra Menengah I / Pre-Intermediate English I - 3 credit(s)",
  },
  {
    number: 9,
    code: "BIU204",
    name: "Bahasa Inggris Pra Menengah II / Pre-Intermediate English II",
    credits: 3,
    type: "General",
    prerequisite:
      "- [GEN101] Bahasa Inggris Pra Menengah I / Pre-Inter English I - 3 credit(s)",
  },
];

const tableData6 = [
  {
    number: 1,
    code: "FILG385",
    name: "Kehidupan Keluarga / Family Living",
    credits: 2,
    type: "General",
    prerequisite:
      "- [FILG284] Orang Muda dan Dunia/ Youth and the World - 2 credit(s)",
  },
  {
    number: 2,
    code: "IF3156",
    name: "Jaringan Komputer II/ Computer Network II",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IF2243] Jaringan Komputer I/ Computer Network I - 3 credit(s)",
  },
  {
    number: 3,
    code: "IF3155",
    name: "Pemrograman Visual/ Visual Programming",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS2243] Pemrograman Berorientasi Objek/ Object Oriented Programming - 3 credit(s)",
  },
  {
    number: 4,
    code: "IS3151",
    name: "Pengembangan Web Front-End/ Front-End Web Development",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS2243] Pemrograman Berorientasi Objek/ Object Oriented Programming - 3 credit(s)",
  },
  {
    number: 5,
    code: "IS3152",
    name: "Analisis dan Perancangan Sistem/ System Analysis and Design",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS1113] Pemrograman Komputer/ Computer Programming - 6 credit(s)",
  },
  {
    number: 6,
    code: "IF3153",
    name: "Konsep Sistem Operasi/ Operating System Concept",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IF2131] Organisasi dan Arsitektur Komputer/ Computer Organization and Architecture - 3 credit(s)",
  },
  {
    number: 7,
    code: "IS3262",
    name: "Interaksi Manusia dan Komputer/ Human and Computer Interaction",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS2243] Pemrograman Berorientasi Objek/ Object Oriented Programming - 3 credit(s)",
  },
];

const tableData7 = [
  {
    number: 1,
    code: "FILG386",
    name: "Kehidupan di Akhir Zaman/ End Time Living",
    credits: 2,
    type: "General",
    prerequisite:
      "- [FILG385] Kehidupan Keluarga / Family Living - 2 credit(s)",
  },
  {
    number: 2,
    code: "IF3266",
    name: "Grafika Komputer/ Computer Graphics",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS2243] Pemrograman Berorientasi Objek/ Object Oriented Programming - 3 credit(s)",
  },
  {
    number: 3,
    code: "IF3262",
    name: "Pengembangan Web Back-End/ Back-End Web Development",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS3151] Pengembangan Web Front-End/ Front-End Web Development - 3 credit(s)",
  },
  {
    number: 4,
    code: "IF3263",
    name: "Kecerdasan Buatan/ Artificial Intelligencetan/ Artificial Intelligence",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IF2244] Sistem Cerdas/ Expert System - 3 credit(s)
        <br />- [IS1224] Struktur Data dan Algoritma/ Data Structure and
        Algorithms - 3 credit(s)
      </div>
    ),
  },
  {
    number: 5,
    code: "IF3264",
    name: "Rekayasa Perangkat Lunak/ Software Engineering",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS3152] Analisis dan Perancangan Sistem/ System Analysis and Design -
        3 credit(s)
        <br />- [IS3262] Interaksi Manusia dan Komputer/ Human and Computer
        Interaction - 3 credit(s)
      </div>
    ),
  },
  {
    number: 6,
    code: "IS3261",
    name: "Pengembangan Perangkat Bergerak/ Mobile Application Development",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IS3262] Interaksi Manusia dan Komputer/ Human and Computer Interaction - 3 credit(s)",
  },
  {
    number: 7,
    code: "IS3265",
    name: "Metodologi Penelitian/ Research Method",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IS3152] Analisis dan Perancangan Sistem/ System Analysis and Design -
        3 credit(s)
        <br />- [IS2134] Statistik dan Probabilitas/ Statistics and Probability
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
      <div>
        - [IS3265] Metodologi Penelitian/ Research Method - 3 credit(s)
        <br />- [IF3264] Rekayasa Perangkat Lunak/ Software Engineering - 3
        credit(s)
      </div>
    ),
  },
  {
    number: 2,
    code: "IS2245",
    name: "Penulisan Ilmiah/ Scientific Writing",
    credits: 2,
    type: "Major",
    prerequisite:
      "- [IS2133] Pengantar Basisdata/ Introduction to Database - 3 credit(s)",
  },
  {
    number: 3,
    code: "IF4172",
    name: "Pengantar Pengembangan Game/ Introduction to Game Development",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IF3155] Pemrograman Visual/ Visual Programming - 3 credit(s)",
  },
  {
    number: 4,
    code: "IF4173",
    name: "Pemrograman Sistem/ System Programming",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IF1223] Logika Informatika/ Informatics Logic - 3 credit(s)
        <br />- [IF2131] Organisasi dan Arsitektur Komputer/ Computer
        Organization and Architecture - 3 credit(s)
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
    prerequisite: "- [IS4171] Skripsi I/ Research Project I - 3 credit(s)",
  },
  {
    number: 2,
    code: "IF4282",
    name: "Robotika/ Robotics",
    credits: 3,
    type: "Major",
    prerequisite: (
      <div>
        - [IF2131] Organisasi dan Arsitektur Komputer/ Computer Organization and
        Architecture - 3 credit(s)
        <br />- [IF1223] Logika Informatika/ Informatics Logic - 3 credit(s)
      </div>
    ),
  },
  {
    number: 3,
    code: "IS2242",
    name: "Kewirausahaan/ Entrepreneur - Project Capstone",
    credits: 3,
    type: "Major",
    prerequisite:
      "- [IF3264] Rekayasa Perangkat Lunak/ Software Engineering - 3 credit(s)",
  },
  {
    number: 4,
    code: "IF4174",
    name: "Etika Komputer/ Computer Ethics",
    credits: 2,
    type: "Major",
    prerequisite: (
      <div>
        - [IF1111] Pengantar Komputer/ Introduction to Computing - 3 credit(s)
        <br />- [IF2244] Sistem Cerdas/ Expert System - 3 credit(s)
      </div>
    ),
  },
];

const tableData10 = [
  {
    number: 1,
    code: "IF4291",
    name: "Desain untuk Visualisasi dan Komputer/ Design for Visualization and Communication",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [IF4172] Pengantar Pengembangan Game/ Introduction to Game Development - 3 credit(s)",
  },
  {
    number: 2,
    code: "IF4282",
    name: "Pemrograman Game/Game Programming",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [IF4172] Pengantar Pengembangan Game/ Introduction to Game Development - 3 credit(s)",
  },
  {
    number: 3,
    code: "IF4191",
    name: "Pengantar Animasi/ Introduction to Animation",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [IF3266] Grafika Komputer/ Computer Graphics - 3 credit(s)",
  },
  {
    number: 4,
    code: "IF4192",
    name: "Prinsip-Prinsip Desain Kreatif/ Principles of Creative Design",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [IF3266] Grafika Komputer/ Computer Graphics - 3 credit(s)",
  },
  {
    number: 5,
    code: "IF4294",
    name: "Pemrosesan Bahasa Alami/ Natural Language Processing",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [IS3154] Penambangan dan Pergudangan Data/ Data Mining and Warehousing - 3 credit(s)",
  },
  {
    number: 6,
    code: "IS3154",
    name: "Penambangan dan Pergudangan Data/ Data Mining and Warehousing",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [IS2241] Sistem Manajemen Basisdata/ Database Management System - 3 credit(s)",
  },
  {
    number: 7,
    code: "IF4293",
    name: "Pembelajaran Mesin/ Machine Learning",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [IF3263] Kecerdasan Buatan/ Artificial Intelligence - 3 credit(s)",
  },
  {
    number: 8,
    code: "IF4194",
    name: "Pencarian Informasi/ Information Retrieval",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [IS3154] Penambangan dan Pergudangan Data/ Data Mining and Warehousing - 3 credit(s)",
  },
  {
    number: 9,
    code: "IF4195",
    name: "Manajemen Proyek/ Project Management",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [IF3262] Pengembangan Web Back-End/ Back-End Web Development - 3 credit(s)",
  },
  {
    number: 10,
    code: "IF4196",
    name: "Internet untuk Segala/ Internet of Things",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [IF3262] Pengembangan Web Back-End/ Back-End Web Development - 3 credit(s)",
  },
  {
    number: 11,
    code: "IF4295",
    name: "Teknik Cloud/ Cloud Engineering",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [IF3262] Pengembangan Web Back-End/ Back-End Web Development - 3 credit(s)",
  },
  {
    number: 12,
    code: "IF4296",
    name: "Rekayasa DevOps/ DevOps Engineering",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [IF3262] Pengembangan Web Back-End/ Back-End Web Development - 3 credit(s)",
  },
  {
    number: 13,
    code: "CNET402",
    name: "Jaringan Nirkabel dan Perangkat Bergerak/ Wireless and Mobile Networks",
    credits: 3,
    type: "Elective",
    prerequisite: "-",
  },
  {
    number: 14,
    code: "BENG310",
    name: "Bahasa Inggris Bisnis Membaca dan Kosakata/ Business English Reading and Vocabulary",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
  },
  {
    number: 15,
    code: "BENG330",
    name: "Komunikasi Bisnis Bahasa Inggris/ Business English Communication",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
  },
  {
    number: 16,
    code: "BBEN320",
    name: "Korespondensi Bisnis Bahasa Inggris/ Business English Correspondence",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
  },
  {
    number: 17,
    code: "ELIT271",
    name: "Studi Literatur I/ Literature Studies I",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
  },
  {
    number: 18,
    code: "BIU305",
    name: "Bahasa Inggris Menengah I/ Intermediate English I",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II - 3 credit(s)",
  },
  {
    number: 19,
    code: "BIU305",
    name: "Bahasa Inggris Menengah I/ Intermediate English I",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
  },
  {
    number: 20,
    code: "BIU306",
    name: "Bahasa Inggris Menengah II/ Intermediate English II",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II - 3 credit(s)",
  },
  {
    number: 21,
    code: "GEN306",
    name: "Bahasa Inggris Menengah Atas II/ Upper-Inter English II",
    credits: 3,
    type: "Elective",
    prerequisite: (
      <div>
        - [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3
        credit(s)
        <br />- [LMTR999] Mata Kuliah Pembatas/ Limiter Subject - 1 credit(s)
      </div>
    ),
  },
  {
    number: 22,
    code: "ESP401",
    name: "Bahasa Inggris Bisnis Membaca dan Kosakata/ Business English Reading and Vocabulary",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II - 3 credit(s)",
  },
  {
    number: 23,
    code: "ESP401",
    name: "Bahasa Inggris Bisnis Membaca dan Kosakata/ Business English Reading and Vocabulary",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
  },
  {
    number: 24,
    code: "ESP402",
    name: "Korespondensi Bisnis Bahasa Inggris/ Business English Correspondence",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II - 3 credit(s)",
  },
  {
    number: 25,
    code: "ESP402",
    name: "Korespondensi Bisnis Bahasa Inggris/ Business English Correspondence",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
  },
  {
    number: 26,
    code: "ESP403",
    name: "Komunikasi Bisnis Bahasa Inggris/ Business English Communication",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II - 3 credit(s)",
  },
  {
    number: 27,
    code: "ESP403",
    name: "Komunikasi Bisnis Bahasa Inggris/ Business English Communication",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
  },
  {
    number: 28,
    code: "ENG433",
    name: "Penulisan Akademik Bahasa Inggris III/ Academic English Writing III",
    credits: 3,
    type: "Elective",
    prerequisite:
      "- [BIU204] Bahasa Inggris Pra Menengah II/ Pre-Intermediate English II - 3 credit(s)",
  },
  {
    number: 29,
    code: "BIU306",
    name: "Bahasa Inggris Menengah II/ Intermediate English II",
    credits: 3,
    type: "General",
    prerequisite:
      "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
  },
  {
    number: 30,
    code: "ENG433",
    name: "Penulisan Akademik Bahasa Inggris III/ Academic English Writing III",
    credits: 3,
    type: "General",
    prerequisite:
      "- [GEN102] Bahasa Inggris Pra Menengah II/ Pre-Inter English II - 3 credit(s)",
  },
  {
    number: 31,
    code: "MG4191",
    name: "Pengalaman Kerja di Industri Teknologi Informasi/ Industrial Experience in Information Technology",
    credits: 8,
    type: "Elective",
    prerequisite: "-",
  },
  {
    number: 32,
    code: "MG4192",
    name: "Pengalaman Praktek di Bidang Teknologi Informasi/ Information Technology Practice in Industrial Experience",
    credits: 8,
    type: "Elective",
    prerequisite: "-",
  },
  {
    number: 33,
    code: "MG4193",
    name: "Pengembangan profesional di Industri Teknologi InformasiDevelopment in Information Technology Industry/ Professional Development in Information Technology Industry",
    credits: 4,
    type: "Elective",
    prerequisite: "-",
  },
  {
    number: 34,
    code: "SI42901",
    name: "Mata Kuliah Pilihan untuk Studi Independen 1/ Elective Course for Specific Independent Study 1/",
    credits: 8,
    type: "Elective",
    prerequisite: "-",
  },
  {
    number: 35,
    code: "SI42902",
    name: "Mata Kuliah Pilihan untuk Studi Independen 2/ Elective Course for Specific Independent Study 2",
    credits: 8,
    type: "Elective",
    prerequisite: "-",
  },
  {
    number: 36,
    code: "SI42903",
    name: "Mata Kuliah Pilihan untuk Studi Independen 3/ Elective Course for Specific Independent Study 3",
    credits: 4,
    type: "Elective",
    prerequisite: "-",
  },
  {
    number: 37,
    code: "SI42905",
    name: "Mata Kuliah Pilihan untuk Studi Independen 5/ Elective Course for Specific Independent Study 5",
    credits: 3,
    type: "Elective",
    prerequisite: "-",
  },
  {
    number: 38,
    code: "SI42904",
    name: "Mata Kuliah Pilihan untuk Studi Independen 4/ Elective Course for Specific Independent Study 4",
    credits: 4,
    type: "Elective",
    prerequisite: "-",
  },
  {
    number: 39,
    code: "SI42906",
    name: "Mata Kuliah Pilihan untuk Studi Independen 6/ Elective Course for Specific Independent Study 6",
    credits: 3,
    type: "Elective",
    prerequisite: "-",
  },
  {
    number: 40,
    code: "SI42907",
    name: "Mata Kuliah Pilihan untuk Studi Independen 7/ Elective Course for Specific Independent Study 7",
    credits: 3,
    type: "Elective",
    prerequisite: "-",
  },
  {
    number: 41,
    code: "SI42908",
    name: "Mata Kuliah Pilihan untuk Studi Independen 8/ Elective Course for Specific Independent Study 8",
    credits: 2,
    type: "Elective",
    prerequisite: "-",
  },
  {
    number: 42,
    code: "SI42909",
    name: "Mata Kuliah Pilihan untuk Studi Independen 9/ Elective Course for Specific Independent Study 9",
    credits: 2,
    type: "Elective",
    prerequisite: "-",
  },
  {
    number: 43,
    code: "SI42910",
    name: "Mata Kuliah Pilihan untuk Studi Independen 10/ Elective Course for Specific Independent Study 10",
    credits: 1,
    type: "Elective",
    prerequisite: "-",
  },
  {
    number: 44,
    code: "SI42911",
    name: "Mata Kuliah Pilihan untuk Studi Independen 11/ Elective Course for Specific Independent Study 11",
    credits: 1,
    type: "Elective",
    prerequisite: "-",
  },
  {
    number: 45,
    code: "SI42912",
    name: "Mata Kuliah Pilihan untuk Studi Independen 12/ Elective Course for Specific Independent Study 12",
    credits: 20,
    type: "Elective",
    prerequisite: "-",
  },
];

const PreRegistration = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const [openFirstModal, setOpenFirstModal] = React.useState(false);
  const [openSecondModal, setOpenSecondModal] = React.useState(false);

  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSecondModal = () => setOpenSecondModal(true);
  const handleCloseSecondModal = () => setOpenSecondModal(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseSecondModal();
    }, 5000); // 5000 ms = 5 detik

    return () => {
      clearTimeout(timer);
    };
  }, [handleOpenSecondModal]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const labelElement = document.getElementById("certificate-label");
    if (labelElement) {
      labelElement.style.border = "0.5px solid #BCBCBC";
    }

    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName("");
    }
  };

  const handleSubmitFirstModal = () => {
    handleCloseFirstModal();
    handleOpenSecondModal();
  };

  const handleCheckboxChange = (isChecked, data) => {
    let updatedSelectedRows = [...selectedRows];
    let updatedTotalCredits = totalCredits;

    if (isChecked) {
      updatedSelectedRows.push(data);
      updatedTotalCredits += data.credits;
    } else {
      updatedSelectedRows = updatedSelectedRows.filter((row) => row !== data);
      updatedTotalCredits -= data.credits;

      setShowButton(true);
    }

    setSelectedRows(updatedSelectedRows);
    setTotalCredits(updatedTotalCredits);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div>
        <Typography
          sx={{ fontSize: "24px", fontWeight: 500, paddingBottom: 2 }}
        >
          Courses Pre-registration
        </Typography>
        <Paper
          sx={{
            backgroundColor: "rgba(255, 204, 0, 0.1)",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "50px",
            marginBottom: "15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">
            Not yet filled out KHS <br /> <br />
            Date of KRS Filling: September 09, 2023 - September 12, 2023, at
            19.00
          </Typography>
          <WarningAmberIcon sx={{ color: "#FFCC00", fontSize: "42px" }} />
        </Paper>
        <Paper
          sx={{
            backgroundColor: "rgba(0, 106, 245, 0.1)",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "50px",
            marginBottom: "50px",
          }}
        >
          <Typography variant="body1">
            Attention!
            <br />
            <br /> Every student is required to pre-register for courses for the
            next semester. <br />
            <br />
            Please pay close attention to the courses that have been taken
            before and those that will be taken afterwards, so that there is no
            clash of course schedules and can plan lectures more effectively.
            <br />
            <br /> It must be noted that each student can only fill in
            pre-registration courses limited to 20 credits. No more than that.
          </Typography>
        </Paper>
      </div>
      <div>
        <Popup
          open={showPopup}
          onClose={() => setShowPopup(false)}
          selectedRows={selectedRows}
          totalCredits={totalCredits}
          tableData={tableData1}
        />
      </div>
      <div sx={{ paddingTop: "2" }}>
        <TableContainer
          sx={{
            overflow: "auto",
            backgroundColor: "white",
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
              <TableRow>
                <TableCell sx={{ width: "50px" }}> </TableCell>
                <TableCell sx={{ width: "20px" }}>Number</TableCell>
                <TableCell sx={{ width: "110px" }}>Code</TableCell>
                <TableCell sx={{ width: "400px" }}>Subject Name</TableCell>
                <TableCell sx={{ width: "150px" }}>Credit(s)</TableCell>
                <TableCell sx={{ width: "80px" }}>Grades</TableCell>
                <TableCell sx={{ width: "120px" }}>Type</TableCell>
                <TableCell sx={{ width: "400px" }}>Prerequisite</TableCell>
                <TableCell sx={{ width: "10px" }}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tableData1.map((data, index) => (
                <TableItem
                  key={index}
                  data={data}
                  selectedRows={selectedRows}
                  handleCheckboxChange={handleCheckboxChange}
                />
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
                  SEMESTER 1
                </Typography>
              </div>
            </TableBody>
          </Table>
          <Table>
            <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
              <TableRow>
                <TableCell sx={{ width: "50px" }}> </TableCell>
                <TableCell sx={{ width: "20px" }}>Number</TableCell>
                <TableCell sx={{ width: "110px" }}>Code</TableCell>
                <TableCell sx={{ width: "400px" }}>Subject Name</TableCell>
                <TableCell sx={{ width: "150px" }}>Credit(s)</TableCell>
                <TableCell sx={{ width: "80px" }}>Grades</TableCell>
                <TableCell sx={{ width: "120px" }}>Type</TableCell>
                <TableCell sx={{ width: "400px" }}>Prerequisite</TableCell>
                <TableCell sx={{ width: "10px" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            {tableData2.map((data, index) => (
              <TableItem
                key={index}
                data={data}
                selectedRows={selectedRows}
                handleCheckboxChange={handleCheckboxChange}
              />
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
                SEMESTER 2
              </Typography>
            </div>
          </Table>
          <Table>
            <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
              <TableRow>
                <TableCell sx={{ width: "50px" }}> </TableCell>
                <TableCell sx={{ width: "20px" }}>Number</TableCell>
                <TableCell sx={{ width: "110px" }}>Code</TableCell>
                <TableCell sx={{ width: "400px" }}>Subject Name</TableCell>
                <TableCell sx={{ width: "150px" }}>Credit(s)</TableCell>
                <TableCell sx={{ width: "80px" }}>Grades</TableCell>
                <TableCell sx={{ width: "120px" }}>Type</TableCell>
                <TableCell sx={{ width: "400px" }}>Prerequisite</TableCell>
                <TableCell sx={{ width: "10px" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            {tableData3.map((data, index) => (
              <TableItem
                key={index}
                data={data}
                selectedRows={selectedRows}
                handleCheckboxChange={handleCheckboxChange}
              />
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
                SEMESTER 3
              </Typography>
            </div>
          </Table>
          <Table>
            <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
              <TableRow>
                <TableCell sx={{ width: "50px" }}> </TableCell>
                <TableCell sx={{ width: "20px" }}>Number</TableCell>
                <TableCell sx={{ width: "110px" }}>Code</TableCell>
                <TableCell sx={{ width: "400px" }}>Subject Name</TableCell>
                <TableCell sx={{ width: "150px" }}>Credit(s)</TableCell>
                <TableCell sx={{ width: "80px" }}>Grades</TableCell>
                <TableCell sx={{ width: "120px" }}>Type</TableCell>
                <TableCell sx={{ width: "400px" }}>Prerequisite</TableCell>
                <TableCell sx={{ width: "10px" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            {tableData4.map((data, index) => (
              <TableItem
                key={index}
                data={data}
                selectedRows={selectedRows}
                handleCheckboxChange={handleCheckboxChange}
              />
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
                SEMESTER 4
              </Typography>
            </div>
          </Table>
          <Table>
            <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
              <TableRow>
                <TableCell sx={{ width: "50px" }}> </TableCell>
                <TableCell sx={{ width: "20px" }}>Number</TableCell>
                <TableCell sx={{ width: "110px" }}>Code</TableCell>
                <TableCell sx={{ width: "400px" }}>Subject Name</TableCell>
                <TableCell sx={{ width: "150px" }}>Credit(s)</TableCell>
                <TableCell sx={{ width: "80px" }}>Grades</TableCell>
                <TableCell sx={{ width: "120px" }}>Type</TableCell>
                <TableCell sx={{ width: "400px" }}>Prerequisite</TableCell>
                <TableCell sx={{ width: "10px" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            {tableData5.map((data, index) => (
              <TableItem
                key={index}
                data={data}
                selectedRows={selectedRows}
                handleCheckboxChange={handleCheckboxChange}
              />
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
                SEMESTER 5
              </Typography>
            </div>
          </Table>
          <Table>
            <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
              <TableRow>
                <TableCell sx={{ width: "50px" }}> </TableCell>
                <TableCell sx={{ width: "20px" }}>Number</TableCell>
                <TableCell sx={{ width: "110px" }}>Code</TableCell>
                <TableCell sx={{ width: "400px" }}>Subject Name</TableCell>
                <TableCell sx={{ width: "150px" }}>Credit(s)</TableCell>
                <TableCell sx={{ width: "80px" }}>Grades</TableCell>
                <TableCell sx={{ width: "120px" }}>Type</TableCell>
                <TableCell sx={{ width: "400px" }}>Prerequisite</TableCell>
                <TableCell sx={{ width: "10px" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            {tableData6.map((data, index) => (
              <TableItem
                key={index}
                data={data}
                selectedRows={selectedRows}
                handleCheckboxChange={handleCheckboxChange}
              />
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
                SEMESTER 6
              </Typography>
            </div>
          </Table>
          <Table>
            <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
              <TableRow>
                <TableCell sx={{ width: "50px" }}> </TableCell>
                <TableCell sx={{ width: "20px" }}>Number</TableCell>
                <TableCell sx={{ width: "110px" }}>Code</TableCell>
                <TableCell sx={{ width: "400px" }}>Subject Name</TableCell>
                <TableCell sx={{ width: "150px" }}>Credit(s)</TableCell>
                <TableCell sx={{ width: "80px" }}>Grades</TableCell>
                <TableCell sx={{ width: "120px" }}>Type</TableCell>
                <TableCell sx={{ width: "400px" }}>Prerequisite</TableCell>
                <TableCell sx={{ width: "10px" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            {tableData7.map((data, index) => (
              <TableItem
                key={index}
                data={data}
                selectedRows={selectedRows}
                handleCheckboxChange={handleCheckboxChange}
              />
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
                SEMESTER 7
              </Typography>
            </div>
          </Table>
          <Table>
            <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
              <TableRow>
                <TableCell sx={{ width: "50px" }}> </TableCell>
                <TableCell sx={{ width: "20px" }}>Number</TableCell>
                <TableCell sx={{ width: "110px" }}>Code</TableCell>
                <TableCell sx={{ width: "400px" }}>Subject Name</TableCell>
                <TableCell sx={{ width: "150px" }}>Credit(s)</TableCell>
                <TableCell sx={{ width: "80px" }}>Grades</TableCell>
                <TableCell sx={{ width: "120px" }}>Type</TableCell>
                <TableCell sx={{ width: "400px" }}>Prerequisite</TableCell>
                <TableCell sx={{ width: "10px" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            {tableData8.map((data, index) => (
              <TableItem
                key={index}
                data={data}
                selectedRows={selectedRows}
                handleCheckboxChange={handleCheckboxChange}
              />
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
                SEMESTER 8
              </Typography>
            </div>
          </Table>
          <Table>
            <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
              <TableRow>
                <TableCell sx={{ width: "50px" }}> </TableCell>
                <TableCell sx={{ width: "20px" }}>Number</TableCell>
                <TableCell sx={{ width: "110px" }}>Code</TableCell>
                <TableCell sx={{ width: "400px" }}>Subject Name</TableCell>
                <TableCell sx={{ width: "150px" }}>Credit(s)</TableCell>
                <TableCell sx={{ width: "80px" }}>Grades</TableCell>
                <TableCell sx={{ width: "120px" }}>Type</TableCell>
                <TableCell sx={{ width: "400px" }}>Prerequisite</TableCell>
                <TableCell sx={{ width: "10px" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            {tableData9.map((data, index) => (
              <TableItem
                key={index}
                data={data}
                selectedRows={selectedRows}
                handleCheckboxChange={handleCheckboxChange}
              />
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
                SEMESTER 9
              </Typography>
            </div>
          </Table>
          <Table>
            <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
              <TableRow>
                <TableCell sx={{ width: "50px" }}> </TableCell>
                <TableCell sx={{ width: "20px" }}>Number</TableCell>
                <TableCell sx={{ width: "110px" }}>Code</TableCell>
                <TableCell sx={{ width: "400px" }}>Subject Name</TableCell>
                <TableCell sx={{ width: "150px" }}>Credit(s)</TableCell>
                <TableCell sx={{ width: "80px" }}>Grades</TableCell>
                <TableCell sx={{ width: "120px" }}>Type</TableCell>
                <TableCell sx={{ width: "400px" }}>Prerequisite</TableCell>
                <TableCell sx={{ width: "10px" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            {tableData10.map((data, index) => (
              <TableItem
                key={index}
                data={data}
                selectedRows={selectedRows}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))}
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/bimbingan-akademik/pre-registration/"
          >
            <Button
              sx={{
                backgroundColor: "darkgrey",
                borderRadius: "24px",
                color: "black",
                whiteSpace: "nowrap",
                minWidth: "132px",
                fontSize: "12px",
                padding: "10px",
                marginRight: "24px",

                "&:hover": {
                  backgroundColor: "grey",
                },
              }}
            >
              Cancel
            </Button>
          </Link>

          <Button
            onClick={handleOpenFirstModal}
            sx={{
              backgroundColor: "#006AF5",
              borderRadius: "24px",
              color: "white",
              whiteSpace: "nowrap",
              minWidth: "132px",
              fontSize: "12px",
              padding: "10px",
              gap: "6px",

              "&:hover": {
                backgroundColor: "#025ED8",
              },
            }}
          >
            Submit
          </Button>
          <Modal
            open={openFirstModal}
            onClose={handleCloseFirstModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div style={style}>
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 600,
                }}
              >
                Confirm request?
              </Typography>
              <Typography
                id="modal-modal-description"
                style={{ marginTop: "16px", marginBottom: "20px" }}
              >
                Are you sure you want to submit this request? Forms that have
                been submitted cannot be edited again.
              </Typography>

              <Grid container spacing={1} justifyContent="flex-end">
                <Grid item>
                  <Button
                    onClick={handleCloseFirstModal}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                      boxShadow: 4,
                      color: "black",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        backgroundColor: "lightgrey",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleSubmitFirstModal}
                    sx={{
                      backgroundColor: "#006AF5",
                      borderRadius: "5px",
                      boxShadow: 4,
                      color: "white",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        backgroundColor: "#025ED8",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Modal>
          <Modal
            open={openSecondModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div style={style2}>
              <IconButton
                edge="end"
                color="#D9D9D9"
                onClick={handleCloseSecondModal}
                aria-label="close"
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "20px",
                }}
              >
                <CloseIcon />
              </IconButton>
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 600,
                }}
              >
                Successfull Request!
              </Typography>
              <Typography
                id="modal-modal-description"
                style={{ marginTop: "16px", marginBottom: "20px" }}
              >
                You have successfully made a consultation request.
              </Typography>
            </div>
          </Modal>
        </Box>
      </div>
    </div>
  );
};

export default PreRegistration;
