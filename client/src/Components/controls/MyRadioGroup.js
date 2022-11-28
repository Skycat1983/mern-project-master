import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import React from "react";

export default function MyRadioGroup(props) {
  const { name, label, value, onChange, items } = props;
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange}>
        {items.map((item, i) => (
          <FormControlLabel
            value={item.id}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
