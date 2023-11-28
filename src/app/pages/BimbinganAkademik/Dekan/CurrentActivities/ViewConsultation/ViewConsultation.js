import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Stack,
  Grid,
  Button,
  IconButton,
  Paper,
  Breadcrumbs,
  experimentalStyled as styled,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";
import { format } from "date-fns";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
};

const ViewConsultation = () => {
  const navigate = useNavigate();
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");

  // const getConsultation = async()=>{
  //   try{
  //     const headers = {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer token_apa`,
  //       };

  //   const response = await axios.get(`${BASE_URL_API}/bla/bla/bla`,{headers})

  //   const {status, message, code, data} = response.data
  //   if(status === 'OK'){ //isi status atau code tergantung API
  //     //simpan dalam usestate contoh:
  //     //setConsultation = data
  //     //tambahkan handle lain jika perlu
  //   }else{
  //     //tambah handler jika respon lain, kalau tidak perlu hapus saja
  //     console.log(response)
  //   }
  //   }catch(error){
  //     console.log(error)
  //   }
  // }

  // const postMessage = async () =>{
  //   try{
  //     const headers = {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer token_apa`,
  //       };
      
  //     const response = await axios.post(`${BASE_URL_API}/bla/bla/bla`,{message: 'Helo bang'}, {headers})

  //     //jika tidak akan melakukan handle terhadap response maka hapus saja "const response =", jadi sisa await dst...
  //     console.log(response)
  //   }catch(error){
  //     console.log(error)
  //   }
  // }

  

  const handleIconClick = () => {
    handleSubmit();
  };
  const handleClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleSubmitFirstModal = () => {
    setOpenFirstModal(false)
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      setSubmittedValue(inputValue);
      setInputValue("");
    }
  };

  const currentDate = format(new Date(), "dd/MM/yyyy HH:mm");

  return (
    <div>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink>Back</StyledLink>
          <Typography color="text.primary">Consultation</Typography>
        </Breadcrumbs>
      </div>
      <Typography
        sx={{ fontSize: "24px", fontWeight: 500, paddingTop: "20px" }}
      >
        Consultation
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ paddingTop: 3 }}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Student Name</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                Siregar, Marchelino Feraldy
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ paddingTop: 3 }}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Supervisor Name</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                Poluan, Jeremy Kenny, S.Kom, MBA
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Major</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                Informatics
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Arrival Year</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                2020
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Topic of Discussion</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                Academic
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Consultation Receiver</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                Poluan, Jeremy Kenny, S.Kom, MBA
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography>Message</Typography>
            </Grid>

            <Paper elevation={0} variant="outlined" fullWidth>
              <Typography variant="body1" sx={{ p: 2 }}>
                Syalom sir, mohon maaf mengganggu, saya ingin melakukan
                konsultasi terkait perkuliahan saya. Saya mengalami krisis dalam
                hal keuangan. orang tua saya di PHK dan saya rasa saya tidak
                busa melanjutkan perkuliahan saya. Saya ingin membicarakan hal
                ini secara langsung dengan sir, selaku dosen pembimbing saya.
                Apakah sir punya waktu luang? Terima kasih sebelumnya.
              </Typography>
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} sx={{ paddingTop: 8, marginTop: 5 }}>
            <Grid sx={{ display: "flex", direction: "row" }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Status:
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "#0A7637",
                  marginLeft: 1,
                }}
              >
                On-Process
              </Typography>
            </Grid>

            <Paper
              elevation={0}
              variant="outlined"
              fullWidth
              sx={{ borderColor: "#005FDB" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    padding: "8px",
                    fontWeight: 600,
                  }}
                >
                  Poluan, Jeremy Kenny
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    padding: "8px",
                  }}
                >
                  {currentDate}
                </Typography>
              </div>

              <Typography variant="body1" sx={{ padding: "8px" }}>
                Saya sedang tidak berada di daerah kampus. Lagi healing di
                Jerman. Nanti kita atur pertemuan lagi.
              </Typography>
            </Paper>

            <Grid item xs={12}>
              <Stack spacing={2} sx={{ paddingBottom: 3 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                  }}
                >
                  {submittedValue && (
                    <Paper
                      elevation={0}
                      variant="outlined"
                      fullWidth
                      sx={{
                        borderColor: "#192434",
                        padding: "12px",
                        borderRadius: "4px",
                        backgroundColor: "#FFFFFF",
                        color: "#000000",
                      }}
                    >
                      <Typography variant="body1">{submittedValue}</Typography>
                    </Paper>
                  )}

                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Enter Message..."
                    fullWidth
                    multiline
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleIconClick}>
                          <SendIcon style={{ color: "#9E9E9E" }} />
                        </IconButton>
                      ),
                    }}
                    onKeyPress={handleKeyPress}
                  />
                  <Grid container spacing={1} justifyContent="flex-end">
                    <Button
                      onClick={()=>setOpenFirstModal(true)}
                      sx={{
                        backgroundColor: "#006AF5",
                        borderRadius: "5px",
                        boxShadow: 4,
                        color: "white",
                        whiteSpace: "nowrap",
                        "&:hover": {
                          backgroundColor: "#025ED8",
                        },
                      }}
                    >
                      End Conversation
                    </Button>
                    <Modal
                      open={openFirstModal}
                      onClose={()=>setOpenFirstModal(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <div style={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h4"
                          component="h2"
                          sx={{
                            fontWeight: 600,
                          }}
                        >
                          End Session?
                        </Typography>
                        <Typography
                          id="modal-modal-description"
                          style={{ marginTop: "16px", marginBottom: "20px" }}
                        >
                          Are you sure you want to end the Conversation?
                        </Typography>

                        <Grid container spacing={1} justifyContent="flex-end">
                          <Grid item>
                            <Button
                              onClick={()=>setOpenFirstModal(false)}
                              sx={{
                                backgroundColor: "white",
                                borderRadius: "5px",
                                boxShadow: 4,
                                color: "black",
                                whiteSpace: "nowrap",
                                "&:hover": {
                                  backgroundColor: "lightgrey",
                                },
                              }}
                            >
                              Cancel
                            </Button>
                          </Grid>
                          <Grid item>
                            <Link
                              style={{ textDecoration: "none", color: "white" }}
                              to="/bimbingan-akademik/history/consultationComplete"
                            >
                              <Button
                                onClick={handleSubmitFirstModal}
                                sx={{
                                  backgroundColor: "#006AF5",
                                  borderRadius: "5px",
                                  boxShadow: 4,
                                  color: "white",
                                  whiteSpace: "nowrap",
                                  "&:hover": {
                                    backgroundColor: "#025ED8",
                                  },
                                }}
                              >
                                Yes
                              </Button>
                            </Link>
                            .
                          </Grid>
                        </Grid>
                      </div>
                    </Modal>
                  </Grid>
                </div>
              </Stack>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewConsultation;
