import { Box, Grid, Typography, useTheme,Button,TextField } from "@mui/material";
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

const Login: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(["login", "common"]);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "gneri94890@gmail.com",  // Valor padrão para o email
      senha: "dshkjhldfshdsjk",  // Valor padrão para a senha
    }
  });

  //  const classes = getStyles()
  const onSubmit = useCallback(
    (data: LoginEntity) => {
      dispatch(fetchLogin(data));
    },
    [dispatch]
  );

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

      <Grid item container
        xs={12}
        md={6}
        xl={4}
        alignContent="center">
        <Box sx={{ padding: { md: 10, sm: 0 }, width: "100%" }}>
       
            {t("common|login")}
          <form
            onSubmit={handleSubmit(({ email, senha }:any) => {
              return onSubmit({ email, senha });
            })}
          >
            <TextField
              label={t("common|email")}
              id="salva-login-email"
              sx={{ margin: "10px 0" }}
              InputProps={{
                ...register("email", {
                  required: true,
                })
              }}
              error={!!errors.email}
              helperText={errors.email && t(errors.email?.message as string)}
              fullWidth
            />

            <TextField
              label={t("common|senha")}
              id="salva-login-senha"
              InputProps={{ ...register("senha", { required: true }) }}
              type="senha"
              name="password"
              error={!!errors.senha}
              helperText={errors.senha && t(errors.senha?.message as string)}
              fullWidth
            />
 
            <Button
              id="salva-login-submit"
              value="submit"
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
            >
              <Typography sx={{
                padding: '5px'
              }} variant="h6">{t("common|enter")}</Typography>
            </Button>
          </form>

        </Box>
      </Grid>
    </Grid>
  );
};
export default Login;
