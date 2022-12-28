import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import "./views.css";

const letters = [
  "c",
  "f",
  "a",
  "e",
  "d",
  "b",
  "g",
  "i",
  "n",
  "l",
  "k",
  "w",
  "j",
  "o",
  "t",
  "q",
  "r",
  "z",
  "p",
  "u",
  "v",
  "m",
  "y",
  "x",
  "s",
];

const pairs = {};

// STEP1: create first pair
// STEP2: create second pair
// STEP3: compare pairs

function Game() {
  const [nextLetters, setNextLetters] = useState([0]);
  const [nextReference, setNextReference] = useState([1]);
  let bool = true;

  const getLetter = (letters) => {
    return letters[nextLetters];
  };

  const getReference = (letters) => {
    return letters[nextReference];
  };

  function swipeBetter(letter) {
    bool = !bool;
    console.log(bool);
    console.log("clicked better");
  }

  function swipeWorse(letter) {
    bool = !bool;
    console.log(bool);
    console.log("clicked worse");
  }

  console.log("letters>>>", letters);
  console.log("next letters", nextLetters);
  console.log("next reference", nextReference);
  console.log("letters [0]", letters[0]);
  console.log("get letters", getLetter(letters));
  console.log("bool", bool);
  console.log("bool", bool);

  return (
    <div>
      <Typography className="title">GAME:</Typography>

      <Button onClick={swipeWorse} className="worse">
        worse
      </Button>
      <Button onClick={swipeBetter} className="better">
        better
      </Button>
      <Typography className="game">
        is {getLetter(letters)} better or worse than {getReference(letters)}
      </Typography>
      {/* <Typography className="reference">
        better or worse than {getReference(letters)}
      </Typography> */}
    </div>
  );
}

export default Game;

// function alphabetize(letters) {
//   for (let i = 0; i < letters.length; i++) {}
// }

//!
//  const letters = new Array([
//    c,
//    f,
//    a,
//    e,
//    d,
//    b,
//    g,
//    i,
//    n,
//    l,
//    k,
//    w,
//    j,
//    o,
//    t,
//    q,
//    r,
//    z,
//    p,
//    u,
//    v,
//    m,
//    y,
//    x,
//    s,
//  ]);

// const [order, setOrder] = useState([
//   c,
//   f,
//   a,
//   e,
//   d,
//   b,
//   g,
//   i,
//   n,
//   l,
//   k,
//   w,
//   j,
//   o,
//   t,
//   q,
//   r,
//   z,
//   p,
//   u,
//   v,
//   m,
//   y,
//   x,
//   s,
// ]);
