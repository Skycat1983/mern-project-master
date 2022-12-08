import { ButtonBase, CardMedia, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import "./Plants.css";

function Plants(data) {
  return (
    <>
      <Grid>
        {data &&
          data.plants?.map((item) => {
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
                <Grid container spacing={2}>
                  <Grid item>
                    {/* <ButtonBase sx={{ width: 128, height: 128 }}> */}
                    <ButtonBase sx={{ width: 100, height: -90 }}>
                      <CardMedia
                        className="card-pic"
                        component="img"
                        height="120"
                        image={item.imageUrls}
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
    </>
  );
}

export default Plants;
