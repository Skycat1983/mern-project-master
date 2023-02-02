import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext, server } from "../../Contexts/AuthContext";
import Typography from "@mui/material/Typography";
import { Divider, Link, Paper } from "@mui/material";
import "./Notifications.css";

function Notifications() {
  const [forFeed, setForfeed] = useState({});
  const [sub, setSub] = useState({});
  const { getProfile, userLoggedIn, logout, isUser, isModal } =
    useContext(AuthContext);
  useEffect(() => {
    getProfile();
    console.log("in feed useffect", userLoggedIn);
    const getNotifications = () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("userid", `${userLoggedIn.id}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      fetch(`${server}/api/subs/all`, requestOptions)
        // fetch("http://localhost:5001/api/subs/all", requestOptions)
        .then((response) => response.json())
        .then((result) => setForfeed(result))
        .catch((error) => console.log("error", error));
    };
    getNotifications();
  }, []);

  const myFeedNotifications = {};

  const dateChange = () => {
    return new Date().toLocaleDateString("en-GB");
  };

  console.warn("forFeed", forFeed);
  return (
    <>
      <Paper className="notification-paper">
        <Typography gutterBottom variant="h7" component="div">
          You have {forFeed?.number} subscription updates
        </Typography>
        <Divider className="divider"></Divider>
        {forFeed &&
          forFeed?.allMySubs?.map((sub, i) => {
            return (
              <>
                {sub &&
                  sub?.plants?.map((plant, index) => {
                    return (
                      <>
                        <Link
                          to={`/plant/${plant._id}`}
                          key={index}
                          state={{ plant: plant._id }}
                        >
                          <img
                            className="img-tiny"
                            src={plant.imageUrls[0]}
                          ></img>
                          <Typography
                            key={index}
                            gutterBottom
                            variant="h7"
                            component="div"
                            className="notification-text"
                          >
                            {plant.genus}, uploaded:{" "}
                            {dateChange(`${plant?.createdAt}`)}
                          </Typography>
                        </Link>
                        <Divider className="divider"></Divider>
                        {/* <Typography
                          key={index}
                          gutterBottom
                          variant="h7"
                          component="div"
                        >
                          uploaded on:
                          {dateChange(`${plant?.createdAt}`)}
                        </Typography> */}
                      </>
                    );
                  })}

                {/* <Typography key={i} gutterBottom variant="h7" component="div">
                plant listed {dateChange(`${sub?.updatedAt}`)}
              </Typography> */}
              </>
            );
          })}
      </Paper>
    </>
  );
}

export default Notifications;

// {sub.plants.map((plant, index) => {
//     return (
//       <Typography
//         key={index}
//         gutterBottom
//         variant="h7"
//         component="div"
//       >
//         genus
//       </Typography>)})}

{
  /* sub[i].plants?.map((plant, index) => {
            return (
              <Typography gutterBottom variant="h7" component="div">
                {plant.genus} hello
              </Typography>
            );
          }); */
}
