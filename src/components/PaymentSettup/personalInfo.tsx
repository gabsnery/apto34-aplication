import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "ui-layout";

interface Props {
}
const PersonalInfo: React.FC<React.PropsWithChildren<Props>> = () => {
    const { t } = useTranslation(["login", "common"]);
    const [formData, setFormData] = useState<{
        name: string,
        surname: string,
        email: string,
    }>({
        name: 'Gabriela',
        surname: 'Nery',
        email: 'admin@gatostecnologia.com',
    })

    return (
        <>
            <Text variant={"h4"}>Informações pessoais</Text>
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

        </>
    );
};

export default PersonalInfo;

