import Div from "@jumbo/shared/Div";
import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  Stack,
  Typography,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Popover,
  Button,
  Modal,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const StudentProfile = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState("active");

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Div>
      <Typography
        sx={{ fontSize: "24px", fontWeight: 500, paddingBottom: "24px" }}
      >
        Student Profile
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ backgroundColor: "#1A38601A" }}
        >
          <Typography fontWeight={500}>Student Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item>
              <Div
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
                <Typography>Photo</Typography>
              </Div>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">Full Name</Typography>
              <Typography variant="h6" sx={textSyle}>
                Christopher, Darell
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Gender</Typography>
              <Typography variant="h6" sx={textSyle}>
                Male
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction={"row"} gap={1} justifyContent={"space-between"}>
                <Typography variant="h5">Student Status</Typography>
                <IconButton size="small" onClick={handleOpenPopover}>
                  <BorderColorIcon fontSize="inherit" />
                </IconButton>
              </Stack>
              <Typography variant="h6" sx={textSyle}>
                {status}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">NIM</Typography>
              <Typography variant="h6" sx={textSyle}>
                105021810001
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Registration Number</Typography>
              <Typography variant="h6" sx={textSyle}>
                S2200001
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Date of Birth</Typography>
              <Typography variant="h6" sx={textSyle}>
                08/01/2005
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Religion</Typography>
              <Typography variant="h6" sx={textSyle}>
                Christian
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Blood Type</Typography>
              <Typography variant="h6" sx={textSyle}>
                B
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Married Status</Typography>
              <Typography variant="h6" sx={textSyle}>
                Belum Menikah
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Email</Typography>
              <Typography variant="h6" sx={textSyle}>
                s2200001@student.unklab.ac.id
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Phone Number</Typography>
              <Typography variant="h6" sx={textSyle}>
                0853-1234-5678
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Curriculum</Typography>
              <Typography variant="h6" sx={textSyle}>
                TI 2018
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Area of Concentration</Typography>
              <Typography variant="h6" sx={textSyle}>
                -
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Previous High School</Typography>
              <Typography variant="h6" sx={textSyle}>
                SMA Bakti Luhur
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Address</Typography>
              <Typography variant="h6" sx={textSyle}>
                Winenet, lorong kopi-kopi 2, Kecamatan Aertembaga
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Current Address</Typography>
              <Typography variant="h6" sx={textSyle}>
                Kost Pink
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Current Residence Status</Typography>
              <Typography variant="h6" sx={textSyle}>
                Kost
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="status"
              name="status"
              value={status}
              onChange={handleStatusChange}
            >
              <FormControlLabel
                value="Active"
                control={<Radio />}
                label="Active"
                sx={{ marginLeft: "3px" }}
              />
              <FormControlLabel
                value="Inactive"
                control={<Radio />}
                label="Inactive"
              />
            </RadioGroup>
          </FormControl>
        </Popover>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ backgroundColor: "#1A38601A" }}
        >
          <Typography fontWeight={500}>Parents / Guardians</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5" paddingTop={2}>
                Full Name
              </Typography>
              <Typography variant="h6" sx={textSyle}>
                Adzana Shaliha
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Level of Education</Typography>
              <Typography variant="h6" sx={textSyle}>
                S-1
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Religion</Typography>
              <Typography variant="h6" sx={textSyle}>
                Christian
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Married Status</Typography>
              <Typography variant="h6" sx={textSyle}>
                Married
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Relationship</Typography>
              <Typography variant="h6" sx={textSyle}>
                Mother
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Email</Typography>
              <Typography variant="h6" sx={textSyle}>
                adzana@gmail.com
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Phone</Typography>
              <Typography variant="h6" sx={textSyle}>
                0853-1234-5678
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Address</Typography>
              <Typography variant="h6" sx={textSyle}>
                Winenet, lorong kopi-kopi 2, Kecamatan Aertembaga
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ backgroundColor: "#1A38601A" }}
        >
          <Typography fontWeight={500}>Academic Advisor</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5" paddingTop={2}>
                Full Name
              </Typography>
              <Typography variant="h6" sx={textSyle}>
                Adzana Shaliha
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Email</Typography>
              <Typography variant="h6" sx={textSyle}>
                adzana@gmail.com
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Phone</Typography>
              <Typography variant="h6" sx={textSyle}>
                085335181818
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Address</Typography>
              <Typography variant="h6" sx={textSyle}>
                Winenet, lorong kopi-kopi 2, Kecamatan Aertembaga
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Div>
  );
};

const textSyle = {
  borderWidth: 1,
  borderColor: "#00000029",
  borderStyle: "solid",
  paddingX: "24px",
  paddingY: "16px",
  borderRadius: "8px",
};

export default StudentProfile;
