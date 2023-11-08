import Div from "@jumbo/shared/Div";
import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import { Link } from "react-router-dom";
import DateRangeIcon from "@mui/icons-material/DateRange";
import GavelIcon from "@mui/icons-material/Gavel";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const DaftarPengujianSkripsiKetuaPenelis = () => {
  const TableItem = ({ index }) => {
    return (
      <TableRow key={index}>
        <TableCell sx={{ fontSize: "13px" }}>{index + 1}</TableCell>
        <TableCell sx={{ fontSize: "13px" }}>Geovalga Fransiscus Lim</TableCell>
        <TableCell sx={{ fontSize: "13px" }}>
          SISTEM INFORMASI MANAJEMEN SKRIPSI DI FAKULTAS ILMU KOMPUTER
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
          <Chip label={"Belum"} />
        </TableCell>
        <TableCell>
          <Typography
            component={Link}
            to="/sistem-informasi-skripsi/uji-skripsi-ketua/beranda"
            sx={{
              textDecoration: "none",
              color: "blue",
            }}
          >
            Detail
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
        {/* Kelompok Yang Diuji */}
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
              Kelompok Yang Diuji
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
        {/* Belum Maju Sidang */}
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
          <DateRangeIcon
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
              Belum Maju Sidang
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
        {/* Sudah Maju Sidang */}
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
          <GavelIcon sx={{ width: "35px", height: "35px", color: "#006AF5" }} />
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
              Sudah Maju Sidang
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
        {/* Belum Selesai Revisi*/}
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
          <DownloadDoneIcon
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
              Sudah Selesai Revisi
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
        {/* Skripsi yang diterima */}
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
          <BorderColorIcon
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
              Belum Selesai Revisi
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
            Daftar Pengujian Skripsi Ketua Panelis
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
            2023/2024-Genap (Skripsi)
          </Typography>
        </Div>
        {/* Semester End */}
        {/* Table Mahasiswa Skripsi Start */}
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
                <TableCell sx={{ fontSize: "13px" }}>Sidang</TableCell>
                <TableCell sx={{ fontSize: "13px" }}>
                  Revisi Ketua Penelis
                </TableCell>
                <TableCell sx={{ fontSize: "13px" }}>
                  Revisi Anggota Penelis
                </TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Revisi Advisor</TableCell>
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
        {/* Table Mahasiswa Skripsi End */}
      </Div>
      {/* Table Master End */}
    </Div>
  );
};

export default DaftarPengujianSkripsiKetuaPenelis;
