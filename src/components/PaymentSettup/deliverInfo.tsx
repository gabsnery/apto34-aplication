import { FormControl, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "ui-layout";
interface Props {
}
const DeliverInfo: React.FC<React.PropsWithChildren<Props>> = () => {
    const { t } = useTranslation();

    const [type, setType] = useState<undefined | 'SedexCorreios' | 'PACCorreios' | 'JADLOG'>()
    return (
        <>
            <Text variant={"h4"}>{t('deliverType')}</Text>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={type}
                    onChange={(event) => {
                        setType((event.target as HTMLInputElement).value as 'SedexCorreios' | 'PACCorreios' | 'JADLOG');
                    }}
                >
                    <FormControlLabel value="SedexCorreios" control={<Radio />} label="Sedex Correios" />
                    <FormControlLabel value="PACCorreios" control={<Radio />} label="PAC Correios" />
                    <FormControlLabel value="JADLOG" control={<Radio />} label="JADLOG" />
                </RadioGroup>
            </FormControl>
        </>
    );
};

export default DeliverInfo;

