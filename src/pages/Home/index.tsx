import { useTheme } from "@mui/material";
//import { Link } from 'react-router-dom'

import ProductsGrid from "components/ProductGrid";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/store";
import Banner from "components/Banner";
import ProductsCarroussel from "components/ProductsCarroussel";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'

const Home: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(["login", "common"]);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  return <><Banner />
    <ProductsCarroussel />
    <ProductsCarroussel />
    </>
};
export default Home;
