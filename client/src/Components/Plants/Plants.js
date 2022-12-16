import { ButtonBase, CardMedia, Grid, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AuthContext } from "../../Contexts/AuthContext";

import ClearIcon from "@mui/icons-material/Clear";

import "./Plants.css";

function Plants(data) {
  const { getProfile, userLoggedIn, isUser, isModal, deletePlant } =
    useContext(AuthContext);
  const location = useLocation();

  const handleDelete = (item) => {
    console.warn("CLG delete", item);
    deletePlant(item);
  };

  useEffect(() => {
    getProfile();
    console.log("userLoggedIn", userLoggedIn);
  }, []);

  console.log("data", data);
  return (
    <>
      <Grid>
        {userLoggedIn?.username == location.state.user && (
          <Link to={"/addplant"}>
            <AddCircleOutlineIcon className="unselected"></AddCircleOutlineIcon>
          </Link>
        )}
        <h4>
          {data?.username}USERNAME has {data?.plants?.length} plants for sale
        </h4>
        {data &&
          data.plants?.map((item) => {
            const dateChange = new Date(`${item.createdAt}`).toLocaleDateString(
              "en-GB"
            );
            return (
              <Paper
                key={item._id}
                className="profile-plant-items"
                sx={{
                  p: 2,
                  margin: 1,
                  maxWidth: 300,
                  flexGrow: 2,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                {/* {userLoggedIn?.username == location?.pathname.substring(9) && ( */}
                {userLoggedIn?.username == location.state.user && (
                  <ClearIcon
                    className="delete-icon"
                    onClick={() => `${handleDelete(item)}`}
                  ></ClearIcon>
                )}{" "}
                <Link
                  to={`/plant/${item._id}`}
                  key={item._id}
                  state={{ plant: item._id }}
                  // state={{ data: props.myFunction }}
                  style={{ textDecoration: "none" }}
                >
                  <Grid container spacing={2}>
                    <Grid item>
                      {/* <ButtonBase sx={{ width: 128, height: 128 }}> */}
                      <ButtonBase sx={{ width: 100, height: -90 }}>
                        <CardMedia
                          className="card-pic"
                          component="img"
                          height="120"
                          image={item.imageUrls[0]}
                          // alt="user pic"
                        />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={1} sm container>
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
                      </Grid>
                      <Grid item>
                        <Typography
                          style={{ textDecoration: "none" }}
                          variant="subtitle1"
                          component="div"
                        >
                          £{item.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Link>
              </Paper>
            );
          })}
      </Grid>
    </>
  );
}

export default Plants;
