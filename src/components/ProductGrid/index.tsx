import { Grid, useTheme } from "@mui/material";
//import { Link } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";

import { useTranslation } from "react-i18next";
import { RootState, useAppDispatch } from "../../store/store";
import ProductsCard from "components/ProductCard";
import { useGetProductsQuery } from "store/api/product";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Product } from "store/api/product/product.interface";
import { useGetOrdersQuery } from "store/api/Order";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'
const ProductsGrid: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(["login", "common"]);
  const {data:ordersQuery}=useGetOrdersQuery()

  const dispatch = useAppDispatch();
  const sessionFilter = useSelector((st: RootState) => st.sessionFilter);
  const [products,setProducts]=useState<Product[]>([])
  const { data,isSuccess } = useGetProductsQuery({...sessionFilter,start:0,count:50}, { skip: !sessionFilter });
  const theme = useTheme();
useEffect(() => {
  if(data){
    setProducts([...products,...data,...data])
  }
}, [data]);
useEffect(() => {
  setProducts([])
  if(data){
    setProducts([...products,...data])
  }
}, [sessionFilter]);
  return (
    <InfiniteScroll
      dataLength={10} //This is important field to render the next data
      next={()=>{
        console.log('next')
      }}
      hasMore={false}
      loader={<h4></h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
        </p>
      }
      // below props only if you need pull down functionality
      refreshFunction={()=>{
          console.log("🚀 ~ refreshFunction:")
      }}
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
      }
    >
      <Grid
        container
        direction="row"
        rowSpacing={2}
        columnSpacing={3}
        sx={{
          backgroundColor: theme.palette.background.default,
          height: "inherit",
          px: { xs: '10px', sm: "50px" },
        }}
      >
        {products?.map((prod, idx) => (
          <Grid key={idx} item xs={6} sm={4} md={3} lg={2} >
            <ProductsCard value={prod} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};
export default ProductsGrid;
