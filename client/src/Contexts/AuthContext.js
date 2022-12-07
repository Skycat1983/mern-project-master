import { useState, createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getToken from "../utils/getToken.js";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isUser, setIsUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();
    console.log("token>>", token);
    if (!token) {
      setError("session expired");
    }
  }, [error]);

  const signIn = async (values, navigate, location) => {
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
      const { token } = result;
      if (token) {
        localStorage.setItem("token", token);
        //! swap around if problems
        if (location.state?.from) {
          navigate(location.state.from, { replace: true });
        } else {
          navigate("/", { replace: true });
        }
        isLoading(false);
        isUser(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getProfile = async () => {
    const token = getToken();
    console.log("token :>>", token);
    if (token) {
      setError(null);
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
  const logout = () => {
    localStorage.removeItem("token");
    setUserLoggedIn(false);
    isUser(null);
    console.log("user logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        isUser,
        isLoading,
        userLoggedIn,
        error,
        getProfile,
        logout,
        signIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
