import { useTheme } from "@mui/material";
//import { Link } from 'react-router-dom'

import ProductsGrid from "components/ProductGrid";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../store/store";
import FilterBar from "components/FilterBar";
import ProductForm from "components/ProductForm";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'

export const Product: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const theme = useTheme();

  return <>
    <ProductForm />
  </>
};
