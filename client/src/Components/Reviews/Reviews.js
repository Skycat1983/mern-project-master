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
  inputAdornmentClasses,
  useFormControl,
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
import { useLocation } from "react-router-dom";
import { convertLength } from "@mui/material/styles/cssUtils";
import MyModal from "../../Components/MyModal/SummonModal.js";
import ClearIcon from "@mui/icons-material/Clear";

const initialValues = {
  text: "",
  rating: "0",
};

const Comments = (data) => {
  // const [rating, setRating] = useState(0);
  // const [rating, setRating] = useState(0);
  const [average, setAverage] = useState(false);
  const location = useLocation();
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

  // function MyLabelText() {
  //   const { focused } = useFormControl() || {};

  //   const helperText = React.useMemo(() => {
  //     if (focused) {
  //       return "This field is being focused";
  //     }

  //     return "Helper text";
  //   }, [focused]);

  //   return <FormHelperText>{helperText}</FormHelperText>;
  // }

  // const labelText = React.useMemo(() => {
  //   if (focused) {
  //     return "but you're still trying...";
  //   } else {
  //     return;
  //     ("no you can't leave a review of yourself");
  //   }

  //   return "Helper text";
  // }, [focused]);

  const handleClick = () => {
    leaveReview(values, userLoggedIn, data);
  };

  console.log(values);
  // const handleClick = () => {
  //   if (values.rating != 0) {
  //     leaveReview();
  //   } else if ((values.rating = 0)) {
  //     // setModalText(your review must contain a rating),
  //     setIsModal(true);
  //   }
  // };

  const clg = (where) => {
    console.log(where);
  };
  // const getAverageScore = () => {};
  // console.warn(toAverage);

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
          {data?.data?.commentsfor.length == 0
            ? "be the first to leave a review of this seller"
            : data?.data?.commentsfor.length == 1
            ? "1 person left a review of this seller"
            : `${data?.data?.commentsfor.length}` +
              " people left a review of this seller"}
        </h4>
        {/* {average && <StarIcon />}
      {average >= 1.4 <StarIcon />}
      <StarBorderIcon />
      <StarBorderIcon />
      <StarBorderIcon />
      <StarBorderIcon /> */}
        <h4>{average}</h4>

        {data &&
          data?.data?.commentsfor?.map((comment) => {
            {
              /* let i = [0];
            toAverage.push(comment.rating);
            if (data.data.commentsfor[i] == data.data.commentsfor.length - 1) {
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

            return (
              <Paper key={comment.id}>
                {userLoggedIn?.id == comment?.author && (
                  <DeleteIcon
                    className="delete-icon"
                    onClick={() => `${handleDelete(comment)}`}
                  ></DeleteIcon>
                )}

                {/* {getAverageScore(comment.rating)} */}
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
            {/* <h6 position="absolute">signed in as:</h6> */}
            <MyControls.MyTextbox
              id="outlined-multiline-flexible"
              label={
                userLoggedIn.username == location.state.user
                  ? "no you can't post a review of yourself "
                  : !isUser
                  ? "login to post a review"
                  : "leave a review of this seller"
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
              <StarBorderIcon />
              <StarBorderIcon />
              <StarBorderIcon />
              <StarBorderIcon />
              <StarBorderIcon />
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
