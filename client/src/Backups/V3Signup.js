import * as React from "react";
import { useForm, Form } from "../Hooks/useForm.js";
import MyControls from "../Components/controls/MyControls";

import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import SendIcon from "@mui/icons-material/Send";
// import { app } from "../config.js";
import "./views.css";

const initialValues = {
  fullName: "",
  emailAddress: "",
  displayName: "",
  passWord: "",
  repeatPassWord: "",
};

const SignUp = () => {
  console.count("iterating SignUp");
  // const { register, user } = useContext(AuthContext);
  const { values, setValues, handleInputChange } = useForm(initialValues);

  // console.log("validRepeatPassword bool", validRepeatPassword);

  return (
    <>
      <Paper className="Papernator" elevation={3}>
        <Form>
          <Stack direction="column" spacing={2}>
            <Box
              sx={{
                "& .MuiTextField-root": {
                  m: 1,
                  width: "24ch",
                  textAlign: "center",
                },
              }}
              autoComplete="off"
            >
              <Grid container>
                <Grid
                  sx={{
                    textAlign: "center",
                  }}
                  className="FormGrid"
                >
                  <Typography sx={{ fontWeight: "bold", m: 1 }} variant="h6">
                    SIGNUP
                  </Typography>

                  <MyControls.MyInputs
                    name="fullName"
                    label="enter your full name"
                    value={values.fullName}
                    onChange={handleInputChange}
                  />
                  <MyControls.MyInputs //TODO: should be validated
                    variant="outlined"
                    label="enter your email address"
                    name="emailAddress"
                    value={values.emailAddress}
                    onChange={handleInputChange}
                  />

                  <MyControls.MyInputs
                    name="displayName"
                    label="choose a username"
                    value={values.displayName}
                    onChange={handleInputChange}
                  />

                  <MyControls.MyInputs
                    variant="outlined"
                    label="choose a password"
                    name="passWord"
                    value={values.passWord}
                    onChange={handleInputChange}
                    // error={validPassword}
                    helperText="test" //!does not work
                  />
                  <MyControls.MyInputs
                    variant="outlined"
                    label="repeat password"
                    name="repeatPassWord"
                    value={values.repeatPassWord}
                    onChange={handleInputChange}
                  />
                  <FormControlLabel
                    value="start"
                    control={<Checkbox />}
                    label="I agree to the T&C"
                    labelPlacement="start"
                  />
                </Grid>
              </Grid>
            </Box>

            <Button
              sx={{ size: "medium" }}
              // disabled
              variant="contained"
              endIcon={<SendIcon />}
              // onClick={handleRegister}
            >
              Submit
            </Button>

            <Typography
              sx={{
                textAlign: "center",
              }}
              variant="caption"
            >
              Already a member? <Link to={"/login"}>Sign in</Link> instead
            </Typography>
          </Stack>
        </Form>
      </Paper>
    </>
  );
};

export default SignUp;
