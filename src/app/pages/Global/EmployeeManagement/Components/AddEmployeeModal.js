import {
  Stack,
  Typography,
  Button,
  Modal,
  styled,
  Alert,
  IconButton,
  Link,
} from "@mui/material";
import { EXCEL_FILE_BASE64 } from "./constants";
import FileSaver from "file-saver";
import Collapse from "@mui/material/Collapse";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { PASSWORD_DEFAULT } from "@jumbo/config/env";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import * as Yup from "yup";

const roleValues = [
  "ADMIN",
  "SUPER_ADMIN",
  "MAHASISWA",
  "ADMIN_LPMI",
  "OPERATOR_LPMI",
  "ALUMNI",
  "DEKAN",
  "KAPRODI",
  "DOSEN",
  "DOSEN_MK",
  "OPERATOR_FAKULTAS",
  "SEKRETARIS",
  "REGISTER",
];

const employeeArraySchema = Yup.array()
  .of(
    Yup.object().shape({
      nik: Yup.string()
        .trim("NIK cannot include leading and trailing spaces")
        .strict(true)
        .matches(/^\d+$/, "NIK must only contain digits")
        .min(10, "must be at least 10 digits")
        .max(13, "cannot be more than 13 digits")
        .required(),
      firstName: Yup.string()
        .trim("First Name cannot include leading and trailing spaces")
        .strict(true)
        .min(3, "must be at least 3 characters")
        .max(50, "cannot be more than 50 characters")
        .required(),
      lastName: Yup.string()
        .trim("Last Name cannot include leading and trailing spaces")
        .strict(true)
        .min(3, "must be at least 3 characters")
        .max(50, "cannot be more than 50 characters")
        .required(),
      degree: Yup.string(),
      major: Yup.string().oneOf(["IF", "SI", "DKV", "NONE"]),
      Address: Yup.string(),
      email: Yup.string()
        .trim("Email cannot include leading and trailing spaces")
        .strict(true)
        .email(),
      phoneNum: Yup.string()
        .trim("Phone Number cannot include leading and trailing spaces")
        .strict(true)
        .matches(/^\d+$/, "phone number must only contain digits")
        .min(10, "must be at least 10 digits")
        .max(13, "cannot be more than 13 digits"),
      role: Yup.array()
        .of(Yup.string().oneOf(roleValues, "Invalid role"))
        .min(1, "At least one role must be selected"),
      password: Yup.string(),
    })
  )
  .min(1, "Employee cannot be empty");

