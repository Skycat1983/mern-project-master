import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import "./views.css";

// Your task is to make a function that can take any non-negative integer as an argument and return it with its digits in descending order. Essentially, rearrange the digits to create the highest possible number.

function Game() {
  const answer = (numbers) => {
    console.log(numbers);

    function myArray(numbers) {
      return numbers.toString().split("").sort().reverse().join("").number();
    }

    console.log(myArray(350461));
    // console.log(numbers.split("").sort().join(""));
  };

  return (
    <div>
      <Typography className="game">{answer(34251)}</Typography>
    </div>
  );
}

export default Game;

//! V1
// const letters = [
//   "c",
//   "f",
//   "a",
//   "e",
//   "d",
//   "b",
//   "g",
//   "i",
//   "n",
//   "l",
//   "k",
//   "w",
//   "j",
//   "o",
//   "t",
//   "q",
//   "r",
//   "z",
//   "p",
//   "u",
//   "v",
//   "m",
//   "y",
//   "x",
//   "s",
// ];

// let pairs = {};

// // STEP1: create first pair
// // STEP2: create second pair
// // STEP3: compare pairs

// function Game() {
//   const [nextLetters, setNextLetters] = useState([0]);
//   const [nextReference, setNextReference] = useState([1]);
//   let bool = true;

//   const getLetter = (letters) => {
//     return letters[nextLetters];
//   };

//   const getReference = (letters) => {
//     return letters[nextReference];
//   };

//   function swipeBetter() {
//     bool = !bool;
//     console.log(bool);
//     console.log("clicked better");

//     pairs.push
//   }

//   function swipeWorse() {
//     bool = !bool;
//     console.log(bool);
//     console.log("clicked worse");
//   }

//   console.log("letters>>>", letters);
//   console.log("next letters", nextLetters);
//   console.log("next reference", nextReference);
//   console.log("letters [0]", letters[0]);
//   console.log("get letters", getLetter(letters));
//   console.log("bool", bool);
//   console.log("bool", bool);

//   return (
//     <div>
//       <Typography className="title">GAME:</Typography>

//       <Button onClick={swipeWorse} className="worse">
//         worse
//       </Button>
//       <Button onClick={swipeBetter} className="better">
//         better
//       </Button>
//       <Typography className="game">
//         is {getLetter(letters)} better or worse than {getReference(letters)}
//       </Typography>
//     </div>
//   );
// }

// export default Game;
