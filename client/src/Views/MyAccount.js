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

//! THE PROBLEMS:
// - can't select multiple files
// - nothing happens when i click upload
// - see plantController: images array only showing one url?
// - if a solution can be found, what could or should i have done to find this solution alone?

const MyAccount = () => {
  const [selectedFile, setSelectedFile] = useState([{}]);

  const { values, setValues, handleInputChange } = useState(initialValues);

  const submitForm = async (e) => {
    console.log("in submit form");
    // const urlsArray = [];
    e.preventDefault();
    const formdata = new FormData();
    for (let i = 0; i < selectedFile.length; i++) {
      formdata.append("image", selectedFile[i]);
    }

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
    console.log("result", result);
  };

  return (
    <>
      <div>MyAccount</div>
      <h1>new plant listing</h1>

      <form>
        <input type="file" name="file" multiple="multiple" id="file" />
        <Button variant="contained" color="success" onClick={submitForm}>
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
            value={values.varigation}
            onChange={handleInputChange}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
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
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
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
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Form>
    </>
  );
};

export default MyAccount;

// const [url, setUrl] = useState("");
// const [user, setUser] = useState(true);
// const { values, setValues, handleInputChange } = useState(initialValues);
// const { data, isLoading, error } = useFetch(url);

// const handleUpload = (e) => {
//   setSelectedFile(e.target.files[0]);
// };

// const uploadPicture = async (e) => {
//   e.preventDefault();
//   var formdata = new FormData();
//   formdata.append("image", selectedFile);

//   const requestOptions = {
//     method: "POST",
//     body: formdata,
//     redirect: "follow",
//   };
//   try {
//     const response = await fetch(
//       "http://localhost:5001/api/users/imageupload",
//       requestOptions
//     );
//     const result = await response.json();
//     console.log("result", result);
//     setNewUser({ ...newUser, avatarPicture: result.image });
//   } catch (error) {
//     console.log("error :>> ", error);
//   }
// };

// const handleImageUpload = () => {
//   setUrl("http://localhost:5001/api/plants/uploadimage");
// };
