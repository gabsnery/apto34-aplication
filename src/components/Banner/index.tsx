// src/components/Banner.tsx
import React, { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "./BannerStyles.css";
import { useGetImageQuery } from "store/api/product";

interface BannerProps {
  banners: {
    image: string;
    title: string;
    subtitle: string;
    url: string;
  }[];
}

const Banner: React.FC<BannerProps> = ({ banners }) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  const [bannerPhotos, setBannerPhotos] = useState<string[]>([]);
  const { data: photoData0,isSuccess:IsSuccess0 } = useGetImageQuery(
    "U2FsdGVkX1+uTPsm7Rwe1wId2ZZdEpPoCNbwK/Kf8V4="
  );

  //TOP 3 WORST DECISION I MADE BUT ITS TEMPORARY
  return (
    <div
      style={{
        width: "100%",
      }}
      className="slider-container"
    >
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div
            key={index}
            className="banner-slide"
            onClick={() => {
              window.open(banner.url, "_blank");
            }}
          >
            {photoData0&&<div
              className="banner-image"
              style={{ backgroundImage: `url(${photoData0.url})` }}
            >
              <div className="banner-text">
                <h2>{banner.title}</h2>
                <p>{banner.subtitle}</p>
              </div>
            </div>}
          </div>
        ))}
      </Slider>
    </div>)
};

export default Banner;
