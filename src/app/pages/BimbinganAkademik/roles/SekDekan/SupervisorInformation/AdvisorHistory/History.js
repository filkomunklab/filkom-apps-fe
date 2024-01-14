import React, { useState, useEffect } from "react";
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
  Breadcrumbs,
  experimentalStyled as styled,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchLocal from "./SearchLocal/SearchLocal";

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
  const var1 = useLocation();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const storedValue = localStorage.getItem("historyTabValue");
    if (storedValue !== null) {
      setValue(parseInt(storedValue));
    }
    console.log("ini data state: ", var1);
  }, []);

  useEffect(() => {
    localStorage.setItem("historyTabValue", value);
  }, [value]);

  const navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>Supervisor Information</StyledLink>
          <Typography color="text.primary">History</Typography>
        </Breadcrumbs>
      </div>
      <Stack gap={2} paddingTop={3}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h1" fontWeight={500}>
            History
          </Typography>
          <Typography variant="h6">Yuhu, Darell Deil</Typography>
        </Stack>
      </Stack>
      <Typography
        sx={{
          paddingTop: "22px",
          paddingBottom: "28px",
          fontSize: "15px",
          fontWeight: 400,
          color: "rgba(27, 43, 65, 0.69)",
          textAlign: "justify",
        }}
      >
        Currently you are in the history page, all the activities you have done
        in terms of activity handling, student pre-registration, student
        certificate approval, student study result card, everything you have
        approved will be displayed on this page.
      </Typography>

      <SearchLocal />
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
          <Tab label="Grade" {...a11yProps(3)} />
          <Tab label="Consultation" {...a11yProps(4)} />
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
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-activity`}
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Tolong kumpulkan kartu hasil study kalian
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Tidak ada pertemuan tatap muka. Diharapkan semua untuk
                        mengisi.
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />

              <ListItem
                size="small"
                button
                component={Link}
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-activity`}
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Akan Diadakan Pertemuan pada 10 Februari 2024
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Pertemuan dilaksanakan di gedung GK3 lt.2. Diwajibkan
                        memakai sepatu.
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "12px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                size="small"
                button
                component={Link}
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-activity`}
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Pemasukan sertifikat
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Himbauan untuk memasukan sertifikat yang telah didapat
                        dari fakultas
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
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
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-activity`}
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Silahkan memasukkan nilai semester anda sebelumnya
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Saat ini sedang masa pemasukkan nilai semester
                        sebelumnya. Harap semuanya dapat mengisi
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
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
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-preregistration`}
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Pre-registrasi Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Preregistrasi semester II tahun ajaran 2023/2024
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
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
                  Sunday, Aug 6, 2023
                </Typography>
              </Box>
              <ListItem
                button
                component={Link}
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-preregistration`}
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Pre-registrasi Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Preregistrasi semester I tahun ajaran 2023/2024
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
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
                  Sunday, Mar 12, 2023
                </Typography>
              </Box>
              <ListItem
                button
                component={Link}
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-preregistration`}
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Pre-registrasi Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Preregistrasi semester II tahun ajaran 2022/2023
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
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
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-certificate`}
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Pengumpulan Sertifikat Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Seminar "Apa itu IT"
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
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
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-certificate`}
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Pengumpulan Sertifikat Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Juara 2 saat mengikuti lomba melukis
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-certificate`}
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Pengumpulan Sertifikat Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Menang lomba desain prototype
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-certificate`}
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Pengumpulan Sertifikat Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Juara 2 saat mengikuti lomba melukis
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />
            </List>
          </Stack>
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>

      <TabPanel value={value} index={3}>
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

              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-grade`}
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Grade"}
                      sx={{
                        backgroundColor: "rgba(101, 10, 204, 0.1)",
                        color: "rgba(101, 10, 204, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Pemasukan Nilai Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Semester 4
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />

              {/* <Box
                sx={{
                  height: "50px",
                  backgroundColor: "rgba(235, 235, 235, 1)",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                <Typography sx={{ color: "rgba(0, 0, 0, 1)" }}>
                  Tuesday, Aug 2, 2023
                </Typography>
              </Box> */}

              <ListItem
                button
                component={Link}
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-grade`}
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Grade"}
                      sx={{
                        backgroundColor: "rgba(101, 10, 204, 0.1)",
                        color: "rgba(101, 10, 204, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Pemasukan Nilai Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Semester 3
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />
            </List>
          </Stack>
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>

      <TabPanel value={value} index={4}>
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
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-consultation`}
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Consultation"}
                      sx={{
                        backgroundColor: "rgba(223, 11, 146, 0.1)",
                        color: "rgba(223, 11, 146, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Academic
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-consultation`}
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Consultation"}
                      sx={{
                        backgroundColor: "rgba(223, 11, 146, 0.1)",
                        color: "rgba(223, 11, 146, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Others
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
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
              <Divider component="li" />

              <ListItem
                button
                component={Link}
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-consultation`}
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Consultation"}
                      sx={{
                        backgroundColor: "rgba(223, 11, 146, 0.1)",
                        color: "rgba(223, 11, 146, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Non-Academic
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-consultation`}
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Consultation"}
                      sx={{
                        backgroundColor: "rgba(223, 11, 146, 0.1)",
                        color: "rgba(223, 11, 146, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Others
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to={`/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/${var1.state}/history-consultation`}
                sx={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <ListItemText
                  primary={
                    <Chip
                      size={"small"}
                      label={"Consultation"}
                      sx={{
                        backgroundColor: "rgba(223, 11, 146, 0.1)",
                        color: "rgba(223, 11, 146, 1)",
                      }}
                    />
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Adzana, Shaliha Gracia
                      </Typography>
                      <Typography
                        sx={{
                          paddingLeft: "8px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Academic
                      </Typography>
                    </>
                  }
                />
                <Box
                  sx={{
                    marginLeft: { xs: "auto", md: 0 },
                    width: { xs: "100%", md: "45%" },
                    textAlign: "right",
                  }}
                >
                  <ListItemText
                    secondary={
                      <Typography
                        sx={{
                          fontSize: { xs: "10px", md: "14px" },
                          color: "rgba(27, 43, 65, 0.69)",
                        }}
                      >
                        02:00 PM
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
              <Divider component="li" />
            </List>
          </Stack>
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>
    </div>
  );
};

export default History;
