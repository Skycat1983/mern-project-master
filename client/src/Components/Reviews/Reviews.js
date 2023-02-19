import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  FormControlLabel,
  FormLabel,
  FormControl,
  Paper,
  RadioGroup,
  IconButton,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import "./Reviews.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { LangContext } from "../../Contexts/LangContext.js";
import TranslatedContent from "../TranslatedContent";
import { useForm, ReviewForm } from "../../Hooks/useForm";
import MyControls from "../controls/MyControls";
import Radio from "@mui/material/Radio";
import { useLocation, useNavigate } from "react-router-dom";
import MyModal from "../../Components/MyModal/SummonModal.js";
import ClearIcon from "@mui/icons-material/Clear";

const initialValues = {
  text: "",
  rating: "0",
};

const Comments = (data) => {
  const [average, setAverage] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toAverage = [];
  const {
    getProfile,
    userLoggedIn,
    isUser,
    isModal,
    leaveReview,
    deleteReview,
  } = useContext(AuthContext);
  const { values, setValues, handleInputChange, handleSubmit } =
    useForm(initialValues);

  console.log("data", data);

  useEffect(() => {
    getProfile();
    console.log("userLoggedIn", userLoggedIn);
  }, []);

  const handleDelete = (comment) => {
    console.warn("CLG delete", comment);
    deleteReview(comment);
  };

  const handleClick = () => {
    leaveReview(values, userLoggedIn, data, navigate, location);
  };

  const handleStarClick = () => {
    console.log("star click");
  };

  console.log("toAverage", toAverage);
  return (
    <>
      {isModal && <MyModal></MyModal>}

      <Box
        sx={{
          p: 2,
        }}
      >
        {!isUser}
        <h4>
          {data?.data?.commentsfor.length == 0 ? (
            <TranslatedContent contentID="beTheFirst" />
          ) : data?.data?.commentsfor.length == 1 ? (
            <TranslatedContent contentID="oneReview" />
          ) : (
            <TranslatedContent contentID="manyReviews" />
          )}
        </h4>
        {/* {average && <StarIcon />}
      {average >= 1.4 <StarIcon />}
      <StarBorderIcon />
      <StarBorderIcon />
      <StarBorderIcon />
      <StarBorderIcon /> */}
        {/* <h4>{average}</h4> */}

        {data &&
          data?.data?.commentsfor?.map((comment, index) => {
            return (
              <Paper key={index}>
                {userLoggedIn?.id === comment?.author._id && (
                  <ClearIcon
                    className="delete-icon"
                    onClick={() => `${handleDelete(comment)}`}
                  ></ClearIcon>
                )}
                {/* {getAverageScore(comment.rating)} */}
                <Typography
                  sx={{ m: 5, width: "29ch", fontWeight: "bold" }}
                  variant="body1"
                  gutterBottom
                >
                  {comment.authorusername}
                </Typography>
                <img
                  className="img-tiny-author"
                  src={comment.author.avatar}
                ></img>

                <Typography
                  sx={{ m: 5, width: "29ch", fontStyle: "italic" }}
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
              label={
                userLoggedIn.username == location.state.user ? (
                  <TranslatedContent contentID="cantReviewSelf" />
                ) : !isUser ? (
                  <TranslatedContent contentID="loginToPost" />
                ) : (
                  <TranslatedContent contentID="writeReview" />
                )
              }
              variant="standard"
              name="text"
              value={values.text}
              onChange={handleInputChange}
              sx={{ m: 4, width: "26ch" }}
            />

            <div className="star-div">
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

              <IconButton>
                <StarBorderIcon></StarBorderIcon>
              </IconButton>
              <IconButton>
                <StarBorderIcon onClick={handleStarClick} />
              </IconButton>
              <IconButton>
                <StarBorderIcon />
              </IconButton>
              <IconButton>
                <StarBorderIcon />
              </IconButton>
              <IconButton>
                <StarBorderIcon />
              </IconButton>
              <IconButton>
                <StarBorderIcon />
              </IconButton>
            </div>
            {userLoggedIn?.username == location.state.user || !isUser ? (
              <Button
                disabled
                className="submit-review"
                variant="contained"
                color="success"
                component="label"
                // onClick={handleClick}
              >
                SUBMIT
              </Button>
            ) : (
              <Button
                className="submit-review"
                variant="contained"
                color="success"
                component="label"
                onClick={handleClick}
              >
                SUBMIT
              </Button>
            )}
          </Paper>
        </ReviewForm>
      </Box>
    </>
  );
};

export default Comments;
