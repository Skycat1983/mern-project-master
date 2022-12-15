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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  //! CAN BE USED ON FROSTED FORMS
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Home() {
  const initialValues = {
    searchPlants: "",
    searchUsers: "",
  };
  // const [modalText, setModalText] = useState(false);

  const [value, setValue] = React.useState(0);
  const [url, setUrl] = useState("http://localhost:5001/api/plants/all");
  const { data, isLoading, error } = useFetch(url);
  const { getProfile, userLoggedIn, logout, isUser, isModal } =
    useContext(AuthContext);
  const { values, setValues, handleInputChange } = useForm(initialValues);

  useEffect(() => {
    console.warn("getting profile in Home");
    getProfile();
    console.log("userLogin", userLoggedIn);
    console.log("isUser", isUser);
  }, []);

  // useEffect(() => {
  //   if (isUser) {
  //     setModalText("user logged out successfully");
  //   } else {
  //     setModalText("user logged in successfully");
  //   }
  //   return () => {
  //     setModalText(null);
  //   };
  // }, [isUser]);

  //? see 'console.log(newValue, value);': what's going on with this toggle effect? why doesn't it print the same number twice?
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue, value);
    if (value == 1) {
      setUrl("http://localhost:5001/api/plants/all");
    } else {
      setUrl("http://localhost:5001/api/users/all");
    }
  };

  return (
    <>
      {isModal && <MyModal></MyModal>}
      <NavBar />
      <div>
        {value == 1 ? (
          <img src={cover2} className="background-shop" alt="" />
        ) : (
          <img src={cover} className="background-image" alt="" />
        )}
      </div>
      {/* <div className="below-nav"> */}
      <div className="gradient-div">
        {isUser && (
          <h5 className="welcome-back-header">
            <TranslatedContent contentID="welcomeBack" />
            {userLoggedIn.username}
          </h5>
        )}
      </div>
      {/* </div> */}
      <div className="gradient-div-invert">
        <h5></h5>
      </div>
      <Search
        className="search-bar"
        label="search plants"
        name="searchPlants"
        value={values.searchPlants}
        onChange={handleInputChange}
        sx={{
          boxShadow: 2,
          // maxWidth: "250px",
        }}
      >
        <SearchIconWrapper>
          <SearchIcon className="search-icon" />
        </SearchIconWrapper>
        {value === 0 ? (
          <StyledInputBase
            placeholder="plants"
            //! can't be translated?
            // placeholder=<TranslatedContent contentID="plants" />
            inputProps={{ "aria-label": "search" }}
            // label="search plants"
            // name="searchPlants"
            // value={values.searchPlants}
            // onChange={handleInputChange}
          />
        ) : (
          <StyledInputBase
            placeholder="Users…"
            inputProps={{ "aria-label": "search" }}
            // label="search users"
            // name="searchUsers"
            // value={values.searchUsers}
            // onChange={handleInputChange}
          />
        )}
      </Search>
      {isLoading && <CircularProgress />}
      {error && <h1>Error for the user</h1>}

      <Box
        className="plant-seller-tab"
        sx={{
          bgcolor: "background.paper",
          width: "53%",
          // width: "10vm",
          borderRadius: "12px 12px 0px 0px",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          TabIndicatorProps={{ style: { backgroundColor: "green" } }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          // textColor="green[900]"
          // indicatorColor="primary"
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
      {isLoading == false && <Carousel data={data} isLoading={isLoading} />}
    </>
  );
}

export default Home;

// QUESTIONS:

// TODO: usememo on wishlist search. location context for language and currency conversion.

//! addplants steps hard to translate

// need public id and url. public id is end of url. public id was not stored. cloudinary uploader destroy.

// "Uncaught TypeError: Cannot read properties of null (reading 'user')" when navigating to profile page sometimes. see when i turn navigating on after posting review

// delete image if i navigate away fromm addplant

// go over how isloading is working. how should i be using it. what is best practice. in authcontext it is set to false. when should i be turning it off then on?

// useref for tab settings? are there other areas i don't want to reset?

//! see usercontroller.js,  updateUser: i wanted to make this code reusable
//? MAYBE NOW WORKING: see authcontext patchuser. why can't i access 'result' durinng the end of function? i want to set my modal text not mannually

// see autth context signup. there is a type of fetch i'm not comfortable using. 'result' seems accessible to console log but not other things? seems strange

// also: in auth context but login, not sure if my errors in login should be part of a 'catch' for actual errors.

// see plants.js component. sometimes submit button does not load. cannot understand why

// averages in user reviews

// Linkto not working from navbar when i set to redirect to profile/{userLoggedIn.username}

// filter by premium users first in carousel not working as hoped

//  any general pointers for how i should structure my future tasks? is it not too much to keep piling  things into auth context?

// bit unsure how often i should be using getprofile and when. it's just to see if session expired?

//* i have a feeling i'm using async, await wrong. please see commentcontroller, createcomment, updateauthoer/target

// why does my object destructure of useForm show different colour coding in Signup and MyAccount?

// see login/signup. I have these const styled things. Could i just be importing those from some styles control component or something?

// CONFUSIONS:
// - setTimeout(() => {});

// card ideas https://codepen.io/joshuaward/pen/dKmZVZ https://codepen.io/dickyal6/pen/rNeRepd

// caoursel ideas https://github.com/nolimits4web/swiper https://github.com/maxmarinich/react-alice-carousel https://github.com/kidjp85/react-id-swiper

{
  /* <h3 className="welcome-user">HELLO USER</h3> */
}
{
  /* <h1>message for the user</h1> */
}
