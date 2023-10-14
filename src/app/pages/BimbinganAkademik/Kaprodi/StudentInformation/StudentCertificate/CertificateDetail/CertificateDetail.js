import Div from "@jumbo/shared/Div";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";

const CertificateDetail = () => {
  const imageUrl =
    "https://i.pinimg.com/originals/fc/fa/29/fcfa2911e796d71f1bf6aa25ee1d8d89.jpg";
  return (
    <Div>
      <Typography variant="h2" fontWeight="500">
        Certificate
      </Typography>
      <Grid container>
        <Grid item md={6} id="detail-item">
          <Grid container>
            <Grid item md={"auto"}>
              <Stack>
                <Typography
                  variant="h3"
                  fontWeight="500"
                  sx={{ marginBottom: 2 }}
                >
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
                  Approval Date
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Status
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Category
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Descriptions
                </Typography>
              </Stack>
            </Grid>
            <Grid item md={"auto"}>
              <Stack paddingX={1}>
                <Typography
                  variant="h3"
                  fontWeight="500"
                  sx={{ marginBottom: 2 }}
                >
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
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  :
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  :
                </Typography>
              </Stack>
            </Grid>
            <Grid item md={8}>
              <Stack>
                <Typography
                  variant="h3"
                  fontWeight="500"
                  sx={{
                    // fontFamily: "Inter",
                    marginBottom: 2,
                    ":hover": {
                      whiteSpace: "inherit",
                      noWrap: false,
                      textOverflow: "inherit",
                      overflow: "inherit",
                      transition: "0.3s",
                      transitionTimingFunction: "ease-in-out",
                      transitionDelay: "0s",
                      transitionProperty: "all",
                    },
                  }}
                  noWrap={true}
                  textOverflow={"ellipsis"}
                  overflow={"hidden"}
                >
                  Menang lomba desain prototype
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Yuhu, Deil Darell
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Adzanu, Shaliha Alifyaa
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  10 May 2000
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  11 May 2000
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Approved
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Seminar
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Saya mengikuti lomba desain prototype website kampus yang
                  diselenggarakan oleh Fakultas Ilmu Komputer.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} id="certificate-item">
          <Box sx={{ flex: 1 }}>
            <img
              src={imageUrl}
              alt="Certificate-pic"
              style={{ maxWidth: "100%", scale: "0.8" }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={8}>
          <Typography>Coments</Typography>
          <TextareaAutosize minRows={4} maxRows={8} style={{ width: "100%" }} />
        </Grid>
        <Grid
          item
          md={4}
          display="flex"
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Stack direction={"row"} gap={2}>
            <Button
              variant="contained"
              color="error"
              sx={{ borderRadius: "24px", textTransform: "capitalize" }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "24px", textTransform: "capitalize" }}
            >
              Approve
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Div>
  );
};

export default CertificateDetail;
