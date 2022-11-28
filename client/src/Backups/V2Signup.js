import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Controls from "../Components/controls/Controls";
import { useForm, Form } from "../Components/useForm.js";
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
import "./Views.css";

const initialValues = {
  emailAddress: "",
  displayName: "",
  passWord: "",
  repeatPassWord: "",
};

const SignUp = () => {
  const {
    values,
    setValues,
    validRepeatPassword,
    passwordError,
    repeatPasswordError,
    handleInputChange,
  } = useForm(initialValues);

  const handleRegister = () => {
    if (agreedTerms && validRepeatPassword == true) {
      console.log("registering");
      register(values.emailAddress, values.displayName, values.repeatPassWord);
    } else {
      setOpen(true);
    }
  };

  const handleTermsChange = () => {
    if (agreedTerms) {
      return setAgreedTerms(false);
    } else setAgreedTerms(true);
    setTermsError(""); //TODO: send values to useForm and write errors
  };

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

                  <Controls.FormInputs
                    name="fullName"
                    label="enter your full name"
                    value={values.fullName}
                    onChange={handleInputChange}
                  />
                  <Controls.FormInputs //TODO: should be validated
                    variant="outlined"
                    label="enter your email address"
                    name="emailAddress"
                    value={values.emailAddress}
                    onChange={handleInputChange}
                  />

                  <Controls.FormInputs
                    name="displayName"
                    label="choose a username"
                    value={values.displayName}
                    onChange={handleInputChange}
                  />

                  <Controls.FormInputs
                    variant="outlined"
                    label="choose a password"
                    name="passWord"
                    value={values.passWord}
                    onChange={handleInputChange}
                    // error={validPassword}
                    helperText="test" //!does not work
                  />
                  <Controls.FormInputs
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
                    onChange={handleTermsChange}
                  />
                </Grid>
              </Grid>
            </Box>
            <Modal
              open={open}
              onClose={handleModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="SignupErrorsBox">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Cannot submit with errors:
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {passwordError}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {repeatPasswordError}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {termsError}
                </Typography>
              </Box>
            </Modal>

            <Button
              sx={{ size: "medium" }}
              // disabled
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleRegister}
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

//! custom button component to alternate which one is shown
//https://www.npmjs.com/package/material-ui-password-field

// {
//   fetchData && <MyCard filterGames={filterGames()} />;
// }


import * as React from "react";
import { useContext, useEffect, useState } from "react";
// import Controls from "../Components/controls/Controls";
import { useForm, Form } from "../Hooks/useForm.js";
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
import "./views.css";

const initialValues = {
  emailAddress: "",
  displayName: "",
  passWord: "",
};

const SignUp = () => {
  const { values, setValues, handleInputChange } = useForm(initialValues);

  return (
    <>
      <Paper className="Papernator" elevation={3}>
        <Form>
          <Stack direction="column" spacing={2}>
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

//! custom button component to alternate which one is shown
//https://www.npmjs.com/package/material-ui-password-field

// {
//   fetchData && <MyCard filterGames={filterGames()} />;
// }

// <Box
//   sx={{
//     "& .MuiTextField-root": {
//       m: 1,
//       width: "24ch",
//       textAlign: "center",
//     },
//   }}
//   autoComplete="off"
// >
//   <Grid container>
//     <Grid
//       sx={{
//         textAlign: "center",
//       }}
//       className="FormGrid"
//     >
//       <Typography sx={{ fontWeight: "bold", m: 1 }} variant="h6">
//         SIGNUP
//       </Typography>

//       <Controls.FormInputs
//         name="fullName"
//         label="enter your full name"
//         value={values.fullName}
//         onChange={handleInputChange}
//       />
//       <Controls.FormInputs //TODO: should be validated
//         variant="outlined"
//         label="enter your email address"
//         name="emailAddress"
//         value={values.emailAddress}
//         onChange={handleInputChange}
//       />

//       <Controls.FormInputs
//         name="displayName"
//         label="choose a username"
//         value={values.displayName}
//         onChange={handleInputChange}
//       />

//       <Controls.FormInputs
//         variant="outlined"
//         label="choose a password"
//         name="passWord"
//         value={values.passWord}
//         onChange={handleInputChange}
//         helperText="test" //!does not work
//       />
//       <Controls.FormInputs
//         variant="outlined"
//         label="repeat password"
//         name="repeatPassWord"
//         value={values.repeatPassWord}
//         onChange={handleInputChange}
//       />
//       <FormControlLabel
//         value="start"
//         control={<Checkbox />}
//         label="I agree to the T&C"
//         labelPlacement="start"
//         onChange={handleTermsChange}
//       />
//     </Grid>
//   </Grid>
// </Box>;


import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useForm, Form } from "../Hooks/useForm.js";
import { Link, Navigate } from "react-router-dom";

import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import SendIcon from "@mui/icons-material/Send";
import "./views.css";

const initialValues = {
  emailAddress: "",
  displayName: "",
  passWord: "",
};

const SignUp = () => {
  const { values, setValues, handleInputChange } = useForm(initialValues);

  return (
    <>
      <Paper className="Papernator" elevation={3}>
        <Form>
          <Stack direction="column" spacing={2}>
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

//! custom button component to alternate which one is shown
//https://www.npmjs.com/package/material-ui-password-field

// {
//   fetchData && <MyCard filterGames={filterGames()} />;
// }

// <Box
//   sx={{
//     "& .MuiTextField-root": {
//       m: 1,
//       width: "24ch",
//       textAlign: "center",
//     },
//   }}
//   autoComplete="off"
// >
//   <Grid container>
//     <Grid
//       sx={{
//         textAlign: "center",
//       }}
//       className="FormGrid"
//     >
//       <Typography sx={{ fontWeight: "bold", m: 1 }} variant="h6">
//         SIGNUP
//       </Typography>

//       <Controls.FormInputs
//         name="fullName"
//         label="enter your full name"
//         value={values.fullName}
//         onChange={handleInputChange}
//       />
//       <Controls.FormInputs //TODO: should be validated
//         variant="outlined"
//         label="enter your email address"
//         name="emailAddress"
//         value={values.emailAddress}
//         onChange={handleInputChange}
//       />

//       <Controls.FormInputs
//         name="displayName"
//         label="choose a username"
//         value={values.displayName}
//         onChange={handleInputChange}
//       />

//       <Controls.FormInputs
//         variant="outlined"
//         label="choose a password"
//         name="passWord"
//         value={values.passWord}
//         onChange={handleInputChange}
//         helperText="test" //!does not work
//       />
//       <Controls.FormInputs
//         variant="outlined"
//         label="repeat password"
//         name="repeatPassWord"
//         value={values.repeatPassWord}
//         onChange={handleInputChange}
//       />
//       <FormControlLabel
//         value="start"
//         control={<Checkbox />}
//         label="I agree to the T&C"
//         labelPlacement="start"
//         onChange={handleTermsChange}
//       />
//     </Grid>
//   </Grid>
// </Box>;
