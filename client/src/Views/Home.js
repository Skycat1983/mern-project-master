import React, { Children } from "react";
import NavBar from "../Components/Navbar/NavBar";
import useFetch from "../Hooks/useFetch";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../Contexts/AuthContext";
import { LangContext } from "../Contexts/LangContext.js";
import TranslatedContent from "../Components/TranslatedContent";
import { useForm, Form } from "../Hooks/useForm";
import cover2 from "../assets/backgrounds/photos/cosyhouseplants.jpg";
import cover from "../assets/backgrounds/photos/junglephoto.jpg";
import "./views.css";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Carousel from "../Components/Carousel/Carousel.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useEffect, useState, useContext } from "react";
import MyControls from "../Components/controls/MyControls";
import MyModal from "../Components/MyModal/SummonModal";

function Home() {
  const [value, setValue] = React.useState(0);

  const { getProfile, userLoggedIn, logout, server, isUser, isModal } =
    useContext(AuthContext);
  const [url, setUrl] = useState(`${server}/api/plants/all`);
  const { data, isLoading, error } = useFetch(url);

  useEffect(() => {
    getProfile();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue, value);
    if (value === 1) {
      setUrl(`${server}/api/plants/all`);
    } else {
      setUrl(`${server}/api/users/all`);
    }
  };

  return (
    <>
      {isModal && <MyModal></MyModal>}
      <NavBar />
      <div>
        {value === 1 ? (
          <img src={cover2} className="background-shop" alt="" />
        ) : (
          <img src={cover} className="background-image" alt="" />
        )}
      </div>
      <div className="gradient-div">
        {isUser && (
          <h5 className="welcome-back-header">
            <TranslatedContent contentID="welcomeBack" />
            {userLoggedIn.username}
          </h5>
        )}
      </div>
      <div className="gradient-div-invert"></div>

      {isLoading && <CircularProgress />}
      {error && <h1>Error for the user</h1>}

      <Box
        className="plant-seller-tab"
        sx={{
          bgcolor: "background.paper",
          width: "12rem",
          borderRadius: "12px 12px 0px 0px",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          TabIndicatorProps={{ style: { backgroundColor: "green" } }}
          value={value}
          onChange={handleChange}
        >
          <Tab
            className="my-tab"
            label=<TranslatedContent contentID="plants" />
          />
          <Tab
            className="my-tab"
            label=<TranslatedContent contentID="sellers" />
          />
        </Tabs>
      </Box>
      {isLoading === false && <Carousel data={data} isLoading={isLoading} />}
    </>
  );
}

export default Home;
// QUESTIONS:

// TODO: usememo on wishlist search. location context for language and currency conversion.
//* // refresh page after item added/deleted/updated
//* useref for tab settings? are there other areas i don't want to reset?

// onclick vs onchange

//! questions

//! If i navigate to my account via the settings icon, that it should load the profile page with the settings tab active step 3. is this location state?

// delete image if nav away before submit  (useModal)

// bit unsure how often i should be using getprofile and when. it's just to see if session expired?

// filter by premium users first in carousel not working as hoped

//! see usercontroller.js,  updateUser: i wanted to make this code reusable

// also: in auth context but login, not sure if my errors in login should be part of a 'catch' for actual errors.

// CONFUSIONS:
// - setTimeout(() => {});

// card ideas https://codepen.io/joshuaward/pen/dKmZVZ https://codepen.io/dickyal6/pen/rNeRepd

// caoursel ideas https://github.com/nolimits4web/swiper https://github.com/maxmarinich/react-alice-carousel https://github.com/kidjp85/react-id-swiper

http: {
  /* <h3 className="welcome-user">HELLO USER</h3> */
}
{
  /* <h1>message for the user</h1> */
}
