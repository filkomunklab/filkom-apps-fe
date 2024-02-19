import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import SuccessOrError from "app/pages/BimbinganAkademik/components/Modal/SuccessOrError";
import { useNavigate } from "react-router-dom";

const requiredStyle = {
  color: "red",
  marginLeft: "4px",
};

function RTypography({ children, sx }) {
  return (
    <Typography variant="body1" sx={sx}>
      {children}
      <span style={requiredStyle}>*</span>
    </Typography>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
  maxWidth: "90%",
  "@media (maxWidth: 768px)": {
    maxWidth: "80%",
  },
  "@media (maxWidth: 480px)": {
    maxWidth: "80%",
  },
};

const Certificate = () => {
  const navigate = useNavigate();

  //inisialisasi
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [buffer, setBuffer] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  //modal
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSuccessModal = () => setOpenSuccessModal(true);
  const handleCloseSuccessModal = () => setOpenSuccessModal(false);
  const handleOpenErrorModal = () => setOpenErrorModal(true);
  const handleCloseErrorModal = () => setOpenErrorModal(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseSuccessModal();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleOpenSuccessModal]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Your certificate must be in PDF format.");
      event.target.value = null;
      return;
    }
    setSelectedFile(file);
    setBuffer("");
    const reader = new FileReader();

    reader.onload = function (event) {
      const base64Data = event.target.result.split(",")[1].trim();
      setBuffer(base64Data);
    };

    reader.readAsDataURL(file);

    const labelElement = document.getElementById("certificate-label");
    if (labelElement) {
      labelElement.style.border = "0.5px solid #BCBCBC";
    }

    setSelectedFileName(file.name);
  };

  const handleValidation = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    setDescription(trimmedDescription);

    if (!trimmedTitle || !category || !selectedFile) {
      alert("Please fill the field first.");
    } else {
      handleOpenFirstModal();
    }
  };

  const handleSubmitFirstModal = async () => {
    handleCloseFirstModal();
    setLoading(true);

    //ambil nim
    const nim = JSON.parse(localStorage.getItem("user")).nim;

    //ambil employeeNik
    let employeeNik;
    try {
      const response = await jwtAuthAxios.get(`/student/${nim}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      employeeNik = response.data.data.employeeNik;
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (
        error.response &&
        error.response.status >= 401 &&
        error.response.status <= 403
      ) {
        console.log("You don't have permission to access this page");
        navigate(`/`);
        return;
      } else {
        console.log("ini error: ", error);
        handleOpenErrorModal();
        setLoading(false);
        return;
      }
    }

    //bodyRequest
    const certificateFile = {
      filename: selectedFile.name,
      buffer,
    };
    const data = {
      title,
      category,
      description,
      certificateFile,
      employeeNik,
    };

    //post certificate
    try {
      const result = await jwtAuthAxios.post(`/certificate/${nim}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (result.data.status === "OK") {
        setTitle("");
        setCategory("");
        setShowLabel(true);
        setDescription("");
        setSelectedFile(null);
        setSelectedFileName("");
        handleOpenSuccessModal();
        setLoading(false);
      }
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (
        error.response &&
        error.response.status >= 401 &&
        error.response.status <= 403
      ) {
        console.log("You don't have permission to access this page");
        navigate(`/`);
      } else {
        console.log("ini error: ", error);
        handleOpenErrorModal();
        setTitle("");
        setCategory("");
        setShowLabel(true);
        setDescription("");
        setSelectedFile(null);
        setSelectedFileName("");
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(34, 34, 34, 0.7)",
            zIndex: 2003,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Typography
        sx={{
          fontSize: { xs: "20px", md: "24px" },
          fontWeight: 500,
          paddingBottom: "25px",
        }}
      >
        Add Certificate
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack spacing={2} sx={{ paddingBottom: 3 }}>
            <RTypography>Title</RTypography>
            <TextField
              id="outlined-basic-1"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              variant="outlined"
              placeholder="Ex. Menang lomba desain prototype"
              fullWidth
              sx={{ backgroundColor: "white" }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ paddingBottom: 3 }}>
            <RTypography sx={{ paddingBottom: "5px" }}>Category</RTypography>
            <TextField
              sx={{ width: "100%", backgroundColor: "white" }}
              id="outlined-select-category"
              select
              label={
                showLabel ? (
                  <span style={{ color: "#9E9E9E" }}>
                    Select Certificate Category
                  </span>
                ) : (
                  ""
                )
              }
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setShowLabel(false);
              }}
              InputLabelProps={{
                shrink: false,
              }}
            >
              <MenuItem value="local">Local</MenuItem>
              <MenuItem value="national">National</MenuItem>
              <MenuItem value="international">International</MenuItem>
            </TextField>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ paddingBottom: 3 }}>
            <RTypography sx={{ paddingBottom: "5px" }}>
              Certificate PDF
            </RTypography>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "white" }}
            >
              <Input
                type="file"
                accept=".pdf"
                id="certificate-pdf"
                onChange={handleFileInputChange}
                disableUnderline
                inputProps={{ style: { display: "none" } }}
              />
              <label
                htmlFor="certificate-pdf"
                style={{
                  border: "0.5px solid #BCBCBC",
                  padding: "14px",
                  height: "53px",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "border-color 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "black";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#BCBCBC";
                }}
                onClick={(e) => {
                  e.currentTarget.style.border = "2px solid #006AF5";
                }}
                id="certificate-label"
              >
                <span style={{ color: selectedFileName ? "black" : "#9E9E9E" }}>
                  {selectedFileName || "Import PDF"}
                </span>
                <SaveAltIcon style={{ color: "#9E9E9E" }} />
              </label>
            </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} sx={{ paddingBottom: 3 }}>
            <Typography>Descriptions</Typography>
            <TextField
              sx={{ backgroundColor: "white" }}
              id="outlined-basic"
              variant="outlined"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add Descriptions"
              fullWidth
              multiline
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={handleValidation}
              sx={{
                backgroundColor: "#006AF5",
                borderRadius: "24px",
                color: "white",
                whiteSpace: "nowrap",
                minWidth: "132px",
                fontSize: "12px",
                padding: "10px",
                gap: "6px",
                "&:hover": {
                  backgroundColor: "#025ED8",
                },
                cursor: "pointer",
              }}
            >
              Submit
            </Button>
          </Box>
        </Grid>

        <Modal
          open={openFirstModal}
          onClose={handleCloseFirstModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={style}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 600,
              }}
            >
              Send Certificate?
            </Typography>
            <Typography
              id="modal-modal-description"
              style={{ marginTop: "16px", marginBottom: "20px" }}
            >
              Are you sure you want to submit this? Forms that have been
              submitted cannot be edited again.
            </Typography>

            <Grid container spacing={1} justifyContent="flex-end">
              <Grid item>
                <Button
                  onClick={handleCloseFirstModal}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "5px",
                    boxShadow: 4,
                    color: "black",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      backgroundColor: "lightgrey",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleSubmitFirstModal}
                  sx={{
                    backgroundColor: "#006AF5",
                    borderRadius: "5px",
                    boxShadow: 4,
                    color: "white",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      backgroundColor: "#025ED8",
                    },
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
        <SuccessOrError
          open={openSuccessModal}
          handleClose={handleCloseSuccessModal}
          title="Successful Submission!"
          description="You have successfully submitted your certificate."
        />
        <SuccessOrError
          open={openErrorModal}
          handleClose={handleCloseErrorModal}
          title="Error Submission!"
          description="Error: Failed to submit the certificate. Please try again."
        />
      </Grid>
    </div>
  );
};

export default Certificate;
