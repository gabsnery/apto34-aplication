import { useTheme } from "@mui/material";
//import { Link } from 'react-router-dom'

import ProductsGrid from "components/ProductGrid";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/store";
import CartList from "components/CartList";
import Payment from "components/PaymentSettup";
import { Button ,Text} from "ui-layout";
import { useNavigate } from "react-router-dom";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'

const Cart: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(["login", "common"]);
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const navigate = useNavigate()

  return <>
    <CartList />
    <Button color={"primary"}  variant={'contained'}
    onClick={()=>{
      navigate('/close-order')

      
    }}><Text variant={"h4"} color={'grey.700'}>Fechar</Text></Button>
  </>
};
export default Cart;
