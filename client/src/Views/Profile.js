import useFetch from "../Hooks/useFetch";
import NavBar from "../Components/Navbar/NavBar";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  const [url, setUrl] = useState();
  // "http://localhost:5001/api/users/{}"

  console.log(location);

  return (
    <>
      <NavBar />
    </>
  );
}
