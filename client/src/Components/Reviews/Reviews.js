import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  FormControlLabel,
  FormLabel,
  FormControl,
  Paper,
  TextField,
  RadioGroup,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import "./Reviews.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { useForm, ReviewForm } from "../../Hooks/useForm";
import MyControls from "../controls/MyControls";
import MyRadioGroup from "../controls/MyRadioGroup";
import Radio from "@mui/material/Radio";
import DeleteIcon from "@mui/icons-material/Delete";

const initialValues = {
  text: "",
  rating: "",
};

const Comments = (data) => {
  const [rating, setRating] = useState(0);
  const { getProfile, userLoggedIn, logout, isUser } = useContext(AuthContext);
  const { values, setValues, handleInputChange, handleSubmit } =
    useForm(initialValues);

  const getAverageScore = (rating) => {
    // console.log("rating", rating);
    // console.log("commentsfor", commentsfor);
    // commentsfor.commentsfor.forEach((item) => {
    //   console.log(item.rating);
  };

  const leaveReview = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("text", values.text);
    urlencoded.append("rating", values.rating);
    urlencoded.append("author", userLoggedIn.id);
    urlencoded.append("target", data.data._id);

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

  console.log("data", data);

  useEffect(() => {
    getProfile();
    console.log("userLoggedIn", userLoggedIn);
  }, []);

  const handleDelete = () => {
    console.log("delete comment");
  };

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <h4>{data?.data?.commentsfor.length} people left a review</h4>

      {data &&
        data?.data?.commentsfor?.map((comment) => {
          return (
            <Paper>
              {userLoggedIn.id === comment.author && (
                <DeleteIcon
                  className="delete-icon"
                  onClick={handleDelete}
                ></DeleteIcon>
              )}

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
      <ReviewForm>
        <Paper className="review-box">
          <MyControls.MyTextbox
            id="outlined-multiline-flexible"
            label="leave a review of this seller"
            variant="standard"
            name="text"
            value={values.text}
            onChange={handleInputChange}
            sx={{ m: 4, width: "26ch" }}
          />

          <div className="star-div">
            {/* {rating >= 1 ? (
            <StarIcon onClick={handleClick(1)} />
          ) : (
            <StarBorderIcon onClick={handleClick(1)} />
          )}
          {rating >= 2 ? (
            <StarIcon onClick={handleClick(2)} />
          ) : (
            <StarBorderIcon onClick={handleClick(2)} />
          )}
          {rating >= 3 ? (
            <StarIcon onClick={handleClick(3)} />
          ) : (
            <StarBorderIcon onClick={handleClick(3)} />
          )}
          {rating >= 4 ? (
            <StarIcon onClick={handleClick(4)} />
          ) : (
            <StarBorderIcon onClick={handleClick(4)} />
          )}
          {rating >= 5 ? (
            <StarIcon onClick={handleClick(5)} />
          ) : (
            <StarBorderIcon onClick={handleClick(5)} />
          )} */}
            <FormControl>
              <FormLabel>Rating</FormLabel>
              <RadioGroup
                row={true}
                // label="rating"
                name="rating"
                value={values.rating}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  name="rating"
                  value="1"
                  control={<Radio />}
                  label="1"
                />
                <FormControlLabel
                  name="rating"
                  value="2"
                  control={<Radio />}
                  label="2"
                />
                <FormControlLabel
                  name="rating"
                  value="3"
                  control={<Radio />}
                  label="3"
                />
                <FormControlLabel
                  name="rating"
                  value="4"
                  control={<Radio />}
                  label="4"
                />
                <FormControlLabel
                  name="rating"
                  value="5"
                  control={<Radio />}
                  label="5"
                />
              </RadioGroup>
            </FormControl>
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
      </ReviewForm>
    </Box>
  );
};

export default Comments;
