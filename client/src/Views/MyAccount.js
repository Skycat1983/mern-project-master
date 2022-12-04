import React from "react";
import { useForm, Form, XLForm } from "../Hooks/useForm";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, FormLabel, RadioGroup, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import MyRadioGroup from "../Components/controls/MyRadioGroup";
import MyControls from "../Components/controls/MyControls";
import { useContext, useEffect, useState } from "react";
import MyInputs from "../Components/controls/MyInputs";
import Button from "@mui/material/Button";
import useFetch from "../Hooks/useFetch";
import NavBar from "../Components/Navbar/NavBar.js";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import "./views.css";
import Box from "@mui/material/Box";
import temp from "../assets/temp/temp3.png";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ButtonBase from "@mui/material/ButtonBase";

// todo: useFetch custom hook instead

const initialValues = {
  aboutus: "",
};

const MyAccount = () => {
  const [selectedFile, setSelectedFile] = useState([{}]);
  const [url, setUrl] = useState({});

  //! protected route
  const user = {
    username: "the plant seller",
    // aboutus: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  };
  const data = { user: { plants: { genus: "monstera", price: 40 } } };
  const { values, setValues, handleInputChange } = useForm(initialValues);

  const handleUpload = (e) => {
    setSelectedFile(e.target);
    console.log(e.target.file);
  };

  const uploadAvatar = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", selectedFile.file[0]);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5001/api/plants/uploadimage",
      requestOptions
    );
    const result = await response.json();
    console.log("result :>> ", result);
    console.log(setUrl(result.url));
    console.log("url", url);

    // fetch("http://localhost:5001/api/plants/uploadimage", requestOptions)
    //   .then((response) => response.text()) //! or .json
    //   .then((result) => console.log("result>>", result))
    //   .then((result) => setUrls(result))
    //   .catch((error) => console.log("error", error));

    // setNewPost({...newPost, imageUrls: result})
  };

  const submitListing = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("imageUrl", url);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    // const response = await fetch(
    //   "http://localhost:5001/api/plants/create",
    //   requestOptions
    // );
    // const result = await response.json();
    // console.log("result :>> ", result);
    // console.log(setUrls(result));
    // console.log("urls", urls);

    fetch("http://localhost:5001/api/plants/create", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <NavBar />
      <div className="below-nav">
        <div className="gradient-div">
          <h5 className="welcome-back-header">welcome back, {user.username}</h5>
        </div>

        <Box
          sx={{
            p: 2,
            margin: 2,
            marginTop: 10,
          }}
        >
          <Typography variant="h6" gutterBottom>
            about us
          </Typography>
          {user.aboutus ? (
            <Typography variant="body1" gutterBottom>
              {user.aboutus} <EditIcon />
            </Typography>
          ) : (
            <XLForm>
              <TextField
                id="outlined-multiline-flexible"
                label="about us"
                name="aboutUs"
                multiline
                maxRows={4}
                value={values.aboutUs}
                onChange={handleInputChange}
              />
            </XLForm>
          )}
        </Box>
        <input
          className="file-picker"
          type="file"
          name="file"
          multiple="multiple"
          id="file"
          onChange={handleUpload}
        />

        <Button
          fullWidth={true}
          variant="contained"
          color="success"
          onClick={uploadAvatar}
        >
          Upload image
        </Button>

        <XLForm></XLForm>

        {/* <Grid>
          {data &&
            data?.user?.plants?.map((item) => {
              return (
                <Paper
                  className="profile-plant-items"
                  sx={{
                    p: 2,
                    margin: 2,
                    maxWidth: 300,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase sx={{ width: 100, height: 100 }}>
                        <CardMedia
                          component="img"

                          width="10"
                          image={temp}
                          alt="user pic"
                        />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            {item.genus}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Family • AROID
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            listed: {item.createdAt}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <FavoriteBorderIcon />
      
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" component="div">
                          £{item.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })}
        </Grid> */}

        {/* <img src={selectedFiles} alt="new" /> */}

        {/* <form>
          <input
            type="file"
            name="file"
            multiple="multiple"
            id="file"
            onChange={handleUpload}
          />
          <Button variant="contained" color="success" onClick={uploadImages}>
            Upload image
          </Button>
        </form>
        <Form>
          <MyControls.MyInputs
            label="genus"
            name="genus"
            value={values.genus}
            onChange={handleInputChange}
          />
          <MyControls.MyInputs
            label="price"
            name="price"
            value={values.price}
            onChange={handleInputChange}
          />
          <FormControl>
            <FormLabel>Rooted</FormLabel>
            <RadioGroup
              row={true}
              name="rooted"
              value={values.rooted}
              onChange={handleInputChange}
            >
              <FormControlLabel
                name="rooted"
                value="true"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                name="rooted"
                value="false"
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Top cutting</FormLabel>
            <RadioGroup
              row={true}
              name="topCutting"
              value={values.topCutting}
              onChange={handleInputChange}
            >
              <FormControlLabel
                name="topCutting"
                value="true"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                name="topCutting"
                value="false"
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Varigation</FormLabel>
            <RadioGroup
              row={true}
              name="varigation"
              value={values.varigation}
              onChange={handleInputChange}
            >
              <FormControlLabel
                name="varigation"
                value="true"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                name="varigation"
                value="false"
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Form>
        <Button
          fullWidth={true}
          variant="contained"
          component="label"
          onClick={submitListing}
        >
          LIST PLANT
        </Button> */}
      </div>
    </>
  );
};

export default MyAccount;
