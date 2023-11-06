import Div from "@jumbo/shared/Div";
import { Typography } from "@mui/material";
import React from "react";

const Riwayatlog = () => {
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
        Riwayat Log
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
