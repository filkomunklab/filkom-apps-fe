import Div from "@jumbo/shared/Div";
import {
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { Box } from "@mui/system";

const steps = [
  {
    label: "Pengajuan Judul",
    user: "Mahasiswa",
    date: "23-03-2023",
    time: "11:00 ",
  },
  {
    label: "Pengajuan Judul Diterima",
    user: "Dosen Skripsi",
    date: "24-03-2023",
    time: "03:00 ",
  },
  {
    label: "Membuat Konsultasi",
    user: "Advisor",
    date: "26-03-2023",
    time: "15:00 ",
  },
  {
    label: "Membuat Konsultasi",
    user: "Advisor",
    date: "28-03-2023",
    time: "15:00 ",
  },
];

const Riwayatlog = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedStep, setSelectedStep] = React.useState(0);
  // const [steps, setSteps] = useState([]);

  const handleStepClick = (index) => {
    setSelectedStep(index); // Memperbarui langkah terpilih
    setActiveStep(index);
  };

  // // fungsi untuk mendapatkan token JWT
  // const token = localStorage.getItem("token");
  // console.log("token", token);

  // const { id } = JSON.parse(localStorage.getItem("user"));
  // console.log(id);

  // const { groupId } = useParams();

  // useEffect(() => {
  //   const fetchDaftarDataRiwayatLog = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:2000/api/v1/group/thesis_history/${groupId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       // Pastikan response.data adalah array sebelum mengatur state
  //       if (Array.isArray(response.data)) {
  //         setSteps(response.data);
  //       } else {
  //         console.error("Data yang diterima bukanlah array:", response.data);
  //       }
  //     } catch (error) {
  //       console.error(
  //         "Terjadi kesalahan saat mengambil data Riwayat log:",
  //         error
  //       );
  //     }
  //   };
  //   fetchDaftarDataRiwayatLog();
  // }, [token, groupId]);

  return (
    <Div sx={{ width: "100%" }}>
      {/* Riwayat Log Start */}
      <Div
        sx={{
          width: "100%",
          height: "500px",
          borderRadius: "6px",
          border: "1px solid rgba(26, 56, 96, 0.10)",
          background: "#FFF",
        }}
      >
        {/* Steper Start */}
        <Div
          sx={{
            maxWidth: 400,
            marginLeft: "20px",

            maxHeight: "100%",
            overflowY: "auto",
          }}
        >
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{ marginBottom: "20px" }}
          >
            {steps.map((step, index) => (
              <Step key={step.label} completed={false}>
                <StepLabel
                  onClick={() => handleStepClick(index)}
                  style={{ cursor: "pointer" }}
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.user}</Typography>
                  <Typography>
                    {step.date} {step.time}
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Div>
        {/* Steper End */}
      </Div>
      {/* Riwayat Log End */}
      {/* Dosen Pembimbing Start */}
      <Div
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
          borderRadius: "6px",
          border: "1px solid rgba(26, 56, 96, 0.10)",
          background: "#FFF",
        }}
      >
        {/* Advisor */}
        <Div
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <Div
            variant="subtitle2"
            sx={{
              display: "flex",
              width: "120px",
              padding: "16px 16px",
              alignItems: "center",
              background: "#F5F5F5",
            }}
          >
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontSize: "12px" }}
            >
              Advisor
            </Typography>
          </Div>
          <Div
            sx={{
              display: "flex",
              padding: "10px 16px",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ fontSize: "12px" }}>
              Oktoverano H. Lengkong, SKom, MDs, MM
            </Typography>
          </Div>
        </Div>
        {/* Co-Advisor 1*/}
        <Div
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <Div
            variant="subtitle2"
            sx={{
              display: "flex",
              width: "120px",
              padding: "14px 16px",
              alignItems: "center",
              background: "#F5F5F5",
            }}
          >
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontSize: "12px" }}
            >
              Co-Advisor 1
            </Typography>
          </Div>
          <Div
            sx={{
              display: "flex",
              padding: "10px 16px",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ fontSize: "12px" }}>
              Oktoverano H. Lengkong, SKom, MDs, MM
            </Typography>
          </Div>
        </Div>
        {/* Co-Advisor 2*/}
        <Div
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <Div
            variant="subtitle2"
            sx={{
              display: "flex",
              width: "120px",
              padding: "14px 16px",
              alignItems: "center",
              background: "#F5F5F5",
            }}
          >
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontSize: "12px" }}
            >
              Co-Advisor 2
            </Typography>
          </Div>
          <Div
            sx={{
              display: "flex",
              padding: "10px 16px",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ fontSize: "12px" }}>
              Oktoverano H. Lengkong, SKom, MDs, MM
            </Typography>
          </Div>
        </Div>
      </Div>
      {/* Dosen Pembimbing End */}
    </Div>
  );
};

export default Riwayatlog;
