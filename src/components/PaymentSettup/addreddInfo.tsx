import { TextField } from "@mui/material";
import { useTypedSelector } from "hooks";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Text } from "ui-layout";

interface Props {
}
const AddreddInfo: React.FC<React.PropsWithChildren<Props>> = () => {
    const { t } = useTranslation(["login", "common"]);

    const [formData, setFormData] = useState<{
        street_name: string,
        street_number: string,
        street_zip_code: string,
        street_city: string,
        street_state: string,
    }>({
        street_name: 'Rua São Franscisco',
        street_number: '515',
        street_zip_code: '13400-590',
        street_city: 'Piracicaba',
        street_state: 'São Paulo',
    })
    const [edit, setEdit] = useState<boolean>(false)
    return (
        <>
            <Text variant={"h4"}>Detalhes da entrega</Text>
            {edit ? <>
                <TextField
                    label={t("street_name")}
                    onChange={(ev) => setFormData({ ...formData, street_name: ev.target.value })}
                    value={formData.street_name || ''}
                    required
                    fullWidth
                />
                <TextField
                    label={t("street_number")}
                    onChange={(ev) => setFormData({ ...formData, street_number: ev.target.value })}
                    value={formData.street_number || ''}
                    required
                    fullWidth
                />
                <TextField
                    label={t("street_zip_code")}
                    onChange={(ev) => setFormData({ ...formData, street_zip_code: ev.target.value })}
                    value={formData.street_zip_code || ''}
                    required
                    fullWidth
                />
                <TextField
                    label={t("street_city")}
                    onChange={(ev) => setFormData({ ...formData, street_city: ev.target.value })}
                    value={formData.street_city || ''}
                    required
                    fullWidth
                />
                <TextField
                    label={t("street_state")}
                    onChange={(ev) => setFormData({ ...formData, street_state: ev.target.value })}
                    value={formData.street_state || ''}
                    required
                    fullWidth
                /></>
                : <>
                    <Text variant={"body"}>{formData.street_name || ''}</Text>
                    <Text variant={"body"}>{formData.street_number || ''}</Text>
                    <Text variant={"body"}>{formData.street_zip_code || ''}</Text>
                    <Text variant={"body"}>{formData.street_city || ''}</Text>
                    <Text variant={"body"}>{formData.street_state || ''}</Text>
                </>
            }
            <Button onClick={() => {
                setEdit(!edit);
            }} color={"primary"} variant={"outlined"}>{`${edit ? 'Salvar' : 'Editar'}`}</Button>
        </>
    );
};

export default AddreddInfo;

