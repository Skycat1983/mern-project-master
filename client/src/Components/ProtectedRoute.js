import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  console.log("protected route props", children);

  //? isLoading prevents premature auth checks??
  const { user, isLoading } = useContext(AuthContext);

  // const isAuthenticated = user ? true : false;

  return (
    <>
      {isLoading ? <p>...is loading</p> : user ? children : <Navigate to="/" />}
    </>
  );
}

export default ProtectedRoute;
