import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import Typography from "@mui/material/Typography";

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

      fetch("http://localhost:5001/api/subs/all", requestOptions)
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

  // {forFeed && forFeed?.allMySubs?.map((sub) =>
  //   // subscriberListings.push(sub.plants);
  //   console.log("this sub has this plant", sub.plants)
  // );
  console.warn("forFeed", forFeed);
  return (
    <>
      <Typography gutterBottom variant="h7" component="div">
        you have {forFeed?.number} notifications
      </Typography>
      {forFeed &&
        forFeed?.allMySubs?.map((sub, i) => {
          {
            /* {setSub(sub)} */
          }

          return (
            <Typography key={i} gutterBottom variant="h7" component="div">
              plant listed {dateChange(`${sub?.updatedAt}`)}
            </Typography>
          );
        })}

      {/* {sub &&
        sub?.plants?.map((plant, index) => {
          return (
            <Typography key={index} gutterBottom variant="h7" component="div">
              genus
            </Typography>
          );
        })} */}
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
