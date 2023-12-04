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
  Grid,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";
import SearchLocal from "./SearchLocal/SearchLocal";
import SearchGlobal from "app/shared/SearchGlobal";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";

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

  // const getHistory = async() =>{
  //   try{
  //     const headers = {
  //       'Content-Type': 'multipart/form-data',
  //       Authorization: `Bearer token_apa`,
  //     }

  //     let response

  //     if('pilih tab activity'){
  //       response = await axios.get(`${BASE_URL_API}/bla/bla/bla`,{headers})
  //     }else if('pilih tab pre-registration'){
  //       response = await axios.get(`${BASE_URL_API}/bla/bla/bla`,{headers})
  //     }else if('pilih tab certification'){
  //       response = await axios.get(`${BASE_URL_API}/bla/bla/bla`,{headers})
  //     }else if('pilih tab grade'){
  //       response = await axios.get(`${BASE_URL_API}/bla/bla/bla`,{headers})
  //     }else if('pilih tab consultation'){
  //       response = await axios.get(`${BASE_URL_API}/bla/bla/bla`,{headers})
  //     }

  //     const {status, message, code, data}= response.data

  //     if(status === 'OK'){ //isi status atau code tergantung API
  //       //simpan dalam usestate contoh:
  //       //setHistoryData = data
  //       //tambahkan handle lain jika perlu
  //     }else{
  //       //tambah handler jika respon lain, kalau tidak perlu hapus saja
  //       console.log(response)
  //     }

  //   }catch(error){
  //     console.log(error)
  //   }
  // }

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
    <div>
      <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
        History
      </Typography>
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

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ paddingBottom: 4 }}>
          <SearchGlobal
            sx={{
              width: "40%",
              "@media (max-width: 600px)": {
                height: "40px",
                width: "100%",
              },
            }}
          />
        </Grid>
      </Grid>

      <div sx={{ borderBottom: 1, borderColor: "divider", paddingTop: "16px" }}>
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
          <Tab label="Consultation" {...a11yProps(3)} />
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Form untuk memasukan Pre-Registration Course telah
                        dibuka.
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Silakan memasukkan nilai semester anda sebelumnya
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Peter, Parker Judith
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Banner, Tony Stark
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Shaliha, Gracia Mandag
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Banner, Tony Stark
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Banner, Tony Stark
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Banner, Tony Stark
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Banner, Tony Stark
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
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        Banner, Tony Stark
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
                  Today
                </Typography>
              </Box>

              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to="consultation"
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
                        Banner, Tony Stark
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
                button
                component={Link}
                to="consultation"
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
                to="consultation"
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
                        Banner, Tony Stark
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
                button
                component={Link}
                to="consultation"
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
                button
                component={Link}
                to="consultation"
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
                        Banner, Tony Stark
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
            </List>
          </Stack>
          <Typography sx={{ padding: "20px" }}></Typography>
        </div>
      </TabPanel>
    </div>
  );
};

export default History;
