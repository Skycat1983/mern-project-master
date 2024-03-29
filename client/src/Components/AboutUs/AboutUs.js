import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, Form, XLForm } from "../../Hooks/useForm.js";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState, useContext } from "react";
// import temp from "../../assets/appIcons/glassmomnstera.png";
import "./AboutUs.css";
import { FormControl, FormLabel, RadioGroup, TextField } from "@mui/material";
import MyControls from "../controls/MyControls";
import Button from "@mui/material/Button";
import { AuthContext } from "../../Contexts/AuthContext";
import { LangContext } from "../../Contexts/LangContext.js";
import TranslatedContent from "../TranslatedContent";
import { useLocation, useNavigate } from "react-router-dom";
import MyModal from "../../Components/MyModal/SummonModal.js";
import dateChange from "../../utils/getDate.js";

const initialValues = {
  aboutUs: "",
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function AboutUs(props) {
  // const [value, setValue] = React.useState(0);
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { values, setValues, handleInputChange } = useForm(initialValues);
  const { getProfile, userLoggedIn, isModal, patchUser } =
    useContext(AuthContext);

  useEffect(() => {
    getProfile();
  }, []);

  const handleUpdate = () => {
    setToggle(!toggle);
    console.log(toggle);
    if (!toggle && values.aboutUs !== "") {
      patchUser(values, userLoggedIn.username);
    }
  };

  return (
    <>
      {isModal && <MyModal></MyModal>}
      <Paper>
        <Typography className="about-us" variant="body1" gutterBottom>
          <TranslatedContent contentID="memberSince" />:{" "}
          {dateChange(props?.data?.user.createdAt)}
        </Typography>
        <Typography className="about-us" variant="body1" gutterBottom>
          {props?.data?.user.subscribers.length}{" "}
          {props?.data?.user.subscribers.length == 1
            ? "subscriber"
            : "subscribers"}
        </Typography>
        {toggle && props?.aboutus ? (
          <Typography className="about-us" variant="body1" gutterBottom>
            {props?.aboutus}
          </Typography>
        ) : toggle ? (
          <Typography className="about-us" variant="body1" gutterBottom>
            {userLoggedIn.username === location.state.user
              ? "You haven't added any information here yet"
              : "This user hasn't added any information here yet"}
          </Typography>
        ) : (
          <XLForm>
            <MyControls.MyTextbox
              id="outlined-multiline-flexible"
              label={props?.aboutus}
              name="aboutUs"
              value={values.aboutUs}
              multiline={true}
              maxRows={4}
              onChange={handleInputChange}
            />
          </XLForm>
        )}

        {userLoggedIn.username === location.state.user && (
          <Button
            onClick={handleUpdate}
            className="edit-button"
            variant="contained"
            color="success"
          >
            {toggle ? "edit" : "update"} <EditIcon />
          </Button>
        )}
      </Paper>
    </>
  );
}

export default AboutUs;
