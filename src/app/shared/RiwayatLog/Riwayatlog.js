import Div from "@jumbo/shared/Div";
import React from "react";

const Riwayatlog = () => {
  return (
    <Div>
      {/* Riwayat Log Start */}
      <Div
        sx={{
          width: "320px",
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
          width: "320px",
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
            width: "480px",
            alignItems: "flex-start",
          }}
        >
          <Div
            sx={{
              display: "flex",
              width: "150px",
              padding: "14px 16px",
              alignItems: "center",
              gap: 2,
              flexShrink: "0",
              alignSelf: "stretch",
              background: "#F5F5F5",
            }}
          >
            Advisor
          </Div>
          <Div
            sx={{
              display: "flex",
              padding: "14px 16px",
              alignItems: "flex-start",
              gap: 2,
              flex: "1 0 0",
              alignSelf: "stretch",
            }}
          >
            -
          </Div>
        </Div>
        {/* Co-Advisor 1*/}
        <Div
          sx={{
            display: "flex",
            width: "480px",
            alignItems: "flex-start",
          }}
        >
          <Div
            sx={{
              display: "flex",
              width: "150px",
              padding: "14px 16px",
              alignItems: "center",
              gap: 2,
              flexShrink: "0",
              alignSelf: "stretch",
              background: "#F5F5F5",
            }}
          >
            Co-Advisor 1
          </Div>
          <Div
            sx={{
              display: "flex",
              padding: "14px 16px",
              alignItems: "flex-start",
              gap: 2,
              flex: "1 0 0",
              alignSelf: "stretch",
            }}
          >
            -
          </Div>
        </Div>
        {/* Co-Advisor 2*/}
        <Div
          sx={{
            display: "flex",
            width: "480px",
            alignItems: "flex-start",
          }}
        >
          <Div
            sx={{
              display: "flex",
              width: "150px",
              padding: "14px 16px",
              alignItems: "center",
              gap: 2,
              flexShrink: "0",
              alignSelf: "stretch",
              background: "#F5F5F5",
            }}
          >
            Co-Advisor 2
          </Div>
          <Div
            sx={{
              display: "flex",
              padding: "14px 16px",
              alignItems: "flex-start",
              gap: 2,
              flex: "1 0 0",
              alignSelf: "stretch",
            }}
          >
            -
          </Div>
        </Div>
      </Div>
      {/* Dosen Pembimbing End */}
    </Div>
  );
};

export default Riwayatlog;
