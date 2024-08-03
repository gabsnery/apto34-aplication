import { useTheme } from "@mui/material";
//import { Link } from 'react-router-dom'

import ProductsGrid from "components/ProductGrid";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/store";
import CartList from "components/CartList";
import Payment from "components/PaymentSettup";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'

const CloseOrder: React.FC<React.PropsWithChildren<unknown>> = () => {
  
  return <>
    <Payment />
  </>
};
export default CloseOrder;
