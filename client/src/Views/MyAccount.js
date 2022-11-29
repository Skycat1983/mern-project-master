import React from "react";
import { useEffect, useState } from "react";
import { useForm, Form } from "../Components/useForm";
import MyControls from "../Components/controls/MyControls";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, FormLabel, RadioGroup } from "@mui/material";

const initialValues = {
  genus: "",
  varigation: "",
  rooted: "",
  topCutting: "",
  price: "",
};

const MyAccount = () => {
  const { values, setValues, handleInputChange } = useState(initialValues);
  const [user, setUser] = useState(true);

  return (
    <>
      <div>MyAccount</div>
      <h1>welcome</h1>
      <MyControls.MyInputs
        label="genus"
        name="genus"
        value={values.genus}
        onChange={handleInputChange}
      />
      <MyControls.MyInputs
        label="varigation"
        name="varigation"
        value={values.varigation}
        onChange={handleInputChange}
      />
      <MyControls.MyInputs
        label="rooted"
        name="rooted"
        value={values.rooted}
        onChange={handleInputChange}
      />
      <MyControls.MyInputs
        label="top cutting"
        name="topCutting"
        value={values.topCutting}
        onChange={handleInputChange}
      />
      <MyControls.MyInputs
        label="price"
        name="price"
        value={values.price}
        onChange={handleInputChange}
      />
    </>
  );
};

export default MyAccount;
