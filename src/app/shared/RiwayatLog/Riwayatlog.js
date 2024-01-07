import React, { useState, useEffect } from "react";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

const Riwayatlog = ({ value: groupId, riwayatData = () => {} }) => {
  const [riwayat, setRiwayat] = useState([]);
  const [timPembimbing, setTimPembimbing] = useState();
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedStep, setSelectedStep] = React.useState(0);
  // const [steps, setSteps] = useState([]);

  const handleStepClick = (index) => {
    setSelectedStep(index); // Memperbarui langkah terpilih
    setActiveStep(index);
  };

  const token = localStorage.getItem("token");
  // console.log("token", token);
  console.log("GroupId di komponen riwayatlog", groupId);

  useEffect(() => {
    const fetchRiwayatData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/group/thesis_history/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setRiwayat' dengan data dari respons
        setRiwayat(response.data.data);
        // set riwayat terakhir untuk aktif/buka
        setActiveStep(response.data.data.length - 1);
        console.log("Request Get riwayat: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil riwayat:", error);
      }
    };
    const fetchTimPembimbingData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/group/advisor-group/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setTimPembimbing' dengan data dari respons
        setTimPembimbing(response.data.data);
        riwayatData(response.data.data);
        console.log("Progress dari Riwayat: ", response.data.data);
        console.log("Request Get tim pembimbing: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil tim pembimbing:",
          error
        );
      }
    };
    fetchRiwayatData();
    fetchTimPembimbingData();
  }, [token, groupId]);

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
            sx={{
              marginBottom: "20px",
              flexDirection: "column-reverse", // Balik arah tata letak kolom
            }}
          >
            {riwayat?.map((step, index) => (
              <Step key={index} completed={false}>
                <StepLabel
                  onClick={() => handleStepClick(index)}
                  style={{ cursor: "pointer" }}
                >
                  {step.description}
                </StepLabel>
                <StepContent>
                  <Typography>{step.user}</Typography>
                  <Typography>{step.date}</Typography>
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
          flexDirection: "column",
          alignItems: "stretch",
          borderRadius: "6px",
          border: "1px solid rgba(26, 56, 96, 0.10)",
          background: "#FFF",
          width: "100%",
        }}
      >
        {/* Advisor */}
        <Div
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Div
            variant="subtitle2"
            sx={{
              flex: "0 0 120px",
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
              flex: 1,
              padding: "10px 16px",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "12px" }}>
              {timPembimbing?.advisor ? timPembimbing?.advisor : ""}
            </Typography>
          </Div>
        </Div>

        {/* Co-Advisor 1*/}
        {timPembimbing?.co_advisor1 && (
          <Div
            sx={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <Div
              variant="subtitle2"
              sx={{
                flex: "0 0 120px",
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
                flex: 1,
                padding: "10px 16px",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "12px" }}>
                {timPembimbing.co_advisor1 ? timPembimbing.co_advisor1 : ""}
              </Typography>
            </Div>
          </Div>
        )}
        {/* Co-Advisor 2*/}
        {timPembimbing?.co_advisor2 && (
          <Div
            sx={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <Div
              variant="subtitle2"
              sx={{
                flex: "0 0 120px",
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
                flex: 1,
                padding: "10px 16px",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "12px" }}>
                {timPembimbing.co_advisor2 ? timPembimbing.co_advisor2 : ""}
              </Typography>
            </Div>
          </Div>
        )}
      </Div>

      {/* Dosen Pembimbing End */}
    </Div>
  );
};

export default Riwayatlog;
