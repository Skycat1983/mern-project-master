import { useState, createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../Hooks/useForm.js";
import getToken from "../utils/getToken.js";
import * as React from "react";
import { LangContext } from "./LangContext.js";
import TranslatedContent from "../Components/TranslatedContent";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([{}]);
  const [isUser, setIsUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState({});
  const [backEndError, setBackEndError] = useState({});
  const [isSubscribed, setIsSubscribed] = useState();

  const [urls, setUrls] = useState([]);
  const [publicIds, setPublicIds] = useState([]);
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
    console.log("publicIds", publicIds);
    setIsLoading(false);
  }, [urls, publicIds]);

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

    setModalText(<TranslatedContent contentID="successfullySignedUp" />);
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

        //! is this necessary?
        // setBackEndError(<TranslatedContent contentID="YourReviewMustContain" />);

        setBackEndError(errors);
      }

      const { token } = result;

      if (token) {
        localStorage.setItem("token", token);
        //! swap around if problems
        if (location.state?.from) {
          setModalText(<TranslatedContent contentID="SuccessfullyLoggedIn" />);
          setIsModal(true);
          navigate(location.state.from, { replace: true });
        } else {
          setModalText(<TranslatedContent contentID="SuccessfullyLoggedIn" />);
          setIsModal(true);
          navigate("/", { replace: true });
        }
        setModalText(<TranslatedContent contentID="SuccessfullyLoggedIn" />);
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
    // const urlencoded = new URLSearchParams();
    // urlencoded.append("id", id);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      // body: urlencoded,
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

  const isUserSubscribed = (props) => {
    console.log("props in get my subs", props);
    console.log("user id to send for subs check", userLoggedIn.id);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("profileid", props);
    urlencoded.append("userid", userLoggedIn.id);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:5001/api/subs/get", requestOptions)
      .then((response) => response.text())
      .then((result) => setIsSubscribed(result))
      .catch((error) => console.log("error", error));
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
    setUrls(result.urls);
    setPublicIds(result.publicIds);
    console.log("publicIds", publicIds);
  };

  const submitListing = (values, navigate) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("genus", values.genus);
    urlencoded.append("varigation", values.varigation);
    urlencoded.append("price", values.price);
    urlencoded.append("rooted", values.rooted);
    urlencoded.append("topcutting", values.topCutting);
    urls.forEach((url) => urlencoded.append("imageUrls", url));
    publicIds.forEach((publicId) => urlencoded.append("publicIds", publicId));
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
        setModalText(<TranslatedContent contentID="plantListed" />),
        setIsModal(true),
        navigate("/")
      )
      .catch((error) => console.log("error", error));
  };

  const leaveReview = async (
    values,
    userLoggedIn,
    data,
    navigate,
    location
  ) => {
    console.log(values.rating);
    if (values.rating == "0" || values.text == "") {
      setModalText(<TranslatedContent contentID="YourReviewMustContain" />);
      setIsModal(true);
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("text", values.text);
      urlencoded.append("rating", values.rating);
      urlencoded.append("author", userLoggedIn.id);
      urlencoded.append("target", data.data._id);
      urlencoded.append("authorusername", userLoggedIn.username);
      urlencoded.append("targetusername", data.data.username);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch("http://localhost:5001/api/comments/create/", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .then(
          setModalText(
            <TranslatedContent contentID="ReviewPostedSuccessfully" />
          ),
          setIsModal(true)
          // navigate()
        )
        .catch((error) => console.log("error", error));
    }
  };

  const deleteReview = (comment) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("commentid", comment._id);
    urlencoded.append("authorid", comment.author);
    urlencoded.append("targetid", comment.target);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      "http://localhost:5001/api/comments/delete/?commentid=63927468f69b23134cca4682&authorid=63925855d8151d521b9fc92a&targetid=63925895d8151d521b9fc936",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(setModalText("Review deleted"), setIsModal(true))
      .catch((error) => console.log("error", error));
  };

  const deletePlant = (item) => {
    const { publicIds } = item;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("plantid", item._id);
    urlencoded.append("userid", item.user);
    publicIds.forEach((publicId) => urlencoded.append("imageids", publicId));

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:5001/api/plants/delete/12345", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(setModalText("Plant deleted"), setIsModal(true))
      .catch((error) => console.log("error", error));
  };

  const patchUser = async (values, userLoggedIn) => {
    // console.warn("IMPRTANT", values, userLoggedIn);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", userLoggedIn);
    urlencoded.append("aboutus", values.aboutUs);

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      "http://localhost:5001/api/users/update/aboutus/theplantseller",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => setModalText(`${result.modal}`, console.log(result)))
      .then((result) => window.location.reload())

      // .then(setModalText(`${result.modal}`), setIsModal(true), navigate("/"))
      .catch((error) => console.log("error", error));
  };

  //LOGOUT
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");

    setModalText(<TranslatedContent contentID="SuccessfullyLoggedOut" />);
    setIsModal(true);
    setUserLoggedIn(false);
    setIsUser(false);
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
        setModalText,
        modalText,
        getProfile,
        isUserSubscribed,
        isSubscribed,
        handleUpload,
        uploadImages,
        setUrls,
        setPublicIds,
        urls,
        submitListing,
        leaveReview,
        deleteReview,
        deletePlant,
        patchUser,
        logout,
        signIn,
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
