import { Modal, Box, Grid } from "@mui/material";
import Login from "components/Login";
import { useTypedSelector } from "hooks";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAddClientMutation } from "store/api/Client";
import { Button, Text, TextField } from "ui-layout";

interface Props {}

const PersonalInfo: React.FC<React.PropsWithChildren<Props>> = () => {
  const { t } = useTranslation(["login", "common"]);
  const { token, nome, sobrenome, email } = useTypedSelector(
    ({ auth }) => auth
  );
  const [addClient, { data: clientData }] = useAddClientMutation();

  const [formData, setFormData] = useState<{
    name: string;
    surname: string;
    email: string;
    password: string;
  }>({
    name: nome || "",
    surname: sobrenome || "",
    email: email || "",
    password: "",
  });
  const [edit, setEdit] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    if (token) handleClose();
  }, [token]);
  useEffect(() => {
    setFormData({
      name: nome || "",
      surname: sobrenome || "",
      email: email || "",
      password: email || "",
    });
  }, [nome, sobrenome, email]);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Login onLogin={(v) => {}} />
        </Box>
      </Modal>
      <Grid container columnSpacing={2}>
        {token ? null : (
          <Grid item xs={6}>
            <Text variant={"h3"}>Logar</Text>
            <Login
              onLogin={function (value: boolean): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Grid>
        )}

        <Grid container item xs={6} direction={"column"}>
          {!token && (
            <Text variant={"h3"}>
              {`${token ? "Editar" : "Criar"}`} usuario
            </Text>
          )}
          <TextField
            label={t("Nome")}
            onChange={(ev) =>
              setFormData({ ...formData, name: ev.target.value })
            }
            value={formData.name || ""}
            required
          />
          <TextField
            label={t("surname")}
            onChange={(ev) =>
              setFormData({ ...formData, surname: ev.target.value })
            }
            value={formData.surname || ""}
            required
          />
          <TextField
            label={t("email")}
            onChange={(ev) =>
              setFormData({ ...formData, email: ev.target.value })
            }
            value={formData.email || ""}
            required
          />
          {!token && (
            <TextField
              label={t("password")}
              onChange={(ev) =>
                setFormData({ ...formData, password: ev.target.value })
              }
              value={formData.password || ""}
              required
            />
          )}
          <Button
            onClick={() => {
              addClient(formData);
            }}
            variant="secondary"
          >{`Salvar`}</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default PersonalInfo;
