import React from "react";
import { Typography, styled, Accordion } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(26, 56, 96, 0.1)",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {},
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const VisionMissionGoals = () => {
  return (
    <div>
      <Typography
        sx={{ fontSize: "24px", fontWeight: 500, paddingBottom: "24px" }}
      >
        Vision, Mission, and Goals
      </Typography>
      <div sx={{ flex: 1 }}>
        <Accordion>
          <AccordionSummary
            sx={{ paddingLeft: "24px" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: 500 }}>Universitas Klabat</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography pl={2} mb={1.5} fontWeight={500}>
              Vision
            </Typography>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                textAlign: "justify",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              Menjadi universitas swasta Kristen Masehi Advent Hari Ketujuh yang
              memperoleh pengakuan secara nasional, dan internasional melalui
              pendidikan dan pengajaran, penelitian, dan pengabdian kepada
              masyarakat yang bermutu dengan dilandasi pada suatu proses
              pengembangan yang serasi yakni spiritual, intelektual, fisik dan
              sosial.
            </Typography>

            <Typography pl={2} pt={2} mb={1.5} fontWeight={500}>
              Mission
            </Typography>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                textAlign: "justify",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              Universitas Klabat bertekad mencapai keunggulan mutu dalam
              pendidikan Kristen Masehi Advent Hari Ketujuh dengan menciptakan
              lingkungan yang kondusif untuk pengembangan karakter Kristiani
              yang mulia dan untuk pembekalan ketrampilan dan ilmu pengetahuan
              kepada mahasiswa agar bisa menjadi warga negara yang mampu hidup
              mandiri dan bekerja untuk melayani sesama manusia tanpa
              mementingkan diri sendiri.
            </Typography>

            <Typography pl={2} pt={2} mb={1.5} fontWeight={500}>
              Goals
            </Typography>
            <Typography
              sx={{
                paddingLeft: "25px",
                "@media (max-width: 390px)": {
                  fontSize: "13px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              Berdasarkan pernyataan Visi dan Misi, Universitas Klabat berupaya
              mencapai tujuan-tujuan berikut:
            </Typography>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                textAlign: "justify",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              <ol sx={{ listStylePosition: "inside" }}>
                <li>
                  Menuntun mahasiswa dalam pembentukan karakter Kristiani yang
                  ditandai dengan kerajinan, kejujuran, penghematan,
                  pengendalian-diri, dan kekudusan.
                </li>
                <li>
                  Memanfaatkan hasil penelitian dan teknologi semaksimal mungkin
                  untuk memastikan pembelajaran yang bersifat student-centered
                  and student-oriented.
                </li>
                <li>
                  Membekali mahasiswa dengan ketrampilan dan penerapan ilmu
                  pengetahuan dan teknologi yang ditekuninya.
                </li>
                <li>
                  Meningkatkan penelitian dosen dengan melibatkan mahasiswa.
                </li>
                <li>
                  Menerapkan ilmu pengetahuan dan teknologi semaksimal mungkin
                  dalam bentuk pengabdian kepada masyarakat dengan melibatkan
                  dosen, staf, dan mahasiswa.
                </li>
              </ol>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            sx={{ paddingLeft: "24px" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography sx={{ fontWeight: 500 }}>Fakultas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                paddingLeft: "25px",
                paddingRight: "25px",
                textAlign: "justify",
                "@media (max-width: 390px)": {
                  fontSize: "12px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                },
              }}
            >
              Universitas Klabat bertekad mencapai keunggulan mutu dalam
              pendidikan Kristen Masehi Advent Hari Ketujuh dengan menciptakan
              lingkungan yang kondusif untuk pengembangan karakter Kristiani
              yang mulia dan untuk pembekalan ketrampilan dan ilmu pengetahuan
              kepada mahasiswa agar bisa menjadi warga negara yang mampu hidup
              mandiri dan bekerja untuk melayani sesama manusia tanpa
              mementingkan diri sendiri.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default VisionMissionGoals;
