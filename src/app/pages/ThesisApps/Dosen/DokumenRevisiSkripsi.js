import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import MenuDosenSkripsi from "app/shared/MenuHorizontal/MenuDosenSkripsi";
import MenuAdvisor from "app/shared/MenuHorizontal/MenuAdvisor";
import MenuCoAdvisor from "app/shared/MenuHorizontal/MenuCoAdvisor";
import MenuKetuaPanelis from "app/shared/MenuHorizontal/MenuKetuaPanelis";
import MenuAnggotaPanelis from "app/shared/MenuHorizontal/MenuAnggotaPanelis";
import MenuDekan from "app/shared/MenuHorizontal/MenuDekan";
import MenuKaprodi from "app/shared/MenuHorizontal/MenuKaprodi";

// View Document Revisi
const PDFViewerProposal = ({ dokumenRevisi }) => {
  const viewPDFProposal = () => {
    // Buat URL objek untuk file PDF
    const pdfURL = dokumenRevisi?.file_path_revision;

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span sx={{ fontSize: "10px" }} onClick={viewPDFProposal}>
        Lihat
      </span>
    </div>
  );
};

const DokumenRevisiSkripsi = () => {
  // state - menyimpan request data
  const [dokumenRevisi, setDokumenRevisi] = useState();
  const [perubahan, setPerubahan] = useState();

  const [advisorAndCoAdvisor, setAdvisorAndCoAdvisor] = useState();

  const groupId = useParams().groupId;
  console.log("group id: ", groupId);
  const [progress, setProgress] = useState(null);
  const [skripsiId, setSkripsiId] = useState(null);

  const userRole = useParams().role;
  console.log("role user akses page: ", userRole);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  const { role } = JSON.parse(localStorage.getItem("user"));
  // const role = ["ADVISOR", "DOSEN"];
  console.log("role user yang sign in: ", role);

  useEffect(() => {
    const fetchDokumenSkripsiData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/skripsi-revision-document/${skripsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setDokumenRevisi(response.data.data);
        console.log("Request Get dokumen revisi skripsi: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil dokumen revisi skripsi:",
          error
        );
      }
    };
    const fetchPerubahanData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/skripsi-changes/${skripsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setPerubahan(response.data.data);
        console.log("Request Get perubahan skripsi: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil perubahan skripsi:",
          error
        );
      }
    };
    fetchDokumenSkripsiData();
    fetchPerubahanData();
  }, [token, skripsiId]);

  // state untuk Upload RevisiSkripsi Ketua Panalis
  const [isSetujuClicked, setIsSetujuClicked] = useState(false);
  const [isTolakClicked, setIsTolakClicked] = useState(false);
  const [isSetujuDisabled, setIsSetujuDisabled] = useState(false);
  const [isTolakDisabled, setIsTolakDisabled] = useState(false);

  // state untuk Upload RevisiSkripsi Advisor
  const [isSetujuClickedAdvisor, setIsSetujuClickedAdvisor] = useState(false);
  const [isTolakClickedAdvisor, setIsTolakClickedAdvisor] = useState(false);
  const [isSetujuDisabledAdvisor, setIsSetujuDisabledAdvisor] = useState(false);
  const [isTolakDisabledAdvisor, setIsTolakDisabledAdvisor] = useState(false);

  // state untuk Upload RevisiSkripsi Anggota Panalis
  const [isSetujuClickedAnggotaPanalis, setIsSetujuClickedAnggotaPanalis] =
    useState(false);
  const [isTolakClickedAnggotaPanalis, setIsTolakClickedAnggotaPanalis] =
    useState(false);
  const [isSetujuDisabledAnggotaPanalis, setIsSetujuDisabledAnggotaPanalis] =
    useState(false);
  const [isTolakDisabledAnggotaPanalis, setIsTolakDisabledAnggotaPanalis] =
    useState(false);

  // menggubah status Ketua Panalis setuju atau tolak
  const [ketuaPenelisStatus, setKetuaPenelisStatus] = useState([]);
  const [selectedRevisiSkripsiIndex, setSelectedRevisiSkripsiIndex] =
    useState(null);

  // menggubah status Advisor setuju atau tolak
  const [AdvisorStatus, setAdvisorStatus] = useState([]);
  const [
    selectedRevisiSkripsiIndexAdvisor,
    setSelectedRevisiSkripsiIndexAdvisor,
  ] = useState(null);

  // menggubah status Anggota Panalis setuju atau tolak
  const [AnggotaPanalisStatus, setAnggotaPanalisStatus] = useState([]);
  const [
    selectedRevisiSkripsiIndexAnggotaPanalis,
    setSelectedRevisiSkripsiIndexAnggotaPanalis,
  ] = useState(null);

  // popup konfirmasi setuju dan tolak Ketua panalis
  const [setujuConfirmationDialogOpen, setSetujuConfirmationDialogOpen] =
    useState(false);
  const [tolakConfirmationDialogOpen, setTolakConfirmationDialogOpen] =
    useState(false);
  const [selectedActionIndex, setSelectedActionIndex] = useState(null);

  // popup konfirmasi setuju dan tolak Advisor
  const [
    setujuConfirmationDialogOpenAdvisor,
    setSetujuConfirmationDialogOpenAdvisor,
  ] = useState(false);
  const [
    tolakConfirmationDialogOpenAdvisor,
    setTolakConfirmationDialogOpenAdvisor,
  ] = useState(false);
  const [selectedActionIndexAdvisor, setSelectedActionIndexAdvisor] =
    useState(null);

  // popup konfirmasi setuju dan tolak Advisor
  const [
    setujuConfirmationDialogOpenAnggotaPanalis,
    setSetujuConfirmationDialogOpenAnggotaPanalis,
  ] = useState(false);
  const [
    tolakConfirmationDialogOpenAnggotaPanalis,
    setTolakConfirmationDialogOpenAnggotaPanalis,
  ] = useState(false);
  const [
    selectedActionIndexAnggotaPanalis,
    setSelectedActionIndexAnggotaPanalis,
  ] = useState(null);

  // Ketua Panalis
  const handleActionClick = (index, status) => {
    // Memeriksa apakah tindakan tersebut sudah dilakukan
    if (
      (status === "Setuju" && isSetujuClicked) ||
      (status === "Tolak" && isTolakClicked)
    ) {
      // Jika sudah dilakukan, tidak melakukan apa-apa
      return;
    }

    setSelectedRevisiSkripsiIndex(index);
    setKetuaPenelisStatus(status);

    if (status === "Setuju") {
      setIsSetujuClicked(true);
    } else if (status === "Tolak") {
      setIsTolakClicked(true);
    }
  };

  // Advisor
  const handleActionClickAdvisor = (index, status) => {
    // Memeriksa apakah tindakan tersebut sudah dilakukan
    if (
      (status === "Setuju" && isSetujuClickedAdvisor) ||
      (status === "Tolak" && isTolakClickedAdvisor)
    ) {
      // Jika sudah dilakukan, tidak melakukan apa-apa
      return;
    }

    setSelectedRevisiSkripsiIndexAdvisor(index);
    setAdvisorStatus(status);

    if (status === "Setuju") {
      setIsSetujuClickedAdvisor(true);
    } else if (status === "Tolak") {
      setIsTolakClickedAdvisor(true);
    }
  };

  // Anggota Panalis
  const handleActionClickAnggotaPanalis = (index, status) => {
    // Memeriksa apakah tindakan tersebut sudah dilakukan
    if (
      (status === "Setuju" && isSetujuClickedAnggotaPanalis) ||
      (status === "Tolak" && isTolakClickedAnggotaPanalis)
    ) {
      // Jika sudah dilakukan, tidak melakukan apa-apa
      return;
    }

    setSelectedRevisiSkripsiIndexAnggotaPanalis(index);
    setAnggotaPanalisStatus(status);

    if (status === "Setuju") {
      setIsSetujuClickedAnggotaPanalis(true);
    } else if (status === "Tolak") {
      setIsTolakClickedAnggotaPanalis(true);
    }
  };

  // approve
  const handleApprove = () => {
    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/skripsi-revision-document/approve/${skripsiId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Berhasil approve revisi skripsi: ", response.data.data);

        // ketua
        setSetujuConfirmationDialogOpen(false);
        handleActionClick(selectedActionIndex, "Setuju");
        setIsSetujuDisabled(true);
        // anggota
        setSetujuConfirmationDialogOpenAnggotaPanalis(false);
        handleActionClickAnggotaPanalis(selectedActionIndex, "Setuju");
        setIsSetujuDisabledAnggotaPanalis(true);
        // advisor
        setSetujuConfirmationDialogOpenAdvisor(false);
        handleActionClickAdvisor(selectedActionIndex, "Setuju");
        setIsSetujuDisabledAdvisor(true);

        // request data
        const fetchDokumenSkripsiData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/skripsi-revision-document/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setDokumenRevisi(response.data.data);
            console.log(
              "Request Get dokumen revisi skripsi: ",
              response.data.data
            );
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil dokumen revisi skripsi:",
              error
            );
          }
        };
        fetchDokumenSkripsiData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat approve revisi skripsi:",
          error.response.data.message
        );
      });
  };

  // reject
  const handleReject = () => {
    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/skripsi-revision-document/reject/${skripsiId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Berhasil reject skripsi: ", response.data.data);

        // ketua
        setTolakConfirmationDialogOpen(false);
        handleActionClick(selectedActionIndex, "Tolak");
        setIsTolakDisabled(true);
        // anggota
        setTolakConfirmationDialogOpenAnggotaPanalis(false);
        handleActionClickAnggotaPanalis(selectedActionIndex, "Tolak");
        setIsTolakDisabledAnggotaPanalis(true);
        // advisor
        setTolakConfirmationDialogOpenAdvisor(false);
        handleActionClickAdvisor(selectedActionIndex, "Tolak");
        setIsTolakDisabledAdvisor(true);

        // request data
        const fetchDokumenSkripsiData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/skripsi-revision-document/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setDokumenRevisi(response.data.data);
            console.log(
              "Request Get dokumen revisi skripsi: ",
              response.data.data
            );
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil dokumen revisi skripsi:",
              error
            );
          }
        };
        fetchDokumenSkripsiData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat reject skripsi:",
          error.response.data.message
        );
      });
  };

  let ActionRevision;

  if (userRole === "ADVISOR") {
    ActionRevision = () => (
      <Div
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {dokumenRevisi?.file_name_revision !== null && (
          <>
            {dokumenRevisi?.is_revision_approve_by_advisor === "Approve" ? (
              <span
                style={{
                  textDecoration: "none",
                  cursor: "not-allowed",
                  color: "gray",
                  fontSize: "12px",
                  borderTop: "1px solid #000",
                  borderBottom: "1px solid #000",
                  padding: "5px 0",
                }}
              >
                Setuju
              </span>
            ) : (
              <span
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "green",
                  fontSize: "12px",
                  borderTop: "1px solid #000",
                  borderBottom: "1px solid #000",
                  padding: "5px 0",
                }}
                onClick={() => {
                  setSelectedActionIndexAdvisor(1);
                  setSetujuConfirmationDialogOpenAdvisor(true);
                }}
              >
                Setuju
              </span>
            )}
            {dokumenRevisi?.is_revision_approve_by_advisor === "Approve" ||
            dokumenRevisi?.is_revision_approve_by_advisor === "Rejected" ? (
              <span
                style={{
                  textDecoration: "none",
                  cursor: "not-allowed",
                  color: "gray",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
              >
                Tolak
              </span>
            ) : (
              <span
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "red",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
                onClick={() => {
                  setSelectedActionIndexAdvisor(2);
                  setTolakConfirmationDialogOpenAdvisor(true);
                }}
              >
                Tolak
              </span>
            )}
          </>
        )}
      </Div>
    );
  } else if (userRole === "KETUA_PANELIS") {
    ActionRevision = () => (
      <Div
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {dokumenRevisi?.file_name_revision !== null && (
          <>
            {dokumenRevisi?.is_revision_approve_by_panelist_chairman ===
            "Approve" ? (
              <span
                style={{
                  textDecoration: "none",
                  cursor: "not-allowed",
                  color: "gray",
                  fontSize: "12px",
                  borderTop: "1px solid #000",
                  borderBottom: "1px solid #000",
                  padding: "5px 0",
                }}
              >
                Setuju
              </span>
            ) : (
              <span
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "green",
                  fontSize: "12px",
                  borderTop: "1px solid #000",
                  borderBottom: "1px solid #000",
                  padding: "5px 0",
                }}
                onClick={() => {
                  setSelectedActionIndex(1);
                  setSetujuConfirmationDialogOpen(true);
                }}
              >
                Setuju
              </span>
            )}
            {dokumenRevisi?.is_revision_approve_by_panelist_chairman ===
              "Approve" ||
            dokumenRevisi?.is_revision_approve_by_panelist_chairman ===
              "Rejected" ? (
              <span
                style={{
                  textDecoration: "none",
                  cursor: "not-allowed",
                  color: "gray",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
              >
                Tolak
              </span>
            ) : (
              <span
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "red",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
                onClick={() => {
                  setSelectedActionIndex(2);
                  setTolakConfirmationDialogOpen(true);
                }}
              >
                Tolak
              </span>
            )}
          </>
        )}
      </Div>
    );
  } else if (userRole === "ANGGOTA_PANELIS") {
    ActionRevision = () => (
      <Div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {dokumenRevisi?.file_name_revision !== null && (
          <>
            {dokumenRevisi?.is_revision_approve_by_panelist_member ===
            "Approve" ? (
              <span
                style={{
                  textDecoration: "none",
                  cursor: "not-allowed",
                  color: "gray",
                  fontSize: "12px",
                  borderTop: "1px solid #000",
                  borderBottom: "1px solid #000",
                  padding: "5px 0",
                }}
              >
                Setuju
              </span>
            ) : (
              <span
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "green",
                  fontSize: "12px",
                  borderTop: "1px solid #000",
                  borderBottom: "1px solid #000",
                  padding: "5px 0",
                }}
                onClick={() => {
                  setSelectedActionIndexAnggotaPanalis(1);
                  setSetujuConfirmationDialogOpenAnggotaPanalis(true);
                }}
              >
                Setuju
              </span>
            )}
            {dokumenRevisi?.is_revision_approve_by_panelist_member ===
              "Approve" ||
            dokumenRevisi?.is_revision_approve_by_panelist_member ===
              "Rejected" ? (
              <span
                style={{
                  textDecoration: "none",
                  cursor: "not-allowed",
                  color: "gray",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
              >
                Tolak
              </span>
            ) : (
              <span
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "red",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
                onClick={() => {
                  setSelectedActionIndexAnggotaPanalis(2);
                  setTolakConfirmationDialogOpenAnggotaPanalis(true);
                }}
              >
                Tolak
              </span>
            )}
          </>
        )}
      </Div>
    );
  } else ActionRevision = () => <div style={{ display: "none" }} />;

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
          Dokumen Revisi Skripsi
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
          {/* Riwayat Log Start */}
          <Riwayatlog
            value={groupId}
            riwayatData={(data) => {
              if (data) {
                setProgress(data.progress);
                setSkripsiId(data.skripsi_id);
                setAdvisorAndCoAdvisor({
                  coAdvisor1: data.co_advisor1,
                  coAdvisor2: data.co_advisor2,
                });
              }
            }}
          />
          {/* Riwayat Log End */}
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
              page={"Dokumen Revisi Skripsi"}
            />
          </Div>
          {/* DOSEN ADVISOR */}
          <Div
            hidden={userRole === "ADVISOR" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuAdvisor
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Dokumen Revisi Skripsi"}
            />
          </Div>
          {/* DOSEN CO_ADVISOR */}
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
              page={"Dokumen Revisi Skripsi"}
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
              page={"Dokumen Revisi Skripsi"}
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
              page={"Dokumen Revisi Skripsi"}
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
              page={"Dokumen Revisi Skripsi"}
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
              page={"Dokumen Revisi Skripsi"}
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
            <Typography
              sx={{
                width: "100%",
                display: "flex",
                padding: "24px",
                alignItems: "center",
                gap: "10px",
                color: "#192434",
                background: "rgba(26, 56, 96, 0.10)",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Perubahan
            </Typography>

            {/* View PerubahanStart*/}
            <Div
              sx={{
                display: "flex",
                width: "100%",
                padding: "0 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "25px",
              }}
            >
              {/* Perubahan Ketua Panalis */}
              <Div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                }}
              >
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    background: "rgba(26, 56, 96, 0.10)",
                    padding: "14px 16px",
                    borderRadius: "6px",
                  }}
                >
                  <Typography variant="subtitle2">Ketua Panalis</Typography>
                </Div>
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    padding: "14px 16px",
                    border: "2px solid rgba(26, 56, 96, 0.10)",
                    borderRadius: "0 0 6px 6px",
                  }}
                >
                  <Typography>{perubahan?.changes_by_chairman}</Typography>
                </Div>
              </Div>
              {/* Perubahan Anggota Panalis */}
              <Div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                }}
              >
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    background: "rgba(26, 56, 96, 0.10)",
                    padding: "14px 16px",
                    borderRadius: "6px",
                  }}
                >
                  <Typography variant="subtitle2">Anggota Panalis</Typography>
                </Div>
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    padding: "14px 16px",
                    border: "2px solid rgba(26, 56, 96, 0.10)",
                    borderRadius: "0 0 6px 6px",
                  }}
                >
                  <Typography>{perubahan?.changes_by_member}</Typography>
                </Div>
              </Div>
              {/* Perubahan Advisor */}
              <Div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                }}
              >
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    background: "rgba(26, 56, 96, 0.10)",
                    padding: "14px 16px",
                    borderRadius: "6px",
                  }}
                >
                  <Typography variant="subtitle2">Advisor</Typography>
                </Div>
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    padding: "14px 16px",
                    border: "2px solid rgba(26, 56, 96, 0.10)",
                    borderRadius: "0 0 6px 6px",
                  }}
                >
                  <Typography>{perubahan?.changes_by_advisor}</Typography>
                </Div>
              </Div>
              {/* Perubahan Co-Advisor 1 */}
              {advisorAndCoAdvisor?.coAdvisor1 && (
                <Div
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                  }}
                >
                  <Div
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      background: "rgba(26, 56, 96, 0.10)",
                      padding: "14px 16px",
                      borderRadius: "6px",
                    }}
                  >
                    <Typography variant="subtitle2">Co-Advisor 1</Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      padding: "14px 16px",
                      border: "2px solid rgba(26, 56, 96, 0.10)",
                      borderRadius: "0 0 6px 6px",
                    }}
                  >
                    <Typography>{perubahan?.changes_by_co_advisor1}</Typography>
                  </Div>
                </Div>
              )}
              {/* Perubahan Co-Advisor 2 */}
              {advisorAndCoAdvisor?.coAdvisor2 && (
                <Div
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                  }}
                >
                  <Div
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      background: "rgba(26, 56, 96, 0.10)",
                      padding: "14px 16px",
                      borderRadius: "6px",
                    }}
                  >
                    <Typography variant="subtitle2">Co-Advisor 2</Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                      padding: "14px 16px",
                      border: "2px solid rgba(26, 56, 96, 0.10)",
                      borderRadius: "0 0 6px 6px",
                    }}
                  >
                    <Typography>{perubahan?.changes_by_co_advisor2}</Typography>
                  </Div>
                </Div>
              )}
            </Div>
            {/* View Perubahan End */}
            <Typography
              sx={{
                width: "100%",
                display: "flex",
                padding: "24px",
                alignItems: "center",
                gap: "10px",
                color: "#192434",
                background: "rgba(26, 56, 96, 0.10)",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600, // Membuat teks lebih tebal (nilai 600)
              }}
            >
              Dokumen Revisi Skripsi
            </Typography>

            {/* Table 2 Start */}
            <Div
              sx={{
                width: "100%",
                padding: "0 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "25px",
              }}
            >
              {/* Table Upload Revisi Skripsi Start*/}
              <TableContainer sx={{ marginBottom: "25px" }}>
                <Table>
                  <TableHead sx={{ background: "#F5F5F5", width: "100%" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      {/* <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "3%" }}
                      >
                        Nomor
                      </TableCell> */}
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          padding: "11px",
                          width: "15%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        Nama File
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          padding: "11px",
                          maxWidth: "10%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        Tanggal
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "10%" }}
                      >
                        Ukuran
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "15%" }}
                      >
                        Ketua Panalis
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "15%" }}
                      >
                        Anggota Panalis
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "15%" }}
                      >
                        Advisor
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          padding: "11px",
                          textAlign: "center",
                          width: "12%",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      {/* <TableCell>1</TableCell> */}
                      <TableCell sx={{ fontSize: "12px" }}>
                        {dokumenRevisi?.file_name_revision}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {dokumenRevisi?.upload_date_revision}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {dokumenRevisi?.file_size_revision}
                      </TableCell>
                      {/* status ketua panalis */}
                      <TableCell>
                        {dokumenRevisi?.is_revision_approve_by_panelist_chairman ===
                        "Approve" ? (
                          <Chip
                            size="small"
                            label="Disetujui"
                            sx={{
                              background: "rgba(0, 255, 0, 0.10)",
                              color: "#008000",
                              fontSize: "10px",
                            }}
                          />
                        ) : dokumenRevisi?.is_revision_approve_by_panelist_chairman ===
                          "Rejected" ? (
                          <Chip
                            size="small"
                            label="Ditolak"
                            sx={{
                              background: "rgba(255, 0, 0, 0.10)",
                              color: "#FF0000",
                              fontSize: "10px",
                            }}
                          />
                        ) : dokumenRevisi?.is_revision_approve_by_panelist_chairman ===
                          "Waiting" ? (
                          <Chip
                            size="small"
                            label="Menunggu"
                            sx={{
                              background: "rgba(255, 204, 0, 0.10)",
                              color: "#985211",
                              fontSize: "10px",
                            }}
                          />
                        ) : null}
                      </TableCell>
                      {/* status Anggota panalis */}
                      <TableCell>
                        {dokumenRevisi?.is_revision_approve_by_panelist_member ===
                        "Approve" ? (
                          <Chip
                            size="small"
                            label="Disetujui"
                            sx={{
                              background: "rgba(0, 255, 0, 0.10)",
                              color: "#008000",
                              fontSize: "10px",
                            }}
                          />
                        ) : dokumenRevisi?.is_revision_approve_by_panelist_member ===
                          "Rejected" ? (
                          <Chip
                            size="small"
                            label="Ditolak"
                            sx={{
                              background: "rgba(255, 0, 0, 0.10)",
                              color: "#FF0000",
                              fontSize: "10px",
                            }}
                          />
                        ) : dokumenRevisi?.is_revision_approve_by_panelist_member ===
                          "Waiting" ? (
                          <Chip
                            size="small"
                            label="Menunggu"
                            sx={{
                              background: "rgba(255, 204, 0, 0.10)",
                              color: "#985211",
                              fontSize: "10px",
                            }}
                          />
                        ) : null}
                      </TableCell>
                      {/* status advisor */}
                      <TableCell>
                        {dokumenRevisi?.is_revision_approve_by_advisor ===
                        "Approve" ? (
                          <Chip
                            size="small"
                            label="Disetujui"
                            sx={{
                              background: "rgba(0, 255, 0, 0.10)",
                              color: "#008000",
                              fontSize: "10px",
                            }}
                          />
                        ) : dokumenRevisi?.is_revision_approve_by_advisor ===
                          "Rejected" ? (
                          <Chip
                            size="small"
                            label="Ditolak"
                            sx={{
                              background: "rgba(255, 0, 0, 0.10)",
                              color: "#FF0000",
                              fontSize: "10px",
                            }}
                          />
                        ) : dokumenRevisi?.is_revision_approve_by_advisor ===
                          "Waiting" ? (
                          <Chip
                            size="small"
                            label="Menunggu"
                            sx={{
                              background: "rgba(255, 204, 0, 0.10)",
                              color: "#985211",
                              fontSize: "10px",
                            }}
                          />
                        ) : null}
                      </TableCell>
                      <TableCell>
                        <Div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          {dokumenRevisi?.file_name_revision !== null && (
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                color: "blue",
                                fontSize: "12px",
                                padding: "5px 0",
                              }}
                            >
                              <PDFViewerProposal
                                dokumenRevisi={dokumenRevisi}
                              />
                            </span>
                          )}
                          {/* Menampilkan pengisian ADVISOR, KETUA PANALIS, DAN ANGGOTA PANALIS */}
                          <ActionRevision />
                        </Div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Upload Revisi Skripsi End*/}
            </Div>
            {/* Table 2 End */}
          </Div>
          {/* Element 2 End */}
        </Div>
      </Div>

      {/* popup konfirmasi setuju Ketua Panalis*/}
      <Dialog
        open={setujuConfirmationDialogOpen}
        onClose={() => setSetujuConfirmationDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
            Menyetujui Revisi Skripsi
          </Typography>
        </DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menyetujui revisi ini?
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={() => setSetujuConfirmationDialogOpen(false)}
            sx={{
              background: "white",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              textTransform: "none",
              color: "black",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={handleApprove}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Setujui
          </Button>
        </DialogActions>
      </Dialog>

      {/* popup konfirmasi tolak Ketua Panalis */}
      <Dialog
        open={tolakConfirmationDialogOpen}
        onClose={() => setTolakConfirmationDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
          }}
        >
          <WarningIcon fontSize="small" sx={{ marginRight: "6px" }} />
          <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
            Menolak Revisi Skripsi
          </Typography>
        </DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menolak revisi ini?
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={() => setTolakConfirmationDialogOpen(false)}
            sx={{
              background: "white",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              textTransform: "none",
              color: "black",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={handleReject}
            sx={{
              textTransform: "none",
              background: "#FC0",
              color: "#263445",
              "&:hover": {
                color: "#FC0",
              },
            }}
          >
            Ditolak
          </Button>
        </DialogActions>
      </Dialog>

      {/* popup konfirmasi setuju Anggota Panalis*/}
      <Dialog
        open={setujuConfirmationDialogOpenAnggotaPanalis}
        onClose={() => setSetujuConfirmationDialogOpenAnggotaPanalis(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
            Menyetujui Revisi Skripsi
          </Typography>
        </DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menyetujui revisi ini?
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={() => setSetujuConfirmationDialogOpenAnggotaPanalis(false)}
            sx={{
              background: "white",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              textTransform: "none",
              color: "black",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={handleApprove}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Setujui
          </Button>
        </DialogActions>
      </Dialog>

      {/* popup konfirmasi tolak Anggota Panalis */}
      <Dialog
        open={tolakConfirmationDialogOpenAnggotaPanalis}
        onClose={() => setTolakConfirmationDialogOpenAnggotaPanalis(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
          }}
        >
          <WarningIcon fontSize="small" sx={{ marginRight: "6px" }} />
          <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
            Menolak Revisi Skripsi
          </Typography>
        </DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menolak revisi ini?
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={() => setTolakConfirmationDialogOpenAnggotaPanalis(false)}
            sx={{
              background: "white",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              textTransform: "none",
              color: "black",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={handleReject}
            sx={{
              textTransform: "none",
              background: "#FC0",
              color: "#263445",
              "&:hover": {
                color: "#FC0",
              },
            }}
          >
            Ditolak
          </Button>
        </DialogActions>
      </Dialog>

      {/* popup konfirmasi setuju Advisor*/}
      <Dialog
        open={setujuConfirmationDialogOpenAdvisor}
        onClose={() => setSetujuConfirmationDialogOpenAdvisor(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
            Menyetujui Revisi Skripsi
          </Typography>
        </DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menyetujui revisi ini?
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={() => setSetujuConfirmationDialogOpenAdvisor(false)}
            sx={{
              background: "white",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              textTransform: "none",
              color: "black",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={handleApprove}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Setujui
          </Button>
        </DialogActions>
      </Dialog>

      {/* popup konfirmasi tolak Advisor*/}
      <Dialog
        open={tolakConfirmationDialogOpenAdvisor}
        onClose={() => setTolakConfirmationDialogOpenAdvisor(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
          }}
        >
          <WarningIcon fontSize="small" sx={{ marginRight: "6px" }} />
          <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
            Menolak Revisi Skripsi
          </Typography>
        </DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menolak revisi ini?
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={() => setTolakConfirmationDialogOpenAdvisor(false)}
            sx={{
              background: "white",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              textTransform: "none",
              color: "black",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={handleReject}
            sx={{
              textTransform: "none",
              background: "#FC0",
              color: "#263445",
              "&:hover": {
                color: "#FC0",
              },
            }}
          >
            Ditolak
          </Button>
        </DialogActions>
      </Dialog>
    </Div>
  );
};

export default DokumenRevisiSkripsi;
