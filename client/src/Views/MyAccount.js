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

// import temp from "../assets/temp/temp3.png";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ButtonBase from "@mui/material/ButtonBase";
import ProfileTab from "../Components/ProfileTab/ProfileTab";

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
      <AboutUs></AboutUs>
    </>
  );
};

export default MyAccount;
