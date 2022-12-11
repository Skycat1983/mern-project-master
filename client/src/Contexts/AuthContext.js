import { useState, createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../Hooks/useForm.js";
import getToken from "../utils/getToken.js";
import * as React from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isUser, setIsUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState({});
  const [backEndError, setBackEndError] = useState({});
  const [modalText, setModalText] = useState("");
  const [isModal, setIsModal] = React.useState(false);
  // const { setFormErrors } = useForm();

  useEffect(() => {
    const token = getToken();
    console.log("token>>", token);
    // if (!token) {
    //   setError("session expired");
    // }
  }, [backEndError]);

  // useEffect(() => {
  //   const token = getToken();
  //   console.log("token>>", token);

  //   return () => {
  //     second
  //   }
  // }, [error])

  const register = (values, navigate, location) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", values.emailAddress);
    urlencoded.append("username", values.displayName);
    urlencoded.append("password", values.password);
    urlencoded.append("premium", false);
    urlencoded.append(
      "avatar",
      "https://res.cloudinary.com/dzncmfirr/image/upload/v1669997773/app-images/DALL_E_2022-12-02_09.23.21_-_hyperrealistic_3D_render_of_a_monstera_leaf_encased_in_a_glass_marble_chn1wg.png"
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:5001/api/users/create", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    setModalText("Successfuly signed up. Redirecting to login");
    setIsModal(true);
    navigate("/login", { replace: true });
  };

  const signIn = async (values, navigate, location) => {
    let errors = {};

    console.log(values);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", values.emailAddress);
    urlencoded.append("password", values.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/users/login",
        requestOptions
      );
      const result = await response.json();
      console.log("result :>> ", result);
      // console.log("result.message :>> ", result.message);
      if (result.errorMessage == "email address not found") {
        // setBackEndError(false);

        errors.email = "email address not found";
        errors.pword = false;
        setBackEndError(errors);
        // console.log("EMAIL ERRORS", errors.email);
      } else if (result.errorMessage == "incorrect password") {
        // setBackEndError(false);

        errors.email = false;
        errors.pword = "incorrect password";
        console.log("ERRORS>>>>>", errors);

        setBackEndError(errors);
      }

      // if (errors.length !== 0) {
      //   setError(errors);
      //   console.warn(errors);
      // }

      const { token } = result;

      if (token) {
        localStorage.setItem("token", token);
        //! swap around if problems
        if (location.state?.from) {
          setModalText("Successfuly logged in. Redirecting to home");
          setIsModal(true);
          navigate(location.state.from, { replace: true });
        } else {
          setModalText("Successfuly logged in. Redirecting to home");
          setIsModal(true);
          navigate("/", { replace: true });
        }
        setModalText("Successfuly logged in. Redirecting to home");
        setIsModal(true);
        isLoading(false);
        isUser(true);
      }
    } catch (error) {
      console.log("error", error);
      setBackEndError(error);
    }
  };

  const getProfile = async () => {
    const token = getToken();
    console.log("token :>>", token);
    if (token) {
      setBackEndError(null);
    }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:5001/api/users/profile",
        requestOptions
      );
      const result = await response.json();
      console.log("result :>> accessible via userLoggedIn", result);
      setUserLoggedIn(result);
      setIsUser(true);
    } catch (error) {
      console.log("error getting profile", error);
    }
  };

  //LOGOUT
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");

    setModalText("successfully logged out");
    setIsModal(true);
    setUserLoggedIn(false);
    setIsUser(null);
    console.log("user logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        isUser,
        isLoading,
        userLoggedIn,
        backEndError,
        setBackEndError,
        isModal,
        setIsModal,
        modalText,
        getProfile,
        logout,
        signIn,
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
