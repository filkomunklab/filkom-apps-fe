import React from "react";
import { Container, Typography, Box } from "@mui/material";

const CertificateWaiting = () => {
  const imageUrl =
    "https://i.pinimg.com/originals/fc/fa/29/fcfa2911e796d71f1bf6aa25ee1d8d89.jpg";

  return (
    <div>
      <Typography sx={{ fontSize: "24px", fontWeight: 500, paddingBottom: 2 }}>
        Academic Guide
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
          <Typography variant="h5" sx={{ marginBottom: 2, color: "#FFCC00" }}>
            Waiting
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
    </div>
  );
};

export default CertificateWaiting;
