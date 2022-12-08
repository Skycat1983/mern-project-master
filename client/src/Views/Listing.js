import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../Components/Navbar/NavBar";
import useFetch from "../Hooks/useFetch";

function Listing() {
  const location = useLocation();
  console.log("location :>> ", location.state.plant);
  const [url, setUrl] = useState(
    `http://localhost:5001/api/plants/id/${location.state.plant}`
  );
  const { data, isLoading, error } = useFetch(url);
  console.log(data);
  // const getPlant = () => {
  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   fetch(
  //     "http://localhost:5001/api/plants/id/63909911d513889bf1ec6b01\n",
  //     requestOptions
  //   )
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
  // };

  return (
    <>
      <NavBar />
    </>
  );
}

export default Listing;