const AddEmployeeModal = ({
  openModalAddEmployee,
  setOpenModalAddEmployee,
  setEmployees,
  setEmployeesFromApi,
}) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [borderStyleEmptyFile, setBorderStyleEmptyFile] = useState("");

  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");

  const styleModalAddEmployee = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#FFFFFF",
    border: "2px solid #E0E0E0",
    borderRadius: "10px",
    padding: "24px 24px 0 24px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    rowGap: "30px",
  };

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

  const handleFileInput = (event) => {
    const file = event.target.files[0];

    if (file) {
      const allowedExtensions = ["xlsx", "xls"];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        setSelectedFile(file);

        const labelElement = document.getElementById("excel-file");
        if (labelElement) {
          labelElement.style.border = "0.2px solid #BCBCBC";
        }
      } else {
        alert("Only Excel files (xlsx, xls) are allowed.");
        event.target.value = "";
      }
    } else {
      setSelectedFile(null);
    }
  };

  const handleTemplate = () => {
    let dataBlob = EXCEL_FILE_BASE64;
    let sliceSize = 1024;
    let byteCharacters = atob(dataBlob);
    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    let byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      let begin = sliceIndex * sliceSize;
      let end = Math.min(begin + sliceSize, bytesLength);
      let bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    let blob = new Blob(byteArrays, { type: "application/vnd.ms.excel" });
    FileSaver.saveAs(new Blob([blob], {}), "templateEmployeeManagement.xlsx");
  };

  const handleSubmitFile = async () => {
    setLoading(true);
    if (selectedFile) {
      const file = selectedFile;
      const reader = new FileReader();

      reader.onload = async (e) => {
        const dataExcel = new Uint8Array(e.target.result);
        const workbook = XLSX.read(dataExcel, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const options = {
          header: [
            "nik",
            "firstName",
            "lastName",
            "degree",
            "major",
            "Address",
            "email",
            "phoneNum",
            "role",
          ],
          raw: false,
          range: 1,
          defval: "",
        };
        const result = XLSX.utils.sheet_to_json(sheet, options);

        console.log("ini data result excel to json: ", result);

        const data = result.map((item) => {
          return {
            ...item,
            password: PASSWORD_DEFAULT,
            role: item.role.split(","),
          };
        });
        console.log("ini data yang sudah di maping loh: ", data);
        try {
          await employeeArraySchema.validate(data, { abortEarly: false });
        } catch (error) {
          setLoading(false);
          setOpen(true);
          console.log("ini errornya: ", error.errors);
          if (error.inner && error.inner.length > 0) {
            console.error("Detail kesalahan pada field:");
            const arrayError = error.inner.map((error) => {
              const number =
                parseInt(error.path.split(".")[0].slice(1, -1), 10) + 2;
              const column = error.path.split(".")[1];
              return `Row: ${number}, Column: ${column}, Message: ${error.message}. `;
            });
            setError(arrayError);
          }
          return;
        }

        try {
          await jwtAuthAxios.post(
            `/employee-many`,
            {
              data,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          const response = await jwtAuthAxios.get(`/employee`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setSelectedFile(null);
          setEmployees(response.data.data);
          setEmployeesFromApi(response.data.data);
          setOpenModalAddEmployee(false);
          setBorderStyleEmptyFile("1px solid #E0E0E0");
          setLoading(false);
          setOpen(false);
        } catch (error) {
          console.log("error apa ini dia: ", error);
          if (error.response) {
            setError(error.response.data.data.error);
          } else if (error.message) {
            setError(error.message);
          } else {
            setError("Something Wrong!!");
          }
          setLoading(false);
          setOpen(true);
        }
      };

      reader.readAsArrayBuffer(file);
    } else {
      setLoading(false);
      setError("Please Import Excel file");
      setOpen(true);
      setBorderStyleEmptyFile("1px solid red");
    }
  };

  return (
    <Modal
      open={openModalAddEmployee}
      onClose={() => {
        setSelectedFile(null);
        setOpenModalAddEmployee(false);
        setBorderStyleEmptyFile("1px solid #E0E0E0");
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...styleModalAddEmployee, width: "auto" }}>
        <Collapse in={open} sx={{ width: "inherit", maxWidth: "400px" }}>
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
        <Stack
          direction="row"
          justifyContent="space-between"
          columnGap="120px"
          alignItems="center"
        >
          <Typography
            id="modal-modal-title"
            variant="h2"
            component="h2"
            sx={{ fontWeight: "400", color: "#0A0A0A", fontSize: "24px" }}
          >
            Add Employee
          </Typography>
          <Link
            sx={{
              cursor: "pointer",
              color: "#025ED8",
              fontSize: "12px",
            }}
            onClick={handleTemplate}
          >
            Template Excel
          </Link>
        </Stack>
        <Button
          fullWidth
          component="label"
          variant="outlined"
          endIcon={<SaveAltIcon sx={{ color: "#1B2B41B0" }} />}
          sx={{
            border: borderStyleEmptyFile
              ? borderStyleEmptyFile
              : "1px solid #E0E0E0",
            justifyContent: "space-between",
            textTransform: "capitalize",
            color: "#1B2B41B0",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          {selectedFile ? selectedFile.name : "Import Excel"}
          <VisuallyHiddenInput type="file" onChange={handleFileInput} />
        </Button>
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          columnGap="12px"
          sx={{
            backgroundColor: "#F5F5F5",
            width: "calc(100% + 54px)",
            height: "100%",
            marginLeft: "-24px",
            padding: "12px 24px 12px 24px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: "79px",
              height: "32px",
              borderColor: "#E0E0E0",
              color: "#0A0A0A",
            }}
            onClick={() => {
              setSelectedFile(null);
              setOpenModalAddEmployee(false);
              setBorderStyleEmptyFile("1px solid #E0E0E0");
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            size="small"
            onClick={handleSubmitFile}
            loading={loading}
            loadingIndicator="Loading…"
            variant="contained"
            sx={{ width: "79px", height: "32px" }}
          >
            <span>Submit</span>
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddEmployeeModal;
