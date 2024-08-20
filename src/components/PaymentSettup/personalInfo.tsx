import { Modal, Box, Grid, FormControlLabel, Checkbox } from "@mui/material";
import Login from "components/Login";
import { useTypedSelector } from "hooks";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "store";
import { useAddClientMutation, useGetClientQuery } from "store/api/Client";
import { useGenerateSignedFileQuery } from "store/api/default";
import { Button, Text, TextField } from "ui-layout";
import { PasswordField } from "ui-layout";
import { signed_files_expiration } from "utils";

interface Props {}

const PersonalInfo: React.FC<React.PropsWithChildren<Props>> = () => {
  const { t } = useTranslation();
  const { token, nome, sobrenome, email } = useTypedSelector(
    ({ auth }) => auth
  );
  const [addClient] = useAddClientMutation();
  const { data: clientData } = useGetClientQuery();
  const language = useSelector((st: RootState) => st.language);

  const {data ,refetch} = useGenerateSignedFileQuery(`terms_of_use_${language || 'pt-BR'}.pdf`,{
    pollingInterval: signed_files_expiration,
  })

  const [termAcceped,setTermAccepted] = useState<boolean>(false)
  const [formData, setFormData] = useState<{
    name: string;
    surname: string;
    email: string;
    password: string;
    cpf: string;
  }>({
    name: nome || "",
    surname: sobrenome || "",
    email: email || "",
    cpf: "",
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
    if (clientData)
      setFormData({
        name: clientData.nome || "",
        surname: clientData.sobrenome || "",
        email: clientData.email || "",
        password: clientData.email || "",
        cpf: clientData.cpf || "",
      });
  }, [clientData]);
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
      <Grid container columnSpacing={2} rowSpacing={2}>
        {token ? null : (
          <Grid item xs={12} sm={12} md={6}>
            <Text variant={"h3"}>{t("login")}</Text>
            <Login />
          </Grid>
        )}

        <Grid container item xs={12} sm={12} md={6} direction={"column"}>
          {!token && (
            <Text variant={"h3"}>
              {`${token ? t("edit") : t("create")}`} {t("user")}
            </Text>
          )}
          <TextField
            label={t("name")}
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
            label={t("cpf")}
            onChange={(ev) =>
              setFormData({ ...formData, cpf: ev.target.value })
            }
            value={formData.cpf || ""}
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
            <PasswordField
              label={t("password")}
              onChange={(ev) =>
                setFormData({ ...formData, password: ev.target.value })
              }
              value={formData.password || ""}
              required
            />
          )}
          {!token && data && (
              <FormControlLabel
              control={<Checkbox name="lgpd_agreement" onChange={()=>{
                setTermAccepted(!termAcceped)
              }} />}
              label={
                <Text>
                  random text {" "}
                  <Link
                    onClick={(e) => {
                      window.open(data?.url,"_blak","noreferrer")
                    } } to={""}>
                    Termos de uso
                  </Link>
                </Text>
              }
            />
          )}
          <Button
            onClick={() => {
              addClient(formData);
            }}
            disabled={!termAcceped}
            variant="secondary"
          >
            {t("save")}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default PersonalInfo;
