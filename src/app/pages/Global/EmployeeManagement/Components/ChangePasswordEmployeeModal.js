import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const ChangePassSchema = Yup.object().shape({
  newPassword: Yup.string().trim("New Password cannot include leading and trailing spaces").strict(true).required("Required"),
  confirmPassword: Yup.string()
    .trim("Confirm Password cannot include leading and trailing spaces")
    .strict(true)
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

const ChangePasswordEmployeeModal = ({ openModalChangePassword, setOpenModalChangePassword, passingData }) => {
  console.log("ini passingData: ", passingData);
  return (
    <Formik
      initialValues={{
        nik: passingData.nik,
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={ChangePassSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await jwtAuthAxios.patch(`/management/employee/${passingData.nik}/password`, values, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setSubmitting(false);
          setOpenModalChangePassword(false);
        } catch (error) {
          console.log(error);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, handleSubmit, handleChange, errors, touched }) => (
        <Form>
          <Dialog open={openModalChangePassword} onClose={() => setOpenModalChangePassword(false)} fullWidth>
            <DialogTitle>Reset Password Account</DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="NIK" name="nik" variant="outlined" aria-readonly value={passingData.nik} />
                <TextField
                  name="newPassword"
                  label="New Password"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.newPassword && touched.newPassword}
                  helperText={errors.newPassword}
                  FormHelperTextProps={{ style: { whiteSpace: "normal", color: "red" } }}
                />
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.confirmPassword && touched.confirmPassword}
                  helperText={errors.confirmPassword}
                  FormHelperTextProps={{ style: { whiteSpace: "normal", color: "red" } }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={() => setOpenModalChangePassword(false)} sx={{ textTransform: "capitalize" }} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ textTransform: "capitalize" }} onClick={handleSubmit} aria-disabled={isSubmitting}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordEmployeeModal;
