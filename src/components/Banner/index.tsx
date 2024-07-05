// src/components/Banner.tsx
import React from 'react';
import Slider from 'react-slick';
import './BannerStyles.css';

interface BannerProps {
  banners: {
    image: string;
    title: string;
    subtitle: string;
  }[];
}

const Banner: React.FC<BannerProps> = ({ banners }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {banners.map((banner, index) => (
        <div key={index} className="banner-slide">
          <div
            className="banner-image"
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <div >
              <h2>{banner.title}</h2>
              <p>{banner.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Banner;