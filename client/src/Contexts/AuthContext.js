import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getToken from "../utils/getToken.js";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isUser, setIsUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();
    console.log("token>>", token);
    if (!token) {
      setError("session expired");
    }
  }, [error]);

  const getProfile = async () => {
    // const token = localStorage.getItem("token")
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
    } catch (error) {
      console.log("error getting profile", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isUser,
        isLoading,
        userLoggedIn,
        error,
        getProfile,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
