import { useForm, Form } from "../Components/useForm";
import MyControls from "../Components/controls/MyControls";
import useFetch from "../Hooks/useFetch";

import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import Radio from "@mui/material/Radio";
import MyInputs from "../Components/controls/MyInputs";
import MyRadioGroup from "../Components/controls/MyRadioGroup";

import { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import "./views.css";
// import background from "../assets/backgrounds/photos/monstera.jpg";
import background from "../assets/backgrounds/photos/houseplants3.jpg";
// import background from "../assets/backgrounds/photos/melano.jpg";
// import background from "../assets/backgrounds/photos/houseplants1.jpg";
// import background from "../assets/backgrounds/photos/darkleaves.jpg";
// import background from "../assets/backgrounds/photos/cosyhouseplants.jpg";
// import background from "../assets/backgrounds/photos/shopfront.jpg";

// import background from "../assets/backgrounds/photos/closeupleaves.jpg";
// import background from "../assets/backgrounds/photos/bushfromabove.jpg";
// import background from "../assets/backgrounds/photos/monstera2.jpg";

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
      <div className="frosted-div">
        <img src={background} className="background-image2" alt="" />
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
      </div>
    </>
  );
};
export default Login;
