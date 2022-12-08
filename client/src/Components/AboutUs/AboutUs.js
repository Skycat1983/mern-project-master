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

function AboutUs(props) {
  const [value, setValue] = React.useState(0);

  const { values, setValues, handleInputChange } = useForm(initialValues);
  const user = {
    username: "the plant seller",
    // aboutus: false,
    aboutus:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
  };
  const data = { user: { plants: { genus: "monstera", price: 40 } } };
  console.log("userLoggedIn.about us in aboutus?", props);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue, value);
    // if (value == 1) {
    //   setUrl("http://localhost:5001/api/plants/all");
    // } else {
    //   setUrl("http://localhost:5001/api/users/all");
    // }
  };

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
      {props.aboutus ? (
        <Typography className="about-us" variant="body1" gutterBottom>
          {props.aboutus}
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
        <Button
          // onClick="handleChange"
          className="edit-button"
          variant="contained"
          color="success"
        >
          edit <EditIcon />
        </Button>
      ) : (
        <Button
          // onClick="handleChange"
          className="update-button"
          variant="contained"
          color="success"
        >
          update
        </Button>
      )}
    </>
  );
}

export default AboutUs;
