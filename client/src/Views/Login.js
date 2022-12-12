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
import HomeIcon from "@mui/icons-material/Home";
import SummonModal from "../Components/MyModal/SummonModal";
import MyModal from "../Components/MyModal/SummonModal.js";
import { formatMuiErrorMessage } from "@mui/utils";

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
  const [backEndErrors, setBackEndErrors] = useState({
    email: null,
    pword: null,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, getProfile, userLoggedIn, isModal } =
    useContext(AuthContext);
  const { values, handleInputChange, handleSubmit, errors } =
    useForm(initialValues);

  const handleNav = () => {
    navigate("/");
  };

  console.log(location);

  //! is there a purpose to what i'm doing here can't remember
  useEffect(() => {
    console.warn("getting profile in Login");
    getProfile();
    console.log("userLogin", userLoggedIn);
  }, []);

  const login = () => {
    handleSubmit();
  };

  return (
    <>
      {isModal && <MyModal></MyModal>}
      <HomeIcon className="go-home-icon" onClick={handleNav} />
      <img src={background} className="background-image2" alt="" />
      <div className="login-container">
        <Form>
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
            <Item>
              <Button
                fullWidth={true}
                variant="contained"
                component="label"
                onClick={login}
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
