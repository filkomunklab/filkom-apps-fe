import Div from "@jumbo/shared/Div";
import React, { useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SearchGlobal from "app/shared/SearchGlobal";
import { Link } from "react-router-dom";

const DaftarBimbinganProposalAdvisor = () => {
  const TableItem = ({ index }) => {
    return (
      <TableRow key={index}>
        <TableCell sx={{ fontSize: "13px" }}>{index + 1}</TableCell>
        <TableCell sx={{ fontSize: "13px" }}>Geovalga Fransiscus Lim</TableCell>
        <TableCell sx={{ fontSize: "13px" }}>
          SISTEM INFORMASI MANAJEMEN SKRIIPSI DI FAKULTAS ILMU KOMPUTER
          UNIVERSITAS KLABAT
        </TableCell>
        <TableCell>
          <Chip label={"Belum"} />
        </TableCell>
        <TableCell>
          <Chip label={"Belum"} />
        </TableCell>
        <TableCell>
          <Chip label={"Belum"} />
        </TableCell>
        <TableCell>
          <Typography
            component={Link}
            to="/sistem-informasi-skripsi/bimbingan-proposal-advisor/beranda"
            sx={{
              textDecoration: "none",
              color: "blue",
            }}
          >
            View
          </Typography>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Div>
      {/* Dashboard Start */}
      <Div
        sx={{
          display: "flex",
          width: "100%",
          padding: "10px 0px",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {/* Jumlah bimbingan */}
        <Div
          sx={{
            display: "flex",
            width: "100%",
            padding: "10px",
            alignItems: "center",
            gap: "20px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "10px",
            textItem: "center",
          }}
        >
          <PeopleIcon
            sx={{ width: "35px", height: "35px", color: "#006AF5" }}
          />
          <Div>
            <Typography
              sx={{
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
                color: "rgba(28, 48, 74, 0.52)",
              }}
            >
              Jumlah bimbingan
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              68 Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Belum Mengajukan Proposal */}
        <Div
          sx={{
            display: "flex",
            width: "100%",
            padding: "10px",
            alignItems: "center",
            gap: "20px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "10px",
            textItem: "center",
          }}
        >
          <EditIcon sx={{ width: "35px", height: "35px", color: "#006AF5" }} />
          <Div>
            <Typography
              sx={{
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
                color: "rgba(28, 48, 74, 0.52)",
              }}
            >
              Belum Mengajukan Proposal
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              29 Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Sudah Mengajukan Proposal */}
        <Div
          sx={{
            display: "flex",
            width: "100%",
            padding: "10px",
            alignItems: "center",
            gap: "20px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "10px",
            textItem: "center",
          }}
        >
          <ArrowUpwardIcon
            sx={{ width: "35px", height: "35px", color: "#006AF5" }}
          />
          <Div>
            <Typography
              sx={{
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
                color: "rgba(28, 48, 74, 0.52)",
              }}
            >
              Sudah Mengajukan Proposal
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              39 Kelompok
            </Typography>
          </Div>
        </Div>
        {/* proposal yang Di Tolak */}
        <Div
          sx={{
            display: "flex",
            width: "100%",
            padding: "10px",
            alignItems: "center",
            gap: "20px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "10px",
            textItem: "center",
          }}
        >
          <ArrowDownwardIcon
            sx={{ width: "35px", height: "35px", color: "#006AF5" }}
          />
          <Div>
            <Typography
              sx={{
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
                color: "rgba(28, 48, 74, 0.52)",
              }}
            >
              Proposal Yang Di Tolak
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              5 Kelompok
            </Typography>
          </Div>
        </Div>
        {/* Proposal yang diterima */}
        <Div
          sx={{
            display: "flex",
            width: "100%",
            padding: "10px",
            alignItems: "center",
            gap: "20px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "10px",
            textItem: "center",
          }}
        >
          <StarBorderIcon
            sx={{ width: "35px", height: "35px", color: "#006AF5" }}
          />
          <Div>
            <Typography
              sx={{
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
                color: "rgba(28, 48, 74, 0.52)",
              }}
            >
              Proposal Yang Diterima
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              34 Kelompok
            </Typography>
          </Div>
        </Div>
      </Div>
      {/* Dashboard End */}

      {/* Table Master Start */}
      <Div
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* Header Start */}
        <Div
          sx={{
            width: "100%",
            display: "flex",
            padding: "24px",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: "1 0 0",
              alignSelf: "stretch",
              width: "100%",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "32px",
            }}
          >
            Daftar Bimbingan Proposal
          </Typography>
          <Div
            sx={{
              flexDirection: "row",
              display: "flex",
              width: "441px",
              padding: "12px 16px",
              alignItems: "center",
              gap: "16px",
              flexShrink: 0,
            }}
          >
            <SearchGlobal></SearchGlobal>
          </Div>
        </Div>
        {/* Header End */}
        {/* Semester Start */}
        <Div
          sx={{
            display: "flex",
            width: "100%",
            padding: "24px",
            alignItems: "center",
            gap: "10px",
            borderRadius: "6px",
            background: "rgba(26, 56, 96, 0.10)",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "24px",
              color: "#192434",
            }}
          >
            2023/2024-Genap (Proposal)
          </Typography>
        </Div>
        {/* Semester End */}
        {/* Table Mahasiswa Proposal Start */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "25px", fontSize: "13px" }}>
                  Nomor
                </TableCell>
                <TableCell sx={{ width: "200px", fontSize: "13px" }}>
                  Mahasiswa
                </TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Judul</TableCell>
                <TableCell sx={{ fontSize: "13px" }}>
                  Disetujui Advisor
                </TableCell>
                <TableCell sx={{ fontSize: "13px" }}>
                  Disetujui Co-Advisor 1
                </TableCell>
                <TableCell sx={{ fontSize: "13px" }}>
                  Disetujui Co-Advisor 2
                </TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(10)].map((item, index) => (
                <TableItem index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Table Mahasiswa Proposal End */}
      </Div>
      {/* Table Master End */}
    </Div>
  );
};

export default DaftarBimbinganProposalAdvisor;
