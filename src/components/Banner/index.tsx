// src/components/Banner.tsx
import React from "react";
import Slider, { Settings } from "react-slick";
import "./BannerStyles.css";

interface BannerProps {
  banners: {
    image: string;
    title: string;
    subtitle: string;
    url: string;
  }[];
}


const Banner: React.FC<BannerProps> = ({ banners }) => {
  const settings:Settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:true,
  };

  return (
    <div
      style={{
        width: '100%'
      }}
      className="slider-container"
    >
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index}  className="banner-slide" onClick={()=>{
            window.open(banner.url, "_blank")
          }}>
            <div
              className="banner-image"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="banner-text">
                <h2>{banner.title}</h2>
                <p>{banner.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
