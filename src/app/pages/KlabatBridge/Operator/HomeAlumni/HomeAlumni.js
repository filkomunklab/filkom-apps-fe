import React, { useState } from "react";
import Div from "@jumbo/shared/Div";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Paper,
  Radio,
  FormControl, 
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Grid,
  TextField,
  Input,
  Button,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

const HomeAlumni = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf" && file.size <= 10485760) {
      setPdfFile(file);
    } else {
      alert("Please select a valid PDF file (max. 10MB).");
    }
  };

  const handleLinkClick = () => {
    // Handle link click event if needed
  };

  const handleDeletePdf = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setPdfFile(null);
  };

  return (
    <Div >
      <label htmlFor="pdf-upload-input">
        <Input
          accept=".pdf"
          type="file"
          id="pdf-upload-input"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <Button
          variant="outlined"
          component="span"
          style={{
            width: "200px",
            height: "100px", // Adjust the height to accommodate the content
            display: "flex",
            flexDirection: "column", // Arrange items vertically
            alignItems: "center", // Center items horizontally
            justifyContent: "center", // Center items vertically
            padding: "5px", // Add padding to the button
            color: "#1C1B20",
            backgroundColor: "#F8F9FD",
            "& .MuiSvgIcon-root": {
              fontSize: 48, // Adjust the icon size
            },
            "&:hover": {
              backgroundColor: "#7F91D9",
              color: "white",
            },
          }}
        >
          <BackupOutlinedIcon /> {/* Icon */}
          <Typography variant="subtitle1" sx={{ fontSize: "12px", textTransform: "none" }}>
            Upload PDF File Sertifikasi
          </Typography> {/* Text and line breaks */}
          <Typography variant="subtitle1" sx={{ fontSize: "10px", textTransform: "none" }}>
            Max 10MB
          </Typography> {/* Text and line breaks */}
        </Button>
      </label>

      {pdfFile && (
        <Div sx={{ marginTop: "20px", position: "relative" }}>
          <a
            href={URL.createObjectURL(pdfFile)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "blue",
            }}
          >
            <span style={{ marginRight: "10px" }}>{pdfFile.name}</span>
            <IconButton
              sx={{
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onClick={handleDeletePdf}
              color="error"
              aria-label="Delete PDF"
            >
              <ClearIcon />
            </IconButton>
          </a>
        </Div>
      )}
      {/* <Box sx={{
        backgroundColor:"#E8EBE8", 
        height: "70px", 
        display: 'flex',
        alignItems: 'center',
        borderRadius: "5px",
        paddingLeft: "25px",
      }}>
        <Typography sx={{
          fontSize: "16px", fontWeight: 500,
        }}>
          Silahkan mengisi form Tracer Study
        </Typography>
      </Box> */}

      
    </Div>
    
  )
}

export default HomeAlumni