// src/components/Banner.tsx
import React, { useCallback, useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "./BannerStyles.css";
import { useGetProductsQuery } from "store/api/product";
import { useSelector } from "react-redux";
import { RootState } from "store";
import ProductsCard from "components/ProductCard";
import { useMediaQuery } from "@mui/material";
import {useResponsive} from "hooks";



const ProductsSlider: React.FC = () => {
  const [dragging, setDragging] = useState<boolean>(false)
  const [sliderSettings, setSliderSettings] = useState<Settings>({
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
  })
  const {isSm,isMd,isXs,isLg} =useResponsive()

  useEffect(() => {
    if (isXs) {
      setSliderSettings({...sliderSettings,slidesToShow:2, arrows:false});
    }
    else if (isSm) {
      setSliderSettings({...sliderSettings,slidesToShow:3, arrows:true});
    }
    else if (isMd) {
      setSliderSettings({...sliderSettings,slidesToShow:4, arrows:true});
    }
    else if (isLg) {
      setSliderSettings({...sliderSettings,slidesToShow:4, arrows:true});
    }
    else{
      setSliderSettings({...sliderSettings,slidesToShow:5, arrows:true});
    }
  }, [isSm,isXs,isMd,isLg]);
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

  const { data, isLoading: isProductsLoading } = useGetProductsQuery(
    { category:[],
      size:[],
      color:[],
      type:[] , start: 0, count: 10 },
    { skip: !sessionFilter }
  );

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {isProductsLoading?<></>:<Slider {...sliderSettings} beforeChange={handleBeforeChange}
          afterChange={handleAfterChange}>
        {data?.products.map((prod, idx) => (
          <div
            style={{
              padding: "5px 10px",
            }}
            key={idx}
          >
            <ProductsCard value={prod} dragging={dragging}/>
          </div>
        ))}
      </Slider>}
    </div>
  );
};

export default ProductsSlider;
