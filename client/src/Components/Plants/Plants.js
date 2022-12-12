import { ButtonBase, CardMedia, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Plants.css";

function Plants(data) {
  return (
    <>
      <Grid>
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
                {" "}
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
