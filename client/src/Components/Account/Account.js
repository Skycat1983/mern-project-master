import React, { useState, useContext, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./Account.css";
import { Link, Navigate } from "react-router-dom";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { AuthContext } from "../../Contexts/AuthContext";
import { LangContext } from "../../Contexts/LangContext.js";
import TranslatedContent from "../TranslatedContent";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  // rowGap: "15px",
  color: theme.palette.text.secondary,
}));

const initialValues = {
  membership: "",
};

function Account() {
  const [toggle, setToggle] = useState(true);
  const [defaults, setDefaults] = useState();
  const [startingValues, setStartingValues] = useState({});
  const user = { plants: false, premium: true, plants: true };
  const { isUser, getProfile, userLoggedIn } = useContext(AuthContext);
  const {
    language,
    toggleLanguage,
    toggleCurrency,
    convertCurrency,
    currency,
  } = useContext(LangContext);

  const handleUpdate = () => {
    setToggle(!toggle);
    console.log(toggle);
    // if (!toggle && values.aboutUs !== "") {
    //   patchUser(values, userLoggedIn.username);
    // }
  };

  useEffect(() => {
    setDefaults();
  }, []);

  // const LanguageButton = () => {};
  // const translateContent = (update) => {
  //   <TranslatedContent contentID="hello" />;
  // }

  return (
    <div>
      <Grid className="account-grid" rowSpacing={2} container spacing={2}>
        <Grid xs={8}>
          <Item>
            <TranslatedContent contentID="membership" />
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <WorkspacePremiumIcon
              className={
                userLoggedIn.premium == true ? "selected" : "unselected"
              }
              onClick={handleUpdate}
            ></WorkspacePremiumIcon>
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <SentimentDissatisfiedIcon
              className={
                userLoggedIn.premium == true ? "unselected" : "selected"
              }
            ></SentimentDissatisfiedIcon>
          </Item>
        </Grid>
        {/* <Grid xs={8}>
          <Item>Add/remove listing: </Item>
        </Grid> */}
        {/* <Grid xs={2}>
          <Item>
            <Link to={"/addplant"}>
              <AddCircleOutlineIcon className="unselected"></AddCircleOutlineIcon>
            </Link>
            ;
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <RemoveCircleOutlineIcon
              className={user.plants == false ? "not-possible" : "unselected"}
            ></RemoveCircleOutlineIcon>
          </Item>
        </Grid> */}
        <Grid xs={8}>
          <Item>
            <TranslatedContent contentID="changeCoverAvatar" />
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <WallpaperIcon></WallpaperIcon>
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <AccountCircleIcon></AccountCircleIcon>
          </Item>
        </Grid>
      </Grid>
      {/* <TranslatedContent> */}
      <Button color="success" variant="outlined" className="update-changes">
        <TranslatedContent contentID="update" />
      </Button>
      {/* </TranslatedContent> */}
      <p>
        <TranslatedContent contentID="hello" />
      </p>
      <Button color="success" variant="outlined" onClick={toggleLanguage}>
        {language}
      </Button>
      <Button color="secondary" variant="outlined" onClick={toggleCurrency}>
        {currency}
      </Button>
      <h2>{currency}</h2>
      <h2>{convertCurrency(110)}</h2>
    </div>
  );
}

export default Account;
