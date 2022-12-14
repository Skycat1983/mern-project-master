import React from "react";
import { useForm, Form, XLForm } from "../Hooks/useForm";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import cover from "../assets/backgrounds/photos/leaf.png";
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
import Plants from "../Components/Plants/Plants.js";
import Reviews from "../Components/Reviews/Reviews.js";
// import useModal from "../Hooks/useModal.js";
// import temp from "../assets/temp/temp3.png";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ButtonBase from "@mui/material/ButtonBase";
// import ProfileTab from "../Components/ProfileTab/ProfileTab";
import { useLocation } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import Modal from "@mui/material/Modal";
import SummonModal from "../Components/MyModal/SummonModal.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Profile() {
  const [value, setValue] = React.useState(0);
  const [summonModal, setSummonModal] = useState(false);
  const location = useLocation();
  console.log("location :>> ", location.state.user);
  const [url, setUrl] = useState(
    `http://localhost:5001/api/users/one/${location.state.user}`
  );
  const { data, isLoading, error } = useFetch(url);
  const { getProfile, userLoggedIn, isUser } = useContext(AuthContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };
  console.warn(location.state);
  console.warn(location);

  // console.log(summonModal);
  return (
    <>
      <NavBar />
      {data?.user?.premium == true && (
        <Tooltip title="premium user">
          <WorkspacePremiumIcon className="premium-badge" />
        </Tooltip>
      )}
      <div className="background-image-div">
        <img
          src={data?.user?.coverpicture}
          // src={
          //   "https://res.cloudinary.com/dzncmfirr/image/upload/v1670433446/app-images/leaf_xjcqey.png"
          // }
          // className="background-image3"
          className="cover"
          alt=""
        />
      </div>
      {/* <div className="below-nav"> */}
      <div className="gradient-div">
        {userLoggedIn?.username == location.state.user ? (
          <h5 className="welcome-back-header">welcome to your profile</h5>
        ) : (
          <h5 className="welcome-back-header">
            welcome to {data?.user?.username}'s profile
          </h5>
        )}

        {/* </div> */}
      </div>
      <div className="gradient-div-invert">
        <h5></h5>
      </div>
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
            label="about"
            name="about"
            style={{ minWidth: "50%" }}
          />
          <Tab
            className="my-tab"
            label="plants"
            name="plants"
            style={{ minWidth: "50%" }}
          />
          <Tab
            className="my-tab"
            label="reviews"
            name="reviews"
            style={{ minWidth: "50%" }}
          />
          {userLoggedIn?.username == location.state.user && (
            <Tab
              onChange={handleChange}
              className="my-tab"
              label="account"
              name="account"
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
          <Typography sx={{ color: "#ffffff" }} variant="h6" gutterBottom>
            {data?.user?.username}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <img src={temp} className="about-us-avatar" alt="" />
          </Item>
        </Grid>
      </Grid>
      {/* <Button onClick={() => setSummonModal(!summonModal)}>summonModal</Button> */}
      <SummonModal></SummonModal>

      {value === 0 && (
        <AboutUs data={data} aboutus={data?.user?.aboutus}></AboutUs>
      )}
      {value === 1 && <Plants plants={data?.user?.plants}></Plants>}
      {value === 2 && <Reviews data={data?.user}></Reviews>}
      {userLoggedIn?.username == location.state.user && value === 3 && (
        <Account></Account>
      )}
    </>
  );
}

// todo: calc distances with https://www.npmjs.com/package/geolib

// {data &&
//   data.user?.map((item) => {
//     return (
