import useFetch from "../Hooks/useFetch";
import NavBar from "../Components/Navbar/NavBar";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useRadioGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Comments from "../Components/Comments/Comments";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import "./views.css";
import temp from "../assets/temp/temp3.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Profile() {
  const [user, setUser] = useState(true);
  const location = useLocation();
  console.log("location :>> ", location.state.user);
  const [url, setUrl] = useState(
    `http://localhost:5001/api/users/${location.state.user}`
  );
  const { data, isLoading, error } = useFetch(url);

  // console.log(location);
  // console.warn(data.user);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          p: 2,
          margin: 2,
          marginTop: 10,
        }}
      >
        <Avatar>H</Avatar>
        {!isLoading && <h3>welcome to {data?.user?.username}'s profile </h3>}

        <Typography variant="h6" gutterBottom>
          about us
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <h5>below are the plants we have for sale</h5>
      </Box>
      <Grid>
        {data &&
          data?.user?.plants?.map((item) => {
            return (
              <Paper
                className="profile-plant-items"
                sx={{
                  p: 2,
                  margin: 2,
                  maxWidth: 300,
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    {/* <ButtonBase sx={{ width: 128, height: 128 }}> */}
                    <ButtonBase sx={{ width: 100, height: 100 }}>
                      <CardMedia
                        component="img"
                        // height="140"

                        width="10"
                        image={temp}
                        alt="user pic"
                      />
                      {/* <Img alt="complex" image={temp} /> */}
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          {item.genus}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Family • AROID
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          listed: {item.createdAt}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <FavoriteBorderIcon />
                        {/* <Typography sx={{ cursor: "pointer" }} variant="body2">
                          Remove
                        </Typography> */}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" component="div">
                        £{item.price}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
      </Grid>
      <Box
        sx={{
          p: 2,
          margin: 2,
        }}
      >
        <h5>USER REVIEWS</h5>
        <Comments></Comments>
        {user ? (
          <TextField
            id="outlined-multiline-static"
            sx={{ m: 1, width: "75vw" }}
            label="Write a review"
            multiline
            rows={4}
          />
        ) : (
          <TextField
            id="outlined-multiline-static"
            disabled
            sx={{ m: 1, width: "75vw" }}
            label="Write a review of this seller"
            multiline
            rows={4}
            defaultValue="You need to be signed in to use this feature"
          />
        )}
        {!isLoading && (
          <h4>
            Questions? contact us via our email address: {data?.user?.email}
          </h4>
        )}
      </Box>
    </>
  );
}

// todo: calc distances with https://www.npmjs.com/package/geolib

// {data &&
//   data.user?.map((item) => {
//     return (
