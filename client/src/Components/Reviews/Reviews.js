import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  FormControlLabel,
  FormLabel,
  FormControl,
  Paper,
  // TextField,
  RadioGroup,
  // inputAdornmentClasses,
  // useFormControl,
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
// import MyRadioGroup from "../controls/MyRadioGroup";
import Radio from "@mui/material/Radio";
// import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";
// import { convertLength } from "@mui/material/styles/cssUtils";
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
  // const { focused } = useFormControl() || {};
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

  // const getAverage = () => {
  //   for (let i = 0; i < data?.data?.commentsfor.length; i++) {
  //     if (data?.data?.commentsfor[i] !== 0) toAverage.push(5);
  //     console.log(a[i]);
  //   }
  // };

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
            {
              {
                /* let i = [0];
              toAverage.push(comment.rating); */
              }

              {
                /* if (data.data.commentsfor[i] == data.data.commentsfor.length - 1) {
              const sum = toAverage.reduce(
                (accumulator, value) => accumulator + value,
                0
              );
              const userAverage = sum / toAverage.length || 0;
              setAverage(userAverage);
              {
                setAverage(`${sum / toAverage.length || 0}`);
              }
            } */
              }
            }

            return (
              <Paper key={index}>
                {userLoggedIn?.id == comment?.author && (
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
            {/* <h6 position="absolute">signed in as:</h6> */}
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
              {/* <FormControl> */}
              {/* <FormLabel>Rating</FormLabel>
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
                  > */}
              <IconButton>
                <StarBorderIcon>
                  {/* <FormControlLabel
                          name="rating"
                          value="1"
                          control={<Radio />}
                          label="1"
                        /> */}
                </StarBorderIcon>
              </IconButton>
              <IconButton
              // onClick={handleStarClick}
              >
                <StarBorderIcon onClick={handleStarClick} />
              </IconButton>
              {/* </FormControlLabel> */}
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
              {/* </RadioGroup> */}
              {/* </FormControl> */}
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
