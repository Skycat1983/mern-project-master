import React from "react";
import { useForm, Form, XLForm } from "../Hooks/useForm";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, FormLabel, RadioGroup, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import cover from "../assets/backgrounds/photos/leaf.png";
import temp from "../assets/appIcons/glassmomnstera.png";
import Radio from "@mui/material/Radio";
import MyRadioGroup from "../Components/controls/MyRadioGroup";
import MyControls from "../Components/controls/MyControls";
import { useContext, useEffect, useState } from "react";
import MyInputs from "../Components/controls/MyInputs";
import Button from "@mui/material/Button";
import useFetch from "../Hooks/useFetch";
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

// import temp from "../assets/temp/temp3.png";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ButtonBase from "@mui/material/ButtonBase";
import ProfileTab from "../Components/ProfileTab/ProfileTab";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MyAccount = () => {
  const [selectedFile, setSelectedFile] = useState([{}]);
  const [url, setUrl] = useState({});
  const [avatar, setAvatar] = useState();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const user = {
    username: "the plant seller",
    premium: true,
    // aboutus: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  };
  const data = { user: { plants: { genus: "monstera", price: 40 } } };
  // const { values, setValues, handleInputChange } = useForm(initialValues);

  return (
    <>
      <NavBar />
      {user.premium == true && (
        <WorkspacePremiumIcon className="premium-badge" />
      )}

      <div className="background-image-div">
        <img src={cover} className="background-image3" alt="" />
      </div>
      <div className="below-nav">
        <div className="gradient-div">
          <h5 className="welcome-back-header">welcome back, {user.username}</h5>
        </div>
      </div>
      <ProfileTab></ProfileTab>
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
            {user.username}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <img src={temp} className="about-us-avatar" alt="" />
          </Item>
        </Grid>
      </Grid>
      {/* <AboutUs></AboutUs> */}
      {/* <Carousel></Carousel> */}
      <Account></Account>
    </>
  );
};

export default MyAccount;
