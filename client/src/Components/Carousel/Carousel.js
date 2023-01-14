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
import { styled, alpha } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import { LangContext } from "../../Contexts/LangContext.js";
import TranslatedContent from "../TranslatedContent";
import { useContext, useEffect, useState } from "react";
import useWindowSize from "../../Hooks/useWindowSize";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import MyControls from "../controls/MyControls";
import { useForm, Search } from "../../Hooks/useForm";

const Searching = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  //! CAN BE USED ON FROSTED FORMS
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "10rem",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const initialValues = {
  filterItem: "",
};

export default function Carousel(data, isLoading) {
  const [value, setValue] = React.useState(0);
  const { values, handleInputChange, handleSubmit, errors } =
    useForm(initialValues);

  const { convertCurrency, currency } = useContext(LangContext);
  const { width } = useWindowSize();

  console.log(width);

  return (
    <>
      <Search
        sx={{
          boxShadow: 2,
          maxWidth: "250px",
        }}
        className="filter-bar"
      >
        <MyControls.MySearch
          className="filter-bar"
          label="Filter..."
          name="filterItem"
          value={values.filterItem}
          onChange={handleInputChange}
        ></MyControls.MySearch>
        <SearchIconWrapper>
          <SearchIcon className="search-icon" />
        </SearchIconWrapper>
      </Search>
      <Swiper
        className="mySwiper"
        modules={[Navigation, EffectFade]}
        navigation
        speed={500}
        slidesPerView={
          width < 400
            ? 3
            : width < 500
            ? 4
            : width < 600
            ? 5
            : width < 700
            ? 6
            : width < 800
            ? 7
            : width < 900
            ? 8
            : width < 1000
            ? 9
            : width < 1100
            ? 10
            : 11
        }
        loopFillGroupWithBlank={true}
        loop
      >
        {/* `${data?.data?.commentsfor.length} */}
        {data &&
          data.data?.allPlants?.map((item, index) => {
            if (
              item.user.premium === true &&
              item.genus.includes(values.filterItem)
            ) {
              return (
                <SwiperSlide key={index}>
                  <Link
                    to={`/plant/${item._id}`}
                    key={item._id}
                    state={{ plant: item._id }}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ maxWidth: 150, marginLeft: 1 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.imageUrls[0]}
                          alt="plant pic"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h7"
                            component="div"
                            sx={{
                              textTransform: "capitalize",
                              fontWeight: "bold",
                            }}
                          >
                            {item.genus}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <b>
                              <TranslatedContent contentID="price" />:{" "}
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
            if (
              item.user.premium === false &&
              item.genus.includes(values.filterItem)
            ) {
              return (
                <SwiperSlide key={index}>
                  <Link
                    to={`/plant/${item._id}`}
                    key={item._id}
                    state={{ plant: item._id }}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ maxWidth: 150, marginLeft: 1 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.imageUrls[0]}
                          alt="plant pic"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h7"
                            component="div"
                            sx={{
                              textTransform: "capitalize",
                              fontWeight: "bold",
                            }}
                          >
                            {item.genus}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <b>
                              <TranslatedContent contentID="price" />:{" "}
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
            if (
              item.premium !== true &&
              item.username.includes(values.filterItem)
            ) {
              return (
                <SwiperSlide key={item.email}>
                  <Link
                    to={`/profile/${item.username}`}
                    key={item.username}
                    state={{ user: item.username }}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ maxWidth: 150, marginLeft: 1 }}>
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
            }
          })}

        {data &&
          data.data?.allUsers?.map((item) => {
            if (
              item.premium === true &&
              item.username.includes(values.filterItem)
            ) {
              return (
                <SwiperSlide key={item.email}>
                  <Link
                    to={`/profile/${item.username}`}
                    key={item.username}
                    state={{ user: item.username }}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ maxWidth: 150, marginLeft: 1 }}>
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
            }
          })}
      </Swiper>
    </>
  );
}
