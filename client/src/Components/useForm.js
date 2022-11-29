import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";

// import "../views/views.css";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value, // updating respective value property that triggers onChange event. //! for example: fullName, or emailAddress.
    });
  };

  return {
    values,
    setValues,
    handleInputChange,
  };
}

export function Form(props) {
  return (
    <form
      style={{
        marginTop: "85px",
        marginLeft: "85px",
        alignItems: "center",
        marginBottom: "10px",
        width: "200px",
      }}
    >
      {props.children}
    </form>
  );
}
