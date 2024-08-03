import { Grid } from "@mui/material";
//import { Link } from 'react-router-dom'

import ProductsGrid from "components/ProductGrid";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/store";
import FilterBar from "components/FilterBar";
import { lightTheme } from "ui-layout/theme";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'

const Products: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Grid container sx={{
      px: { xs: lightTheme.spacing.small , sm: lightTheme.spacing.extraLarge },
    }}
    columnSpacing={3}
    >
      <Grid item container xs={12} sm={12} md={3} lg={2} sx={{height:'min-content'}} columnSpacing={2}>
        <FilterBar />
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={10}>
        <ProductsGrid />
      </Grid>
    </Grid>
  );
};
export default Products;
