import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Modal,
  Alert,
  Collapse,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

// Schema for Change Password
const formSchema = Yup.object().shape({
  confirmationNewPassword: Yup.string()
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
  oldPassword: Yup.string()
    .trim("Old Password cannot include leading and trailing spaces")
    .strict(true)
    .required("Old Password Required"),
});

const ChangePassword = () => {
  // usestate untuk alert
  const [openAlert, setOpenAlert] = useState(false);

  // usestate untuk loading button confirmation modal
  const [loading, setLoading] = useState(false);

  // usestate untuk confirmationModal
  const [confirmationModal, setConfirmationModal] = useState(false);

  // usestate untuk action toggle password
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmationNewPassword, setShowConfirmationNewPassword] =
    useState(false);

  // usestate sebagai store
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmationNewPassword, setConfirmationNewPassword] = useState("");

  const saveChangePasswordByRole = async () => {
    setLoading(true);
    try {
      // validasi form change password
      await formSchema.validate(
        {
          oldPassword,
          newPassword,
          confirmationNewPassword,
        },
        {
          abortEarly: true,
        }
      );

      // take id and role from localstorage
      const { id, role } = JSON.parse(localStorage.getItem("user"));

      // Check Role
      if (typeof role === "string") {
        if (role === "ADMIN" || role === "SUPER_ADMIN") {
          // hit endpoint update password admin
          await jwtAuthAxios.patch(`/change-password-admin/${id}`, {
            oldPassword,
            newPassword,
            confirmationNewPassword,
          });
        } else if (
          role === "ADMIN_LPMI" ||
          role === "OPERATOR_LPMI" ||
          role === "DEKAN" ||
          role === "KAPRODI" ||
          role === "DOSEN" ||
          role === "DOSEN_MK" ||
          role === "OPERATOR_FAKULTAS" ||
          role === "SEKRETARIS" ||
          role === "REGISTER"
        ) {
          // hit endpoint update password employee
          await jwtAuthAxios.patch(`/change-password-employee/${id}`, {
            oldPassword,
            newPassword,
            confirmationNewPassword,
          });
        } else {
          // hit endpoint update password student
          await jwtAuthAxios.patch(`/change-password-student/${id}`, {
            oldPassword,
            newPassword,
            confirmationNewPassword,
          });
        }
      } else {
        // roles itu array
        if (role.includes("ADMIN")) {
          // hit endpoint update password admin
          await jwtAuthAxios.patch(`/change-password-admin/${id}`, {
            oldPassword,
            newPassword,
            confirmationNewPassword,
          });
        } else if (
          role.includes("ADMIN_LPMI") ||
          role.includes("OPERATOR_LPMI") ||
          role.includes("DEKAN") ||
          role.includes("KAPRODI") ||
          role.includes("DOSEN") ||
          role.includes("DOSEN_MK") ||
          role.includes("OPERATOR_FAKULTAS") ||
          role.includes("SEKRETARIS") ||
          role.includes("REGISTER")
        ) {
          // hit endpoint update password employee
          await jwtAuthAxios.patch(`/change-password-employee/${id}`, {
            oldPassword,
            newPassword,
            confirmationNewPassword,
          });
        } else {
          // hit endpoint update password student
          await jwtAuthAxios.patch(`/change-password-student/${id}`, {
            oldPassword,
            newPassword,
            confirmationNewPassword,
          });
        }
      }
      setConfirmationModal(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmationNewPassword("");
      setOpenAlert(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.name == "AxiosError") {
        alert(error.response.data.data.error);
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <Container
      maxWidth="false"
      disableGutters={true}
      sx={{
        margin: "0",
        padding: "1.5rem",
        width: "100%",
      }}
    >
      <Collapse in={openAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Password Successfully Changed. Please logout and then login with your
          new password!!
        </Alert>
      </Collapse>

      <Typography
        variant="h1"
        sx={{
          fontSize: "1.875rem",
          color: "#192434",
          marginBottom: "50px",
          fontWeight: "450",
        }}
      >
        Change Password
      </Typography>

      <Grid container spacing={4} sx={{ marginBottom: "16px" }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">Old Password</Typography>
          <TextField
            size="small"
            placeholder="Enter your old password"
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            required={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    edge="end"
                    style={{ disableFocusRipple: true }} // or use a className
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}></Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5">New Password</Typography>
          <TextField
            size="small"
            placeholder="Enter your new password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                    style={{ disableFocusRipple: true }} // or use a className
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}></Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5">Confirm New Password</Typography>
          <TextField
            size="small"
            placeholder="Retype your new password"
            type={showConfirmationNewPassword ? "text" : "password"}
            value={confirmationNewPassword}
            onChange={(event) => setConfirmationNewPassword(event.target.value)}
            required={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setShowConfirmationNewPassword(
                        !showConfirmationNewPassword
                      )
                    }
                    edge="end"
                    style={{ disableFocusRipple: true }} // or use a className
                  >
                    {showConfirmationNewPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}></Grid>

        <Button
          variant="contained"
          onClick={() => setConfirmationModal(true)}
          sx={{
            borderRadius: "60px",
            width: "120px",
            height: "40px",
            marginLeft: "auto",
            marginTop: "30px",
          }}
        >
          Save
        </Button>

        <Grid item xs={12} md={6}></Grid>
      </Grid>
      <Modal
        open={confirmationModal}
        onClose={() => setConfirmationModal(false)}
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
            Are You sure want to change your password ?
          </Typography>

          <Grid container spacing={1} justifyContent="flex-end">
            <Grid item>
              <Button
                onClick={() => setConfirmationModal(false)}
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
                onClick={saveChangePasswordByRole}
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
    </Container>
  );
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

export default ChangePassword;
