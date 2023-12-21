import { Stack, Typography, Button, Modal, styled } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { PASSWORD_DEFAULT } from "@jumbo/config/env";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

const AddEmployeeModal = ({ openModalAddEmployee, setOpenModalAddEmployee, setEmployees }) => {
  const [selectedFile, setSelectedFile] = useState("");

  console.log("ini password default: ", PASSWORD_DEFAULT);
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

  const handleSubmitFile = async () => {
    console.log("ini selected file pas handle submit: ", selectedFile);
    const file = selectedFile;
    const reader = new FileReader();

    reader.onload = async (e) => {
      const dataExcel = new Uint8Array(e.target.result);
      const workbook = XLSX.read(dataExcel, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const options = {
        header: ["nik", "nidn", "firstName", "lastName", "degree", "major", "Address", "email", "phoneNum", "role"],
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
        await jwtAuthAxios.post(`/employees`, {
          data,
        });

        const response = await jwtAuthAxios.get(`/employee`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSelectedFile(null);
        setEmployees(response.data.data);
        setOpenModalAddEmployee(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Modal
      open={openModalAddEmployee}
      onClose={() => {
        setSelectedFile(null);
        setOpenModalAddEmployee(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModalAddEmployee}>
        <Stack direction="row" justifyContent="space-between" columnGap="120px" alignItems="center">
          <Typography id="modal-modal-title" variant="h2" component="h2" sx={{ fontWeight: "400", color: "#0A0A0A", fontSize: "24px" }}>
            Add Employee
          </Typography>
          <Typography id="modal-modal-description" sx={{ fontSize: "12px", color: "#005FDB" }}>
            Template Excel
          </Typography>
        </Stack>

        <Button
          fullWidth
          component="label"
          variant="outlined"
          endIcon={<SaveAltIcon sx={{ color: "#1B2B41B0" }} />}
          sx={{
            border: "1px solid #E0E0E0",
            justifyContent: "space-between",
            textTransform: "capitalize",
            color: "#1B2B41B0",
            borderColor: "#E0E0E0",
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
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" sx={{ width: "79px", height: "32px" }} onClick={handleSubmitFile}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddEmployeeModal;
