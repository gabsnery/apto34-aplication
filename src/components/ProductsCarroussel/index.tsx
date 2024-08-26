import ProductsCard from "components/ProductCard";
import { useEffect, useState } from "react";
import { Button } from "ui-layout";
import "./style.css";
import { Grid, useMediaQuery } from "@mui/material";
import { useGetProductsQuery } from "store/api/product";
import { useSelector } from "react-redux";
import { RootState } from "store";

export const ProductsCarroussel: React.FC<{ keyValue: string }> = ({
  keyValue,
}) => {
  const [firstItemToShowIndex, setfirstItemToShowIndex] = useState<number>(0);
  const [quantityToShow, setQuantitytoShow] = useState<number>(5);
  const sessionFilter = useSelector((st: RootState) => st.sessionFilter);
  const matches = useMediaQuery("(max-width:700px)");
  const rand = (Math.random() * 100).toFixed(0);
  useEffect(() => {
    if (matches) setQuantitytoShow(2);
  }, [matches]);

  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  
  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50 
  
  const onTouchStart = (e:any) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const onTouchMove = (e:any) => setTouchEnd(e.targetTouches[0].clientX)
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      if(data){
        const resto =
        data?.length - (quantityToShow + firstItemToShowIndex);
      resto >= quantityToShow
        ? setfirstItemToShowIndex(quantityToShow + firstItemToShowIndex)
        : setfirstItemToShowIndex(firstItemToShowIndex + resto);
      }
    }else if(isRightSwipe){
      setfirstItemToShowIndex(
        firstItemToShowIndex - quantityToShow < 0
          ? 0
          : firstItemToShowIndex - quantityToShow
      );
    }
  }

  const { data, isSuccess } = useGetProductsQuery(
    { ...sessionFilter, start: 0, count: 10 },
    { skip: !sessionFilter }
  );
  return data ? (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} >
    <Grid
      key={`carrousel-${quantityToShow}`}
      container
      direction="row"
      rowSpacing={2}
      columnSpacing={3}
      pb={2}
      sx={{
        backgroundColor: 'pink',
        height: "inherit",
        px: { xs: 0, sm: "50px" },
      }}
      className={`compontent-swipe-${keyValue}`}
      id={`compontent-swipe-${keyValue}`}
    >
      <Grid
        sx={{ display: { xs: "none", md: "block" }, alignSelf: "center" }}
        item
        xs={1}
      >
        <Button
          disabled={
            firstItemToShowIndex - quantityToShow < 0 &&
            firstItemToShowIndex === 0
          }
          variant="secondary"
          
          onClick={() => {
            setfirstItemToShowIndex(
              firstItemToShowIndex - quantityToShow < 0
                ? 0
                : firstItemToShowIndex - quantityToShow
            );
          }}
        >
          {"<"}
        </Button>
      </Grid>
      <Grid item xs={12} md={10}>
        <div
          className="carousel-container"
          style={{
            maxWidth: 1500,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 64,
          }}
        >
          <div className="carousel-wrapper">
            <div className="carousel-content-wrapper">
              <div
                className="carousel-content"
                style={{
                  transform: `translateX(-${
                    firstItemToShowIndex * (100 / quantityToShow)
                  }%)`,
                }}
              >
                {data?.map((prod, idx) => (
                  <div
                    style={{
                      width: `calc(${100 / quantityToShow}% - 20px)`,
                      margin: "5px 10px",
                    }}
                    key={idx}
                  >
                    <ProductsCard value={prod} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Grid>
      <Grid
        item
        xs={1}
        sx={{ display: { xs: "none", md: "block" }, alignSelf: "center" }}
        textAlign={"right"}
      >
        <Button
          variant="secondary"
          disabled={data?.length <= quantityToShow + firstItemToShowIndex}
          
          onClick={() => {
            const resto =
              data?.length - (quantityToShow + firstItemToShowIndex);
            resto >= quantityToShow
              ? setfirstItemToShowIndex(quantityToShow + firstItemToShowIndex)
              : setfirstItemToShowIndex(firstItemToShowIndex + resto);
          }}
        >
          {" "}
          {">"}
        </Button>
      </Grid>
    </Grid>
    </div>
  ) : (
    <></>
  );
};
export default ProductsCarroussel;
