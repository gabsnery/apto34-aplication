import { useTheme } from "@mui/material";
//import { Link } from 'react-router-dom'

import ProductView from "components/Product";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/store";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'

const Product: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(["login", "common"]);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  return <>
    <ProductView />
  </>
};
export default Product;
