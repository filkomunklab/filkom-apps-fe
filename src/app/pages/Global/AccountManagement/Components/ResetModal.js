import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const ChangePassSchema = Yup.object().shape({
  newPassword: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

const ResetModal = ({ open, setOpen, data }) => {
  console.log(data);
  return (
    <Formik
      initialValues={{
        nim: data.nim,
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={ChangePassSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await jwtAuthAxios.patch(
            `/management/student/${data.nim}/password`,
            values
          );
          setSubmitting(false);
          setOpen();
        } catch (error) {
          console.log(error);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, handleSubmit, handleChange, errors, touched }) => (
        <Form>
          <Dialog open={open} onClose={setOpen}>
            <DialogTitle>Reset Password Account</DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="NIM"
                  name="nim"
                  variant="outlined"
                  aria-readonly
                  value={data.nim}
                />
                <TextField
                  name="newPassword"
                  label="New Password"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.newPassword && touched.newPassword}
                  helperText={errors.newPassword}
                />
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.confirmPassword && touched.confirmPassword}
                  helperText={errors.confirmPassword}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={setOpen}
                sx={{ textTransform: "capitalize" }}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ textTransform: "capitalize" }}
                onClick={handleSubmit}
                aria-disabled={isSubmitting}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default ResetModal;
