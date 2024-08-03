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
import { SessionFilter } from "store/types/sessionFilters.interfaces";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'
const ProductsGrid: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(["login", "common"]);
  const dispatch = useAppDispatch();
  const sessionFilter = useSelector((st: RootState) => st.sessionFilter);
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<SessionFilter>({  category: [],
    size: [],
    color: [],
    type: []});
  const { data, isSuccess } = useGetProductsQuery(
    { ...filter, start: 0, count: 50 },
    { skip: !filter }
  );
  const theme = useTheme();
  useEffect(() => {
    if (data) {
      setProducts([...products, ...data]);
    }
  }, [data]);
useEffect(() => {
  setProducts([]);
  setFilter(sessionFilter)
}, [sessionFilter]);
  return (
    <InfiniteScroll
      dataLength={10} //This is important field to render the next data
      next={() => {
        console.log("next");
      }}
      hasMore={false}
      loader={<h4></h4>}
      endMessage={<p style={{ textAlign: "center" }}></p>}
      // below props only if you need pull down functionality
      refreshFunction={() => {
        console.log("🚀 ~ refreshFunction:");
      }}
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <h3 style={{ textAlign: "center" }}></h3>
      }
      releaseToRefreshContent={
        <h3 style={{ textAlign: "center" }}></h3>
      }
    >
      <Grid
        container
        direction="row"
        rowSpacing={2}
        columnSpacing={3}
        sx={{
          height: "inherit",
        }}
      >
        {products?.map((prod, idx) => (
          <Grid key={idx} item xs={6} sm={4} md={4} lg={3}>
            <ProductsCard value={prod} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};
export default ProductsGrid;
