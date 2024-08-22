// src/components/Banner.tsx
import React, { Suspense, useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "./BannerStyles.css";
import { useGetImageQuery } from "store/api/product";
import { signed_files_expiration } from "utils";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";
import { useGenerateSignedFileQuery } from "store/api/default";
import { addFilter, setFilter } from "store/slices/sessionFilterSlice";
import { useAppDispatch } from "store";
import { useNavigate } from "react-router-dom";

interface IBannerProps {
  image?: string;
  color?: string;
  title: string;
  subtitle: string;
  url: string;
  onClick?:()=>void
}
const SimpleBanner: React.FC<IBannerProps> = ({
  image,
  title,
  subtitle,
  url,
  color,
  onClick
}) => {
  const { t } = useTranslation();


  const { data: photoData0, isSuccess: IsSuccess0 } =
    useGenerateSignedFileQuery(image || "", {
      pollingInterval: signed_files_expiration,
      skip: image === undefined,
    });

  return (
    <Suspense fallback={<CircularProgress />}>
      <div
        className="banner-image"
        style={{
          backgroundImage: photoData0 ? `url(${photoData0.url})` : "unset",
          backgroundColor: color || "unset",
          cursor: "pointer",
        }}
        onClick={()=>{
          onClick && onClick()
         
        }}
      >
        <div className="banner-text">
          <h2>{t(title)}</h2>
          <p>{t(subtitle)}</p>
        </div>
      </div>
    </Suspense>
  );
};

export default SimpleBanner;
