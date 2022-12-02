import React from "react";
import { useForm, Form } from "../Components/useForm";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import Radio from "@mui/material/Radio";

import MyRadioGroup from "../Components/controls/MyRadioGroup";
import MyControls from "../Components/controls/MyControls";
import { useContext, useEffect, useState } from "react";
import MyInputs from "../Components/controls/MyInputs";
import Button from "@mui/material/Button";
import useFetch from "../Hooks/useFetch";

// todo: useFetch custom hook instead

const initialValues = {
  genus: "",
  price: "",
  rooted: "",
  topCutting: "",
  varigation: "",
};

const MyAccount = () => {
  const [selectedFiles, setSelectedFiles] = useState([{}]);
  const [urls, setUrls] = useState({});
  const [newPost, setNewPost] = useState({});
  const { values, setValues, handleInputChange } = useForm(initialValues);

  useEffect(() => {
    //? confused why this returns empty?
    console.log("URLS", values);
  }, [urls, values]);

  const handleUpload = (e) => {
    setSelectedFiles(e.target);
    console.log(e.target.files);
  };

  const uploadImages = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", selectedFiles.files[0]);
    formdata.append("image", selectedFiles.files[1]);
    formdata.append("image", selectedFiles.files[2]);

    //! this does not work. why?
    // for (let i = 0; i < selectedFiles.length; i++) {
    //   formdata.append("image", selectedFiles.files[i]);
    // }

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
    console.log(setUrls(result.urls));
    console.log("urls", urls);

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
    urlencoded.append("genus", values.genus);
    urlencoded.append("varigation", values.varigation);
    urlencoded.append("price", values.price);
    urlencoded.append("rooted", values.rooted);
    urlencoded.append("topcutting", values.topCutting);
    urlencoded.append("imageUrls", urls);

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
      <div>MyAccount</div>
      <h1>new plant listing</h1>
      <img src={selectedFiles} alt="new" />

      <form>
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
      </Button>
    </>
  );
};

export default MyAccount;
