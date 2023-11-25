import Div from "@jumbo/shared/Div";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextareaAutosize,
  Typography,
  Breadcrumbs,
  experimentalStyled as styled,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

const CertificateDetail = () => {
  const navigate = useNavigate();
  const handleClick = (event, step) => {
    event.preventDefault();
    navigate(step);
  };

  const pdfURL =
    "https://firebasestorage.googleapis.com/v0/b/filkom-apps-project.appspot.com/o/certificate%2F10502201001%2FNational.pdf?alt=media&token=a60bad0e-9836-46c2-8707-f9883e4a812f";

  return (
    <Div>
      <Div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink onClick={(event) => handleClick(event, -2)}>
            Student Information
          </StyledLink>
          <StyledLink onClick={(event) => handleClick(event, -1)}>
            Student Certificates
          </StyledLink>
          <Typography color="text.primary">Certificate</Typography>
        </Breadcrumbs>
      </Div>
      <Typography
        fontSize={"24px"}
        fontWeight="500"
        sx={{ marginBottom: 2, paddingTop: "20px" }}
      >
        Certificate
      </Typography>
      <Grid container spacing={2} />
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
                <Typography variant="h5" sx={{ color: "#FFCC00" }}>
                  Waiting
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
              src={""}
              alt="Certificate-pic"
              style={{ maxWidth: "100%", scale: "0.8" }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} />
      </Grid>

      <Grid container>
        <Grid item md={8}>
          <Typography>Coments</Typography>
          <TextareaAutosize minRows={4} maxRows={8} style={{ width: "100%" }} />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          display="flex"
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Stack direction={"row"} gap={2}>
            <Button
              variant="contained"
              color="error"
              sx={{
                borderRadius: "24px",
                textTransform: "capitalize",
                width: "100%",
                fontSize: "1rem",
              }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "24px",
                textTransform: "capitalize",
                width: "100%",
                fontSize: "1rem",
              }}
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
