import { Grid, Typography, useTheme } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Button, TextField } from "ui-layout";
import { useAppDispatch } from "../../store/store";
//import { Link } from 'react-router-dom'

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { fetchLogin } from "../../store/slices/auth.slice";
import { Login as LoginEntity } from "../../store/types/auth.interfaces";

interface Props {
  onLogin: (value: boolean) => void;
}
const Login: React.FC<React.PropsWithChildren<Props>> = ({ onLogin }) => {
  const { t } = useTranslation(["login", "common"]);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<{
    email: string;
    senha: string;
  }>({
    email: "",
    senha: "",
  });

  return (
    <>
      <Grid container direction={"column"}>
        <TextField
          label={t("common|email")}
          onChange={(ev) =>
            setFormData({ ...formData, email: ev.target.value })
          }
          value={formData.email || ""}
        />

        <TextField
          label={t("common|senha")}
          type="password"
          name="password"
          onChange={(ev) =>
            setFormData({ ...formData, senha: ev.target.value })
          }
          value={formData.senha || ""}
        />

        <Button
        variant="primary"
          onClick={() => {
            if(formData.email!=='' && formData.senha!=='')
            dispatch(fetchLogin(formData));
          }}
        >
          {t("common|enter")}
        </Button>
      </Grid>
    </>
  );
};

export default Login;
