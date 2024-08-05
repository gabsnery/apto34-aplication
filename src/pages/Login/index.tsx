import { Box, Grid, useTheme } from "@mui/material";
//import { Link } from 'react-router-dom'
import {Text} from 'ui-layout'
import LoginComponent from "components/Login";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'

const Login: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const theme = useTheme();

  return (
    <Grid
      container
      direction="row"
      rowSpacing={2}
      sx={{
        height: "inherit",
      }}
    >
      <Grid item xs={false} md={3} xl={4} />

      <Grid item container xs={12} md={6} xl={4} alignContent="center">
        <Box sx={{ padding: { md: 10, sm: 0 }, width: "100%" }}>
          <Text variant={"h3"}>{t("login")}</Text>
          <LoginComponent
            onLogin={() => {
              navigate("/");
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
export default Login;
