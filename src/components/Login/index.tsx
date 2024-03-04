import { TextField, Typography, useTheme } from "@mui/material";
import React, { useCallback } from "react";
import { Button } from "ui-layout";
import { useAppDispatch } from "../../store/store";
//import { Link } from 'react-router-dom'

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { fetchLogin } from "../../store/slices/auth.slice";
import { Login as LoginEntity } from "../../store/types/auth.interfaces";

interface Props{
  onLogin:(value:boolean)=>void
}
const Login: React.FC<React.PropsWithChildren<Props>> = ({onLogin}) => {
  const { t } = useTranslation(["login", "common"]);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  //  const classes = getStyles()
  const onSubmit = useCallback(
    (data: LoginEntity) => {
      dispatch(fetchLogin(data));
    },
    [dispatch]
  );

  const theme = useTheme();


  return (<>


    <form
      onSubmit={handleSubmit(({ email, senha }: any) => {
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
    </form >
  </>
  );
};

export default Login;

