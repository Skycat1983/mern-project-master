import { useState, createContext, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../Hooks/useForm.js";
import { translations } from "../utils/translations";
import getToken from "../utils/getToken.js";
import { AuthContext } from "./AuthContext.js";
import * as React from "react";

export const LangContext = createContext(translations.english);

export const LangContextProvider = (props) => {
  const [language, setLanguage] = useState("english");
  const [currency, setCurrency] = useState("");
  const [euroToPoundRate, setEuroToPoundRate] = useState(0.86);
  const [poundToEuroRate, setPoundToEuroRate] = useState(1.16);
  const { server } = useContext(AuthContext);
  function toggleLanguage() {
    setLanguage((language) => (language === "english" ? "german" : "english"));
  }
  // function toggleCurrency() {
  //   setCurrency((currency) => (currency === "£" ? "€" : "£"));
  // }
  function convertCurrency(money) {
    let convertedMoney = "";
    if (currency == "euros") {
      convertedMoney = money * poundToEuroRate;
    } else {
      convertedMoney = money * euroToPoundRate;
    }
    return Math.round(convertedMoney * 100) / 100;
  }

  const handleCurrency = (event, newCurrency) => {
    if (newCurrency !== null) {
      setCurrency(newCurrency);
    }
  };

  const handleLanguage = (event, newLanguage) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
    }
  };

  const patchAccount = (membership, currency, language, id) => {
    let premium = [];
    if (membership == "premium") {
      premium = true;
    } else {
      premium = false;
    }
    console.log(
      "premium, currency, language, id",
      premium,
      currency,
      language,
      id
    );
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("premium", premium);
    urlencoded.append("currency", currency);
    urlencoded.append("language", language);
    urlencoded.append("id", id);

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    fetch(`${server}/api/users/update/account`, requestOptions)
      // fetch("http://localhost:5001/api/users/update/account", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <LangContext.Provider
      value={{
        toggleLanguage,
        language,
        // toggleCurrency,
        handleCurrency,
        handleLanguage,
        convertCurrency,
        patchAccount,
        currency,
      }}
    >
      {props.children}
    </LangContext.Provider>
  );
};
