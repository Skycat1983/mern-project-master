import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { useState, createContext, useEffect } from "react";

function ProtectedRoute({ children }) {
  console.log("protected route props", children);

  //? isLoading prevents premature auth checks??
  const { isUser, isLoading, userLoggedIn, getProfile } =
    useContext(AuthContext);

  useEffect(() => {
    getProfile();
    console.log("get profile in protected route");
  }, []);

  // const isAuthenticated = user ? true : false;

  return (
    <>
      {isLoading ? (
        <p>...is loading</p>
      ) : isUser ? (
        children
      ) : (
        <Navigate to="/" />
      )}
    </>
    // <>
    //   {isLoading ? (
    //     <p>...is loading</p>
    //   ) : isUser ? (
    //     children
    //   ) : (
    //     <Navigate to="/" />
    //   )}
    // </>
  );
}

export default ProtectedRoute;
