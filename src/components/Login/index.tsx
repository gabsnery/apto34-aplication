import { Grid, Typography, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Button, TextField } from "ui-layout";
import { useAppDispatch } from "../../store/store";
//import { Link } from 'react-router-dom'

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { fetchLogin } from "../../store/slices/auth.slice";
import { Login as LoginEntity } from "../../store/types/auth.interfaces";
import { useTypedSelector } from "hooks";
import { PasswordField } from "ui-layout/PasswordField";

interface Props {
  onLogin?: (value: boolean) => void;
}
const Login: React.FC<React.PropsWithChildren<Props>> = ({ onLogin }) => {
  const token = useTypedSelector(({ auth }) => auth.token);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<{
    email: string;
    senha: string;
  }>({
    email: "gneri94@gmail.com",
    senha: "apto34-password-HIRE-ME",
  });

  useEffect(() => {
    if(token)
    onLogin && onLogin(true);
  }, [token]);

  return (
    <>
      <Grid container direction={"column"}>
        <TextField
          label={t("email")}
          name="email"
          onChange={(ev) =>
            setFormData({ ...formData, email: ev.target.value })
          }
          value={formData.email || ""}
        />

        <PasswordField
          label={t("password")}
          name="password"
          onChange={(ev) =>
            setFormData({ ...formData, senha: ev.target.value })
          }
          value={formData.senha || ""}
        />

        <Button
          variant="primary"
          onClick={() => {
            if (formData.email !== "" && formData.senha !== "")
              dispatch(fetchLogin(formData));
          }}
        >
          {t("login")}
        </Button>
      </Grid>
    </>
  );
};

export default Login;
