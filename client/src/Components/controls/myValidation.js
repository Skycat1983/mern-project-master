import { SliderValueLabelUnstyled } from "@mui/base";
import React from "react";

export default function validateForm(values) {
  let errors = {};

  if (!values.displayName.trim()) {
    errors.displayName = "username required";
  }

  if (!values.emailAddress) {
    errors.username = "email required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.emailAddress = "email address is invalid";
  }

  if (!values.password) {
    errors.password = "password required";
  } else if (values.password.length < 4) {
    ("password needs to be 4 characters or more");
  }
}
