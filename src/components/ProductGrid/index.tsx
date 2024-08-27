import { Grid, Pagination, Stack, useTheme } from "@mui/material";
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
import { useSearchParams } from "react-router-dom";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'
const ProductsGrid: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page"); //

  const sessionFilter = useSelector((st: RootState) => st.sessionFilter);
  const [products, setProducts] = useState<Product[]>([]);
  const count = 30;
  const [filter, setFilter] = useState<SessionFilter>({
    category: [],
    size: [],
    color: [],
    type: [],
  });
  const {
    data,
    isSuccess,
    refetch,
    isLoading: isProductsLoading,
    isError: isProductError,
  } = useGetProductsQuery(
    { ...filter, start: +(page || 0) * count, count: count },
    { skip: !filter }
  );
  const theme = useTheme();
  useEffect(() => {
    if (data) {
      setProducts([...data.products]);
    }
  }, [data]);
  useEffect(() => {
    setFilter(sessionFilter);
    refetch();
  }, [sessionFilter]);
  return (
    /*     <InfiniteScroll
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
    > */
    <Grid
      container
      direction="row"
      rowSpacing={2}
      columnSpacing={3}
      columns={{xs:2,sm:3,md:4,lg:5}}
      sx={{
        height: "inherit",
      }}
    >
      {products?.map((prod, idx) => (
        <Grid key={prod.id} item xs={1} sm={1} md={1} lg={1}>
          <ProductsCard value={prod} />
        </Grid>
      ))}
      <Grid item xs={12} textAlign={"center"}>
        {data && (
          <Stack alignItems="center">
            <Pagination
              showFirstButton
              showLastButton
              count={Math.ceil(data?.total_count / count) - 1}
              variant="outlined"
              shape="rounded"
              onChange={(event: React.ChangeEvent<unknown>, value: number) => {
                searchParams.set("page", value.toString());
                setSearchParams(searchParams);
              }}
            />
          </Stack>
        )}
      </Grid>
    </Grid>

    /*     </InfiniteScroll> */
  );
};
export default ProductsGrid;
