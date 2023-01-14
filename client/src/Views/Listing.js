import React, { useContext, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import NavBar from "../Components/Navbar/NavBar";
import useFetch from "../Hooks/useFetch";
import { LangContext } from "../Contexts/LangContext.js";
import TranslatedContent from "../Components/TranslatedContent";
import ItemCarousel from "../Components/ItemCarousel/ItemCarousel.js";
import { Grid, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "./views.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body1,
  padding: theme.spacing(2),
  textAlign: "left",
  // paperShadow: 0,
  color: theme.palette.text.secondary,
}));

function Listing() {
  const { convertCurrency, currency } = useContext(LangContext);

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

  const dateChange = new Date(`${data?.plant.createdAt}`).toLocaleDateString(
    "en-GB"
  );

  return (
    <>
      <NavBar />
      <h2>PADDING</h2>
      <Grid
        className="info-grid"
        alignItems="center"
        rowSpacing={4}
        container
        spacing={4}
        item
        // sx={{ boxShadow: 0 }}
        // xs={2}
      >
        <Item sx={{ boxShadow: 0 }} className="left-item">
          <TranslatedContent contentID="genus" />: {data?.plant.genus}
        </Item>

        <Item sx={{ boxShadow: 0 }} className="right-item">
          listed: {dateChange}
        </Item>
      </Grid>
      <Paper className="carousel-paper">
        {data && <ItemCarousel data={data?.plant}></ItemCarousel>}
        <div className="listing-icons">
          {data && (
            <Tooltip
              title={
                "the origin of this plant is " + `${data?.plant.fact.origin}`
              }
            >
              <img
                src={`https://img.icons8.com/color/512/${data?.plant.fact.origin}.png`}
                className="fact-icons"
              />
            </Tooltip>
          )}
          {data?.plant?.fact?.directsunlight && (
            <img src={weatherUrl()} className="fact-icons" />
          )}
          {data?.plant?.fact?.toxicity && (
            <Tooltip title={"be aware that this plant is toxic to pets"}>
              <img
                src="https://img.icons8.com/fluency/512/toxic-material.png"
                className="fact-icons"
              />
            </Tooltip>
          )}

          {data?.plant?.fact?.humidity > 60 && (
            <Tooltip
              title={
                "this plant requires a humidity of at least " +
                `${data?.plant.fact.humidity}` +
                "%, so you probably need a humidifier"
              }
            >
              <img
                className="fact-icons"
                src="https://cdn-icons-png.flaticon.com/512/6630/6630717.png"
              />
            </Tooltip>
          )}
        </div>
      </Paper>
      <Grid
        className="listing-grid"
        alignItems="center"
        rowSpacing={3}
        container
        spacing={2}
        item
        // xs={10}
      >
        <Item xs={6} sx={{ boxShadow: 0 }}>
          {" "}
          <Link
            to={`/profile/${data?.plant?.user.username}`}
            key={data?.plant.user.username}
            state={{ user: data?.plant.user.username }}
            style={{ textDecoration: "none" }}
          >
            <TranslatedContent contentID="account" />:{" "}
            {data?.plant.user.username}
          </Link>
        </Item>
        <Item xs={6} sx={{ boxShadow: 0 }}>
          <TranslatedContent contentID="price" />:{currency == "pounds" && "£"}
          {convertCurrency(`${data?.plant.price}`)}
          {currency == "euros" && "€"}
        </Item>
        {/* <Item xs={6} sx={{ boxShadow: 0 }}>
          <TranslatedContent contentID="rooted" />:{" "}
          {data?.plant.rooted ? "yes" : "no"}
        </Item>
        <Item xs={6} sx={{ boxShadow: 0 }}>
          <TranslatedContent contentID="varigation" />:{" "}
          {data?.plant.varigation ? "yes" : "no"}
        </Item>
        <Item sx={{ boxShadow: 0 }}>
          <TranslatedContent contentID="humidity" />:{" "}
          {data?.plant.fact.humidity}
        </Item>
        <Item xs={6} sx={{ boxShadow: 0 }}>
          topcutting: {data?.plant.topcutting ? "yes" : "no"}
        </Item> */}
      </Grid>
      <Paper className="about-listing">
        <Typography variant="h6" gutterBottom>
          about this plant...
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data?.plant.fact.about}
        </Typography>
        {/* <h6>about: {data?.plant.fact.about}</h6> */}
      </Paper>
    </>
  );
}

export default Listing;

{
  /* <h2>
        <TranslatedContent contentID="rooted" />:{" "}
        {data?.plant.rooted ? "yes" : "no"}
      </h2> */
}
{
  /* <h2>topcutting: {data?.plant.topcutting ? "yes" : "no"}</h2> */
}
{
  /* <h2>
        <TranslatedContent contentID="varigation" />:{" "}
        {data?.plant.varigation ? "yes" : "no"}
      </h2> */
}
{
  /* <h2>
        <TranslatedContent contentID="price" />: {data?.plant.price}
      </h2> */
}
{
  /* <h2>
        <TranslatedContent contentID="difficulty" />:
        {data?.plant.fact.difficulty}
      </h2> */
}
{
  /* <h2>directsunlight: {data?.plant.fact.directsunlight}</h2> */
}
{
  /* <h2>
        <TranslatedContent contentID="humidity" />: {data?.plant.fact.humidity}
      </h2> */
}
{
  /* <h2>
        <TranslatedContent contentID="origin" />: {data?.plant.fact.origin}
      </h2> */
}
{
  /* <h2>toxicity: {data?.plant.fact.toxicity}</h2> */
}
