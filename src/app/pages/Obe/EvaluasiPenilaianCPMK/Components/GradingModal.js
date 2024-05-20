import { DeleteOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, FormHelperText, IconButton, Modal } from "@mui/material";
import { Form, Formik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ErrorIcon from "@mui/icons-material/Error";
import DownloadIcon from "@mui/icons-material/Download";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import { putStudentGrade } from "app/api";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { OBE_BASE_URL_API } from "@jumbo/config/env";

const GradingModal = ({ open, setOpen = () => {}, item }) => {
  const formik = useRef(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      formik.current.setFieldValue("file", acceptedFiles[0]);
    },
  });

  const studentGradeMutation = useMutation({
    mutationFn: putStudentGrade,
    onSuccess: () => {
      setOpen(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Student grade has been uploaded",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    },
  });
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white rounded-lg p-10">
          <Formik
            innerRef={formik}
            initialValues={{
              file: undefined,
            }}
            validationSchema={yup.object().shape({
              file: yup.mixed().required("Required"),
            })}
            onSubmit={(values) => {
              studentGradeMutation.mutate({
                gradingSystemId: item.id,
                file: values.file,
              });
            }}
          >
            {({ errors, values, setFieldValue }) => (
              <Form>
                <h1 className="text-3xl font-semibold mb-5">
                  Upload Nilai Siswa{" "}
                  <span className="font-normal italic">
                    ({item.gradingName})
                  </span>
                </h1>
                <div className="bg-secondary rounded-md p-5 mb-10">
                  <h1 className="text-lg font-medium">
                    <span className="text-blue-600 mr-2">
                      <ErrorIcon />
                    </span>
                    Persiapkan file XLSX
                  </h1>
                  <div className="pl-8">
                    <ul className="list-disc text-lg font-medium text-gray-500 py-5 pl-[18px]">
                      <li>
                        Pastikan file yang anda upload harus berbentuk .xlsx
                      </li>
                      <li>Periksa kembali jika ada data yang sama.</li>
                    </ul>
                    <Link
                      to={`${OBE_BASE_URL_API}/static/templates/InsertGrade.xlsx`}
                      className="text-xl font-medium text-blue-700"
                    >
                      DOWNLOAD TAMPLATE XLSX{" "}
                      <span>
                        <DownloadIcon />
                      </span>
                    </Link>
                  </div>
                </div>
                {!values.file ? (
                  <>
                    <div
                      className="border-dashed border-2 border-primary rounded-lg p-10 flex justify-center items-center hover:cursor-pointer"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <p>
                        Drag and drop xlsx file here or click to browse. (max 1)
                      </p>
                    </div>
                    <FormHelperText
                      children={errors.file}
                      sx={{ color: "red" }}
                    />
                  </>
                ) : (
                  <div>
                    <h3>
                      {values.file.name}
                      <span>
                        <IconButton
                          color="error"
                          aria-label="remove file"
                          component="label"
                          onClick={() => {
                            setFieldValue("file", undefined);
                          }}
                        >
                          <DeleteOutline />
                        </IconButton>
                      </span>
                    </h3>
                  </div>
                )}
                <div className="flex flex-row-reverse gap-3 p-3">
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    loadingPosition="end"
                    endIcon={<UploadFileIcon />}
                    loading={studentGradeMutation.isPending}
                  >
                    Simpan
                  </LoadingButton>
                  <Button
                    variant="outlined"
                    className="!border-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-gray-400">Batal</span>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export default GradingModal;
