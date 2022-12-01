import { useForm, Form } from "../Components/useForm";
import MyControls from "../Components/controls/MyControls";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import Radio from "@mui/material/Radio";
import background from "../assets/backgrounds/photos/darkleaves.jpg";
import "./views.css";

import MyInputs from "../Components/controls/MyInputs";
import MyRadioGroup from "../Components/controls/MyRadioGroup";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
// import Modal from "@mui/material/Modal";
// import Paper from "@mui/material/Paper";
// import Checkbox from "@mui/material/Checkbox";
// import SendIcon from "@mui/icons-material/Send";
// import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const initialValues = {
  emailAddress: "",
  displayName: "",
  // mobile: "",
  // dateOfBirth: "",
  membership: "",
  password: "",
  // repeatPassord: "",
};

const Signup = () => {
  const { values, setValues, handleInputChange } = useForm(initialValues);

  const register = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", values.emailAddress);
    urlencoded.append("username", values.displayName);
    urlencoded.append("password", values.password);
    urlencoded.append("premium", values.membership);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:5001/api/users/create", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  console.log(values);
  return (
    <>
      <img src={background} className="background-image2" alt="" />
      <Form>
        <Grid>
          <MyControls.MyInputs
            label="email address"
            name="emailAddress"
            value={values.emailAddress}
            onChange={handleInputChange}
          />

          <MyControls.MyInputs
            variant="outlined"
            label="display name"
            name="displayName"
            value={values.displayName}
            onChange={handleInputChange}
          />
        </Grid>
        <MyControls.MyInputs
          label="password"
          name="password"
          value={values.password}
          onChange={handleInputChange}
        />
        <FormControl>
          <FormLabel>Membership</FormLabel>
          <RadioGroup
            row={true}
            name="membership"
            value={values.membership}
            onChange={handleInputChange}
          >
            <FormControlLabel value="false" control={<Radio />} label="Basic" />
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Premium"
            />
          </RadioGroup>
        </FormControl>
      </Form>
      <Button variant="contained" component="label" onClick={register}>
        SUBMIT
      </Button>
    </>
  );
};
export default Signup;
