import Div from "@jumbo/shared/Div";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const StudentProfile = () => {
  return (
    <Div>
      <Typography variant={"h1"} sx={{ marginLeft: 3 }}>
        Student Profile
      </Typography>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ backgroundColor: "#1A38601A" }}
        >
          <Typography variant={"h3"}>Student Information</Typography>
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
              <Typography variant="h4">Full Name</Typography>
              <Typography variant="h6" sx={textSyle}>
                Yuhu, Darell Deil
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Gender</Typography>
              <Typography variant="h6" sx={textSyle}>
                Male
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction={"row"} gap={1} justifyContent={"space-between"}>
                <Typography variant="h4">Student Status</Typography>
                <IconButton size="small">
                  <BorderColorIcon fontSize="inherit" />
                </IconButton>
              </Stack>
              <Typography variant="h6" sx={textSyle}>
                Active
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">NIM</Typography>
              <Typography variant="h6" sx={textSyle}>
                105021810001
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Registration Number</Typography>
              <Typography variant="h6" sx={textSyle}>
                S2200001
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Date of Birth</Typography>
              <Typography variant="h6" sx={textSyle}>
                08/01/2005
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Religion</Typography>
              <Typography variant="h6" sx={textSyle}>
                Christian
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Blood Type</Typography>
              <Typography variant="h6" sx={textSyle}>
                B
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Status Pernikahan</Typography>
              <Typography variant="h6" sx={textSyle}>
                Belum Menikah
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Email</Typography>
              <Typography variant="h6" sx={textSyle}>
                s2200001@student.unklab.ac.id
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Phone Number</Typography>
              <Typography variant="h6" sx={textSyle}>
                0853-1234-5678
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Kurikulum</Typography>
              <Typography variant="h6" sx={textSyle}>
                TI 2018
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Bidang Perminatan</Typography>
              <Typography variant="h6" sx={textSyle}>
                -
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Asal SMA</Typography>
              <Typography variant="h6" sx={textSyle}>
                SMA Bakti Luhur
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Alamat Rumah</Typography>
              <Typography variant="h6" sx={textSyle}>
                Winenet, lorong kopi-kopi 2, Kecamatan Aertembaga
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Alamat Sekarang</Typography>
              <Typography variant="h6" sx={textSyle}>
                Kost Pink
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">
                Status Tempat Tinggal Sekarang
              </Typography>
              <Typography variant="h6" sx={textSyle}>
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
          <Typography variant={"h3"}>Orang Tua / Wali Mahasiswa</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Typography variant="h4">Full Name</Typography>
              <Typography variant="h6" sx={textSyle}>
                Adzana Shaliha
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Jenjang Pendidikan</Typography>
              <Typography variant="h6" sx={textSyle}>
                S-1
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Religion</Typography>
              <Typography variant="h6" sx={textSyle}>
                Christian
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Married Status</Typography>
              <Typography variant="h6" sx={textSyle}>
                Married
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Relationship</Typography>
              <Typography variant="h6" sx={textSyle}>
                Mother
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Email</Typography>
              <Typography variant="h6" sx={textSyle}>
                adzana@gmail.com
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Phone</Typography>
              <Typography variant="h6" sx={textSyle}>
                0853-1234-5678
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">Address</Typography>
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
