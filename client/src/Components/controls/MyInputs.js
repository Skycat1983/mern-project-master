import React from "react";
import { TextField } from "@mui/material";

export default function MyInputs(props) {
  const { name, label, value, onChange } = props;

  return (
    <TextField
      variant="standard"
      color="success"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}
