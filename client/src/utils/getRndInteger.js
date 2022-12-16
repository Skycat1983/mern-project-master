// import React, { useState, useContext, useEffect } from "react";

export const getRndInteger = (min, max) => {
  // const [randomInt, setRandomInt] = useState();

  let result = Math.floor(Math.random() * (max - min)) + min;
  // setRandomInt(result);
  return result;
  // return Math.floor(Math.random() * (max - min)) + min;
};
