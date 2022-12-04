import { useForm, Form } from "../Hooks/useForm";
import MyControls from "../Components/controls/MyControls";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import Radio from "@mui/material/Radio";
import background from "../assets/backgrounds/photos/darkleaves.jpg";
import defaultAvatar from "../assets/temp/defaultavatar.png";

import "./views.css";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import MyInputs from "../Components/controls/MyInputs";
import MyRadioGroup from "../Components/controls/MyRadioGroup";

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

// TODO: can this be imported once, instead of both at LOGIN and SIGNUP?
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
    urlencoded.append(
      "avatar",
      "https://res.cloudinary.com/dzncmfirr/image/upload/v1669997773/app-images/DALL_E_2022-12-02_09.23.21_-_hyperrealistic_3D_render_of_a_monstera_leaf_encased_in_a_glass_marble_chn1wg.png"
    );

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
      <div className="container">
        <Form>
          <Stack>
            <Item>
              <MyControls.MyInputs
                label="email address"
                id="standard-basic"
                variant="standard"
                name="emailAddress"
                value={values.emailAddress}
                onChange={handleInputChange}
                sx={{ input: { color: "red" } }}
              />
            </Item>
            <Item>
              <MyControls.MyInputs
                variant="outlined"
                label="display name"
                name="displayName"
                value={values.displayName}
                onChange={handleInputChange}
              />
            </Item>
            <Item>
              <MyControls.MyInputs
                label="password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
              />
            </Item>
            <Item>
              <FormControl>
                <FormLabel>Membership</FormLabel>
                <RadioGroup
                  row={true}
                  name="membership"
                  value={values.membership}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Basic"
                  />
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Premium"
                  />
                </RadioGroup>
              </FormControl>
            </Item>
            {/* <Item> */}
            <Button
              variant="contained"
              color="success"
              component="label"
              onClick={register}
            >
              SUBMIT
            </Button>
            {/* </Item> */}
          </Stack>
        </Form>
      </div>
    </>
  );
};
export default Signup;
