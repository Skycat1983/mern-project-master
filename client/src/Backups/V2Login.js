import { useForm, Form } from "../Hooks/useForm";
import MyControls from "../Components/controls/MyControls";
import useFetch from "../Hooks/useFetch";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { alpha, styled } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./views.css";
import background from "../assets/backgrounds/photos/houseplants3.jpg";
import { AuthContext } from "../Contexts/AuthContext";

// TODO: can this be imported once, instead of both at LOGIN and SIGNUP?
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Login = () => {
  const initialValues = {
    emailAddress: "",
    password: "",
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, getProfile, userLoggedIn } = useContext(AuthContext);
  const { values, setValues, handleInputChange } = useForm(initialValues);

  useEffect(() => {
    //! DOES NOT WORK
    console.warn("getting profile in Login");
    // const pageLoad = async () => {
    //   const user = await getProfile();
    // console.log("userLogin", userLoggedIn);
    // };
    getProfile();
    console.log("userLogin", userLoggedIn);
  }, []);

  const signIn = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", values.emailAddress);
    urlencoded.append("password", values.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/users/login",
        requestOptions
      );
      const result = await response.json();
      console.log("result :>> ", result);
      const { token } = result;
      if (token) {
        localStorage.setItem("token", token);
        //! take to auth?
        // setUser(result)
        // isLoading(false)
        if (location.state?.from) {
          navigate(location.state.from, { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    } catch (error) {
      // isLoading(false)
      console.log("error", error);
    }
    // const redirect = () => {
    //   if (location.state?.from) {
    //     navigate(location.state.from);
    //   }
  };

  //   fetch("http://localhost:5001/api/users/login", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
  // };

  console.log(values);
  return (
    <>
      <img src={background} className="background-image2" alt="" />
      <div className="login-container">
        <Form>
          <Stack>
            <Item>
              <MyControls.MyInputs
                label="email address"
                name="emailAddress"
                value={values.emailAddress}
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
            <Item>
              <Button
                fullWidth={true}
                variant="contained"
                component="label"
                onClick={signIn}
                color="success"
              >
                LOGIN
              </Button>
            </Item>
          </Stack>
          <Typography
            sx={{
              textAlign: "center",
            }}
            variant="caption"
          >
            No membership? <Link to={"/signup"}>Sign up</Link>
          </Typography>
        </Form>
      </div>
    </>
  );
};
export default Login;

// try {
//   const response = await fetch(
//     "http://localhost:5001/api/users/login",
//     requestOptions
//   );
//   const result = await response.json();
//   console.log("result :>> ", result);
//   const { token } = result;
//   if (token) {
//     localStorage.setItem("token", token);
//   }
// } catch (error) {
//   console.log("error", error);
// }
