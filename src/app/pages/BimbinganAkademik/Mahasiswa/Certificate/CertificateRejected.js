import React from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  Paper,
  Breadcrumbs,
  experimentalStyled as styled,
} from "@mui/material";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const CertificateWaiting = () => {
  const handleClick = (event) => {
    event.preventDefault();
  };

  const imageUrl =
    "https://i.pinimg.com/originals/fc/fa/29/fcfa2911e796d71f1bf6aa25ee1d8d89.jpg";

  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/history">History</StyledLink>
          <Typography color="text.primary">Certificate</Typography>
        </Breadcrumbs>
      </div>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 500,
          paddingBottom: 2,
          paddingTop: "20px",
        }}
      >
        Certificate
      </Typography>
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 0.4 }}>
          <Typography variant="h3" fontWeight="500" sx={{ marginBottom: 2 }}>
            Title
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Student Name
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Supervisor Name
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Submission Date
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Status
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Category
          </Typography>
        </Box>
        <Box sx={{ flex: 0.04 }}>
          <Typography variant="h3" fontWeight="500" sx={{ marginBottom: 2 }}>
            :
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            :
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            :
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            :
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            :
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            :
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" fontWeight="500" sx={{ marginBottom: 2 }}>
            Menang lomba desain prototype
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Awuy, Diany Mariska
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Adzanu, Shaliha Alifyaa
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            10 May 2000
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2, color: "red" }}>
            Rejected
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Local
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <img
            src={imageUrl}
            alt="Certificate-pic"
            style={{ maxWidth: "100%" }}
          />
        </Box>
      </Container>
      <Box sx={{ paddingLeft: 3, marginTop: 4 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Descriptions:
        </Typography>
        <Typography variant="h5">
          Saya mengikuti lomba desain prototype website kampus yang
          diselenggarakan oleh Fakultas Ilmu Komputer.
        </Typography>
      </Box>

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

export default CertificateWaiting;
