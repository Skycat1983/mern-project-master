import { useForm, Form } from "../Components/useForm";
import MyControls from "../Components/controls/MyControls";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import Radio from "@mui/material/Radio";
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

const initialValues = {
  emailAddress: "",
  displayName: "",
  mobile: "",
  dateOfBirth: "",
  membership: "premium",
  password: "",
  repeatPassord: "",
};

const Signup = () => {
  const { values, setValues, handleInputChange } = useState(initialValues);
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
            <FormControlLabel value="basic" control={<Radio />} label="Basic" />
            <FormControlLabel
              value="premium"
              control={<Radio />}
              label="Premium"
            />
          </RadioGroup>
        </FormControl>
      </Form>
    </>
  );
};
export default Signup;
