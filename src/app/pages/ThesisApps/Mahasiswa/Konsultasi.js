import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import MenuDosenSkripsi from "app/shared/MenuHorizontal/MenuDosenSkripsi";
import MenuKetuaPanelis from "app/shared/MenuHorizontal/MenuKetuaPanelis";
import MenuAnggotaPanelis from "app/shared/MenuHorizontal/MenuAnggotaPanelis";
import MenuDekan from "app/shared/MenuHorizontal/MenuDekan";
import MenuKaprodi from "app/shared/MenuHorizontal/MenuKaprodi";
import MenuSekertaris from "app/shared/MenuHorizontal/MenuSekertaris";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";

const Konsultasi = () => {
  // state - simpan request konsultasi
  const [konsultasi, setKonsultasi] = useState();
  // state - simpan progress dari riwayat
  const [progress, setProgress] = useState(null);

  const groupId = useParams().groupId;
  // console.log("group id: ", groupId);

  const userRole = useParams().role;
  // console.log(role);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchKonsultasiData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/consultation/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setKonsultasi(response.data.data);
        console.log("Request Get konsultasi: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil daftar dosen:", error);
      }
    };
    fetchKonsultasiData();
  }, [token, groupId]);

  const getProposalConsultationMessage = () => {
    const targetConsultations = 4; // Ganti ini dengan total jumlah konsultasi yang dibutuhkan
    const consultations = konsultasi?.consultation;

    if (!consultations) {
      return "Tidak ada konsultasi yang tersedia.";
    }

    // Menghitung jumlah konsultasi dengan status "Proposal"
    const proposalConsultations = consultations?.filter(
      (consultation) => consultation.consultation_status === "Proposal"
    ).length;

    if (proposalConsultations >= targetConsultations) {
      return `Konsultasi Proposal telah terpenuhi ${proposalConsultations}/${targetConsultations}`;
    } else {
      return `Konsultasi Proposal ${proposalConsultations}/${targetConsultations}`;
    }
  };

  const getSkripsiConsultationMessage = () => {
    const targetConsultations = 4; // Ganti ini dengan total jumlah konsultasi yang dibutuhkan
    const consultations = konsultasi?.consultation;

    // Menghitung jumlah konsultasi dengan status "Skripsi"
    const skripsiConsultations = consultations?.filter(
      (consultation) => consultation.consultation_status === "Skripsi"
    ).length;

    if (skripsiConsultations >= targetConsultations) {
      return `Konsultasi Skripsi telah terpenuhi ${skripsiConsultations}/${targetConsultations}`;
    } else {
      return `Konsultasi Skripsi ${skripsiConsultations}/${targetConsultations}`;
    }
  };

  return (
    <Div>
      <Div
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "24px",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
          Konsultasi
        </Typography>
      </Div>

      <Div
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        {/* Element 1 Start */}
        <Div
          sx={{
            display: "flex",
            width: "350px",
            padding: "5px",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Riwayatlog
            value={groupId}
            riwayatData={(data) => {
              if (data) {
                setProgress(data.progress);
              }
            }}
          />
        </Div>
        {/* Element 1 End */}
        {/* Element 2 Start */}
        <Div
          sx={{
            direction: "row",
            display: "flex",
            width: "1050px",
            paddingBottom: "0px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
            borderRadius: "8px",
          }}
        >
          {/* Menu Horizontal Start */}
          {/* DOSEN SKRIPSI */}
          <Div
            hidden={userRole === "DOSEN_MK" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuDosenSkripsi
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Konsultasi"}
            />
          </Div>
          {/* KETUA_PANELIS */}
          <Div
            hidden={userRole === "KETUA_PANELIS" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuKetuaPanelis
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Konsultasi"}
            />
          </Div>
          {/* ANGGOTA_PANELIS */}
          <Div
            hidden={userRole === "ANGGOTA_PANELIS" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuAnggotaPanelis
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Konsultasi"}
            />
          </Div>
          {/* DEKAN */}
          <Div
            hidden={userRole === "DEKAN" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuDekan
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Konsultasi"}
            />
          </Div>
          {/* KAPRODI */}
          <Div
            hidden={userRole === "KAPRODI" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuKaprodi
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Konsultasi"}
            />
          </Div>
          {/* SEKRETARIS */}
          <Div
            hidden={userRole === "OPERATOR_FILKOM" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuSekertaris
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Konsultasi"}
            />
          </Div>
          {/* MAHASISWA */}
          <Div
            hidden={userRole === "MAHASISWA" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuMahasiswa
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Konsultasi"}
            />
          </Div>
          {/* Menu horizontal End */}

          {konsultasi?.consultation?.length > 0 ? (
            <Div
              sx={{
                display: "flex",
                padding: "29px 42px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 2,
                alignSelf: "stretch",
                borderRadius: "8px",
                border: "1px solid #E0E0E0",
                background: "#FFF",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Div
                sx={{
                  width: "100%",
                  padding: "0 25px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "50px",
                }}
              >
                {userRole === "MAHASISWA" && progress === "Proposal" && (
                  <>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#rgba(25, 36, 52, 0.94)",
                      }}
                    >
                      {getProposalConsultationMessage()}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#rgba(25, 36, 52, 0.94)",
                        marginBottom: "25px",
                      }}
                    >
                      Catatan: Mahasiswa wajib melakukan konsultasi proposal
                      bersama advisor dan co-advisor (jika ada) minimal sebanyak
                      4x
                    </Typography>
                  </>
                )}
                {userRole === "MAHASISWA" && progress === "Skripsi" && (
                  <>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#rgba(25, 36, 52, 0.94)",
                      }}
                    >
                      {getProposalConsultationMessage()}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#rgba(25, 36, 52, 0.94)",
                      }}
                    >
                      {getSkripsiConsultationMessage()}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#rgba(25, 36, 52, 0.94)",
                        marginBottom: "25px",
                      }}
                    >
                      Catatan: Mahasiswa wajib melakukan konsultasi skripsi
                      bersama advisor dan co-advisor (jika ada) minimal sebanyak
                      4x
                    </Typography>
                  </>
                )}
                {userRole === "MAHASISWA" && progress === "Finished" && (
                  <>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#rgba(25, 36, 52, 0.94)",
                      }}
                    >
                      {getProposalConsultationMessage()}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#rgba(25, 36, 52, 0.94)",
                      }}
                    >
                      {getSkripsiConsultationMessage()}
                    </Typography>
                  </>
                )}

                {/* Table Konsultasi Start*/}
                <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
                  <Table>
                    <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                      <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                        <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                        <TableCell sx={{ width: "65%" }}>Deskripsi</TableCell>
                        <TableCell sx={{ width: "10%" }}>Tanggal</TableCell>
                        <TableCell sx={{ width: "20%" }}>Tertera</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {konsultasi?.consultation?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{item.dosen}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* Table Kelompok mahasiswa End */}
              </Div>
            </Div>
          ) : (
            <Div
              sx={{
                display: "flex",
                padding: "29px 42px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 2,
                alignSelf: "stretch",
                borderRadius: "8px",
                border: "1px solid #E0E0E0",
                background: "#FFF",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Typography
                sx={{
                  width: "100%",
                  display: "flex",
                  padding: "24px",
                  alignItems: "center",
                  gap: "10px",
                  color: "#CA150C",
                  background: "rgba(226, 29, 18, 0.50)",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                Belum ada konsultasi.
              </Typography>
            </Div>
          )}
        </Div>
        {/* Element 2 End */}
      </Div>
    </Div>
  );
};

export default Konsultasi;
