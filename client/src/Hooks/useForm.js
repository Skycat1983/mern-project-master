import * as React from "react";
import { useState, useEffect } from "react";
// import Paper from "@mui/material/Paper";

// import "../views/views.css";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [formValues, setFormValues] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.values);
    setValues({
      ...values,
      [name]: value, // updating respective value property that triggers onChange event. //! for example: fullName, or emailAddress.
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!values.displayName) {
      errors.displayName = "username required";
    }
    if (!values.email) {
      errors.email = "username required";
    }
    if (!values.password) {
      errors.password = "password required";
    }
    return errors;
  };

  return {
    values,
    setValues,
    handleInputChange,
    handleSubmit,
  };
}

export function Form(props) {
  return (
    <form
      style={{
        variant: "standard",
        id: "standard-basic",
        marginTop: "40px",
        marginLeft: "60px",
        alignItems: "center",
        borderRadius: "12px",
        marginBottom: "10px",
        width: "190px",
        input: { color: "red" },
        backgroundColor: "white",
        opacity: "80%",
        color: "green", //! only applies to basic/premium options
        padding: "30px",
      }}
    >
      {props.children}
    </form>
  );
}

export function SignupForm(props) {
  return (
    <form
      style={{
        variant: "standard",
        id: "standard-basic",
        marginTop: "150px",
        marginLeft: "60px",
        alignItems: "center",
        borderRadius: "12px",
        marginBottom: "10px",
        width: "190px",
        input: { color: "red" },
        backgroundColor: "white",
        opacity: "80%",
        color: "green", //! only applies to basic/premium options
        padding: "30px",
      }}
    >
      {props.children}
    </form>
  );
}

// export function Form(props) {
//   return (
//     <form
//       style={{
//         marginTop: "150px",
//         marginLeft: "60px",
//         alignItems: "center",
//         borderRadius: "12px 12px 12px 12px",

//         marginBottom: "10px",
//         width: "190px",
//         backgroundColor: "white",
//         opacity: "80%",
//         color: "green", //! only applies to basic/premium options
//         padding: "30px",
//       }}
//     >
//       {props.children}
//     </form>
//   );
// }

export function XLForm(props) {
  return (
    <form
      style={{
        marginLeft: "20px",
        marginTop: "5px",
        variant: "standard",
        width: "200px",

        // width: "100vw",
        // position: "fixed",
        // top: "200px",
        // left: "20px",
        alignItems: "center",
        // paddingTop: "300px",
        borderRadius: "12px 12px 12px 12px",
        multiline: true,
        // marginBottom: "10px",
        backgroundColor: "white",
        opacity: "80%",
        color: "black", //! only applies to basic/premium options
        // padding: "30px",
        // rowGap: "20px",
        // margin: "dense",
        // color: "success",
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
export function PlantForm(props) {
  return (
    <form
      style={{
        marginTop: "60px",
        marginLeft: "60px",
        alignItems: "center",
        borderRadius: "12px 12px 12px 12px",

        marginBottom: "10px",
        width: "190px",
        backgroundColor: "white",
        opacity: "80%",
        color: "green", //! only applies to basic/premium options
        padding: "30px",
      }}
    >
      {props.children}
    </form>
  );
}
