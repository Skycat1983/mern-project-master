import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Paper, TextField } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import "./Reviews.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

const Comments = (commentsfor) => {
  // const [rating, setRating] = useState(0);
  const { getProfile, userLoggedIn, logout, isUser } = useContext(AuthContext);

  const getAverageScore = (rating) => {
    console.log("rating", rating);
    // console.log("commentsfor", commentsfor);
    // commentsfor.commentsfor.forEach((item) => {
    //   console.log(item.rating);
  };

  const leaveReview = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("text", "user is bad");
    urlencoded.append("rating", "1");
    urlencoded.append("author", "639092c8d513889bf1ec6ad8");
    urlencoded.append("target", "6391b6d95b4e2a898a404c60");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:5001/api/comments/create/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      {commentsfor &&
        commentsfor?.commentsfor.map((comment) => {
          return (
            <Paper>
              {getAverageScore(comment.rating)}
              <Typography
                sx={{ m: 5, width: "29ch" }}
                variant="body1"
                gutterBottom
              >
                {comment.text}
              </Typography>
              <div className="star-div-comments-for">
                <StarIcon />
                {comment.rating >= 2 ? <StarIcon /> : <StarBorderIcon />}
                {comment.rating >= 3 ? <StarIcon /> : <StarBorderIcon />}
                {comment.rating >= 4 ? <StarIcon /> : <StarBorderIcon />}
                {comment.rating >= 5 ? <StarIcon /> : <StarBorderIcon />}
              </div>
            </Paper>
          );
        })}
      <Paper className="review-box">
        <TextField
          id="outlined-multiline-flexible"
          label="leave a review of this seller"
          multiline
          maxRows={4}
          sx={{ m: 4, width: "26ch" }}
          // value={value}
          // onChange={handleChange}
        />
        <div className="star-div">
          <StarBorderIcon />
          <StarBorderIcon />
          <StarBorderIcon />
          <StarBorderIcon />
          <StarBorderIcon />
        </div>
        <Button
          className="submit-review"
          variant="contained"
          color="success"
          component="label"
          onClick={leaveReview}
        >
          SUBMIT
        </Button>
      </Paper>
    </Box>
  );
};

export default Comments;
