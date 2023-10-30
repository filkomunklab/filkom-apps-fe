import Div from "@jumbo/shared/Div";
import { Typography, Paper, Grid } from "@mui/material";

const Profile = () => {
  return (
    <Div>
      <Paper elevation={1} sx={{ mb: 5 }}>
        <Typography
          variant="h5"
          sx={{
            backgroundColor: "#1A38601A",
            fontWeight: 500,
            padding: "16px",
          }}
        >
          Supervisor Information
        </Typography>
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Full Name</Typography>
            <Typography variant="h6" sx={textSyle}>
              Sean Andreaz
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">NIDN</Typography>
            <Typography variant="h6" sx={textSyle}>
              302919290000
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Email</Typography>
            <Typography variant="h6" sx={textSyle}>
              iamsean910@gmail.com
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Phone</Typography>
            <Typography variant="h6" sx={textSyle}>
              082919912400
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Address</Typography>
            <Typography variant="h6" sx={textSyle}>
              Perum Agape griya blok K/10, Tumaluntung, Kabupaten Minahasa Utara
            </Typography>
          </Grid>
        </Grid>
      </Paper>
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

export default Profile;
