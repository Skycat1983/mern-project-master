import React from "react";
import { TextField } from "@mui/material";

export function MyInputs(props) {
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

export function MyErrors(props) {
  const { name, label, value, onChange, helperText } = props;

  return (
    <TextField
      error
      helperText={helperText}
      variant="standard"
      color="success"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

export function MySearch(props) {
  const { name, value, onChange } = props;

  return (
    <TextField
      variant="standard"
      border="none"
      color="success"
      name={name}
      value={value}
      onChange={onChange}
      alignItems="center"
      placeholder="Filter..."
    />
  );
}
