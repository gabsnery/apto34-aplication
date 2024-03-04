import { Modal, TextField, Typography, Box } from "@mui/material";
import Login from "components/Login";
import { useTypedSelector } from "hooks";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Text } from "ui-layout";

interface Props {
}


const PersonalInfo: React.FC<React.PropsWithChildren<Props>> = () => {
    const { t } = useTranslation(["login", "common"]);
    const { token, nome, sobrenome, email } = useTypedSelector(({ auth }) => auth)

    const [formData, setFormData] = useState<{
        name: string,
        surname: string,
        email: string,
    }>({
        name: nome || '',
        surname: sobrenome || '',
        email: email || '',
    })
    const [edit, setEdit] = useState<boolean>(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    useEffect(() => {
        if (token) handleClose()
    }, [token]);
    useEffect(() => {
        setFormData({
            name: nome || '',
            surname: sobrenome || '',
            email: email || '',
        })
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
                    <Login onLogin={(v) => { }} />
                </Box>
            </Modal >
            <Text variant={"h4"}>Informações pessoais</Text>
            {
                token ? null : <Button onClick={() => {
                    handleOpen()
                }} color={"primary"} variant={"outlined"}>{`Logar`}</Button>
            }
            {
                edit ? <>
                    <TextField
                        label={t("Nome")}
                        onChange={(ev) => setFormData({ ...formData, name: ev.target.value })}
                        value={formData.name || ''}
                        required
                        fullWidth
                    />
                    <TextField
                        label={t("surname")}
                        onChange={(ev) => setFormData({ ...formData, surname: ev.target.value })}
                        value={formData.surname || ''}
                        required
                        fullWidth
                    />
                    <TextField
                        label={t("email")}
                        onChange={(ev) => setFormData({ ...formData, email: ev.target.value })}
                        value={formData.email || ''}
                        required
                        fullWidth
                    />

                </> : <>
                    <Text variant={"body"}>{formData.name || ''}</Text>
                    <Text variant={"body"}>{formData.surname || ''}</Text>
                    <Text variant={"body"}>{formData.email || ''}</Text>
                </>
            }
            {token ? <Button onClick={() => {
                setEdit(!edit);
            }} color={"primary"} variant={"outlined"}>{`${edit ? 'Salvar' : 'Editar'}`}</Button> : null}

        </>
    );
};

export default PersonalInfo;

