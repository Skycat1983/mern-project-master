import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import "./views.css";

const array = [
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

function Game() {
  const [nextSubject, setNextSubject] = useState([]);
  const [nextReference, setNextReference] = useState([]);

  useEffect(() => {
    console.log("next subject, nxt reference", nextSubject, nextReference);
    // merge();
    // return () => {
    //   second
    // }
  }, [nextReference]);

  function merge(left, right) {
    console.log("merge left", left);
    console.log("merge right", right);

    let arr = [];
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
      // Pick the smaller among the smallest element of left and right sub arrays
      if (left[0] < right[0]) {
        arr.push(left.shift());
      } else {
        arr.push(right.shift());
      }
    }
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [...arr, ...nextSubject, ...nextReference];
  }

  function mergeSort(array) {
    const half = array.length / 2;

    // Base case or terminating case
    if (array.length < 2) {
      return array;
    }

    const left = array.splice(0, half);
    // setNextQuestion();
    console.log("left", left);
    console.log("array", array);
    //? possibly want to set a useState here to pause the process?
    // return merge(mergeSort(left), mergeSort(array));
    return setNextSubject([left]), setNextReference([array]);
  }

  console.log(mergeSort(array));
  // console.log(setNextQuestion(mergeSort(array)));

  return (
    <div>
      <Typography className="title">GAME:</Typography>

      <Button
        onClick={(merge(nextReference), merge(nextSubject))}
        className="worse"
      >
        worse
      </Button>
      <Button
        onClick={(merge(nextSubject), merge(nextReference))}
        className="better"
      >
        better
      </Button>
      <Typography className="game">
        is {nextSubject} better or worse than {nextReference}
      </Typography>
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
