// src/components/Banner.tsx
import React, { Suspense, useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "./BannerStyles.css";
import { useGetImageQuery } from "store/api/product";
import { signed_files_expiration } from "utils";
import { useGenerateSignedFileQuery } from "store/api/default";
import { CircularProgress } from "@mui/material";

interface BannerProps {
  image: string;
  title: string;
  subtitle: string;
  url: string;
}

const Banner: React.FC<BannerProps> = ({ image, title, subtitle, url }) => {
  const { data: photoData0, isSuccess: IsSuccess0 } =
    useGenerateSignedFileQuery(image, {
      pollingInterval: signed_files_expiration,
    });

  return (
    <Suspense fallback={<div></div>}>
      <div
        className="banner-slide-banner"
        style={{ width:'100vw' }}
      >
        {photoData0 && (
          <div
            className="banner-image-banner"
            style={{ backgroundImage: `url(${photoData0.url})` }}
          >
            <div className="banner-text"  onClick={() => {
          window.open(url, "_blank");
        }}>
              <h2>{title}</h2>
              <p>{subtitle}</p>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default Banner;
