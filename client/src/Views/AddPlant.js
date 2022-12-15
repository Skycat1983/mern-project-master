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
import "./views.css";
import CircularProgress from "@mui/material/CircularProgress";
import zIndex from "@mui/material/styles/zIndex";
import { AuthContext } from "../Contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MyModal from "../Components/MyModal/SummonModal.js";
import HomeIcon from "@mui/icons-material/Home";
import { LangContext } from "../Contexts/LangContext.js";
import TranslatedContent from "../Components/TranslatedContent";

// todo: useFetch custom hook instead
const steps = [
  {
    label: "UPLOAD PICTURES",
    description: `Choose good ones; they will help your listing stand out from the crowd. The maximum number is 3`,
  },
  {
    label: "PLANT DETAILS",
    description:
      "Please choose the genus and species of your cutting from the options available",
  },
  {
    label: "CUTTING DETAILS",
    description:
      "This information relates to the specific of your cutting. Please choose from the following options",
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
  // rooted: null,
  // topCutting: null,
  // varigation: null,
};

const AddPlant = () => {
  const { values, setValues, handleInputChange } = useForm(initialValues);
  const {
    isUser,
    getProfile,
    userLoggedIn,
    handleUpload,
    uploadImages,
    isLoading,
    submitListing,
    setUrls,
    urls,
    isModal,
    setIsModal,
  } = useContext(AuthContext);

  useEffect(() => {
    setUrls(false);
    setIsModal(false);
    setValues(initialValues);
  }, []);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;
  const navigate = useNavigate();
  const location = useLocation();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClick = () => {
    submitListing(values, navigate);
  };

  const handleNav = () => {
    navigate("/");
  };

  useEffect(() => {
    console.warn("getting profile in AddPlants");
    getProfile();
    // console.log("userLogin", userLoggedIn);
  }, []);

  //! Is the problem that i am trying to insert objectid (user) onto plant, when this is done via populate?

  // console.log("activeStep", activeStep);

  return (
    <>
      {isModal && <MyModal></MyModal>}
      <HomeIcon className="go-home-icon" onClick={handleNav} />
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
          {/* {activeStep == 0 && urls.length === 0 ? (
            <Skeleton variant="rounded" width={190} height={90} />
          ) : (
            <img
              style={{
                width: 190,
                height: 90,
                objectFit: "cover",
              }}
              // alt={item.title}
              src={urls[0]}
            />
          )} */}

          {activeStep == 0 && !urls && (
            <Skeleton variant="rounded" width={190} height={90} />
          )}
          {activeStep == 0 && urls && (
            <img
              style={{
                width: 190,
                height: 90,
                objectFit: "cover",
              }}
              // alt={item.title}
              src={urls[0]}
            />
          )}

          {isLoading && (
            <CircularProgress
              sx={{
                position: "fixed",
                top: "52vh",
                left: "45vw",
                zIndex: "1000",
              }}
              color="success"
            />
          )}
          {activeStep == 0 && (
            <Button
              fullWidth={true}
              disabled={urls}
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
          {/* {activeStep == 1 && (
            <MyControls.MyInputs
              label="species"
              name="species"
              value={values.species}
              onChange={handleInputChange}
            />
          )} */}

          {activeStep == 2 && (
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
          {activeStep == 2 && (
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
          )}
          {activeStep == 2 && (
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
          )}
          {activeStep == 3 && (
            <MyControls.MyInputs
              label="price"
              name="price"
              value={values.price}
              onChange={handleInputChange}
            />
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
                disabled={
                  activeStep === maxSteps - 1 ||
                  !urls ||
                  (activeStep === 1 && !values.genus) ||
                  (activeStep === 2 &&
                    (!values.rooted ||
                      !values.topCutting ||
                      !values.varigation))
                }
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

          {activeStep == 3 && (
            <Button
              disabled={!values.price}
              fullWidth={true}
              variant="contained"
              color="success"
              component="label"
              onClick={handleClick}
            >
              LIST PLANT
            </Button>
          )}
        </PlantForm>
      </div>
    </>
  );
};

export default AddPlant;
