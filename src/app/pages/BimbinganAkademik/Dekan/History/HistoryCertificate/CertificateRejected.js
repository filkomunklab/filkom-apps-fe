import React from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  Paper,
  Breadcrumbs,
  experimentalStyled as styled,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const CertificateRejected = () => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const imageUrl =
    "https://i.pinimg.com/originals/fc/fa/29/fcfa2911e796d71f1bf6aa25ee1d8d89.jpg";

  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>History</StyledLink>
          <Typography color="text.primary">Certificate</Typography>
        </Breadcrumbs>
      </div>
      <Typography
        fontSize={"24px"}
        fontWeight="500"
        sx={{ marginBottom: 2, paddingTop: "20px" }}
      >
        Certificate
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={8} id="detail-item">
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Title</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5" fontWeight={500}>
                  Menang Student Programmer Competition
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Student Name</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5">Awuy, Diany Mariska</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Supervisor Name</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5">Dengah, Mesakh Leonardo</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Submission Date</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5">November 14, 2023</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Approval Date</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5">-</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Category</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5">Local</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Status</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5" sx={{ color: "red" }}>
                  Rejected
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} md={3} xl={3}>
                <Typography variant="h5">Descriptions</Typography>
              </Grid>
              <Grid item xs={1} xl={"auto"}>
                <Typography variant="h5">:</Typography>
              </Grid>
              <Grid item xs={7} paddingLeft={1}>
                <Typography variant="h5" sx={{ textAlign: "justify" }}>
                  Saya mengikuti lomba desain prototype website kampus yang
                  diselenggarakan oleh Fakultas Ilmu Komputer.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} id="certificate-item">
          <Box sx={{ flex: 1 }}>
            <img
              src={imageUrl}
              alt="Certificate-pic"
              style={{ maxWidth: "100%", scale: "0.8" }}
            />
          </Box>
        </Grid>
      </Grid>

      <Stack spacing={2} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Comments from Supervisor
        </Typography>
        <Paper elevation={0} variant="outlined" fullWidth>
          <Typography variant="body1" sx={{ p: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            commodo nunc in ligula tempus, sed feugiat justo vestibulum. Etiam
            pellentesque, odio vel facilisis posuere, urna velit gravida est, eu
            pharetra massa tortor eget quam.
          </Typography>
        </Paper>
      </Stack>
    </div>
  );
};

export default CertificateRejected;
