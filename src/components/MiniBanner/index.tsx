// src/components/Banner.tsx
import React from "react";
import "./BannerStyles.css";

interface BannerProps {
  banner: {
    image: string;
    title: string;
    subtitle: string;
  };
}

const MiniBanner: React.FC<BannerProps> = ({ banner }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div
      style={{
        width: "100%",
        margin:'50px 0'
      }}
    >
          <div  className="mini-banner-slide">
            <div
              className="mini-banner-image"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="mini-banner-text">
                <h2>{banner.title}</h2>
                <p>{banner.subtitle}</p>
              </div>
            </div>
          </div>
    </div>
  );
};

export default MiniBanner;
