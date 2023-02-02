import { useForm, Form, SignupForm } from "../Hooks/useForm";
import MyControls from "../Components/controls/MyControls";
import { FormControl, FormLabel, RadioGroup, Typography } from "@mui/material";
import background from "../assets/backgrounds/photos/darkleaves.jpg";
import "./views.css";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import HomeIcon from "@mui/icons-material/Home";
import MyModal from "../Components/MyModal/SummonModal.js";
// import getRndInteger from "../utils/getRndInteger.js";

const initialValues = {
  emailAddress: "",
  displayName: "",
  membership: "",
  password: "",
};

const coverPictures = [
  "https://res.cloudinary.com/dzncmfirr/image/upload/v1670689110/app-images/assortedleaves_ufpexr.jpg",
  "https://res.cloudinary.com/dzncmfirr/image/upload/v1670433446/app-images/leaf_xjcqey.png",
  "https://res.cloudinary.com/dzncmfirr/image/upload/v1670000820/app-images/gilles-lambert-mSK5nNsAsLY-unsplash_k58jhe.jpg",
];

// TODO: can this be imported once, instead of both at LOGIN and SIGNUP?
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Signup = () => {
  const [cover, setCover] = useState("");
  const [backEndErrors, setBackEndErrors] = useState({
    email: null,
    username: null,
    pword: null,
  });
  const { getProfile, userLoggedIn, isModal, register } =
    useContext(AuthContext);
  const { values, handleInputChange, validate, errors } =
    useForm(initialValues);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = () => {
    navigate("/");
  };

  useEffect(() => {
    console.warn("getting profile in Signup");
    getProfile();
    // console.log(getRndInteger(0, 10));

    console.log("userLogin", userLoggedIn);
  }, []);

  //! instead of returning function, return true or false.
  // console.log(coverPictures[1]);

  const signup = () => {
    validate();
  };

  console.log(values);
  return (
    <>
      {isModal && <MyModal></MyModal>}
      <HomeIcon className="go-home-icon" onClick={handleNav} />
      <img src={background} className="background-image2" alt="" />
      <div className="container">
        <SignupForm>
          <Stack>
            <Item>
              {errors.email ? (
                <MyControls.MyErrors
                  label={errors.email}
                  name="emailAddress"
                  value={values.emailAddress}
                  onChange={handleInputChange}
                />
              ) : (
                <MyControls.MyInputs
                  label="email address"
                  name="emailAddress"
                  value={values.emailAddress}
                  onChange={handleInputChange}
                />
              )}
            </Item>
            <Item>
              {errors.username ? (
                <MyControls.MyErrors
                  variant="outlined"
                  label={errors.username}
                  name="displayName"
                  value={values.displayName}
                  onChange={handleInputChange}
                />
              ) : (
                <MyControls.MyInputs
                  variant="outlined"
                  label="display name"
                  name="displayName"
                  value={values.displayName}
                  onChange={handleInputChange}
                />
              )}
            </Item>
            <Item>
              {errors.pword ? (
                <MyControls.MyErrors
                  label={errors.pword}
                  name="password"
                  value={values.password}
                  onChange={handleInputChange}
                />
              ) : (
                <MyControls.MyInputs
                  label="password"
                  name="password"
                  value={values.password}
                  onChange={handleInputChange}
                />
              )}
            </Item>

            <Button
              variant="contained"
              color="success"
              component="label"
              //! CHANGE THIS BACK. NORMALLY UNCOMMENTED
              onClick={signup}
              // onClick={handleSubmit}
            >
              SUBMIT
            </Button>
          </Stack>
          <Typography
            sx={{
              textAlign: "center",
            }}
            variant="caption"
          >
            Already a member? <Link to={"/login"}>Sign in</Link>
          </Typography>
        </SignupForm>
      </div>
    </>
  );
};
export default Signup;
