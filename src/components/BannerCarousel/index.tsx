// src/components/Banner.tsx
import React, { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "./BannerStyles.css";
import { useGetImageQuery } from "store/api/product";
import { signed_files_expiration } from "utils";
import Banner from "./Banner";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "styled-components";

interface BannerProps {
  banners: {
    image: string;
    title: string;
    subtitle: string;
    url: string;
  }[];
}


const BannerCarousel: React.FC<BannerProps> = ({ banners }) => {
  const theme = useTheme();

  function SampleNextArrow(props:any) {
    const { className, style, onClick } = props;
     return (
      <div
        style={{ ...style, display: "block",
          lineHeight: 0,
          position: 'absolute',
          top: '50%',
          right:10,
          padding: '0',
          transform: 'translate(0, -50%)',
          cursor: 'pointer',
          color: 'transparent',
          border: 'none',
          outline: 'none',
          zIndex:100
         }}
        onClick={onClick}
      ><ArrowForwardIcon sx={{color:theme.colors.primary,fontSize:'60px'}}/></div>
    ); 
  
  }
  
  function SamplePrevArrow(props:any) {
    const { className, style, onClick } = props;
    return (
   /*    <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      /> */
      <div
      style={{ ...style, display: "block",
        lineHeight: 0,
        position: 'absolute',
        top: '50%',
        left:10,
        padding: '0',
        transform: 'translate(0, -50%)',
        cursor: 'pointer',
        color: 'transparent',
        border: 'none',
        outline: 'none',
        zIndex:100
       }}
      onClick={onClick}
    ><ArrowBackIcon sx={{color:theme.colors.primary,fontSize:'60px'}}/></div>
    );
  }
  
  const settings: Settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div
    >
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <Banner key={index} {...banner}/>
        ))}
      </Slider>
    </div>)
};

export default BannerCarousel;
