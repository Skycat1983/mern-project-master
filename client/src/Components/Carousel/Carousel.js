import "./Carousel.css";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, EffectFade, crossFade } from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import temp1 from "../../assets/temp/temp1.png";
import user1 from "../../assets/backgrounds/woman1.png";
import { Link, useParams } from "react-router-dom";
import { LangContext } from "../../Contexts/LangContext.js";
import TranslatedContent from "../TranslatedContent";
import { useContext, useEffect, useState } from "react";

export default function Carousel(data, isLoading) {
  const { convertCurrency, currency } = useContext(LangContext);
  // const { id } = useParams();

  // console.warn("data.data in carousel", data.data);
  // console.warn("data in carousel", data);

  return (
    <>
      <Swiper
        className="mySwiper"
        modules={[Navigation, EffectFade]}
        navigation
        // effect={"fade"}
        speed={500}
        slidesPerView={3}
        // slidesPerGroup={3}
        loopFillGroupWithBlank={true}
        // pagination={{
        //   clickable: true,
        // }}
        loop
      >
        {/* `${data?.data?.commentsfor.length} */}
        {data &&
          data.data?.allPlants?.map((item, index) => {
            if (item.user.premium === true) {
              return (
                <SwiperSlide key={index}>
                  <Link
                    to={`/plant/${item._id}`}
                    key={item._id}
                    state={{ plant: item._id }}
                    // state={{ data: props.myFunction }}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.imageUrls[0]}
                          alt="plant pic"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h7" component="div">
                            {item.genus}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <b>
                              <TranslatedContent contentID="price" />
                            </b>
                            {currency == "pounds" && "£"}
                            {convertCurrency(`${item.price}`)}
                            {currency == "euros" && "€"}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </SwiperSlide>
              );
            }
          })}

        {data &&
          data.data?.allPlants?.map((item, index) => {
            if (item.user.premium === false) {
              return (
                <SwiperSlide key={index}>
                  <Link
                    to={`/plant/${item._id}`}
                    key={item._id}
                    state={{ plant: item._id }}
                    // state={{ data: props.myFunction }}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.imageUrls[0]}
                          alt="plant pic"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h7" component="div">
                            {item.genus}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <b>
                              <TranslatedContent contentID="price" />
                            </b>
                            {currency == "pounds" && "£"}
                            {convertCurrency(`${item.price}`)}
                            {currency == "euros" && "€"}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </SwiperSlide>
              );
            }
          })}

        {data &&
          data.data?.allUsers?.map((item) => {
            return (
              <SwiperSlide key={item.email}>
                <Link
                  to={`/profile/${item.username}`}
                  key={item.username}
                  state={{ user: item.username }}
                  // state={{ data: props.myFunction }}
                  style={{ textDecoration: "none" }}
                >
                  {/* <Link
                  to={`/profile/${item.username}`}
                  key={item.username}
                  state={{ user: item.username }}
                  // state={{ data: props.myFunction }}
                  style={{ textDecoration: "none" }}
                > */}
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.avatar}
                        alt="user pic"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h7" component="div">
                          {item.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <b>
                            <TranslatedContent contentID="plants" />:
                          </b>
                          {item.plants.length}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}

// todo: directional inserts for grid of cards
// todo: customer theme for primary/secondary etc
// todo: uninstall swiper?

//CAROUSEL TUTES
//! https://www.youtube.com/watch?v=4aJPgKLwAGY&ab_channel=DigitalCEO
//! https://www.youtube.com/watch?v=W0bEL93tt4k&ab_channel=developedbyed

//MAPPING 15:46
//! https://www.youtube.com/watch?v=4aJPgKLwAGY&t=321s&ab_channel=DigitalCEO
// {plants.map((plant, i) => <SwiperSlide className={styles.swiperslide}>
//   <img src={`/images/${photo.toString()}`}/>
// </SwiperSlide>)}
//! ^^^

//SWIPER

// <SwiperSlide className={styles.swiperSlide}>Slide 1</SwiperSlide>
// <SwiperSlide className={styles.swiperSlide}>Slide 2</SwiperSlide>
// <SwiperSlide className={styles.swiperSlide}>Slide 3</SwiperSlide>
// <SwiperSlide className={styles.swiperSlide}>Slide 4</SwiperSlide>
// <SwiperSlide className={styles.swiperSlide}>Slide 5</SwiperSlide>
// <SwiperSlide className={styles.swiperSlide}>Slide 6</SwiperSlide>
// <SwiperSlide className={styles.swiperSlide}>Slide 7</SwiperSlide>
// <SwiperSlide className={styles.swiperSlide}>Slide 8</SwiperSlide>
// <SwiperSlide className={styles.swiperSlide}>Slide 9</SwiperSlide>

// <SwiperSlide className="mySlide">
//   1 {/* <img src={temp1} /> */}
// </SwiperSlide>
// <SwiperSlide className="mySlide">
//   2 {/* <img src={temp2} /> */}
// </SwiperSlide>
// <SwiperSlide className="mySlide">
//   3 {/* <img src={temp3} /> */}
// </SwiperSlide>
