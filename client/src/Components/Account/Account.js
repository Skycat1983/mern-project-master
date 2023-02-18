import React, { useState, useContext, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "./Account.css";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { AuthContext } from "../../Contexts/AuthContext";
import { LangContext } from "../../Contexts/LangContext.js";
import TranslatedContent from "../TranslatedContent";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

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
  const [membership, setMembership] = React.useState();
  const [randomInt, setRandomInt] = useState(0);
  const [defaults, setDefaults] = useState();
  const [startingValues, setStartingValues] = useState({});
  const user = { plants: false, premium: true, plants: true };
  const { isUser, getProfile, userLoggedIn } = useContext(AuthContext);
  const {
    language,
    toggleLanguage,
    handleCurrency,
    handleLanguage,
    convertCurrency,
    patchAccount,
    currency,
  } = useContext(LangContext);
  const { _id } = userLoggedIn.id;

  const handleUpdate = () => {
    setToggle(!toggle);
    console.log(toggle);
    // if (!toggle && values.aboutUs !== "") {
    //   patchUser(values, userLoggedIn.username);
    // }
  };

  console.log("userLoggedIn", userLoggedIn);

  useEffect(() => {
    let membershipDefault = "";
    let currencyDefault = "";
    let languageDefault = "";

    if (userLoggedIn.premium == true) {
      setMembership("premium");
    } else {
      setMembership("basic");
    }
    if (userLoggedIn.premium == true) {
      membershipDefault = "premium";
    } else {
      membershipDefault = "basic";
    }
    if (userLoggedIn.currency == "euros") {
      currencyDefault = "euros";
    } else {
      currencyDefault = "euros";
    }
    if (userLoggedIn.language == "german") {
      languageDefault = "german";
    } else {
      languageDefault = "english";
    }
    console.log("membership", membership);
    setDefaults({
      premium: membershipDefault,
      currency: currencyDefault,
      language: languageDefault,
    });
    console.log("DEFAULTS", defaults);
  }, []);

  const handleRandom = () => {
    getRnd(0, 10);
  };

  const getRnd = (min, max) => {
    let result = Math.floor(Math.random() * (max - min)) + min;
    setRandomInt(result);
    // return Math.floor(Math.random() * (max - min)) + min;
  };

  const handleMembership = (event, newMembership) => {
    if (newMembership !== null) {
      setMembership(newMembership);
    }
  };

  const handleUpdateAccount = () => {
    // console.log(`${userLoggedIn.id}`);
    patchAccount(membership, currency, language, `${userLoggedIn.id}`);
  };

  return (
    <Paper className="account-box">
      {/* <div> */}
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
        <Grid>
          {/* <Item> */}
          <ToggleButtonGroup
            value={membership}
            exclusive
            onChange={handleMembership}
            aria-label="membership"
          >
            <ToggleButton value="premium">
              <WorkspacePremiumIcon
                className={membership == "premium" ? "selected" : "unselected"}
                aria-label="premium"
              />
            </ToggleButton>
            <ToggleButton value="basic">
              <SentimentDissatisfiedIcon
                className={membership !== "premium" ? "selected" : "unselected"}
                aria-label="basic"
              />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid xs={8}>
          <Item>
            <TranslatedContent contentID="defaultCurrency" />
          </Item>
        </Grid>
        <Grid>
          <ToggleButtonGroup
            value={currency}
            exclusive
            onChange={handleCurrency}
            aria-label="currency"
          >
            <ToggleButton value="pounds">
              <CurrencyPoundIcon
                className={currency !== "euros" ? "selected" : "unselected"}
                aria-label="pounds"
              />
            </ToggleButton>
            <ToggleButton value="euros">
              <EuroIcon
                className={currency == "euros" ? "selected" : "unselected"}
                aria-label="euros"
              />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid xs={8}>
          <Item>
            <TranslatedContent contentID="language" />
          </Item>
        </Grid>
        <Grid>
          <ToggleButtonGroup
            value={language}
            exclusive
            onChange={handleLanguage}
            aria-label="language"
          >
            <ToggleButton value="english">
              <img
                src={`https://img.icons8.com/color/512/england.png`}
                className="fact-icons"
                aria-label="english"
              />
            </ToggleButton>
            <ToggleButton value="german">
              <img
                src={`https://img.icons8.com/color/512/germany.png`}
                className="fact-icons"
                aria-label="german"
              />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>

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
      <Button
        color="success"
        variant="outlined"
        className="update-changes"
        onClick={handleUpdateAccount}
      >
        <TranslatedContent contentID="update" />
      </Button>
    </Paper>
  );
}

export default Account;
