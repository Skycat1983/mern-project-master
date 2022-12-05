import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./Account.css";
import { Link, Navigate } from "react-router-dom";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Account() {
  const user = { plants: false, premium: true, plants: true };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    rowGap: "10px",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Grid className="account-grid" rowSpacing={2} container spacing={2}>
        <Grid xs={8}>
          <Item>Membership: </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <WorkspacePremiumIcon
              className={user.premium == true ? "selected" : "unselected"}
            ></WorkspacePremiumIcon>
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <SentimentDissatisfiedIcon
              className={user.premium == true ? "unselected" : "selected"}
            ></SentimentDissatisfiedIcon>
          </Item>
        </Grid>
        <Grid xs={8}>
          <Item>Add/remove listing: </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <Link to={"/addplant"}>
              <AddCircleOutlineIcon className="unselected"></AddCircleOutlineIcon>
            </Link>
            ;
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <RemoveCircleOutlineIcon
              className={user.plants == false ? "not-possible" : "unselected"}
            ></RemoveCircleOutlineIcon>
          </Item>
        </Grid>
        <Grid xs={8}>
          <Item>Upload cover/avatar: </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <WallpaperIcon></WallpaperIcon>
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <AccountCircleIcon></AccountCircleIcon>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}

export default Account;
