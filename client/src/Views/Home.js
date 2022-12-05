import React from "react";
import NavBar from "../Components/Navbar/NavBar";
import useFetch from "../Hooks/useFetch";
import CircularProgress from "@mui/material/CircularProgress";

//! V1 shop
// import cover from "../assets/backgrounds/photos/leaf.png";

//! V2 requires new logo placemenet in center
import cover2 from "../assets/backgrounds/photos/cosyhouseplants.jpg";

// import cover2 from "../assets/backgrounds/photos/cuttinginbottle.jpg";

//! V3
import cover from "../assets/backgrounds/photos/junglephoto.jpg";

//! V4 need to redo object fit
// import cover from "../assets/backgrounds/photos/darkleaves.jpg";

//! illustrations
// import cover from "../assets/backgrounds/jungle4.png";
// import cover from "../assets/backgrounds/illustrations/jungle4.png";
// import cover from "../assets/backgrounds/jungle9.png";
import "./views.css";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Carousel from "../Components/Carousel/Carousel.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

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
  const [value, setValue] = React.useState(0);
  const [url, setUrl] = useState("http://localhost:5001/api/plants/all");
  const { data, isLoading, error } = useFetch(url);

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

  //? WHY CAN"T I DO THIS
  // useEffect(() => {
  //   if (value == 1) {
  //     useFetch("http://localhost:5001/api/users/all");
  //   } else {
  //     useFetch("http://localhost:5001/api/plants/all");
  //   }
  // }, [value]);

  return (
    <>
      <NavBar />
      <div className="background-image-div">
        {value == 1 ? (
          <img src={cover2} className="background-shop" alt="" />
        ) : (
          <img src={cover} className="background-image" alt="" />
        )}
      </div>
      <Search
        className="search-bar"
        sx={{
          boxShadow: 2,
          // maxWidth: "250px",
        }}
      >
        <SearchIconWrapper>
          <SearchIcon className="search-icon" />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
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
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          // textColor="green[900]"
          // indicatorColor="primary"
        >
          <Tab label="PLANTS" />
          <Tab label="SELLERS" />
        </Tabs>
      </Box>
      {isLoading == false && <Carousel data={data} isLoading={isLoading} />}
    </>
  );
}

// TODO:
// - useErrors / useModal hook
// - useFetch for Login & Signup
// - redirect after form submitted successfully

export default Home;

// QUESTIONS:

// usefetch for uploads? see signup. the request options

// - see carousel.js. on page load i get a warning about unique key prop. why is "<SwiperSlide key={item.user.id}>" not recognised?
// - also, how do i generalise or not specify which field to load as which in carousel? what is i want to display the value of the first property, rather than something.seomthing

// how should i decide what to send in the token? is there a downside to sending lots of info?

// jwtAuth: "const jwtAuth = passport.authenticate("jwt", { session: false });" what does the session bit mean here?

// why does my object destructure of useForm show different colour coding in Signup and MyAccount?

// my userscollection has a commentsForUser field which stores reviews left for that user. Would it make sense for me to have a commentsByUser field too, which also stores the reviews, but this time by the user for others, and then populate links between the two? or does populating links between users make no sense, considering they belong to the same collection? //! the documentation seems to imply that we can only populate between different collections, not within a single collection. for this reason it seemed to make more sense to make a comments collection, rather

// see login/signup. I have these const styled things. Could i just be importing those from some styles control component or something?

// - see Profile.js view. Why do my "{!isLoading && <h3>welcome to {data?.user?.username}'s profile </h3>}" conditionals not work without the question marks? Why is the !isLoading part not enough to stop me gettiing error of "bundle.js:1325 Uncaught TypeError: Cannot read properties of null (reading 'user')""

// - setError not working

// CONFUSIONS:
// - setTimeout(() => {});

// todo: navbar formating issues. hidden icons ony appear when not in mobile view
//? how to do try/catch with this type of fetch?

// card ideas https://codepen.io/joshuaward/pen/dKmZVZ https://codepen.io/dickyal6/pen/rNeRepd

// caoursel ideas https://github.com/nolimits4web/swiper https://github.com/maxmarinich/react-alice-carousel https://github.com/kidjp85/react-id-swiper

{
  /* <h3 className="welcome-user">HELLO USER</h3> */
}
{
  /* <h1>message for the user</h1> */
}
