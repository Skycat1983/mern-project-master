import { useState, createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../Hooks/useForm.js";
import getToken from "../utils/getToken.js";
import * as React from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([{}]);
  const [isUser, setIsUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState({});
  const [backEndError, setBackEndError] = useState({});
  const [urls, setUrls] = useState([]);

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

  useEffect(() => {
    //? confused why this returns empty?
    console.log("URLS", urls);
    setIsLoading(false);
  }, [urls]);

  const register = async (values, navigate, location) => {
    let errors = {};

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

    //! cant do things this way
    // fetch("http://localhost:5001/api/users/create", requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error));

    try {
      const response = await fetch(
        "http://localhost:5001/api/users/create",
        requestOptions
      );
      const result = await response.json();
      console.log("result :>> ", result);
      errors.email = result.emailError;
      errors.username = result.usernameError;
      setBackEndError(errors);
    } catch (error) {
      console.log("error", error);
      setBackEndError(error);
    }

    setModalText("Successfuly signed up. Redirecting to login");
    setIsModal(true);
    navigate("/login", { replace: true });
  };

  const signIn = async (values, navigate, location) => {
    let errors = {};
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
      if (result.errorMessage == "email address not found") {
        errors.email = "email address not found";
        errors.pword = false;
        setBackEndError(errors);
      } else if (result.errorMessage == "incorrect password") {
        errors.email = false;
        errors.pword = "incorrect password";
        // console.log("ERRORS>>>>>", errors);

        setBackEndError(errors);
      }

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

  const handleUpload = (e) => {
    setSelectedFiles(e.target);
    console.log(e.target.files);
  };

  const uploadImages = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", selectedFiles.files[0]);
    formdata.append("image", selectedFiles.files[1]);
    formdata.append("image", selectedFiles.files[2]);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5001/api/plants/uploadimage",
      requestOptions
    );
    const result = await response.json();
    // console.log("result :>> ", result);
    setUrls(result.urls);
    // console.log("resul.Urls :>> ", result.urls);
    // console.log("urls", urls);

    // fetch("http://localhost:5001/api/plants/uploadimage", requestOptions)
    //   .then((response) => response.text()) //! or .json
    //   .then((result) => console.log("result>>", result))
    //   .then((result) => setUrls(result))
    //   .catch((error) => console.log("error", error));

    // setNewPost({...newPost, imageUrls: result})
  };

  const submitListing = (values, navigate) => {
    // console.log("URLS", urls);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("genus", values.genus);
    urlencoded.append("varigation", values.varigation);
    urlencoded.append("price", values.price);
    urlencoded.append("rooted", values.rooted);
    urlencoded.append("topcutting", values.topCutting);
    urls.forEach((url) => urlencoded.append("imageUrls", url));
    urlencoded.append("user", userLoggedIn.id);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:5001/api/plants/create", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(
        setModalText("Plant successfully listed. Redirecting"),
        setIsModal(true),
        navigate("/")
      )
      .catch((error) => console.log("error", error));

    // if (location.state?.from) {
    //   setModalText("Plant successfully listed. Redirecting");
    //   setIsModal(true);
    //   navigate(location.state.from);
    // } else {
    //   setModalText("Plant successfully listed. Redirecting");
    //   setIsModal(true);
    //   navigate("/");
    // }
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
        handleUpload,
        uploadImages,
        setUrls,
        urls,
        submitListing,
        logout,
        signIn,
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
