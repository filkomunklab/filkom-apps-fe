import React, { useState, useEffect } from "react";
import Div from "@jumbo/shared/Div";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  Stack,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Breadcrumbs,
  experimentalStyled as styled,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import SearchLocal from "./SearchLocal/SearchLocal";
import { Link, useNavigate } from "react-router-dom";
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const History = (props) => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(-2);
  };

  useEffect(() => {
    const storedValue = localStorage.getItem("historyTabValue");
    if (storedValue !== null) {
      setValue(parseInt(storedValue));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("historyTabValue", value);
  }, [value]);

  return (
    <Div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>Back</StyledLink>
          <Typography color="text.primary">Student Profile</Typography>
        </Breadcrumbs>
      </div>
      <Stack gap={3} paddingTop={3}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
            History
          </Typography>{" "}
          <Typography variant="h6" paddingRight={"33px"}>
            Yuhu, Darell Deil
          </Typography>
        </Stack>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item md={8}>
            <Typography
              variant="h6"
              sx={{
                paddingBottom: "28px",
                fontSize: "15px",
                color: "rgba(27, 43, 65, 0.69)",
              }}
            >
              Here is the history page of this supervisor, where you can view
              the history of all activities, pre-registration approvals, and
              certificate approvals conducted by the supervisor.
            </Typography>
          </Grid>
          <Grid item md={3}>
            <SearchLocal />
          </Grid>
        </Grid>
      </Stack>

      <div sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          onChange={(event, newValue) => setValue(newValue)}
        >
          <Tab label="Activity" {...a11yProps(0)} />
          <Tab label="Pre-registration" {...a11yProps(1)} />
          <Tab label="Certificate" {...a11yProps(2)} />
        </Tabs>
      </div>

      <TabPanel value={value} index={0}>
        <div>
          <Typography sx={{ padding: "10px" }}></Typography>
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            justifyContent={"flex-start"}
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 2000,
                bgcolor: "background.paper",
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
            >
              <Box
                sx={{
                  height: "50px",
                  backgroundColor: "rgba(235, 235, 235, 1)",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>
                  Today
                </Typography>
              </Box>

              <ListItem
                size="small"
                button
                component={Link}
                to="activity2"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Activity"}
                      sx={{
                        backgroundColor: "rgba(0, 106, 245, 0.1)",
                        color: "rgba(0, 95, 219, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Form untuk memasukan Pre-Registration Course telah
                        dibuka.
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Tidak ada pertemuan tatap muka. Diharapkan semua untuk
                        mengisi.
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="Feb 7, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />

              <ListItem
                size="small"
                button
                component={Link}
                to="activity1"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Activity"}
                      sx={{
                        backgroundColor: "rgba(0, 106, 245, 0.1)",
                        color: "rgba(0, 95, 219, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Akan Diadakan Pertemuan pada 10 Februari 2024
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Pertemuan dilaksanakan di gedung GK3 lt.2. Diwajibkan
                        memakai sepatu.
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="Feb 7, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                size="small"
                button
                component={Link}
                to="activity"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Activity"}
                      sx={{
                        backgroundColor: "rgba(0, 106, 245, 0.1)",
                        color: "rgba(0, 95, 219, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Pemasukan sertifikat
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Himbauan untuk memasukan sertifikat yang telah didapat
                        dari fakultas
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="Feb 7, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />

              <Box
                sx={{
                  height: "50px",
                  backgroundColor: "rgba(235, 235, 235, 1)",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>
                  Tuesday, Feb 2, 2024
                </Typography>
              </Box>
              <ListItem
                size="small"
                button
                component={Link}
                to="activity3"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Activity"}
                      sx={{
                        backgroundColor: "rgba(0, 106, 245, 0.1)",
                        color: "rgba(0, 95, 219, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Silahkan memasukkan nilai semester anda sebelumnya
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Saat ini sedang masa pemasukkan nilai semester
                        sebelumnya. Harap semuanya dapat mengisi
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="Feb 2, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />
            </List>
          </Stack>
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div>
          <Typography sx={{ padding: "10px" }}></Typography>
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            justifyContent={"flex-start"}
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 2000,
                bgcolor: "background.paper",
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
            >
              <Box
                sx={{
                  height: "50px",
                  backgroundColor: "rgba(235, 235, 235, 1)",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>
                  Yesterday
                </Typography>
              </Box>
              <ListItem
                button
                component={Link}
                to="pre-registration-rejected"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Pre-registration"}
                      sx={{
                        backgroundColor: "rgba(21, 131, 67, 0.1)",
                        color: "rgba(21, 131, 67, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Adzana, Shaliha Gracia
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Preregistrasi semester II tahun ajaran 2023/2024
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="Jan 8, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to="pre-registration-approved"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Pre-registration"}
                      sx={{
                        backgroundColor: "rgba(21, 131, 67, 0.1)",
                        color: "rgba(21, 131, 67, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Peter, Parker Judith
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Preregistrasi semester II tahun ajaran 2023/2024
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="Jan 8, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to="pre-registration-rejected"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Pre-registration"}
                      sx={{
                        backgroundColor: "rgba(21, 131, 67, 0.1)",
                        color: "rgba(21, 131, 67, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Banner, Tony Stark
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Preregistrasi semester II tahun ajaran 2023/2024
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="Jan 8, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to="pre-registration-approved"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Pre-registration"}
                      sx={{
                        backgroundColor: "rgba(21, 131, 67, 0.1)",
                        color: "rgba(21, 131, 67, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Shaliha, Gracia Mandag
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Preregistrasi semester II tahun ajaran 2023/2024
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="Jan 8, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />

              <Box
                sx={{
                  height: "50px",
                  backgroundColor: "rgba(235, 235, 235, 1)",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>
                  Sunday, Jan 6, 2023
                </Typography>
              </Box>
              <ListItem
                button
                component={Link}
                to="pre-registration-rejected"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Pre-registration"}
                      sx={{
                        backgroundColor: "rgba(21, 131, 67, 0.1)",
                        color: "rgba(21, 131, 67, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Adzana, Shaliha Gracia
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Preregistrasi semester I tahun ajaran 2023/2024
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="Aug 6, 2023" />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to="pre-registration-approved"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Pre-registration"}
                      sx={{
                        backgroundColor: "rgba(21, 131, 67, 0.1)",
                        color: "rgba(21, 131, 67, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Banner, Tony Stark
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Preregistrasi semester II tahun ajaran 2023/2024
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="Jan 6, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to="pre-registration-approved"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Pre-registration"}
                      sx={{
                        backgroundColor: "rgba(21, 131, 67, 0.1)",
                        color: "rgba(21, 131, 67, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Banner, Tony Stark
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Preregistrasi semester II tahun ajaran 2023/2024
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="Jan 6, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to="pre-registration-rejected"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Pre-registration"}
                      sx={{
                        backgroundColor: "rgba(21, 131, 67, 0.1)",
                        color: "rgba(21, 131, 67, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Banner, Tony Stark
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Preregistrasi semester II tahun ajaran 2023/2024
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="Jan 6, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />
            </List>
          </Stack>
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <div>
          <Typography sx={{ padding: "10px" }}></Typography>
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            justifyContent={"flex-start"}
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 2000,
                bgcolor: "background.paper",
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
            >
              <Box
                sx={{
                  height: "50px",
                  backgroundColor: "rgba(235, 235, 235, 1)",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>
                  Today
                </Typography>
              </Box>

              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to="certificate-approved"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Certificate"}
                      sx={{
                        backgroundColor: "rgba(255, 204, 0, 0.1)",
                        color: "rgba(152, 82, 17, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Adzana, Shaliha Gracia
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Seminar "Apa itu IT"
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="Feb 7, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />

              <Box
                sx={{
                  height: "50px",
                  backgroundColor: "rgba(235, 235, 235, 1)",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>
                  Tuesday, Feb 2, 2024
                </Typography>
              </Box>
              <ListItem
                button
                component={Link}
                to="certificate-approved"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Certificate"}
                      sx={{
                        backgroundColor: "rgba(255, 204, 0, 0.1)",
                        color: "rgba(152, 82, 17, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Banner, Tony Stark
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Juara 2 saat mengikuti lomba melukis
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="Feb 2, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to="certificate-rejected"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Certificate"}
                      sx={{
                        backgroundColor: "rgba(255, 204, 0, 0.1)",
                        color: "rgba(152, 82, 17, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Adzana, Shaliha Gracia{" "}
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Menang lomba desain prototype
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="Feb 2, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to="certificate-approved"
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Certificate"}
                      sx={{
                        backgroundColor: "rgba(255, 204, 0, 0.1)",
                        color: "rgba(152, 82, 17, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Banner, Tony Stark
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Juara 2 saat mengikuti lomba melukis
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="Feb 2, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />
            </List>
          </Stack>
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>
    </Div>
  );
};

export default History;
