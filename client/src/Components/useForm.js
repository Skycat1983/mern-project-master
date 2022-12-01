import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";

// import "../views/views.css";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.values);
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
        borderRadius: "12px 12px 12px 12px",

        marginBottom: "10px",
        width: "190px",
        backgroundColor: "white",
        opacity: "80%",
      }}
      // sx={{
      //   bgcolor: "background.paper",
      //   width: "53%",
      //   // width: "10vm",
      //   // borderRadius: "12px 12px 0px 0px",
      //   borderBottom: 1,
      //   borderColor: "divider",
      // }}
    >
      {props.children}
    </form>
  );
}
