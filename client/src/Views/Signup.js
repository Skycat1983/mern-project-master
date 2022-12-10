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

const initialValues = {
  emailAddress: "",
  displayName: "",
  membership: "",
  password: "",
};

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
  const { getProfile, userLoggedIn, isModal, register } =
    useContext(AuthContext);
  const { values, setValues, handleInputChange, handleSubmit } =
    useForm(initialValues);
  const navigate = useNavigate();
  const location = useLocation();
  const handleNav = () => {
    navigate("/");
  };
  useEffect(() => {
    console.warn("getting profile in Signup");
    getProfile();
    console.log("userLogin", userLoggedIn);
  }, []);

  const signup = () => {
    register(values, navigate, location);
  };

  // const generateRandomIntegerInRange = (min, max) => {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };

  const generateRandomIntegerInRange = (min, max) => {
    if (Math.floor(Math.random() * (max - min + 1)) + min == 1) {
      setCover(
        "https://res.cloudinary.com/dzncmfirr/image/upload/v1670689110/app-images/assortedleaves_ufpexr.jpg"
      );
    } else if (Math.floor(Math.random() * (max - min + 1)) + min == 1) {
      setCover(
        "https://res.cloudinary.com/dzncmfirr/image/upload/v1670433446/app-images/leaf_xjcqey.png"
      );
    } else if (Math.floor(Math.random() * (max - min + 1)) + min == 3) {
      setCover(
        "https://res.cloudinary.com/dzncmfirr/image/upload/v1670000820/app-images/gilles-lambert-mSK5nNsAsLY-unsplash_k58jhe.jpg"
      );
    }
  };

  console.warn(generateRandomIntegerInRange(1, 3));
  console.log(cover);

  // const register = () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  //   const urlencoded = new URLSearchParams();
  //   urlencoded.append("email", values.emailAddress);
  //   urlencoded.append("username", values.displayName);
  //   urlencoded.append("password", values.password);
  //   urlencoded.append("premium", false);
  //   urlencoded.append(
  //     "avatar",
  //     "https://res.cloudinary.com/dzncmfirr/image/upload/v1669997773/app-images/DALL_E_2022-12-02_09.23.21_-_hyperrealistic_3D_render_of_a_monstera_leaf_encased_in_a_glass_marble_chn1wg.png"
  //   );

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: urlencoded,
  //     redirect: "follow",
  //   };

  //   fetch("http://localhost:5001/api/users/create", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
  // };

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
              <MyControls.MyInputs
                label="email address"
                id="standard-basic"
                variant="standard"
                name="emailAddress"
                value={values.emailAddress}
                onChange={handleInputChange}
                sx={{ input: { color: "red" } }}
              />
            </Item>
            <Item>
              <MyControls.MyInputs
                variant="outlined"
                label="display name"
                name="displayName"
                value={values.displayName}
                onChange={handleInputChange}
              />
            </Item>
            <Item>
              <MyControls.MyInputs
                label="password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
              />
            </Item>
            {/* <Item>
              <FormControl>
                <FormLabel>Membership</FormLabel>
                <RadioGroup
                  row={true}
                  name="membership"
                  value={values.membership}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Basic"
                  />
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Premium"
                  />
                </RadioGroup>
              </FormControl>
            </Item> */}
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
