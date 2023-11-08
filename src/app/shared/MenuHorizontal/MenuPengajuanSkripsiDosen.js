import Div from "@jumbo/shared/Div";
import { Button, Menu, MenuItem } from "@mui/material";
import { ROLES } from "app/utils/constants/roles";
import React from "react";
import { Link } from "react-router-dom";

const MenuPengajuanSkripsiDosen = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const open2 = Boolean(anchorE2);

  const { role } = JSON.parse(localStorage.getItem("user"));
  // const role = ["ADVISOR"];
  console.log("TEST", role);

  let isPengajuanJudulHidden;
  let BerandaLink;
  let KonsultasiLInk;
  let PengajuanJudulLink;

  // PROGRAM KONDISI UNTUK SEMUA ROLL DOSEN
  switch (role[0]) {
    case ROLES.DOSEN:
      console.log("same");
      BerandaLink =
        "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/beranda";
      break;
    case ROLES.DEKAN:
      BerandaLink = "";
      KonsultasiLInk = "";
      break;

    default:
      console.log("default");
      BerandaLink = "";
  }

  // PROGRAM KONDISI UNTUK 3 ROLL DOSEN SKRIPSI, KAPRODI DAN DEKAN
  switch (role) {
    case ROLES.DOSEN:
    case ROLES.DEKAN:
    case ROLES.KAPRODI:
      isPengajuanJudulHidden = false;
    default:
      isPengajuanJudulHidden = true;
  }

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
            {/* DOSEN SKRIPSI */}
            <Div hidden={role.includes("DOSEN") ? false : true}>
              <Link to="/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/beranda">
                <Button
                  sx={{
                    fontSize: "13px",
                    padding: "6px 16px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Beranda
                </Button>
              </Link>
            </Div>
            {/* Dibawah ini adalah contoh program untuk kondisi semua roll dosen */}
            {/* <Div>
              <Link to={BerandaLink}>
                <Button
                  sx={{
                    fontSize: "13px",
                    padding: "6px 16px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Beranda
                </Button>
              </Link>
            </Div> */}
            {/* DOSEN ADVISOR */}
            <Div hidden={role.includes("ADVISOR") ? false : true}>
              <Link to="/sistem-informasi-skripsi/bimbingan-skripsi-advisor/beranda">
                <Button
                  sx={{
                    fontSize: "13px",
                    padding: "6px 16px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Beranda
                </Button>
              </Link>
            </Div>
            {/* DOSEN CO_ADVISOR */}
            <Div hidden={role.includes("CO_ADVISOR") ? false : true}>
              <Link to="/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/beranda">
                <Button
                  sx={{
                    fontSize: "13px",
                    padding: "6px 16px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Beranda
                </Button>
              </Link>
            </Div>
            {/* Dosen KETUA PANALIS */}
            <Div hidden={role.includes("KETUA_PANALIS") ? false : true}>
              <Link to="/sistem-informasi-skripsi/uji-skripsi-ketua/beranda">
                <Button
                  sx={{
                    fontSize: "13px",
                    padding: "6px 16px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Beranda
                </Button>
              </Link>
            </Div>
            {/* Dosen ANGGOTA PANALIS */}
            <Div hidden={role.includes("ANGGOTA_PANALIS") ? false : true}>
              <Link to="/sistem-informasi-skripsi/uji-skripsi-anggota/beranda">
                <Button
                  sx={{
                    fontSize: "13px",
                    padding: "6px 16px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Beranda
                </Button>
              </Link>
            </Div>
            {/* Dosen KAPRODI */}
            {/* <Div hidden={role.includes("KAPRODI") ? false : true}>
              <Link to="#">
                <Button
                  sx={{
                    fontSize: "13px",
                    padding: "6px 16px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Beranda
                </Button>
              </Link>
            </Div> */}
            {/* Dosen DEKAN */}
            <Div hidden={role.includes("DEKAN") ? false : true}>
              <Link to="#">
                <Button
                  sx={{
                    fontSize: "13px",
                    padding: "6px 16px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Beranda
                </Button>
              </Link>
            </Div>
          </Div>
          <Div sx={{ margin: "auto" }}>
            {/* DOSEN SKRIPSI */}
            <Div hidden={role.includes("DOSEN") ? false : true}>
              <Link to="/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/pengajuan-judul">
                <Button
                  sx={{
                    fontSize: "13px",
                    padding: "6px 16px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Pengajuan Judul
                </Button>
              </Link>
            </Div>
            {/* DIBAWAH INI ADALAH CONTOH PROGRAM UNTUK ROLL DOSEN SKRIPSI, KAPRODI, DAN DEKAN*/}
            {/* <Div hidden={isPengajuanJudulHidden}>
              <Link to={PengajuanJudulLink}>
                <Button
                  sx={{
                    fontSize: "13px",
                    padding: "6px 16px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Pengajuan Judul
                </Button>
              </Link>
            </Div> */}
            {/* Dosen KAPRODI */}
            <Div hidden={role.includes("KARPODI") ? false : true}>
              <Link to="#">
                <Button
                  sx={{
                    fontSize: "13px",
                    padding: "6px 16px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Pengajuan Judul
                </Button>
              </Link>
            </Div>
            {/* Dosen DEKAN */}
            <Div hidden={role.includes("DEKAN") ? false : true}>
              <Link to="#">
                <Button
                  sx={{
                    fontSize: "13px",
                    padding: "6px 16px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Pengajuan Judul
                </Button>
              </Link>
            </Div>
          </Div>
          <Div sx={{ margin: "auto" }}>
            {/* dosen skripsi */}
            <Div hidden={role.includes("DOSEN") ? false : true}>
              <Link to="/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/konsultasi">
                <Button
                  sx={{
                    // width: "130px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Konsultasi
                </Button>
              </Link>
            </Div>
            {/* dosen ADVISOR */}
            <Div hidden={role.includes("ADVISOR") ? false : true}>
              <Link to="/sistem-informasi-skripsi/bimbingan-skripsi-advisor/konsultasi">
                <Button
                  sx={{
                    // width: "130px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Konsultasi
                </Button>
              </Link>
            </Div>
            {/* dosen CO_ADVISOR */}
            <Div hidden={role.includes("CO_ADVISOR") ? false : true}>
              <Link to="/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/konsultasi">
                <Button
                  sx={{
                    // width: "130px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Konsultasi
                </Button>
              </Link>
            </Div>
            {/* dosen KETUA PANALIS */}
            <Div hidden={role.includes("KETUA_PANALIS") ? false : true}>
              <Link to="/sistem-informasi-skripsi/uji-skripsi-ketua/konsultasi">
                <Button
                  sx={{
                    // width: "130px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Konsultasi
                </Button>
              </Link>
            </Div>
            {/* dosen ANGGOTA PANALIS */}
            <Div hidden={role.includes("ANGGOTA_PANALIS") ? false : true}>
              <Link to="/sistem-informasi-skripsi/uji-skripsi-anggota/konsultasi">
                <Button
                  sx={{
                    // width: "130px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Konsultasi
                </Button>
              </Link>
            </Div>
            {/* dosen kaprodi */}
            <Div hidden={role.includes("KAPRODI") ? false : true}>
              <Link to="#">
                <Button
                  sx={{
                    // width: "130px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Konsultasi
                </Button>
              </Link>
            </Div>
            {/* dosen DEKAN */}
            <Div hidden={role.includes("DEKAN") ? false : true}>
              <Link to="#">
                <Button
                  sx={{
                    // width: "130px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Konsultasi
                </Button>
              </Link>
            </Div>
          </Div>
          <Div sx={{ margin: "auto" }}>
            <Button
              onClick={(event) => setAnchorEl(event.currentTarget)}
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#192434",
                textTransform: "none",
                "&:hover": {
                  color: "#006AF5",
                },
              }}
            >
              Pengajuan Proposal
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open1}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {/* DOSEN DOSEN_SKRIPSI */}
              <Div hidden={role.includes("DOSEN") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/document-proposal"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Dokumen Proposal
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN ADVISOR */}
              <Div hidden={role.includes("ADVISOR") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/bimbingan-skripsi-advisor/dokumen-proposal"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Dokumen Proposal
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN CO_ADVISOR */}
              <Div hidden={role.includes("CO_ADVISOR") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/dokumen-proposal"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Dokumen Proposal
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN KETUA PANALIS */}
              <Div hidden={role.includes("KETUA_PANALIS") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/uji-skripsi-ketua/dokumen-proposal"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Dokumen Proposal
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN ANGGOTA PANALIS */}
              <Div hidden={role.includes("ANGGOTA_PANALIS") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/uji-skripsi-anggota/dokumen-proposal"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Dokumen Proposal
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN KAPRODI */}
              {/* <Div hidden={role.includes("KAPRODI") ? false : true}>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Dokumen Proposal
                  </MenuItem>
                </Link>
              </Div> */}
              {/* DOSEN DEKAN */}
              <Div hidden={role.includes("DEKAN") ? false : true}>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Dokumen Proposal
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN ADVISOR */}
              <Div hidden={role.includes("ADVISOR") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/bimbingan-skripsi-advisor/berita-acara-proposal"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Berita Acara Proposal
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN KETUA PANALIS */}
              <Div hidden={role.includes("KETUA_PANALIS") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/uji-skripsi-ketua/berita-acara-proposal"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Berita Acara Proposal
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN ANGGOTA PANALIS */}
              <Div hidden={role.includes("ANGGOTA_PANALIS") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/uji-skripsi-anggota/berita-acara-proposal"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Berita Acara Proposal
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN KAPRODI */}
              {/* <Div hidden={role.includes("KAPRODI") ? false : true}>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Berita Acara Proposal
                  </MenuItem>
                </Link>
              </Div> */}
              {/* DOSEN DEKAN */}
              <Div hidden={role.includes("DEKAN") ? false : true}>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Berita Acara Proposal
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN CO_ADVISOR */}
              <Div hidden={role.includes("CO_ADVISOR") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/perubahan-proposal"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Perubahan Proposal
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN SKRIPSI */}
              <Div hidden={role.includes("DOSEN") ? false : true}>
                {/* GANTI SESUAI LINK PAGE DOSEN SKRIPSI */}
                <Link
                  to="/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/dokumen-revisi-proposal"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Dokumen Revisi Proposal
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN ADVISOR */}
              <Div hidden={role.includes("ADVISOR") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/bimbingan-skripsi-advisor/dokumen-revisi-proposal"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Dokumen Revisi Proposal
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN CO_ADVISOR */}
              <Div hidden={role.includes("CO_ADVISOR") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/dokumen-revisi-proposal"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Dokumen Revisi Proposal
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN KETUA PANALIS */}
              <Div hidden={role.includes("KETUA_PANALIS") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/uji-skripsi-ketua/dokumen-revisi-proposal"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Dokumen Revisi Proposal
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN ANGGOTA PANALIS */}
              <Div hidden={role.includes("ANGGOTA_PANALIS") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/uji-skripsi-anggota/dokumen-revisi-proposal"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Dokumen Revisi Proposal
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN KAPRODI */}
              {/* <Div hidden={role.includes("KAPRODI") ? false : true}>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Dokumen Revisi Proposal
                  </MenuItem>
                </Link>
              </Div> */}
              {/* DOSEN DEKAN */}
              <Div hidden={role.includes("DEKAN") ? false : true}>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Dokumen Revisi Proposal
                  </MenuItem>
                </Link>
              </Div>
            </Menu>
          </Div>
          {/* Menu Pengajuan Skripsi */}
          <Div>
            <Button
              onClick={(event) => setAnchorE2(event.currentTarget)}
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#192434",
                textTransform: "none",
                "&:hover": {
                  color: "#006AF5",
                },
              }}
            >
              Pengajuan Skripsi
            </Button>
            <Menu
              anchorEl={anchorE2}
              open={open2}
              onClose={() => setAnchorE2(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {/* DOSEN SKRIPSI */}
              <Div hidden={role.includes("DOSEN") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/dokumen-skripsi"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Skripsi
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN ADVISOR */}
              <Div hidden={role.includes("ADVISOR") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/bimbingan-skripsi-advisor/dokumen-skripsi"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Skripsi
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN CO_ADVISOR */}
              <Div hidden={role.includes("CO_ADVISOR") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/dokumen-skripsi"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Skripsi
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN KETUA PANALIS */}
              <Div hidden={role.includes("KETUA_PANALIS") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/uji-skripsi-ketua/dokumen-skripsi"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Skripsi
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN ANGGOTA PANALIS */}
              <Div hidden={role.includes("ANGGOTA_PANALIS") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/uji-skripsi-anggota/dokumen-skripsi"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Skripsi
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN KAPRODI */}
              {/* <Div hidden={role.includes("KAPRODI") ? false : true}>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Skripsi
                  </MenuItem>
                </Link>
              </Div> */}
              {/* DOSEN DEKAN */}
              <Div hidden={role.includes("DEKAN") ? false : true}>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Skripsi
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN ADVISOR */}
              {/* GANTI LINK SESUAI DENGNA ADVISOR */}
              <Div hidden={role.includes("ADVISOR") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/bimbingan-skripsi-advisor/berita-acara-skripsi"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Berita Acara Skripsi
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN KETUA_PANALIS */}
              <Div hidden={role.includes("KETUA_PANALIS") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/uji-skripsi-ketua/berita-acara-skripsi"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Berita Acara Skripsi
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN ANGGOTA PANALIS */}
              <Div hidden={role.includes("ANGGOTA_PANALIS") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/uji-skripsi-anggota/berita-acara-skripsi"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Berita Acara Skripsi
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN KAPRODI */}
              {/* <Div hidden={role.includes("KAPRODI") ? false : true}>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Berita Acara Skripsi
                  </MenuItem>
                </Link>
              </Div> */}
              {/* DOSEN DEKAN */}
              <Div hidden={role.includes("DEKAN") ? false : true}>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Berita Acara Skripsi
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN CO_ADVISOR */}
              <Div hidden={role.includes("CO_ADVISOR") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/perubahan-skripsi"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Perubahan Skripsi
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN SKRIPSI */}
              <Div hidden={role.includes("DOSEN") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/dokumen-revisi-skripsi"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Revisi Skripsi
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN ADVISOR */}
              <Div hidden={role.includes("ADVISOR") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/bimbingan-skripsi-advisor/dokumen-revisi-skripsi"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Revisi Skripsi
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN CO_ADVISOR */}
              <Div hidden={role.includes("CO_ADVISOR") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/dokumen-revisi-skripsi"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Revisi Skripsi
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN KETUA PANALIS */}
              <Div hidden={role.includes("KETUA_PANALIS") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/uji-skripsi-ketua/dokumen-revisi-skripsi"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Revisi Skripsi
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN ANGGOTA PANALIS */}
              <Div hidden={role.includes("ANGGOTA_PANALIS") ? false : true}>
                <Link
                  to="/sistem-informasi-skripsi/uji-skripsi-anggota/dokumen-revisi-skripsi"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Revisi Skripsi
                  </MenuItem>
                </Link>
              </Div>
              {/* DOSEN KAPRODI */}
              {/* <Div hidden={role.includes("KAPRODI") ? false : true}>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Revisi Skripsi
                  </MenuItem>
                </Link>
              </Div> */}
              {/* DOSEN DEKAN */}
              <Div hidden={role.includes("DEKAN") ? false : true}>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Revisi Skripsi
                  </MenuItem>
                </Link>
              </Div>
            </Menu>
          </Div>
        </Div>
      </Div>
      {/* Menu horizontal End */}
    </Div>
  );
};

export default MenuPengajuanSkripsiDosen;
