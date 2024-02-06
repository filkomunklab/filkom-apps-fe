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
  TextareaAutosize,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  DialogContentText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
const PDFViewerSkripsi = ({ dokumenRevisi }) => {
  const viewPDFSkripsi = () => {
    // Buat URL objek untuk file PDF
    const pdfURL = dokumenRevisi?.file_path_revision;

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span sx={{ fontSize: "10px" }} onClick={viewPDFSkripsi}>
        Lihat
      </span>
    </div>
  );
};

const DokumenRevisiSkripsi = () => {
  // state - menyimpan request data
  const [dokumenRevisi, setDokumenRevisi] = useState();
  const [perubahan, setPerubahan] = useState();
  const [date, setDate] = useState();

  // State - mengatur tanggal
  const [selectedDate, setSelectedDate] = useState("");
  const [isEditing, setEditing] = useState(false);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [tanggal, setTanggal] = useState("");
  const [konfirmasiOpen, setKonfirmasiOpen] = useState(false);
  const [showTanggal, setShowTanggal] = useState(false);

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
    const fetchTanggalData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/submission-dateline/${skripsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setDate(response.data.data);
        console.log("Request Get tanggal batas revisi: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil tanggal batas revisi:",
          error
        );
      }
    };
    fetchDokumenSkripsiData();
    fetchPerubahanData();
    fetchTanggalData();
  }, [token, skripsiId]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSimpan = () => {
    setKonfirmasiOpen(true);
  };

  const handleBatal = () => {
    setSelectedDate(date?.submission_dateline);
    setOpen(false);
  };

  const handleKonfirmasiClose = () => {
    setKonfirmasiOpen(false);
  };

  const handleKonfirmasiSimpan = () => {
    setOpen(false);
    setKonfirmasiOpen(false);
    setShowTanggal(true);
  };

  // // mengatur tanggal
  // const handleEdit = () => {
  //   // mengisi date dengan data yang sudah ada
  //   setSelectedDate(date?.submission_dateline);
  //   setEditing(true);
  // };

  // const handleCancelEdit = () => {
  //   // reset date
  //   setSelectedDate();
  //   setEditing(false);
  // };

  // const handleSubmitDate = () => {
  //   setConfirmationDialogOpen(true);
  // };

  const handleConfirmSubmitDate = () => {
    const batasRevisi = {
      submission_dateline: selectedDate,
    };
    console.log("Tanggal batas revisi yang akan dikirim: ", batasRevisi);
    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/submission-dateline/${skripsiId}`,
        batasRevisi,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(`Berhasil mengisi tanggal batas revisi: `, response.data);

        // reset date
        setSelectedDate();
        setConfirmationDialogOpen(false);
        setEditing(false);

        // request data
        const fetchTanggalData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/submission-dateline/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setDate(response.data.data);
            console.log(
              "Request Get tanggal batas revisi: ",
              response.data.data
            );
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil tanggal batas revisi:",
              error
            );
          }
        };
        fetchTanggalData();
      })
      .catch((error) => {
        console.error(
          `Terjadi kesalahan saat mengisi tanggal batas revisi: `,
          error
        );
      });
  };

  const handleCancelSubmitDate = () => {
    setConfirmationDialogOpen(false);
  };

  // state untuk Upload RevisiSkripsi Ketua Panelis
  const [isSetujuClicked, setIsSetujuClicked] = useState(false);
  const [isTolakClicked, setIsTolakClicked] = useState(false);
  const [isSetujuDisabled, setIsSetujuDisabled] = useState(false);
  const [isTolakDisabled, setIsTolakDisabled] = useState(false);

  // state untuk Upload RevisiSkripsi Advisor
  const [isSetujuClickedAdvisor, setIsSetujuClickedAdvisor] = useState(false);
  const [isTolakClickedAdvisor, setIsTolakClickedAdvisor] = useState(false);
  const [isSetujuDisabledAdvisor, setIsSetujuDisabledAdvisor] = useState(false);
  const [isTolakDisabledAdvisor, setIsTolakDisabledAdvisor] = useState(false);

  // state untuk Upload RevisiSkripsi Anggota Panelis
  const [isSetujuClickedAnggotaPanalis, setIsSetujuClickedAnggotaPanalis] =
    useState(false);
  const [isTolakClickedAnggotaPanalis, setIsTolakClickedAnggotaPanalis] =
    useState(false);
  const [isSetujuDisabledAnggotaPanalis, setIsSetujuDisabledAnggotaPanalis] =
    useState(false);
  const [isTolakDisabledAnggotaPanalis, setIsTolakDisabledAnggotaPanalis] =
    useState(false);

  // menggubah status Ketua Panelis setuju atau tolak
  const [ketuaPenelisStatus, setKetuaPenelisStatus] = useState([]);
  const [selectedRevisiSkripsiIndex, setSelectedRevisiSkripsiIndex] =
    useState(null);

  // menggubah status Advisor setuju atau tolak
  const [AdvisorStatus, setAdvisorStatus] = useState([]);
  const [
    selectedRevisiSkripsiIndexAdvisor,
    setSelectedRevisiSkripsiIndexAdvisor,
  ] = useState(null);

  // menggubah status Anggota Panelis setuju atau tolak
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

  // Ketua Panelis
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

  // Anggota Panelis
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
    const data = {
      comment: komentarText,
    };
    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/skripsi-revision-document/reject/${skripsiId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Berhasil reject skripsi: ", response.data.data);
        handleCloseKomentarDialog();
        setKomentarText("");

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
        console.error("Terjadi kesalahan saat reject skripsi:", error);
      });
  };

  // Komentar
  const [openKomentarDialog, setOpenKomentarDialog] = useState(false);
  const [komentarText, setKomentarText] = useState("");

  const handleOpenKomentarDialog = () => {
    setOpenKomentarDialog(true);
  };

  const handleCloseKomentarDialog = () => {
    setOpenKomentarDialog(false);
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
                  handleOpenKomentarDialog();
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
                  handleOpenKomentarDialog();
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
                  handleOpenKomentarDialog();
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
            {/* Date Start */}
            <Div
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="subtitle1">
                Batas pengumpulan revisi: {date?.submission_dateline}
              </Typography>

              <Div hidden={userRole === "KETUA_PANELIS" ? false : true}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={handleOpen}
                >
                  Ubah
                </Button>
              </Div>
            </Div>
            {/* Date End */}

            {/* popup Date */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
              <Div
                sx={{
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "stretch",
                  background: "rgba(26, 56, 96, 0.10)",
                  justifyContent: "center",
                }}
              >
                <DialogTitle
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    alignSelf: "stretch",
                  }}
                >
                  Batas Pengumpulan Revisi
                </DialogTitle>
              </Div>
              <DialogContent sx={{ margin: "auto", width: "70%" }}>
                <TextField
                  size="small"
                  id="inputDate"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{ marginRight: "10px" }}
                />
              </DialogContent>
              <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                <Button
                  onClick={handleBatal}
                  color="primary"
                  size="small"
                  sx={{
                    background: "white",
                    boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                    textTransform: "none",
                    color: "black",
                  }}
                >
                  Kembali
                </Button>
                <Button
                  size="small"
                  onClick={handleSimpan}
                  color="primary"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                >
                  Simpan
                </Button>
              </DialogActions>
            </Dialog>

            {/* Popup Konfirmasi Tanggal*/}
            <Dialog
              open={konfirmasiOpen}
              onClose={handleKonfirmasiClose}
              maxWidth="xs"
              fullWidth
            >
              <DialogTitle variant="subtitle2">Konfirmasi Tanggal</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Anda yakin ingin memasukan tanggal ini?
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                <Button
                  size="small"
                  onClick={handleKonfirmasiClose}
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
                  size="small"
                  onClick={handleConfirmSubmitDate}
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  color="primary"
                >
                  Ya
                </Button>
              </DialogActions>
            </Dialog>

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
                alignSelf: "stretch",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                }}
              >
                <Accordion sx={{ width: "100%" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ background: "#F5F5F5" }}
                  >
                    <Typography>Ketua Panelis</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Abstrak</Typography>
                      <Typography>
                        {perubahan?.changes_by_chairman_abstrak
                          ? perubahan?.changes_by_chairman_abstrak
                          : "-"}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 1</Typography>
                      <Typography>
                        {perubahan?.changes_by_chairman_bab1}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 2</Typography>
                      <Typography>
                        {perubahan?.changes_by_chairman_bab2}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 3</Typography>
                      <Typography>
                        {perubahan?.changes_by_chairman_bab3}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 4</Typography>
                      <Typography>
                        {perubahan?.changes_by_chairman_bab4}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 5</Typography>
                      <Typography>
                        {perubahan?.changes_by_chairman_bab5}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Lainnya</Typography>
                      <Typography>
                        {perubahan?.changes_by_chairman_other}
                      </Typography>
                    </Div>
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{ width: "100%" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ background: "#F5F5F5" }}
                  >
                    <Typography>Anggota Panelis</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Abstrak</Typography>
                      <Typography>
                        {perubahan?.changes_by_member_abstrak}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 1</Typography>
                      <Typography>
                        {perubahan?.changes_by_member_bab1}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 2</Typography>
                      <Typography>
                        {perubahan?.changes_by_member_bab2}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 3</Typography>
                      <Typography>
                        {perubahan?.changes_by_member_bab3}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 4</Typography>
                      <Typography>
                        {perubahan?.changes_by_member_bab4}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 5</Typography>
                      <Typography>
                        {perubahan?.changes_by_member_bab5}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Lainnya</Typography>
                      <Typography>
                        {perubahan?.changes_by_member_other}
                      </Typography>
                    </Div>
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{ width: "100%" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ background: "#F5F5F5" }}
                  >
                    <Typography>Advisor</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Abstrak</Typography>
                      <Typography>
                        {perubahan?.changes_by_advisor_abstrak}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 1</Typography>
                      <Typography>
                        {perubahan?.changes_by_advisor_bab1}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 2</Typography>
                      <Typography>
                        {perubahan?.changes_by_advisor_bab2}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 3</Typography>
                      <Typography>
                        {perubahan?.changes_by_advisor_bab3}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 4</Typography>
                      <Typography>
                        {perubahan?.changes_by_advisor_bab4}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 5</Typography>
                      <Typography>
                        {perubahan?.changes_by_advisor_bab5}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Lainnya</Typography>
                      <Typography>
                        {perubahan?.changes_by_advisor_other}
                      </Typography>
                    </Div>
                  </AccordionDetails>
                </Accordion>
                {advisorAndCoAdvisor?.coAdvisor1 && (
                  <Accordion sx={{ width: "100%" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{ background: "#F5F5F5" }}
                    >
                      <Typography>Co-Advisor 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Div
                        sx={{
                          display: "flex",
                          padding: "14px 16px",
                          flexDirection: "column",
                          gap: "10px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                        }}
                      >
                        <Typography>Abstrak</Typography>
                        <Typography>
                          {perubahan?.changes_by_co_advisor1_abstrak}
                        </Typography>
                      </Div>
                      <Div
                        sx={{
                          display: "flex",
                          padding: "14px 16px",
                          flexDirection: "column",
                          gap: "10px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                        }}
                      >
                        <Typography>Bab 1</Typography>
                        <Typography>
                          {perubahan?.changes_by_co_advisor1_bab1}
                        </Typography>
                      </Div>
                      <Div
                        sx={{
                          display: "flex",
                          padding: "14px 16px",
                          flexDirection: "column",
                          gap: "10px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                        }}
                      >
                        <Typography>Bab 2</Typography>
                        <Typography>
                          {perubahan?.changes_by_co_advisor1_bab2}
                        </Typography>
                      </Div>
                      <Div
                        sx={{
                          display: "flex",
                          padding: "14px 16px",
                          flexDirection: "column",
                          gap: "10px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                        }}
                      >
                        <Typography>Bab 3</Typography>
                        <Typography>
                          {perubahan?.changes_by_co_advisor1_bab3}
                        </Typography>
                      </Div>
                      <Div
                        sx={{
                          display: "flex",
                          padding: "14px 16px",
                          flexDirection: "column",
                          gap: "10px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                        }}
                      >
                        <Typography>Bab 4</Typography>
                        <Typography>
                          {perubahan?.changes_by_co_advisor1_bab4}
                        </Typography>
                      </Div>
                      <Div
                        sx={{
                          display: "flex",
                          padding: "14px 16px",
                          flexDirection: "column",
                          gap: "10px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                        }}
                      >
                        <Typography>Bab 5</Typography>
                        <Typography>
                          {perubahan?.changes_by_co_advisor1_bab5}
                        </Typography>
                      </Div>
                      <Div
                        sx={{
                          display: "flex",
                          padding: "14px 16px",
                          flexDirection: "column",
                          gap: "10px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                        }}
                      >
                        <Typography>Lainnya</Typography>
                        <Typography>
                          {perubahan?.changes_by_co_advisor1_other}
                        </Typography>
                      </Div>
                    </AccordionDetails>
                  </Accordion>
                )}
                {advisorAndCoAdvisor?.coAdvisor2 && (
                  <Accordion sx={{ width: "100%" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{ background: "#F5F5F5" }}
                    >
                      <Typography>Co-Advisor 2</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Div
                        sx={{
                          display: "flex",
                          padding: "14px 16px",
                          flexDirection: "column",
                          gap: "10px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                        }}
                      >
                        <Typography>Abstrak</Typography>
                        <Typography>
                          {perubahan?.changes_by_co_advisor2_abstrak}
                        </Typography>
                      </Div>
                      <Div
                        sx={{
                          display: "flex",
                          padding: "14px 16px",
                          flexDirection: "column",
                          gap: "10px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                        }}
                      >
                        <Typography>Bab 1</Typography>
                        <Typography>
                          {perubahan?.changes_by_co_advisor2_bab1}
                        </Typography>
                      </Div>
                      <Div
                        sx={{
                          display: "flex",
                          padding: "14px 16px",
                          flexDirection: "column",
                          gap: "10px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                        }}
                      >
                        <Typography>Bab 2</Typography>
                        <Typography>
                          {perubahan?.changes_by_co_advisor2_bab2}
                        </Typography>
                      </Div>
                      <Div
                        sx={{
                          display: "flex",
                          padding: "14px 16px",
                          flexDirection: "column",
                          gap: "10px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                        }}
                      >
                        <Typography>Bab 3</Typography>
                        <Typography>
                          {perubahan?.changes_by_co_advisor2_bab3}
                        </Typography>
                      </Div>
                      <Div
                        sx={{
                          display: "flex",
                          padding: "14px 16px",
                          flexDirection: "column",
                          gap: "10px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                        }}
                      >
                        <Typography>Bab 4</Typography>
                        <Typography>
                          {perubahan?.changes_by_co_advisor2_bab4}
                        </Typography>
                      </Div>
                      <Div
                        sx={{
                          display: "flex",
                          padding: "14px 16px",
                          flexDirection: "column",
                          gap: "10px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                        }}
                      >
                        <Typography>Bab 5</Typography>
                        <Typography>
                          {perubahan?.changes_by_co_advisor2_bab5}
                        </Typography>
                      </Div>
                      <Div
                        sx={{
                          display: "flex",
                          padding: "14px 16px",
                          flexDirection: "column",
                          gap: "10px",
                          flex: "1 0 0",
                          alignSelf: "stretch",
                        }}
                      >
                        <Typography>Lainnya</Typography>
                        <Typography>
                          {perubahan?.changes_by_co_advisor2_other}
                        </Typography>
                      </Div>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Div>
            </Div>
            {/* View Perubahan End */}
            {(userRole === "KETUA_PANELIS" ||
              userRole === "ANGGOTA_PANELIS" ||
              userRole === "ADVISOR") && (
              <>
                {userRole === "KETUA_PANELIS" &&
                  dokumenRevisi?.is_revision_approve_by_panelist_chairman !==
                    "Approve" &&
                  dokumenRevisi?.panelist_chairman_revision_comment !==
                    null && (
                    <>
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
                        Komentar
                      </Typography>

                      {/* View Komentar Start*/}
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
                        {/* Komentar Ketua Panelis */}
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
                            <Typography variant="subtitle2">
                              Komentar yang Anda berikan
                            </Typography>
                          </Div>
                          <Div
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              alignSelf: "stretch",
                              padding: "14px 16px",
                              border: "2px solid rgba(26, 56, 96, 0.10)",
                              borderRadius: "0 0 6px 6px",
                              whiteSpace: "break-spaces",
                            }}
                          >
                            <Typography>
                              {
                                dokumenRevisi?.panelist_chairman_revision_comment
                              }
                            </Typography>
                          </Div>
                        </Div>
                      </Div>
                    </>
                  )}
                {userRole === "ANGGOTA_PANELIS" &&
                  dokumenRevisi?.is_revision_approve_by_panelist_member !==
                    "Approve" &&
                  dokumenRevisi?.panelist_member_revision_comment !== null && (
                    <>
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
                        Komentar
                      </Typography>
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
                        {/* Komentar Anggota Panelis */}
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
                            <Typography variant="subtitle2">
                              Komentar yang Anda berikan
                            </Typography>
                          </Div>
                          <Div
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              alignSelf: "stretch",
                              padding: "14px 16px",
                              border: "2px solid rgba(26, 56, 96, 0.10)",
                              borderRadius: "0 0 6px 6px",
                              whiteSpace: "break-spaces",
                            }}
                          >
                            <Typography>
                              {dokumenRevisi?.panelist_member_revision_comment}
                            </Typography>
                          </Div>
                        </Div>
                      </Div>
                    </>
                  )}
                {userRole === "ADVISOR" &&
                  dokumenRevisi?.is_revision_approve_by_advisor !== "Approve" &&
                  dokumenRevisi?.advisor_revision_comment !== null && (
                    <>
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
                        Komentar
                      </Typography>
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
                        {/* Komentar Anggota Panelis */}
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
                            <Typography variant="subtitle2">
                              Komentar yang Anda berikan
                            </Typography>
                          </Div>
                          <Div
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              alignSelf: "stretch",
                              padding: "14px 16px",
                              border: "2px solid rgba(26, 56, 96, 0.10)",
                              borderRadius: "0 0 6px 6px",
                              whiteSpace: "break-spaces",
                            }}
                          >
                            <Typography>
                              {dokumenRevisi?.advisor_revision_comment}
                            </Typography>
                          </Div>
                        </Div>
                      </Div>
                    </>
                  )}
                {/* View Komentar End */}
              </>
            )}
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
                        Ketua Panelis
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "15%" }}
                      >
                        Anggota Panelis
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
                        {dokumenRevisi?.file_name_revision !== null && (
                          <>
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
                          </>
                        )}
                      </TableCell>
                      {/* status Anggota panalis */}
                      <TableCell>
                        {dokumenRevisi?.file_name_revision !== null && (
                          <>
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
                          </>
                        )}
                      </TableCell>
                      {/* status advisor */}
                      <TableCell>
                        {dokumenRevisi?.file_name_revision !== null && (
                          <>
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
                          </>
                        )}
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
                              <PDFViewerSkripsi dokumenRevisi={dokumenRevisi} />
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

      {/* popup konfirmasi Konfirmasi Tanggal */}
      <Dialog
        open={isConfirmationDialogOpen}
        onClose={handleCancelSubmitDate}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          sx={{
            color: "#0A0A0A",
            fontSize: "20px",
            fontWeight: "500px",
          }}
        >
          Batas pengumpulan revisi
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#616161" }}>
            Apakah Anda yakin ingin menyimpan perubahan?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCancelSubmitDate}
            color="primary"
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
            onClick={handleConfirmSubmitDate}
            color="primary"
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      {/* popup konfirmasi setuju Ketua Panelis*/}
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

      {/* popup konfirmasi tolak Ketua Panelis */}
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
            Tolak
          </Button>
        </DialogActions>
      </Dialog>

      {/* popup konfirmasi setuju Anggota Panelis*/}
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

      {/* popup konfirmasi tolak Anggota Panelis */}
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
            Tolak
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
            Tolak
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog komentar Advisor */}
      <Dialog
        open={openKomentarDialog}
        onClose={handleCloseKomentarDialog}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle
          sx={{
            padding: "14px 16px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "6px 6px 0 0",
            border: "1px",
            textAlign: "center",
          }}
        >
          KOMENTAR
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            alignSelf: "stretch",
          }}
        >
          <Div
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
              alignSelf: "stretch",
              padding: "40px",
            }}
          >
            <TextareaAutosize
              aria-label="minimum height"
              minRows={20}
              placeholder="Masukkan komentar"
              style={{
                width: "100%",
                resize: "vertical",
              }}
              value={komentarText} // Set the value of the textarea to revisionText
              onChange={(e) => setKomentarText(e.target.value)} // Update revisionText when input changes
            />
          </Div>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCloseKomentarDialog}
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
            onClick={() => {
              setSelectedActionIndexAdvisor(2);
              setTolakConfirmationDialogOpenAdvisor(true);
            }}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog komentar Advisor */}
    </Div>
  );
};

export default DokumenRevisiSkripsi;
