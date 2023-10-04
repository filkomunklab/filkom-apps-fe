import React from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Divider,
  Avatar,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";

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
        }}
      >
        Currently you are in the history page, all the activities you have done
        in terms of activity handling, student pre-registration, student
        certificate approval, student study result card, everything you have
        approved will be displayed on this page.
      </Typography>
      <div sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
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
                button
                component={Link}
                to="/bimbingan-akademik/grades/studentgrade/"
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
                        Tolong kumpulkan kartu hasil study kalian
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
                button
                component={Link}
                to="/bimbingan-akademik/grades/studentgrade/"
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
                button
                component={Link}
                to="/bimbingan-akademik/grades/studentgrade/"
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
                        Tolong kumpulkan kartu hasil study kalian
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
                to="/bimbingan-akademik/grades/studentgrade/"
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
                to="/bimbingan-akademik/grades/studentgrade/"
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
                        Pre-registrasi Awuy, Diany Mariska
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
                to="/bimbingan-akademik/grades/studentgrade/"
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
                        Pre-registrasi Shania, Gracia
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
                  Sunday, Jan 6, 2024
                </Typography>
              </Box>
              <ListItem
                button
                component={Link}
                to="/bimbingan-akademik/grades/studentgrade/"
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
                        Pre-registrasi Adzana, Shaliha Alifyaa
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
                to="/bimbingan-akademik/grades/studentgrade/"
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
                        Pre-registrasi Reva, Fidela
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
                to="/bimbingan-akademik/grades/studentgrade/"
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
                        Pre-registrasi Jastinan, Prunogoho Wali
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
                to="/bimbingan-akademik/grades/studentgrade/"
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
                        Pengumpulan Sertifikat Adzana, Shaliha Alifyaa
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
                to="/bimbingan-akademik/grades/studentgrade/"
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
                        Pengumpulan Sertifikat Dennius, Gabriela{" "}
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
                to="/bimbingan-akademik/grades/studentgrade/"
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
                        Pengumpulan Sertifikat Luntungan, Hendra Jerico{" "}
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
                to="/bimbingan-akademik/grades/studentgrade/"
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
                        Pengumpulan Sertifikat Badrul, Sinambela Febriola{" "}
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
                to="/bimbingan-akademik/grades/studentgrade/"
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
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Pemasukan Nilai Adzana, Shaliha Alifyaa
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Semester 4
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
                button
                component={Link}
                to="/bimbingan-akademik/grades/studentgrade/"
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
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Pemasukan Nilai Dennius, Gabriela{" "}
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Semester 4
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
                button
                component={Link}
                to="/bimbingan-akademik/grades/studentgrade/"
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
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Pemasukan Nilai Luntungan, Hendra Jerico{" "}
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Semester 4
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
                to="/bimbingan-akademik/grades/studentgrade/"
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
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Pemasukan Nilai Badrul, Sinambela Febriola{" "}
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Semester 4
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
                to="/bimbingan-akademik/grades/studentgrade/"
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
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Adzana, Shaliha Alifyaa
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Non-Academic
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="May 29, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to="/bimbingan-akademik/grades/studentgrade/"
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
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Dennius, Gabriela{" "}
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Academic
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="May 29, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to="/bimbingan-akademik/grades/studentgrade/"
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
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Luntungan, Hendra Jerico{" "}
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Others
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="May 29, 2024" />
                </Box>
              </ListItem>
              <Divider component="li" />
              <ListItem
                button
                component={Link}
                to="/bimbingan-akademik/grades/studentgrade/"
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
                      {" "}
                      <Typography
                        sx={{
                          color: "rgba(0, 0, 0, 1)",
                          paddingLeft: "8px",
                          paddingTop: "5px",
                        }}
                      >
                        Badrul, Sinambela Febriola{" "}
                      </Typography>{" "}
                      <Typography sx={{ paddingLeft: "8px" }}>
                        Academic
                      </Typography>{" "}
                    </>
                  }
                />
                <Box sx={{ marginLeft: "auto" }}>
                  <ListItemText secondary="May 29, 2024" />
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
