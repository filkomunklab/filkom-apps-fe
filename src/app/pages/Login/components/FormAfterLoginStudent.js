import Div from "@jumbo/shared/Div";
import {
  Button,
  Modal,
  Box,
  Grid,
  Typography,
  Stack,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  TextField,
  styled,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  guardianPhoneNo: Yup.string()
    .matches(/^\d+$/, "Parent / Guardian phone number must only contain digits")
    .min(10, "Parent / Guardian phone number must be at least 10 digits")
    .max(13, "Parent / Guardian phone number cannot be more than 13 digits")
    .required("Parent / Guardian Phone Number is Required"),
  guardianEmail: Yup.string()
    .email()
    .required("Parent / Guardian Email is Required"),
  guardianStatus: Yup.string().required(
    "Parent / Guardian Mariage Status is Required"
  ),
  guardianEducation: Yup.string().required(
    "Parent / Guardian Level of Education is Required"
  ),
  currentAddress: Yup.string()
    .min(3, "Current Address must be at least 3 digits")
    .max(100, "Current Address cannot be more than 100 digits")
    .required("Current Address is Required"),
  highSchoolGrad: Yup.string()
    .min(3, "Prev High School must be at least 3 digits")
    .max(100, "Prev High School cannot be more than 100 digits")
    .required("Prev High School is Required"),
  AreaOfConcentration: Yup.string().required(
    "Area of Concentration is Required"
  ),
  phoneNo: Yup.string()
    .matches(/^\d+$/, "Student phone number must only contain digits")
    .min(10, "Student Phone No must be at least 10 digits")
    .max(13, "Studnet Phone No cannot be more than 13 digits")
    .required("Student Phone Number is Required"),
  dateOfBirth: Yup.string().required("Date of Birth is Required"),
  bloodType: Yup.string().required("Blood Type is Required"),
  base64Image: Yup.string().nullable(false).required("Image is Required"),
  confirmNewPassword: Yup.string()
    .trim("Confirm New Password cannot include leading and trailing spaces")
    .strict(true)
    .oneOf(
      [Yup.ref("newPassword"), null],
      "New Password and Confirm New Password field must match"
    )
    .required("Confirm New Password Required"),
  newPassword: Yup.string()
    .trim("New Password cannot include leading and trailing spaces")
    .strict(true)
    .required("New Password Required"),
});

