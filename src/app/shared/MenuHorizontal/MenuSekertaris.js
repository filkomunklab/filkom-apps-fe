import Div from "@jumbo/shared/Div";
import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MenuSekertaris = ({
  dataGroupId: groupId,
  dataProgress: progress,
  page: setPage,
}) => {
  return (
    <Div>
      {/* Menu Horizontal Start */}
      <Div
        sx={{
          display: "flex",
          // padding: "5px 16px",
          width: "100%",
          alignSelf: "stretch",
          borderRadius: "8px",
          border: "1px solid #E0E0E0",
          background: "#FFF",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
          flexDirection: "column",
        }}
      >
        <Div sx={{ width: "100%", display: "flex" }}>
          <Div sx={{ margin: "auto" }}>
            <Link
              to={`/sistem-informasi-skripsi/daftar-pengajuan-${
                (progress === "Proposal" && "proposal") ||
                (progress === "Skripsi" && "skripsi") ||
                (progress === "Finished" && "skripsi")
              }/beranda/${groupId}/OPERATOR_FILKOM`}
            >
              <Button
                sx={{
                  fontSize: "13px",
                  padding: "6px 16px",
                  fontWeight: 500,
                  color: setPage === "Beranda" ? "#006AF5" : "#192434",
                  textTransform: "none",
                  "&:hover": {
                    color: setPage === "Beranda" ? "#006AF5" : "#006AF5",
                  },
                }}
              >
                Beranda
              </Button>
            </Link>
          </Div>
          <Div sx={{ margin: "auto" }}>
            <Link
              to={`/sistem-informasi-skripsi/daftar-pengajuan-${
                (progress === "Proposal" && "proposal") ||
                (progress === "Skripsi" && "skripsi") ||
                (progress === "Finished" && "skripsi")
              }/jadwal-sidang/${groupId}/OPERATOR_FILKOM`}
            >
              <Button
                sx={{
                  // width: "150px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: setPage === "Jadwal Sidang" ? "#006AF5" : "#192434",
                  textTransform: "none",
                  "&:hover": {
                    color: setPage === "Jadwal Sidang" ? "#006AF5" : "#006AF5",
                  },
                }}
              >
                Jadwal Sidang
              </Button>
            </Link>
          </Div>
          <Div sx={{ margin: "auto" }}>
            <Link
              to={`/sistem-informasi-skripsi/daftar-pengajuan-${
                (progress === "Proposal" && "proposal") ||
                (progress === "Skripsi" && "skripsi") ||
                (progress === "Finished" && "skripsi")
              }/konsultasi/${groupId}/OPERATOR_FILKOM`}
            >
              <Button
                sx={{
                  // width: "130px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: setPage === "Konsultasi" ? "#006AF5" : "#192434",
                  textTransform: "none",
                  "&:hover": {
                    color: setPage === "Konsultasi" ? "#006AF5" : "#006AF5",
                  },
                }}
              >
                Konsultasi
              </Button>
            </Link>
          </Div>
          <Div sx={{ margin: "auto" }}>
            <Link
              to={`/sistem-informasi-skripsi/daftar-pengajuan-${
                (progress === "Proposal" && "proposal") ||
                (progress === "Skripsi" && "skripsi") ||
                (progress === "Finished" && "skripsi")
              }/dokumen-proposal/${groupId}/OPERATOR_FILKOM`}
            >
              <Button
                sx={{
                  // width: "130px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: setPage === "Dokumen Proposal" ? "#006AF5" : "#192434",
                  textTransform: "none",
                  "&:hover": {
                    color:
                      setPage === "Dokumen Proposal" ? "#006AF5" : "#006AF5",
                  },
                }}
              >
                Dokumen Proposal
              </Button>
            </Link>
          </Div>
          <Div sx={{ margin: "auto" }}>
            <Button
              component={Link}
              to={`/sistem-informasi-skripsi/daftar-pengajuan-${
                (progress === "Proposal" && "proposal") ||
                (progress === "Skripsi" && "skripsi") ||
                (progress === "Finished" && "skripsi")
              }/dokumen-skripsi/${groupId}/OPERATOR_FILKOM`}
              sx={{
                // width: "130px",
                fontSize: "13px",
                fontWeight: 500,
                color: setPage === "Dokumen Skripsi" ? "#006AF5" : "#192434",
                textTransform: "none",
                "&:hover": {
                  color: setPage === "Dokumen Skripsi" ? "#006AF5" : "#006AF5",
                },
              }}
              disabled={progress !== "Skripsi" && progress !== "Finished"}
            >
              Dokumen Skripsi
            </Button>
          </Div>
        </Div>
      </Div>
      {/* Menu horizontal End */}
    </Div>
  );
};

export default MenuSekertaris;
