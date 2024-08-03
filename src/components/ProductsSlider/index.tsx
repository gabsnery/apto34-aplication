// src/components/Banner.tsx
import React, { useCallback, useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "./BannerStyles.css";
import { useGetProductsQuery } from "store/api/product";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import ProductsCard from "components/ProductCard";
import { useMediaQuery } from "@mui/material";
import useResponsive from "hooks/useResponsive";



const ProductsSlider: React.FC = () => {
  const [dragging, setDragging] = useState<boolean>(false)
  const matches = useMediaQuery("(max-width:700px)");              
  const [sliderSettings, setSliderSettings] = useState<Settings>({
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
  })
  const {isSm,isMd,isXs} =useResponsive()

  useEffect(() => {
    if (isXs) {
      setSliderSettings({...sliderSettings,slidesToShow:2, arrows:false});
    }
    else if (isMd) {
      setSliderSettings({...sliderSettings,slidesToShow:4, arrows:true});
    }
    else{
      setSliderSettings({...sliderSettings,slidesToShow:5, arrows:true});
    }
  }, [isXs,isMd]);
    const handleBeforeChange = useCallback(() => {
        setDragging(true)
    }, [setDragging])

    const handleAfterChange = useCallback(() => {
        setDragging(false)
    }, [setDragging])

    const handleOnItemClick = useCallback((e:any) => {
            if (dragging) e.stopPropagation()
        },
        [dragging]
    ) 


  const sessionFilter = useSelector((st: RootState) => st.sessionFilter);

  const { data, isSuccess } = useGetProductsQuery(
    { ...sessionFilter, start: 1, count: 10 },
    { skip: !sessionFilter }
  );

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Slider {...sliderSettings} beforeChange={handleBeforeChange}
          afterChange={handleAfterChange}>
        {data?.map((prod, idx) => (
          <div
            style={{
              padding: "5px 10px",
            }}
            key={idx}
          >
            <ProductsCard value={prod} dragging={dragging}/>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductsSlider;
