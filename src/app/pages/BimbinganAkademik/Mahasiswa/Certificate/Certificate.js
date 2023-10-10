import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Stack,
  Grid,
  FormControl,
  Box,
  Button,
  Input,
  IconButton,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

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
  "@media (max-width: 768px)": {
    maxWidth: "80%",
  },
  "@media (max-width: 480px)": {
    maxWidth: "80%",
  },
};

const style2 = {
  position: "fixed",
  top: "15%",
  right: "2%",
  width: 400,
  // bgcolor: "background.paper",
  boxShadow: 24,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
};

const Certificate = () => {
  const [category, setCategory] = useState("");
  const [showLabel, setShowLabel] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const [openFirstModal, setOpenFirstModal] = React.useState(false);
  const [openSecondModal, setOpenSecondModal] = React.useState(false);

  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSecondModal = () => setOpenSecondModal(true);
  const handleCloseSecondModal = () => setOpenSecondModal(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseSecondModal();
    }, 5000); // 5000 ms = 5 detik

    return () => {
      clearTimeout(timer);
    };
  }, [handleOpenSecondModal]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const labelElement = document.getElementById("certificate-label");
    if (labelElement) {
      labelElement.style.border = "0.5px solid #BCBCBC";
    }

    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName("");
    }
  };

  const handleSubmitFirstModal = () => {
    handleCloseFirstModal();
    handleOpenSecondModal();
  };

  return (
    <div>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 500,
          paddingBottom: "15px",
        }}
      >
        Add New Certificate
      </Typography>

      <Stack spacing={2} sx={{ paddingBottom: 3 }}>
        <RTypography>Title</RTypography>
        <TextField
          id="outlined-basic-1"
          variant="outlined"
          placeholder="Ex. Menang lomba desain prototype"
          fullWidth
          sx={{ backgroundColor: "white" }}
        />
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ paddingBottom: 3 }}>
            <RTypography sx={{ paddingBottom: "10px" }}>Category</RTypography>
            <TextField
              sx={{ width: "100%", backgroundColor: "white" }}
              id="outlined-select-category"
              select
              label={showLabel ? "Select Certificate Category" : ""}
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
            <RTypography sx={{ paddingBottom: "10px" }}>
              Certificate Photo
            </RTypography>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "white" }}
            >
              <Input
                type="file"
                accept=".jpg, .jpeg, .png"
                id="certificate-photo"
                onChange={handleFileInputChange}
                disableUnderline
                inputProps={{ style: { display: "none" } }}
              />
              <label
                htmlFor="certificate-photo"
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
                <span style={{ color: "#9E9E9E" }}>
                  {selectedFileName || "Import Photo (Maximum Size 2MB)"}
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
              placeholder="Add Descriptions"
              fullWidth
              multiline
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/bimbingan-akademik/certificates/"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/bimbingan-akademik/certificates/"
              >
                <Button
                  sx={{
                    backgroundColor: "darkgrey",
                    borderRadius: "24px",
                    color: "black",
                    whiteSpace: "nowrap",
                    minWidth: "132px",
                    fontSize: "12px",
                    padding: "10px",
                    marginRight: "24px",

                    "&:hover": {
                      backgroundColor: "grey",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Link>

              <Button
                onClick={handleOpenFirstModal}
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
                }}
              >
                Submit
              </Button>
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
              <Modal
                open={openSecondModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div style={style2}>
                  <IconButton
                    edge="end"
                    color="#D9D9D9"
                    onClick={handleCloseSecondModal}
                    aria-label="close"
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "20px",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    component="h2"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    Successful Submission!
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    style={{ marginTop: "16px", marginBottom: "20px" }}
                  >
                    You have successfully preregistered for the course.
                  </Typography>
                  {/* Tambahkan tautan dan elemen lain yang diperlukan di sini */}
                </div>
              </Modal>
            </Box>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Certificate;
