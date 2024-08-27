import { Grid, useTheme } from "@mui/material";
//import { Link } from 'react-router-dom'

import ProductsGrid from "components/ProductGrid";
import { useTranslation } from "react-i18next";
import { RootState, useAppDispatch } from "../../store/store";
import CartList from "components/CartList";
import Payment from "components/PaymentSettup";
import { Button, Text } from "ui-layout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CartOverview from "components/CartOverview";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'

const Cart: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const navigate = useNavigate();
  const cart = useSelector((st: RootState) => st.cart);
  return (
    <Grid container sx={{ padding: {xs:0,sm:"0 100px"} }} columnSpacing={2}>
      <Grid item xs={12} md={8} >
        <CartList />
      </Grid>
      <Grid item xs={12}  md={4} sx={{ display: "flex", position: "sticky" }}>
        <CartOverview/>
      </Grid>

    </Grid>
  );
};
export default Cart;
