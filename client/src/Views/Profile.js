import React from "react";
import { useForm, Form, XLForm } from "../Hooks/useForm";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  RadioGroup,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import temp from "../assets/appIcons/glassmomnstera.png";
import Tooltip from "@mui/material/Tooltip";
import { useContext, useEffect, useState } from "react";
import "./views.css";
import NavBar from "../Components/Navbar/NavBar.js";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import "./views.css";
import Box from "@mui/material/Box";
import AboutUs from "../Components/AboutUs/AboutUs.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Carousel from "../Components/Carousel/Carousel.js";
import Account from "../Components/Account/Account.js";
import { AuthContext } from "../Contexts/AuthContext";
import { LangContext } from "../Contexts/LangContext.js";
import TranslatedContent from "../Components/TranslatedContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Plants from "../Components/Plants/Plants.js";
import Reviews from "../Components/Reviews/Reviews.js";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ButtonBase from "@mui/material/ButtonBase";
// import ProfileTab from "../Components/ProfileTab/ProfileTab";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import Modal from "@mui/material/Modal";
import SummonModal from "../Components/MyModal/SummonModal.js";
import Notifications from "../Components/Notifications/Notifications.js";
import useWindowSize from "../Hooks/useWindowSize";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Profile() {
  const [value, setValue] = React.useState(0);
  // const [summonModal, setSummonModal] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const [url, setUrl] = useState(`http://localhost:5001/api/users/one/${id}`);
  const { width } = useWindowSize();
  const { data, isLoading, error } = useFetch(url);
  const { getProfile, userLoggedIn, isUser, isUserSubscribed, isSubscribed } =
    useContext(AuthContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };
  const toggleSub = () => {
    console.log("trying to toggle sub");
    if (isSubscribed == `{"msg":"subscribed"}`) {
      console.log("unsubscribing");
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("profileid", `${data?.user?._id}`);
      urlencoded.append("userid", `${userLoggedIn?.id}`);

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch("http://localhost:5001/api/subs/delete", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .then((result) => window.location.reload())
        .catch((error) => console.log("error", error));
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("sellerusername", `${id}`);
      urlencoded.append("subscriberid", `${userLoggedIn.id}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch("http://localhost:5001/api/subs/create", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .then((result) => window.location.reload())
        .catch((error) => console.log("error", error));
    }
    // const resetPage = () => useFetch(url);
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    console.log("isSubscribed", isSubscribed);
    if (isSubscribed == `{"msg":"subscribed"}`) {
      console.log("YES");
    }
  }, [isSubscribed]);

  useEffect(() => {
    if (userLoggedIn.id) {
      console.log("id of page owner", data?.user._id);
      isUserSubscribed(data?.user._id);
    }
  }, [data]);

  console.warn(data);

  return (
    <>
      <NavBar />
      {data?.user?.premium == true && (
        <Tooltip title="premium user">
          <WorkspacePremiumIcon className="premium-badge" />
        </Tooltip>
      )}

      <div className="background-image-div">
        <img src={data?.user?.coverpicture} className="cover" alt="" />
      </div>
      {/* <div className="below-nav"> */}
      <div className="gradient-div">
        {userLoggedIn?.username == location.state.user ? (
          <h5 className="welcome-back-header">
            <TranslatedContent contentID="welcomeToYourProfile" />
          </h5>
        ) : (
          <h5 className="welcome-back-header">
            welcome to {data?.user?.username}'s profile
          </h5>
        )}

        {/* </div> */}
      </div>
      <div className="gradient-div-invert">{/* <h5></h5> */}</div>
      <Box className="profile-tab" sx={{ maxWidth: { xs: 255, sm: 200 } }}>
        <Tabs
          TabIndicatorProps={{ style: { backgroundColor: "green" } }}
          value={value}
          className="my-tabs"
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {/* <TabScrollButton direction="left" /> */}

          <Tab
            className="my-tab"
            label=<TranslatedContent contentID="about" />
            name="about"
            style={{ minWidth: "50%" }}
          />
          <Tab
            className="my-tab"
            label=<TranslatedContent contentID="plants" />
            name="plants"
            style={{ minWidth: "50%" }}
          />
          <Tab
            className="my-tab"
            label=<TranslatedContent contentID="reviews" />
            name="reviews"
            style={{ minWidth: "50%" }}
          />
          {userLoggedIn?.username == location.state.user && (
            <Tab
              onChange={handleChange}
              className="my-tab"
              label=<TranslatedContent contentID="account" />
              name="account"
              style={{ minWidth: "50%" }}
            />
          )}
          {userLoggedIn?.username == location.state.user && (
            <Tab
              onChange={handleChange}
              className="my-tab"
              label="feed"
              name="feed"
              style={{ minWidth: "50%" }}
            />
          )}
        </Tabs>
      </Box>
      <Grid
        sx={{
          marginTop: -14,
        }}
        container
        spacing={5}
        padding={1}
        paddingLeft={3}
        paddingRight={3}
      >
        <Grid className="profile-headings" item xs={8}>
          <Typography
            className="profile-owner"
            sx={{ color: "#ffffff" }}
            variant="h6"
            gutterBottom
          >
            {data?.user?.username}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <img src={data?.user?.avatar} className="about-us-avatar" alt="" />
          </Item>
        </Grid>
      </Grid>
      <SummonModal></SummonModal>
      {userLoggedIn?.username &&
        userLoggedIn?.username !== location.state.user && (
          <Button
            size="small"
            color="success"
            variant="outlined"
            className={
              isSubscribed == `{"msg":"subscribed"}`
                ? "unsub-button"
                : "sub-button"
            }
            onClick={toggleSub}
          >
            {isSubscribed == `{"msg":"subscribed"}`
              ? "unsubscribe"
              : "subscribe"}
          </Button>
        )}
      {userLoggedIn?.username == location.state.user && value === 4 && (
        <Notifications></Notifications>
      )}
      {value === 0 && (
        <AboutUs data={data} aboutus={data?.user?.aboutus}></AboutUs>
      )}
      {value === 1 && <Plants plants={data?.user?.plants}></Plants>}
      {value === 2 && <Reviews data={data?.user}></Reviews>}
      {userLoggedIn?.username == location.state.user && value === 3 && (
        <Account></Account>
      )}
      {/* <IconButton>
        <FavoriteBorderIcon className="favourite-badge" onClick={toggleFave} />
      </IconButton> */}
    </>
  );
}

// todo: calc distances with https://www.npmjs.com/package/geolib

// {data &&
//   data.user?.map((item) => {
//     return (
