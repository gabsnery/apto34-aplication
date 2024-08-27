import { useTheme } from "@mui/material";
//import { Link } from 'react-router-dom'

import ProductView from "components/Product";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/store";
import { lightTheme } from "ui-layout";
import {useResponsive} from "hooks";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'

const Product: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { isXs } = useResponsive();

  return (
    <div
      style={{
        padding: `0 ${
          isXs ? lightTheme.spacing.small : lightTheme.spacing.large
        }`,
      }}
    >
      <ProductView />
    </div>
  );
};
export default Product;
