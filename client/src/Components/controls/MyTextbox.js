import React from "react";
import { TextField } from "@mui/material";

export default function MyTextbox(props) {
  const { name, label, value, onChange } = props;

  return (
    <TextField
      id="outlined-multiline-flexible"
      label={label}
      color="success"
      name={name}
      value={value}
      onChange={onChange}
      multiline={true}
      maxRows={8}
      sx={{
        m: 4,
        width: "28ch",
        // height: "26ch"
      }}
      // value={value}
      // onChange={handleChange}
    />
  );
}

// multiline
// maxRows={4}
// sx={{ m: 4, width: "26ch" }}
// value={value}
// onChange={handleChange}
