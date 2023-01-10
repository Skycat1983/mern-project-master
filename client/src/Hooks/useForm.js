import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
// import validationForm from "../Components/myValidation.js";
// import Paper from "@mui/material/Paper";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({
    email: null,
    username: null,
    pword: null,
  });
  const [formErrors, setFormErrors] = useState({ email: null, pword: null });
  const navigate = useNavigate();
  const location = useLocation();
  const { backEndError, signIn, register } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.values);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setFormErrors(validateFrontEnd(values));
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      setErrors({ email: null, pword: null });
      if (location.pathname === "/login") {
        signIn(values, navigate, location);
      } else if (location.pathname === "/signup") {
        register(values, navigate, location);
      }
    } else {
      setErrors(formErrors);
    }
    return () => {
      // console.log();
    };
  }, [formErrors]);

  useEffect(() => {
    setErrors(validateBackEnd());
  }, [backEndError]);

  const validateFrontEnd = (values) => {
    let errors = {};

    if (!values.emailAddress) {
      errors.email = "email required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.emailAddress)
    ) {
      errors.email = "email address is invalid";
    }
    if (location.pathname === "/signup" && !values.displayName.trim()) {
      errors.username = "username required";
    } else if (
      location.pathname === "/signup" &&
      values.displayName.length < 4
    ) {
      errors.username = "username too short";
    }

    if (!values.password) {
      errors.pword = "password required";
    } else if (values.password.length < 4) {
      errors.pword = "password too short";
    }
    return errors;
  };

  const validateBackEnd = () => {
    let errors = {};
    if (backEndError?.email) {
      errors.email = "email address not found";
    }
    if (backEndError?.pword) {
      errors.pword = "incorrect password";
    }
    return errors;
  };

  //! what is this?
  // <pre>{JSON.stringify(formValues, undefined, 2)}</pre>;

  return {
    values,
    setValues,
    handleInputChange,
    handleSubmit,
    formErrors,
    errors,
    setFormErrors,
    validateFrontEnd,
  };
}

export function Form(props) {
  return (
    <form
      style={{
        variant: "standard",
        // margin: "normal",
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

export function XLForm(props) {
  return (
    <form
      style={{
        marginLeft: "20px",
        marginTop: "5px",
        variant: "standard",
        width: "200px",
        alignItems: "center",
        borderRadius: "12px 12px 12px 12px",
        multiline: true,
        backgroundColor: "white",
        opacity: "80%",
        color: "black", //! only applies to basic/premium options
      }}
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

// /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export function ReviewForm(props) {
  return (
    <form
      style={{
        marginTop: "-0px",
        marginLeft: "0px",
        alignItems: "center",
        borderRadius: "12px 12px 12px 12px",

        marginBottom: "10px",
        width: "328px",
        backgroundColor: "white",
        opacity: "100%",
        color: "green", //! only applies to basic/premium options
        // padding: "25px",
      }}
    >
      {props.children}
    </form>
  );
}

export function Search(props) {
  return (
    <form
      style={{
        position: "absolute",
        width: "6rem",
        height: "2.39rem",
        top: "0.7rem",
        marginLeft: "30%",
        borderRadius: "6px",
        backgroundColor: "white",
        opacity: "100%",
        color: "green", //! only applies to basic/premium options
        paddingLeft: "2.5rem",
        paddingRight: "2rem",
        alignItems: "center",
        justifyContent: "center",
        margin: "normal",
        placeholder: "Plants...",
      }}
    >
      {props.children}
    </form>
  );
}
