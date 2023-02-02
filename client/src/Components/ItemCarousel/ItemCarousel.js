// import "./Carousel.css";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, EffectFade, crossFade } from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Card from "@mui/material/Card";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
// import temp1 from "../../assets/temp/temp1.png";
// import user1 from "../../assets/backgrounds/woman1.png";
import { Link, useParams } from "react-router-dom";
import { LangContext } from "../../Contexts/LangContext.js";
import TranslatedContent from "../TranslatedContent";
import "./ItemCarousel.css";
import { EffectFlip, Pagination } from "swiper";

export default function ItemCarousel(data) {
  // const { id } = useParams();
  console.log("data in carousel", data);
  // console.warn("data.data in carousel", data.data);
  // console.warn("data in carousel", data);

  return (
    <>
      <Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={true}
        navigation={true}
        loop
        modules={[EffectFlip, Pagination, Navigation]}
        className="myItemSwiper"
      >
        {/* <Swiper
        className="mySwiper"
        effect={"flip"}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        // effect={"fade"}
        speed={500}
        slidesPerView={1}
        // slidesPerGroup={3}
        loopFillGroupWithBlank={true}
        // pagination={{
        //   clickable: true,
        // }}
        loop
      ></Swiper> */}
        {data &&
          data.data?.imageUrls?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                {/* <Card sx={{ maxWidth: 345 }}> */}
                <CardActionArea>
                  <img className="item-image" src={item} alt="" />
                  {/* <CardMedia
                      component="img"
                      height="140"
                      image={item.imageUrls}
                      alt="plant pic"
                    /> */}
                  {/* <CardContent>
                          <Typography gutterBottom variant="h7" component="div">
                            {item.genus}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <b>
                              <TranslatedContent contentID="price" />
                            </b>
                            {item.price}
                          </Typography>
                        </CardContent> */}
                </CardActionArea>
                {/* </Card> */}
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}
