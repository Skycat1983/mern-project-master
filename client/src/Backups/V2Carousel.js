import "./Carousel.css";
import * as React from "react";
import { useRef, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, EffectFade, crossFade } from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import temp1 from "../../assets/temp/temp1.png";
import temp2 from "../../assets/temp/temp2.png";
import temp3 from "../../assets/temp/temp3.png";

import styles from "../../styles/Home.module.scss";
import { tabPanelUnstyledClasses } from "@mui/base";

export default function Carousel() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        className="plant-seller-tab"
        sx={{
          bgcolor: "background.paper",
          width: "53%",
          // width: "10vm",
          borderRadius: "12px 12px 0px 0px",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          // textColor="green[900]"
          // indicatorColor="primary"
        >
          <Tab label="PLANTS" />
          <Tab label="SELLERS" />
        </Tabs>
      </Box>
      <div className={styles.container}>
        <Swiper
          className={styles.mySwiper}
          modules={[Navigation, EffectFade]}
          navigation
          effect={"fade"}
          speed={500}
          slidesPerView={3}
          slidesPerGroup={3}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          loop
        >
          <SwiperSlide className={styles.swiperSlide}>
            <img src={temp1} />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <img src={temp2} />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <img src={temp3} />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <img src={temp2} />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <img src={temp3} />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <img src={temp2} />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <img src={temp1} />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <img src={temp3} />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <img src={temp2} />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
