import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getToken from "../utils/getToken.js";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isUser, setIsUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLogin, setUserLogin] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setError("session expired");
    }
  }, [error]);

  const getProfile = async () => {
    // const token = localStorage.getItem("token")
    const token = getToken();
    // console.log("token :>> ", token);
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
      console.log("result :>> ", result);
      setUserLogin(result);
    } catch (error) {
      console.log("error getting profile", error);
    }
  };

  //! LOGOUT
  const signOut = () => {
    signOut("USER LOGGED OUT", auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  <AuthContext.Provider
    value={{
      isUser,
      setIsUser,
      login,
      register,
      isLoading,
      setIsLoading,
      signOut,
    }}
  >
    {props.children}
  </AuthContext.Provider>;
};