const FormAfterLoginStudent = ({
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
  const [showLabelBloodType, setShowLabelBloodType] = useState(true);
  const [showLabelAreaOfConcentration, setShowLabelAreaOfConcentration] =
    useState(true);
  const [showLabelLevelOfEducation, setShowLabelLevelOfEducation] =
    useState(true);
  const [showLabelMarriageStatus, setShowLabelMarriageStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);

  //field input student
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [fileName, setFileName] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [AreaOfConcentration, setAreaOfConcentration] = useState("");
  const [highSchoolGrad, setHighSchoolGrad] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");

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
    try {
      console.log("ini phone no: ", phoneNo);
      await formSchema.validate(
        {
          newPassword,
          confirmNewPassword,
          base64Image,
          bloodType,
          dateOfBirth,
          phoneNo,
          AreaOfConcentration,
          highSchoolGrad,
          currentAddress,
          guardianEducation,
          guardianStatus,
          guardianEmail,
          guardianPhoneNo,
        },
        {
          abortEarly: true,
        }
      );

      setLoading(true);
      const buffer = base64Image.split(",")[1];
      const nama_file = fileName;

      // format tanggal lahir agar sesuai dengan yang diinput
      const tanggalLahir = new Date(dateOfBirth);
      const tahun = tanggalLahir.getFullYear();
      const bulan = tanggalLahir.getMonth() + 1;
      const tanggal = tanggalLahir.getDate();

      const jam = tanggalLahir.getHours();
      const menit = tanggalLahir.getMinutes();
      const detik = tanggalLahir.getSeconds();

      var waktuISO8601 =
        tahun +
        "-" +
        (bulan < 10 ? "0" : "") +
        bulan +
        "-" +
        (tanggal < 10 ? "0" : "") +
        tanggal +
        "T" +
        (jam < 10 ? "0" : "") +
        jam +
        ":" +
        (menit < 10 ? "0" : "") +
        menit +
        ":" +
        (detik < 10 ? "0" : "") +
        detik +
        "Z";

      console.log("ini waktu iso loh: ", waktuISO8601);
      await axios.patch(
        `${BASE_URL_API}/student/biodata/${profileMahasiswa.nim}`,
        {
          bloodType,
          password: newPassword,
          dateOfBirth: waktuISO8601,
          phoneNo: phoneNo.trim(),
          AreaOfConcentration,
          highSchoolGrad: highSchoolGrad.trim(),
          currentAddress: currentAddress.trim(),
          guardianEducation,
          guardianStatus,
          guardianEmail: guardianEmail.trim(),
          guardianPhoneNo: guardianPhoneNo.trim(),
          studentImage: {
            filename: nama_file,
            buffer,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${profileMahasiswa.token}`,
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(userLogin));
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
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
                backgroundColor: "#005FDB",
                color: "white",
                padding: "25px",
                boxShadow: "50px",
                marginBottom: "15px",
              }}
            >
              <Typography variant="h2" fontWeight={500} color={"#FFFFFF"}>
                Welcome to Filkom Super Apps! <br />
                <br />
              </Typography>
              <Typography variant="h5" color={"#FFFFFF"}>
                Before we enter the app, please complete your personal data
                first.
              </Typography>
              <Typography variant="h5" color={"#FFCC00"}>
                Notes: This will only happen once when you first log in to the
                app, so please make sure the data you enter is correct. Thank
                you.
              </Typography>
            </Box>
            <hr style={{ backgroundColor: "#005FDB", padding: 4 }} />
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
                  <Grid item xs={12} md={12}>
                    <Button
                      fullWidth
                      component="label"
                      sx={{
                        border: "1px solid #e0e0e0",
                        justifyContent: "center",
                        textTransform: "capitalize",
                        color: "#1B2B41B0",
                        padding: 0,
                        width: "200px",
                        height: "300px",
                        backgroundColor: "#bdc6d3",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {base64Image ? (
                        <img
                          id="displayImage"
                          src={base64Image}
                          alt="Profile-Picture"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
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

                  <Grid item xs={12} md={6}>
                    <RTypography variant="h5">New Password</RTypography>
                    <TextField
                      id="outlined-basic-1"
                      variant="outlined"
                      placeholder="Enter New Password..."
                      fullWidth
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      size="small"
                      sx={{
                        backgroundColor: "white",
                        "& input": { padding: 1.5 },
                        display: "block",
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}></Grid>

                  <Grid item xs={12} md={6}>
                    <RTypography variant="h5">
                      Confirmation New Password
                    </RTypography>
                    <TextField
                      id="outlined-basic-1"
                      variant="outlined"
                      placeholder="Enter Confirmation New Password..."
                      fullWidth
                      value={confirmNewPassword}
                      onChange={(event) =>
                        setConfirmNewPassword(event.target.value)
                      }
                      size="small"
                      sx={{
                        backgroundColor: "white",
                        "& input": { padding: 1.5 },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}></Grid>

                  <Grid item xs={12} md={12}>
                    <Typography variant="h5">Full Name</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {`${profileMahasiswa?.lastName}, ${profileMahasiswa?.firstName} ` ||
                        "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">Gender</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.gender || "-"}
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
                      {profileMahasiswa?.status || "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">NIM</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.nim || "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">Registration Number</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.reg_num || "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <RTypography variant="h5">Date of Birth</RTypography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{
                          width: "100%",
                          "& .MuiSvgIcon-root": { fontSize: 20 },
                          "& .MuiTypography-root": { fontSize: 14 },
                          "& input": { padding: 1.5 },
                        }}
                        views={["day", "month", "year"]}
                        name="dateOfBirth"
                        onChange={(event) => {
                          setDateOfBirth(event?.$d);
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">Religion</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.religion || "-"}
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
                        {showLabelBloodType ? "Select Option" : ""}
                      </InputLabel>
                      <Select
                        sx={{
                          padding: 0.5,
                        }}
                        value={bloodType}
                        onChange={(event) => {
                          setBloodType(event.target.value);
                          setShowLabelBloodType(false);
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
                      {profileMahasiswa?.MaritalStatus || "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">Student Email</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.studentEmail || "-"}
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
                      size="small"
                      sx={{
                        backgroundColor: "white",
                        "& input": { padding: 1.5 },
                      }}
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
                        {showLabelAreaOfConcentration ? "Select Option" : ""}
                      </InputLabel>
                      <Select
                        sx={{
                          padding: 0.5,
                        }}
                        value={AreaOfConcentration}
                        onChange={(event) => {
                          setAreaOfConcentration(event.target.value);
                          setShowLabelAreaOfConcentration(false);
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
                      size="small"
                      sx={{
                        backgroundColor: "white",
                        "& input": { padding: 1.5 },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h5">Address</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.address || "-"}
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
                      size="small"
                      sx={{
                        backgroundColor: "white",
                        "& input": { padding: 1.5 },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <RTypography variant="h5">
                      Current Residence Status
                    </RTypography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.currentResidenceStatus || "-"}
                    </Typography>
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
                      {profileMahasiswa?.guardianName || "-"}
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
                        {showLabelLevelOfEducation ? "Select Option" : ""}
                      </InputLabel>
                      <Select
                        sx={{
                          padding: 0.5,
                        }}
                        value={guardianEducation}
                        onChange={(event) => {
                          setGuardianEducation(event.target.value);
                          setShowLabelLevelOfEducation(false);
                        }}
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
                      {profileMahasiswa?.guardianReligion || "-"}
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
                        {showLabelMarriageStatus ? "Select Option" : ""}
                      </InputLabel>
                      <Select
                        sx={{
                          padding: 0.5,
                        }}
                        value={guardianStatus}
                        onChange={(event) => {
                          setGuardianStatus(event.target.value);
                          setShowLabelMarriageStatus(false);
                        }}
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
                      {profileMahasiswa?.familyRelation || "-"}
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
                      size="small"
                      sx={{
                        backgroundColor: "white",
                        "& input": { padding: 1.5 },
                      }}
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
                      size="small"
                      sx={{
                        backgroundColor: "white",
                        "& input": { padding: 1.5 },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5">Address</Typography>
                    <Typography variant="h6" sx={textStyle}>
                      {profileMahasiswa?.guardianAddress || "-"}
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
                <Button
                  type="submit"
                  size="small"
                  onClick={handleOpenFirstModal}
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
                </Button>
              </Box>

              <Modal
                open={openFirstModal}
                onClose={handleCloseFirstModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div style={modalStyle}>
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    component="h2"
                    sx={{
                      fontWeight: 600,
                      color: "#FFCC00",
                    }}
                  >
                    Warning!
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    style={{ marginTop: "16px", marginBottom: "20px" }}
                  >
                    The data you enter cannot be changed anymore, make sure the
                    data you enter is correct!
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
                      <LoadingButton
                        onClick={submitBiodata}
                        loading={loading}
                        variant="contained"
                        loadingIndicator="Loading"
                        sx={{
                          borderRadius: "5px",
                          boxShadow: 4,
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Submit
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </div>
              </Modal>
            </Div>
          </Div>
        </Div>
      </Modal>
    </Div>
  );
};

function RTypography({ children, sx }) {
  return (
    <Typography variant="h5" sx={sx}>
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
  borderRadius: "4px",
  //   size: "small",
};

const modalStyle = {
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

export default FormAfterLoginStudent;
