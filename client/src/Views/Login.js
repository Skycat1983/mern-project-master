import { useForm, Form } from "../Components/useForm";
import MyControls from "../Components/controls/MyControls";

import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import Radio from "@mui/material/Radio";
import MyInputs from "../Components/controls/MyInputs";
import MyRadioGroup from "../Components/controls/MyRadioGroup";

import { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const initialValues = {
  emailAddress: "",
  password: "",
};

const Login = () => {
  const { values, setValues, handleInputChange } = useForm(initialValues);
  const [userLogin, setUserLogin] = useState({});

  const signIn = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", values.emailAddress);
    urlencoded.append("password", values.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:5001/api/users/login", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  console.log(values);
  return (
    <>
      <Form>
        <Grid>
          <MyControls.MyInputs
            label="email address"
            name="emailAddress"
            value={values.emailAddress}
            onChange={handleInputChange}
          />
        </Grid>
        <MyControls.MyInputs
          label="password"
          name="password"
          value={values.password}
          onChange={handleInputChange}
        />
      </Form>
      <Button variant="contained" component="label" onClick={signIn}>
        LOGIN
      </Button>
    </>
  );
};
export default Login;
