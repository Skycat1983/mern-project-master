import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, Form, XLForm } from "../../Hooks/useForm.js";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import temp from "../../assets/appIcons/glassmomnstera.png";
import "./AboutUs.css";
import { FormControl, FormLabel, RadioGroup, TextField } from "@mui/material";
import MyControls from "../controls/MyControls";
import Button from "@mui/material/Button";

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

function AboutUs() {
  const { values, setValues, handleInputChange } = useForm(initialValues);
  const user = {
    username: "the plant seller",
    // aboutus: false,
    aboutus:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
  };
  const data = { user: { plants: { genus: "monstera", price: 40 } } };
  // const { values, setValues, handleInputChange } = useForm(initialValues);
  return (
    <>
      {/* <Grid
        sx={{
          marginTop: -14,
        }}
        container
        spacing={5}
        padding={1}
        paddingLeft={3}
        paddingRight={3}
      >
        <Grid className="profile-headings" item xs={8}>
          <Typography sx={{ color: "#ffffff" }} variant="h6" gutterBottom>
            {user.username}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Item2>
            <img src={temp} className="about-us-avatar" alt="" />
          </Item2>
        </Grid>
      </Grid> */}
      {user.aboutus ? (
        <Typography className="about-us" variant="body1" gutterBottom>
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
      {user.aboutus ? (
        <Button className="edit-button" variant="contained" color="success">
          edit
        </Button>
      ) : (
        <Button className="update-button" variant="contained" color="success">
          update
        </Button>
      )}
    </>
  );
}

export default AboutUs;
