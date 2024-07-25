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
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'

const Cart: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(["login", "common"]);
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const navigate = useNavigate();
  const cart = useSelector((st: RootState) => st.cart);

  return (
    <Grid container sx={{ padding: "0 60px" }} columnSpacing={2}>
      <Grid item xs={8}>
        <CartList />
      </Grid>
      <Grid item xs={4} sx={{ display: "flex", position: "sticky" }}>
        <div
          style={{
            height: "50vh",
            width: "100%",
            position: "sticky",
          }}
        >
          <div style={{ margin: "20px 0" }}>
            <Text variant="h2" color="primary">
              RESUMO DA COMPRA
            </Text>
          </div>
          <div style={{ margin: "20px 0" }}>
            <Text variant="h3" color="primary">
              Total: R${cart.total}
            </Text>
          </div>
          <Button
            color={"primary"}
            fullWidth
            variant={"contained"}
            onClick={() => {
              navigate("/close-order");
            }}
          >
            <Text variant={"h4"} color={"grey.700"}>
              IR PARA PAGAMENTO
            </Text>
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};
export default Cart;
