import { useState, createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../Hooks/useForm.js";
import { translations } from "../utils/translations";
import getToken from "../utils/getToken.js";
import * as React from "react";

export const LangContext = createContext(translations.english);

export const LangContextProvider = (props) => {
  const [language, setLanguage] = useState("english");
  const [currency, setCurrency] = useState("£");
  const [euroToPoundRate, setEuroToPoundRate] = useState(0.86);
  const [poundToEuroRate, setPoundToEuroRate] = useState(1.16);

  function toggleLanguage() {
    setLanguage((language) => (language === "english" ? "german" : "english"));
  }
  function toggleCurrency() {
    setCurrency((currency) => (currency === "£" ? "€" : "£"));
  }
  function convertCurrency(money) {
    let convertedMoney = "";
    if (currency == "£") {
      convertedMoney = money * euroToPoundRate;
    } else {
      convertedMoney = money * poundToEuroRate;
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

  return (
    <LangContext.Provider
      value={{
        toggleLanguage,
        language,
        toggleCurrency,
        handleCurrency,
        handleLanguage,
        convertCurrency,
        currency,
      }}
    >
      {props.children}
    </LangContext.Provider>
  );
};
