import Div from "@jumbo/shared/Div";
import React, { useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import DraftsIcon from "@mui/icons-material/Drafts";
import ClearIcon from "@mui/icons-material/Clear";

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
import DateRangeIcon from "@mui/icons-material/DateRange";
import GavelIcon from "@mui/icons-material/Gavel";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { DownloadDone, Mail } from "@mui/icons-material";

const DaftarPengajuanJudulDosen = () => {
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
          Andrew T. Liem, MT, PhD
        </TableCell>
        <TableCell>
          Senly I. Adam, SKom, MSc
        </TableCell>
        <TableCell>
          Oktoverano H. Lengkong, SKom, MDs, MM
        </TableCell>
        <TableCell>
          <Chip label={"Sudah"} />
        </TableCell>
        <TableCell>
          <Chip label={"Menunggu"} />
        </TableCell>
        <TableCell>
          <Typography
            component={Link}
            to="/halaman-berikutnya"
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
            Daftar Pengajuan Judul
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
                <TableCell sx={{ fontSize: "13px" }}>Calon Advisor</TableCell>
                <TableCell sx={{ fontSize: "13px" }}>
                  Calon Co-Advisor 1
                </TableCell>
                <TableCell sx={{ fontSize: "13px" }}>
                  Calon Co-Advisor 2
                </TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Konsultasi</TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Status</TableCell>
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

export default DaftarPengajuanJudulDosen;
