import {
  Button,
  ButtonBase,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import dateChange from "../../utils/getDate.js";

import ClearIcon from "@mui/icons-material/Clear";

import "./Plants.css";

function Plants(data) {
  const { getProfile, userLoggedIn, deletePlant } = useContext(AuthContext);
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
        {userLoggedIn.username == location.state.user ? (
          <h4 className="plant-count-heading">
            You have {data?.plants?.length} plants for sale
          </h4>
        ) : (
          <h4 className="plant-count-heading">
            This user has {data?.plants?.length} plants for sale
          </h4>
        )}
        {data &&
          data.plants?.map((item) => {
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
                  style={{ textDecoration: "none" }}
                >
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase sx={{ width: 100, height: -90 }}>
                        <CardMedia
                          className="card-pic"
                          component="img"
                          height="120"
                          image={item.imageUrls[0]}
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
                            sx={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                              color: "black",
                            }}
                          >
                            {item.genus}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Family • AROID
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            listed:{""}
                            {dateChange(item?.createdAt)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography
                          style={{ textDecoration: "none" }}
                          variant="subtitle1"
                          component="div"
                          color="black"
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
      {userLoggedIn?.username == location.state.user && (
        <Link textDecoration="none" to={"/addplant"}>
          <Button
            className="add-plant-button"
            textDecoration="none"
            variant="outlined"
            color="success"
          >
            Add plant
          </Button>
        </Link>
      )}
    </>
  );
}

export default Plants;
