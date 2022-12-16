import React, { useContext } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { useState, createContext, useEffect } from "react";

function ProtectedRoute({ children }) {
  //? isLoading prevents premature auth checks??
  const { isUser, isLoading, getProfile } = useContext(AuthContext);
  const location = useLocation();
  console.log("protected route props", children);

  useEffect(() => {
    getProfile();
    console.log("get profile in protected route");
  }, []);

  return (
    <>
      {isLoading ? (
        <p>...is loading</p>
      ) : isUser ? (
        children
      ) : (
        <Navigate to="/" replace state={{ from: location }} />
      )}
    </>
  );
}

export default ProtectedRoute;
