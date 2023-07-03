import { Box, Grid, Typography, useTheme, } from "@mui/material";
import { useCallback } from "react";
//import { Link } from 'react-router-dom'

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Login as LoginEntity } from "../../store/types/auth.interfaces";
import { fetchLogin } from "../../store/slices/auth.slice";
import { useAppDispatch } from "../../store/store";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'

const Products: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(["login", "common"]);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  return (
    <Grid
      container
      direction="row"
      rowSpacing={2}
      sx={{
        backgroundColor: theme.palette.background.default,
        height: "inherit",
      }}
    >
      <Grid item
        xs={false}
        md={3}
        xl={4}
      />

    </Grid>
  );
};
export default Products;
