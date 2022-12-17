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
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import IconButton from "@mui/material/IconButton";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body1,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const initialValues = {
  membership: "",
};

function Account() {
  const [toggle, setToggle] = useState(true);
  const [membership, setMembership] = useState("");
  const [randomInt, setRandomInt] = useState(0);
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
    if (userLoggedIn.premium == true) {
      setMembership("premium");
    } else {
      setMembership("basic");
    }
    console.log("membership", membership);
  }, []);

  // const LanguageButton = () => {};
  // const translateContent = (update) => {
  //   <TranslatedContent contentID="hello" />;
  // }

  const handleRandom = () => {
    getRnd(0, 10);
  };

  const getRnd = (min, max) => {
    let result = Math.floor(Math.random() * (max - min)) + min;
    setRandomInt(result);
    // return Math.floor(Math.random() * (max - min)) + min;
  };

  function toggleMembership() {
    setMembership((membership) =>
      membership === "basic" ? "premium" : "basic"
    );
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };

  return (
    <Paper className="review-box">
      <div>
        <Grid
          className="account-grid"
          alignItems="center"
          rowSpacing={3}
          container
          spacing={2}
        >
          <Grid xs={8}>
            <Item>
              <TranslatedContent contentID="membership" />
            </Item>
          </Grid>
          <Grid xs={2}>
            <Item>
              <WorkspacePremiumIcon
                className={membership == "premium" ? "selected" : "unselected"}
                // className={
                //   userLoggedIn.premium == true ? "selected" : "unselected"
                // }
                onClick={toggleMembership}
                // onClick={handleUpdate}
              ></WorkspacePremiumIcon>
            </Item>
          </Grid>
          <Grid xs={2}>
            <Item>
              <SentimentDissatisfiedIcon
                className={
                  userLoggedIn.premium == true ? "unselected" : "selected"
                }
                onClick={handleUpdate}
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
        <Button color="success" variant="outlined" className="update-changes">
          <TranslatedContent contentID="update" />
        </Button>
        <p>
          <TranslatedContent contentID="hello" />
        </p>
        <Button color="success" variant="outlined" onClick={toggleLanguage}>
          {language}
        </Button>
        <Button color="secondary" variant="outlined" onClick={toggleCurrency}>
          {currency}
        </Button>
        <Button color="error" variant="outlined" onClick={handleRandom}>
          getRandomNumber
        </Button>
        <h2>{currency}</h2>
        <h2>{convertCurrency(110)}</h2>
        <h2>random number: {randomInt}</h2>
      </div>
    </Paper>
  );
}

export default Account;
