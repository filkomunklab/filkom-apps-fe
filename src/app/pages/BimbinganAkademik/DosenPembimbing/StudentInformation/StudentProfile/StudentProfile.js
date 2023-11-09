import Div from "@jumbo/shared/Div";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  Stack,
  Typography,
  Breadcrumbs,
  experimentalStyled as styled,
  Popover,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const StudentProfile = () => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState("Active");

  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    handleClose();
  };

  return (
    <Div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>Back</StyledLink>
          <Typography color="text.primary">Student Profile</Typography>
        </Breadcrumbs>
      </div>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 500,
          paddingBottom: "20px",
          paddingTop: "24px",
        }}
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
              <Typography variant="h6" sx={textStyle}>
                Christopher, Darell
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Gender</Typography>
              <Typography variant="h6" sx={textStyle}>
                Male
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction={"row"} gap={1} justifyContent={"space-between"}>
                <Typography variant="h5">Student Status</Typography>
                <IconButton size="small" onClick={handleClickPopover}>
                  <BorderColorIcon fontSize="inherit" />
                </IconButton>
              </Stack>
              <Typography variant="h6" sx={textStyle}>
                {status}
              </Typography>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Button onClick={() => handleStatusChange("Active")}>
                  Active
                </Button>
                <Button onClick={() => handleStatusChange("Inactive")}>
                  Inactive
                </Button>
              </Popover>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">NIM</Typography>
              <Typography variant="h6" sx={textStyle}>
                105021810001
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Registration Number</Typography>
              <Typography variant="h6" sx={textStyle}>
                S2200001
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Date of Birth</Typography>
              <Typography variant="h6" sx={textStyle}>
                08/01/2005
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Religion</Typography>
              <Typography variant="h6" sx={textStyle}>
                Christian
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Blood Type</Typography>
              <Typography variant="h6" sx={textStyle}>
                B
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Married Status</Typography>
              <Typography variant="h6" sx={textStyle}>
                Belum Menikah
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Email</Typography>
              <Typography variant="h6" sx={textStyle}>
                s2200001@student.unklab.ac.id
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Phone Number</Typography>
              <Typography variant="h6" sx={textStyle}>
                0853-1234-5678
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Curriculum</Typography>
              <Typography variant="h6" sx={textStyle}>
                TI 2018
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Area of Concentration</Typography>
              <Typography variant="h6" sx={textStyle}>
                -
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Previous High School</Typography>
              <Typography variant="h6" sx={textStyle}>
                SMA Bakti Luhur
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Address</Typography>
              <Typography variant="h6" sx={textStyle}>
                Winenet, lorong kopi-kopi 2, Kecamatan Aertembaga
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Current Address</Typography>
              <Typography variant="h6" sx={textStyle}>
                Kost Pink
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Current Residence Status</Typography>
              <Typography variant="h6" sx={textStyle}>
                Kost
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
          <Typography fontWeight={500}>Parents / Guardians</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5" paddingTop={2}>
                Full Name
              </Typography>
              <Typography variant="h6" sx={textStyle}>
                Adzana Shaliha
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Level of Education</Typography>
              <Typography variant="h6" sx={textStyle}>
                S-1
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Religion</Typography>
              <Typography variant="h6" sx={textStyle}>
                Christian
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Married Status</Typography>
              <Typography variant="h6" sx={textStyle}>
                Married
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Relationship</Typography>
              <Typography variant="h6" sx={textStyle}>
                Mother
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Email</Typography>
              <Typography variant="h6" sx={textStyle}>
                adzana@gmail.com
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Phone</Typography>
              <Typography variant="h6" sx={textStyle}>
                0853-1234-5678
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Address</Typography>
              <Typography variant="h6" sx={textStyle}>
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
              <Typography variant="h6" sx={textStyle}>
                Adzana Shaliha
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Email</Typography>
              <Typography variant="h6" sx={textStyle}>
                adzana@gmail.com
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Phone</Typography>
              <Typography variant="h6" sx={textStyle}>
                085335181818
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Address</Typography>
              <Typography variant="h6" sx={textStyle}>
                Winenet, lorong kopi-kopi 2, Kecamatan Aertembaga
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Div>
  );
};

const textStyle = {
  borderWidth: 1,
  borderColor: "#00000029",
  borderStyle: "solid",
  paddingX: "24px",
  paddingY: "16px",
  borderRadius: "8px",
};

export default StudentProfile;
