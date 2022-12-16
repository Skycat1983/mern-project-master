import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import NavBar from "../Components/Navbar/NavBar";
import useFetch from "../Hooks/useFetch";
import { LangContext } from "../Contexts/LangContext.js";
import TranslatedContent from "../Components/TranslatedContent";

function Listing() {
  const location = useLocation();
  //! this is saying i must come from previous page
  console.log("location :>> ", location.state.plant);
  const { id } = useParams();
  const [url, setUrl] = useState(`http://localhost:5001/api/plants/id/${id}`);
  const { data, isLoading, error } = useFetch(url);
  const { directsunlight } = `${data?.plant.fact?.directsunlight}`;
  console.log(data);
  console.log("origin", origin);

  const weatherUrl = () => {
    console.log("directsunlight", `${data?.plant.fact?.directsunlight}`);
    if (`${data?.plant.fact?.directsunlight}` == "low") {
      return "https://cdn-icons-png.flaticon.com/512/4814/4814293.png";
    } else if (`${data?.plant.fact?.directsunlight}` == "medium") {
      return "https://cdn-icons-png.flaticon.com/512/4814/4814489.png";
    } else if (`${data?.plant.fact?.directsunlight}` == "high") {
      return "https://cdn-icons-png.flaticon.com/512/4814/4814268.png";
    }
  };

  return (
    <>
      <NavBar />
      <h2>PADDING</h2>

      <h2>
        <TranslatedContent contentID="genus" />: {data?.plant.genus}
      </h2>
      <h2>
        <TranslatedContent contentID="rooted" />:{" "}
        {data?.plant.rooted ? "yes" : "no"}
      </h2>
      <h2>topcutting: {data?.plant.topcutting ? "yes" : "no"}</h2>
      <h2>
        <TranslatedContent contentID="varigation" />:{" "}
        {data?.plant.varigation ? "yes" : "no"}
      </h2>
      <h2>
        <TranslatedContent contentID="price" />: {data?.plant.price}
      </h2>
      <h2>
        <TranslatedContent contentID="difficulty" />:
        {data?.plant.fact.difficulty}
      </h2>
      <h2>directsunlight: {data?.plant.fact.directsunlight}</h2>
      <h2>
        <TranslatedContent contentID="humidity" />: {data?.plant.fact.humidity}
      </h2>
      <h2>
        <TranslatedContent contentID="origin" />: {data?.plant.fact.origin}
      </h2>
      <h2>toxicity: {data?.plant.fact.toxicity}</h2>
      <Link
        to={`/profile/${data?.plant?.user.username}`}
        // to={`/profile/${data?.plant?.user.username}`}
        key={data?.plant.user.username}
        //! bit confused by this!
        state={{ user: data?.plant.user.username }}
        style={{ textDecoration: "none" }}
      >
        <h2>
          <TranslatedContent contentID="account" />: {data?.plant.user.username}
          : {data?.plant.fact.toxicity}
        </h2>
      </Link>
      <h6>about: {data?.plant.fact.about}</h6>
      {data && (
        <img
          src={`https://img.icons8.com/color/512/${data?.plant.fact.origin}.png`}
          className="fact-icons"
        />
      )}
      {data?.plant?.fact?.directsunlight && (
        <img src={weatherUrl()} className="fact-icons" />
      )}
      {data?.plant?.fact?.toxicity && (
        <img
          src="https://img.icons8.com/fluency/512/toxic-material.png"
          className="fact-icons"
        />
      )}
      {data?.plant?.fact?.humidity > 60 && (
        <img
          className="fact-icons"
          src="https://cdn-icons-png.flaticon.com/512/6630/6630717.png"
        />
      )}
    </>
  );
}

export default Listing;
