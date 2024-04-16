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
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { PASSWORD_DEFAULT } from "@jumbo/config/env";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

const AddStudentModal = ({
  openModalAddStudent,
  setOpenModalAddStudent,
  setStudents,
  setStudentsFromApi,
}) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [borderStyleEmptyFile, setBorderStyleEmptyFile] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");

  const styleModalAddStudent = {
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
    FileSaver.saveAs(new Blob([blob], {}), "templateStudentManagement.xlsx");
  };

  const handleSubmitFile = async () => {
    setLoading(true);
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("xlsxFile", selectedFile);

        await jwtAuthAxios.post(`/student-many/file`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const response = await jwtAuthAxios.get(`/Student`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSelectedFile(null);
        setStudents(response.data.data);
        setStudentsFromApi(response.data.data);
        setOpenModalAddStudent(false);
        setBorderStyleEmptyFile("1px solid #E0E0E0");
        setLoading(false);
        setOpen(false);
      } catch (error) {
        setLoading(false);
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
    } else {
      setLoading(false);
      setError("Please Import Excel file");
      setOpen(true);
      setBorderStyleEmptyFile("1px solid red");
    }
  };

  return (
    <Modal
      open={openModalAddStudent}
      onClose={() => {
        setSelectedFile(null);
        setOpenModalAddStudent(false);
        setBorderStyleEmptyFile("1px solid #E0E0E0");
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...styleModalAddStudent, width: "auto" }}>
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
            Add Student
          </Typography>
          <Link
            id="modal-modal-description"
            sx={{ cursor: "pointer", fontSize: "12px", color: "#005FDB" }}
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
          <input
            type="file"
            accept=".xls,.xlsx"
            id="excel-file"
            onChange={handleFileInput}
            style={{ display: "none" }}
          />
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
              setOpenModalAddStudent(false);
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

export default AddStudentModal;
