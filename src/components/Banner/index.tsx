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
  const { data: photoData1,isSuccess:IsSuccess1 } = useGetImageQuery(
    "U2FsdGVkX1+3AuhnQmB9fttnIXrgq2/UDbkcW+5QJ/4="
  );
  const { data: photoData2,isSuccess:IsSuccess2 } = useGetImageQuery(
    "U2FsdGVkX1/xzytkxUmJ4lY6piuUB5O1JWTAemAH8Wc="
  );
  useEffect(() => {
    if (photoData0) {
      setBannerPhotos([...bannerPhotos, photoData0.url]);
      console.log("🚀 ~ useEffect ~ photoData0:", photoData0)
    }
  }, [photoData0]);
  useEffect(() => {
    if (photoData1) {
      setBannerPhotos([...bannerPhotos, photoData1.url]);
      console.log("🚀 ~ useEffect ~ photoData1:", photoData1)
    }
  }, [photoData1]);
  useEffect(() => {
    if (photoData2) {
      setBannerPhotos([...bannerPhotos, photoData2.url]);
      console.log("🚀 ~ useEffect ~ photoData2:", photoData2)
    }
  }, [photoData2]);
  //TOP 3 WORST DECISION I MADE BUT ITS TEMPORARY
  return (IsSuccess0&&IsSuccess1&&IsSuccess2)?(
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
            {bannerPhotos[index]&&<div
              className="banner-image"
              style={{ backgroundImage: `url(${bannerPhotos[index]})` }}
            >
              <div className="banner-text">
                <h2>{banner.title}</h2>
                <p>{banner.subtitle}</p>
              </div>
            </div>}
          </div>
        ))}
      </Slider>
    </div>):<div></div>
};

export default Banner;
