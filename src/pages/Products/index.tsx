import { Drawer, Grid } from "@mui/material";
//import { Link } from 'react-router-dom'
import CategorySelector from "components/CategorySelector";
import FilterBar from "components/FilterBar";
import ProductsGrid from "components/ProductGrid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetCategoriasQuery } from "store/api/category";
import { addFilter, clearOneFilter, setFilter } from "store/slices/sessionFilterSlice";
import { RootState, useAppDispatch } from "store";
import { useTheme } from "styled-components";
import { Button } from "ui-layout";
import { lightTheme } from "ui-layout";
import { useResponsive } from "hooks";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'

const Products: React.FC<React.PropsWithChildren<unknown>> = () => {
  const [filterOpen, setfilterOpen] = useState<boolean>(false);
  const theme = useTheme();
  const sessionFilter = useSelector((st: RootState) => st.sessionFilter);
  const { category } = useParams<{ category: string }>();
  const dispatch = useAppDispatch();
  const { data: categorias } = useGetCategoriasQuery();
  const {isSm,isMd,isXs} =useResponsive()

  useEffect(() => {
    setfilterOpen(false);
  }, [sessionFilter]);

  useEffect(() => {
    if(category===""||category===undefined){
      dispatch(
        clearOneFilter({
          filter: "category",
        })
      );
    }
    if (category !== "" && categorias) {
      const index = categorias.findIndex((i) => i.categoria === category);
      if (index >= 0)
        dispatch(
          setFilter({
            filter: "category",
            value: categorias[index].id,
          })
        );
    }
  }, [categorias,category]);
  return (
    <>
      <Drawer
        anchor={"right"}
        open={filterOpen}
        sx={{
          zIndex: 1250,
        }}
        PaperProps={{
          sx: {
            width: isXs?'80%':isSm?'60%':isMd?'30%':'25%',
            paddingTop: theme.spacing.medium,
            paddingLeft: theme.spacing.medium,
            paddingRight: theme.spacing.medium,
            backgroundColor: theme.colors.background,
          },
        }}
        onClose={(ev, reason) => {
          setfilterOpen(false);
        }}
      >
        <FilterBar />
      </Drawer>
      <Grid
        container
        sx={{
          px: {
            xs: lightTheme.spacing.small,
            sm: lightTheme.spacing.medium,
            ms: lightTheme.spacing.large,
            ld: lightTheme.spacing.extraLarge,
          },
        }}
        columnSpacing={3}
        rowSpacing={3}
      >
        <Grid item container xs={12} columnSpacing={2}>
          <CategorySelector />
        </Grid>
        {/*         <Grid
          item
          container
          xs={12}
          sm={12}
          md={3}
          lg={2}
          sx={{ height: "min-content" }}
          columnSpacing={2}
        >
          <FilterBar />
        </Grid> */}
        <Grid item xs={12} sm={12} textAlign={"right"}>
          <Button
            onClick={() => {
              setfilterOpen(true);
            }}
            variant="secondary"
          >
            Filtrar
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <ProductsGrid />
        </Grid>
      </Grid>
    </>
  );
};
export default Products;
