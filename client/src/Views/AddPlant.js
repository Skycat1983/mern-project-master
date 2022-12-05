import React from "react";
import { useForm, Form, XLForm, PlantForm } from "../Hooks/useForm";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, FormLabel, RadioGroup, TextField } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import background from "../assets/backgrounds/photos/wetleafclose.jpg";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Radio from "@mui/material/Radio";
import MyRadioGroup from "../Components/controls/MyRadioGroup";
import MyControls from "../Components/controls/MyControls";
import { useContext, useEffect, useState } from "react";
import MyInputs from "../Components/controls/MyInputs";
import Button from "@mui/material/Button";
import useFetch from "../Hooks/useFetch";
import NavBar from "../Components/Navbar/NavBar.js";
import EditIcon from "@mui/icons-material/Edit";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./views.css";
import UploadIcon from "@mui/icons-material/Upload";
import CreateIcon from "@mui/icons-material/Create";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./views.css";

// todo: useFetch custom hook instead
const steps = [
  {
    label: "UPLOAD PICTURES",
    description: `Choose good ones; they will help your listing stand out from the crowd. The maximum number is 3`,
  },
  {
    label: "CUTTING DETAILS",
    description:
      "This information is useful to potential buyers. Please choose from the options available",
  },
  {
    label: "ADDITIONAL INFO",
    description: `Almost done. Anything else that might be relevant goes here. Click the button to finish`,
  },
];
const initialValues = {
  genus: "",
  price: "",
  rooted: "",
  topCutting: "",
  varigation: "",
};

const AddPlant = () => {
  const [selectedFiles, setSelectedFiles] = useState([{}]);
  const [urls, setUrls] = useState({});
  const [newPost, setNewPost] = useState({});
  const { values, setValues, handleInputChange } = useForm(initialValues);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  console.log("activeStep", activeStep);

  return (
    <>
      {/* <NavBar /> */}
      <img src={background} className="background-image2" alt="" />
      <div className="below-nav">
        <PlantForm>
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              height: 40,
              // tp: 50,
              pl: 2,
              bgcolor: "background.default",
            }}
          >
            <Typography>{steps[activeStep].label}</Typography>
          </Paper>
          <Box sx={{ height: 100, maxWidth: 400, width: "100%", p: 0 }}>
            {steps[activeStep].description}
          </Box>
          {activeStep == 0 && (
            <input
              className="file-picker"
              type="file"
              name="file"
              multiple="multiple"
              id="file"
              onChange={handleUpload}
            />
          )}
          {activeStep == 0 && (
            <Skeleton
              variant="rounded"
              // width={210}
              height={90}
            />
          )}
          {activeStep == 0 && (
            <Button
              fullWidth={true}
              variant="contained"
              color="success"
              onClick={uploadImages}
            >
              Upload image
            </Button>
          )}
          {activeStep == 1 && (
            <MyControls.MyInputs
              label="genus"
              name="genus"
              value={values.genus}
              onChange={handleInputChange}
            />
          )}

          {activeStep == 1 && (
            <MyControls.MyInputs
              label="price"
              name="price"
              value={values.price}
              onChange={handleInputChange}
            />
          )}

          {activeStep == 1 && (
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
          )}

          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
          {urls ? (
            <MyControls.MyInputs
              label="genus"
              name="genus"
              value={values.genus}
              onChange={handleInputChange}
            />
          ) : (
            <TextField disabled></TextField>
          )}
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
          <Button
            fullWidth={true}
            variant="contained"
            component="label"
            onClick={submitListing}
          >
            LIST PLANT
          </Button>
        </PlantForm>
      </div>
    </>
  );
};

export default AddPlant;
