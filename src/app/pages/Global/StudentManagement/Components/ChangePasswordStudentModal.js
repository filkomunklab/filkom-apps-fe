import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Alert,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const ChangePassSchema = Yup.object().shape({
  newPassword: Yup.string()
    .trim("New Password cannot include leading and trailing spaces")
    .strict(true)
    .required("Required"),
  confirmPassword: Yup.string()
    .trim("Confirm Password cannot include leading and trailing spaces")
    .strict(true)
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

const ChangePasswordStudentModal = ({
  openModalChangePassword,
  setOpenModalChangePassword,
  passingData,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  return (
    <Formik
      initialValues={{
        nik: passingData.nim,
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={ChangePassSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setLoading(true);
          await jwtAuthAxios.patch(
            `/management/student/${passingData.nim}/password`,
            values,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          values.newPassword = "";
          values.confirmPassword = "";
          setLoading(false);
          setOpen(false);
          setSubmitting(false);
          setOpenModalChangePassword(false);
        } catch (error) {
          if (error.response) {
            setError(error.response.data.data.error);
          } else if (error.message) {
            setError(error.message);
          } else {
            setError("Something wrong!!");
          }
          setLoading(false);
          setOpen(true);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, handleSubmit, handleChange, errors, touched }) => (
        <Form>
          <Dialog
            open={openModalChangePassword}
            onClose={() => {
              setOpen(false);
              setOpenModalChangePassword(false);
            }}
            fullWidth
          >
            <Collapse in={open}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {error}
              </Alert>
            </Collapse>
            <DialogTitle>Reset Password Account</DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="NIM"
                  name="nim"
                  variant="outlined"
                  aria-readonly
                  value={passingData.nim}
                />
                <TextField
                  name="newPassword"
                  label="New Password"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.newPassword && touched.newPassword}
                  helperText={errors.newPassword}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.confirmPassword && touched.confirmPassword}
                  helperText={errors.confirmPassword}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => {
                  setOpenModalChangePassword(false);
                  setOpen(false);
                }}
                sx={{ textTransform: "capitalize" }}
                color="primary"
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                size="small"
                onClick={handleSubmit}
                aria-disabled={isSubmitting}
                loading={loading}
                loadingIndicator="Loading…"
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  paddingTop: 0.7,
                  paddingBottom: 0.7,
                  paddingLeft: 2,
                  paddingRight: 2,
                }}
              >
                <span style={{ fontSize: "14.5px" }}>Confirm</span>
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordStudentModal;
