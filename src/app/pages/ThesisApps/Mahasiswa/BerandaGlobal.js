import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import { Typography } from "@mui/material";
// import MenuPengajuanJudulDosen from "app/shared/MenuHorizontal/MenuPengajuanJudulDosen";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import BerandaPengajuanJudul from "./BerandaPengajuanJudul";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import MenuSekertaris from "app/shared/MenuHorizontal/MenuSekertaris";
import MenuAnggotaPanalisProposal from "app/shared/MenuHorizontal/MenuAnggotaPanalisProposal";
import MenuKetuaPanalisProposal from "app/shared/MenuHorizontal/MenuKetuaPanalisProposal";
import MenuCoAdvisorProposal from "app/shared/MenuHorizontal/MenuCoAdvisorProposal";
import MenuAdvisorProposal from "app/shared/MenuHorizontal/MenuAdvisorProposal";
import BerandaProposalMahasiswa from "./BerandaProposalMahasiswa";
import BerandaSkripsiMahasiswa from "./BerandaSkripsiMahasiswa";

const BerandaGlobal = () => {
  const groupId = useParams().groupId;
  console.log("group id: ", groupId);
  const [progress, setProgress] = useState(null);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);
  const role = useParams().role;
  console.log(role);

  if (progress !== null) {
    console.log("Progress:", progress);
  }

  // const { id } = JSON.parse(localStorage.getItem("user"));

  // const idTest = useParams().id;
  // const roleTest = useParams().role;
  // console.log(idTest, roleTest);

  // const { role } = JSON.parse(localStorage.getItem("user"));
  // const role = ["ADVISOR", "DOSEN"];
  // console.log(role);

  // kondisi beranda
  // State untuk melacak kondisi
  const [kondisi, setKondisi] = useState("berandaPengajuanSkripsi");

  // Fungsi untuk mengubah kondisi
  const handleKondisiBeranda = () => {
    if (kondisi === "berandaPengajuanJudul") {
      setKondisi("berandaPengajuanProposal");
    } else if (kondisi === "berandaPengajuanProposal") {
      setKondisi("berandaPengajuanSkripsi");
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
          Beranda
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
          {/* jika progress tidak null maka menyimpannya di setProgress */}
          <Riwayatlog
            value={groupId}
            riwayatData={(progress) => progress && setProgress(progress)}
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
          {/* DOSEN SKRIPSI */}
          <Div
            hidden={role.includes("DOSEN") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuKetuaPanalisProposal />
          </Div>
          {/* ADVISOR */}
          <Div
            hidden={role.includes("ADVISOR") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuAdvisorProposal />
          </Div>
          {/* CO_ADVISOR */}
          <Div
            hidden={role.includes("CO_ADVISOR") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuCoAdvisorProposal />
          </Div>
          {/* KETUA PANALIS */}
          <Div
            hidden={role.includes("KETUA_PANALIS") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuKetuaPanalisProposal />
          </Div>
          {/* ANGGOTA PANALIS */}
          <Div
            hidden={role.includes("ANGGOTA_PANALIS") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuAnggotaPanalisProposal />
          </Div>
          {/* KAPRODI */}
          {/* <Div
            hidden={role.includes("KAPRODI") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuKaprodiProposal />
          </Div> */}
          {/* SEKERTARIS */}
          <Div
            hidden={role.includes("SEKERTARIS") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuSekertaris />
          </Div>
          {/* MAHASISWA */}
          <Div
            hidden={role.includes("mahasiswa") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuMahasiswa />
          </Div>

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
            {/* {progress === "Submission" && (
              <BerandaPengajuanJudul value={groupId} />
            )} */}
            {progress === "Submission" && (
              <BerandaPengajuanJudul value={groupId} />
            )}
            {progress === "Proposal" && (
              <BerandaProposalMahasiswa value={groupId} />
            )}
            {progress === "Skripsi" && (
              <BerandaSkripsiMahasiswa value={groupId} />
            )}
            {progress === "Finished" && (
              <BerandaSkripsiMahasiswa value={groupId} />
            )}
          </Div>
        </Div>
        {/* Element 2 End */}
      </Div>
    </Div>
  );
};

export default BerandaGlobal;
