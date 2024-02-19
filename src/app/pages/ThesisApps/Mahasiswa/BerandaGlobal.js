import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Div from "@jumbo/shared/Div";
import { Typography } from "@mui/material";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import BerandaPengajuanJudul from "./BerandaPengajuanJudul";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import MenuDosen from "app/shared/MenuHorizontal/MenuDosen";
import MenuDosenSkripsi from "app/shared/MenuHorizontal/MenuDosenSkripsi";
import MenuAdvisor from "app/shared/MenuHorizontal/MenuAdvisor";
import MenuCoAdvisor from "app/shared/MenuHorizontal/MenuCoAdvisor";
import MenuKetuaPanelis from "app/shared/MenuHorizontal/MenuKetuaPanelis";
import MenuAnggotaPanelis from "app/shared/MenuHorizontal/MenuAnggotaPanelis";
import MenuDekan from "app/shared/MenuHorizontal/MenuDekan";
import MenuKaprodi from "app/shared/MenuHorizontal/MenuKaprodi";
import MenuSekertaris from "app/shared/MenuHorizontal/MenuSekertaris";
import BerandaProposalMahasiswa from "./BerandaProposalMahasiswa";
import BerandaSkripsiMahasiswa from "./BerandaSkripsiMahasiswa";

const BerandaGlobal = () => {
  const [advisorAndCoAdvisor, setAdvisorAndCoAdvisor] = useState();

  const groupId = useParams().groupId;
  console.log("group id: ", groupId);
  const [progress, setProgress] = useState(null);

  const userRole = useParams().role;
  console.log(userRole);

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
            riwayatData={(data) => {
              if (data) {
                setProgress(data.progress);
                setAdvisorAndCoAdvisor({
                  coAdvisor1: data.co_advisor1,
                  coAdvisor2: data.co_advisor2,
                });
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
          {/* DOSEN */}
          <Div
            hidden={userRole === "DOSEN" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuDosen
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Beranda"}
            />
          </Div>
          {/* DOSEN SKRIPSI */}
          <Div
            hidden={userRole === "DOSEN_MK" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuDosenSkripsi
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Beranda"}
            />
          </Div>
          {/* ADVISOR */}
          <Div
            hidden={userRole === "ADVISOR" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuAdvisor
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Beranda"}
            />
          </Div>
          {/* CO_ADVISOR */}
          <Div
            hidden={
              userRole === "CO_ADVISOR1" || userRole === "CO_ADVISOR2"
                ? false
                : true
            }
            sx={{ width: "100%" }}
          >
            <MenuCoAdvisor
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Beranda"}
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
              page={"Beranda"}
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
              page={"Beranda"}
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
              page={"Beranda"}
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
              page={"Beranda"}
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
              page={"Beranda"}
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
              page={"Beranda"}
            />
          </Div>
          {/* Menu horizontal End */}
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
            {progress === "Submission" && (
              <BerandaPengajuanJudul value={groupId} />
            )}
            {progress === "Proposal" && (
              <BerandaProposalMahasiswa
                value={groupId}
                status={advisorAndCoAdvisor}
              />
            )}
            {progress === "Skripsi" && (
              <BerandaSkripsiMahasiswa
                value={groupId}
                status={advisorAndCoAdvisor}
              />
            )}
            {progress === "Finished" && (
              <BerandaSkripsiMahasiswa
                value={groupId}
                status={advisorAndCoAdvisor}
              />
            )}
          </Div>
        </Div>
        {/* Element 2 End */}
      </Div>
    </Div>
  );
};

export default BerandaGlobal;
