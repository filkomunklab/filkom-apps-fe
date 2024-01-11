import Div from "@jumbo/shared/Div";
import {
  Button,
  Modal,
  Box,
  Grid,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  TextField,
  styled,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import { useNavigate } from "react-router-dom";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Backdrop from "@mui/material/Backdrop";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoadingButton from "@mui/lab/LoadingButton";

const FormAfterLogin = ({
  openModal,
  setOpenModal,
  profileMahasiswa,
  userLogin,
}) => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const navigate = useNavigate();
  const [showLabel, setShowLabel] = useState(true);
  const [loading, setLoading] = useState(false);

  //field input student
  const [fileName, setFileName] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [AreaOfConcentration, setAreaOfConcentration] = useState("");
  const [highSchoolGrad, setHighSchoolGrad] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentResidenceStatus, setCurrentResidenceStatus] = useState("");

  // field input parent / guardian
  const [guardianEducation, setGuardianEducation] = useState("");
  const [guardianStatus, setGuardianStatus] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [guardianPhoneNo, setGuardianPhoneNo] = useState("");

  useEffect(() => {
    console.log("ini profile mahasiswa loh: ", profileMahasiswa);
  }, []);

  const handleFileInput = (event) => {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = fileInput.files[0].name
        .split(".")
        .pop()
        .toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        setFileName(fileInput.files[0].name);
        const reader = new FileReader();

        reader.onload = function (e) {
          setBase64Image(e.target.result);
        };

        // Read the file as a data URL
        reader.readAsDataURL(fileInput.files[0]);
      } else {
        alert("Only image files (jpg, jpeg, png) are allowed.");
        event.target.value = "";
      }
    } else {
      alert("You haven't uploaded a photo yet.");
    }
  };

  const submitBiodata = async () => {
    if (
      (bloodType,
      dateOfBirth,
      phoneNo,
      AreaOfConcentration,
      highSchoolGrad,
      currentAddress,
      currentResidenceStatus,
      guardianEducation,
      guardianStatus,
      guardianEmail,
      guardianPhoneNo,
      base64Image)
    ) {
      try {
        setLoading(true);
        const buffer = base64Image.split(",")[1];
        const nama_file = fileName;

        await jwtAuthAxios.patch(`student/biodata/${profileMahasiswa.nim}`, {
          bloodType,
          dateOfBirth,
          phoneNo,
          AreaOfConcentration,
          highSchoolGrad,
          currentAddress,
          currentResidenceStatus,
          guardianEducation,
          guardianStatus,
          guardianEmail,
          guardianPhoneNo,
          studentImage: {
            filename: nama_file,
            buffer,
          },
        });

        localStorage.setItem("user", JSON.stringify(userLogin));
        navigate("/");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert(error.message);
      }
    } else {
      alert("Please Input all field required!!");
    }
  };

  return (
    <Div>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Div>
          <Div
            style={{
              overflow: "auto",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100vw",
              height: "100vh",
              bgcolor: "background.paper",
              boxShadow: 24,
              //   padding: 35,
              backgroundColor: "white",
              borderRadius: 10,
              maxWidth: "90%",
              "@media (maxWidth: 768px)": {
                maxWidth: "80%",
              },
              "@media (maxWidth: 480px)": {
                maxWidth: "80%",
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: "#006AF5",
                color: "white",
                padding: "25px",
                boxShadow: "50px",
                marginBottom: "15px",
              }}
            >
              <Typography variant="h2" fontWeight={500} color={"white"}>
                Welcome to Filkom Super Apps! <br />
                <br />
              </Typography>
              <Typography variant="h5" color={"white"}>
                Before we enter the app, please complete your personal data
                first.
                <br />
                Notes: This will only happen once when you first log in to the
                app, so please make sure the data you enter is correct. Thank
                you.
              </Typography>
            </Box>
            <hr style={{ backgroundColor: "#006AF5", padding: 4 }} />
            <Div sx={{ padding: 4 }}>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 500,
                  paddingBottom: "24px",
                  paddingTop: "36px",
                }}
              >
                Student Profile
              </Typography>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 500,
                    backgroundColor: "#e0e0e0",
                    paddingY: 2,
                    paddingLeft: 3,
                    borderRadius: 1,
                  }}
                >
                  Student Information
                </Typography>
                <Grid container spacing={3} sx={{ padding: 2 }}>
                  <Grid item>
                    <Button
                      fullWidth
                      component="label"
                      sx={{
                        border: "1px solid #e0e0e0",
                        justifyContent: "space-between",
                        textTransform: "capitalize",
                        color: "#1B2B41B0",
                        padding: 0,
                        width: "200px",
                        height: "300px",
                        backgroundColor: "#bdc6d3",
                      }}
                    >
                      {base64Image ? (
                        <img
                          id="displayImage"
                          src={base64Image}
                          alt="Profile-Picture"
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                          }}
                          loading="lazy"
                        />
                      ) : (
                        <Box
                          sx={{
                            width: "200px",
                            height: "300px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#1C345442",
                            borderRadius: "10px",
                          }}
                        >
                          <Typography>Add Photo</Typography>
                        </Box>
                      )}

                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileInput}
                      />
                    </Button>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Typography variant="h5">Full Name</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {`${profileMahasiswa?.lastName}, ${profileMahasiswa?.firstName}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">Gender</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.gender}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Stack
                      direction={"row"}
                      gap={1}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="h5">Student Status</Typography>
                    </Stack>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.status}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">NIM</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.nim}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">Registration Number</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.reg_num}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <RTypography variant="h5">Date of Birth</RTypography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ width: "100%" }}
                        views={["day", "month", "year"]}
                        name="dateOfBirth"
                        onChange={(event) => {
                          setDateOfBirth(event.$d);
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">Religion</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.religion}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RTypography variant="h5">Blood Type</RTypography>
                    <FormControl
                      size="small"
                      sx={{ backgroundColor: "white" }}
                      fullWidth
                    >
                      <InputLabel shrink={false}>
                        {showLabel ? "Select Option" : ""}
                      </InputLabel>
                      <Select
                        value={bloodType}
                        onChange={(event) => {
                          setBloodType(event.target.value);
                          setShowLabel(false);
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: "37%",
                            },
                          },
                        }}
                      >
                        <MenuItem value="A">A</MenuItem>
                        <MenuItem value="B">B</MenuItem>
                        <MenuItem value="AB">AB</MenuItem>
                        <MenuItem value="O">O</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">Marital Status</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.MaritalStatus}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">Student Email</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.studentEmail}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RTypography variant="h5">Phone Number</RTypography>
                    <TextField
                      id="outlined-basic-1"
                      variant="outlined"
                      placeholder="Enter phone number..."
                      fullWidth
                      value={phoneNo}
                      onChange={(event) => setPhoneNo(event.target.value)}
                      multiline
                      size="small"
                      sx={{ backgroundColor: "white", marginTop: "2px" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">Curriculum</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa.curriculum?.major}{" "}
                      {profileMahasiswa.curriculum?.year}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RTypography variant="h5">
                      Area of Concentration
                    </RTypography>
                    <FormControl
                      size="small"
                      sx={{ backgroundColor: "white" }}
                      fullWidth
                    >
                      <InputLabel shrink={false}>
                        {showLabel ? "Select Option" : ""}
                      </InputLabel>
                      <Select
                        value={AreaOfConcentration}
                        onChange={(event) => {
                          setAreaOfConcentration(event.target.value);
                          setShowLabel(false);
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: "37%",
                            },
                          },
                        }}
                      >
                        <MenuItem value="Object Programmer">
                          Object Programmer
                        </MenuItem>
                        <MenuItem value="Competitive Intelligent Analysis">
                          Competitive Intelligent Analysis
                        </MenuItem>
                        <MenuItem value="Network Administrator">
                          Network Administrator
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RTypography variant="h5">Previous High School</RTypography>
                    <TextField
                      id="outlined-basic-1"
                      variant="outlined"
                      placeholder="Enter Previous High School..."
                      fullWidth
                      value={highSchoolGrad}
                      onChange={(event) =>
                        setHighSchoolGrad(event.target.value)
                      }
                      multiline
                      size="small"
                      sx={{ backgroundColor: "white", marginTop: "2px" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">Address</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.address}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RTypography variant="h5">Current Address</RTypography>
                    <TextField
                      id="outlined-basic-1"
                      variant="outlined"
                      placeholder="Enter address..."
                      fullWidth
                      value={currentAddress}
                      onChange={(event) =>
                        setCurrentAddress(event.target.value)
                      }
                      multiline
                      size="small"
                      sx={{ backgroundColor: "white", marginTop: "2px" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RTypography variant="h5">
                      Current Residence Status
                    </RTypography>
                    <FormControl
                      size="small"
                      sx={{ backgroundColor: "white" }}
                      fullWidth
                    >
                      <InputLabel shrink={false}>
                        {showLabel ? "Select Option" : ""}
                      </InputLabel>
                      <Select
                        value={currentResidenceStatus}
                        onChange={(event) =>
                          setCurrentResidenceStatus(event.target.value)
                        }
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: "37%",
                            },
                          },
                        }}
                      >
                        <MenuItem value="Asrama">Asrama</MenuItem>
                        <MenuItem value="Outsider Dekat">
                          Ousider Dekat
                        </MenuItem>
                        <MenuItem value="Outsider Jauh">Outsider Jauh</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Typography
                  sx={{
                    fontWeight: 500,
                    backgroundColor: "#e0e0e0",
                    paddingY: 2,
                    paddingLeft: 3,
                    borderRadius: 1,
                  }}
                >
                  Parents / Guardians
                </Typography>
                <Grid container spacing={3} sx={{ padding: 2 }}>
                  <Grid item xs={12} md={12}>
                    <Typography variant="h5">Full Name</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.guardianName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RTypography variant="h5">Level of Education</RTypography>
                    <FormControl
                      size="small"
                      sx={{ backgroundColor: "white" }}
                      fullWidth
                    >
                      <InputLabel shrink={false}>
                        {showLabel ? "Select Option" : ""}
                      </InputLabel>
                      <Select
                        value={guardianEducation}
                        onChange={(event) =>
                          setGuardianEducation(event.target.value)
                        }
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: "37%",
                            },
                          },
                        }}
                      >
                        <MenuItem value="SMA/SMK Sederajat">
                          SMA/SMK Sederajat
                        </MenuItem>
                        <MenuItem value="D3">D3</MenuItem>
                        <MenuItem value="Sarjana">Sarjana</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">Religion</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.guardianReligion}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RTypography variant="h5">Marriage Status</RTypography>
                    <FormControl
                      size="small"
                      sx={{ backgroundColor: "white" }}
                      fullWidth
                    >
                      <InputLabel shrink={false}>
                        {showLabel ? "Select Option" : ""}
                      </InputLabel>
                      <Select
                        value={guardianStatus}
                        onChange={(event) =>
                          setGuardianStatus(event.target.value)
                        }
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: "37%",
                            },
                          },
                        }}
                      >
                        <MenuItem value="Belum Menikah">Belum Menikah</MenuItem>
                        <MenuItem value="Menikah">Menikah</MenuItem>
                        <MenuItem value="Janda / Duda">Janda / Duda</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">Family Relationship</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.familyRelation}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RTypography variant="h5">Email</RTypography>
                    <TextField
                      id="outlined-basic-1"
                      variant="outlined"
                      placeholder="Enter email..."
                      fullWidth
                      value={guardianEmail}
                      onChange={(event) => setGuardianEmail(event.target.value)}
                      multiline
                      size="small"
                      sx={{ backgroundColor: "white", marginTop: "2px" }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <RTypography variant="h5">Phone</RTypography>
                    <TextField
                      id="outlined-basic-1"
                      variant="outlined"
                      placeholder="Enter phone number..."
                      fullWidth
                      value={guardianPhoneNo}
                      onChange={(event) =>
                        setGuardianPhoneNo(event.target.value)
                      }
                      multiline
                      size="small"
                      sx={{ backgroundColor: "white", marginTop: "2px" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5">Address</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.guardianAddress}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: 2,
                  paddingTop: 3,
                }}
              >
                <LoadingButton
                  type="submit"
                  size="small"
                  onClick={submitBiodata}
                  loading={loading}
                  loadingIndicator="Loading…"
                  variant="contained"
                  sx={{
                    backgroundColor: "#006AF5",
                    borderRadius: "24px",
                    color: "white",
                    fontSize: "12px",
                    padding: "7px",
                    minWidth: "110px",
                    gap: "5px",
                    "&:hover": {
                      backgroundColor: "#025ED8",
                    },
                  }}
                >
                  <span style={{ fontSize: "14.5px" }}>SUBMIT</span>
                </LoadingButton>
              </Box>
            </Div>
          </Div>
        </Div>
      </Modal>
    </Div>
  );
};

function RTypography({ children, sx }) {
  return (
    <Typography variant="body1" sx={sx}>
      {children}
      <span style={requiredStyle}>*</span>
    </Typography>
  );
}

const requiredStyle = {
  color: "red",
  marginLeft: "4px",
};

const textStyle = {
  borderWidth: 1,
  borderColor: "#00000029",
  borderStyle: "solid",
  paddingX: "24px",
  paddingY: "13px",
  borderRadius: "8px",
  //   size: "small",
};

export default FormAfterLogin;
