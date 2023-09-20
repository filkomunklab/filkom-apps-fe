import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import Div from "@jumbo/shared/Div";
import { ASSET_IMAGES } from "app/utils/constants/paths";
import Logo from "app/shared/Logo";
import { mainTheme } from "app/themes/main/default";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
  },
  leftSide: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
    position: "relative",
  },
  circleContainer: {
    position: "absolute",
    right: "-23%",
    height: "100vh",
    width: "100%",
    borderTopLeftRadius: "100%",
    borderBottomLeftRadius: "100%",
    scale: "130%",
    overflow: "hidden",
    display: "flex",
    boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.75)",
  },
}));

const Login = () => {
  const style = useStyles();

  return (
    <Div className={style.pageContainer}>
      <CssBaseline />
      <Div
        sx={{
          width: "50%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Box
          sx={{ backgroundColor: "white", width: "433px" }}
          display={"flex"}
          flexDirection={"column"}
          gap={"30px"}
        >
          <Logo mini sx={{ height: "104px" }} />
          <Typography
            variant="h1"
            style={{ fontSize: "60px", fontWeight: 700 }}
          >
            Sign In
          </Typography>
          <Grid container direction={"column"} gap={2}>
            <Grid item>
              <TextField variant="outlined" label="Email Address" fullWidth />
            </Grid>
            <Grid item>
              <TextField variant="outlined" label="Password" fullWidth />
            </Grid>
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox />}
                  label={"Remember Me"}
                />
              </Grid>
              <Grid item>
                <Button sx={{ textTransform: "capitalize" }} variant="text">
                  Forgot Password?
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                fullWidth
                sx={{ textTransform: "capitalize", backgroundColor: "#006AF5" }}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item alignSelf={"center"}>
              <Button sx={{ textTransform: "capitalize" }} variant="text">
                Create an account
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Div>
      <Div className={style.leftSide}>
        <Div className={style.circleContainer}>
          <img
            src={`${ASSET_IMAGES}/img-auth-background.png`}
            style={{
              objectFit: "contain",
              objectPosition: "left",
              display: "flex",
              flex: 1,
            }}
          />
        </Div>
      </Div>
    </Div>
  );
};

export default Login;
