import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Text } from "ui-layout";
import { RootState, useAppDispatch } from "store/store";

import { PayerCost } from "@mercadopago/sdk-react/coreMethods/util/types";
interface Props {
}
const OrderResume: React.FC<React.PropsWithChildren<Props>> = () => {
    const { t } = useTranslation(["login", "common"]);
    const dispatch = useAppDispatch();
    const [installments, setInstallments] = useState<PayerCost[]>([])
    const cart = useSelector((st: RootState) => st.cart)
    const [formData, setFormData] = useState<{
        name: string,
        surname: string,
        email: string,
        street_name: string,
        street_number: string,
    }>({
        name: 'Gabriela',
        surname: 'Nery',
        email: 'admin@gatostecnologia.com',
        street_name: 'admin@gatostecnologia.com',
        street_number: '33',
    })

    return (
        <Grid xs={4} item container columns={16}>
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
        </Grid>
    );
};

export default OrderResume;

